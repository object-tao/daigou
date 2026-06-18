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
  checkoutCart,
  claimOwnerlessPackage,
  createAftersalesRequest,
  createAttachment,
  createAuctionOrder,
  createCartItem,
  createShipmentFromPackages,
  createPaymentRequest,
  createProcurementOrder,
  createSupportTicket,
  destroyExpiredOwnerlessPackages,
  exportAdminCsv,
  getAdminSummary,
  getAdminWorkQueue,
  getPublicPricing,
  getSession,
  getSitemap,
  getMemberOrders,
  getMemberProfile,
  getOperationalRules,
  hasAdminPermission,
  listMemberGrowth,
  loginActor,
  logoutSession,
  markProcurementPurchased,
  payProcurementOrder,
  payShipmentFreight,
  quoteShipmentFreight,
  quoteProcurementOrder,
  receiveInboundPackage,
  redeemCoupon,
  redeemPoints,
  registerMember,
  requestValueAddedService,
  resolveAuctionOrder,
  reviewAftersalesRequest,
  updateNotificationPreference,
  upsertSeoEntry,
  upsertTranslation,
  type ActorSession
} from "./repository";

type Bindings = Env;

const app = new Hono<{ Bindings: Bindings }>();

app.use("/api/*", cors());

type RequestContext = Context<{ Bindings: Bindings }> & {
  var: {
    session?: ActorSession | null;
  };
};

function cookieValue(c: Context<{ Bindings: Bindings }>, name: string): string | null {
  const cookie = c.req.header("Cookie") ?? "";
  const parts = cookie.split(";").map((part) => part.trim());
  const match = parts.find((part) => part.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

function setSessionCookie(c: Context<{ Bindings: Bindings }>, sessionId: string, expiresAt: string) {
  c.header(
    "Set-Cookie",
    `dp_session=${encodeURIComponent(sessionId)}; Path=/; HttpOnly; SameSite=Lax; Expires=${new Date(expiresAt).toUTCString()}`
  );
}

function clearSessionCookie(c: Context<{ Bindings: Bindings }>) {
  c.header("Set-Cookie", "dp_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0");
}

async function currentSession(c: Context<{ Bindings: Bindings }>): Promise<ActorSession | null> {
  return getSession(c.env.DB, cookieValue(c, "dp_session"));
}

async function requireMember(c: Context<{ Bindings: Bindings }>): Promise<ActorSession> {
  const session = await currentSession(c);

  if (session?.actorType === "member") {
    return session;
  }

  return {
    id: "demo-session",
    actorType: "member",
    actorId: "demo-member",
    roleName: null,
    expiresAt: new Date(Date.now() + 86400000).toISOString()
  };
}

async function requireAdmin(c: Context<{ Bindings: Bindings }>, moduleKey: string, write = false): Promise<ActorSession | Response> {
  const session = await currentSession(c);

  if (session?.actorType !== "staff") {
    return c.json({ error: "Admin login required" }, 401);
  }

  if (!(await hasAdminPermission(c.env.DB, session.roleName, moduleKey, write))) {
    return c.json({ error: "Permission denied" }, 403);
  }

  return session;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function textField(body: Record<string, unknown>, field: string): string | null {
  const value = body[field];
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function numberField(body: Record<string, unknown>, field: string): number | null {
  const value = body[field];
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
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

app.post("/api/auth/register", async (c) => {
  const body = await readJsonBody(c);

  if (!body) {
    return c.json({ error: "Invalid JSON body" }, 400);
  }

  const email = textField(body, "email");
  const password = textField(body, "password");
  const displayName = textField(body, "displayName") ?? undefined;
  const locale = textField(body, "locale") ?? undefined;

  if (!email || !password || password.length < 8) {
    return c.json({ error: "email and password with at least 8 characters are required" }, 400);
  }

  try {
    return c.json(await registerMember(c.env.DB, { email, password, displayName, locale }), 201);
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : "Registration failed" }, 400);
  }
});

app.post("/api/auth/login", async (c) => {
  const body = await readJsonBody(c);

  if (!body) {
    return c.json({ error: "Invalid JSON body" }, 400);
  }

  const email = textField(body, "email");
  const password = textField(body, "password");
  const actorType = textField(body, "actorType") as "member" | "staff" | null;

  if (!email || !password) {
    return c.json({ error: "email and password are required" }, 400);
  }

  try {
    const session = await loginActor(c.env.DB, {
      email,
      password,
      actorType: actorType === "member" || actorType === "staff" ? actorType : undefined
    });
    setSessionCookie(c, session.id, session.expiresAt);
    return c.json({
      actorType: session.actorType,
      actorId: session.actorId,
      roleName: session.roleName,
      displayName: session.displayName,
      expiresAt: session.expiresAt
    });
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : "Login failed" }, 401);
  }
});

app.post("/api/auth/logout", async (c) => {
  const sessionId = cookieValue(c, "dp_session");

  if (sessionId) {
    await logoutSession(c.env.DB, sessionId);
  }

  clearSessionCookie(c);
  return c.json({ ok: true });
});

app.get("/api/auth/me", async (c) => {
  const session = await currentSession(c);
  return c.json({ session });
});

app.get("/api/public/pricing", async (c) => c.json(await getPublicPricing(c.env.DB)));

app.get("/robots.txt", (c) => c.text("User-agent: *\nAllow: /\nSitemap: https://droppilot.net/sitemap.xml\n"));

app.get("/sitemap.xml", async (c) => {
  const entries = await getSitemap(c.env.DB);
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map((entry) => `<url><loc>https://droppilot.net${entry.loc}</loc><lastmod>${entry.lastmod}</lastmod></url>`),
    "</urlset>"
  ].join("");
  return c.body(xml, 200, { "Content-Type": "application/xml; charset=utf-8" });
});

