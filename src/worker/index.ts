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
  real_name: string | null;
  phone: string | null;
  whatsapp: string | null;
  country_region: string | null;
  preferred_language: string | null;
  notes: string | null;
  profile_updated_at: string | null;
};

type AdminMemberRow = MemberProfileRow & {
  created_at: string;
  order_count: number;
  package_count: number;
  topup_count: number;
};

type MemberLevelRow = {
  id: string;
  level_code: string;
  level_name: string;
  min_consumption_hkd: number;
  min_shipping_fee_hkd: number;
  min_topup_hkd: number;
  min_order_count: number;
  shipping_discount_rate: number;
  service_fee_discount_rate: number;
  extra_free_storage_days: number;
  priority_level: number;
  commission_rate: number;
  status: string;
  sort_order: number;
  remarks: string | null;
  created_at: string;
  updated_at: string;
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

type MemberMessageRow = {
  id: string;
  member_id: string;
  message_type: string;
  title: string;
  content: string;
  is_read: number;
  created_at: string;
  read_at: string | null;
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

type PackageForecastRow = {
  id: string;
  forecast_no: string;
  member_id: string;
  tracking_no: string;
  carrier_name: string;
  source_type: string | null;
  source_name: string | null;
  item_name: string | null;
  quantity: number;
  remarks: string | null;
  expected_arrival_date: string | null;
  status: string;
  matched_inbound_package_id: string | null;
  created_at: string;
  updated_at: string;
  cancelled_at: string | null;
  matched_at: string | null;
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

type RefundRequestRow = {
  id: string;
  member_id: string;
  amount_hkd: number;
  refund_method: string;
  recipient_name: string;
  recipient_account: string;
  bank_name: string | null;
  phone: string | null;
  reason: string;
  remarks: string | null;
  status: string;
  admin_note: string | null;
  created_at: string;
  updated_at: string;
  reviewed_at: string | null;
  paid_at: string | null;
  cancelled_at: string | null;
};

type AdminRefundRequestRow = RefundRequestRow & {
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

type PointTransactionRow = {
  id: string;
  member_id: string;
  direction: string;
  category: string;
  points: number;
  balance_after: number | null;
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
  warehouse_ids?: string | null;
  warehouse_names?: string | null;
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
  free_storage_days: number;
  storage_fee_hkd_per_day: number;
  remarks: string | null;
  created_at: string;
  updated_at: string;
};

type WarehouseShelfRow = {
  id: string;
  warehouse_id: string;
  warehouse_name: string | null;
  code: string;
  name: string;
  area_code: string | null;
  shelf_no: string | null;
  location_count: number;
  status: string;
  sort_order: number;
  remarks: string | null;
  created_at: string;
  updated_at: string;
};

type WarehouseLocationRow = {
  id: string;
  warehouse_id: string;
  warehouse_name: string | null;
  shelf_id: string;
  shelf_code: string | null;
  code: string;
  area_code: string | null;
  shelf_no: string | null;
  layer_no: number | null;
  slot_no: number | null;
  location_type: string;
  status: string;
  max_packages: number | null;
  max_weight_kg: number | null;
  max_volume_cm3: number | null;
  remarks: string | null;
  created_at: string;
  updated_at: string;
};

type SystemDictionaryRow = {
  id: string;
  category_code: string;
  category_name_zh_hant: string;
  item_code: string;
  item_value: string;
  label_zh_hant: string;
  label_en: string;
  label_ja: string;
  sort_order: number;
  status: string;
  is_system: number;
  remarks: string | null;
  created_at: string;
  updated_at: string;
};

type FeeSettingRow = {
  id: string;
  category_code: string;
  category_name: string;
  fee_code: string;
  fee_name: string;
  charge_mode: string;
  amount_hkd: number;
  percent_rate: number;
  currency: string;
  status: string;
  sort_order: number;
  remarks: string | null;
  created_at: string;
  updated_at: string;
};

type ValueAddedRequestRow = {
  id: string;
  package_id: string;
  warehouse_id: string;
  warehouse_name?: string | null;
  member_id: string | null;
  member_email?: string | null;
  member_user_code?: string | null;
  service_code: string;
  service_name: string;
  amount_hkd: number;
  status: string;
  request_note: string | null;
  process_note: string | null;
  package_tracking_no?: string | null;
  package_item_name?: string | null;
  package_shelf_code?: string | null;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
};

type ConsolidationBatchRow = {
  id: string;
  batch_no: string;
  warehouse_id: string;
  warehouse_name?: string | null;
  member_id: string | null;
  member_email?: string | null;
  member_user_code?: string | null;
  package_count: number;
  carton_type: string | null;
  carton_fee_hkd: number;
  weight_kg: number | null;
  length_cm: number | null;
  width_cm: number | null;
  height_cm: number | null;
  international_tracking_no: string | null;
  logistics_product_name: string | null;
  shipping_fee_hkd: number;
  status: string;
  remarks: string | null;
  package_ids?: string | null;
  created_at: string;
  updated_at: string;
  packed_at: string | null;
  outbounded_at: string | null;
};

type LogisticsSupplierRow = {
  id: string;
  supplier_code: string;
  name: string;
  contact_name: string | null;
  contact_phone: string | null;
  contact_email: string | null;
  login_email: string | null;
  password_hash: string | null;
  country_code: string;
  country_name: string;
  city: string | null;
  settlement_currency: string;
  status: string;
  remarks: string | null;
  created_at: string;
  updated_at: string;
  channel_product_count?: number;
};

type ChannelProductRow = {
  id: string;
  channel_product_code: string;
  supplier_id: string;
  supplier_code: string;
  supplier_name: string;
  name: string;
  carrier_name: string | null;
  service_name: string | null;
  origin_country_code: string;
  origin_country_name: string;
  origin_city: string | null;
  destination_country_code: string;
  destination_country_name: string;
  destination_city: string | null;
  transit_time: string | null;
  cost_currency: string;
  first_weight_kg: number;
  first_weight_price: number;
  additional_weight_unit_kg: number;
  additional_weight_price: number;
  max_weight_kg: number | null;
  status: string;
  remarks: string | null;
  created_at: string;
  updated_at: string;
};

type LogisticsProductRow = {
  id: string;
  product_code: string;
  product_name: string;
  channel_product_id: string | null;
  channel_product_code: string | null;
  channel_product_name: string | null;
  route_name: string | null;
  origin_country_code: string;
  origin_country_name: string;
  origin_city: string | null;
  destination_country_code: string;
  destination_country_name: string;
  destination_city: string | null;
  estimated_days: string | null;
  support_categories: string;
  forbidden_categories: string;
  charge_weight_mode: string;
  pricing_mode: string;
  min_weight: number;
  max_weight: number;
  volume_divisor: number;
  rounding_unit: number;
  density_threshold: number;
  density_low_mode: string;
  density_high_mode: string;
  first_weight: number;
  first_price: number;
  additional_weight: number;
  additional_price: number;
  price_tiers: string | null;
  attribute_surcharges: string | null;
  handling_fee: number;
  fuel_surcharge_rate: number;
  cargo_surcharge_rate: number;
  is_tax_included: number;
  need_identity: number;
  support_tracking: number;
  status: string;
  remarks: string | null;
  created_at: string;
  updated_at: string;
};

type ShippingRestrictionRow = {
  id: string;
  rule_name: string;
  scope_type: string;
  destination_country_code: string | null;
  destination_country_name: string | null;
  logistics_product_id: string | null;
  logistics_product_code: string | null;
  logistics_product_name: string | null;
  cargo_categories: string;
  keywords: string | null;
  restriction_type: string;
  max_weight_kg: number | null;
  max_length_cm: number | null;
  max_width_cm: number | null;
  max_height_cm: number | null;
  customer_message: string | null;
  internal_note: string | null;
  status: string;
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

const logisticsSupplierCountries: Record<string, string> = {
  JP: "日本 Japan",
  HK: "中國香港 Hong Kong (HK)",
  MO: "中國澳門 Macao (MO)",
  TW: "中國台灣 Taiwan (TW)",
  GB: "英國 United Kingdom (GB)",
  CA: "加拿大 Canada (CA)",
  AU: "澳大利亞 Australia (AU)",
  CN: "中國大陸 China (CN)"
};

const logisticsSettlementCurrencies = ["JPY", "HKD", "CNY", "GBP", "CAD", "AUD", "USD"];

const logisticsProductAttributes = [
  { code: "normal", name: "普貨", description: "普通日用品、服飾、書籍等無特殊限制貨物" },
  { code: "battery", name: "帶電", description: "含內置電池或配套電池的商品" },
  { code: "branded", name: "仿牌", description: "品牌敏感、疑似仿牌或需要特殊申報的商品" },
  { code: "special", name: "特貨", description: "食品、液體、粉末、化妝品等特殊貨物" }
];

const chargeWeightModes = ["max_actual_volume", "actual", "volume", "density"];
const pricingModes = ["first_additional", "tier_unit", "multi_additional", "tier_first_additional"];
const shippingRestrictionScopes = ["global", "country", "logistics_product"];
const shippingRestrictionTypes = ["prohibited", "max_weight", "max_dimensions", "review_required", "identity_required"];

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

const messageTypeLabels: Record<string, string> = {
  system: "系統消息",
  notice: "平台公告",
  finance: "財務通知",
  order: "訂單通知",
  warehouse: "倉庫通知"
};

const inboundStatusLabels: Record<string, string> = {
  forecasted: "待入庫",
  inbounded: "已入庫",
  claimed: "已認領",
  shelved: "已上架",
  consolidated: "待合箱",
  packed: "打包中",
  outbounded: "已出庫",
  orphan: "待認領",
  destroyed: "已銷毀"
};

const packageForecastStatusLabels: Record<string, string> = {
  forecasted: "已預報",
  arrived: "已到倉",
  claimed: "已認領",
  exception: "異常",
  cancelled: "已取消"
};

const topupStatusLabels: Record<string, string> = {
  pending_payment: "待支付",
  pending_review: "待審核",
  approved: "已入帳",
  rejected: "已拒絕",
  cancelled: "已取消"
};

const refundStatusLabels: Record<string, string> = {
  pending_review: "待審核",
  approved: "已通過",
  rejected: "已拒絕",
  paid: "已退款",
  cancelled: "已取消"
};

const refundMethodLabels: Record<string, string> = {
  bank_transfer: "銀行轉帳",
  alipayhk: "AlipayHK",
  alipay: "支付寶",
  wechat: "微信支付"
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

const pointCategoryLabels: Record<string, string> = {
  procurement: "代購商品積分",
  shipping: "物流費用積分",
  exchange: "積分兌換",
  adjustment: "人工調整",
  referral: "推薦積分"
};

const pointTransactionStatusLabels: Record<string, string> = {
  pending: "待處理",
  posted: "已生效",
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

async function staffWarehouseScope(db: D1Database, staffId?: string) {
  if (!staffId) return null;
  const rows = await all<{ warehouse_id: string }>(
    db,
    "SELECT warehouse_id FROM staff_warehouse_permissions WHERE staff_id = ?",
    staffId
  );
  return rows.length ? rows.map((row) => row.warehouse_id) : null;
}

async function ensureWarehouseAllowed(db: D1Database, staffId: string | undefined, warehouseId: string) {
  const scope = await staffWarehouseScope(db, staffId);
  return scope === null || scope.includes(warehouseId);
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
  if (typeof value === "string" && value.trim()) return value.split(",").map((item) => item.trim()).filter(Boolean);
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

function memberMessageId() {
  const stamp = Date.now().toString(36).toUpperCase();
  const tail = crypto.randomUUID().slice(0, 6).toUpperCase();
  return `DP-MS-${stamp}-${tail}`;
}

function inboundPackageId() {
  const stamp = Date.now().toString(36).toUpperCase();
  const tail = crypto.randomUUID().slice(0, 6).toUpperCase();
  return `DP-PK-${stamp}-${tail}`;
}

function packageForecastId() {
  const stamp = Date.now().toString(36).toUpperCase();
  const tail = crypto.randomUUID().slice(0, 6).toUpperCase();
  return `DP-PF-${stamp}-${tail}`;
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

function refundRequestId() {
  const stamp = Date.now().toString(36).toUpperCase();
  const tail = crypto.randomUUID().slice(0, 6).toUpperCase();
  return `DP-RF-${stamp}-${tail}`;
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

function warehouseShelfId() {
  const stamp = Date.now().toString(36).toUpperCase();
  const tail = crypto.randomUUID().slice(0, 6).toUpperCase();
  return `shelf-${stamp}-${tail}`.toLowerCase();
}

function warehouseLocationId() {
  const stamp = Date.now().toString(36).toUpperCase();
  const tail = crypto.randomUUID().slice(0, 6).toUpperCase();
  return `loc-${stamp}-${tail}`.toLowerCase();
}

function valueAddedRequestId() {
  const stamp = Date.now().toString(36).toUpperCase();
  const tail = crypto.randomUUID().slice(0, 6).toUpperCase();
  return `vas-${stamp}-${tail}`.toLowerCase();
}

function consolidationBatchNo() {
  const stamp = Date.now().toString(36).toUpperCase();
  const tail = crypto.randomUUID().slice(0, 5).toUpperCase();
  return `DP-CB-${stamp}-${tail}`;
}

function dictionaryId() {
  const stamp = Date.now().toString(36).toUpperCase();
  const tail = crypto.randomUUID().slice(0, 6).toUpperCase();
  return `dict-${stamp}-${tail}`.toLowerCase();
}

function feeSettingId() {
  const stamp = Date.now().toString(36).toUpperCase();
  const tail = crypto.randomUUID().slice(0, 6).toUpperCase();
  return `fee-${stamp}-${tail}`.toLowerCase();
}

function memberLevelId() {
  const stamp = Date.now().toString(36).toUpperCase();
  const tail = crypto.randomUUID().slice(0, 6).toUpperCase();
  return `level-${stamp}-${tail}`.toLowerCase();
}

function logisticsSupplierId() {
  const stamp = Date.now().toString(36).toUpperCase();
  const tail = crypto.randomUUID().slice(0, 6).toUpperCase();
  return `sup-${stamp}-${tail}`.toLowerCase();
}

function channelProductId() {
  const stamp = Date.now().toString(36).toUpperCase();
  const tail = crypto.randomUUID().slice(0, 6).toUpperCase();
  return `scp-${stamp}-${tail}`.toLowerCase();
}

function logisticsProductId() {
  const stamp = Date.now().toString(36).toUpperCase();
  const tail = crypto.randomUUID().slice(0, 6).toUpperCase();
  return `lp-${stamp}-${tail}`.toLowerCase();
}

function shippingRestrictionId() {
  const stamp = Date.now().toString(36).toUpperCase();
  const tail = crypto.randomUUID().slice(0, 6).toUpperCase();
  return `sr-${stamp}-${tail}`.toLowerCase();
}

function supplierCodeCandidate() {
  const digits = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join("");
  return `SUP${digits}`;
}

async function generateSupplierCode(db: D1Database) {
  for (let index = 0; index < 8; index += 1) {
    const code = supplierCodeCandidate();
    const existing = await first<{ id: string }>(db, "SELECT id FROM logistics_suppliers WHERE supplier_code = ?", code);
    if (!existing) return code;
  }
  return `SUP${Date.now().toString().slice(-8)}`;
}

function channelProductCodeCandidate() {
  const digits = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join("");
  return `SCP${digits}`;
}

async function generateChannelProductCode(db: D1Database) {
  for (let index = 0; index < 8; index += 1) {
    const code = channelProductCodeCandidate();
    const existing = await first<{ id: string }>(db, "SELECT id FROM channel_products WHERE channel_product_code = ?", code);
    if (!existing) return code;
  }
  return `SCP${Date.now().toString().slice(-8)}`;
}

function logisticsProductCodeCandidate() {
  const digits = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join("");
  return `LP${digits}`;
}

async function generateLogisticsProductCode(db: D1Database) {
  for (let index = 0; index < 8; index += 1) {
    const code = logisticsProductCodeCandidate();
    const existing = await first<{ id: string }>(db, "SELECT id FROM logistics_products WHERE product_code = ?", code);
    if (!existing) return code;
  }
  return `LP${Date.now().toString().slice(-8)}`;
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

function mapMemberMessage(row: MemberMessageRow) {
  return {
    id: row.id,
    memberId: row.member_id,
    messageType: row.message_type,
    messageTypeLabel: messageTypeLabels[row.message_type] ?? row.message_type,
    title: row.title,
    content: row.content,
    isRead: row.is_read === 1,
    statusLabel: row.is_read === 1 ? "已讀" : "未讀",
    createdAt: row.created_at,
    readAt: row.read_at
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

function mapPackageForecast(row: PackageForecastRow) {
  return {
    id: row.id,
    forecastNo: row.forecast_no,
    memberId: row.member_id,
    trackingNo: row.tracking_no,
    carrierName: row.carrier_name,
    sourceType: row.source_type,
    sourceName: row.source_name,
    itemName: row.item_name,
    quantity: row.quantity,
    remarks: row.remarks,
    expectedArrivalDate: row.expected_arrival_date,
    status: row.status,
    statusLabel: packageForecastStatusLabels[row.status] ?? row.status,
    matchedInboundPackageId: row.matched_inbound_package_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    cancelledAt: row.cancelled_at,
    matchedAt: row.matched_at
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

function mapRefundRequest(row: RefundRequestRow) {
  const adminRow = row as AdminRefundRequestRow;
  return {
    id: row.id,
    memberId: row.member_id,
    memberEmail: adminRow.member_email ?? null,
    memberDisplayName: adminRow.member_display_name ?? null,
    memberUserCode: adminRow.member_user_code ?? null,
    amountHkd: row.amount_hkd,
    refundMethod: row.refund_method,
    refundMethodLabel: refundMethodLabels[row.refund_method] ?? row.refund_method,
    recipientName: row.recipient_name,
    recipientAccount: row.recipient_account,
    bankName: row.bank_name,
    phone: row.phone,
    reason: row.reason,
    remarks: row.remarks,
    status: row.status,
    statusLabel: refundStatusLabels[row.status] ?? row.status,
    adminNote: row.admin_note,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    reviewedAt: row.reviewed_at,
    paidAt: row.paid_at,
    cancelledAt: row.cancelled_at
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

function mapPointTransaction(row: PointTransactionRow) {
  return {
    id: row.id,
    memberId: row.member_id,
    direction: row.direction,
    category: row.category,
    categoryLabel: pointCategoryLabels[row.category] ?? row.category,
    points: row.points,
    balanceAfter: row.balance_after,
    relatedType: row.related_type,
    relatedId: row.related_id,
    title: row.title,
    description: row.description,
    status: row.status,
    statusLabel: pointTransactionStatusLabels[row.status] ?? row.status,
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
  const warehouseIds = row.warehouse_ids ? row.warehouse_ids.split(",").filter(Boolean) : [];
  const warehouseNames = row.warehouse_names ? row.warehouse_names.split("||").filter(Boolean) : [];
  return {
    id: row.id,
    email: row.email,
    displayName: row.display_name,
    departmentId: row.department_id,
    departmentName: row.department_name,
    roleId: row.role_id,
    roleName: row.role_name,
    warehouseIds,
    warehouseNames,
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
    freeStorageDays: row.free_storage_days ?? 30,
    storageFeeHkdPerDay: row.storage_fee_hkd_per_day ?? 0,
    remarks: row.remarks,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function mapWarehouseShelf(row: WarehouseShelfRow) {
  return {
    id: row.id,
    warehouseId: row.warehouse_id,
    warehouseName: row.warehouse_name,
    code: row.code,
    name: row.name,
    areaCode: row.area_code,
    shelfNo: row.shelf_no,
    locationCount: row.location_count ?? 0,
    status: row.status,
    statusLabel: row.status === "active" ? "啟用" : "停用",
    sortOrder: row.sort_order,
    remarks: row.remarks,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function mapWarehouseLocation(row: WarehouseLocationRow) {
  const typeLabels: Record<string, string> = {
    normal: "普通",
    valuable: "貴重",
    large: "大件",
    exception: "異常",
    pending: "待處理"
  };
  return {
    id: row.id,
    warehouseId: row.warehouse_id,
    warehouseName: row.warehouse_name,
    shelfId: row.shelf_id,
    shelfCode: row.shelf_code,
    code: row.code,
    areaCode: row.area_code,
    shelfNo: row.shelf_no,
    layerNo: row.layer_no,
    slotNo: row.slot_no,
    locationType: row.location_type,
    locationTypeLabel: typeLabels[row.location_type] ?? row.location_type,
    status: row.status,
    statusLabel: row.status === "active" ? "啟用" : row.status === "occupied" ? "占用" : row.status === "maintenance" ? "維護中" : "停用",
    maxPackages: row.max_packages,
    maxWeightKg: row.max_weight_kg,
    maxVolumeCm3: row.max_volume_cm3,
    remarks: row.remarks,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function mapSystemDictionary(row: SystemDictionaryRow) {
  return {
    id: row.id,
    categoryCode: row.category_code,
    categoryNameZhHant: row.category_name_zh_hant,
    itemCode: row.item_code,
    itemValue: row.item_value,
    labelZhHant: row.label_zh_hant,
    labelEn: row.label_en,
    labelJa: row.label_ja,
    sortOrder: row.sort_order,
    status: row.status,
    statusLabel: row.status === "active" ? "啟用" : "停用",
    isSystem: row.is_system === 1,
    remarks: row.remarks,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function mapFeeSetting(row: FeeSettingRow) {
  return {
    id: row.id,
    categoryCode: row.category_code,
    categoryName: row.category_name,
    feeCode: row.fee_code,
    feeName: row.fee_name,
    chargeMode: row.charge_mode,
    chargeModeLabel: row.charge_mode === "percent" ? "按比例" : "固定金額",
    amountHkd: row.amount_hkd,
    percentRate: row.percent_rate,
    currency: row.currency,
    status: row.status,
    statusLabel: row.status === "active" ? "啟用" : "停用",
    sortOrder: row.sort_order,
    remarks: row.remarks,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function mapValueAddedRequest(row: ValueAddedRequestRow) {
  const labels: Record<string, string> = {
    pending: "待處理",
    processing: "處理中",
    completed: "已完成",
    cancelled: "已取消"
  };
  return {
    id: row.id,
    packageId: row.package_id,
    warehouseId: row.warehouse_id,
    warehouseName: row.warehouse_name ?? null,
    memberId: row.member_id,
    memberEmail: row.member_email ?? null,
    memberUserCode: row.member_user_code ?? null,
    serviceCode: row.service_code,
    serviceName: row.service_name,
    amountHkd: row.amount_hkd,
    status: row.status,
    statusLabel: labels[row.status] ?? row.status,
    requestNote: row.request_note,
    processNote: row.process_note,
    packageTrackingNo: row.package_tracking_no ?? null,
    packageItemName: row.package_item_name ?? null,
    packageShelfCode: row.package_shelf_code ?? null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    completedAt: row.completed_at
  };
}

function mapConsolidationBatch(row: ConsolidationBatchRow) {
  const labels: Record<string, string> = {
    created: "已建批次",
    packing: "打包中",
    packed: "已打包",
    outbounded: "已出庫",
    cancelled: "已取消"
  };
  return {
    id: row.id,
    batchNo: row.batch_no,
    warehouseId: row.warehouse_id,
    warehouseName: row.warehouse_name ?? null,
    memberId: row.member_id,
    memberEmail: row.member_email ?? null,
    memberUserCode: row.member_user_code ?? null,
    packageCount: row.package_count,
    packageIds: row.package_ids ? row.package_ids.split(",").filter(Boolean) : [],
    cartonType: row.carton_type,
    cartonFeeHkd: row.carton_fee_hkd,
    weightKg: row.weight_kg,
    lengthCm: row.length_cm,
    widthCm: row.width_cm,
    heightCm: row.height_cm,
    internationalTrackingNo: row.international_tracking_no,
    logisticsProductName: row.logistics_product_name,
    shippingFeeHkd: row.shipping_fee_hkd,
    status: row.status,
    statusLabel: labels[row.status] ?? row.status,
    remarks: row.remarks,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    packedAt: row.packed_at,
    outboundedAt: row.outbounded_at
  };
}

function mapLogisticsSupplier(row: LogisticsSupplierRow) {
  return {
    id: row.id,
    supplierCode: row.supplier_code,
    name: row.name,
    contactName: row.contact_name,
    contactPhone: row.contact_phone,
    contactEmail: row.contact_email,
    loginEmail: row.login_email,
    countryCode: row.country_code,
    countryName: row.country_name,
    city: row.city,
    settlementCurrency: row.settlement_currency,
    status: row.status,
    statusLabel: row.status === "active" ? "啟用" : "停用",
    channelProductCount: row.channel_product_count ?? 0,
    remarks: row.remarks,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function mapChannelProduct(row: ChannelProductRow) {
  return {
    id: row.id,
    channelProductCode: row.channel_product_code,
    supplierId: row.supplier_id,
    supplierCode: row.supplier_code,
    supplierName: row.supplier_name,
    name: row.name,
    carrierName: row.carrier_name,
    serviceName: row.service_name,
    originCountryCode: row.origin_country_code,
    originCountryName: row.origin_country_name,
    originCity: row.origin_city,
    destinationCountryCode: row.destination_country_code,
    destinationCountryName: row.destination_country_name,
    destinationCity: row.destination_city,
    transitTime: row.transit_time,
    costCurrency: row.cost_currency,
    firstWeightKg: row.first_weight_kg,
    firstWeightPrice: row.first_weight_price,
    additionalWeightUnitKg: row.additional_weight_unit_kg,
    additionalWeightPrice: row.additional_weight_price,
    maxWeightKg: row.max_weight_kg,
    status: row.status,
    statusLabel: row.status === "active" ? "鍟熺敤" : "鍋滅敤",
    remarks: row.remarks,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function parseJsonArray(value: string | null) {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function mapLogisticsProduct(row: LogisticsProductRow) {
  return {
    id: row.id,
    productCode: row.product_code,
    productName: row.product_name,
    channelProductId: row.channel_product_id,
    channelProductCode: row.channel_product_code,
    channelProductName: row.channel_product_name,
    routeName: row.route_name,
    originCountryCode: row.origin_country_code,
    originCountryName: row.origin_country_name,
    originCity: row.origin_city,
    destinationCountryCode: row.destination_country_code,
    destinationCountryName: row.destination_country_name,
    destinationCity: row.destination_city,
    estimatedDays: row.estimated_days,
    supportCategories: parseJsonArray(row.support_categories),
    forbiddenCategories: parseJsonArray(row.forbidden_categories),
    chargeWeightMode: row.charge_weight_mode,
    pricingMode: row.pricing_mode,
    minWeight: row.min_weight,
    maxWeight: row.max_weight,
    volumeDivisor: row.volume_divisor,
    roundingUnit: row.rounding_unit,
    densityThreshold: row.density_threshold,
    densityLowMode: row.density_low_mode,
    densityHighMode: row.density_high_mode,
    firstWeight: row.first_weight,
    firstPrice: row.first_price,
    additionalWeight: row.additional_weight,
    additionalPrice: row.additional_price,
    priceTiers: row.price_tiers,
    attributeSurcharges: row.attribute_surcharges,
    handlingFee: row.handling_fee,
    fuelSurchargeRate: row.fuel_surcharge_rate,
    cargoSurchargeRate: row.cargo_surcharge_rate,
    isTaxIncluded: row.is_tax_included === 1,
    needIdentity: row.need_identity === 1,
    supportTracking: row.support_tracking === 1,
    status: row.status,
    statusLabel: row.status === "active" ? "啟用" : "停用",
    remarks: row.remarks,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function mapShippingRestriction(row: ShippingRestrictionRow) {
  return {
    id: row.id,
    ruleName: row.rule_name,
    scopeType: row.scope_type,
    scopeLabel: row.scope_type === "global" ? "全局" : row.scope_type === "country" ? "目的國家" : "物流產品",
    destinationCountryCode: row.destination_country_code,
    destinationCountryName: row.destination_country_name,
    logisticsProductId: row.logistics_product_id,
    logisticsProductCode: row.logistics_product_code,
    logisticsProductName: row.logistics_product_name,
    cargoCategories: parseJsonArray(row.cargo_categories),
    keywords: row.keywords,
    restrictionType: row.restriction_type,
    restrictionTypeLabel: {
      prohibited: "禁運",
      max_weight: "最大重量限制",
      max_dimensions: "最大尺寸限制",
      review_required: "需要人工審核",
      identity_required: "需要身份信息"
    }[row.restriction_type] ?? row.restriction_type,
    maxWeightKg: row.max_weight_kg,
    maxLengthCm: row.max_length_cm,
    maxWidthCm: row.max_width_cm,
    maxHeightCm: row.max_height_cm,
    customerMessage: row.customer_message,
    internalNote: row.internal_note,
    status: row.status,
    statusLabel: row.status === "active" ? "啟用" : "停用",
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
    `SELECT members.id,
            members.email,
            members.user_code,
            members.display_name,
            members.locale,
            members.level_code,
            wallets.balance_hkd,
            member_profile_details.real_name,
            member_profile_details.phone,
            member_profile_details.whatsapp,
            member_profile_details.country_region,
            member_profile_details.preferred_language,
            member_profile_details.notes,
            member_profile_details.updated_at AS profile_updated_at
       FROM members
       JOIN wallets ON wallets.member_id = members.id
       LEFT JOIN member_profile_details ON member_profile_details.member_id = members.id
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
    balanceHkd: member.balance_hkd,
    realName: member.real_name ?? "",
    phone: member.phone ?? "",
    whatsapp: member.whatsapp ?? "",
    countryRegion: member.country_region ?? "",
    preferredLanguage: member.preferred_language ?? member.locale,
    notes: member.notes ?? "",
    profileUpdatedAt: member.profile_updated_at
  };
}

async function updateProfile(db: D1Database, body: JsonObject) {
  const displayName = text(body, "displayName");
  const realName = text(body, "realName");
  const phone = text(body, "phone");
  const whatsapp = text(body, "whatsapp");
  const countryRegion = text(body, "countryRegion");
  const preferredLanguage = text(body, "preferredLanguage") || "zh-Hant";
  const notes = text(body, "notes");
  const allowedLanguages = new Set(["zh-Hant", "en", "ja"]);

  if (!displayName) return json({ error: "請填寫會員名稱" }, { status: 400 });
  if (!allowedLanguages.has(preferredLanguage)) return json({ error: "請選擇有效語言" }, { status: 400 });
  if (displayName.length > 80 || realName.length > 80 || phone.length > 40 || whatsapp.length > 40 || countryRegion.length > 80) {
    return json({ error: "資料欄位長度超出限制" }, { status: 400 });
  }
  if (notes.length > 500) return json({ error: "備註不可超過 500 字" }, { status: 400 });

  await db.batch([
    db.prepare("UPDATE members SET display_name = ?, locale = ? WHERE id = ?").bind(displayName, preferredLanguage, demoMemberId),
    db.prepare(
      `INSERT INTO member_profile_details (
         member_id, real_name, phone, whatsapp, country_region, preferred_language, notes, updated_at
       )
       VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
       ON CONFLICT(member_id) DO UPDATE SET
         real_name = excluded.real_name,
         phone = excluded.phone,
         whatsapp = excluded.whatsapp,
         country_region = excluded.country_region,
         preferred_language = excluded.preferred_language,
         notes = excluded.notes,
         updated_at = CURRENT_TIMESTAMP`
    ).bind(demoMemberId, realName, phone, whatsapp, countryRegion, preferredLanguage, notes)
  ]);

  return json({ profile: await getProfile(db) });
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

async function uniqueMemberCode(db: D1Database) {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const code = generateMemberCode();
    const existing = await first<{ id: string }>(db, "SELECT id FROM members WHERE user_code = ?", code);
    if (!existing) return code;
  }
  throw new Error("Unable to generate member code");
}

async function registerMember(db: D1Database, body: JsonObject) {
  const email = text(body, "email").toLowerCase();
  const displayName = text(body, "displayName") || email.split("@")[0] || "DropPilot Member";
  const password = text(body, "password");
  const confirmPassword = text(body, "confirmPassword");
  if (!email || !email.includes("@")) return json({ error: "請輸入有效電郵" }, { status: 400 });
  if (password.length < 8) return json({ error: "密碼至少需要 8 個字符" }, { status: 400 });
  if (confirmPassword && password !== confirmPassword) return json({ error: "兩次輸入的密碼不一致" }, { status: 400 });
  const existing = await first<{ id: string }>(db, "SELECT id FROM members WHERE LOWER(email) = ?", email);
  if (existing) return json({ error: "此電郵已經註冊" }, { status: 409 });

  const id = `member-${crypto.randomUUID()}`;
  const userCode = await uniqueMemberCode(db);
  const hash = await passwordHash(password);
  await db.batch([
    db.prepare(
      "INSERT INTO members (id, email, display_name, locale, level_code, user_code, password_hash) VALUES (?, ?, ?, 'zh-Hant', 'LV1', ?, ?)"
    ).bind(id, email, displayName, userCode, hash),
    db.prepare("INSERT INTO wallets (member_id, balance_hkd) VALUES (?, 0)").bind(id)
  ]);
  const sid = sessionId();
  await db.prepare("INSERT INTO auth_sessions (id, actor_type, actor_id, expires_at) VALUES (?, 'member', ?, datetime('now', '+7 days'))").bind(sid, id).run();
  return json({ authenticated: true, mode: "member", user: { id, email, displayName } }, { headers: { "Set-Cookie": sessionCookie(sid) } });
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

function mapMemberLevel(row: MemberLevelRow) {
  return {
    id: row.id,
    levelCode: row.level_code,
    levelName: row.level_name,
    minConsumptionHkd: row.min_consumption_hkd,
    minShippingFeeHkd: row.min_shipping_fee_hkd,
    minTopupHkd: row.min_topup_hkd,
    minOrderCount: row.min_order_count,
    shippingDiscountRate: row.shipping_discount_rate,
    serviceFeeDiscountRate: row.service_fee_discount_rate,
    extraFreeStorageDays: row.extra_free_storage_days,
    priorityLevel: row.priority_level,
    commissionRate: row.commission_rate,
    status: row.status,
    statusLabel: row.status === "active" ? "啟用" : "停用",
    sortOrder: row.sort_order,
    remarks: row.remarks,
    createdAt: row.created_at,
    updatedAt: row.updated_at
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

async function listMemberLevels(db: D1Database) {
  const rows = await all<MemberLevelRow>(db, "SELECT * FROM member_levels ORDER BY sort_order ASC, min_consumption_hkd ASC");
  return json({ items: rows.map(mapMemberLevel) });
}

function memberLevelPayload(body: JsonObject) {
  const levelCode = text(body, "levelCode").toUpperCase();
  const levelName = text(body, "levelName");
  const status = text(body, "status") === "disabled" ? "disabled" : "active";
  if (!levelCode || !/^[A-Z0-9_-]{2,20}$/.test(levelCode)) return { error: "請填寫有效會員等級編碼" };
  if (!levelName) return { error: "請填寫會員等級名稱" };
  return {
    levelCode,
    levelName,
    minConsumptionHkd: Math.max(0, decimal(body, "minConsumptionHkd") ?? 0),
    minShippingFeeHkd: Math.max(0, decimal(body, "minShippingFeeHkd") ?? 0),
    minTopupHkd: Math.max(0, decimal(body, "minTopupHkd") ?? 0),
    minOrderCount: Math.max(0, integer(body, "minOrderCount") ?? 0),
    shippingDiscountRate: Math.max(0, decimal(body, "shippingDiscountRate") ?? 1),
    serviceFeeDiscountRate: Math.max(0, decimal(body, "serviceFeeDiscountRate") ?? 1),
    extraFreeStorageDays: Math.max(0, integer(body, "extraFreeStorageDays") ?? 0),
    priorityLevel: Math.max(0, integer(body, "priorityLevel") ?? 0),
    commissionRate: Math.max(0, decimal(body, "commissionRate") ?? 0),
    status,
    sortOrder: integer(body, "sortOrder") ?? 100,
    remarks: text(body, "remarks") || null
  };
}

async function createMemberLevel(db: D1Database, body: JsonObject) {
  const payload = memberLevelPayload(body);
  if ("error" in payload) return json({ error: payload.error }, { status: 400 });
  const duplicate = await first<{ id: string }>(db, "SELECT id FROM member_levels WHERE level_code = ?", payload.levelCode);
  if (duplicate) return json({ error: "會員等級編碼已存在" }, { status: 409 });
  const id = memberLevelId();
  await db.prepare(
    `INSERT INTO member_levels (
       id, level_code, level_name, min_consumption_hkd, min_shipping_fee_hkd, min_topup_hkd, min_order_count,
       shipping_discount_rate, service_fee_discount_rate, extra_free_storage_days, priority_level, commission_rate,
       status, sort_order, remarks
     )
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    id,
    payload.levelCode,
    payload.levelName,
    payload.minConsumptionHkd,
    payload.minShippingFeeHkd,
    payload.minTopupHkd,
    payload.minOrderCount,
    payload.shippingDiscountRate,
    payload.serviceFeeDiscountRate,
    payload.extraFreeStorageDays,
    payload.priorityLevel,
    payload.commissionRate,
    payload.status,
    payload.sortOrder,
    payload.remarks
  ).run();
  const row = await first<MemberLevelRow>(db, "SELECT * FROM member_levels WHERE id = ?", id);
  return json({ item: mapMemberLevel(row!) }, { status: 201 });
}

async function updateMemberLevel(db: D1Database, id: string, body: JsonObject) {
  const existing = await first<MemberLevelRow>(db, "SELECT * FROM member_levels WHERE id = ?", id);
  if (!existing) return json({ error: "會員等級不存在" }, { status: 404 });
  const payload = memberLevelPayload(body);
  if ("error" in payload) return json({ error: payload.error }, { status: 400 });
  const duplicate = await first<{ id: string }>(db, "SELECT id FROM member_levels WHERE level_code = ? AND id <> ?", payload.levelCode, id);
  if (duplicate) return json({ error: "會員等級編碼已存在" }, { status: 409 });
  await db.prepare(
    `UPDATE member_levels
        SET level_code = ?,
            level_name = ?,
            min_consumption_hkd = ?,
            min_shipping_fee_hkd = ?,
            min_topup_hkd = ?,
            min_order_count = ?,
            shipping_discount_rate = ?,
            service_fee_discount_rate = ?,
            extra_free_storage_days = ?,
            priority_level = ?,
            commission_rate = ?,
            status = ?,
            sort_order = ?,
            remarks = ?,
            updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`
  ).bind(
    payload.levelCode,
    payload.levelName,
    payload.minConsumptionHkd,
    payload.minShippingFeeHkd,
    payload.minTopupHkd,
    payload.minOrderCount,
    payload.shippingDiscountRate,
    payload.serviceFeeDiscountRate,
    payload.extraFreeStorageDays,
    payload.priorityLevel,
    payload.commissionRate,
    payload.status,
    payload.sortOrder,
    payload.remarks,
    id
  ).run();
  const row = await first<MemberLevelRow>(db, "SELECT * FROM member_levels WHERE id = ?", id);
  return json({ item: mapMemberLevel(row!) });
}

async function deleteMemberLevel(db: D1Database, id: string) {
  const existing = await first<MemberLevelRow>(db, "SELECT * FROM member_levels WHERE id = ?", id);
  if (!existing) return json({ error: "會員等級不存在" }, { status: 404 });
  const used = await first<{ count: number }>(db, "SELECT COUNT(*) AS count FROM members WHERE level_code = ?", existing.level_code);
  if (used?.count) return json({ error: "此等級已有會員使用，不能刪除，請改為停用" }, { status: 409 });
  await db.prepare("DELETE FROM member_levels WHERE id = ?").bind(id).run();
  return json({ ok: true });
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

async function listMemberMessages(db: D1Database) {
  const rows = await all<MemberMessageRow>(
    db,
    "SELECT * FROM member_messages WHERE member_id = ? ORDER BY created_at DESC",
    demoMemberId
  );
  return json({ items: rows.map(mapMemberMessage) });
}

async function markMemberMessageRead(db: D1Database, id: string) {
  const row = await first<MemberMessageRow>(
    db,
    "SELECT * FROM member_messages WHERE id = ? AND member_id = ?",
    id,
    demoMemberId
  );
  if (!row) return json({ error: "消息不存在" }, { status: 404 });
  if (row.is_read !== 1) {
    await db.prepare(
      "UPDATE member_messages SET is_read = 1, read_at = CURRENT_TIMESTAMP WHERE id = ?"
    ).bind(id).run();
  }
  const updated = await first<MemberMessageRow>(db, "SELECT * FROM member_messages WHERE id = ?", id);
  return json({ item: mapMemberMessage(updated!) });
}

async function markAllMemberMessagesRead(db: D1Database) {
  await db.prepare(
    "UPDATE member_messages SET is_read = 1, read_at = COALESCE(read_at, CURRENT_TIMESTAMP) WHERE member_id = ? AND is_read = 0"
  ).bind(demoMemberId).run();
  return json({ ok: true });
}

async function listMemberInboundPackages(db: D1Database) {
  const rows = await all<InboundPackageRow>(
    db,
    "SELECT * FROM inbound_packages WHERE member_id = ? ORDER BY updated_at DESC",
    demoMemberId
  );
  return json({ items: rows.map(mapInboundPackage) });
}

async function listPackageForecasts(db: D1Database) {
  const rows = await all<PackageForecastRow>(
    db,
    "SELECT * FROM package_forecasts WHERE member_id = ? ORDER BY updated_at DESC",
    demoMemberId
  );
  return json({ items: rows.map(mapPackageForecast) });
}

function packageForecastPayload(body: JsonObject) {
  const trackingNo = text(body, "trackingNo");
  const carrierName = text(body, "carrierName");
  const sourceType = text(body, "sourceType") || null;
  const sourceName = text(body, "sourceName") || null;
  const itemName = text(body, "itemName") || null;
  const quantity = Math.max(1, integer(body, "quantity") ?? 1);
  const remarks = text(body, "remarks") || null;
  const expectedArrivalDate = text(body, "expectedArrivalDate") || null;
  return { trackingNo, carrierName, sourceType, sourceName, itemName, quantity, remarks, expectedArrivalDate };
}

async function createPackageForecast(db: D1Database, body: JsonObject) {
  const payload = packageForecastPayload(body);
  if (!payload.trackingNo || !payload.carrierName) {
    return json({ error: "請填寫物流單號和物流公司" }, { status: 400 });
  }
  const duplicate = await first<PackageForecastRow>(
    db,
    "SELECT * FROM package_forecasts WHERE member_id = ? AND tracking_no = ? AND status <> 'cancelled' ORDER BY created_at DESC",
    demoMemberId,
    payload.trackingNo
  );
  if (duplicate) return json({ error: "此物流單號已存在有效預報" }, { status: 409 });

  const id = packageForecastId();
  await db.prepare(
    `INSERT INTO package_forecasts (
       id, forecast_no, member_id, tracking_no, carrier_name, source_type, source_name,
       item_name, quantity, remarks, expected_arrival_date, status
     )
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'forecasted')`
  ).bind(
    id,
    id,
    demoMemberId,
    payload.trackingNo,
    payload.carrierName,
    payload.sourceType,
    payload.sourceName,
    payload.itemName,
    payload.quantity,
    payload.remarks,
    payload.expectedArrivalDate
  ).run();
  await addAudit(db, "package_forecast.create", id, "member", { trackingNo: payload.trackingNo, carrierName: payload.carrierName });
  const row = await first<PackageForecastRow>(db, "SELECT * FROM package_forecasts WHERE id = ?", id);
  return json({ item: mapPackageForecast(row!) }, { status: 201 });
}

async function updatePackageForecast(db: D1Database, id: string, body: JsonObject) {
  const existing = await first<PackageForecastRow>(db, "SELECT * FROM package_forecasts WHERE id = ? AND member_id = ?", id, demoMemberId);
  if (!existing) return json({ error: "找不到包裹預報" }, { status: 404 });
  if (existing.status !== "forecasted") return json({ error: "只有已預報狀態可以編輯" }, { status: 409 });
  const payload = packageForecastPayload(body);
  if (!payload.trackingNo || !payload.carrierName) {
    return json({ error: "請填寫物流單號和物流公司" }, { status: 400 });
  }
  const duplicate = await first<PackageForecastRow>(
    db,
    "SELECT * FROM package_forecasts WHERE member_id = ? AND tracking_no = ? AND id <> ? AND status <> 'cancelled'",
    demoMemberId,
    payload.trackingNo,
    id
  );
  if (duplicate) return json({ error: "此物流單號已存在有效預報" }, { status: 409 });

  await db.prepare(
    `UPDATE package_forecasts
        SET tracking_no = ?,
            carrier_name = ?,
            source_type = ?,
            source_name = ?,
            item_name = ?,
            quantity = ?,
            remarks = ?,
            expected_arrival_date = ?,
            updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND member_id = ?`
  ).bind(payload.trackingNo, payload.carrierName, payload.sourceType, payload.sourceName, payload.itemName, payload.quantity, payload.remarks, payload.expectedArrivalDate, id, demoMemberId).run();
  await addAudit(db, "package_forecast.update", id, "member", { trackingNo: payload.trackingNo });
  const row = await first<PackageForecastRow>(db, "SELECT * FROM package_forecasts WHERE id = ?", id);
  return json({ item: mapPackageForecast(row!) });
}

async function cancelPackageForecast(db: D1Database, id: string) {
  const existing = await first<PackageForecastRow>(db, "SELECT * FROM package_forecasts WHERE id = ? AND member_id = ?", id, demoMemberId);
  if (!existing) return json({ error: "找不到包裹預報" }, { status: 404 });
  if (existing.status !== "forecasted") return json({ error: "只有已預報狀態可以取消" }, { status: 409 });
  await db.prepare(
    "UPDATE package_forecasts SET status = 'cancelled', cancelled_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND member_id = ?"
  ).bind(id, demoMemberId).run();
  await addAudit(db, "package_forecast.cancel", id, "member", { trackingNo: existing.tracking_no });
  const row = await first<PackageForecastRow>(db, "SELECT * FROM package_forecasts WHERE id = ?", id);
  return json({ item: mapPackageForecast(row!) });
}

async function listAdminInboundPackages(db: D1Database, staffId?: string) {
  const scope = await staffWarehouseScope(db, staffId);
  const rows = scope
    ? await all<InboundPackageRow>(
      db,
      `SELECT * FROM inbound_packages WHERE warehouse_id IN (${scope.map(() => "?").join(",")}) ORDER BY updated_at DESC`,
      ...scope
    )
    : await all<InboundPackageRow>(db, "SELECT * FROM inbound_packages ORDER BY updated_at DESC");
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

async function scanInboundPackage(db: D1Database, body: JsonObject, staffId?: string) {
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
  if (!(await ensureWarehouseAllowed(db, staffId, warehouse.id))) return json({ error: "無權操作此倉庫" }, { status: 403 });
  if (!warehouse.allowInbound) return json({ error: "此倉庫目前不允許入庫" }, { status: 409 });

  const matchedMember = recipientCode ? await findMemberByCode(db, recipientCode) : null;
  const matchedForecast = await first<PackageForecastRow>(
    db,
    "SELECT * FROM package_forecasts WHERE tracking_no = ? AND status = 'forecasted' ORDER BY created_at DESC",
    japaneseTrackingNo
  );
  const existing = await first<InboundPackageRow>(
    db,
    "SELECT * FROM inbound_packages WHERE japanese_tracking_no = ? ORDER BY created_at DESC",
    japaneseTrackingNo
  );

  if (existing) {
    const memberId = existing.member_id ?? matchedMember?.id ?? matchedForecast?.member_id ?? null;
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
    if (matchedForecast) {
      await db.prepare(
        `UPDATE package_forecasts
            SET status = ?,
                matched_inbound_package_id = ?,
                matched_at = COALESCE(matched_at, CURRENT_TIMESTAMP),
                updated_at = CURRENT_TIMESTAMP
          WHERE id = ?`
      ).bind(memberId ? "claimed" : "arrived", existing.id, matchedForecast.id).run();
    }
    const updated = await first<InboundPackageRow>(db, "SELECT * FROM inbound_packages WHERE id = ?", existing.id);
    return json({ item: mapInboundPackage(updated!) });
  }

  const id = inboundPackageId();
  const inboundMemberId = matchedMember?.id ?? matchedForecast?.member_id ?? null;
  await db.prepare(
    `INSERT INTO inbound_packages (
       id, member_id, source_type, warehouse_id, warehouse_name, japanese_tracking_no,
       warehouse_inbound_no, customer_package_no, platform, sender_name, item_name, quantity,
       recipient_code, status, weight_kg, length_cm, width_cm, height_cm, shelf_code, admin_note, inbounded_at
     )
     VALUES (?, ?, 'admin_scan', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`
  ).bind(
    id,
    inboundMemberId,
    warehouse.id,
    warehouse.name,
    japaneseTrackingNo,
    warehouseInboundNo(),
    id,
    platform,
    senderName,
    itemName || matchedForecast?.item_name || "未命名包裹",
    quantity,
    recipientCode || matchedMember?.user_code || null,
    inboundMemberId ? "inbounded" : "orphan",
    weightKg,
    lengthCm,
    widthCm,
    heightCm,
    shelfCode,
    adminNote
  ).run();

  if (matchedForecast) {
    await db.prepare(
      `UPDATE package_forecasts
          SET status = ?,
              matched_inbound_package_id = ?,
              matched_at = COALESCE(matched_at, CURRENT_TIMESTAMP),
              updated_at = CURRENT_TIMESTAMP
        WHERE id = ?`
    ).bind(inboundMemberId ? "claimed" : "arrived", id, matchedForecast.id).run();
  }

  const row = await first<InboundPackageRow>(db, "SELECT * FROM inbound_packages WHERE id = ?", id);
  return json({ item: mapInboundPackage(row!) }, { status: 201 });
}

async function claimInboundPackage(db: D1Database, id: string, body: JsonObject, staffId?: string) {
  const memberCode = text(body, "memberCode");
  if (!memberCode) return json({ error: "請填寫會員識別碼" }, { status: 400 });
  const member = await findMemberByCode(db, memberCode);
  if (!member) return json({ error: "找不到對應會員識別碼" }, { status: 404 });

  const row = await first<InboundPackageRow>(db, "SELECT * FROM inbound_packages WHERE id = ?", id);
  if (!row) return json({ error: "包裹不存在" }, { status: 404 });
  if (!(await ensureWarehouseAllowed(db, staffId, row.warehouse_id))) return json({ error: "無權操作此倉庫包裹" }, { status: 403 });

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

async function shelveInboundPackage(db: D1Database, id: string, body: JsonObject, staffId?: string) {
  const packageRow = await first<InboundPackageRow>(db, "SELECT * FROM inbound_packages WHERE id = ?", id);
  if (!packageRow) return json({ error: "包裹不存在" }, { status: 404 });
  if (!(await ensureWarehouseAllowed(db, staffId, packageRow.warehouse_id))) return json({ error: "無權操作此倉庫包裹" }, { status: 403 });

  const locationId = text(body, "locationId");
  const shelfCodeInput = text(body, "shelfCode").toUpperCase();
  const location = locationId
    ? await first<WarehouseLocationRow>(db, "SELECT * FROM warehouse_locations WHERE id = ?", locationId)
    : await first<WarehouseLocationRow>(db, "SELECT * FROM warehouse_locations WHERE warehouse_id = ? AND code = ?", packageRow.warehouse_id, shelfCodeInput);

  if (!location) return json({ error: "請選擇有效庫位" }, { status: 400 });
  if (location.warehouse_id !== packageRow.warehouse_id) return json({ error: "庫位與包裹不在同一倉庫" }, { status: 409 });
  if (!["active", "occupied"].includes(location.status)) return json({ error: "此庫位不可上架" }, { status: 409 });
  if (!["forecasted", "inbounded", "claimed", "orphan"].includes(packageRow.status)) return json({ error: "此包裹狀態不可上架" }, { status: 409 });

  const nextStatus = packageRow.status === "orphan" ? "orphan" : "shelved";
  await db.batch([
    db.prepare(
      `UPDATE inbound_packages
          SET shelf_code = ?,
              status = ?,
              updated_at = CURRENT_TIMESTAMP
        WHERE id = ?`
    ).bind(location.code, nextStatus, id),
    db.prepare(
      "UPDATE warehouse_locations SET status = 'occupied', updated_at = CURRENT_TIMESTAMP WHERE id = ?"
    ).bind(location.id)
  ]);
  await addAudit(db, "warehouse.shelve", id, "staff", { warehouseId: packageRow.warehouse_id, locationCode: location.code });
  const updated = await first<InboundPackageRow>(db, "SELECT * FROM inbound_packages WHERE id = ?", id);
  return json({ item: mapInboundPackage(updated!) });
}

async function destroyInboundPackage(db: D1Database, id: string, staffId?: string) {
  const packageRow = await first<InboundPackageRow>(db, "SELECT * FROM inbound_packages WHERE id = ?", id);
  if (!packageRow) return json({ error: "包裹不存在" }, { status: 404 });
  if (!(await ensureWarehouseAllowed(db, staffId, packageRow.warehouse_id))) return json({ error: "無權操作此倉庫包裹" }, { status: 403 });
  if (packageRow.status !== "orphan") return json({ error: "只有無主包裹可以標記銷毀" }, { status: 409 });
  await db.prepare(
    "UPDATE inbound_packages SET status = 'destroyed', updated_at = CURRENT_TIMESTAMP WHERE id = ?"
  ).bind(id).run();
  await addAudit(db, "warehouse.orphan.destroy", id, "staff", { warehouseId: packageRow.warehouse_id });
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

async function listMemberPointTransactions(db: D1Database) {
  const rows = await all<PointTransactionRow>(
    db,
    "SELECT * FROM member_point_transactions WHERE member_id = ? ORDER BY created_at DESC",
    demoMemberId
  );
  const summary = rows.reduce(
    (acc, row) => {
      if (row.status !== "posted") return acc;
      if (row.direction === "credit") acc.earned += row.points;
      if (row.direction === "debit") acc.used += row.points;
      return acc;
    },
    { earned: 0, used: 0 }
  );
  return json({
    items: rows.map(mapPointTransaction),
    summary: {
      balance: Math.max(0, summary.earned - summary.used),
      earned: summary.earned,
      used: summary.used
    }
  });
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

async function adjustMemberWallet(db: D1Database, body: JsonObject) {
  const memberId = text(body, "memberId");
  const direction = text(body, "direction") === "debit" ? "debit" : "credit";
  const amountHkd = decimal(body, "amountHkd") ?? 0;
  const title = text(body, "title") || (direction === "credit" ? "人工增加餘額" : "人工扣減餘額");
  const description = text(body, "description") || null;

  if (!memberId) return json({ error: "請選擇會員" }, { status: 400 });
  if (amountHkd <= 0) return json({ error: "調整金額必須大於 0" }, { status: 400 });

  const member = await first<{ id: string }>(db, "SELECT id FROM members WHERE id = ?", memberId);
  if (!member) return json({ error: "會員不存在" }, { status: 404 });

  const wallet = await first<{ balance_hkd: number }>(db, "SELECT balance_hkd FROM wallets WHERE member_id = ?", memberId);
  const currentBalance = wallet?.balance_hkd ?? 0;
  if (direction === "debit" && currentBalance < amountHkd) return json({ error: "會員餘額不足，不能扣減" }, { status: 409 });
  const balanceAfter = direction === "credit" ? currentBalance + amountHkd : currentBalance - amountHkd;

  const statements = [];
  if (wallet) {
    statements.push(db.prepare("UPDATE wallets SET balance_hkd = ?, updated_at = CURRENT_TIMESTAMP WHERE member_id = ?").bind(balanceAfter, memberId));
  } else {
    statements.push(db.prepare("INSERT INTO wallets (member_id, balance_hkd) VALUES (?, ?)").bind(memberId, balanceAfter));
  }
  statements.push(walletTransactionStatement(db, {
    memberId,
    direction,
    category: "adjustment",
    amountHkd,
    balanceAfterHkd: balanceAfter,
    relatedType: "wallet_adjustment",
    relatedId: null,
    title,
    description,
    status: "posted"
  }));
  await db.batch(statements);
  await addAudit(db, "wallet_adjustment", memberId, "staff", { direction, amountHkd, balanceAfter, title, description });
  return json({ ok: true, balanceHkd: balanceAfter });
}

async function listMemberRefundRequests(db: D1Database) {
  const rows = await all<RefundRequestRow>(
    db,
    "SELECT * FROM refund_requests WHERE member_id = ? ORDER BY updated_at DESC",
    demoMemberId
  );
  return json({ items: rows.map(mapRefundRequest) });
}

async function listAdminRefundRequests(db: D1Database) {
  const rows = await all<AdminRefundRequestRow>(
    db,
    `SELECT refund_requests.*,
            members.email AS member_email,
            members.display_name AS member_display_name,
            members.user_code AS member_user_code
       FROM refund_requests
       LEFT JOIN members ON members.id = refund_requests.member_id
      ORDER BY refund_requests.updated_at DESC`
  );
  return json({ items: rows.map(mapRefundRequest) });
}

function refundRequestPayload(body: JsonObject) {
  const amountHkd = integer(body, "amountHkd");
  const refundMethod = text(body, "refundMethod");
  const recipientName = text(body, "recipientName");
  const recipientAccount = text(body, "recipientAccount");
  const bankName = text(body, "bankName") || null;
  const phone = text(body, "phone") || null;
  const reason = text(body, "reason");
  const remarks = text(body, "remarks") || null;
  if (!amountHkd || amountHkd <= 0) return { error: "請填寫有效退款金額" };
  if (!refundMethodLabels[refundMethod]) return { error: "請選擇有效退款方式" };
  if (!recipientName || !recipientAccount || !reason) return { error: "請填寫收款人、收款帳號和退款原因" };
  if (refundMethod === "bank_transfer" && !bankName) return { error: "銀行轉帳退款需要填寫銀行名稱" };
  return { amountHkd, refundMethod, recipientName, recipientAccount, bankName, phone, reason, remarks };
}

async function createRefundRequest(db: D1Database, body: JsonObject) {
  const payload = refundRequestPayload(body);
  if ("error" in payload) return json({ error: payload.error }, { status: 400 });

  const wallet = await first<{ balance_hkd: number }>(db, "SELECT balance_hkd FROM wallets WHERE member_id = ?", demoMemberId);
  if (!wallet || wallet.balance_hkd < payload.amountHkd) return json({ error: "可退款餘額不足" }, { status: 409 });

  const pending = await first<{ total: number }>(
    db,
    "SELECT COALESCE(SUM(amount_hkd), 0) AS total FROM refund_requests WHERE member_id = ? AND status IN ('pending_review', 'approved')",
    demoMemberId
  );
  const available = wallet.balance_hkd - (pending?.total ?? 0);
  if (available < payload.amountHkd) return json({ error: "扣除處理中的退款後，可退款餘額不足" }, { status: 409 });

  const id = refundRequestId();
  await db.prepare(
    `INSERT INTO refund_requests (
       id, member_id, amount_hkd, refund_method, recipient_name, recipient_account,
       bank_name, phone, reason, remarks, status
     )
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending_review')`
  ).bind(
    id,
    demoMemberId,
    payload.amountHkd,
    payload.refundMethod,
    payload.recipientName,
    payload.recipientAccount,
    payload.bankName,
    payload.phone,
    payload.reason,
    payload.remarks
  ).run();
  const row = await first<RefundRequestRow>(db, "SELECT * FROM refund_requests WHERE id = ?", id);
  return json({ item: mapRefundRequest(row!) }, { status: 201 });
}

async function cancelRefundRequest(db: D1Database, id: string) {
  const row = await first<RefundRequestRow>(db, "SELECT * FROM refund_requests WHERE id = ? AND member_id = ?", id, demoMemberId);
  if (!row) return json({ error: "退款申請不存在" }, { status: 404 });
  if (row.status !== "pending_review") return json({ error: "只有待審核退款申請可以取消" }, { status: 409 });
  await db.prepare(
    `UPDATE refund_requests
        SET status = 'cancelled',
            cancelled_at = CURRENT_TIMESTAMP,
            updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`
  ).bind(id).run();
  const updated = await first<RefundRequestRow>(db, "SELECT * FROM refund_requests WHERE id = ?", id);
  return json({ item: mapRefundRequest(updated!) });
}

async function reviewRefundRequest(db: D1Database, id: string, decision: "approve" | "reject", body: JsonObject = {}) {
  const row = await first<RefundRequestRow>(db, "SELECT * FROM refund_requests WHERE id = ?", id);
  if (!row) return json({ error: "退款申請不存在" }, { status: 404 });
  if (row.status !== "pending_review") return json({ error: "只有待審核退款申請可以審核" }, { status: 409 });
  const adminNote = text(body, "adminNote") || null;
  const status = decision === "approve" ? "approved" : "rejected";
  await db.prepare(
    `UPDATE refund_requests
        SET status = ?,
            admin_note = ?,
            reviewed_at = CURRENT_TIMESTAMP,
            updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`
  ).bind(status, adminNote, id).run();
  const updated = await first<RefundRequestRow>(db, "SELECT * FROM refund_requests WHERE id = ?", id);
  return json({ item: mapRefundRequest(updated!) });
}

async function markRefundPaid(db: D1Database, id: string, body: JsonObject = {}) {
  const row = await first<RefundRequestRow>(db, "SELECT * FROM refund_requests WHERE id = ?", id);
  if (!row) return json({ error: "退款申請不存在" }, { status: 404 });
  if (row.status !== "approved") return json({ error: "只有已通過退款申請可以標記已退款" }, { status: 409 });

  const wallet = await first<{ balance_hkd: number }>(db, "SELECT balance_hkd FROM wallets WHERE member_id = ?", row.member_id);
  if (!wallet || wallet.balance_hkd < row.amount_hkd) return json({ error: "會員餘額不足，不能標記已退款" }, { status: 409 });
  const balanceAfter = wallet.balance_hkd - row.amount_hkd;
  const adminNote = text(body, "adminNote") || row.admin_note;

  await db.batch([
    db.prepare("UPDATE wallets SET balance_hkd = balance_hkd - ?, updated_at = CURRENT_TIMESTAMP WHERE member_id = ?").bind(row.amount_hkd, row.member_id),
    db.prepare(
      `UPDATE refund_requests
          SET status = 'paid',
              admin_note = ?,
              paid_at = CURRENT_TIMESTAMP,
              updated_at = CURRENT_TIMESTAMP
        WHERE id = ?`
    ).bind(adminNote, id),
    walletTransactionStatement(db, {
      memberId: row.member_id,
      direction: "debit",
      category: "refund",
      amountHkd: row.amount_hkd,
      balanceAfterHkd: balanceAfter,
      relatedType: "refund_request",
      relatedId: id,
      title: "餘額退款",
      description: refundMethodLabels[row.refund_method] ?? row.refund_method,
      status: "posted"
    })
  ]);
  const updated = await first<RefundRequestRow>(db, "SELECT * FROM refund_requests WHERE id = ?", id);
  return json({ item: mapRefundRequest(updated!) });
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
            staff_roles.name as role_name,
            GROUP_CONCAT(staff_warehouse_permissions.warehouse_id) as warehouse_ids,
            GROUP_CONCAT(warehouses.name, '||') as warehouse_names
       FROM staff_accounts
       LEFT JOIN staff_departments ON staff_departments.id = staff_accounts.department_id
       LEFT JOIN staff_roles ON staff_roles.id = staff_accounts.role_id
       LEFT JOIN staff_warehouse_permissions ON staff_warehouse_permissions.staff_id = staff_accounts.id
       LEFT JOIN warehouses ON warehouses.id = staff_warehouse_permissions.warehouse_id
      GROUP BY staff_accounts.id
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
  const warehouseIds = Array.from(new Set(stringArray(body, "warehouseIds")));

  if (!email || !displayName || !departmentId || !roleId) return { error: "請填寫姓名、電郵、部門和角色" };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { error: "請填寫有效的員工電郵" };

  const department = await first<StaffDepartmentRow>(db, "SELECT * FROM staff_departments WHERE id = ? AND status = 'active'", departmentId);
  if (!department) return { error: "部門不存在或已停用" };
  const role = await first<StaffRoleRow>(db, "SELECT * FROM staff_roles WHERE id = ?", roleId);
  if (!role) return { error: "角色不存在" };
  if (warehouseIds.length) {
    const placeholders = warehouseIds.map(() => "?").join(",");
    const found = await all<{ id: string }>(db, `SELECT id FROM warehouses WHERE id IN (${placeholders})`, ...warehouseIds);
    if (found.length !== warehouseIds.length) return { error: "部分授權倉庫不存在" };
  }

  return { email, displayName, departmentId, roleId, status, warehouseIds };
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
  if (payload.warehouseIds.length) {
    await db.batch(payload.warehouseIds.map((warehouseId) => db.prepare(
      "INSERT OR IGNORE INTO staff_warehouse_permissions (staff_id, warehouse_id) VALUES (?, ?)"
    ).bind(id, warehouseId)));
  }
  const row = await first<StaffAccountRow>(
    db,
    `SELECT staff_accounts.*,
            staff_departments.name as department_name,
            staff_roles.name as role_name,
            GROUP_CONCAT(staff_warehouse_permissions.warehouse_id) as warehouse_ids,
            GROUP_CONCAT(warehouses.name, '||') as warehouse_names
       FROM staff_accounts
       LEFT JOIN staff_departments ON staff_departments.id = staff_accounts.department_id
       LEFT JOIN staff_roles ON staff_roles.id = staff_accounts.role_id
       LEFT JOIN staff_warehouse_permissions ON staff_warehouse_permissions.staff_id = staff_accounts.id
       LEFT JOIN warehouses ON warehouses.id = staff_warehouse_permissions.warehouse_id
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
  await db.prepare("DELETE FROM staff_warehouse_permissions WHERE staff_id = ?").bind(id).run();
  if (payload.warehouseIds.length) {
    await db.batch(payload.warehouseIds.map((warehouseId) => db.prepare(
      "INSERT OR IGNORE INTO staff_warehouse_permissions (staff_id, warehouse_id) VALUES (?, ?)"
    ).bind(id, warehouseId)));
  }
  const row = await first<StaffAccountRow>(
    db,
    `SELECT staff_accounts.*,
            staff_departments.name as department_name,
            staff_roles.name as role_name,
            GROUP_CONCAT(staff_warehouse_permissions.warehouse_id) as warehouse_ids,
            GROUP_CONCAT(warehouses.name, '||') as warehouse_names
       FROM staff_accounts
       LEFT JOIN staff_departments ON staff_departments.id = staff_accounts.department_id
       LEFT JOIN staff_roles ON staff_roles.id = staff_accounts.role_id
       LEFT JOIN staff_warehouse_permissions ON staff_warehouse_permissions.staff_id = staff_accounts.id
       LEFT JOIN warehouses ON warehouses.id = staff_warehouse_permissions.warehouse_id
      WHERE staff_accounts.id = ?`,
    id
  );
  return json({ item: mapStaffAccount(row!) });
}

async function deleteStaffAccount(db: D1Database, id: string) {
  const existing = await first<StaffAccountRow>(db, "SELECT * FROM staff_accounts WHERE id = ?", id);
  if (!existing) return json({ error: "員工帳號不存在" }, { status: 404 });
  await db.prepare("DELETE FROM staff_warehouse_permissions WHERE staff_id = ?").bind(id).run();
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

async function listWarehouses(db: D1Database, staffId?: string) {
  const scope = await staffWarehouseScope(db, staffId);
  const rows = scope
    ? await all<WarehouseRow>(
      db,
      `SELECT * FROM warehouses WHERE id IN (${scope.map(() => "?").join(",")}) ORDER BY sort_order ASC, created_at ASC`,
      ...scope
    )
    : await all<WarehouseRow>(
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
    freeStorageDays: Math.max(0, integer(body, "freeStorageDays") ?? 30),
    storageFeeHkdPerDay: Math.max(0, integer(body, "storageFeeHkdPerDay") ?? 0),
    remarks: text(body, "remarks") || null
  };
}

async function createWarehouse(db: D1Database, body: JsonObject, staffId?: string) {
  const scope = await staffWarehouseScope(db, staffId);
  if (scope) return json({ error: "已限制倉庫權限的員工不能新增倉庫" }, { status: 403 });
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
       status, is_default, allow_inbound, allow_outbound, sort_order,
       free_storage_days, storage_fee_hkd_per_day, remarks
     )
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
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
    payload.freeStorageDays,
    payload.storageFeeHkdPerDay,
    payload.remarks
  ));
  await db.batch(statements);
  const row = await first<WarehouseRow>(db, "SELECT * FROM warehouses WHERE id = ?", id);
  return json({ item: mapWarehouse(row!) }, { status: 201 });
}

async function updateWarehouse(db: D1Database, id: string, body: JsonObject, staffId?: string) {
  const existing = await first<WarehouseRow>(db, "SELECT * FROM warehouses WHERE id = ?", id);
  if (!existing) return json({ error: "倉庫不存在" }, { status: 404 });
  if (!(await ensureWarehouseAllowed(db, staffId, id))) return json({ error: "無權操作此倉庫" }, { status: 403 });

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
            free_storage_days = ?,
            storage_fee_hkd_per_day = ?,
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
    payload.freeStorageDays,
    payload.storageFeeHkdPerDay,
    payload.remarks,
    id
  ));
  await db.batch(statements);
  const row = await first<WarehouseRow>(db, "SELECT * FROM warehouses WHERE id = ?", id);
  return json({ item: mapWarehouse(row!) });
}

async function deleteWarehouse(db: D1Database, id: string, staffId?: string) {
  const existing = await first<WarehouseRow>(db, "SELECT * FROM warehouses WHERE id = ?", id);
  if (!existing) return json({ error: "倉庫不存在" }, { status: 404 });
  if (!(await ensureWarehouseAllowed(db, staffId, id))) return json({ error: "無權刪除此倉庫" }, { status: 403 });
  const used = await first<{ count: number }>(db, "SELECT COUNT(*) as count FROM inbound_packages WHERE warehouse_id = ?", id);
  if (used?.count) return json({ error: "此倉庫已有包裹資料，不能刪除，請改為停用" }, { status: 409 });
  await db.prepare("DELETE FROM warehouses WHERE id = ?").bind(id).run();
  return json({ ok: true });
}

async function listWarehouseShelves(db: D1Database, staffId?: string) {
  const scope = await staffWarehouseScope(db, staffId);
  const where = scope ? `WHERE warehouse_shelves.warehouse_id IN (${scope.map(() => "?").join(",")})` : "";
  const rows = await all<WarehouseShelfRow>(
    db,
    `SELECT warehouse_shelves.*,
            warehouses.name as warehouse_name,
            COUNT(warehouse_locations.id) as location_count
       FROM warehouse_shelves
       LEFT JOIN warehouses ON warehouses.id = warehouse_shelves.warehouse_id
       LEFT JOIN warehouse_locations ON warehouse_locations.shelf_id = warehouse_shelves.id
      ${where}
      GROUP BY warehouse_shelves.id
      ORDER BY warehouses.sort_order ASC, warehouse_shelves.sort_order ASC, warehouse_shelves.code ASC`,
    ...(scope ?? [])
  );
  return json({ items: rows.map(mapWarehouseShelf) });
}

function shelfPayload(body: JsonObject) {
  const warehouseId = text(body, "warehouseId");
  const code = text(body, "code").toUpperCase();
  const name = text(body, "name");
  const status = text(body, "status") === "disabled" ? "disabled" : "active";
  if (!warehouseId) return { error: "請選擇所屬倉庫" };
  if (!code || !/^[A-Z0-9_-]{1,32}$/.test(code)) return { error: "請填寫有效貨架編碼，只能使用英文、數字、底線或短橫線" };
  if (!name) return { error: "請填寫貨架名稱" };
  return {
    warehouseId,
    code,
    name,
    areaCode: text(body, "areaCode").toUpperCase() || null,
    shelfNo: text(body, "shelfNo") || null,
    status,
    sortOrder: integer(body, "sortOrder") ?? 100,
    remarks: text(body, "remarks") || null
  };
}

async function createWarehouseShelf(db: D1Database, body: JsonObject, staffId?: string) {
  const payload = shelfPayload(body);
  if ("error" in payload) return json({ error: payload.error }, { status: 400 });
  if (!(await ensureWarehouseAllowed(db, staffId, payload.warehouseId))) return json({ error: "無權操作此倉庫" }, { status: 403 });
  const warehouse = await first<WarehouseRow>(db, "SELECT * FROM warehouses WHERE id = ?", payload.warehouseId);
  if (!warehouse) return json({ error: "倉庫不存在" }, { status: 404 });
  const duplicate = await first<{ id: string }>(db, "SELECT id FROM warehouse_shelves WHERE warehouse_id = ? AND code = ?", payload.warehouseId, payload.code);
  if (duplicate) return json({ error: "同一倉庫內貨架編碼已存在" }, { status: 409 });
  const id = warehouseShelfId();
  await db.prepare(
    `INSERT INTO warehouse_shelves (id, warehouse_id, code, name, area_code, shelf_no, status, sort_order, remarks)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(id, payload.warehouseId, payload.code, payload.name, payload.areaCode, payload.shelfNo, payload.status, payload.sortOrder, payload.remarks).run();
  const row = await first<WarehouseShelfRow>(
    db,
    `SELECT warehouse_shelves.*, warehouses.name as warehouse_name, 0 as location_count
       FROM warehouse_shelves
       LEFT JOIN warehouses ON warehouses.id = warehouse_shelves.warehouse_id
      WHERE warehouse_shelves.id = ?`,
    id
  );
  return json({ item: mapWarehouseShelf(row!) }, { status: 201 });
}

async function updateWarehouseShelf(db: D1Database, id: string, body: JsonObject, staffId?: string) {
  const existing = await first<WarehouseShelfRow>(db, "SELECT * FROM warehouse_shelves WHERE id = ?", id);
  if (!existing) return json({ error: "貨架不存在" }, { status: 404 });
  if (!(await ensureWarehouseAllowed(db, staffId, existing.warehouse_id))) return json({ error: "無權操作此倉庫貨架" }, { status: 403 });
  const payload = shelfPayload(body);
  if ("error" in payload) return json({ error: payload.error }, { status: 400 });
  if (!(await ensureWarehouseAllowed(db, staffId, payload.warehouseId))) return json({ error: "無權移動至此倉庫" }, { status: 403 });
  const warehouse = await first<WarehouseRow>(db, "SELECT * FROM warehouses WHERE id = ?", payload.warehouseId);
  if (!warehouse) return json({ error: "倉庫不存在" }, { status: 404 });
  const duplicate = await first<{ id: string }>(db, "SELECT id FROM warehouse_shelves WHERE warehouse_id = ? AND code = ? AND id <> ?", payload.warehouseId, payload.code, id);
  if (duplicate) return json({ error: "同一倉庫內貨架編碼已存在" }, { status: 409 });
  await db.prepare(
    `UPDATE warehouse_shelves
        SET warehouse_id = ?, code = ?, name = ?, area_code = ?, shelf_no = ?, status = ?, sort_order = ?, remarks = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`
  ).bind(payload.warehouseId, payload.code, payload.name, payload.areaCode, payload.shelfNo, payload.status, payload.sortOrder, payload.remarks, id).run();
  await db.prepare(
    `UPDATE warehouse_locations
        SET warehouse_id = ?, area_code = ?, shelf_no = ?, updated_at = CURRENT_TIMESTAMP
      WHERE shelf_id = ?`
  ).bind(payload.warehouseId, payload.areaCode, payload.shelfNo, id).run();
  const row = await first<WarehouseShelfRow>(
    db,
    `SELECT warehouse_shelves.*, warehouses.name as warehouse_name, COUNT(warehouse_locations.id) as location_count
       FROM warehouse_shelves
       LEFT JOIN warehouses ON warehouses.id = warehouse_shelves.warehouse_id
       LEFT JOIN warehouse_locations ON warehouse_locations.shelf_id = warehouse_shelves.id
      WHERE warehouse_shelves.id = ?
      GROUP BY warehouse_shelves.id`,
    id
  );
  return json({ item: mapWarehouseShelf(row!) });
}

async function deleteWarehouseShelf(db: D1Database, id: string, staffId?: string) {
  const existing = await first<WarehouseShelfRow>(db, "SELECT * FROM warehouse_shelves WHERE id = ?", id);
  if (!existing) return json({ error: "貨架不存在" }, { status: 404 });
  if (!(await ensureWarehouseAllowed(db, staffId, existing.warehouse_id))) return json({ error: "無權刪除此倉庫貨架" }, { status: 403 });
  const used = await first<{ count: number }>(db, "SELECT COUNT(*) as count FROM warehouse_locations WHERE shelf_id = ?", id);
  if (used?.count) return json({ error: "此貨架已有庫位，請先處理庫位或停用貨架" }, { status: 409 });
  await db.prepare("DELETE FROM warehouse_shelves WHERE id = ?").bind(id).run();
  return json({ ok: true });
}

async function listWarehouseLocations(db: D1Database, staffId?: string) {
  const scope = await staffWarehouseScope(db, staffId);
  const where = scope ? `WHERE warehouse_locations.warehouse_id IN (${scope.map(() => "?").join(",")})` : "";
  const rows = await all<WarehouseLocationRow>(
    db,
    `SELECT warehouse_locations.*,
            warehouses.name as warehouse_name,
            warehouse_shelves.code as shelf_code
       FROM warehouse_locations
       LEFT JOIN warehouses ON warehouses.id = warehouse_locations.warehouse_id
       LEFT JOIN warehouse_shelves ON warehouse_shelves.id = warehouse_locations.shelf_id
      ${where}
      ORDER BY warehouses.sort_order ASC, warehouse_locations.code ASC`,
    ...(scope ?? [])
  );
  return json({ items: rows.map(mapWarehouseLocation) });
}

function locationPayload(body: JsonObject) {
  const warehouseId = text(body, "warehouseId");
  const shelfId = text(body, "shelfId");
  const code = text(body, "code").toUpperCase();
  const locationType = text(body, "locationType") || "normal";
  const status = text(body, "status") || "active";
  const allowedTypes = ["normal", "valuable", "large", "exception", "pending"];
  const allowedStatuses = ["active", "disabled", "occupied", "maintenance"];
  if (!warehouseId) return { error: "請選擇所屬倉庫" };
  if (!shelfId) return { error: "請選擇所屬貨架" };
  if (!code || !/^[A-Z0-9_-]{1,48}$/.test(code)) return { error: "請填寫有效庫位編碼，只能使用英文、數字、底線或短橫線" };
  if (!allowedTypes.includes(locationType)) return { error: "請選擇有效庫位類型" };
  if (!allowedStatuses.includes(status)) return { error: "請選擇有效庫位狀態" };
  return {
    warehouseId,
    shelfId,
    code,
    areaCode: text(body, "areaCode").toUpperCase() || null,
    shelfNo: text(body, "shelfNo") || null,
    layerNo: integer(body, "layerNo"),
    slotNo: integer(body, "slotNo"),
    locationType,
    status,
    maxPackages: integer(body, "maxPackages"),
    maxWeightKg: decimal(body, "maxWeightKg"),
    maxVolumeCm3: decimal(body, "maxVolumeCm3"),
    remarks: text(body, "remarks") || null
  };
}

async function createWarehouseLocation(db: D1Database, body: JsonObject, staffId?: string) {
  const payload = locationPayload(body);
  if ("error" in payload) return json({ error: payload.error }, { status: 400 });
  if (!(await ensureWarehouseAllowed(db, staffId, payload.warehouseId))) return json({ error: "無權操作此倉庫" }, { status: 403 });
  const shelf = await first<WarehouseShelfRow>(db, "SELECT * FROM warehouse_shelves WHERE id = ? AND warehouse_id = ?", payload.shelfId, payload.warehouseId);
  if (!shelf) return json({ error: "貨架不存在或不屬於所選倉庫" }, { status: 404 });
  const duplicate = await first<{ id: string }>(db, "SELECT id FROM warehouse_locations WHERE warehouse_id = ? AND code = ?", payload.warehouseId, payload.code);
  if (duplicate) return json({ error: "同一倉庫內庫位編碼已存在" }, { status: 409 });
  const id = warehouseLocationId();
  await db.prepare(
    `INSERT INTO warehouse_locations (
       id, warehouse_id, shelf_id, code, area_code, shelf_no, layer_no, slot_no,
       location_type, status, max_packages, max_weight_kg, max_volume_cm3, remarks
     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    id,
    payload.warehouseId,
    payload.shelfId,
    payload.code,
    payload.areaCode,
    payload.shelfNo,
    payload.layerNo,
    payload.slotNo,
    payload.locationType,
    payload.status,
    payload.maxPackages,
    payload.maxWeightKg,
    payload.maxVolumeCm3,
    payload.remarks
  ).run();
  const row = await first<WarehouseLocationRow>(
    db,
    `SELECT warehouse_locations.*, warehouses.name as warehouse_name, warehouse_shelves.code as shelf_code
       FROM warehouse_locations
       LEFT JOIN warehouses ON warehouses.id = warehouse_locations.warehouse_id
       LEFT JOIN warehouse_shelves ON warehouse_shelves.id = warehouse_locations.shelf_id
      WHERE warehouse_locations.id = ?`,
    id
  );
  return json({ item: mapWarehouseLocation(row!) }, { status: 201 });
}

async function createWarehouseLocationsBulk(db: D1Database, body: JsonObject, staffId?: string) {
  const warehouseId = text(body, "warehouseId");
  const shelfId = text(body, "shelfId");
  const areaCode = text(body, "areaCode").toUpperCase();
  const shelfNo = text(body, "shelfNo").toUpperCase();
  const layerCount = Math.max(1, integer(body, "layerCount") ?? 1);
  const slotsPerLayer = Math.max(1, integer(body, "slotsPerLayer") ?? 1);
  const locationType = text(body, "locationType") || "normal";
  const maxPackages = integer(body, "maxPackages");
  const maxWeightKg = decimal(body, "maxWeightKg");
  if (!warehouseId || !shelfId) return json({ error: "請選擇倉庫和貨架" }, { status: 400 });
  if (!(await ensureWarehouseAllowed(db, staffId, warehouseId))) return json({ error: "無權操作此倉庫" }, { status: 403 });
  if (!areaCode || !shelfNo) return json({ error: "請填寫區域和貨架號" }, { status: 400 });
  if (layerCount > 30 || slotsPerLayer > 200) return json({ error: "單次最多生成 30 層、每層 200 個庫位" }, { status: 400 });
  const shelf = await first<WarehouseShelfRow>(db, "SELECT * FROM warehouse_shelves WHERE id = ? AND warehouse_id = ?", shelfId, warehouseId);
  if (!shelf) return json({ error: "貨架不存在或不屬於所選倉庫" }, { status: 404 });

  const statements = [];
  let created = 0;
  for (let layer = 1; layer <= layerCount; layer += 1) {
    for (let slot = 1; slot <= slotsPerLayer; slot += 1) {
      const code = `${areaCode}-${shelfNo}-${String(layer).padStart(2, "0")}-${String(slot).padStart(2, "0")}`;
      const duplicate = await first<{ id: string }>(db, "SELECT id FROM warehouse_locations WHERE warehouse_id = ? AND code = ?", warehouseId, code);
      if (duplicate) continue;
      statements.push(db.prepare(
        `INSERT INTO warehouse_locations (
           id, warehouse_id, shelf_id, code, area_code, shelf_no, layer_no, slot_no,
           location_type, status, max_packages, max_weight_kg, remarks
         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'active', ?, ?, ?)`
      ).bind(
        warehouseLocationId(),
        warehouseId,
        shelfId,
        code,
        areaCode,
        shelfNo,
        layer,
        slot,
        locationType,
        maxPackages,
        maxWeightKg,
        text(body, "remarks") || null
      ));
      created += 1;
    }
  }
  if (statements.length) await db.batch(statements);
  return json({ ok: true, created });
}

async function updateWarehouseLocation(db: D1Database, id: string, body: JsonObject, staffId?: string) {
  const existing = await first<WarehouseLocationRow>(db, "SELECT * FROM warehouse_locations WHERE id = ?", id);
  if (!existing) return json({ error: "庫位不存在" }, { status: 404 });
  if (!(await ensureWarehouseAllowed(db, staffId, existing.warehouse_id))) return json({ error: "無權操作此倉庫庫位" }, { status: 403 });
  const payload = locationPayload(body);
  if ("error" in payload) return json({ error: payload.error }, { status: 400 });
  if (!(await ensureWarehouseAllowed(db, staffId, payload.warehouseId))) return json({ error: "無權移動至此倉庫" }, { status: 403 });
  const shelf = await first<WarehouseShelfRow>(db, "SELECT * FROM warehouse_shelves WHERE id = ? AND warehouse_id = ?", payload.shelfId, payload.warehouseId);
  if (!shelf) return json({ error: "貨架不存在或不屬於所選倉庫" }, { status: 404 });
  const duplicate = await first<{ id: string }>(db, "SELECT id FROM warehouse_locations WHERE warehouse_id = ? AND code = ? AND id <> ?", payload.warehouseId, payload.code, id);
  if (duplicate) return json({ error: "同一倉庫內庫位編碼已存在" }, { status: 409 });
  await db.prepare(
    `UPDATE warehouse_locations
        SET warehouse_id = ?, shelf_id = ?, code = ?, area_code = ?, shelf_no = ?, layer_no = ?, slot_no = ?,
            location_type = ?, status = ?, max_packages = ?, max_weight_kg = ?, max_volume_cm3 = ?, remarks = ?,
            updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`
  ).bind(
    payload.warehouseId,
    payload.shelfId,
    payload.code,
    payload.areaCode,
    payload.shelfNo,
    payload.layerNo,
    payload.slotNo,
    payload.locationType,
    payload.status,
    payload.maxPackages,
    payload.maxWeightKg,
    payload.maxVolumeCm3,
    payload.remarks,
    id
  ).run();
  const row = await first<WarehouseLocationRow>(
    db,
    `SELECT warehouse_locations.*, warehouses.name as warehouse_name, warehouse_shelves.code as shelf_code
       FROM warehouse_locations
       LEFT JOIN warehouses ON warehouses.id = warehouse_locations.warehouse_id
       LEFT JOIN warehouse_shelves ON warehouse_shelves.id = warehouse_locations.shelf_id
      WHERE warehouse_locations.id = ?`,
    id
  );
  return json({ item: mapWarehouseLocation(row!) });
}

async function deleteWarehouseLocation(db: D1Database, id: string, staffId?: string) {
  const existing = await first<WarehouseLocationRow>(db, "SELECT * FROM warehouse_locations WHERE id = ?", id);
  if (!existing) return json({ error: "庫位不存在" }, { status: 404 });
  if (!(await ensureWarehouseAllowed(db, staffId, existing.warehouse_id))) return json({ error: "無權刪除此倉庫庫位" }, { status: 403 });
  const used = await first<{ count: number }>(db, "SELECT COUNT(*) as count FROM inbound_packages WHERE warehouse_id = ? AND shelf_code = ?", existing.warehouse_id, existing.code);
  if (used?.count) return json({ error: "此庫位已有包裹資料，請改為停用" }, { status: 409 });
  await db.prepare("DELETE FROM warehouse_locations WHERE id = ?").bind(id).run();
  return json({ ok: true });
}

async function listSystemDictionaries(db: D1Database) {
  const rows = await all<SystemDictionaryRow>(
    db,
    `SELECT * FROM system_dictionaries
      ORDER BY category_code ASC, sort_order ASC, item_code ASC`
  );
  const categories = Array.from(new Map(rows.map((row) => [row.category_code, row.category_name_zh_hant])).entries())
    .map(([code, name]) => ({ code, name }));
  return json({ items: rows.map(mapSystemDictionary), categories });
}

function dictionaryPayload(body: JsonObject) {
  const categoryCode = text(body, "categoryCode").toLowerCase();
  const categoryNameZhHant = text(body, "categoryNameZhHant");
  const itemCode = text(body, "itemCode").toLowerCase();
  const itemValue = text(body, "itemValue");
  const labelZhHant = text(body, "labelZhHant");
  const labelEn = text(body, "labelEn");
  const labelJa = text(body, "labelJa");
  const status = text(body, "status") === "disabled" ? "disabled" : "active";

  if (!categoryCode || !/^[a-z0-9_-]{2,64}$/.test(categoryCode)) return { error: "請填寫有效分類編碼，只能使用英文、數字、底線或短橫線" };
  if (!itemCode || !/^[a-z0-9_-]{1,80}$/.test(itemCode)) return { error: "請填寫有效字典編碼，只能使用英文、數字、底線或短橫線" };
  if (!categoryNameZhHant) return { error: "請填寫字典分類名稱" };
  if (!itemValue) return { error: "請填寫字典值" };
  if (!labelZhHant) return { error: "請填寫繁體名稱" };

  return {
    categoryCode,
    categoryNameZhHant,
    itemCode,
    itemValue,
    labelZhHant,
    labelEn,
    labelJa,
    sortOrder: integer(body, "sortOrder") ?? 100,
    status,
    remarks: text(body, "remarks") || null
  };
}

async function createSystemDictionary(db: D1Database, body: JsonObject) {
  const payload = dictionaryPayload(body);
  if ("error" in payload) return json({ error: payload.error }, { status: 400 });

  const duplicate = await first<{ id: string }>(
    db,
    "SELECT id FROM system_dictionaries WHERE category_code = ? AND item_code = ?",
    payload.categoryCode,
    payload.itemCode
  );
  if (duplicate) return json({ error: "同一分類下字典編碼已存在" }, { status: 409 });

  const id = dictionaryId();
  await db.prepare(
    `INSERT INTO system_dictionaries (
       id, category_code, category_name_zh_hant, item_code, item_value,
       label_zh_hant, label_en, label_ja, sort_order, status, is_system, remarks
     )
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?)`
  ).bind(
    id,
    payload.categoryCode,
    payload.categoryNameZhHant,
    payload.itemCode,
    payload.itemValue,
    payload.labelZhHant,
    payload.labelEn,
    payload.labelJa,
    payload.sortOrder,
    payload.status,
    payload.remarks
  ).run();

  const row = await first<SystemDictionaryRow>(db, "SELECT * FROM system_dictionaries WHERE id = ?", id);
  return json({ item: mapSystemDictionary(row!) }, { status: 201 });
}

async function updateSystemDictionary(db: D1Database, id: string, body: JsonObject) {
  const existing = await first<SystemDictionaryRow>(db, "SELECT * FROM system_dictionaries WHERE id = ?", id);
  if (!existing) return json({ error: "字典項不存在" }, { status: 404 });

  const payload = dictionaryPayload(body);
  if ("error" in payload) return json({ error: payload.error }, { status: 400 });

  const duplicate = await first<{ id: string }>(
    db,
    "SELECT id FROM system_dictionaries WHERE category_code = ? AND item_code = ? AND id <> ?",
    payload.categoryCode,
    payload.itemCode,
    id
  );
  if (duplicate) return json({ error: "同一分類下字典編碼已存在" }, { status: 409 });

  await db.prepare(
    `UPDATE system_dictionaries
        SET category_code = ?,
            category_name_zh_hant = ?,
            item_code = ?,
            item_value = ?,
            label_zh_hant = ?,
            label_en = ?,
            label_ja = ?,
            sort_order = ?,
            status = ?,
            remarks = ?,
            updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`
  ).bind(
    payload.categoryCode,
    payload.categoryNameZhHant,
    payload.itemCode,
    payload.itemValue,
    payload.labelZhHant,
    payload.labelEn,
    payload.labelJa,
    payload.sortOrder,
    payload.status,
    payload.remarks,
    id
  ).run();

  const row = await first<SystemDictionaryRow>(db, "SELECT * FROM system_dictionaries WHERE id = ?", id);
  return json({ item: mapSystemDictionary(row!) });
}

async function deleteSystemDictionary(db: D1Database, id: string) {
  const existing = await first<SystemDictionaryRow>(db, "SELECT * FROM system_dictionaries WHERE id = ?", id);
  if (!existing) return json({ error: "字典項不存在" }, { status: 404 });
  if (existing.is_system === 1) return json({ error: "系統預置字典不可刪除，請改為停用" }, { status: 409 });
  await db.prepare("DELETE FROM system_dictionaries WHERE id = ?").bind(id).run();
  return json({ ok: true });
}

async function listFeeSettings(db: D1Database) {
  const rows = await all<FeeSettingRow>(
    db,
    "SELECT * FROM fee_settings ORDER BY category_code ASC, sort_order ASC, created_at ASC"
  );
  const categories = Array.from(new Map(rows.map((row) => [row.category_code, row.category_name])).entries())
    .map(([code, name]) => ({ code, name }));
  return json({ items: rows.map(mapFeeSetting), categories });
}

function feeSettingPayload(body: JsonObject) {
  const categoryCode = text(body, "categoryCode").toLowerCase();
  const categoryName = text(body, "categoryName");
  const feeCode = text(body, "feeCode").toLowerCase();
  const feeName = text(body, "feeName");
  const chargeMode = text(body, "chargeMode") === "percent" ? "percent" : "fixed";
  const amountHkd = Math.max(0, decimal(body, "amountHkd") ?? 0);
  const percentRate = Math.max(0, decimal(body, "percentRate") ?? 0);
  const currency = (text(body, "currency") || "HKD").toUpperCase();
  const status = text(body, "status") === "disabled" ? "disabled" : "active";
  if (!categoryCode || !/^[a-z0-9_-]{2,50}$/.test(categoryCode)) return { error: "請填寫有效費用分類編碼" };
  if (!categoryName) return { error: "請填寫費用分類名稱" };
  if (!feeCode || !/^[a-z0-9_-]{2,80}$/.test(feeCode)) return { error: "請填寫有效費用編碼" };
  if (!feeName) return { error: "請填寫費用名稱" };
  return {
    categoryCode,
    categoryName,
    feeCode,
    feeName,
    chargeMode,
    amountHkd,
    percentRate,
    currency,
    status,
    sortOrder: integer(body, "sortOrder") ?? 100,
    remarks: text(body, "remarks") || null
  };
}

async function createFeeSetting(db: D1Database, body: JsonObject) {
  const payload = feeSettingPayload(body);
  if ("error" in payload) return json({ error: payload.error }, { status: 400 });
  const duplicate = await first<{ id: string }>(db, "SELECT id FROM fee_settings WHERE fee_code = ?", payload.feeCode);
  if (duplicate) return json({ error: "費用編碼已存在" }, { status: 409 });
  const id = feeSettingId();
  await db.prepare(
    `INSERT INTO fee_settings (
       id, category_code, category_name, fee_code, fee_name, charge_mode,
       amount_hkd, percent_rate, currency, status, sort_order, remarks
     )
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    id,
    payload.categoryCode,
    payload.categoryName,
    payload.feeCode,
    payload.feeName,
    payload.chargeMode,
    payload.amountHkd,
    payload.percentRate,
    payload.currency,
    payload.status,
    payload.sortOrder,
    payload.remarks
  ).run();
  const row = await first<FeeSettingRow>(db, "SELECT * FROM fee_settings WHERE id = ?", id);
  return json({ item: mapFeeSetting(row!) }, { status: 201 });
}

async function updateFeeSetting(db: D1Database, id: string, body: JsonObject) {
  const existing = await first<FeeSettingRow>(db, "SELECT * FROM fee_settings WHERE id = ?", id);
  if (!existing) return json({ error: "費用配置不存在" }, { status: 404 });
  const payload = feeSettingPayload(body);
  if ("error" in payload) return json({ error: payload.error }, { status: 400 });
  const duplicate = await first<{ id: string }>(db, "SELECT id FROM fee_settings WHERE fee_code = ? AND id <> ?", payload.feeCode, id);
  if (duplicate) return json({ error: "費用編碼已存在" }, { status: 409 });
  await db.prepare(
    `UPDATE fee_settings
        SET category_code = ?,
            category_name = ?,
            fee_code = ?,
            fee_name = ?,
            charge_mode = ?,
            amount_hkd = ?,
            percent_rate = ?,
            currency = ?,
            status = ?,
            sort_order = ?,
            remarks = ?,
            updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`
  ).bind(
    payload.categoryCode,
    payload.categoryName,
    payload.feeCode,
    payload.feeName,
    payload.chargeMode,
    payload.amountHkd,
    payload.percentRate,
    payload.currency,
    payload.status,
    payload.sortOrder,
    payload.remarks,
    id
  ).run();
  const row = await first<FeeSettingRow>(db, "SELECT * FROM fee_settings WHERE id = ?", id);
  return json({ item: mapFeeSetting(row!) });
}

async function deleteFeeSetting(db: D1Database, id: string) {
  const existing = await first<FeeSettingRow>(db, "SELECT * FROM fee_settings WHERE id = ?", id);
  if (!existing) return json({ error: "費用配置不存在" }, { status: 404 });
  await db.prepare("DELETE FROM fee_settings WHERE id = ?").bind(id).run();
  return json({ ok: true });
}

async function listValueAddedRequests(db: D1Database, staffId?: string) {
  const scope = await staffWarehouseScope(db, staffId);
  const where = scope ? `WHERE value_added_requests.warehouse_id IN (${scope.map(() => "?").join(",")})` : "";
  const rows = await all<ValueAddedRequestRow>(
    db,
    `SELECT value_added_requests.*,
            warehouses.name as warehouse_name,
            members.email as member_email,
            members.user_code as member_user_code,
            inbound_packages.japanese_tracking_no as package_tracking_no,
            inbound_packages.item_name as package_item_name,
            inbound_packages.shelf_code as package_shelf_code
       FROM value_added_requests
       LEFT JOIN warehouses ON warehouses.id = value_added_requests.warehouse_id
       LEFT JOIN members ON members.id = value_added_requests.member_id
       LEFT JOIN inbound_packages ON inbound_packages.id = value_added_requests.package_id
      ${where}
      ORDER BY value_added_requests.updated_at DESC`,
    ...(scope ?? [])
  );
  const services = await all<FeeSettingRow>(
    db,
    "SELECT * FROM fee_settings WHERE category_code = 'value_added' AND status = 'active' ORDER BY sort_order ASC, fee_name ASC"
  );
  return json({ items: rows.map(mapValueAddedRequest), services: services.map(mapFeeSetting) });
}

async function createValueAddedRequests(db: D1Database, body: JsonObject, staffId?: string) {
  const packageId = text(body, "packageId");
  const serviceCodes = Array.from(new Set(stringArray(body, "serviceCodes")));
  const requestNote = text(body, "requestNote") || null;
  if (!packageId) return json({ error: "請選擇包裹" }, { status: 400 });
  if (serviceCodes.length === 0) return json({ error: "請至少選擇一項增值服務" }, { status: 400 });

  const packageRow = await first<InboundPackageRow>(db, "SELECT * FROM inbound_packages WHERE id = ?", packageId);
  if (!packageRow) return json({ error: "包裹不存在" }, { status: 404 });
  if (!(await ensureWarehouseAllowed(db, staffId, packageRow.warehouse_id))) return json({ error: "無權操作此倉庫包裹" }, { status: 403 });
  if (["outbounded", "destroyed"].includes(packageRow.status)) return json({ error: "此包裹狀態不可新增增值服務" }, { status: 409 });

  const placeholders = serviceCodes.map(() => "?").join(",");
  const services = await all<FeeSettingRow>(
    db,
    `SELECT * FROM fee_settings WHERE category_code = 'value_added' AND status = 'active' AND fee_code IN (${placeholders})`,
    ...serviceCodes
  );
  if (services.length !== serviceCodes.length) return json({ error: "部分增值服務不存在或已停用" }, { status: 400 });

  await db.batch(services.map((service) => db.prepare(
    `INSERT INTO value_added_requests (
       id, package_id, warehouse_id, member_id, service_code, service_name, amount_hkd, status, request_note
     ) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?)`
  ).bind(
    valueAddedRequestId(),
    packageId,
    packageRow.warehouse_id,
    packageRow.member_id,
    service.fee_code,
    service.fee_name,
    service.amount_hkd,
    requestNote
  )));
  await addAudit(db, "warehouse.value_added.create", packageId, "staff", { services: serviceCodes });
  return listValueAddedRequests(db, staffId);
}

async function updateValueAddedRequestStatus(db: D1Database, id: string, body: JsonObject, staffId?: string) {
  const status = text(body, "status");
  const processNote = text(body, "processNote") || null;
  if (!["pending", "processing", "completed", "cancelled"].includes(status)) return json({ error: "請選擇有效狀態" }, { status: 400 });
  const existing = await first<ValueAddedRequestRow>(db, "SELECT * FROM value_added_requests WHERE id = ?", id);
  if (!existing) return json({ error: "增值服務不存在" }, { status: 404 });
  if (!(await ensureWarehouseAllowed(db, staffId, existing.warehouse_id))) return json({ error: "無權操作此倉庫服務" }, { status: 403 });
  await db.prepare(
    `UPDATE value_added_requests
        SET status = ?,
            process_note = ?,
            completed_at = CASE WHEN ? = 'completed' THEN CURRENT_TIMESTAMP ELSE completed_at END,
            updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`
  ).bind(status, processNote, status, id).run();
  await addAudit(db, "warehouse.value_added.status", id, "staff", { status });
  const row = await first<ValueAddedRequestRow>(
    db,
    `SELECT value_added_requests.*,
            warehouses.name as warehouse_name,
            members.email as member_email,
            members.user_code as member_user_code,
            inbound_packages.japanese_tracking_no as package_tracking_no,
            inbound_packages.item_name as package_item_name,
            inbound_packages.shelf_code as package_shelf_code
       FROM value_added_requests
       LEFT JOIN warehouses ON warehouses.id = value_added_requests.warehouse_id
       LEFT JOIN members ON members.id = value_added_requests.member_id
       LEFT JOIN inbound_packages ON inbound_packages.id = value_added_requests.package_id
      WHERE value_added_requests.id = ?`,
    id
  );
  return json({ item: mapValueAddedRequest(row!) });
}

async function listConsolidationBatches(db: D1Database, staffId?: string) {
  const scope = await staffWarehouseScope(db, staffId);
  const where = scope ? `WHERE consolidation_batches.warehouse_id IN (${scope.map(() => "?").join(",")})` : "";
  const rows = await all<ConsolidationBatchRow>(
    db,
    `SELECT consolidation_batches.*,
            warehouses.name as warehouse_name,
            members.email as member_email,
            members.user_code as member_user_code,
            GROUP_CONCAT(inbound_packages.id) as package_ids
       FROM consolidation_batches
       LEFT JOIN warehouses ON warehouses.id = consolidation_batches.warehouse_id
       LEFT JOIN members ON members.id = consolidation_batches.member_id
       LEFT JOIN inbound_packages ON inbound_packages.consolidation_batch_no = consolidation_batches.batch_no
      ${where}
      GROUP BY consolidation_batches.id
      ORDER BY consolidation_batches.updated_at DESC`,
    ...(scope ?? [])
  );
  return json({ items: rows.map(mapConsolidationBatch) });
}

async function createConsolidationBatch(db: D1Database, body: JsonObject, staffId?: string) {
  const packageIds = Array.from(new Set(stringArray(body, "packageIds")));
  const cartonType = text(body, "cartonType") || null;
  const cartonFeeHkd = Math.max(0, decimal(body, "cartonFeeHkd") ?? 0);
  const remarks = text(body, "remarks") || null;
  if (packageIds.length < 1) return json({ error: "請至少選擇一個包裹" }, { status: 400 });
  if (packageIds.length > 100) return json({ error: "單次合箱最多選擇 100 個包裹" }, { status: 400 });

  const placeholders = packageIds.map(() => "?").join(",");
  const packages = await all<InboundPackageRow>(
    db,
    `SELECT * FROM inbound_packages WHERE id IN (${placeholders})`,
    ...packageIds
  );
  if (packages.length !== packageIds.length) return json({ error: "部分包裹不存在" }, { status: 404 });
  const warehouseId = packages[0].warehouse_id;
  const memberId = packages[0].member_id;
  if (!(await ensureWarehouseAllowed(db, staffId, warehouseId))) return json({ error: "無權操作此倉庫包裹" }, { status: 403 });
  if (packages.some((item) => item.warehouse_id !== warehouseId)) return json({ error: "合箱包裹必須在同一倉庫" }, { status: 409 });
  if (packages.some((item) => item.member_id !== memberId)) return json({ error: "合箱包裹必須屬於同一會員" }, { status: 409 });
  if (packages.some((item) => item.consolidation_batch_no)) return json({ error: "部分包裹已加入合箱批次" }, { status: 409 });
  if (packages.some((item) => !["shelved", "claimed", "inbounded"].includes(item.status))) return json({ error: "只有已入庫、已認領或已上架包裹可合箱" }, { status: 409 });

  const batchNo = consolidationBatchNo();
  const batchId = batchNo.toLowerCase();
  await db.batch([
    db.prepare(
      `INSERT INTO consolidation_batches (
         id, batch_no, warehouse_id, member_id, package_count, carton_type, carton_fee_hkd, status, remarks
       ) VALUES (?, ?, ?, ?, ?, ?, ?, 'created', ?)`
    ).bind(batchId, batchNo, warehouseId, memberId, packages.length, cartonType, cartonFeeHkd, remarks),
    ...packageIds.map((packageId) => db.prepare(
      "UPDATE inbound_packages SET consolidation_batch_no = ?, status = 'consolidated', updated_at = CURRENT_TIMESTAMP WHERE id = ?"
    ).bind(batchNo, packageId))
  ]);
  await addAudit(db, "warehouse.consolidation.create", batchNo, "staff", { packageIds });
  return listConsolidationBatches(db, staffId);
}

async function updateConsolidationPacking(db: D1Database, id: string, body: JsonObject, staffId?: string) {
  const existing = await first<ConsolidationBatchRow>(db, "SELECT * FROM consolidation_batches WHERE id = ? OR batch_no = ?", id, id);
  if (!existing) return json({ error: "合箱批次不存在" }, { status: 404 });
  if (!(await ensureWarehouseAllowed(db, staffId, existing.warehouse_id))) return json({ error: "無權操作此倉庫批次" }, { status: 403 });
  const weightKg = decimal(body, "weightKg");
  const lengthCm = decimal(body, "lengthCm");
  const widthCm = decimal(body, "widthCm");
  const heightCm = decimal(body, "heightCm");
  if (weightKg === null || weightKg <= 0) return json({ error: "請填寫有效重量" }, { status: 400 });
  await db.batch([
    db.prepare(
      `UPDATE consolidation_batches
          SET weight_kg = ?,
              length_cm = ?,
              width_cm = ?,
              height_cm = ?,
              shipping_fee_hkd = ?,
              logistics_product_name = ?,
              status = 'packed',
              packed_at = COALESCE(packed_at, CURRENT_TIMESTAMP),
              updated_at = CURRENT_TIMESTAMP
        WHERE id = ?`
    ).bind(
      weightKg,
      lengthCm,
      widthCm,
      heightCm,
      Math.max(0, decimal(body, "shippingFeeHkd") ?? 0),
      text(body, "logisticsProductName") || null,
      existing.id
    ),
    db.prepare("UPDATE inbound_packages SET status = 'packed', updated_at = CURRENT_TIMESTAMP WHERE consolidation_batch_no = ?").bind(existing.batch_no)
  ]);
  await addAudit(db, "warehouse.consolidation.pack", existing.batch_no, "staff", { weightKg });
  return listConsolidationBatches(db, staffId);
}

async function markConsolidationOutbound(db: D1Database, id: string, body: JsonObject, staffId?: string) {
  const existing = await first<ConsolidationBatchRow>(db, "SELECT * FROM consolidation_batches WHERE id = ? OR batch_no = ?", id, id);
  if (!existing) return json({ error: "合箱批次不存在" }, { status: 404 });
  if (!(await ensureWarehouseAllowed(db, staffId, existing.warehouse_id))) return json({ error: "無權操作此倉庫批次" }, { status: 403 });
  const trackingNo = text(body, "internationalTrackingNo");
  if (!trackingNo) return json({ error: "請填寫國際物流號" }, { status: 400 });
  await db.batch([
    db.prepare(
      `UPDATE consolidation_batches
          SET international_tracking_no = ?,
              status = 'outbounded',
              outbounded_at = CURRENT_TIMESTAMP,
              updated_at = CURRENT_TIMESTAMP
        WHERE id = ?`
    ).bind(trackingNo, existing.id),
    db.prepare(
      `UPDATE inbound_packages
          SET status = 'outbounded',
              international_tracking_no = ?,
              updated_at = CURRENT_TIMESTAMP
        WHERE consolidation_batch_no = ?`
    ).bind(trackingNo, existing.batch_no)
  ]);
  await addAudit(db, "warehouse.consolidation.outbound", existing.batch_no, "staff", { trackingNo });
  return listConsolidationBatches(db, staffId);
}

async function listLogisticsSuppliers(db: D1Database) {
  const rows = await all<LogisticsSupplierRow>(
    db,
    `SELECT logistics_suppliers.*,
            COALESCE(COUNT(channel_products.id), 0) AS channel_product_count
       FROM logistics_suppliers
       LEFT JOIN channel_products ON channel_products.supplier_id = logistics_suppliers.id
      GROUP BY logistics_suppliers.id
      ORDER BY logistics_suppliers.updated_at DESC`
  );
  return json({
    items: rows.map(mapLogisticsSupplier),
    countries: Object.entries(logisticsSupplierCountries).map(([code, name]) => ({ code, name })),
    currencies: logisticsSettlementCurrencies
  });
}

async function logisticsSupplierPayload(body: JsonObject, existing?: LogisticsSupplierRow) {
  const name = text(body, "name");
  const contactName = text(body, "contactName") || null;
  const contactPhone = text(body, "contactPhone") || null;
  const contactEmail = text(body, "contactEmail").toLowerCase() || null;
  const loginEmail = text(body, "loginEmail").toLowerCase() || null;
  const initialPassword = text(body, "initialPassword");
  const countryCode = text(body, "countryCode").toUpperCase();
  const city = text(body, "city") || null;
  const settlementCurrency = text(body, "settlementCurrency").toUpperCase();
  const status = text(body, "status") === "disabled" ? "disabled" : "active";
  const remarks = text(body, "remarks") || null;

  if (!name) return { error: "請填寫供應商名稱" };
  if (contactEmail && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(contactEmail)) return { error: "請填寫有效聯繫郵箱" };
  if (loginEmail && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(loginEmail)) return { error: "請填寫有效供應商登入郵箱" };
  if (loginEmail && !existing && !initialPassword) return { error: "新增登入帳號時請填寫初始密碼" };
  if (!logisticsSupplierCountries[countryCode]) return { error: "請選擇有效國家" };
  if (!logisticsSettlementCurrencies.includes(settlementCurrency)) return { error: "請選擇有效結算幣種" };

  return {
    name,
    supplierCode: existing?.supplier_code ?? "",
    contactName,
    contactPhone,
    contactEmail,
    loginEmail,
    passwordHash: initialPassword ? await passwordHash(initialPassword) : existing?.password_hash ?? null,
    countryCode,
    countryName: logisticsSupplierCountries[countryCode],
    city,
    settlementCurrency,
    status,
    remarks
  };
}

async function createLogisticsSupplier(db: D1Database, body: JsonObject) {
  const payload = await logisticsSupplierPayload(body);
  if ("error" in payload) return json({ error: payload.error }, { status: 400 });

  const supplierCode = await generateSupplierCode(db);
  if (payload.loginEmail) {
    const duplicateLogin = await first<{ id: string }>(db, "SELECT id FROM logistics_suppliers WHERE login_email = ?", payload.loginEmail);
    if (duplicateLogin) return json({ error: "供應商登入郵箱已存在" }, { status: 409 });
  }

  const id = logisticsSupplierId();
  await db.prepare(
    `INSERT INTO logistics_suppliers (
       id, supplier_code, name, contact_name, contact_phone, contact_email,
       login_email, password_hash, country_code, country_name, city,
       settlement_currency, status, remarks
     )
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    id,
    supplierCode,
    payload.name,
    payload.contactName,
    payload.contactPhone,
    payload.contactEmail,
    payload.loginEmail,
    payload.passwordHash,
    payload.countryCode,
    payload.countryName,
    payload.city,
    payload.settlementCurrency,
    payload.status,
    payload.remarks
  ).run();

  const row = await first<LogisticsSupplierRow>(db, "SELECT * FROM logistics_suppliers WHERE id = ?", id);
  return json({ item: mapLogisticsSupplier(row!) }, { status: 201 });
}

async function updateLogisticsSupplier(db: D1Database, id: string, body: JsonObject) {
  const existing = await first<LogisticsSupplierRow>(db, "SELECT * FROM logistics_suppliers WHERE id = ?", id);
  if (!existing) return json({ error: "供應商不存在" }, { status: 404 });

  const payload = await logisticsSupplierPayload(body, existing);
  if ("error" in payload) return json({ error: payload.error }, { status: 400 });

  if (payload.loginEmail) {
    const duplicateLogin = await first<{ id: string }>(db, "SELECT id FROM logistics_suppliers WHERE login_email = ? AND id <> ?", payload.loginEmail, id);
    if (duplicateLogin) return json({ error: "供應商登入郵箱已存在" }, { status: 409 });
  }

  await db.prepare(
    `UPDATE logistics_suppliers
        SET supplier_code = ?,
            name = ?,
            contact_name = ?,
            contact_phone = ?,
            contact_email = ?,
            login_email = ?,
            password_hash = ?,
            country_code = ?,
            country_name = ?,
            city = ?,
            settlement_currency = ?,
            status = ?,
            remarks = ?,
            updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`
  ).bind(
    payload.supplierCode,
    payload.name,
    payload.contactName,
    payload.contactPhone,
    payload.contactEmail,
    payload.loginEmail,
    payload.passwordHash,
    payload.countryCode,
    payload.countryName,
    payload.city,
    payload.settlementCurrency,
    payload.status,
    payload.remarks,
    id
  ).run();

  const row = await first<LogisticsSupplierRow>(db, "SELECT * FROM logistics_suppliers WHERE id = ?", id);
  return json({ item: mapLogisticsSupplier(row!) });
}

async function deleteLogisticsSupplier(db: D1Database, id: string) {
  const existing = await first<LogisticsSupplierRow>(db, "SELECT * FROM logistics_suppliers WHERE id = ?", id);
  if (!existing) return json({ error: "供應商不存在" }, { status: 404 });
  const productCount = await first<{ count: number }>(db, "SELECT COUNT(*) AS count FROM channel_products WHERE supplier_id = ?", id);
  if ((productCount?.count ?? 0) > 0) return json({ error: "該供應商已有渠道產品，請先刪除渠道產品" }, { status: 409 });
  await db.prepare("DELETE FROM logistics_suppliers WHERE id = ?").bind(id).run();
  return json({ ok: true });
}

async function listChannelProducts(db: D1Database) {
  const [rows, suppliers] = await Promise.all([
    all<ChannelProductRow>(db, "SELECT * FROM channel_products ORDER BY updated_at DESC"),
    all<LogisticsSupplierRow>(db, "SELECT * FROM logistics_suppliers ORDER BY updated_at DESC")
  ]);
  return json({
    items: rows.map(mapChannelProduct),
    suppliers: suppliers.map(mapLogisticsSupplier),
    countries: Object.entries(logisticsSupplierCountries).map(([code, name]) => ({ code, name }))
  });
}

async function channelProductPayload(db: D1Database, body: JsonObject, existing?: ChannelProductRow) {
  const supplierId = text(body, "supplierId") || existing?.supplier_id || "";
  const supplier = await first<LogisticsSupplierRow>(db, "SELECT * FROM logistics_suppliers WHERE id = ?", supplierId);
  if (!supplier) return { error: "請選擇有效供應商" };

  const name = text(body, "name");
  const carrierName = text(body, "carrierName") || null;
  const serviceName = text(body, "serviceName") || null;
  const originCountryCode = text(body, "originCountryCode").toUpperCase();
  const originCity = text(body, "originCity") || null;
  const destinationCountryCode = text(body, "destinationCountryCode").toUpperCase();
  const destinationCity = text(body, "destinationCity") || null;
  const transitTime = text(body, "transitTime") || null;
  const firstWeightKg = decimal(body, "firstWeightKg") ?? 1;
  const firstWeightPrice = decimal(body, "firstWeightPrice") ?? 0;
  const additionalWeightUnitKg = decimal(body, "additionalWeightUnitKg") ?? 0.5;
  const additionalWeightPrice = decimal(body, "additionalWeightPrice") ?? 0;
  const maxWeightKg = decimal(body, "maxWeightKg");
  const status = text(body, "status") === "disabled" ? "disabled" : "active";
  const remarks = text(body, "remarks") || null;

  if (!name) return { error: "請填寫渠道產品名稱" };
  if (!logisticsSupplierCountries[originCountryCode]) return { error: "請選擇有效起始國家" };
  if (!logisticsSupplierCountries[destinationCountryCode]) return { error: "請選擇有效目的國家" };
  if (firstWeightKg <= 0) return { error: "成本首重 kg 必須大於 0" };
  if (firstWeightPrice < 0) return { error: "成本首重價不可小於 0" };
  if (additionalWeightUnitKg <= 0) return { error: "成本續重單位 kg 必須大於 0" };
  if (additionalWeightPrice < 0) return { error: "成本續重價不可小於 0" };
  if (maxWeightKg !== null && maxWeightKg <= 0) return { error: "最大重量 kg 必須大於 0" };

  return {
    supplierId: supplier.id,
    supplierCode: supplier.supplier_code,
    supplierName: supplier.name,
    name,
    carrierName,
    serviceName,
    originCountryCode,
    originCountryName: logisticsSupplierCountries[originCountryCode],
    originCity,
    destinationCountryCode,
    destinationCountryName: logisticsSupplierCountries[destinationCountryCode],
    destinationCity,
    transitTime,
    costCurrency: supplier.settlement_currency,
    firstWeightKg,
    firstWeightPrice,
    additionalWeightUnitKg,
    additionalWeightPrice,
    maxWeightKg,
    status,
    remarks
  };
}

async function createChannelProduct(db: D1Database, body: JsonObject) {
  const payload = await channelProductPayload(db, body);
  if ("error" in payload) return json({ error: payload.error }, { status: 400 });

  const id = channelProductId();
  const code = await generateChannelProductCode(db);
  await db.prepare(
    `INSERT INTO channel_products (
       id, channel_product_code, supplier_id, supplier_code, supplier_name, name,
       carrier_name, service_name, origin_country_code, origin_country_name,
       origin_city, destination_country_code, destination_country_name, destination_city,
       transit_time, cost_currency, first_weight_kg, first_weight_price,
       additional_weight_unit_kg, additional_weight_price, max_weight_kg, status, remarks
     )
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    id,
    code,
    payload.supplierId,
    payload.supplierCode,
    payload.supplierName,
    payload.name,
    payload.carrierName,
    payload.serviceName,
    payload.originCountryCode,
    payload.originCountryName,
    payload.originCity,
    payload.destinationCountryCode,
    payload.destinationCountryName,
    payload.destinationCity,
    payload.transitTime,
    payload.costCurrency,
    payload.firstWeightKg,
    payload.firstWeightPrice,
    payload.additionalWeightUnitKg,
    payload.additionalWeightPrice,
    payload.maxWeightKg,
    payload.status,
    payload.remarks
  ).run();

  const row = await first<ChannelProductRow>(db, "SELECT * FROM channel_products WHERE id = ?", id);
  return json({ item: mapChannelProduct(row!) }, { status: 201 });
}

async function updateChannelProduct(db: D1Database, id: string, body: JsonObject) {
  const existing = await first<ChannelProductRow>(db, "SELECT * FROM channel_products WHERE id = ?", id);
  if (!existing) return json({ error: "渠道產品不存在" }, { status: 404 });

  const payload = await channelProductPayload(db, body, existing);
  if ("error" in payload) return json({ error: payload.error }, { status: 400 });

  await db.prepare(
    `UPDATE channel_products
        SET supplier_id = ?,
            supplier_code = ?,
            supplier_name = ?,
            name = ?,
            carrier_name = ?,
            service_name = ?,
            origin_country_code = ?,
            origin_country_name = ?,
            origin_city = ?,
            destination_country_code = ?,
            destination_country_name = ?,
            destination_city = ?,
            transit_time = ?,
            cost_currency = ?,
            first_weight_kg = ?,
            first_weight_price = ?,
            additional_weight_unit_kg = ?,
            additional_weight_price = ?,
            max_weight_kg = ?,
            status = ?,
            remarks = ?,
            updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`
  ).bind(
    payload.supplierId,
    payload.supplierCode,
    payload.supplierName,
    payload.name,
    payload.carrierName,
    payload.serviceName,
    payload.originCountryCode,
    payload.originCountryName,
    payload.originCity,
    payload.destinationCountryCode,
    payload.destinationCountryName,
    payload.destinationCity,
    payload.transitTime,
    payload.costCurrency,
    payload.firstWeightKg,
    payload.firstWeightPrice,
    payload.additionalWeightUnitKg,
    payload.additionalWeightPrice,
    payload.maxWeightKg,
    payload.status,
    payload.remarks,
    id
  ).run();

  const row = await first<ChannelProductRow>(db, "SELECT * FROM channel_products WHERE id = ?", id);
  return json({ item: mapChannelProduct(row!) });
}

async function deleteChannelProduct(db: D1Database, id: string) {
  const existing = await first<ChannelProductRow>(db, "SELECT * FROM channel_products WHERE id = ?", id);
  if (!existing) return json({ error: "渠道產品不存在" }, { status: 404 });
  const productCount = await first<{ count: number }>(db, "SELECT COUNT(*) AS count FROM logistics_products WHERE channel_product_id = ?", id);
  if ((productCount?.count ?? 0) > 0) return json({ error: "該渠道產品已綁定物流產品，請先解除綁定" }, { status: 409 });
  await db.prepare("DELETE FROM channel_products WHERE id = ?").bind(id).run();
  return json({ ok: true });
}

async function listLogisticsProducts(db: D1Database) {
  const [rows, channels] = await Promise.all([
    all<LogisticsProductRow>(db, "SELECT * FROM logistics_products ORDER BY updated_at DESC"),
    all<ChannelProductRow>(db, "SELECT * FROM channel_products ORDER BY updated_at DESC")
  ]);
  return json({
    items: rows.map(mapLogisticsProduct),
    channelProducts: channels.map(mapChannelProduct),
    countries: Object.entries(logisticsSupplierCountries).map(([code, name]) => ({ code, name })),
    attributes: logisticsProductAttributes
  });
}

function logisticsProductArray(input: JsonObject, key: string) {
  const allowed = new Set(logisticsProductAttributes.map((item) => item.code));
  return stringArray(input, key).filter((item) => allowed.has(item));
}

async function logisticsProductPayload(db: D1Database, body: JsonObject) {
  const productName = text(body, "productName");
  const channelProductId = text(body, "channelProductId") || null;
  let channel: ChannelProductRow | null = null;
  if (channelProductId) {
    channel = await first<ChannelProductRow>(db, "SELECT * FROM channel_products WHERE id = ?", channelProductId);
    if (!channel) return { error: "請選擇有效渠道產品" };
  }

  const originCountryCode = text(body, "originCountryCode").toUpperCase();
  const destinationCountryCode = text(body, "destinationCountryCode").toUpperCase();
  const chargeWeightMode = text(body, "chargeWeightMode") || "max_actual_volume";
  const pricingMode = text(body, "pricingMode") || "first_additional";
  const minWeight = decimal(body, "minWeight") ?? 0.5;
  const maxWeight = decimal(body, "maxWeight") ?? 30;
  const volumeDivisor = decimal(body, "volumeDivisor") ?? 5000;
  const roundingUnit = decimal(body, "roundingUnit") ?? 0.5;
  const densityThreshold = decimal(body, "densityThreshold") ?? 120;
  const densityLowMode = text(body, "densityLowMode") || "volume";
  const densityHighMode = text(body, "densityHighMode") || "actual";
  const firstWeight = decimal(body, "firstWeight") ?? 1;
  const firstPrice = decimal(body, "firstPrice") ?? 0;
  const additionalWeight = decimal(body, "additionalWeight") ?? 0.5;
  const additionalPrice = decimal(body, "additionalPrice") ?? 0;
  const handlingFee = decimal(body, "handlingFee") ?? 0;
  const fuelSurchargeRate = decimal(body, "fuelSurchargeRate") ?? 0;
  const cargoSurchargeRate = decimal(body, "cargoSurchargeRate") ?? 0;
  const priceTiers = text(body, "priceTiers") || null;
  const attributeSurcharges = text(body, "attributeSurcharges") || null;
  const supportCategories = logisticsProductArray(body, "supportCategories");
  const forbiddenCategories = logisticsProductArray(body, "forbiddenCategories");
  const status = text(body, "status") === "disabled" ? "disabled" : "active";

  if (!productName) return { error: "請填寫物流產品名稱" };
  if (!logisticsSupplierCountries[originCountryCode]) return { error: "請選擇有效起始國家" };
  if (!logisticsSupplierCountries[destinationCountryCode]) return { error: "請選擇有效目的國家" };
  if (!chargeWeightModes.includes(chargeWeightMode)) return { error: "請選擇有效計費重量模式" };
  if (!pricingModes.includes(pricingMode)) return { error: "請選擇有效價格模式" };
  if (minWeight <= 0 || maxWeight <= 0 || maxWeight < minWeight) return { error: "請填寫有效重量範圍" };
  if (volumeDivisor <= 0 || roundingUnit <= 0 || densityThreshold <= 0) return { error: "請填寫有效計費重量參數" };
  if (!["actual", "volume"].includes(densityLowMode) || !["actual", "volume"].includes(densityHighMode)) return { error: "請選擇有效密度計費模式" };
  if (firstWeight <= 0 || additionalWeight <= 0) return { error: "首重與續重單位必須大於 0" };
  if (firstPrice < 0 || additionalPrice < 0 || handlingFee < 0 || fuelSurchargeRate < 0 || cargoSurchargeRate < 0) return { error: "價格與附加費不可小於 0" };

  for (const [label, value] of [["階梯價格設定", priceTiers], ["屬性附加費設定", attributeSurcharges]] as const) {
    if (value) {
      try {
        JSON.parse(value);
      } catch {
        return { error: `${label} 格式不正確` };
      }
    }
  }

  return {
    productName,
    channelProductId: channel?.id ?? null,
    channelProductCode: channel?.channel_product_code ?? null,
    channelProductName: channel?.name ?? null,
    routeName: text(body, "routeName") || null,
    originCountryCode,
    originCountryName: logisticsSupplierCountries[originCountryCode],
    originCity: text(body, "originCity") || null,
    destinationCountryCode,
    destinationCountryName: logisticsSupplierCountries[destinationCountryCode],
    destinationCity: text(body, "destinationCity") || null,
    estimatedDays: text(body, "estimatedDays") || null,
    supportCategories: JSON.stringify(supportCategories),
    forbiddenCategories: JSON.stringify(forbiddenCategories),
    chargeWeightMode,
    pricingMode,
    minWeight,
    maxWeight,
    volumeDivisor,
    roundingUnit,
    densityThreshold,
    densityLowMode,
    densityHighMode,
    firstWeight,
    firstPrice,
    additionalWeight,
    additionalPrice,
    priceTiers,
    attributeSurcharges,
    handlingFee,
    fuelSurchargeRate,
    cargoSurchargeRate,
    isTaxIncluded: booleanValue(body, "isTaxIncluded") ? 1 : 0,
    needIdentity: booleanValue(body, "needIdentity") ? 1 : 0,
    supportTracking: booleanValue(body, "supportTracking") ? 1 : 0,
    status,
    remarks: text(body, "remarks") || null
  };
}

async function createLogisticsProduct(db: D1Database, body: JsonObject) {
  const payload = await logisticsProductPayload(db, body);
  if ("error" in payload) return json({ error: payload.error }, { status: 400 });

  const id = logisticsProductId();
  const productCode = await generateLogisticsProductCode(db);
  await db.prepare(
    `INSERT INTO logistics_products (
       id, product_code, product_name, channel_product_id, channel_product_code, channel_product_name,
       route_name, origin_country_code, origin_country_name, origin_city,
       destination_country_code, destination_country_name, destination_city, estimated_days,
       support_categories, forbidden_categories, charge_weight_mode, pricing_mode,
       min_weight, max_weight, volume_divisor, rounding_unit, density_threshold,
       density_low_mode, density_high_mode, first_weight, first_price, additional_weight,
       additional_price, price_tiers, attribute_surcharges, handling_fee, fuel_surcharge_rate,
       cargo_surcharge_rate, is_tax_included, need_identity, support_tracking, status, remarks
     )
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    id, productCode, payload.productName, payload.channelProductId, payload.channelProductCode,
    payload.channelProductName, payload.routeName, payload.originCountryCode, payload.originCountryName,
    payload.originCity, payload.destinationCountryCode, payload.destinationCountryName, payload.destinationCity,
    payload.estimatedDays, payload.supportCategories, payload.forbiddenCategories, payload.chargeWeightMode,
    payload.pricingMode, payload.minWeight, payload.maxWeight, payload.volumeDivisor, payload.roundingUnit,
    payload.densityThreshold, payload.densityLowMode, payload.densityHighMode, payload.firstWeight,
    payload.firstPrice, payload.additionalWeight, payload.additionalPrice, payload.priceTiers,
    payload.attributeSurcharges, payload.handlingFee, payload.fuelSurchargeRate, payload.cargoSurchargeRate,
    payload.isTaxIncluded, payload.needIdentity, payload.supportTracking, payload.status, payload.remarks
  ).run();

  const row = await first<LogisticsProductRow>(db, "SELECT * FROM logistics_products WHERE id = ?", id);
  return json({ item: mapLogisticsProduct(row!) }, { status: 201 });
}

async function updateLogisticsProduct(db: D1Database, id: string, body: JsonObject) {
  const existing = await first<LogisticsProductRow>(db, "SELECT * FROM logistics_products WHERE id = ?", id);
  if (!existing) return json({ error: "物流產品不存在" }, { status: 404 });
  const payload = await logisticsProductPayload(db, body);
  if ("error" in payload) return json({ error: payload.error }, { status: 400 });

  await db.prepare(
    `UPDATE logistics_products
        SET product_name = ?, channel_product_id = ?, channel_product_code = ?, channel_product_name = ?,
            route_name = ?, origin_country_code = ?, origin_country_name = ?, origin_city = ?,
            destination_country_code = ?, destination_country_name = ?, destination_city = ?, estimated_days = ?,
            support_categories = ?, forbidden_categories = ?, charge_weight_mode = ?, pricing_mode = ?,
            min_weight = ?, max_weight = ?, volume_divisor = ?, rounding_unit = ?, density_threshold = ?,
            density_low_mode = ?, density_high_mode = ?, first_weight = ?, first_price = ?,
            additional_weight = ?, additional_price = ?, price_tiers = ?, attribute_surcharges = ?,
            handling_fee = ?, fuel_surcharge_rate = ?, cargo_surcharge_rate = ?, is_tax_included = ?,
            need_identity = ?, support_tracking = ?, status = ?, remarks = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`
  ).bind(
    payload.productName, payload.channelProductId, payload.channelProductCode, payload.channelProductName,
    payload.routeName, payload.originCountryCode, payload.originCountryName, payload.originCity,
    payload.destinationCountryCode, payload.destinationCountryName, payload.destinationCity, payload.estimatedDays,
    payload.supportCategories, payload.forbiddenCategories, payload.chargeWeightMode, payload.pricingMode,
    payload.minWeight, payload.maxWeight, payload.volumeDivisor, payload.roundingUnit, payload.densityThreshold,
    payload.densityLowMode, payload.densityHighMode, payload.firstWeight, payload.firstPrice,
    payload.additionalWeight, payload.additionalPrice, payload.priceTiers, payload.attributeSurcharges,
    payload.handlingFee, payload.fuelSurchargeRate, payload.cargoSurchargeRate, payload.isTaxIncluded,
    payload.needIdentity, payload.supportTracking, payload.status, payload.remarks, id
  ).run();

  const row = await first<LogisticsProductRow>(db, "SELECT * FROM logistics_products WHERE id = ?", id);
  return json({ item: mapLogisticsProduct(row!) });
}

async function deleteLogisticsProduct(db: D1Database, id: string) {
  const existing = await first<LogisticsProductRow>(db, "SELECT * FROM logistics_products WHERE id = ?", id);
  if (!existing) return json({ error: "物流產品不存在" }, { status: 404 });
  const restrictionCount = await first<{ count: number }>(db, "SELECT COUNT(*) AS count FROM shipping_restrictions WHERE logistics_product_id = ?", id);
  if ((restrictionCount?.count ?? 0) > 0) return json({ error: "該物流產品已被禁運限制規則使用，請先解除規則" }, { status: 409 });
  await db.prepare("DELETE FROM logistics_products WHERE id = ?").bind(id).run();
  return json({ ok: true });
}

async function listShippingRestrictions(db: D1Database) {
  const [rows, products] = await Promise.all([
    all<ShippingRestrictionRow>(db, "SELECT * FROM shipping_restrictions ORDER BY updated_at DESC"),
    all<LogisticsProductRow>(db, "SELECT * FROM logistics_products ORDER BY updated_at DESC")
  ]);
  return json({
    items: rows.map(mapShippingRestriction),
    logisticsProducts: products.map(mapLogisticsProduct),
    countries: Object.entries(logisticsSupplierCountries).map(([code, name]) => ({ code, name })),
    attributes: logisticsProductAttributes
  });
}

async function shippingRestrictionPayload(db: D1Database, body: JsonObject) {
  const ruleName = text(body, "ruleName");
  const scopeType = text(body, "scopeType") || "global";
  const restrictionType = text(body, "restrictionType") || "prohibited";
  const destinationCountryCode = text(body, "destinationCountryCode").toUpperCase() || null;
  const logisticsProductId = text(body, "logisticsProductId") || null;
  let destinationCountryName: string | null = null;
  let logisticsProduct: LogisticsProductRow | null = null;

  if (!ruleName) return { error: "請填寫規則名稱" };
  if (!shippingRestrictionScopes.includes(scopeType)) return { error: "請選擇有效適用範圍" };
  if (!shippingRestrictionTypes.includes(restrictionType)) return { error: "請選擇有效限制類型" };

  if (scopeType === "country") {
    if (!destinationCountryCode || !logisticsSupplierCountries[destinationCountryCode]) return { error: "請選擇有效目的國家" };
    destinationCountryName = logisticsSupplierCountries[destinationCountryCode];
  }

  if (scopeType === "logistics_product") {
    if (!logisticsProductId) return { error: "請選擇物流產品" };
    logisticsProduct = await first<LogisticsProductRow>(db, "SELECT * FROM logistics_products WHERE id = ?", logisticsProductId);
    if (!logisticsProduct) return { error: "物流產品不存在" };
  }

  const cargoCategories = logisticsProductArray(body, "cargoCategories");
  const maxWeightKg = decimal(body, "maxWeightKg");
  const maxLengthCm = decimal(body, "maxLengthCm");
  const maxWidthCm = decimal(body, "maxWidthCm");
  const maxHeightCm = decimal(body, "maxHeightCm");
  if (restrictionType === "max_weight" && (maxWeightKg === null || maxWeightKg <= 0)) return { error: "請填寫有效最大重量" };
  if (restrictionType === "max_dimensions" && [maxLengthCm, maxWidthCm, maxHeightCm].every((value) => value === null || value <= 0)) return { error: "請至少填寫一項有效尺寸限制" };

  return {
    ruleName,
    scopeType,
    destinationCountryCode: scopeType === "country" ? destinationCountryCode : null,
    destinationCountryName,
    logisticsProductId: logisticsProduct?.id ?? null,
    logisticsProductCode: logisticsProduct?.product_code ?? null,
    logisticsProductName: logisticsProduct?.product_name ?? null,
    cargoCategories: JSON.stringify(cargoCategories),
    keywords: text(body, "keywords") || null,
    restrictionType,
    maxWeightKg,
    maxLengthCm,
    maxWidthCm,
    maxHeightCm,
    customerMessage: text(body, "customerMessage") || null,
    internalNote: text(body, "internalNote") || null,
    status: text(body, "status") === "disabled" ? "disabled" : "active"
  };
}

async function createShippingRestriction(db: D1Database, body: JsonObject) {
  const payload = await shippingRestrictionPayload(db, body);
  if ("error" in payload) return json({ error: payload.error }, { status: 400 });

  const id = shippingRestrictionId();
  await db.prepare(
    `INSERT INTO shipping_restrictions (
       id, rule_name, scope_type, destination_country_code, destination_country_name,
       logistics_product_id, logistics_product_code, logistics_product_name,
       cargo_categories, keywords, restriction_type, max_weight_kg, max_length_cm,
       max_width_cm, max_height_cm, customer_message, internal_note, status
     )
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    id,
    payload.ruleName,
    payload.scopeType,
    payload.destinationCountryCode,
    payload.destinationCountryName,
    payload.logisticsProductId,
    payload.logisticsProductCode,
    payload.logisticsProductName,
    payload.cargoCategories,
    payload.keywords,
    payload.restrictionType,
    payload.maxWeightKg,
    payload.maxLengthCm,
    payload.maxWidthCm,
    payload.maxHeightCm,
    payload.customerMessage,
    payload.internalNote,
    payload.status
  ).run();

  const row = await first<ShippingRestrictionRow>(db, "SELECT * FROM shipping_restrictions WHERE id = ?", id);
  return json({ item: mapShippingRestriction(row!) }, { status: 201 });
}

async function updateShippingRestriction(db: D1Database, id: string, body: JsonObject) {
  const existing = await first<ShippingRestrictionRow>(db, "SELECT * FROM shipping_restrictions WHERE id = ?", id);
  if (!existing) return json({ error: "禁運限制規則不存在" }, { status: 404 });
  const payload = await shippingRestrictionPayload(db, body);
  if ("error" in payload) return json({ error: payload.error }, { status: 400 });

  await db.prepare(
    `UPDATE shipping_restrictions
        SET rule_name = ?,
            scope_type = ?,
            destination_country_code = ?,
            destination_country_name = ?,
            logistics_product_id = ?,
            logistics_product_code = ?,
            logistics_product_name = ?,
            cargo_categories = ?,
            keywords = ?,
            restriction_type = ?,
            max_weight_kg = ?,
            max_length_cm = ?,
            max_width_cm = ?,
            max_height_cm = ?,
            customer_message = ?,
            internal_note = ?,
            status = ?,
            updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`
  ).bind(
    payload.ruleName,
    payload.scopeType,
    payload.destinationCountryCode,
    payload.destinationCountryName,
    payload.logisticsProductId,
    payload.logisticsProductCode,
    payload.logisticsProductName,
    payload.cargoCategories,
    payload.keywords,
    payload.restrictionType,
    payload.maxWeightKg,
    payload.maxLengthCm,
    payload.maxWidthCm,
    payload.maxHeightCm,
    payload.customerMessage,
    payload.internalNote,
    payload.status,
    id
  ).run();

  const row = await first<ShippingRestrictionRow>(db, "SELECT * FROM shipping_restrictions WHERE id = ?", id);
  return json({ item: mapShippingRestriction(row!) });
}

async function deleteShippingRestriction(db: D1Database, id: string) {
  const existing = await first<ShippingRestrictionRow>(db, "SELECT * FROM shipping_restrictions WHERE id = ?", id);
  if (!existing) return json({ error: "禁運限制規則不存在" }, { status: 404 });
  await db.prepare("DELETE FROM shipping_restrictions WHERE id = ?").bind(id).run();
  return json({ ok: true });
}

function calculateChargeableWeight(row: LogisticsProductRow, actualWeight: number, length: number, width: number, height: number) {
  const volumeWeight = length > 0 && width > 0 && height > 0 ? (length * width * height) / row.volume_divisor : 0;
  const volumeM3 = length > 0 && width > 0 && height > 0 ? (length * width * height) / 1000000 : 0;
  const density = volumeM3 > 0 ? actualWeight / volumeM3 : null;
  let raw = actualWeight;
  if (row.charge_weight_mode === "volume") raw = volumeWeight;
  if (row.charge_weight_mode === "max_actual_volume") raw = Math.max(actualWeight, volumeWeight);
  if (row.charge_weight_mode === "density") {
    const mode = density !== null && density < row.density_threshold ? row.density_low_mode : row.density_high_mode;
    raw = mode === "volume" ? volumeWeight : actualWeight;
  }
  const withMinimum = Math.max(raw, row.min_weight);
  const rounded = Math.ceil(withMinimum / row.rounding_unit) * row.rounding_unit;
  return {
    actualWeight,
    volumeWeight: Number(volumeWeight.toFixed(3)),
    density: density === null ? null : Number(density.toFixed(3)),
    chargeableWeight: Number(rounded.toFixed(3))
  };
}

function calculateBaseFreight(row: LogisticsProductRow, chargeableWeight: number) {
  if (row.pricing_mode === "first_additional") {
    if (chargeableWeight <= row.first_weight) return row.first_price;
    const extraUnits = Math.ceil((chargeableWeight - row.first_weight) / row.additional_weight);
    return row.first_price + extraUnits * row.additional_price;
  }

  const tiers = parsePriceTiers(row.price_tiers);
  if (!tiers.length) return null;

  if (row.pricing_mode === "tier_unit") {
    const tier = tiers.find((item) => chargeableWeight > item.from && (item.to === null || chargeableWeight <= item.to));
    if (!tier || !tier.unit_weight || tier.unit_weight <= 0 || tier.unit_price === null) return null;
    return Math.ceil(chargeableWeight / tier.unit_weight) * tier.unit_price;
  }

  if (row.pricing_mode === "multi_additional") {
    let total = row.first_price;
    let cursor = row.first_weight;
    if (chargeableWeight <= cursor) return total;
    for (const tier of tiers.sort((a, b) => a.from - b.from)) {
      const tierStart = Math.max(cursor, tier.from);
      const tierEnd = tier.to === null ? chargeableWeight : Math.min(chargeableWeight, tier.to);
      if (tierEnd <= tierStart) continue;
      if (!tier.unit_weight || tier.unit_weight <= 0 || tier.unit_price === null) return null;
      total += Math.ceil((tierEnd - tierStart) / tier.unit_weight) * tier.unit_price;
      cursor = Math.max(cursor, tierEnd);
      if (cursor >= chargeableWeight) break;
    }
    return cursor >= chargeableWeight ? total : null;
  }

  if (row.pricing_mode === "tier_first_additional") {
    const tier = tiers.find((item) => chargeableWeight > item.from && (item.to === null || chargeableWeight <= item.to));
    if (!tier || !tier.first_weight || tier.first_price === null || !tier.additional_weight || tier.additional_price === null) return null;
    if (chargeableWeight <= tier.first_weight) return tier.first_price;
    return tier.first_price + Math.ceil((chargeableWeight - tier.first_weight) / tier.additional_weight) * tier.additional_price;
  }

  return null;
}

function parsePriceTiers(value: string | null) {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item) => ({
      from: Number(item?.from ?? 0),
      to: item?.to === null || item?.to === undefined || item?.to === "" ? null : Number(item.to),
      unit_weight: item?.unit_weight === undefined ? null : Number(item.unit_weight),
      unit_price: item?.unit_price === undefined ? null : Number(item.unit_price),
      first_weight: item?.first_weight === undefined ? null : Number(item.first_weight),
      first_price: item?.first_price === undefined ? null : Number(item.first_price),
      additional_weight: item?.additional_weight === undefined ? null : Number(item.additional_weight),
      additional_price: item?.additional_price === undefined ? null : Number(item.additional_price)
    })).filter((item) => Number.isFinite(item.from) && (item.to === null || Number.isFinite(item.to)));
  } catch {
    return [];
  }
}

function calculateAttributeSurcharge(row: LogisticsProductRow, cargoType: string, baseFreight: number) {
  if (!row.attribute_surcharges) return 0;
  try {
    const rules = JSON.parse(row.attribute_surcharges);
    if (!Array.isArray(rules)) return 0;
    return rules.reduce((sum, rule) => {
      if (!rule || rule.attribute !== cargoType) return sum;
      const value = Number(rule.value);
      if (!Number.isFinite(value) || value < 0) return sum;
      return sum + (rule.type === "rate" ? baseFreight * value : value);
    }, 0);
  } catch {
    return 0;
  }
}

function matchedRestriction(
  rule: ShippingRestrictionRow,
  product: LogisticsProductRow,
  destinationCountryCode: string,
  cargoType: string,
  weightDetail: { chargeableWeight: number },
  dimensions: { length: number; width: number; height: number },
  keywordText = ""
) {
  if (rule.status !== "active") return null;
  if (rule.scope_type === "country" && rule.destination_country_code !== destinationCountryCode) return null;
  if (rule.scope_type === "logistics_product" && rule.logistics_product_id !== product.id) return null;
  const categories = parseJsonArray(rule.cargo_categories);
  if (categories.length && !categories.includes(cargoType)) return null;
  const keywords = (rule.keywords ?? "")
    .split(/[,\n，、;；|]/)
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
  if (keywords.length && !keywords.some((keyword) => keywordText.toLowerCase().includes(keyword))) return null;

  if (rule.restriction_type === "max_weight") {
    if (rule.max_weight_kg === null || weightDetail.chargeableWeight <= rule.max_weight_kg) return null;
  }

  if (rule.restriction_type === "max_dimensions") {
    const overLength = rule.max_length_cm !== null && dimensions.length > rule.max_length_cm;
    const overWidth = rule.max_width_cm !== null && dimensions.width > rule.max_width_cm;
    const overHeight = rule.max_height_cm !== null && dimensions.height > rule.max_height_cm;
    if (!overLength && !overWidth && !overHeight) return null;
  }

  return {
    id: rule.id,
    ruleName: rule.rule_name,
    restrictionType: rule.restriction_type,
    message: rule.customer_message || rule.rule_name
  };
}

async function calculateShipping(db: D1Database, body: JsonObject) {
  const originCountryCode = text(body, "originCountryCode").toUpperCase();
  const destinationCountryCode = text(body, "destinationCountryCode").toUpperCase();
  const cargoType = text(body, "cargoType") || "normal";
  const weight = decimal(body, "weight") ?? 0;
  const length = decimal(body, "length") ?? 0;
  const width = decimal(body, "width") ?? 0;
  const height = decimal(body, "height") ?? 0;
  const remoteAreaFee = decimal(body, "remoteAreaFee") ?? 0;

  if (!logisticsSupplierCountries[originCountryCode]) return json({ error: "請選擇有效起始國家" }, { status: 400 });
  if (!logisticsSupplierCountries[destinationCountryCode]) return json({ error: "請選擇有效目的國家" }, { status: 400 });
  if (!logisticsProductAttributes.some((item) => item.code === cargoType)) return json({ error: "請選擇有效貨物屬性" }, { status: 400 });
  if (weight <= 0) return json({ error: "請輸入有效重量" }, { status: 400 });

  const [rows, restrictions] = await Promise.all([
    all<LogisticsProductRow>(db, "SELECT * FROM logistics_products WHERE status = 'active' ORDER BY product_name ASC"),
    all<ShippingRestrictionRow>(db, "SELECT * FROM shipping_restrictions WHERE status = 'active' ORDER BY updated_at DESC")
  ]);
  const available = [];
  const unavailable = [];

  for (const row of rows) {
    const reasons: string[] = [];
    if (row.origin_country_code !== originCountryCode) reasons.push("起始國家不匹配");
    if (row.destination_country_code !== destinationCountryCode) reasons.push("目的國家不匹配");
    const supportCategories = parseJsonArray(row.support_categories);
    const forbiddenCategories = parseJsonArray(row.forbidden_categories);
    if (forbiddenCategories.includes(cargoType)) reasons.push("該產品禁運此貨物屬性");
    if (supportCategories.length && !supportCategories.includes(cargoType)) reasons.push("該產品不支持此貨物屬性");

    const weightDetail = calculateChargeableWeight(row, weight, length, width, height);
    if (weightDetail.chargeableWeight > row.max_weight) reasons.push("超過最大計費重量");
    const matchedRestrictions = restrictions
      .map((rule) => matchedRestriction(rule, row, destinationCountryCode, cargoType, weightDetail, { length, width, height }, text(body, "keywordText")))
      .filter((rule): rule is { id: string; ruleName: string; restrictionType: string; message: string } => Boolean(rule));
    const blockingRestrictions = matchedRestrictions.filter((rule) => ["prohibited", "max_weight", "max_dimensions"].includes(rule.restrictionType));
    const warningRestrictions = matchedRestrictions.filter((rule) => ["review_required", "identity_required"].includes(rule.restrictionType));
    if (blockingRestrictions.length) reasons.push(...blockingRestrictions.map((rule) => rule.message));
    const baseFreight = calculateBaseFreight(row, weightDetail.chargeableWeight);
    if (baseFreight === null) reasons.push("暫不支持此價格模式試算");

    if (reasons.length || baseFreight === null) {
      unavailable.push({ productName: row.product_name, productCode: row.product_code, reason: reasons.join("；") || "不可用" });
      continue;
    }

    const fuelSurcharge = baseFreight * row.fuel_surcharge_rate;
    const cargoSurcharge = baseFreight * row.cargo_surcharge_rate;
    const attributeSurcharge = calculateAttributeSurcharge(row, cargoType, baseFreight);
    const freightTotal = baseFreight + fuelSurcharge + cargoSurcharge + attributeSurcharge + row.handling_fee + remoteAreaFee;
    available.push({
      product: mapLogisticsProduct(row),
      warnings: warningRestrictions,
      weightDetail,
      feeDetail: {
        pricingMode: row.pricing_mode,
        baseFreight: Number(baseFreight.toFixed(2)),
        fuelSurcharge: Number(fuelSurcharge.toFixed(2)),
        cargoSurcharge: Number(cargoSurcharge.toFixed(2)),
        attributeSurcharge: Number(attributeSurcharge.toFixed(2)),
        handlingFee: row.handling_fee,
        remoteAreaFee,
        freightTotal: Number(freightTotal.toFixed(2))
      },
      totalAmount: Number(freightTotal.toFixed(2))
    });
  }

  available.sort((a, b) => a.totalAmount - b.totalAmount);
  return json({ available, unavailable, attributes: logisticsProductAttributes });
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
    if (method === "POST" && path === "/api/auth/register") return registerMember(env.DB, (await readBody(request)) ?? {});
    if (method === "POST" && path === "/api/auth/logout") return logout(env.DB, request);
    if (method === "POST" && path === "/api/shipping/calculate") return calculateShipping(env.DB, (await readBody(request)) ?? {});

    const auth = await currentAuth(env.DB, request);
    if (path.startsWith("/api/admin/")) {
      if (!auth.staffId) return unauthorized("請先登入管理後台");
    } else if (!auth.memberId) {
      return unauthorized("請先登入會員帳號");
    }

    if (method === "GET" && path === "/api/member/profile") return json({ profile: await getProfile(env.DB) });
    if (method === "POST" && path === "/api/member/profile") return updateProfile(env.DB, (await readBody(request)) ?? {});
    if (method === "GET" && path === "/api/member/addresses") return listMemberShippingAddresses(env.DB);
    if (method === "GET" && path === "/api/member/warehouses") return listMemberWarehouses(env.DB);
    if (method === "POST" && path === "/api/member/addresses") return createShippingAddress(env.DB, (await readBody(request)) ?? {});
    if (method === "GET" && path === "/api/procurement/orders") return listMemberOrders(env.DB);
    if (method === "POST" && path === "/api/procurement/fetch-product") return fetchProductPreview((await readBody(request)) ?? {});
    if (method === "POST" && path === "/api/procurement/orders") return createProcurementOrder(env.DB, (await readBody(request)) ?? {});
    if (method === "POST" && path === "/api/procurement/offline-orders") return createOfflineProcurementOrder(env.DB, (await readBody(request)) ?? {});
    if (method === "GET" && path === "/api/admin/procurement/orders") return listAdminOrders(env.DB);
    if (method === "GET" && path === "/api/messages") return listMemberMessages(env.DB);
    if (method === "POST" && path === "/api/messages/read-all") return markAllMemberMessagesRead(env.DB);
    if (method === "GET" && path === "/api/tickets") return listMemberTickets(env.DB);
    if (method === "POST" && path === "/api/tickets") return createTicket(env.DB, (await readBody(request)) ?? {});
    if (method === "GET" && path === "/api/admin/tickets") return listAdminTickets(env.DB);
    if (method === "GET" && path === "/api/package-forecasts") return listPackageForecasts(env.DB);
    if (method === "POST" && path === "/api/package-forecasts") return createPackageForecast(env.DB, (await readBody(request)) ?? {});
    if (method === "GET" && path === "/api/inbound/packages") return listMemberInboundPackages(env.DB);
    if (method === "POST" && path === "/api/inbound/packages") return createInboundForecast(env.DB, (await readBody(request)) ?? {});
    if (method === "GET" && path === "/api/admin/inbound/packages") return listAdminInboundPackages(env.DB, auth.staffId);
    if (method === "POST" && path === "/api/admin/inbound/scan") return scanInboundPackage(env.DB, (await readBody(request)) ?? {}, auth.staffId);
    if (method === "GET" && path === "/api/topups") return listMemberTopupRequests(env.DB);
    if (method === "POST" && path === "/api/topups") return createTopupRequest(env.DB, (await readBody(request)) ?? {});
    if (method === "GET" && path === "/api/wallet/transactions") return listMemberWalletTransactions(env.DB);
    if (method === "GET" && path === "/api/points/transactions") return listMemberPointTransactions(env.DB);
    if (method === "GET" && path === "/api/refunds") return listMemberRefundRequests(env.DB);
    if (method === "POST" && path === "/api/refunds") return createRefundRequest(env.DB, (await readBody(request)) ?? {});
    if (method === "GET" && path === "/api/admin/topups") return listAdminTopupRequests(env.DB);
    if (method === "GET" && path === "/api/admin/wallet/transactions") return listAdminWalletTransactions(env.DB);
    if (method === "POST" && path === "/api/admin/wallet/adjust") return adjustMemberWallet(env.DB, (await readBody(request)) ?? {});
    if (method === "GET" && path === "/api/admin/refunds") return listAdminRefundRequests(env.DB);
    if (method === "GET" && path === "/api/admin/members") return listAdminMembers(env.DB);
    if (method === "GET" && path === "/api/admin/member-levels") return listMemberLevels(env.DB);
    if (method === "POST" && path === "/api/admin/member-levels") return createMemberLevel(env.DB, (await readBody(request)) ?? {});
    if (method === "GET" && path === "/api/admin/roles") return listStaffRoles(env.DB);
    if (method === "POST" && path === "/api/admin/roles") return createStaffRole(env.DB, (await readBody(request)) ?? {});
    if (method === "GET" && path === "/api/admin/staff") return listStaffAccounts(env.DB);
    if (method === "POST" && path === "/api/admin/staff") return createStaffAccount(env.DB, (await readBody(request)) ?? {});
    if (method === "GET" && path === "/api/admin/exchange-rates") return listExchangeRates(env.DB);
    if (method === "GET" && path === "/api/admin/warehouses") return listWarehouses(env.DB, auth.staffId);
    if (method === "POST" && path === "/api/admin/warehouses") return createWarehouse(env.DB, (await readBody(request)) ?? {}, auth.staffId);
    if (method === "GET" && path === "/api/admin/warehouse-shelves") return listWarehouseShelves(env.DB, auth.staffId);
    if (method === "POST" && path === "/api/admin/warehouse-shelves") return createWarehouseShelf(env.DB, (await readBody(request)) ?? {}, auth.staffId);
    if (method === "GET" && path === "/api/admin/warehouse-locations") return listWarehouseLocations(env.DB, auth.staffId);
    if (method === "POST" && path === "/api/admin/warehouse-locations") return createWarehouseLocation(env.DB, (await readBody(request)) ?? {}, auth.staffId);
    if (method === "POST" && path === "/api/admin/warehouse-locations/bulk") return createWarehouseLocationsBulk(env.DB, (await readBody(request)) ?? {}, auth.staffId);
    if (method === "GET" && path === "/api/admin/dictionaries") return listSystemDictionaries(env.DB);
    if (method === "POST" && path === "/api/admin/dictionaries") return createSystemDictionary(env.DB, (await readBody(request)) ?? {});
    if (method === "GET" && path === "/api/admin/fee-settings") return listFeeSettings(env.DB);
    if (method === "POST" && path === "/api/admin/fee-settings") return createFeeSetting(env.DB, (await readBody(request)) ?? {});
    if (method === "GET" && path === "/api/admin/value-added") return listValueAddedRequests(env.DB, auth.staffId);
    if (method === "POST" && path === "/api/admin/value-added") return createValueAddedRequests(env.DB, (await readBody(request)) ?? {}, auth.staffId);
    if (method === "GET" && path === "/api/admin/consolidation-batches") return listConsolidationBatches(env.DB, auth.staffId);
    if (method === "POST" && path === "/api/admin/consolidation-batches") return createConsolidationBatch(env.DB, (await readBody(request)) ?? {}, auth.staffId);
    if (method === "GET" && path === "/api/admin/logistics/suppliers") return listLogisticsSuppliers(env.DB);
    if (method === "POST" && path === "/api/admin/logistics/suppliers") return createLogisticsSupplier(env.DB, (await readBody(request)) ?? {});
    if (method === "GET" && path === "/api/admin/logistics/channel-products") return listChannelProducts(env.DB);
    if (method === "POST" && path === "/api/admin/logistics/channel-products") return createChannelProduct(env.DB, (await readBody(request)) ?? {});
    if (method === "GET" && path === "/api/admin/logistics/products") return listLogisticsProducts(env.DB);
    if (method === "POST" && path === "/api/admin/logistics/products") return createLogisticsProduct(env.DB, (await readBody(request)) ?? {});
    if (method === "GET" && path === "/api/admin/logistics/restrictions") return listShippingRestrictions(env.DB);
    if (method === "POST" && path === "/api/admin/logistics/restrictions") return createShippingRestriction(env.DB, (await readBody(request)) ?? {});

    const memberTicketMatch = path.match(/^\/api\/tickets\/([^/]+)$/);
    if (method === "GET" && memberTicketMatch) return getTicket(env.DB, decodeURIComponent(memberTicketMatch[1]), "member");

    const memberMessageReadMatch = path.match(/^\/api\/messages\/([^/]+)\/read$/);
    if (method === "POST" && memberMessageReadMatch) return markMemberMessageRead(env.DB, decodeURIComponent(memberMessageReadMatch[1]));

    const memberTicketMessageMatch = path.match(/^\/api\/tickets\/([^/]+)\/messages$/);
    if (method === "POST" && memberTicketMessageMatch) return addTicketMessage(env.DB, decodeURIComponent(memberTicketMessageMatch[1]), (await readBody(request)) ?? {}, "member");

    const memberForecastMatch = path.match(/^\/api\/package-forecasts\/([^/]+)$/);
    if (method === "POST" && memberForecastMatch) return updatePackageForecast(env.DB, decodeURIComponent(memberForecastMatch[1]), (await readBody(request)) ?? {});

    const memberForecastCancelMatch = path.match(/^\/api\/package-forecasts\/([^/]+)\/cancel$/);
    if (method === "POST" && memberForecastCancelMatch) return cancelPackageForecast(env.DB, decodeURIComponent(memberForecastCancelMatch[1]));

    const adminTicketMatch = path.match(/^\/api\/admin\/tickets\/([^/]+)$/);
    if (method === "GET" && adminTicketMatch) return getTicket(env.DB, decodeURIComponent(adminTicketMatch[1]), "admin");

    const adminTicketReplyMatch = path.match(/^\/api\/admin\/tickets\/([^/]+)\/reply$/);
    if (method === "POST" && adminTicketReplyMatch) return addTicketMessage(env.DB, decodeURIComponent(adminTicketReplyMatch[1]), (await readBody(request)) ?? {}, "staff");

    const adminTicketStatusMatch = path.match(/^\/api\/admin\/tickets\/([^/]+)\/status$/);
    if (method === "POST" && adminTicketStatusMatch) return updateTicketStatus(env.DB, decodeURIComponent(adminTicketStatusMatch[1]), (await readBody(request)) ?? {});

    const adminInboundClaimMatch = path.match(/^\/api\/admin\/inbound\/packages\/([^/]+)\/claim$/);
    if (method === "POST" && adminInboundClaimMatch) return claimInboundPackage(env.DB, decodeURIComponent(adminInboundClaimMatch[1]), (await readBody(request)) ?? {}, auth.staffId);

    const adminInboundShelveMatch = path.match(/^\/api\/admin\/inbound\/packages\/([^/]+)\/shelve$/);
    if (method === "POST" && adminInboundShelveMatch) return shelveInboundPackage(env.DB, decodeURIComponent(adminInboundShelveMatch[1]), (await readBody(request)) ?? {}, auth.staffId);

    const adminInboundDestroyMatch = path.match(/^\/api\/admin\/inbound\/packages\/([^/]+)\/destroy$/);
    if (method === "POST" && adminInboundDestroyMatch) return destroyInboundPackage(env.DB, decodeURIComponent(adminInboundDestroyMatch[1]), auth.staffId);

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

    const adminMemberLevelMatch = path.match(/^\/api\/admin\/member-levels\/([^/]+)$/);
    if (method === "POST" && adminMemberLevelMatch) return updateMemberLevel(env.DB, decodeURIComponent(adminMemberLevelMatch[1]), (await readBody(request)) ?? {});

    const adminMemberLevelDeleteMatch = path.match(/^\/api\/admin\/member-levels\/([^/]+)\/delete$/);
    if (method === "POST" && adminMemberLevelDeleteMatch) return deleteMemberLevel(env.DB, decodeURIComponent(adminMemberLevelDeleteMatch[1]));

    const adminExchangeRateMatch = path.match(/^\/api\/admin\/exchange-rates\/([^/]+)$/);
    if (method === "POST" && adminExchangeRateMatch) return updateExchangeRate(env.DB, decodeURIComponent(adminExchangeRateMatch[1]), (await readBody(request)) ?? {});

    const adminWarehouseMatch = path.match(/^\/api\/admin\/warehouses\/([^/]+)$/);
    if (method === "POST" && adminWarehouseMatch) return updateWarehouse(env.DB, decodeURIComponent(adminWarehouseMatch[1]), (await readBody(request)) ?? {}, auth.staffId);

    const adminWarehouseDeleteMatch = path.match(/^\/api\/admin\/warehouses\/([^/]+)\/delete$/);
    if (method === "POST" && adminWarehouseDeleteMatch) return deleteWarehouse(env.DB, decodeURIComponent(adminWarehouseDeleteMatch[1]), auth.staffId);

    const adminWarehouseShelfMatch = path.match(/^\/api\/admin\/warehouse-shelves\/([^/]+)$/);
    if (method === "POST" && adminWarehouseShelfMatch) return updateWarehouseShelf(env.DB, decodeURIComponent(adminWarehouseShelfMatch[1]), (await readBody(request)) ?? {}, auth.staffId);

    const adminWarehouseShelfDeleteMatch = path.match(/^\/api\/admin\/warehouse-shelves\/([^/]+)\/delete$/);
    if (method === "POST" && adminWarehouseShelfDeleteMatch) return deleteWarehouseShelf(env.DB, decodeURIComponent(adminWarehouseShelfDeleteMatch[1]), auth.staffId);

    const adminWarehouseLocationMatch = path.match(/^\/api\/admin\/warehouse-locations\/([^/]+)$/);
    if (method === "POST" && adminWarehouseLocationMatch) return updateWarehouseLocation(env.DB, decodeURIComponent(adminWarehouseLocationMatch[1]), (await readBody(request)) ?? {}, auth.staffId);

    const adminWarehouseLocationDeleteMatch = path.match(/^\/api\/admin\/warehouse-locations\/([^/]+)\/delete$/);
    if (method === "POST" && adminWarehouseLocationDeleteMatch) return deleteWarehouseLocation(env.DB, decodeURIComponent(adminWarehouseLocationDeleteMatch[1]), auth.staffId);

    const adminDictionaryMatch = path.match(/^\/api\/admin\/dictionaries\/([^/]+)$/);
    if (method === "POST" && adminDictionaryMatch) return updateSystemDictionary(env.DB, decodeURIComponent(adminDictionaryMatch[1]), (await readBody(request)) ?? {});

    const adminDictionaryDeleteMatch = path.match(/^\/api\/admin\/dictionaries\/([^/]+)\/delete$/);
    if (method === "POST" && adminDictionaryDeleteMatch) return deleteSystemDictionary(env.DB, decodeURIComponent(adminDictionaryDeleteMatch[1]));

    const adminFeeSettingMatch = path.match(/^\/api\/admin\/fee-settings\/([^/]+)$/);
    if (method === "POST" && adminFeeSettingMatch) return updateFeeSetting(env.DB, decodeURIComponent(adminFeeSettingMatch[1]), (await readBody(request)) ?? {});

    const adminFeeSettingDeleteMatch = path.match(/^\/api\/admin\/fee-settings\/([^/]+)\/delete$/);
    if (method === "POST" && adminFeeSettingDeleteMatch) return deleteFeeSetting(env.DB, decodeURIComponent(adminFeeSettingDeleteMatch[1]));

    const adminValueAddedStatusMatch = path.match(/^\/api\/admin\/value-added\/([^/]+)\/status$/);
    if (method === "POST" && adminValueAddedStatusMatch) return updateValueAddedRequestStatus(env.DB, decodeURIComponent(adminValueAddedStatusMatch[1]), (await readBody(request)) ?? {}, auth.staffId);

    const adminConsolidationPackMatch = path.match(/^\/api\/admin\/consolidation-batches\/([^/]+)\/pack$/);
    if (method === "POST" && adminConsolidationPackMatch) return updateConsolidationPacking(env.DB, decodeURIComponent(adminConsolidationPackMatch[1]), (await readBody(request)) ?? {}, auth.staffId);

    const adminConsolidationOutboundMatch = path.match(/^\/api\/admin\/consolidation-batches\/([^/]+)\/outbound$/);
    if (method === "POST" && adminConsolidationOutboundMatch) return markConsolidationOutbound(env.DB, decodeURIComponent(adminConsolidationOutboundMatch[1]), (await readBody(request)) ?? {}, auth.staffId);

    const adminLogisticsSupplierMatch = path.match(/^\/api\/admin\/logistics\/suppliers\/([^/]+)$/);
    if (method === "POST" && adminLogisticsSupplierMatch) return updateLogisticsSupplier(env.DB, decodeURIComponent(adminLogisticsSupplierMatch[1]), (await readBody(request)) ?? {});

    const adminLogisticsSupplierDeleteMatch = path.match(/^\/api\/admin\/logistics\/suppliers\/([^/]+)\/delete$/);
    if (method === "POST" && adminLogisticsSupplierDeleteMatch) return deleteLogisticsSupplier(env.DB, decodeURIComponent(adminLogisticsSupplierDeleteMatch[1]));

    const adminChannelProductMatch = path.match(/^\/api\/admin\/logistics\/channel-products\/([^/]+)$/);
    if (method === "POST" && adminChannelProductMatch) return updateChannelProduct(env.DB, decodeURIComponent(adminChannelProductMatch[1]), (await readBody(request)) ?? {});

    const adminChannelProductDeleteMatch = path.match(/^\/api\/admin\/logistics\/channel-products\/([^/]+)\/delete$/);
    if (method === "POST" && adminChannelProductDeleteMatch) return deleteChannelProduct(env.DB, decodeURIComponent(adminChannelProductDeleteMatch[1]));

    const adminLogisticsProductMatch = path.match(/^\/api\/admin\/logistics\/products\/([^/]+)$/);
    if (method === "POST" && adminLogisticsProductMatch) return updateLogisticsProduct(env.DB, decodeURIComponent(adminLogisticsProductMatch[1]), (await readBody(request)) ?? {});

    const adminLogisticsProductDeleteMatch = path.match(/^\/api\/admin\/logistics\/products\/([^/]+)\/delete$/);
    if (method === "POST" && adminLogisticsProductDeleteMatch) return deleteLogisticsProduct(env.DB, decodeURIComponent(adminLogisticsProductDeleteMatch[1]));

    const adminShippingRestrictionMatch = path.match(/^\/api\/admin\/logistics\/restrictions\/([^/]+)$/);
    if (method === "POST" && adminShippingRestrictionMatch) return updateShippingRestriction(env.DB, decodeURIComponent(adminShippingRestrictionMatch[1]), (await readBody(request)) ?? {});

    const adminShippingRestrictionDeleteMatch = path.match(/^\/api\/admin\/logistics\/restrictions\/([^/]+)\/delete$/);
    if (method === "POST" && adminShippingRestrictionDeleteMatch) return deleteShippingRestriction(env.DB, decodeURIComponent(adminShippingRestrictionDeleteMatch[1]));

    const adminTopupApproveMatch = path.match(/^\/api\/admin\/topups\/([^/]+)\/approve$/);
    if (method === "POST" && adminTopupApproveMatch) return reviewTopupRequest(env.DB, decodeURIComponent(adminTopupApproveMatch[1]), "approve");

    const adminTopupRejectMatch = path.match(/^\/api\/admin\/topups\/([^/]+)\/reject$/);
    if (method === "POST" && adminTopupRejectMatch) return reviewTopupRequest(env.DB, decodeURIComponent(adminTopupRejectMatch[1]), "reject");

    const memberRefundCancelMatch = path.match(/^\/api\/refunds\/([^/]+)\/cancel$/);
    if (method === "POST" && memberRefundCancelMatch) return cancelRefundRequest(env.DB, decodeURIComponent(memberRefundCancelMatch[1]));

    const adminRefundApproveMatch = path.match(/^\/api\/admin\/refunds\/([^/]+)\/approve$/);
    if (method === "POST" && adminRefundApproveMatch) return reviewRefundRequest(env.DB, decodeURIComponent(adminRefundApproveMatch[1]), "approve", (await readBody(request)) ?? {});

    const adminRefundRejectMatch = path.match(/^\/api\/admin\/refunds\/([^/]+)\/reject$/);
    if (method === "POST" && adminRefundRejectMatch) return reviewRefundRequest(env.DB, decodeURIComponent(adminRefundRejectMatch[1]), "reject", (await readBody(request)) ?? {});

    const adminRefundPaidMatch = path.match(/^\/api\/admin\/refunds\/([^/]+)\/paid$/);
    if (method === "POST" && adminRefundPaidMatch) return markRefundPaid(env.DB, decodeURIComponent(adminRefundPaidMatch[1]), (await readBody(request)) ?? {});

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
