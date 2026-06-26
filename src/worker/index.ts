type JsonObject = Record<string, unknown>;

type ProcurementOrderRow = {
  id: string;
  member_id: string;
  platform: string;
  product_url: string;
  title: string;
  spec: string | null;
  quantity: number;
  status: string;
  item_amount_jpy: number | null;
  local_shipping_jpy: number | null;
  service_fee_hkd: number | null;
  quoted_total_hkd: number | null;
  remarks: string | null;
  admin_note: string | null;
  created_at: string;
  updated_at: string;
  quoted_at: string | null;
  paid_at: string | null;
  purchased_at: string | null;
  cancelled_at: string | null;
};

type MemberProfileRow = {
  id: string;
  email: string;
  display_name: string;
  locale: string;
  level_code: string;
  balance_hkd: number;
};

const demoMemberId = "demo-member";
const statusLabels: Record<string, string> = {
  pending_quote: "待報價",
  quoted: "待付款",
  paid: "已付款",
  pending_purchase: "待採購",
  purchased: "已採購",
  cancelled: "已取消"
};

function json(payload: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(payload), {
    ...init,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...init.headers
    }
  });
}

async function readBody(request: Request): Promise<JsonObject | null> {
  try {
    return (await request.json()) as JsonObject;
  } catch {
    return null;
  }
}

function text(input: JsonObject, key: string) {
  const value = input[key];
  return typeof value === "string" ? value.trim() : "";
}

function integer(input: JsonObject, key: string) {
  const value = input[key];
  if (typeof value === "number" && Number.isFinite(value)) return Math.trunc(value);
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? Math.trunc(parsed) : null;
  }
  return null;
}

function orderId() {
  const stamp = Date.now().toString(36).toUpperCase();
  const tail = crypto.randomUUID().slice(0, 6).toUpperCase();
  return `DP-PO-${stamp}-${tail}`;
}

function auditId() {
  return `audit-${crypto.randomUUID()}`;
}

function mapOrder(row: ProcurementOrderRow) {
  return {
    id: row.id,
    memberId: row.member_id,
    platform: row.platform,
    productUrl: row.product_url,
    title: row.title,
    spec: row.spec,
    quantity: row.quantity,
    status: row.status,
    statusLabel: statusLabels[row.status] ?? row.status,
    itemAmountJpy: row.item_amount_jpy,
    localShippingJpy: row.local_shipping_jpy,
    serviceFeeHkd: row.service_fee_hkd,
    quotedTotalHkd: row.quoted_total_hkd,
    remarks: row.remarks,
    adminNote: row.admin_note,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    quotedAt: row.quoted_at,
    paidAt: row.paid_at,
    purchasedAt: row.purchased_at,
    cancelledAt: row.cancelled_at
  };
}

async function first<T>(db: D1Database, sql: string, ...binds: unknown[]) {
  return db.prepare(sql).bind(...binds).first<T>();
}

async function all<T>(db: D1Database, sql: string, ...binds: unknown[]) {
  const result = await db.prepare(sql).bind(...binds).all<T>();
  return result.results ?? [];
}

async function addAudit(db: D1Database, action: string, entityId: string, actorType: "member" | "staff", detail: JsonObject = {}) {
  await db.prepare(
    `INSERT INTO audit_logs (id, actor_type, actor_id, action, entity_type, entity_id, detail_json)
     VALUES (?, ?, ?, ?, 'procurement_order', ?, ?)`
  ).bind(auditId(), actorType, actorType === "member" ? demoMemberId : "admin-demo", action, entityId, JSON.stringify(detail)).run();
}

async function getProfile(db: D1Database) {
  const member = await first<MemberProfileRow>(
    db,
    `SELECT members.id, members.email, members.display_name, members.locale, members.level_code, wallets.balance_hkd
       FROM members
       JOIN wallets ON wallets.member_id = members.id
      WHERE members.id = ?`,
    demoMemberId
  );
  if (!member) throw new Error("Demo member has not been migrated");
  return {
    id: member.id,
    email: member.email,
    displayName: member.display_name,
    locale: member.locale,
    levelCode: member.level_code,
    balanceHkd: member.balance_hkd
  };
}

