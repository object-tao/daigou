type JsonObject = Record<string, unknown>;

type AuthContext = {
  memberId?: string;
  staffId?: string;
};

type ProcurementOrderRow = {
  id: string;
  member_id: string;
  order_type: string;
  platform: string;
  product_url: string;
  product_image_url: string | null;
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
  store_name: string | null;
  store_contact: string | null;
  store_phone: string | null;
  store_address: string | null;
  currency: string;
  created_at: string;
  updated_at: string;
  quoted_at: string | null;
  paid_at: string | null;
  purchased_at: string | null;
  cancelled_at: string | null;
};

type ProcurementOrderItemRow = {
  id: string;
  order_id: string;
  item_name: string;
  item_type: string;
  spec: string | null;
  color: string | null;
  unit_price_jpy: number;
  quantity: number;
  image_url: string;
  created_at: string;
};

type MemberProfileRow = {
  id: string;
  email: string;
  user_code: string;
  display_name: string;
  locale: string;
  level_code: string;
  balance_hkd: number;
};

type AdminMemberRow = MemberProfileRow & {
  created_at: string;
  order_count: number;
  package_count: number;
  topup_count: number;
};

type ProductPreview = {
  title: string;
  spec: string;
  unitPriceJpy: number | null;
};

type SupportTicketRow = {
  id: string;
  member_id: string;
  type: string;
  subtype: string;
  content: string;
  status: string;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
};

type SupportTicketMessageRow = {
  id: string;
  ticket_id: string;
  actor_type: string;
  actor_id: string;
  message: string;
  created_at: string;
};

type InboundPackageRow = {
  id: string;
  member_id: string | null;
  source_type: string;
  warehouse_id: string;
  warehouse_name: string;
  japanese_tracking_no: string;
  warehouse_inbound_no: string;
  customer_package_no: string;
  consolidation_batch_no: string | null;
  international_tracking_no: string | null;
  platform: string | null;
  sender_name: string | null;
  item_name: string;
  quantity: number;
  recipient_code: string | null;
  status: string;
  weight_kg: number | null;
  length_cm: number | null;
  width_cm: number | null;
  height_cm: number | null;
  shelf_code: string | null;
  remarks: string | null;
  admin_note: string | null;
  created_at: string;
  updated_at: string;
  inbounded_at: string | null;
  claimed_at: string | null;
};

type TopupRequestRow = {
  id: string;
  member_id: string;
  topup_type: string;
  amount_hkd: number;
  payment_method: string | null;
  bank_account_id: string | null;
  bank_account_name: string | null;
  transfer_serial_no: string | null;
  remitter_name: string | null;
  remitter_phone: string | null;
  voucher_file_name: string | null;
  remitted_at: string | null;
  remarks: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  reviewed_at: string | null;
};

type AdminTopupRequestRow = TopupRequestRow & {
  member_email: string | null;
  member_display_name: string | null;
  member_user_code: string | null;
};

type TopupReviewLogRow = {
  id: string;
  topup_request_id: string;
  actor_id: string;
  action: string;
  from_status: string | null;
  to_status: string;
  amount_hkd: number;
  note: string | null;
  created_at: string;
};

type WalletTransactionRow = {
  id: string;
  member_id: string;
  direction: string;
  category: string;
  amount_hkd: number;
  balance_after_hkd: number | null;
  related_type: string | null;
  related_id: string | null;
  title: string;
  description: string | null;
  status: string;
  created_at: string;
};

type AdminWalletTransactionRow = WalletTransactionRow & {
  member_email: string | null;
  member_display_name: string | null;
  member_user_code: string | null;
};

type ShippingAddressRow = {
  id: string;
  member_id: string;
  label: string | null;
  recipient_name: string;
  phone: string;
  country_code: string;
  country_name: string;
  region: string | null;
  city: string | null;
  district: string | null;
  postal_code: string | null;
  address_line1: string;
  address_line2: string | null;
  is_default: number;
  remarks: string | null;
  created_at: string;
  updated_at: string;
};

type StaffDepartmentRow = {
  id: string;
  name: string;
  status: string;
  created_at: string;
  updated_at: string;
};

type StaffRoleRow = {
  id: string;
  name: string;
  description: string | null;
  permissions_json: string;
  status: string;
  created_at: string;
  updated_at: string;
};

type StaffAccountRow = {
  id: string;
  email: string;
  display_name: string;
  department_id: string;
  department_name: string | null;
  role_id: string;
  role_name: string | null;
  password_hash: string | null;
  status: string;
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
};

type ExchangeRateRow = {
  id: string;
  base_currency: string;
  quote_currency: string;
  base_currency_name: string;
  quote_currency_name: string;
  rate: number;
  status: string;
  note: string | null;
  created_at: string;
  updated_at: string;
};

type WarehouseRow = {
  id: string;
  code: string;
  name: string;
  type: string;
  country: string;
  postal_code: string | null;
  address: string;
  phone: string | null;
  contact_name: string | null;
  status: string;
  is_default: number;
  allow_inbound: number;
  allow_outbound: number;
  sort_order: number;
  remarks: string | null;
  created_at: string;
  updated_at: string;
};

const demoMemberId = "demo-member";
const shippingCountries: Record<string, string> = {
  CN: "中國大陸",
  HK: "中國香港",
  MO: "中國澳門",
  TW: "中國台灣",
  AU: "澳大利亞",
  GB: "英國",
  CA: "加拿大"
};

const statusLabels: Record<string, string> = {
  pending_payment: "待付款",
  platform_pending_order: "平台待下單",
  platform_pending_shipment: "平台待發貨",
  pending_inbound: "待入庫",
  inbounded: "已入庫",
  consolidated: "已合單",
  shipped: "已發貨",
  completed: "已完成",
  issue: "問題訂單",
  cancelled: "已取消"
};

const defaultJpyPerHkd = 20;
const defaultProcurementServiceFeeHkd = 0;

function calculateProcurementPayable(itemAmountJpy: number, localShippingJpy: number) {
  const convertedHkd = Math.ceil((itemAmountJpy + localShippingJpy) / defaultJpyPerHkd);
  return convertedHkd + defaultProcurementServiceFeeHkd;
}

const ticketStatusLabels: Record<string, string> = {
  pending: "待處理",
  processing: "處理中",
  replied: "已回覆",
  closed: "已關閉"
};

const inboundStatusLabels: Record<string, string> = {
  forecasted: "待入庫",
  inbounded: "已入庫",
  claimed: "已認領",
  consolidated: "待合箱",
  packed: "打包中",
  outbounded: "已出庫",
  orphan: "待認領",
  destroyed: "已銷毀"
};

const topupStatusLabels: Record<string, string> = {
  pending_payment: "待支付",
  pending_review: "待審核",
  approved: "已入帳",
  rejected: "已拒絕",
  cancelled: "已取消"
};

const walletCategoryLabels: Record<string, string> = {
  topup: "充值",
  procurement_payment: "代購扣款",
  refund: "退款",
  adjustment: "餘額調整",
  shipping_fee: "物流費用",
  service_fee: "服務費"
};

const walletTransactionStatusLabels: Record<string, string> = {
  pending: "待處理",
  posted: "已入帳",
  rejected: "已拒絕",
  cancelled: "已取消"
};

const staffStatusLabels: Record<string, string> = {
  active: "啟用",
  disabled: "停用"
};

const ticketSubtypes: Record<string, string[]> = {
  optimization: ["活動相關", "商品相關", "功能優化建議", "其他"],
  service: ["服務相關問題", "活動相關問題", "平台功能異常諮詢", "其他"]
};

const memberCodeLetters = "ABCDEFGHJKMNPQRSTUVWXYZ";
const memberCodeDigits = "123456789";
const memberCodeChars = `${memberCodeLetters}${memberCodeDigits}`;

function generateMemberCode() {
  const pick = (chars: string) => chars[Math.floor(Math.random() * chars.length)];
  const chars = [pick(memberCodeLetters), pick(memberCodeDigits), pick(memberCodeChars), pick(memberCodeChars), pick(memberCodeChars)];
  for (let index = chars.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [chars[index], chars[swapIndex]] = [chars[swapIndex], chars[index]];
  }
  return chars.join("");
}

function json(payload: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(payload), {
    ...init,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...init.headers
    }
  });
}

function cookieValue(request: Request, name: string) {
  const cookie = request.headers.get("Cookie") ?? "";
  return cookie.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${name}=`))?.slice(name.length + 1) ?? "";
}

function sessionCookie(id: string, maxAge = 60 * 60 * 24 * 7) {
  return `dp_session=${id}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}`;
}

function clearSessionCookie() {
  return "dp_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0";
}

async function passwordHash(password: string) {
  const bytes = new TextEncoder().encode(`droppilot:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function sessionId() {
  return `sess-${crypto.randomUUID()}`;
}

async function currentAuth(db: D1Database, request: Request): Promise<AuthContext> {
  const id = cookieValue(request, "dp_session");
  if (!id) return {};
  const row = await first<{ actor_type: string; actor_id: string }>(
    db,
    "SELECT actor_type, actor_id FROM auth_sessions WHERE id = ? AND expires_at > CURRENT_TIMESTAMP",
    id
  );
  if (!row) return {};
  return row.actor_type === "staff" ? { staffId: row.actor_id } : { memberId: row.actor_id };
}

function unauthorized(message = "請先登入") {
  return json({ error: message }, { status: 401 });
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

function decimal(input: JsonObject, key: string) {
  const value = input[key];
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function booleanValue(input: JsonObject, key: string) {
  const value = input[key];
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value === 1;
  if (typeof value === "string") return ["1", "true", "yes", "on"].includes(value.trim().toLowerCase());
  return false;
}

function stringArray(input: JsonObject, key: string) {
  const value = input[key];
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean);
  }
  if (typeof value === "string" && value.trim()) return [value.trim()];
  return [];
}

function decodeHtml(input: string) {
  return input
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&#x2F;/g, "/")
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)));
}