app.get("/api/admin/roles", async (c) => {
  const auth = await requireAdmin(c, "rules", false);
  if (auth instanceof Response) return auth;

  return c.json({
    items: roleMatrix
  });
});

app.get("/api/admin/workflows", async (c) => {
  const auth = await requireAdmin(c, "rules", false);
  if (auth instanceof Response) return auth;

  return c.json({
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
  });
});

app.get("/api/member/me", async (c) => {
  const session = await requireMember(c);
  return c.json(await getMemberProfile(c.env.DB, session.actorId));
});

app.get("/api/member/orders", async (c) => {
  const session = await requireMember(c);
  return c.json({
    items: await getMemberOrders(c.env.DB, session.actorId)
  });
});

app.get("/api/member/growth", async (c) => {
  const session = await requireMember(c);
  return c.json(await listMemberGrowth(c.env.DB, session.actorId));
});

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

  const session = await requireMember(c);
  const order = await createProcurementOrder(c.env.DB, {
    platform,
    productUrl,
    title,
    quantity,
    remarks
  }, session.actorId);

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

  const session = await requireMember(c);
  const payment = await createPaymentRequest(c.env.DB, {
    amountHkd,
    proofUrl
  }, session.actorId);

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

  const session = await requireMember(c);
  const ticket = await createSupportTicket(c.env.DB, {
    ticketType,
    subject,
    description,
    relatedType,
    relatedId,
    priority
  }, session.actorId);

  return c.json(ticket, 201);
});

app.post("/api/procurement/orders/:id/pay", async (c) => {
  try {
    const session = await requireMember(c);
    const result = await payProcurementOrder(c.env.DB, c.req.param("id"), session.actorId);
    return c.json(result);
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : "Payment failed" }, 400);
  }
});

app.post("/api/auction/orders", async (c) => {
  const body = await readJsonBody(c);

  if (!body) {
    return c.json({ error: "Invalid JSON body" }, 400);
  }

  const lotUrl = textField(body, "lotUrl");
  const title = textField(body, "title");
  const maxBidJpy = numberField(body, "maxBidJpy");
  const authorizationLimitJpy = numberField(body, "authorizationLimitJpy") ?? maxBidJpy;

  if (!lotUrl || !title || !maxBidJpy || maxBidJpy <= 0 || !authorizationLimitJpy) {
    return c.json({ error: "lotUrl, title and maxBidJpy are required" }, 400);
  }

  const session = await requireMember(c);
  return c.json(
    await createAuctionOrder(c.env.DB, {
      lotUrl,
      title,
      maxBidJpy,
      authorizationLimitJpy
    }, session.actorId),
    201
  );
});