async function createProcurementOrder(db: D1Database, body: JsonObject) {
  const platform = text(body, "platform");
  const productUrl = text(body, "productUrl");
  const title = text(body, "title");
  const spec = text(body, "spec") || null;
  const remarks = text(body, "remarks") || null;
  const quantity = integer(body, "quantity") ?? 1;

  if (!platform || !productUrl || !title || quantity < 1) {
    return json({ error: "platform, productUrl, title and positive quantity are required" }, { status: 400 });
  }

  const id = orderId();
  await db.prepare(
    `INSERT INTO procurement_orders (id, member_id, platform, product_url, title, spec, quantity, remarks)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(id, demoMemberId, platform, productUrl, title, spec, quantity, remarks).run();
  await addAudit(db, "procurement.create", id, "member", { platform, title, quantity });

  const row = await first<ProcurementOrderRow>(db, "SELECT * FROM procurement_orders WHERE id = ?", id);
  return json({ item: mapOrder(row!) }, { status: 201 });
}

async function listMemberOrders(db: D1Database) {
  const rows = await all<ProcurementOrderRow>(
    db,
    "SELECT * FROM procurement_orders WHERE member_id = ? ORDER BY updated_at DESC",
    demoMemberId
  );
  return json({ items: rows.map(mapOrder) });
}

async function listAdminOrders(db: D1Database) {
  const rows = await all<ProcurementOrderRow>(db, "SELECT * FROM procurement_orders ORDER BY updated_at DESC");
  return json({ items: rows.map(mapOrder) });
}

async function quoteOrder(db: D1Database, id: string, body: JsonObject) {
  const itemAmountJpy = integer(body, "itemAmountJpy");
  const localShippingJpy = integer(body, "localShippingJpy") ?? 0;
  const serviceFeeHkd = integer(body, "serviceFeeHkd") ?? 0;
  const quotedTotalHkd = integer(body, "quotedTotalHkd");
  const adminNote = text(body, "adminNote") || null;

  if (!itemAmountJpy || itemAmountJpy < 1 || !quotedTotalHkd || quotedTotalHkd < 1) {
    return json({ error: "itemAmountJpy and quotedTotalHkd are required" }, { status: 400 });
  }

  const row = await first<ProcurementOrderRow>(db, "SELECT * FROM procurement_orders WHERE id = ?", id);
  if (!row) return json({ error: "Order not found" }, { status: 404 });
  if (!["pending_quote", "quoted"].includes(row.status)) {
    return json({ error: "Only pending or quoted orders can be quoted" }, { status: 409 });
  }

  await db.prepare(
    `UPDATE procurement_orders
        SET status = 'quoted',
            item_amount_jpy = ?,
            local_shipping_jpy = ?,
            service_fee_hkd = ?,
            quoted_total_hkd = ?,
            admin_note = ?,
            quoted_at = CURRENT_TIMESTAMP,
            updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`
  ).bind(itemAmountJpy, localShippingJpy, serviceFeeHkd, quotedTotalHkd, adminNote, id).run();
  await addAudit(db, "procurement.quote", id, "staff", { itemAmountJpy, localShippingJpy, serviceFeeHkd, quotedTotalHkd });

  const updated = await first<ProcurementOrderRow>(db, "SELECT * FROM procurement_orders WHERE id = ?", id);
  return json({ item: mapOrder(updated!) });
}

async function payOrder(db: D1Database, id: string) {
  const row = await first<ProcurementOrderRow>(db, "SELECT * FROM procurement_orders WHERE id = ? AND member_id = ?", id, demoMemberId);
  if (!row) return json({ error: "Order not found" }, { status: 404 });
  if (row.status !== "quoted") return json({ error: "Only quoted orders can be paid" }, { status: 409 });
  if (!row.quoted_total_hkd || row.quoted_total_hkd < 1) return json({ error: "Order has no payable quote" }, { status: 409 });

  const wallet = await first<{ balance_hkd: number }>(db, "SELECT balance_hkd FROM wallets WHERE member_id = ?", demoMemberId);
  if (!wallet || wallet.balance_hkd < row.quoted_total_hkd) {
    return json({ error: "Insufficient balance" }, { status: 409 });
  }

  await db.batch([
    db.prepare("UPDATE wallets SET balance_hkd = balance_hkd - ?, updated_at = CURRENT_TIMESTAMP WHERE member_id = ?").bind(row.quoted_total_hkd, demoMemberId),
    db.prepare(
      `UPDATE procurement_orders
          SET status = 'paid',
              paid_at = CURRENT_TIMESTAMP,
              updated_at = CURRENT_TIMESTAMP
        WHERE id = ?`
    ).bind(id)
  ]);
  await addAudit(db, "procurement.pay", id, "member", { amountHkd: row.quoted_total_hkd });

  const updated = await first<ProcurementOrderRow>(db, "SELECT * FROM procurement_orders WHERE id = ?", id);
  return json({ item: mapOrder(updated!) });
}

async function cancelOrder(db: D1Database, id: string) {
  const row = await first<ProcurementOrderRow>(db, "SELECT * FROM procurement_orders WHERE id = ? AND member_id = ?", id, demoMemberId);
  if (!row) return json({ error: "Order not found" }, { status: 404 });
  if (["purchased", "cancelled"].includes(row.status)) {
    return json({ error: "Purchased or cancelled orders cannot be cancelled" }, { status: 409 });
  }

  const refund = row.status === "paid" || row.status === "pending_purchase" ? row.quoted_total_hkd ?? 0 : 0;
  const updates = [
    db.prepare(
      `UPDATE procurement_orders
          SET status = 'cancelled',
              cancelled_at = CURRENT_TIMESTAMP,
              updated_at = CURRENT_TIMESTAMP
        WHERE id = ?`
    ).bind(id)
  ];
  if (refund > 0) {
    updates.push(db.prepare("UPDATE wallets SET balance_hkd = balance_hkd + ?, updated_at = CURRENT_TIMESTAMP WHERE member_id = ?").bind(refund, demoMemberId));
  }
  await db.batch(updates);
  await addAudit(db, "procurement.cancel", id, "member", { refundHkd: refund });

  const updated = await first<ProcurementOrderRow>(db, "SELECT * FROM procurement_orders WHERE id = ?", id);
  return json({ item: mapOrder(updated!) });
}

async function markPurchased(db: D1Database, id: string) {
  const row = await first<ProcurementOrderRow>(db, "SELECT * FROM procurement_orders WHERE id = ?", id);
  if (!row) return json({ error: "Order not found" }, { status: 404 });
  if (!["paid", "pending_purchase"].includes(row.status)) {
    return json({ error: "Only paid orders can be marked purchased" }, { status: 409 });
  }

  await db.prepare(
    `UPDATE procurement_orders
        SET status = 'purchased',
            purchased_at = CURRENT_TIMESTAMP,
            updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`
  ).bind(id).run();
  await addAudit(db, "procurement.purchase", id, "staff");

  const updated = await first<ProcurementOrderRow>(db, "SELECT * FROM procurement_orders WHERE id = ?", id);
  return json({ item: mapOrder(updated!) });
}

async function handleApi(request: Request, env: Env) {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method.toUpperCase();

  try {
    if (method === "GET" && path === "/api/member/profile") return json({ profile: await getProfile(env.DB) });
    if (method === "GET" && path === "/api/procurement/orders") return listMemberOrders(env.DB);
    if (method === "POST" && path === "/api/procurement/orders") return createProcurementOrder(env.DB, (await readBody(request)) ?? {});
    if (method === "GET" && path === "/api/admin/procurement/orders") return listAdminOrders(env.DB);

    const quoteMatch = path.match(/^\/api\/admin\/procurement\/orders\/([^/]+)\/quote$/);
    if (method === "POST" && quoteMatch) return quoteOrder(env.DB, decodeURIComponent(quoteMatch[1]), (await readBody(request)) ?? {});

    const payMatch = path.match(/^\/api\/procurement\/orders\/([^/]+)\/pay$/);
    if (method === "POST" && payMatch) return payOrder(env.DB, decodeURIComponent(payMatch[1]));

    const cancelMatch = path.match(/^\/api\/procurement\/orders\/([^/]+)\/cancel$/);
    if (method === "POST" && cancelMatch) return cancelOrder(env.DB, decodeURIComponent(cancelMatch[1]));

    const purchasedMatch = path.match(/^\/api\/admin\/procurement\/orders\/([^/]+)\/mark-purchased$/);
    if (method === "POST" && purchasedMatch) return markPurchased(env.DB, decodeURIComponent(purchasedMatch[1]));

    return json({ error: "Not found" }, { status: 404 });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Unexpected server error" }, { status: 500 });
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) return handleApi(request, env);
    return env.ASSETS.fetch(request);
  }
};
