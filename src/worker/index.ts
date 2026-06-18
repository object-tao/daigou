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
  createPaymentRequest,
  createProcurementOrder,
  createSupportTicket,
  getAdminSummary,
  getAdminWorkQueue,
  getMemberOrders,
  getMemberProfile,
  getOperationalRules
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

app.get("/api/logistics/lines", (c) =>
  c.json({
    items: logisticsLines
  })
);

app.get("/api/admin/summary", async (c) => c.json(await getAdminSummary(c.env.DB)));

app.get("/api/admin/work-queue", async (c) => c.json(await getAdminWorkQueue(c.env.DB)));

app.notFound((c) => c.env.ASSETS.fetch(c.req.raw));

export default app;