app.post("/api/cart/items", async (c) => {
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

  const session = await requireMember(c);
  return c.json(await createCartItem(c.env.DB, { platform, productUrl, title, quantity, remarks }, session.actorId), 201);
});

app.post("/api/cart/checkout", async (c) => {
  try {
    const session = await requireMember(c);
    return c.json(await checkoutCart(c.env.DB, session.actorId), 201);
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : "Cart checkout failed" }, 400);
  }
});

app.post("/api/value-added-services", async (c) => {
  const body = await readJsonBody(c);

  if (!body) {
    return c.json({ error: "Invalid JSON body" }, 400);
  }

  const packageId = textField(body, "packageId");
  const serviceType = textField(body, "serviceType");

  if (!packageId || !serviceType) {
    return c.json({ error: "packageId and serviceType are required" }, 400);
  }

  try {
    const session = await requireMember(c);
    return c.json(await requestValueAddedService(c.env.DB, { packageId, serviceType }, session.actorId), 201);
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : "Value-added request failed" }, 400);
  }
});

app.post("/api/shipments/:id/pay-freight", async (c) => {
  try {
    const session = await requireMember(c);
    return c.json(await payShipmentFreight(c.env.DB, c.req.param("id"), session.actorId));
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : "Freight payment failed" }, 400);
  }
});

app.post("/api/aftersales/requests", async (c) => {
  const body = await readJsonBody(c);

  if (!body) {
    return c.json({ error: "Invalid JSON body" }, 400);
  }

  const orderType = textField(body, "orderType");
  const orderId = textField(body, "orderId");
  const requestType = textField(body, "requestType");
  const reason = textField(body, "reason");

  if (!orderType || !orderId || !requestType || !reason) {
    return c.json({ error: "orderType, orderId, requestType and reason are required" }, 400);
  }

  try {
    const session = await requireMember(c);
    return c.json(await createAftersalesRequest(c.env.DB, { orderType, orderId, requestType, reason }, session.actorId), 201);
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : "Aftersales request failed" }, 400);
  }
});

app.post("/api/packages/:id/claim", async (c) => {
  try {
    const session = await requireMember(c);
    return c.json(await claimOwnerlessPackage(c.env.DB, c.req.param("id"), session.actorId));
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : "Package claim failed" }, 400);
  }
});

app.post("/api/points/redemptions", async (c) => {
  const body = await readJsonBody(c);

  if (!body) {
    return c.json({ error: "Invalid JSON body" }, 400);
  }

  const bucket = textField(body, "bucket");
  const rewardName = textField(body, "rewardName");
  const points = numberField(body, "points");

  if (!bucket || !rewardName || !points || points <= 0) {
    return c.json({ error: "bucket, rewardName and positive points are required" }, 400);
  }

  try {
    const session = await requireMember(c);
    return c.json(await redeemPoints(c.env.DB, bucket, points, rewardName, session.actorId), 201);
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : "Point redemption failed" }, 400);
  }
});

app.post("/api/coupons/redeem", async (c) => {
  const body = await readJsonBody(c);

  if (!body) {
    return c.json({ error: "Invalid JSON body" }, 400);
  }

  const code = textField(body, "code");
  const sourceType = textField(body, "sourceType");
  const sourceId = textField(body, "sourceId");

  if (!code || !sourceType || !sourceId) {
    return c.json({ error: "code, sourceType and sourceId are required" }, 400);
  }

  try {
    const session = await requireMember(c);
    return c.json(await redeemCoupon(c.env.DB, code, sourceType, sourceId, session.actorId), 201);
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : "Coupon redemption failed" }, 400);
  }
});

app.post("/api/member/notification-preferences", async (c) => {
  const body = await readJsonBody(c);

  if (!body) {
    return c.json({ error: "Invalid JSON body" }, 400);
  }

  const channel = textField(body, "channel");
  const enabled = Boolean(body.enabled);

  if (!channel) {
    return c.json({ error: "channel is required" }, 400);
  }

  const session = await requireMember(c);
  return c.json(await updateNotificationPreference(c.env.DB, channel, enabled, session.actorId));
});

