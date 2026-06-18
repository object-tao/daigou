import { Hono } from "hono";
import { cors } from "hono/cors";
import type { Context } from "hono";
import {
  appLocales,
  featureFlags,
  launchMarkets,
  logisticsLines,
  roleMatrix,
  serviceBlueprint,
  workflowStates
} from "../shared/domain";
import {
  addShipmentTrackingEvent,
  approvePaymentRequest,
  createShipmentFromPackages,
  createPaymentRequest,
  createProcurementOrder,
  createSupportTicket,
  getAdminSummary,
  getAdminWorkQueue,
  getMemberOrders,
  getMemberProfile,
  getOperationalRules,
  markProcurementPurchased,
  payProcurementOrder,
  quoteProcurementOrder,
  receiveInboundPackage
} from "./repository";

type Bindings = Env;

const app = new Hono<{ Bindings: Bindings }>();

app.use("/api/*", cors());

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function textField(body: Record<string, unknown>, field: string): string | null {
  const value = body[field];
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function numberField(body: Record<string, unknown>, field: string): number | null {
  const value = body[field];
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function stringArrayField(body: Record<string, unknown>, field: string): string[] {
  const value = body[field];

  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

async function readJsonBody(c: Context<{ Bindings: Bindings }>) {
  try {
    const body = await c.req.json();
    return isRecord(body) ? body : null;
  } catch {
    return null;
  }
}

app.get("/api/health", (c) =>
  c.json({
    ok: true,
    service: "droppilot",
    env: c.env.APP_ENV,
    domain: c.env.PRIMARY_DOMAIN,
    checkedAt: new Date().toISOString()
  })
);

app.get("/api/config", (c) =>
  c.json({
    locales: appLocales,
    launchMarkets,
    settlementCurrency: "HKD",
    purchaseCurrency: "JPY",
    defaultWarehouse: "船橋倉",
    featureFlags
  })
);

app.get("/api/catalog/service-blueprint", (c) => c.json(serviceBlueprint));

app.get("/api/catalog/operational-rules", async (c) => c.json(await getOperationalRules(c.env.DB)));

app.get("/api/admin/roles", (c) =>
  c.json({
    items: roleMatrix
  })
);

app.get("/api/admin/workflows", (c) =>
  c.json({
    states: workflowStates,
    automation: {
      refreshMode: "server_scheduled_polling",
      realtimeCandidate: "WebSocket or Server-Sent Events after operations volume is known",
      rules: [
        "授權範圍內可自動扣款",
        "超過會員設定上限觸發人工確認",
        "單件入庫觸發一件直發提醒",
        "無主包裹進入公海等待認領",
        "免倉期後按代收包裹逐日計費"
      ]
    }
  })
);

app.get("/api/member/me", async (c) => c.json(await getMemberProfile(c.env.DB)));

app.get("/api/member/orders", async (c) =>
  c.json({
    items: await getMemberOrders(c.env.DB)
  })
);

app.post("/api/procurement/orders", async (c) => {
  const body = await readJsonBody(c);

  if (!body) {
    return c.json({ error: "Invalid JSON body" }, 400);
  }

  const platform = textField(body, "platform");
  const productUrl = textField(body, "productUrl");
  const title = textField(body, "title");
  const quantity = numberField(body, "quantity") ?? 1;
  const remarks = textField(body, "remarks") ?? undefined;

  if (!platform || !productUrl || !title || quantity < 1) {
    return c.json({ error: "platform, productUrl, title and positive quantity are required" }, 400);
  }

  const order = await createProcurementOrder(c.env.DB, {
    platform,
    productUrl,
    title,
    quantity,
    remarks
  });

  return c.json(order, 201);
});

app.post("/api/payments/bank-transfer-requests", async (c) => {
  const body = await readJsonBody(c);

  if (!body) {
    return c.json({ error: "Invalid JSON body" }, 400);
  }

  const amountHkd = numberField(body, "amountHkd");
  const proofUrl = textField(body, "proofUrl") ?? undefined;

  if (!amountHkd || amountHkd <= 0) {
    return c.json({ error: "positive amountHkd is required" }, 400);
  }

  const payment = await createPaymentRequest(c.env.DB, {
    amountHkd,
    proofUrl
  });

  return c.json(payment, 201);
});

app.post("/api/support/tickets", async (c) => {
  const body = await readJsonBody(c);

  if (!body) {
    return c.json({ error: "Invalid JSON body" }, 400);
  }

  const ticketType = textField(body, "ticketType");
  const subject = textField(body, "subject");
  const description = textField(body, "description");
  const relatedType = textField(body, "relatedType") ?? undefined;
  const relatedId = textField(body, "relatedId") ?? undefined;
  const priority = textField(body, "priority") ?? undefined;

  if (!ticketType || !subject || !description) {
    return c.json({ error: "ticketType, subject and description are required" }, 400);
  }

  const ticket = await createSupportTicket(c.env.DB, {
    ticketType,
    subject,
    description,
    relatedType,
    relatedId,
    priority
  });

  return c.json(ticket, 201);
});

app.post("/api/procurement/orders/:id/pay", async (c) => {
  try {
    const result = await payProcurementOrder(c.env.DB, c.req.param("id"));
    return c.json(result);
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : "Payment failed" }, 400);
  }
});

app.post("/api/admin/procurement/orders/:id/quote", async (c) => {
  const body = await readJsonBody(c);

  if (!body) {
    return c.json({ error: "Invalid JSON body" }, 400);
  }

  const itemAmountJpy = numberField(body, "itemAmountJpy");
  const localShippingJpy = numberField(body, "localShippingJpy");
  const serviceFeeHkd = numberField(body, "serviceFeeHkd");
  const remarks = textField(body, "remarks") ?? undefined;

  if (!itemAmountJpy || itemAmountJpy <= 0) {
    return c.json({ error: "positive itemAmountJpy is required" }, 400);
  }

  try {
    const result = await quoteProcurementOrder(c.env.DB, c.req.param("id"), {
      itemAmountJpy,
      localShippingJpy,
      serviceFeeHkd,
      remarks
    });

    return c.json(result);
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : "Quote failed" }, 400);
  }
});