function compact(input: string) {
  return decodeHtml(input.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

function metaContent(html: string, key: string) {
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const patterns = [
    new RegExp(`<meta[^>]+(?:property|name)=["']${escaped}["'][^>]+content=["']([^"']+)["'][^>]*>`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${escaped}["'][^>]*>`, "i")
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return compact(match[1]);
  }
  return "";
}

function titleFromHtml(html: string) {
  return (
    metaContent(html, "og:title") ||
    metaContent(html, "twitter:title") ||
    compact(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "")
  );
}

function descriptionFromHtml(html: string) {
  const description = metaContent(html, "description") || metaContent(html, "og:description") || metaContent(html, "twitter:description");
  return description.length > 160 ? `${description.slice(0, 160)}...` : description;
}

function priceFromHtml(html: string) {
  const candidates = [
    metaContent(html, "product:price:amount"),
    html.match(/itemprop=["']price["'][^>]+content=["']([0-9,]+)["']/i)?.[1] ?? "",
    html.match(/"price"\s*:\s*"?([0-9,]+)"?/i)?.[1] ?? "",
    html.match(/(?:￥|¥|JPY)\s*([0-9][0-9,]*)/i)?.[1] ?? "",
    html.match(/([0-9][0-9,]*)\s*(?:円|日元)/i)?.[1] ?? ""
  ];
  for (const candidate of candidates) {
    const parsed = Number(String(candidate).replace(/,/g, ""));
    if (Number.isFinite(parsed) && parsed > 0) return Math.trunc(parsed);
  }
  return null;
}

function fallbackProductPreview(url: URL): ProductPreview | null {
  const asin = url.pathname.match(/\/(?:dp|gp\/product)\/([A-Z0-9]{10})/i)?.[1]?.toUpperCase() ?? "";
  const slug = url.pathname.split("/").filter(Boolean)[0] ?? "";
  const title = decodeURIComponent(slug)
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!title && !asin) return null;
  return {
    title: title || asin,
    spec: asin ? `ASIN: ${asin}` : "",
    unitPriceJpy: null
  };
}

async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs = 8000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort("timeout"), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchProductPreview(body: JsonObject) {
  const productUrl = text(body, "productUrl");
  let url: URL;
  try {
    url = new URL(productUrl);
  } catch {
    return json({ error: "請輸入有效的商品連結" }, { status: 400 });
  }
  if (!["http:", "https:"].includes(url.protocol)) {
    return json({ error: "商品連結只支持 http 或 https" }, { status: 400 });
  }

  let response: Response;
  try {
    response = await fetchWithTimeout(url.toString(), {
      headers: {
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "ja,en;q=0.8,zh-Hant;q=0.7",
        "User-Agent": "Mozilla/5.0 (compatible; DropPilotProductFetcher/0.1; +https://droppilot.net)"
      }
    });
  } catch {
    const fallback = fallbackProductPreview(url);
    if (fallback) return json({ item: fallback, warning: "商品頁面暫時無法讀取，已根據連結回填部分資料" });
    return json({ error: "商品頁面暫時無法讀取，請稍後再試或手動填寫" }, { status: 502 });
  }
  if (!response.ok) {
    const fallback = fallbackProductPreview(url);
    if (fallback) return json({ item: fallback, warning: `商品頁面暫時無法讀取 (${response.status})，已根據連結回填部分資料` });
    return json({ error: `商品頁面暫時無法讀取 (${response.status})` }, { status: 502 });
  }

  const html = await response.text();
  const preview: ProductPreview = {
    title: titleFromHtml(html),
    spec: descriptionFromHtml(html),
    unitPriceJpy: priceFromHtml(html)
  };

  if (!preview.title && !preview.spec && !preview.unitPriceJpy) {
    return json({ error: "未能從商品頁面解析商品資料，請手動填寫" }, { status: 422 });
  }
  return json({ item: preview });
}

function orderId() {
  const stamp = Date.now().toString(36).toUpperCase();
  const tail = crypto.randomUUID().slice(0, 6).toUpperCase();
  return `DP-PO-${stamp}-${tail}`;
}

function orderItemId() {
  const stamp = Date.now().toString(36).toUpperCase();
  const tail = crypto.randomUUID().slice(0, 6).toUpperCase();
  return `item-${stamp}-${tail}`.toLowerCase();
}

function auditId() {
  return `audit-${crypto.randomUUID()}`;
}

function ticketId() {
  const stamp = Date.now().toString(36).toUpperCase();
  const tail = crypto.randomUUID().slice(0, 6).toUpperCase();
  return `DP-TK-${stamp}-${tail}`;
}

function inboundPackageId() {
  const stamp = Date.now().toString(36).toUpperCase();
  const tail = crypto.randomUUID().slice(0, 6).toUpperCase();
  return `DP-PK-${stamp}-${tail}`;
}

function warehouseInboundNo() {
  const stamp = Date.now().toString(36).toUpperCase();
  const tail = crypto.randomUUID().slice(0, 4).toUpperCase();
  return `DP-IN-${stamp}-${tail}`;
}

function topupRequestId() {
  const stamp = Date.now().toString(36).toUpperCase();
  const tail = crypto.randomUUID().slice(0, 6).toUpperCase();
  return `DP-TU-${stamp}-${tail}`;
}

function topupReviewLogId() {
  const stamp = Date.now().toString(36).toUpperCase();
  const tail = crypto.randomUUID().slice(0, 6).toUpperCase();
  return `log-${stamp}-${tail}`.toLowerCase();
}

function walletTransactionId() {
  const stamp = Date.now().toString(36).toUpperCase();
  const tail = crypto.randomUUID().slice(0, 6).toUpperCase();
  return `DP-WT-${stamp}-${tail}`;
}

function shippingAddressId() {
  const stamp = Date.now().toString(36).toUpperCase();
  const tail = crypto.randomUUID().slice(0, 6).toUpperCase();
  return `DP-AD-${stamp}-${tail}`;
}

function staffRoleId() {
  const stamp = Date.now().toString(36).toUpperCase();
  const tail = crypto.randomUUID().slice(0, 6).toUpperCase();
  return `role-${stamp}-${tail}`.toLowerCase();
}

function staffAccountId() {
  const stamp = Date.now().toString(36).toUpperCase();
  const tail = crypto.randomUUID().slice(0, 6).toUpperCase();
  return `staff-${stamp}-${tail}`.toLowerCase();
}

function messageId() {
  return `msg-${crypto.randomUUID()}`;
}

function mapOrderItem(row: ProcurementOrderItemRow) {
  return {
    id: row.id,
    orderId: row.order_id,
    itemName: row.item_name,
    itemType: row.item_type,
    spec: row.spec,
    color: row.color,
    unitPriceJpy: row.unit_price_jpy,
    quantity: row.quantity,
    imageUrl: row.image_url,
    createdAt: row.created_at
  };
}

function mapOrder(row: ProcurementOrderRow, items: ProcurementOrderItemRow[] = []) {
  return {
    id: row.id,
    memberId: row.member_id,
    orderType: row.order_type ?? "online",
    platform: row.platform,
    productUrl: row.product_url,
    productImageUrl: row.product_image_url,
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
    storeName: row.store_name,
    storeContact: row.store_contact,
    storePhone: row.store_phone,
    storeAddress: row.store_address,
    currency: row.currency ?? "JPY",
    items: items.map(mapOrderItem),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    quotedAt: row.quoted_at,
    paidAt: row.paid_at,
    purchasedAt: row.purchased_at,
    cancelledAt: row.cancelled_at
  };
}

function mapTicket(row: SupportTicketRow, messages: SupportTicketMessageRow[] = []) {
  return {
    id: row.id,
    memberId: row.member_id,
    type: row.type,
    typeLabel: row.type === "optimization" ? "優化建議" : "工單服務",
    subtype: row.subtype,
    content: row.content,
    status: row.status,
    statusLabel: ticketStatusLabels[row.status] ?? row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    closedAt: row.closed_at,
    messages: messages.map((message) => ({
      id: message.id,
      ticketId: message.ticket_id,
      actorType: message.actor_type,
      actorId: message.actor_id,
      message: message.message,
      createdAt: message.created_at
    }))
  };
}

function mapInboundPackage(row: InboundPackageRow) {
  return {
    id: row.id,
    memberId: row.member_id,
    sourceType: row.source_type,
    warehouseId: row.warehouse_id,
    warehouseName: row.warehouse_name,
    japaneseTrackingNo: row.japanese_tracking_no,
    warehouseInboundNo: row.warehouse_inbound_no,
    customerPackageNo: row.customer_package_no,
    consolidationBatchNo: row.consolidation_batch_no,
    internationalTrackingNo: row.international_tracking_no,
    platform: row.platform,
    senderName: row.sender_name,
    itemName: row.item_name,
    quantity: row.quantity,
    recipientCode: row.recipient_code,
    status: row.status,
    statusLabel: inboundStatusLabels[row.status] ?? row.status,
    weightKg: row.weight_kg,
    lengthCm: row.length_cm,
    widthCm: row.width_cm,
    heightCm: row.height_cm,
    shelfCode: row.shelf_code,
    remarks: row.remarks,
    adminNote: row.admin_note,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    inboundedAt: row.inbounded_at,
    claimedAt: row.claimed_at
  };
}

function mapTopupRequest(row: TopupRequestRow) {
  const adminRow = row as AdminTopupRequestRow;
  return {
    id: row.id,
    memberId: row.member_id,
    memberEmail: adminRow.member_email ?? null,
    memberDisplayName: adminRow.member_display_name ?? null,
    memberUserCode: adminRow.member_user_code ?? null,
    topupType: row.topup_type,
    amountHkd: row.amount_hkd,
    paymentMethod: row.payment_method,
    bankAccountId: row.bank_account_id,
    bankAccountName: row.bank_account_name,
    transferSerialNo: row.transfer_serial_no,
    remitterName: row.remitter_name,
    remitterPhone: row.remitter_phone,
    voucherFileName: row.voucher_file_name,
    remittedAt: row.remitted_at,
    remarks: row.remarks,
    status: row.status,
    statusLabel: topupStatusLabels[row.status] ?? row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    reviewedAt: row.reviewed_at,
    reviewLogs: "review_logs" in adminRow ? (adminRow as AdminTopupRequestRow & { review_logs?: TopupReviewLogRow[] }).review_logs?.map(mapTopupReviewLog) ?? [] : []
  };
}

function mapTopupReviewLog(row: TopupReviewLogRow) {
  return {
    id: row.id,
    topupRequestId: row.topup_request_id,
    actorId: row.actor_id,
    action: row.action,
    actionLabel: row.action === "approve" ? "入帳" : row.action === "reject" ? "拒絕" : row.action,
    fromStatus: row.from_status,
    toStatus: row.to_status,
    amountHkd: row.amount_hkd,
    note: row.note,
    createdAt: row.created_at
  };
}

function mapWalletTransaction(row: WalletTransactionRow) {
  const adminRow = row as AdminWalletTransactionRow;
  return {
    id: row.id,
    memberId: row.member_id,
    memberEmail: adminRow.member_email ?? null,
    memberDisplayName: adminRow.member_display_name ?? null,
    memberUserCode: adminRow.member_user_code ?? null,
    direction: row.direction,
    category: row.category,
    categoryLabel: walletCategoryLabels[row.category] ?? row.category,
    amountHkd: row.amount_hkd,
    balanceAfterHkd: row.balance_after_hkd,
    relatedType: row.related_type,
    relatedId: row.related_id,
    title: row.title,
    description: row.description,
    status: row.status,
    statusLabel: walletTransactionStatusLabels[row.status] ?? row.status,
    createdAt: row.created_at
  };
}

function mapShippingAddress(row: ShippingAddressRow) {
  return {
    id: row.id,
    memberId: row.member_id,
    label: row.label,
    recipientName: row.recipient_name,
    phone: row.phone,
    countryCode: row.country_code,
    countryName: row.country_name,
    region: row.region,
    city: row.city,
    district: row.district,
    postalCode: row.postal_code,
    addressLine1: row.address_line1,
    addressLine2: row.address_line2,
    isDefault: row.is_default === 1,
    remarks: row.remarks,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function parsePermissions(value: string) {
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
  return [];
}

function mapStaffDepartment(row: StaffDepartmentRow) {
  return {
    id: row.id,
    name: row.name,
    status: row.status,
    statusLabel: staffStatusLabels[row.status] ?? row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function mapStaffRole(row: StaffRoleRow) {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    permissions: parsePermissions(row.permissions_json),
    permissionCount: parsePermissions(row.permissions_json).length,
    status: row.status,
    statusLabel: staffStatusLabels[row.status] ?? row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function mapStaffAccount(row: StaffAccountRow) {
  return {
    id: row.id,
    email: row.email,
    displayName: row.display_name,
    departmentId: row.department_id,
    departmentName: row.department_name,
    roleId: row.role_id,
    roleName: row.role_name,
    status: row.status,
    statusLabel: staffStatusLabels[row.status] ?? row.status,
    lastLoginAt: row.last_login_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function mapExchangeRate(row: ExchangeRateRow) {
  return {
    id: row.id,
    baseCurrency: row.base_currency,
    quoteCurrency: row.quote_currency,
    baseCurrencyName: row.base_currency_name,
    quoteCurrencyName: row.quote_currency_name,
    rate: row.rate,
    status: row.status,
    statusLabel: row.status === "active" ? "啟用" : "停用",
    note: row.note,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function mapWarehouse(row: WarehouseRow) {
  return {
    id: row.id,
    code: row.code,
    name: row.name,
    type: row.type,
    country: row.country,
    postalCode: row.postal_code,
    address: row.address,
    phone: row.phone,
    contactName: row.contact_name,
    status: row.status,
    statusLabel: row.status === "active" ? "啟用" : "停用",
    isDefault: row.is_default === 1,
    allowInbound: row.allow_inbound === 1,
    allowOutbound: row.allow_outbound === 1,
    sortOrder: row.sort_order,
    remarks: row.remarks,
    createdAt: row.created_at,
    updatedAt: row.updated_at
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

function walletTransactionStatement(
  db: D1Database,
  input: {
    memberId: string;
    direction: "credit" | "debit";
    category: string;
    amountHkd: number;
    balanceAfterHkd: number | null;
    relatedType?: string | null;
    relatedId?: string | null;
    title: string;
    description?: string | null;
    status?: "pending" | "posted" | "rejected" | "cancelled";
  }
) {
  return db.prepare(
    `INSERT INTO wallet_transactions (
       id, member_id, direction, category, amount_hkd, balance_after_hkd,
       related_type, related_id, title, description, status
     )
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    walletTransactionId(),
    input.memberId,
    input.direction,
    input.category,
    input.amountHkd,
    input.balanceAfterHkd,
    input.relatedType ?? null,
    input.relatedId ?? null,
    input.title,
    input.description ?? null,
    input.status ?? "posted"
  );
}

async function getProfile(db: D1Database) {
  const member = await first<MemberProfileRow>(
    db,
    `SELECT members.id, members.email, members.user_code, members.display_name, members.locale, members.level_code, wallets.balance_hkd
       FROM members
       JOIN wallets ON wallets.member_id = members.id
      WHERE members.id = ?`,
    demoMemberId
  );
  if (!member) throw new Error("Demo member has not been migrated");
  return {
    id: member.id,
    email: member.email,
    userCode: member.user_code,
    displayName: member.display_name,
    locale: member.locale,
    levelCode: member.level_code,
    balanceHkd: member.balance_hkd
  };
}

async function login(db: D1Database, body: JsonObject) {
  const mode = text(body, "mode") === "admin" ? "admin" : "member";
  const email = text(body, "email").toLowerCase();
  const password = text(body, "password");
  if (!email || !password) return json({ error: "請輸入電郵和密碼" }, { status: 400 });
  const hash = await passwordHash(password);
  const defaultPassword = mode === "admin" ? "admin123456" : "member123456";
  const defaultHash = await passwordHash(defaultPassword);

  if (mode === "admin") {
    const staff = await first<{ id: string; email: string; display_name: string; password_hash: string | null; status: string }>(
      db,
      "SELECT id, email, display_name, password_hash, status FROM staff_accounts WHERE LOWER(email) = ?",
      email
    );
    if (!staff || staff.status !== "active") return json({ error: "後台帳號不存在或已停用" }, { status: 401 });
    if (staff.password_hash ? staff.password_hash !== hash : hash !== defaultHash) return json({ error: "電郵或密碼錯誤" }, { status: 401 });
    if (!staff.password_hash) await db.prepare("UPDATE staff_accounts SET password_hash = ?, last_login_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(defaultHash, staff.id).run();
    else await db.prepare("UPDATE staff_accounts SET last_login_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(staff.id).run();
    const sid = sessionId();
    await db.prepare("INSERT INTO auth_sessions (id, actor_type, actor_id, expires_at) VALUES (?, 'staff', ?, datetime('now', '+7 days'))").bind(sid, staff.id).run();
    return json({ authenticated: true, mode: "admin", user: { id: staff.id, email: staff.email, displayName: staff.display_name } }, { headers: { "Set-Cookie": sessionCookie(sid) } });
  }

  const member = await first<{ id: string; email: string; display_name: string; password_hash: string | null }>(
    db,
    "SELECT id, email, display_name, password_hash FROM members WHERE LOWER(email) = ?",
    email
  );
  if (!member) return json({ error: "會員帳號不存在" }, { status: 401 });
  if (member.password_hash ? member.password_hash !== hash : hash !== defaultHash) return json({ error: "電郵或密碼錯誤" }, { status: 401 });
  if (!member.password_hash) await db.prepare("UPDATE members SET password_hash = ? WHERE id = ?").bind(defaultHash, member.id).run();
  const sid = sessionId();
  await db.prepare("INSERT INTO auth_sessions (id, actor_type, actor_id, expires_at) VALUES (?, 'member', ?, datetime('now', '+7 days'))").bind(sid, member.id).run();
  return json({ authenticated: true, mode: "member", user: { id: member.id, email: member.email, displayName: member.display_name } }, { headers: { "Set-Cookie": sessionCookie(sid) } });
}

async function authSession(db: D1Database, request: Request) {
  const auth = await currentAuth(db, request);
  if (auth.memberId) {
    const row = await first<{ id: string; email: string; display_name: string }>(db, "SELECT id, email, display_name FROM members WHERE id = ?", auth.memberId);
    return json({ authenticated: Boolean(row), mode: "member", user: row ? { id: row.id, email: row.email, displayName: row.display_name } : null });
  }
  if (auth.staffId) {
    const row = await first<{ id: string; email: string; display_name: string }>(db, "SELECT id, email, display_name FROM staff_accounts WHERE id = ?", auth.staffId);
    return json({ authenticated: Boolean(row), mode: "admin", user: row ? { id: row.id, email: row.email, displayName: row.display_name } : null });
  }
  return json({ authenticated: false, mode: null, user: null });
}

async function logout(db: D1Database, request: Request) {
  const id = cookieValue(request, "dp_session");
  if (id) await db.prepare("DELETE FROM auth_sessions WHERE id = ?").bind(id).run();
  return json({ authenticated: false }, { headers: { "Set-Cookie": clearSessionCookie() } });
}

function mapAdminMember(row: AdminMemberRow) {
  return {
    id: row.id,
    email: row.email,
    userCode: row.user_code,
    displayName: row.display_name,
    locale: row.locale,
    levelCode: row.level_code,
    balanceHkd: row.balance_hkd,
    createdAt: row.created_at,
    orderCount: row.order_count ?? 0,
    packageCount: row.package_count ?? 0,
    topupCount: row.topup_count ?? 0
  };
}

async function listAdminMembers(db: D1Database) {
  const rows = await all<AdminMemberRow>(
    db,
    `SELECT members.id,
            members.email,
            members.user_code,
            members.display_name,
            members.locale,
            members.level_code,
            members.created_at,
            COALESCE(wallets.balance_hkd, 0) AS balance_hkd,
            COUNT(DISTINCT procurement_orders.id) AS order_count,
            COUNT(DISTINCT inbound_packages.id) AS package_count,
            COUNT(DISTINCT topup_requests.id) AS topup_count
       FROM members
       LEFT JOIN wallets ON wallets.member_id = members.id
       LEFT JOIN procurement_orders ON procurement_orders.member_id = members.id
       LEFT JOIN inbound_packages ON inbound_packages.member_id = members.id
       LEFT JOIN topup_requests ON topup_requests.member_id = members.id
      GROUP BY members.id
      ORDER BY members.created_at DESC`
  );
  return json({ items: rows.map(mapAdminMember) });
}

async function createProcurementOrder(db: D1Database, body: JsonObject) {
  const platform = text(body, "platform");
  const productUrl = text(body, "productUrl");
  const productImageUrl = text(body, "productImageUrl") || null;
  const title = text(body, "title");
  const spec = text(body, "spec") || null;
  const remarks = text(body, "remarks") || null;
  const quantity = integer(body, "quantity") ?? 1;
  const unitPriceJpy = integer(body, "unitPriceJpy");
  const localShippingJpy = integer(body, "localShippingJpy") ?? 0;

  if (!platform || !productUrl || !title || quantity < 1 || !unitPriceJpy || unitPriceJpy < 1) {
    return json({ error: "請填寫商品連結、平台、商品名稱、單價和有效數量" }, { status: 400 });
  }
  if (localShippingJpy < 0) return json({ error: "日本國內運費不能小於 0" }, { status: 400 });

  const id = orderId();
  const itemAmountJpy = unitPriceJpy * quantity;
  const quotedTotalHkd = calculateProcurementPayable(itemAmountJpy, localShippingJpy);
  await db.prepare(
    `INSERT INTO procurement_orders (
       id, member_id, platform, product_url, product_image_url, title, spec, quantity, status,
       item_amount_jpy, local_shipping_jpy, service_fee_hkd, quoted_total_hkd, remarks, quoted_at
     )
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending_payment', ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`
  ).bind(
    id,
    demoMemberId,
    platform,
    productUrl,
    productImageUrl,
    title,
    spec,
    quantity,
    itemAmountJpy,
    localShippingJpy,
    defaultProcurementServiceFeeHkd,
    quotedTotalHkd,
    remarks
  ).run();
  await addAudit(db, "procurement.create", id, "member", { platform, title, quantity, productImageUrl, itemAmountJpy, localShippingJpy, quotedTotalHkd });

  const row = await first<ProcurementOrderRow>(db, "SELECT * FROM procurement_orders WHERE id = ?", id);
  return json({ item: mapOrder(row!) }, { status: 201 });
}

function offlineItems(input: unknown) {
  if (!Array.isArray(input)) return [];
  return input.map((entry) => {
    const item = entry && typeof entry === "object" ? entry as JsonObject : {};
    return {
      itemName: text(item, "itemName"),
      itemType: text(item, "itemType"),
      spec: text(item, "spec") || null,
      color: text(item, "color") || null,
      unitPriceJpy: integer(item, "unitPriceJpy") ?? 0,
      quantity: integer(item, "quantity") ?? 0,
      imageUrl: text(item, "imageUrl")
    };
  });
}

async function createOfflineProcurementOrder(db: D1Database, body: JsonObject) {
  const storeName = text(body, "storeName");
  const storeContact = text(body, "storeContact");
  const storePhone = text(body, "storePhone");
  const storeAddress = text(body, "storeAddress");
  const remarks = text(body, "remarks") || null;
  const items = offlineItems(body.items);

  if (!storeName || !storeContact || !storePhone || !storeAddress) {
    return json({ error: "請完整填寫門店名稱、聯絡人、聯絡電話和門店地址" }, { status: 400 });
  }
  if (!items.length) return json({ error: "請至少新增一件線下代購商品" }, { status: 400 });

  for (const item of items) {
    if (!item.itemName || !item.itemType || !item.imageUrl || item.unitPriceJpy < 1 || item.quantity < 1) {
      return json({ error: "每件商品都需要填寫名稱、類型、單價、數量和產品圖片" }, { status: 400 });
    }
  }

  const id = orderId();
  const itemAmountJpy = items.reduce((sum, item) => sum + item.unitPriceJpy * item.quantity, 0);
  const quotedTotalHkd = calculateProcurementPayable(itemAmountJpy, 0);
  const title = items.length === 1 ? items[0].itemName : `${items[0].itemName} 等 ${items.length} 件`;
  const firstImage = items[0].imageUrl;

  const statements = [
    db.prepare(
      `INSERT INTO procurement_orders (
         id, member_id, order_type, platform, product_url, product_image_url, title, spec, quantity, status,
         item_amount_jpy, local_shipping_jpy, service_fee_hkd, quoted_total_hkd, remarks, quoted_at,
         store_name, store_contact, store_phone, store_address, currency
       )
       VALUES (?, ?, 'offline', ?, '', ?, ?, ?, ?, 'pending_payment', ?, 0, ?, ?, ?, CURRENT_TIMESTAMP, ?, ?, ?, ?, 'JPY')`
    ).bind(
      id,
      demoMemberId,
      "線下門店",
      firstImage,
      title,
      items[0].spec,
      items.reduce((sum, item) => sum + item.quantity, 0),
      itemAmountJpy,
      defaultProcurementServiceFeeHkd,
      quotedTotalHkd,
      remarks,
      storeName,
      storeContact,
      storePhone,
      storeAddress
    )
  ];

  for (const item of items) {
    statements.push(
      db.prepare(
        `INSERT INTO procurement_order_items (
           id, order_id, item_name, item_type, spec, color, unit_price_jpy, quantity, image_url
         )
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(orderItemId(), id, item.itemName, item.itemType, item.spec, item.color, item.unitPriceJpy, item.quantity, item.imageUrl)
    );
  }

  await db.batch(statements);
  await addAudit(db, "procurement.offline.create", id, "member", { storeName, itemAmountJpy, quotedTotalHkd, itemCount: items.length });

  const row = await first<ProcurementOrderRow>(db, "SELECT * FROM procurement_orders WHERE id = ?", id);
  const itemRows = await all<ProcurementOrderItemRow>(db, "SELECT * FROM procurement_order_items WHERE order_id = ? ORDER BY created_at ASC", id);
  return json({ item: mapOrder(row!, itemRows) }, { status: 201 });
}

async function attachOrderItems(db: D1Database, rows: ProcurementOrderRow[]) {
  return Promise.all(rows.map(async (row) => {
    if ((row.order_type ?? "online") !== "offline") return mapOrder(row);
    const items = await all<ProcurementOrderItemRow>(db, "SELECT * FROM procurement_order_items WHERE order_id = ? ORDER BY created_at ASC", row.id);
    return mapOrder(row, items);
  }));
}

async function listMemberOrders(db: D1Database) {
  const rows = await all<ProcurementOrderRow>(
    db,
    "SELECT * FROM procurement_orders WHERE member_id = ? ORDER BY updated_at DESC",
    demoMemberId
  );
  return json({ items: await attachOrderItems(db, rows) });
}

async function listAdminOrders(db: D1Database) {
  const rows = await all<ProcurementOrderRow>(db, "SELECT * FROM procurement_orders ORDER BY updated_at DESC");
  return json({ items: await attachOrderItems(db, rows) });
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
  if (!["pending_payment"].includes(row.status)) {
    return json({ error: "Only pending or quoted orders can be quoted" }, { status: 409 });
  }

  await db.prepare(
    `UPDATE procurement_orders
        SET status = 'pending_payment',
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
  if (row.status !== "pending_payment") return json({ error: "Only pending payment orders can be paid" }, { status: 409 });
  const payableHkd = row.quoted_total_hkd && row.quoted_total_hkd > 0
    ? row.quoted_total_hkd
    : row.item_amount_jpy && row.item_amount_jpy > 0
      ? calculateProcurementPayable(row.item_amount_jpy, row.local_shipping_jpy ?? 0)
      : 0;
  if (payableHkd < 1) return json({ error: "此訂單缺少可付款金額，請重新提交訂單或聯絡客服補價" }, { status: 409 });

  const wallet = await first<{ balance_hkd: number }>(db, "SELECT balance_hkd FROM wallets WHERE member_id = ?", demoMemberId);
  if (!wallet || wallet.balance_hkd < payableHkd) {
    return json({ error: "Insufficient balance" }, { status: 409 });
  }

  await db.batch([
    db.prepare("UPDATE wallets SET balance_hkd = balance_hkd - ?, updated_at = CURRENT_TIMESTAMP WHERE member_id = ?").bind(payableHkd, demoMemberId),
    db.prepare(
      `UPDATE procurement_orders
          SET status = 'platform_pending_order',
              service_fee_hkd = COALESCE(service_fee_hkd, ?),
              quoted_total_hkd = COALESCE(quoted_total_hkd, ?),
              quoted_at = COALESCE(quoted_at, CURRENT_TIMESTAMP),
              paid_at = CURRENT_TIMESTAMP,
              updated_at = CURRENT_TIMESTAMP
        WHERE id = ?`
    ).bind(defaultProcurementServiceFeeHkd, payableHkd, id)
    ,
    walletTransactionStatement(db, {
      memberId: demoMemberId,
      direction: "debit",
      category: "procurement_payment",
      amountHkd: payableHkd,
      balanceAfterHkd: wallet.balance_hkd - payableHkd,
      relatedType: "procurement_order",
      relatedId: id,
      title: "代購訂單餘額付款",
      description: row.title
    })
  ]);
  await addAudit(db, "procurement.pay", id, "member", { amountHkd: payableHkd });

  const updated = await first<ProcurementOrderRow>(db, "SELECT * FROM procurement_orders WHERE id = ?", id);
  return json({ item: mapOrder(updated!) });
}

async function cancelOrder(db: D1Database, id: string) {
  const row = await first<ProcurementOrderRow>(db, "SELECT * FROM procurement_orders WHERE id = ? AND member_id = ?", id, demoMemberId);
  if (!row) return json({ error: "Order not found" }, { status: 404 });
  if (["shipped", "completed", "cancelled"].includes(row.status)) {
    return json({ error: "Purchased or cancelled orders cannot be cancelled" }, { status: 409 });
  }

  const refund = row.status !== "pending_payment" ? row.quoted_total_hkd ?? 0 : 0;
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
    const wallet = await first<{ balance_hkd: number }>(db, "SELECT balance_hkd FROM wallets WHERE member_id = ?", demoMemberId);
    updates.push(walletTransactionStatement(db, {
      memberId: demoMemberId,
      direction: "credit",
      category: "refund",
      amountHkd: refund,
      balanceAfterHkd: (wallet?.balance_hkd ?? 0) + refund,
      relatedType: "procurement_order",
      relatedId: id,
      title: "代購訂單取消退款",
      description: row.title
    }));
  }
  await db.batch(updates);
  await addAudit(db, "procurement.cancel", id, "member", { refundHkd: refund });

  const updated = await first<ProcurementOrderRow>(db, "SELECT * FROM procurement_orders WHERE id = ?", id);
  return json({ item: mapOrder(updated!) });
}

async function markPurchased(db: D1Database, id: string) {
  const row = await first<ProcurementOrderRow>(db, "SELECT * FROM procurement_orders WHERE id = ?", id);
  if (!row) return json({ error: "Order not found" }, { status: 404 });
  if (!["platform_pending_order"].includes(row.status)) {
    return json({ error: "Only platform pending order can be marked as waiting shipment" }, { status: 409 });
  }

  await db.prepare(
    `UPDATE procurement_orders
        SET status = 'platform_pending_shipment',
            purchased_at = CURRENT_TIMESTAMP,
            updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`
  ).bind(id).run();
  await addAudit(db, "procurement.purchase", id, "staff");

  const updated = await first<ProcurementOrderRow>(db, "SELECT * FROM procurement_orders WHERE id = ?", id);
  return json({ item: mapOrder(updated!) });
}

function validateTicketInput(type: string, subtype: string, content: string) {
  if (!type || !ticketSubtypes[type]) return "請選擇有效的工單類型";
  if (!subtype || !ticketSubtypes[type].includes(subtype)) return "請選擇有效的工單子類型";
  if (!content || content.length < 2) return "請填寫工單內容";
  return "";
}

async function listMemberTickets(db: D1Database) {
  const rows = await all<SupportTicketRow>(
    db,
    "SELECT * FROM support_tickets WHERE member_id = ? ORDER BY updated_at DESC",
    demoMemberId
  );
  return json({ items: rows.map((row) => mapTicket(row)) });
}

async function listAdminTickets(db: D1Database) {
  const rows = await all<SupportTicketRow>(db, "SELECT * FROM support_tickets ORDER BY updated_at DESC");
  return json({ items: rows.map((row) => mapTicket(row)) });
}

async function getTicket(db: D1Database, id: string, scope: "member" | "admin") {
  const row = await first<SupportTicketRow>(
    db,
    scope === "member" ? "SELECT * FROM support_tickets WHERE id = ? AND member_id = ?" : "SELECT * FROM support_tickets WHERE id = ?",
    ...(scope === "member" ? [id, demoMemberId] : [id])
  );
  if (!row) return json({ error: "工單不存在" }, { status: 404 });
  const messages = await all<SupportTicketMessageRow>(
    db,
    "SELECT * FROM support_ticket_messages WHERE ticket_id = ? ORDER BY created_at ASC",
    id
  );
  return json({ item: mapTicket(row, messages) });
}

async function createTicket(db: D1Database, body: JsonObject) {
  const type = text(body, "type");
  const subtype = text(body, "subtype");
  const content = text(body, "content");
  const validationError = validateTicketInput(type, subtype, content);
  if (validationError) return json({ error: validationError }, { status: 400 });

  const id = ticketId();
  await db.batch([
    db.prepare(
      `INSERT INTO support_tickets (id, member_id, type, subtype, content)
       VALUES (?, ?, ?, ?, ?)`
    ).bind(id, demoMemberId, type, subtype, content),
    db.prepare(
      `INSERT INTO support_ticket_messages (id, ticket_id, actor_type, actor_id, message)
       VALUES (?, ?, 'member', ?, ?)`
    ).bind(messageId(), id, demoMemberId, content)
  ]);

  const row = await first<SupportTicketRow>(db, "SELECT * FROM support_tickets WHERE id = ?", id);
  return json({ item: mapTicket(row!) }, { status: 201 });
}

async function addTicketMessage(db: D1Database, id: string, body: JsonObject, actorType: "member" | "staff") {
  const message = text(body, "message");
  if (!message) return json({ error: "請填寫回覆內容" }, { status: 400 });

  const row = await first<SupportTicketRow>(
    db,
    actorType === "member" ? "SELECT * FROM support_tickets WHERE id = ? AND member_id = ?" : "SELECT * FROM support_tickets WHERE id = ?",
    ...(actorType === "member" ? [id, demoMemberId] : [id])
  );
  if (!row) return json({ error: "工單不存在" }, { status: 404 });
  if (row.status === "closed") return json({ error: "已關閉工單不可補充或回覆" }, { status: 409 });

  const nextStatus = actorType === "staff" ? "replied" : "processing";
  await db.batch([
    db.prepare(
      `INSERT INTO support_ticket_messages (id, ticket_id, actor_type, actor_id, message)
       VALUES (?, ?, ?, ?, ?)`
    ).bind(messageId(), id, actorType, actorType === "member" ? demoMemberId : "admin-demo", message),
    db.prepare("UPDATE support_tickets SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(nextStatus, id)
  ]);
  return getTicket(db, id, actorType === "member" ? "member" : "admin");
}

async function updateTicketStatus(db: D1Database, id: string, body: JsonObject) {
  const status = text(body, "status");
  if (!ticketStatusLabels[status]) return json({ error: "請選擇有效狀態" }, { status: 400 });
  const row = await first<SupportTicketRow>(db, "SELECT * FROM support_tickets WHERE id = ?", id);
  if (!row) return json({ error: "工單不存在" }, { status: 404 });

  await db.prepare(
    `UPDATE support_tickets
        SET status = ?,
            closed_at = CASE WHEN ? = 'closed' THEN CURRENT_TIMESTAMP ELSE closed_at END,
            updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`
  ).bind(status, status, id).run();
  return getTicket(db, id, "admin");
}

async function listMemberInboundPackages(db: D1Database) {
  const rows = await all<InboundPackageRow>(
    db,
    "SELECT * FROM inbound_packages WHERE member_id = ? ORDER BY updated_at DESC",
    demoMemberId
  );
  return json({ items: rows.map(mapInboundPackage) });
}

async function listAdminInboundPackages(db: D1Database) {
  const rows = await all<InboundPackageRow>(db, "SELECT * FROM inbound_packages ORDER BY updated_at DESC");
  return json({ items: rows.map(mapInboundPackage) });
}

async function normalizeWarehouse(db: D1Database, warehouseId: string) {
  const normalized = warehouseId.trim();
  const row = normalized
    ? await first<WarehouseRow>(
      db,
      "SELECT * FROM warehouses WHERE (id = ? OR code = ?) AND status = 'active'",
      normalized,
      normalized.toUpperCase()
    )
    : await first<WarehouseRow>(db, "SELECT * FROM warehouses WHERE is_default = 1 AND status = 'active' ORDER BY sort_order ASC LIMIT 1");
  if (row) return { id: row.id, name: row.name, allowInbound: row.allow_inbound === 1, allowOutbound: row.allow_outbound === 1 };
  if (warehouseId === "tokyo") return { id: "tokyo", name: "東京新橋門市", allowInbound: true, allowOutbound: false };
  return { id: "funabashi", name: "船橋集運倉", allowInbound: true, allowOutbound: true };
}

async function createInboundForecast(db: D1Database, body: JsonObject) {
  const warehouse = await normalizeWarehouse(db, text(body, "warehouseId"));
  const japaneseTrackingNo = text(body, "japaneseTrackingNo");
  const platform = text(body, "platform") || null;
  const senderName = text(body, "senderName") || null;
  const itemName = text(body, "itemName");
  const quantity = integer(body, "quantity") ?? 1;
  const remarks = text(body, "remarks") || null;

  if (!japaneseTrackingNo || !itemName || quantity < 1) {
    return json({ error: "請填寫日本物流單號、商品名稱和有效數量" }, { status: 400 });
  }
  if (!warehouse.allowInbound) return json({ error: "此倉庫目前不允許入庫" }, { status: 409 });

  const profile = await getProfile(db);
  const id = inboundPackageId();
  await db.prepare(
    `INSERT INTO inbound_packages (
       id, member_id, source_type, warehouse_id, warehouse_name, japanese_tracking_no,
       warehouse_inbound_no, customer_package_no, platform, sender_name, item_name,
       quantity, recipient_code, status, remarks
     )
     VALUES (?, ?, 'member_forecast', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'forecasted', ?)`
  ).bind(
    id,
    demoMemberId,
    warehouse.id,
    warehouse.name,
    japaneseTrackingNo,
    warehouseInboundNo(),
    id,
    platform,
    senderName,
    itemName,
    quantity,
    profile.userCode,
    remarks
  ).run();

  const row = await first<InboundPackageRow>(db, "SELECT * FROM inbound_packages WHERE id = ?", id);
  return json({ item: mapInboundPackage(row!) }, { status: 201 });
}

async function findMemberByCode(db: D1Database, recipientCode: string) {
  const code = recipientCode.trim().toUpperCase().replace(/^DPHK/, "");
  if (!code) return null;
  return first<MemberProfileRow>(
    db,
    `SELECT members.id, members.email, members.user_code, members.display_name, members.locale, members.level_code, wallets.balance_hkd
       FROM members
       JOIN wallets ON wallets.member_id = members.id
      WHERE UPPER(members.user_code) = ?`,
    code
  );
}

async function scanInboundPackage(db: D1Database, body: JsonObject) {
  const warehouse = await normalizeWarehouse(db, text(body, "warehouseId"));
  const japaneseTrackingNo = text(body, "japaneseTrackingNo");
  const recipientCode = text(body, "recipientCode");
  const platform = text(body, "platform") || null;
  const senderName = text(body, "senderName") || null;
  const itemName = text(body, "itemName") || "未命名包裹";
  const quantity = integer(body, "quantity") ?? 1;
  const weightKg = Number(text(body, "weightKg")) || null;
  const lengthCm = integer(body, "lengthCm");
  const widthCm = integer(body, "widthCm");
  const heightCm = integer(body, "heightCm");
  const shelfCode = text(body, "shelfCode") || null;
  const adminNote = text(body, "adminNote") || null;

  if (!japaneseTrackingNo) return json({ error: "請填寫日本物流單號" }, { status: 400 });
  if (!warehouse.allowInbound) return json({ error: "此倉庫目前不允許入庫" }, { status: 409 });

  const matchedMember = recipientCode ? await findMemberByCode(db, recipientCode) : null;
  const existing = await first<InboundPackageRow>(
    db,
    "SELECT * FROM inbound_packages WHERE japanese_tracking_no = ? ORDER BY created_at DESC",
    japaneseTrackingNo
  );

  if (existing) {
    const memberId = existing.member_id ?? matchedMember?.id ?? null;
    const status = memberId ? "inbounded" : "orphan";
    await db.prepare(
      `UPDATE inbound_packages
          SET member_id = ?,
              warehouse_id = ?,
              warehouse_name = ?,
              platform = COALESCE(?, platform),
              sender_name = COALESCE(?, sender_name),
              item_name = CASE WHEN item_name = '' OR item_name = '未命名包裹' THEN ? ELSE item_name END,
              quantity = ?,
              recipient_code = COALESCE(?, recipient_code),
              status = ?,
              weight_kg = ?,
              length_cm = ?,
              width_cm = ?,
              height_cm = ?,
              shelf_code = ?,
              admin_note = ?,
              inbounded_at = COALESCE(inbounded_at, CURRENT_TIMESTAMP),
              updated_at = CURRENT_TIMESTAMP
        WHERE id = ?`
    ).bind(memberId, warehouse.id, warehouse.name, platform, senderName, itemName, quantity, recipientCode || null, status, weightKg, lengthCm, widthCm, heightCm, shelfCode, adminNote, existing.id).run();
    const updated = await first<InboundPackageRow>(db, "SELECT * FROM inbound_packages WHERE id = ?", existing.id);
    return json({ item: mapInboundPackage(updated!) });
  }

  const id = inboundPackageId();
  await db.prepare(
    `INSERT INTO inbound_packages (
       id, member_id, source_type, warehouse_id, warehouse_name, japanese_tracking_no,
       warehouse_inbound_no, customer_package_no, platform, sender_name, item_name, quantity,
       recipient_code, status, weight_kg, length_cm, width_cm, height_cm, shelf_code, admin_note, inbounded_at
     )
     VALUES (?, ?, 'admin_scan', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`
  ).bind(
    id,
    matchedMember?.id ?? null,
    warehouse.id,
    warehouse.name,
    japaneseTrackingNo,
    warehouseInboundNo(),
    id,
    platform,
    senderName,
    itemName,
    quantity,
    recipientCode || matchedMember?.user_code || null,
    matchedMember ? "inbounded" : "orphan",
    weightKg,
    lengthCm,
    widthCm,
    heightCm,
    shelfCode,
    adminNote
  ).run();

  const row = await first<InboundPackageRow>(db, "SELECT * FROM inbound_packages WHERE id = ?", id);
  return json({ item: mapInboundPackage(row!) }, { status: 201 });
}

async function claimInboundPackage(db: D1Database, id: string, body: JsonObject) {
  const memberCode = text(body, "memberCode");
  if (!memberCode) return json({ error: "請填寫會員識別碼" }, { status: 400 });
  const member = await findMemberByCode(db, memberCode);
  if (!member) return json({ error: "找不到對應會員識別碼" }, { status: 404 });

  const row = await first<InboundPackageRow>(db, "SELECT * FROM inbound_packages WHERE id = ?", id);
  if (!row) return json({ error: "包裹不存在" }, { status: 404 });

  await db.prepare(
    `UPDATE inbound_packages
        SET member_id = ?,
            recipient_code = ?,
            status = 'claimed',
            claimed_at = CURRENT_TIMESTAMP,
            updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`
  ).bind(member.id, member.user_code, id).run();
  const updated = await first<InboundPackageRow>(db, "SELECT * FROM inbound_packages WHERE id = ?", id);
  return json({ item: mapInboundPackage(updated!) });
}

async function listMemberTopupRequests(db: D1Database) {
  const rows = await all<TopupRequestRow>(
    db,
    "SELECT * FROM topup_requests WHERE member_id = ? ORDER BY updated_at DESC",
    demoMemberId
  );
  return json({ items: rows.map(mapTopupRequest) });
}

async function listAdminTopupRequests(db: D1Database) {
  const rows = await all<AdminTopupRequestRow>(
    db,
    `SELECT topup_requests.*,
            members.email as member_email,
            members.display_name as member_display_name,
            members.user_code as member_user_code
       FROM topup_requests
       LEFT JOIN members ON members.id = topup_requests.member_id
      ORDER BY topup_requests.updated_at DESC`
  );
  const logs = await all<TopupReviewLogRow>(
    db,
    "SELECT * FROM topup_review_logs ORDER BY created_at DESC"
  );
  const logsByRequest = logs.reduce<Record<string, TopupReviewLogRow[]>>((acc, log) => {
    acc[log.topup_request_id] = [...(acc[log.topup_request_id] ?? []), log];
    return acc;
  }, {});
  rows.forEach((row) => {
    (row as AdminTopupRequestRow & { review_logs: TopupReviewLogRow[] }).review_logs = logsByRequest[row.id] ?? [];
  });
  return json({ items: rows.map(mapTopupRequest) });
}

async function listMemberWalletTransactions(db: D1Database) {
  const rows = await all<WalletTransactionRow>(
    db,
    "SELECT * FROM wallet_transactions WHERE member_id = ? ORDER BY created_at DESC",
    demoMemberId
  );
  return json({ items: rows.map(mapWalletTransaction) });
}

async function listAdminWalletTransactions(db: D1Database) {
  const rows = await all<AdminWalletTransactionRow>(
    db,
    `SELECT wallet_transactions.*,
            members.email as member_email,
            members.display_name as member_display_name,
            members.user_code as member_user_code
       FROM wallet_transactions
       LEFT JOIN members ON members.id = wallet_transactions.member_id
      ORDER BY wallet_transactions.created_at DESC`
  );
  return json({ items: rows.map(mapWalletTransaction) });
}

async function reviewTopupRequest(db: D1Database, id: string, decision: "approve" | "reject") {
  const row = await first<TopupRequestRow>(db, "SELECT * FROM topup_requests WHERE id = ?", id);
  if (!row) return json({ error: "充值申請不存在" }, { status: 404 });
  if (["approved", "rejected", "cancelled"].includes(row.status)) {
    return json({ error: "此充值申請已完成審核，不能重複處理" }, { status: 409 });
  }

  if (decision === "reject") {
    await db.batch([
      db.prepare(
        `UPDATE topup_requests
            SET status = 'rejected',
                reviewed_at = CURRENT_TIMESTAMP,
                updated_at = CURRENT_TIMESTAMP
          WHERE id = ?`
      ).bind(id),
      db.prepare(
        `UPDATE wallet_transactions
            SET status = 'rejected'
          WHERE related_type = 'topup_request' AND related_id = ? AND status = 'pending'`
      ).bind(id),
      db.prepare(
        `INSERT INTO topup_review_logs (
           id, topup_request_id, actor_id, action, from_status, to_status, amount_hkd, note
         )
         VALUES (?, ?, ?, 'reject', ?, 'rejected', ?, ?)`
      ).bind(topupReviewLogId(), id, "admin-demo", row.status, row.amount_hkd, "後台拒絕充值申請")
    ]);
    const updated = await first<TopupRequestRow>(db, "SELECT * FROM topup_requests WHERE id = ?", id);
    return json({ item: mapTopupRequest(updated!) });
  }

  const wallet = await first<{ balance_hkd: number }>(db, "SELECT balance_hkd FROM wallets WHERE member_id = ?", row.member_id);
  const balanceAfter = (wallet?.balance_hkd ?? 0) + row.amount_hkd;
  const statements = [];
  if (wallet) {
    statements.push(db.prepare("UPDATE wallets SET balance_hkd = balance_hkd + ?, updated_at = CURRENT_TIMESTAMP WHERE member_id = ?").bind(row.amount_hkd, row.member_id));
  } else {
    statements.push(db.prepare("INSERT INTO wallets (member_id, balance_hkd) VALUES (?, ?)").bind(row.member_id, row.amount_hkd));
  }
  statements.push(
    db.prepare(
      `UPDATE topup_requests
          SET status = 'approved',
              reviewed_at = CURRENT_TIMESTAMP,
              updated_at = CURRENT_TIMESTAMP
        WHERE id = ?`
    ).bind(id),
    db.prepare(
      `UPDATE wallet_transactions
          SET status = 'posted',
              balance_after_hkd = ?
        WHERE related_type = 'topup_request' AND related_id = ? AND status = 'pending'`
    ).bind(balanceAfter, id),
    db.prepare(
      `INSERT INTO topup_review_logs (
         id, topup_request_id, actor_id, action, from_status, to_status, amount_hkd, note
       )
       VALUES (?, ?, ?, 'approve', ?, 'approved', ?, ?)`
    ).bind(topupReviewLogId(), id, "admin-demo", row.status, row.amount_hkd, `入帳後餘額 HKD ${balanceAfter}`)
  );
  await db.batch(statements);

  const updated = await first<TopupRequestRow>(db, "SELECT * FROM topup_requests WHERE id = ?", id);
  return json({ item: mapTopupRequest(updated!) });
}

async function listMemberShippingAddresses(db: D1Database) {
  const rows = await all<ShippingAddressRow>(
    db,
    "SELECT * FROM shipping_addresses WHERE member_id = ? ORDER BY is_default DESC, updated_at DESC",
    demoMemberId
  );
  return json({ items: rows.map(mapShippingAddress), countries: shippingCountries });
}

function shippingAddressPayload(body: JsonObject) {
  const countryCode = text(body, "countryCode").toUpperCase();
  const countryName = shippingCountries[countryCode];
  if (!countryName) return { error: "請選擇有效的國家或地區" };

  const recipientName = text(body, "recipientName");
  const phone = text(body, "phone");
  const addressLine1 = text(body, "addressLine1");
  if (!recipientName || !phone || !addressLine1) {
    return { error: "請填寫收件人、電話和詳細地址" };
  }

  return {
    label: text(body, "label") || null,
    recipientName,
    phone,
    countryCode,
    countryName,
    region: text(body, "region") || null,
    city: text(body, "city") || null,
    district: text(body, "district") || null,
    postalCode: text(body, "postalCode") || null,
    addressLine1,
    addressLine2: text(body, "addressLine2") || null,
    isDefault: booleanValue(body, "isDefault"),
    remarks: text(body, "remarks") || null
  };
}

async function createShippingAddress(db: D1Database, body: JsonObject) {
  const payload = shippingAddressPayload(body);
  if ("error" in payload) return json({ error: payload.error }, { status: 400 });

  const existingCount = await first<{ count: number }>(db, "SELECT COUNT(*) as count FROM shipping_addresses WHERE member_id = ?", demoMemberId);
  const isDefault = payload.isDefault || !existingCount?.count;
  const id = shippingAddressId();
  const statements = [];
  if (isDefault) {
    statements.push(db.prepare("UPDATE shipping_addresses SET is_default = 0, updated_at = CURRENT_TIMESTAMP WHERE member_id = ?").bind(demoMemberId));
  }
  statements.push(db.prepare(
    `INSERT INTO shipping_addresses (
       id, member_id, label, recipient_name, phone, country_code, country_name, region, city, district,
       postal_code, address_line1, address_line2, is_default, remarks
     )
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    id,
    demoMemberId,
    payload.label,
    payload.recipientName,
    payload.phone,
    payload.countryCode,
    payload.countryName,
    payload.region,
    payload.city,
    payload.district,
    payload.postalCode,
    payload.addressLine1,
    payload.addressLine2,
    isDefault ? 1 : 0,
    payload.remarks
  ));
  await db.batch(statements);

  const row = await first<ShippingAddressRow>(db, "SELECT * FROM shipping_addresses WHERE id = ? AND member_id = ?", id, demoMemberId);
  return json({ item: mapShippingAddress(row!) }, { status: 201 });
}

async function updateShippingAddress(db: D1Database, id: string, body: JsonObject) {
  const existing = await first<ShippingAddressRow>(db, "SELECT * FROM shipping_addresses WHERE id = ? AND member_id = ?", id, demoMemberId);
  if (!existing) return json({ error: "收貨地址不存在" }, { status: 404 });

  const payload = shippingAddressPayload(body);
  if ("error" in payload) return json({ error: payload.error }, { status: 400 });

  const statements = [];
  if (payload.isDefault) {
    statements.push(db.prepare("UPDATE shipping_addresses SET is_default = 0, updated_at = CURRENT_TIMESTAMP WHERE member_id = ?").bind(demoMemberId));
  }
  statements.push(db.prepare(
    `UPDATE shipping_addresses
        SET label = ?,
            recipient_name = ?,
            phone = ?,
            country_code = ?,
            country_name = ?,
            region = ?,
            city = ?,
            district = ?,
            postal_code = ?,
            address_line1 = ?,
            address_line2 = ?,
            is_default = ?,
            remarks = ?,
            updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND member_id = ?`
  ).bind(
    payload.label,
    payload.recipientName,
    payload.phone,
    payload.countryCode,
    payload.countryName,
    payload.region,
    payload.city,
    payload.district,
    payload.postalCode,
    payload.addressLine1,
    payload.addressLine2,
    payload.isDefault ? 1 : existing.is_default,
    payload.remarks,
    id,
    demoMemberId
  ));
  await db.batch(statements);

  const row = await first<ShippingAddressRow>(db, "SELECT * FROM shipping_addresses WHERE id = ? AND member_id = ?", id, demoMemberId);
  return json({ item: mapShippingAddress(row!) });
}

async function deleteShippingAddress(db: D1Database, id: string) {
  const existing = await first<ShippingAddressRow>(db, "SELECT * FROM shipping_addresses WHERE id = ? AND member_id = ?", id, demoMemberId);
  if (!existing) return json({ error: "收貨地址不存在" }, { status: 404 });

  await db.prepare("DELETE FROM shipping_addresses WHERE id = ? AND member_id = ?").bind(id, demoMemberId).run();
  if (existing.is_default === 1) {
    const next = await first<ShippingAddressRow>(
      db,
      "SELECT * FROM shipping_addresses WHERE member_id = ? ORDER BY updated_at DESC LIMIT 1",
      demoMemberId
    );
    if (next) {
      await db.prepare("UPDATE shipping_addresses SET is_default = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(next.id).run();
    }
  }
  return json({ ok: true });
}

async function listStaffRoles(db: D1Database) {
  const rows = await all<StaffRoleRow>(db, "SELECT * FROM staff_roles ORDER BY updated_at DESC");
  return json({ items: rows.map(mapStaffRole) });
}

function staffRolePayload(body: JsonObject) {
  const name = text(body, "name");
  if (!name) return { error: "請填寫角色名稱" };
  const permissions = Array.from(new Set(stringArray(body, "permissions")));
  return {
    name,
    description: text(body, "description") || null,
    permissionsJson: JSON.stringify(permissions),
    status: text(body, "status") === "disabled" ? "disabled" : "active"
  };
}

async function createStaffRole(db: D1Database, body: JsonObject) {
  const payload = staffRolePayload(body);
  if ("error" in payload) return json({ error: payload.error }, { status: 400 });

  const id = staffRoleId();
  await db.prepare(
    "INSERT INTO staff_roles (id, name, description, permissions_json, status) VALUES (?, ?, ?, ?, ?)"
  ).bind(id, payload.name, payload.description, payload.permissionsJson, payload.status).run();
  const row = await first<StaffRoleRow>(db, "SELECT * FROM staff_roles WHERE id = ?", id);
  return json({ item: mapStaffRole(row!) }, { status: 201 });
}

async function updateStaffRole(db: D1Database, id: string, body: JsonObject) {
  const existing = await first<StaffRoleRow>(db, "SELECT * FROM staff_roles WHERE id = ?", id);
  if (!existing) return json({ error: "角色不存在" }, { status: 404 });

  const payload = staffRolePayload(body);
  if ("error" in payload) return json({ error: payload.error }, { status: 400 });

  await db.prepare(
    `UPDATE staff_roles
        SET name = ?,
            description = ?,
            permissions_json = ?,
            status = ?,
            updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`
  ).bind(payload.name, payload.description, payload.permissionsJson, payload.status, id).run();
  const row = await first<StaffRoleRow>(db, "SELECT * FROM staff_roles WHERE id = ?", id);
  return json({ item: mapStaffRole(row!) });
}

async function deleteStaffRole(db: D1Database, id: string) {
  const used = await first<{ count: number }>(db, "SELECT COUNT(*) as count FROM staff_accounts WHERE role_id = ?", id);
  if (used?.count) return json({ error: "此角色已有員工使用，不能刪除" }, { status: 409 });
  await db.prepare("DELETE FROM staff_roles WHERE id = ?").bind(id).run();
  return json({ ok: true });
}

async function listStaffAccounts(db: D1Database) {
  const departments = await all<StaffDepartmentRow>(db, "SELECT * FROM staff_departments ORDER BY created_at ASC");
  const roles = await all<StaffRoleRow>(db, "SELECT * FROM staff_roles ORDER BY created_at ASC");
  const rows = await all<StaffAccountRow>(
    db,
    `SELECT staff_accounts.*,
            staff_departments.name as department_name,
            staff_roles.name as role_name
       FROM staff_accounts
       LEFT JOIN staff_departments ON staff_departments.id = staff_accounts.department_id
       LEFT JOIN staff_roles ON staff_roles.id = staff_accounts.role_id
      ORDER BY staff_accounts.updated_at DESC`
  );
  return json({
    items: rows.map(mapStaffAccount),
    departments: departments.map(mapStaffDepartment),
    roles: roles.map(mapStaffRole)
  });
}

async function staffAccountPayload(db: D1Database, body: JsonObject) {
  const email = text(body, "email").toLowerCase();
  const displayName = text(body, "displayName");
  const departmentId = text(body, "departmentId");
  const roleId = text(body, "roleId");
  const status = text(body, "status") === "disabled" ? "disabled" : "active";

  if (!email || !displayName || !departmentId || !roleId) return { error: "請填寫姓名、電郵、部門和角色" };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { error: "請填寫有效的員工電郵" };

  const department = await first<StaffDepartmentRow>(db, "SELECT * FROM staff_departments WHERE id = ? AND status = 'active'", departmentId);
  if (!department) return { error: "部門不存在或已停用" };
  const role = await first<StaffRoleRow>(db, "SELECT * FROM staff_roles WHERE id = ?", roleId);
  if (!role) return { error: "角色不存在" };

  return { email, displayName, departmentId, roleId, status };
}

async function createStaffAccount(db: D1Database, body: JsonObject) {
  const payload = await staffAccountPayload(db, body);
  if ("error" in payload) return json({ error: payload.error }, { status: 400 });

  const duplicate = await first<{ id: string }>(db, "SELECT id FROM staff_accounts WHERE email = ?", payload.email);
  if (duplicate) return json({ error: "員工電郵已存在" }, { status: 409 });

  const id = staffAccountId();
  await db.prepare(
    "INSERT INTO staff_accounts (id, email, display_name, department_id, role_id, status) VALUES (?, ?, ?, ?, ?, ?)"
  ).bind(id, payload.email, payload.displayName, payload.departmentId, payload.roleId, payload.status).run();
  const row = await first<StaffAccountRow>(
    db,
    `SELECT staff_accounts.*,
            staff_departments.name as department_name,
            staff_roles.name as role_name
       FROM staff_accounts
       LEFT JOIN staff_departments ON staff_departments.id = staff_accounts.department_id
       LEFT JOIN staff_roles ON staff_roles.id = staff_accounts.role_id
      WHERE staff_accounts.id = ?`,
    id
  );
  return json({ item: mapStaffAccount(row!) }, { status: 201 });
}

async function updateStaffAccount(db: D1Database, id: string, body: JsonObject) {
  const existing = await first<StaffAccountRow>(db, "SELECT * FROM staff_accounts WHERE id = ?", id);
  if (!existing) return json({ error: "員工帳號不存在" }, { status: 404 });

  const payload = await staffAccountPayload(db, body);
  if ("error" in payload) return json({ error: payload.error }, { status: 400 });

  const duplicate = await first<{ id: string }>(db, "SELECT id FROM staff_accounts WHERE email = ? AND id <> ?", payload.email, id);
  if (duplicate) return json({ error: "員工電郵已存在" }, { status: 409 });

  await db.prepare(
    `UPDATE staff_accounts
        SET email = ?,
            display_name = ?,
            department_id = ?,
            role_id = ?,
            status = ?,
            updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`
  ).bind(payload.email, payload.displayName, payload.departmentId, payload.roleId, payload.status, id).run();
  const row = await first<StaffAccountRow>(
    db,
    `SELECT staff_accounts.*,
            staff_departments.name as department_name,
            staff_roles.name as role_name
       FROM staff_accounts
       LEFT JOIN staff_departments ON staff_departments.id = staff_accounts.department_id
       LEFT JOIN staff_roles ON staff_roles.id = staff_accounts.role_id
      WHERE staff_accounts.id = ?`,
    id
  );
  return json({ item: mapStaffAccount(row!) });
}

async function deleteStaffAccount(db: D1Database, id: string) {
  const existing = await first<StaffAccountRow>(db, "SELECT * FROM staff_accounts WHERE id = ?", id);
  if (!existing) return json({ error: "員工帳號不存在" }, { status: 404 });
  await db.prepare("DELETE FROM staff_accounts WHERE id = ?").bind(id).run();
  return json({ ok: true });
}

async function listExchangeRates(db: D1Database) {
  const rows = await all<ExchangeRateRow>(
    db,
    `SELECT * FROM exchange_rates
      ORDER BY CASE quote_currency
        WHEN 'HKD' THEN 1
        WHEN 'CNY' THEN 2
        WHEN 'AUD' THEN 3
        ELSE 9
      END, quote_currency ASC`
  );
  return json({ items: rows.map(mapExchangeRate) });
}

async function updateExchangeRate(db: D1Database, id: string, body: JsonObject) {
  const existing = await first<ExchangeRateRow>(db, "SELECT * FROM exchange_rates WHERE id = ?", id);
  if (!existing) return json({ error: "匯率不存在" }, { status: 404 });

  const rate = decimal(body, "rate");
  const status = text(body, "status") === "disabled" ? "disabled" : "active";
  const note = text(body, "note") || null;
  if (!rate || rate <= 0) return json({ error: "請填寫大於 0 的匯率" }, { status: 400 });

  await db.prepare(
    `UPDATE exchange_rates
        SET rate = ?,
            status = ?,
            note = ?,
            updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`
  ).bind(rate, status, note, id).run();

  const row = await first<ExchangeRateRow>(db, "SELECT * FROM exchange_rates WHERE id = ?", id);
  return json({ item: mapExchangeRate(row!) });
}

async function listWarehouses(db: D1Database) {
  const rows = await all<WarehouseRow>(
    db,
    "SELECT * FROM warehouses ORDER BY sort_order ASC, created_at ASC"
  );
  return json({ items: rows.map(mapWarehouse) });
}

async function listMemberWarehouses(db: D1Database) {
  const rows = await all<WarehouseRow>(
    db,
    "SELECT * FROM warehouses WHERE status = 'active' AND allow_inbound = 1 ORDER BY sort_order ASC, created_at ASC"
  );
  return json({ items: rows.map(mapWarehouse) });
}

function warehousePayload(body: JsonObject) {
  const code = text(body, "code").toUpperCase();
  const name = text(body, "name");
  const type = text(body, "type");
  const country = text(body, "country") || "日本";
  const address = text(body, "address");
  const status = text(body, "status") === "disabled" ? "disabled" : "active";
  const allowedTypes = ["集運倉", "門市", "退貨倉", "臨時倉"];
  if (!code || !/^[A-Z0-9_-]{2,32}$/.test(code)) return { error: "請填寫有效倉庫編碼，只能使用英文、數字、底線或短橫線" };
  if (!name) return { error: "請填寫倉庫名稱" };
  if (!allowedTypes.includes(type)) return { error: "請選擇有效倉庫類型" };
  if (!address) return { error: "請填寫倉庫地址" };
  return {
    code,
    name,
    type,
    country,
    postalCode: text(body, "postalCode") || null,
    address,
    phone: text(body, "phone") || null,
    contactName: text(body, "contactName") || null,
    status,
    isDefault: booleanValue(body, "isDefault"),
    allowInbound: booleanValue(body, "allowInbound"),
    allowOutbound: booleanValue(body, "allowOutbound"),
    sortOrder: integer(body, "sortOrder") ?? 100,
    remarks: text(body, "remarks") || null
  };
}

async function createWarehouse(db: D1Database, body: JsonObject) {
  const payload = warehousePayload(body);
  if ("error" in payload) return json({ error: payload.error }, { status: 400 });

  const duplicate = await first<{ id: string }>(db, "SELECT id FROM warehouses WHERE code = ?", payload.code);
  if (duplicate) return json({ error: "倉庫編碼已存在" }, { status: 409 });

  const id = payload.code.toLowerCase().replace(/_/g, "-");
  const statements = [];
  if (payload.isDefault) statements.push(db.prepare("UPDATE warehouses SET is_default = 0, updated_at = CURRENT_TIMESTAMP"));
  statements.push(db.prepare(
    `INSERT INTO warehouses (
       id, code, name, type, country, postal_code, address, phone, contact_name,
       status, is_default, allow_inbound, allow_outbound, sort_order, remarks
     )
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    id,
    payload.code,
    payload.name,
    payload.type,
    payload.country,
    payload.postalCode,
    payload.address,
    payload.phone,
    payload.contactName,
    payload.status,
    payload.isDefault ? 1 : 0,
    payload.allowInbound ? 1 : 0,
    payload.allowOutbound ? 1 : 0,
    payload.sortOrder,
    payload.remarks
  ));
  await db.batch(statements);
  const row = await first<WarehouseRow>(db, "SELECT * FROM warehouses WHERE id = ?", id);
  return json({ item: mapWarehouse(row!) }, { status: 201 });
}

async function updateWarehouse(db: D1Database, id: string, body: JsonObject) {
  const existing = await first<WarehouseRow>(db, "SELECT * FROM warehouses WHERE id = ?", id);
  if (!existing) return json({ error: "倉庫不存在" }, { status: 404 });

  const payload = warehousePayload(body);
  if ("error" in payload) return json({ error: payload.error }, { status: 400 });
  const duplicate = await first<{ id: string }>(db, "SELECT id FROM warehouses WHERE code = ? AND id <> ?", payload.code, id);
  if (duplicate) return json({ error: "倉庫編碼已存在" }, { status: 409 });

  const statements = [];
  if (payload.isDefault) statements.push(db.prepare("UPDATE warehouses SET is_default = 0, updated_at = CURRENT_TIMESTAMP WHERE id <> ?").bind(id));
  statements.push(db.prepare(
    `UPDATE warehouses
        SET code = ?,
            name = ?,
            type = ?,
            country = ?,
            postal_code = ?,
            address = ?,
            phone = ?,
            contact_name = ?,
            status = ?,
            is_default = ?,
            allow_inbound = ?,
            allow_outbound = ?,
            sort_order = ?,
            remarks = ?,
            updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`
  ).bind(
    payload.code,
    payload.name,
    payload.type,
    payload.country,
    payload.postalCode,
    payload.address,
    payload.phone,
    payload.contactName,
    payload.status,
    payload.isDefault ? 1 : 0,
    payload.allowInbound ? 1 : 0,
    payload.allowOutbound ? 1 : 0,
    payload.sortOrder,
    payload.remarks,
    id
  ));
  await db.batch(statements);
  const row = await first<WarehouseRow>(db, "SELECT * FROM warehouses WHERE id = ?", id);
  return json({ item: mapWarehouse(row!) });
}

async function deleteWarehouse(db: D1Database, id: string) {
  const existing = await first<WarehouseRow>(db, "SELECT * FROM warehouses WHERE id = ?", id);
  if (!existing) return json({ error: "倉庫不存在" }, { status: 404 });
  const used = await first<{ count: number }>(db, "SELECT COUNT(*) as count FROM inbound_packages WHERE warehouse_id = ?", id);
  if (used?.count) return json({ error: "此倉庫已有包裹資料，不能刪除，請改為停用" }, { status: 409 });
  await db.prepare("DELETE FROM warehouses WHERE id = ?").bind(id).run();
  return json({ ok: true });
}

async function createTopupRequest(db: D1Database, body: JsonObject) {
  const topupType = text(body, "topupType");
  const amountHkd = integer(body, "amountHkd");
  if (!["online", "offline"].includes(topupType)) return json({ error: "請選擇有效的充值方式" }, { status: 400 });
  if (!amountHkd || amountHkd < 1) return json({ error: "請輸入有效充值金額" }, { status: 400 });

  const paymentMethod = text(body, "paymentMethod") || null;
  const bankAccountId = text(body, "bankAccountId") || null;
  const bankAccountName = text(body, "bankAccountName") || null;
  const transferSerialNo = text(body, "transferSerialNo") || null;
  const remitterName = text(body, "remitterName") || null;
  const remitterPhone = text(body, "remitterPhone") || null;
  const voucherFileName = text(body, "voucherFileName") || text(body, "voucher") || null;
  const remittedAt = text(body, "remittedAt") || null;
  const remarks = text(body, "remarks") || null;

  if (topupType === "online" && !paymentMethod) return json({ error: "請選擇線上支付方式" }, { status: 400 });
  if (topupType === "offline") {
    if (!bankAccountId || !transferSerialNo || !remitterName || !remitterPhone || !remittedAt) {
      return json({ error: "請填寫線下充值必填資料" }, { status: 400 });
    }
  }

  const id = topupRequestId();
  const status = topupType === "online" ? "pending_payment" : "pending_review";
  await db.batch([
    db.prepare(
    `INSERT INTO topup_requests (
       id, member_id, topup_type, amount_hkd, payment_method, bank_account_id, bank_account_name,
       transfer_serial_no, remitter_name, remitter_phone, voucher_file_name, remitted_at, remarks, status
     )
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
    id,
    demoMemberId,
    topupType,
    amountHkd,
    paymentMethod,
    bankAccountId,
    bankAccountName,
    transferSerialNo,
    remitterName,
    remitterPhone,
    voucherFileName,
    remittedAt,
    remarks,
    status
    ),
    walletTransactionStatement(db, {
      memberId: demoMemberId,
      direction: "credit",
      category: "topup",
      amountHkd,
      balanceAfterHkd: null,
      relatedType: "topup_request",
      relatedId: id,
      title: topupType === "online" ? "線上充值申請" : "線下充值申請",
      description: topupType === "online" ? paymentMethod : transferSerialNo,
      status: "pending"
    })
  ]);

  const row = await first<TopupRequestRow>(db, "SELECT * FROM topup_requests WHERE id = ?", id);
  return json({ item: mapTopupRequest(row!) }, { status: 201 });
}

async function handleApi(request: Request, env: Env) {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method.toUpperCase();

  try {
    if (method === "GET" && path === "/api/auth/session") return authSession(env.DB, request);
    if (method === "POST" && path === "/api/auth/login") return login(env.DB, (await readBody(request)) ?? {});
    if (method === "POST" && path === "/api/auth/logout") return logout(env.DB, request);

    const auth = await currentAuth(env.DB, request);
    if (path.startsWith("/api/admin/")) {
      if (!auth.staffId) return unauthorized("請先登入管理後台");
    } else if (!auth.memberId) {
      return unauthorized("請先登入會員帳號");
    }

    if (method === "GET" && path === "/api/member/profile") return json({ profile: await getProfile(env.DB) });
    if (method === "GET" && path === "/api/member/addresses") return listMemberShippingAddresses(env.DB);
    if (method === "GET" && path === "/api/member/warehouses") return listMemberWarehouses(env.DB);
    if (method === "POST" && path === "/api/member/addresses") return createShippingAddress(env.DB, (await readBody(request)) ?? {});
    if (method === "GET" && path === "/api/procurement/orders") return listMemberOrders(env.DB);
    if (method === "POST" && path === "/api/procurement/fetch-product") return fetchProductPreview((await readBody(request)) ?? {});
    if (method === "POST" && path === "/api/procurement/orders") return createProcurementOrder(env.DB, (await readBody(request)) ?? {});
    if (method === "POST" && path === "/api/procurement/offline-orders") return createOfflineProcurementOrder(env.DB, (await readBody(request)) ?? {});
    if (method === "GET" && path === "/api/admin/procurement/orders") return listAdminOrders(env.DB);
    if (method === "GET" && path === "/api/tickets") return listMemberTickets(env.DB);
    if (method === "POST" && path === "/api/tickets") return createTicket(env.DB, (await readBody(request)) ?? {});
    if (method === "GET" && path === "/api/admin/tickets") return listAdminTickets(env.DB);
    if (method === "GET" && path === "/api/inbound/packages") return listMemberInboundPackages(env.DB);
    if (method === "POST" && path === "/api/inbound/packages") return createInboundForecast(env.DB, (await readBody(request)) ?? {});
    if (method === "GET" && path === "/api/admin/inbound/packages") return listAdminInboundPackages(env.DB);
    if (method === "POST" && path === "/api/admin/inbound/scan") return scanInboundPackage(env.DB, (await readBody(request)) ?? {});
    if (method === "GET" && path === "/api/topups") return listMemberTopupRequests(env.DB);
    if (method === "POST" && path === "/api/topups") return createTopupRequest(env.DB, (await readBody(request)) ?? {});
    if (method === "GET" && path === "/api/wallet/transactions") return listMemberWalletTransactions(env.DB);
    if (method === "GET" && path === "/api/admin/topups") return listAdminTopupRequests(env.DB);
    if (method === "GET" && path === "/api/admin/wallet/transactions") return listAdminWalletTransactions(env.DB);
    if (method === "GET" && path === "/api/admin/members") return listAdminMembers(env.DB);
    if (method === "GET" && path === "/api/admin/roles") return listStaffRoles(env.DB);
    if (method === "POST" && path === "/api/admin/roles") return createStaffRole(env.DB, (await readBody(request)) ?? {});
    if (method === "GET" && path === "/api/admin/staff") return listStaffAccounts(env.DB);
    if (method === "POST" && path === "/api/admin/staff") return createStaffAccount(env.DB, (await readBody(request)) ?? {});
    if (method === "GET" && path === "/api/admin/exchange-rates") return listExchangeRates(env.DB);
    if (method === "GET" && path === "/api/admin/warehouses") return listWarehouses(env.DB);
    if (method === "POST" && path === "/api/admin/warehouses") return createWarehouse(env.DB, (await readBody(request)) ?? {});

    const memberTicketMatch = path.match(/^\/api\/tickets\/([^/]+)$/);
    if (method === "GET" && memberTicketMatch) return getTicket(env.DB, decodeURIComponent(memberTicketMatch[1]), "member");

    const memberTicketMessageMatch = path.match(/^\/api\/tickets\/([^/]+)\/messages$/);
    if (method === "POST" && memberTicketMessageMatch) return addTicketMessage(env.DB, decodeURIComponent(memberTicketMessageMatch[1]), (await readBody(request)) ?? {}, "member");

    const adminTicketMatch = path.match(/^\/api\/admin\/tickets\/([^/]+)$/);
    if (method === "GET" && adminTicketMatch) return getTicket(env.DB, decodeURIComponent(adminTicketMatch[1]), "admin");

    const adminTicketReplyMatch = path.match(/^\/api\/admin\/tickets\/([^/]+)\/reply$/);
    if (method === "POST" && adminTicketReplyMatch) return addTicketMessage(env.DB, decodeURIComponent(adminTicketReplyMatch[1]), (await readBody(request)) ?? {}, "staff");

    const adminTicketStatusMatch = path.match(/^\/api\/admin\/tickets\/([^/]+)\/status$/);
    if (method === "POST" && adminTicketStatusMatch) return updateTicketStatus(env.DB, decodeURIComponent(adminTicketStatusMatch[1]), (await readBody(request)) ?? {});

    const adminInboundClaimMatch = path.match(/^\/api\/admin\/inbound\/packages\/([^/]+)\/claim$/);
    if (method === "POST" && adminInboundClaimMatch) return claimInboundPackage(env.DB, decodeURIComponent(adminInboundClaimMatch[1]), (await readBody(request)) ?? {});

    const memberAddressMatch = path.match(/^\/api\/member\/addresses\/([^/]+)$/);
    if (method === "POST" && memberAddressMatch) return updateShippingAddress(env.DB, decodeURIComponent(memberAddressMatch[1]), (await readBody(request)) ?? {});

    const memberAddressDeleteMatch = path.match(/^\/api\/member\/addresses\/([^/]+)\/delete$/);
    if (method === "POST" && memberAddressDeleteMatch) return deleteShippingAddress(env.DB, decodeURIComponent(memberAddressDeleteMatch[1]));

    const adminRoleMatch = path.match(/^\/api\/admin\/roles\/([^/]+)$/);
    if (method === "POST" && adminRoleMatch) return updateStaffRole(env.DB, decodeURIComponent(adminRoleMatch[1]), (await readBody(request)) ?? {});

    const adminRoleDeleteMatch = path.match(/^\/api\/admin\/roles\/([^/]+)\/delete$/);
    if (method === "POST" && adminRoleDeleteMatch) return deleteStaffRole(env.DB, decodeURIComponent(adminRoleDeleteMatch[1]));

    const adminStaffMatch = path.match(/^\/api\/admin\/staff\/([^/]+)$/);
    if (method === "POST" && adminStaffMatch) return updateStaffAccount(env.DB, decodeURIComponent(adminStaffMatch[1]), (await readBody(request)) ?? {});

    const adminStaffDeleteMatch = path.match(/^\/api\/admin\/staff\/([^/]+)\/delete$/);
    if (method === "POST" && adminStaffDeleteMatch) return deleteStaffAccount(env.DB, decodeURIComponent(adminStaffDeleteMatch[1]));

    const adminExchangeRateMatch = path.match(/^\/api\/admin\/exchange-rates\/([^/]+)$/);
    if (method === "POST" && adminExchangeRateMatch) return updateExchangeRate(env.DB, decodeURIComponent(adminExchangeRateMatch[1]), (await readBody(request)) ?? {});

    const adminWarehouseMatch = path.match(/^\/api\/admin\/warehouses\/([^/]+)$/);
    if (method === "POST" && adminWarehouseMatch) return updateWarehouse(env.DB, decodeURIComponent(adminWarehouseMatch[1]), (await readBody(request)) ?? {});

    const adminWarehouseDeleteMatch = path.match(/^\/api\/admin\/warehouses\/([^/]+)\/delete$/);
    if (method === "POST" && adminWarehouseDeleteMatch) return deleteWarehouse(env.DB, decodeURIComponent(adminWarehouseDeleteMatch[1]));

    const adminTopupApproveMatch = path.match(/^\/api\/admin\/topups\/([^/]+)\/approve$/);
    if (method === "POST" && adminTopupApproveMatch) return reviewTopupRequest(env.DB, decodeURIComponent(adminTopupApproveMatch[1]), "approve");

    const adminTopupRejectMatch = path.match(/^\/api\/admin\/topups\/([^/]+)\/reject$/);
    if (method === "POST" && adminTopupRejectMatch) return reviewTopupRequest(env.DB, decodeURIComponent(adminTopupRejectMatch[1]), "reject");

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