app.post("/api/admin/procurement/orders/:id/quote", async (c) => {
  const auth = await requireAdmin(c, "procurement", true);
  if (auth instanceof Response) return auth;

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
    }, auth.actorId);

    return c.json(result);
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : "Quote failed" }, 400);
  }
});

app.post("/api/admin/procurement/orders/:id/mark-purchased", async (c) => {
  const auth = await requireAdmin(c, "procurement", true);
  if (auth instanceof Response) return auth;

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
    }, auth.actorId);

    return c.json(result, 201);
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : "Mark purchased failed" }, 400);
  }
});

app.post("/api/admin/payments/:id/approve", async (c) => {
  const auth = await requireAdmin(c, "finance", true);
  if (auth instanceof Response) return auth;

  try {
    const result = await approvePaymentRequest(c.env.DB, c.req.param("id"), auth.actorId);
    return c.json(result);
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : "Approval failed" }, 400);
  }
});

app.post("/api/admin/warehouse/inbound-packages", async (c) => {
  const auth = await requireAdmin(c, "warehouse", true);
  if (auth instanceof Response) return auth;

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
    }, auth.actorId);

    return c.json(result, 201);
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : "Inbound package failed" }, 400);
  }
});

app.post("/api/admin/shipments", async (c) => {
  const auth = await requireAdmin(c, "shipments", true);
  if (auth instanceof Response) return auth;

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
    }, auth.actorId);

    return c.json(result, 201);
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : "Shipment creation failed" }, 400);
  }
});

app.post("/api/admin/shipments/:id/tracking-events", async (c) => {
  const auth = await requireAdmin(c, "shipments", true);
  if (auth instanceof Response) return auth;

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
    }, auth.actorId);

    return c.json(result, 201);
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : "Tracking event failed" }, 400);
  }
});

app.post("/api/admin/auction/orders/:id/resolve", async (c) => {
  const auth = await requireAdmin(c, "auction", true);
  if (auth instanceof Response) return auth;

  const body = await readJsonBody(c);

  if (!body) {
    return c.json({ error: "Invalid JSON body" }, 400);
  }

  const result = textField(body, "result");
  const winningBidJpy = numberField(body, "winningBidJpy") ?? 0;

  if (result !== "won" && result !== "lost") {
    return c.json({ error: "result must be won or lost" }, 400);
  }

  try {
    return c.json(await resolveAuctionOrder(c.env.DB, c.req.param("id"), result, winningBidJpy, auth.actorId));
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : "Auction resolution failed" }, 400);
  }
});

app.post("/api/admin/shipments/:id/freight-quotes", async (c) => {
  const auth = await requireAdmin(c, "shipments", true);
  if (auth instanceof Response) return auth;

  const body = await readJsonBody(c);

  if (!body) {
    return c.json({ error: "Invalid JSON body" }, 400);
  }

  const actualWeightGram = numberField(body, "actualWeightGram");
  const lengthCm = numberField(body, "lengthCm");
  const widthCm = numberField(body, "widthCm");
  const heightCm = numberField(body, "heightCm");
  const ratePerKgHkd = numberField(body, "ratePerKgHkd");

  if (!actualWeightGram || !lengthCm || !widthCm || !heightCm || !ratePerKgHkd) {
    return c.json({ error: "actualWeightGram, lengthCm, widthCm, heightCm and ratePerKgHkd are required" }, 400);
  }

  try {
    return c.json(
      await quoteShipmentFreight(c.env.DB, c.req.param("id"), {
        actualWeightGram,
        lengthCm,
        widthCm,
        heightCm,
        ratePerKgHkd
      }, auth.actorId),
      201
    );
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : "Freight quote failed" }, 400);
  }
});