app.post("/api/admin/procurement/orders/:id/mark-purchased", async (c) => {
  const body = await readJsonBody(c);

  if (!body) {
    return c.json({ error: "Invalid JSON body" }, 400);
  }

  const japanTrackingNo = textField(body, "japanTrackingNo") ?? undefined;
  const warehouseId = textField(body, "warehouseId") ?? undefined;
  const remarks = textField(body, "remarks") ?? undefined;

  try {
    const result = await markProcurementPurchased(c.env.DB, c.req.param("id"), {
      japanTrackingNo,
      warehouseId,
      remarks
    });

    return c.json(result, 201);
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : "Mark purchased failed" }, 400);
  }
});

app.post("/api/admin/payments/:id/approve", async (c) => {
  try {
    const result = await approvePaymentRequest(c.env.DB, c.req.param("id"));
    return c.json(result);
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : "Approval failed" }, 400);
  }
});

app.post("/api/admin/warehouse/inbound-packages", async (c) => {
  const body = await readJsonBody(c);

  if (!body) {
    return c.json({ error: "Invalid JSON body" }, 400);
  }

  const memberId = textField(body, "memberId") ?? undefined;
  const warehouseId = textField(body, "warehouseId") ?? undefined;
  const trackingNo = textField(body, "trackingNo") ?? undefined;
  const weightGram = numberField(body, "weightGram");
  const volumeCm3 = numberField(body, "volumeCm3");

  try {
    const result = await receiveInboundPackage(c.env.DB, {
      memberId,
      warehouseId,
      trackingNo,
      weightGram,
      volumeCm3
    });

    return c.json(result, 201);
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : "Inbound package failed" }, 400);
  }
});

app.post("/api/admin/shipments", async (c) => {
  const body = await readJsonBody(c);

  if (!body) {
    return c.json({ error: "Invalid JSON body" }, 400);
  }

  const packageIds = stringArrayField(body, "packageIds");
  const lineCode = textField(body, "lineCode");
  const cartonFeeHkd = numberField(body, "cartonFeeHkd") ?? 0;
  const freightFeeHkd = numberField(body, "freightFeeHkd");

  if (packageIds.length === 0 || !lineCode) {
    return c.json({ error: "packageIds and lineCode are required" }, 400);
  }

  try {
    const result = await createShipmentFromPackages(c.env.DB, {
      packageIds,
      lineCode,
      cartonFeeHkd,
      freightFeeHkd
    });

    return c.json(result, 201);
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : "Shipment creation failed" }, 400);
  }
});

app.post("/api/admin/shipments/:id/tracking-events", async (c) => {
  const body = await readJsonBody(c);

  if (!body) {
    return c.json({ error: "Invalid JSON body" }, 400);
  }

  const status = textField(body, "status");
  const description = textField(body, "description");
  const location = textField(body, "location") ?? undefined;
  const occurredAt = textField(body, "occurredAt") ?? undefined;
  const trackingNo = textField(body, "trackingNo") ?? undefined;

  if (!status || !description) {
    return c.json({ error: "status and description are required" }, 400);
  }

  try {
    const result = await addShipmentTrackingEvent(c.env.DB, c.req.param("id"), {
      status,
      description,
      location,
      occurredAt,
      trackingNo
    });

    return c.json(result, 201);
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : "Tracking event failed" }, 400);
  }
});

app.get("/api/logistics/lines", (c) =>
  c.json({
    items: logisticsLines
  })
);

app.get("/api/admin/summary", async (c) => c.json(await getAdminSummary(c.env.DB)));

app.get("/api/admin/work-queue", async (c) => c.json(await getAdminWorkQueue(c.env.DB)));

app.notFound((c) => c.env.ASSETS.fetch(c.req.raw));

export default app;