app.post("/api/admin/aftersales/:id/review", async (c) => {
  const auth = await requireAdmin(c, "aftersales", true);
  if (auth instanceof Response) return auth;

  const body = await readJsonBody(c);

  if (!body) {
    return c.json({ error: "Invalid JSON body" }, 400);
  }

  const decision = textField(body, "decision");
  const refundHkd = numberField(body, "refundHkd") ?? 0;

  if (decision !== "approved" && decision !== "rejected") {
    return c.json({ error: "decision must be approved or rejected" }, 400);
  }

  try {
    return c.json(await reviewAftersalesRequest(c.env.DB, c.req.param("id"), decision, refundHkd, auth.actorId));
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : "Aftersales review failed" }, 400);
  }
});

app.post("/api/admin/warehouse/destroy-expired-ownerless", async (c) => {
  const auth = await requireAdmin(c, "warehouse", true);
  if (auth instanceof Response) return auth;

  return c.json(await destroyExpiredOwnerlessPackages(c.env.DB, auth.actorId));
});

app.post("/api/admin/translations", async (c) => {
  const auth = await requireAdmin(c, "content", true);
  if (auth instanceof Response) return auth;

  const body = await readJsonBody(c);

  if (!body) {
    return c.json({ error: "Invalid JSON body" }, 400);
  }

  const namespace = textField(body, "namespace");
  const translationKey = textField(body, "translationKey");
  const locale = textField(body, "locale");
  const value = textField(body, "value");

  if (!namespace || !translationKey || !locale || !value) {
    return c.json({ error: "namespace, translationKey, locale and value are required" }, 400);
  }

  return c.json(await upsertTranslation(c.env.DB, { namespace, translationKey, locale, value }, auth.actorId));
});

app.post("/api/admin/seo", async (c) => {
  const auth = await requireAdmin(c, "content", true);
  if (auth instanceof Response) return auth;

  const body = await readJsonBody(c);

  if (!body) {
    return c.json({ error: "Invalid JSON body" }, 400);
  }

  const entityType = textField(body, "entityType");
  const entityId = textField(body, "entityId");
  const locale = textField(body, "locale");
  const title = textField(body, "title");
  const urlSlug = textField(body, "urlSlug");
  const metaDescription = textField(body, "metaDescription") ?? undefined;
  const robotsDirective = textField(body, "robotsDirective") ?? undefined;

  if (!entityType || !entityId || !locale || !title || !urlSlug) {
    return c.json({ error: "entityType, entityId, locale, title and urlSlug are required" }, 400);
  }

  return c.json(await upsertSeoEntry(c.env.DB, { entityType, entityId, locale, title, urlSlug, metaDescription, robotsDirective }));
});

app.get("/api/admin/export/:report.csv", async (c) => {
  const auth = await requireAdmin(c, "finance", false);
  if (auth instanceof Response) return auth;

  const report = c.req.param("report") ?? "procurement";
  const csv = await exportAdminCsv(c.env.DB, report);
  return c.body(csv, 200, {
    "Content-Type": "text/csv; charset=utf-8",
    "Content-Disposition": `attachment; filename="${report}.csv"`
  });
});

app.post("/api/attachments", async (c) => {
  const body = await readJsonBody(c);

  if (!body) {
    return c.json({ error: "Invalid JSON body" }, 400);
  }

  const ownerType = textField(body, "ownerType");
  const ownerId = textField(body, "ownerId");
  const fileName = textField(body, "fileName");
  const contentType = textField(body, "contentType") ?? undefined;
  const publicUrl = textField(body, "publicUrl") ?? undefined;

  if (!ownerType || !ownerId || !fileName) {
    return c.json({ error: "ownerType, ownerId and fileName are required" }, 400);
  }

  return c.json(await createAttachment(c.env.DB, { ownerType, ownerId, fileName, contentType, publicUrl }, await currentSession(c)), 201);
});

app.get("/api/logistics/lines", (c) =>
  c.json({
    items: logisticsLines
  })
);

app.get("/api/admin/summary", async (c) => {
  const auth = await requireAdmin(c, "rules", false);
  if (auth instanceof Response) return auth;

  return c.json(await getAdminSummary(c.env.DB));
});

app.get("/api/admin/work-queue", async (c) => {
  const auth = await requireAdmin(c, "rules", false);
  if (auth instanceof Response) return auth;

  return c.json(await getAdminWorkQueue(c.env.DB));
});

app.notFound((c) => c.env.ASSETS.fetch(c.req.raw));

export default app;
