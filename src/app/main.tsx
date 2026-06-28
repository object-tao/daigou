import React, { type FormEvent, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Bell,
  BookOpen,
  Boxes,
  Building2,
  CircleDollarSign,
  ClipboardList,
  Copy,
  FileText,
  Gauge,
  Gift,
  HandCoins,
  Languages,
  LayoutDashboard,
  LockKeyhole,
  MapPin,
  Megaphone,
  PackageCheck,
  PackagePlus,
  Pencil,
  Plus,
  RefreshCw,
  Scale,
  Search,
  Settings,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Tags,
  TicketPercent,
  Trash2,
  Truck,
  UserCog,
  UserRound,
  UsersRound,
  Warehouse
} from "lucide-react";
import "./styles.css";

type SystemMode = "member" | "admin";

type AuthUser = {
  id: string;
  email: string;
  displayName: string;
};

type MenuItem = {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  implemented?: boolean;
};

type MenuGroup = {
  title: string;
  items: MenuItem[];
};

type MemberProfile = {
  id: string;
  email: string;
  userCode: string;
  displayName: string;
  locale: string;
  levelCode: string;
  balanceHkd: number;
};

type ProcurementOrder = {
  id: string;
  memberId: string;
  orderType: string;
  platform: string;
  productUrl: string;
  productImageUrl: string | null;
  title: string;
  spec: string | null;
  quantity: number;
  status: string;
  statusLabel: string;
  itemAmountJpy: number | null;
  localShippingJpy: number | null;
  serviceFeeHkd: number | null;
  quotedTotalHkd: number | null;
  remarks: string | null;
  adminNote: string | null;
  storeName: string | null;
  storeContact: string | null;
  storePhone: string | null;
  storeAddress: string | null;
  currency: string;
  items: ProcurementOrderItem[];
  createdAt: string;
  updatedAt: string;
  quotedAt: string | null;
  paidAt: string | null;
  purchasedAt: string | null;
  cancelledAt: string | null;
};

type ProcurementOrderItem = {
  id: string;
  orderId: string;
  itemName: string;
  itemType: string;
  spec: string | null;
  color: string | null;
  unitPriceJpy: number;
  quantity: number;
  imageUrl: string;
  createdAt: string;
};

type ProductPreview = {
  title: string;
  spec: string;
  unitPriceJpy: number | null;
};

type TopupReviewLog = {
  id: string;
  actionLabel: string;
  actorId: string;
  amountHkd: number;
  note: string | null;
  createdAt: string;
};

type TopupRequest = {
  id: string;
  memberId: string;
  memberEmail?: string | null;
  memberDisplayName?: string | null;
  memberUserCode?: string | null;
  topupType: string;
  amountHkd: number;
  paymentMethod: string | null;
  bankAccountId: string | null;
  bankAccountName: string | null;
  transferSerialNo: string | null;
  remitterName: string | null;
  remitterPhone: string | null;
  voucherFileName: string | null;
  remittedAt: string | null;
  remarks: string | null;
  status: string;
  statusLabel: string;
  createdAt: string;
  updatedAt: string;
  reviewedAt: string | null;
  reviewLogs?: TopupReviewLog[];
};

type WalletTransaction = {
  id: string;
  memberId: string;
  memberEmail?: string | null;
  memberDisplayName?: string | null;
  memberUserCode?: string | null;
  direction: string;
  category: string;
  categoryLabel: string;
  amountHkd: number;
  balanceAfterHkd: number | null;
  relatedType: string | null;
  relatedId: string | null;
  title: string;
  description: string | null;
  status: string;
  statusLabel: string;
  createdAt: string;
};

type SupportTicketMessage = {
  id: string;
  ticketId: string;
  actorType: string;
  actorId: string;
  message: string;
  createdAt: string;
};

type SupportTicket = {
  id: string;
  memberId: string;
  type: string;
  typeLabel: string;
  subtype: string;
  content: string;
  status: string;
  statusLabel: string;
  createdAt: string;
  updatedAt: string;
  closedAt: string | null;
  messages?: SupportTicketMessage[];
};

type InboundPackage = {
  id: string;
  memberId: string | null;
  sourceType: string;
  warehouseId: string;
  warehouseName: string;
  japaneseTrackingNo: string;
  warehouseInboundNo: string;
  customerPackageNo: string;
  consolidationBatchNo: string | null;
  internationalTrackingNo: string | null;
  platform: string | null;
  senderName: string | null;
  itemName: string;
  quantity: number;
  recipientCode: string | null;
  status: string;
  statusLabel: string;
  weightKg: number | null;
  lengthCm: number | null;
  widthCm: number | null;
  heightCm: number | null;
  shelfCode: string | null;
  remarks: string | null;
  adminNote: string | null;
  createdAt: string;
  updatedAt: string;
  inboundedAt: string | null;
  claimedAt: string | null;
};

type AdminMember = {
  id: string;
  email: string;
  userCode: string;
  displayName: string;
  locale: string;
  levelCode: string;
  balanceHkd: number;
  createdAt: string;
  orderCount: number;
  packageCount: number;
  topupCount: number;
};

type StaffDepartment = {
  id: string;
  name: string;
  status: string;
  statusLabel: string;
};

type StaffRole = {
  id: string;
  name: string;
  description: string | null;
  permissions: string[];
  permissionCount: number;
  status: string;
  statusLabel: string;
  createdAt: string;
  updatedAt: string;
};

type StaffAccount = {
  id: string;
  email: string;
  displayName: string;
  departmentId: string;
  departmentName: string | null;
  roleId: string;
  roleName: string | null;
  status: string;
  statusLabel: string;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
};

type ExchangeRate = {
  id: string;
  baseCurrency: string;
  quoteCurrency: string;
  baseCurrencyName: string;
  quoteCurrencyName: string;
  rate: number;
  status: string;
  statusLabel: string;
  note: string | null;
  createdAt: string;
  updatedAt: string;
};

type WarehouseRecord = {
  id: string;
  code: string;
  name: string;
  type: string;
  country: string;
  postalCode: string | null;
  address: string;
  phone: string | null;
  contactName: string | null;
  status: string;
  statusLabel: string;
  isDefault: boolean;
  allowInbound: boolean;
  allowOutbound: boolean;
  sortOrder: number;
  remarks: string | null;
  createdAt: string;
  updatedAt: string;
};

type ShippingAddress = {
  id: string;
  memberId: string;
  label: string | null;
  recipientName: string;
  phone: string;
  countryCode: string;
  countryName: string;
  region: string | null;
  city: string | null;
  district: string | null;
  postalCode: string | null;
  addressLine1: string;
  addressLine2: string | null;
  isDefault: boolean;
  remarks: string | null;
  createdAt: string;
  updatedAt: string;
};

const emptyProfile: MemberProfile = {
  id: "demo-member",
  email: "demo@droppilot.net",
  userCode: "A7K3D",
  displayName: "Demo Member",
  locale: "zh-Hant",
  levelCode: "LV1",
  balanceHkd: 0
};

const procurementStatusFilters = [
  { value: "all", label: "全部" },
  { value: "pending_payment", label: "待付款" },
  { value: "platform_pending_order", label: "平台待下單" },
  { value: "platform_pending_shipment", label: "平台待發貨" },
  { value: "pending_inbound", label: "待入庫" },
  { value: "inbounded", label: "已入庫" },
  { value: "consolidated", label: "已合單" },
  { value: "shipped", label: "已發貨" },
  { value: "completed", label: "已完成" },
  { value: "issue", label: "問題訂單" },
  { value: "cancelled", label: "已取消" }
];

const topupStatusFilters = [
  { value: "all", label: "鍏ㄩ儴" },
  { value: "pending_review", label: "寰呭鏍?" },
  { value: "pending_payment", label: "寰呮敮浠?" },
  { value: "approved", label: "宸插叆甯?" },
  { value: "rejected", label: "宸叉嫆绲?" },
  { value: "cancelled", label: "宸插彇娑?" }
];

const memberMenu: MenuGroup[] = [
  {
    title: "個人中心",
    items: [
      { id: "member:overview", label: "會員概覽", description: "會員資料、餘額、積分與最新消息", icon: <LayoutDashboard size={17} /> },
      { id: "member:messages", label: "我的消息", description: "站內通知與系統公告", icon: <Bell size={17} /> },
      { id: "member:points", label: "我的積分", description: "代購商品積分與物流費用積分", icon: <Gift size={17} /> },
      { id: "member:commission", label: "我的佣金", description: "推薦佣金與轉入餘額記錄", icon: <HandCoins size={17} /> },
      { id: "member:tickets", label: "工單服務", description: "提交客服工單與查看平台回覆", icon: <ClipboardList size={17} />, implemented: true },
      { id: "member:coupons", label: "卡券中心", description: "優惠券與活動限制", icon: <TicketPercent size={17} /> },
      { id: "member:warehouse-address", label: "倉庫地址", description: "日本倉地址與入庫識別碼", icon: <Warehouse size={17} />, implemented: true }
    ]
  },
  {
    title: "訂單中心",
    items: [
      { id: "member:procurement", label: "线上随意购", description: "线上商品链接提交与余额付款", icon: <ShoppingBag size={17} />, implemented: true },
      { id: "member:offline-procurement", label: "线下随意购", description: "线下门店采购需求提交", icon: <PackagePlus size={17} />, implemented: true },
      { id: "member:auction", label: "Yahoo 代拍", description: "人工代拍、落札與補款", icon: <Scale size={17} /> },
      { id: "member:cart", label: "購物車", description: "跨平台商品合併與備註", icon: <ShoppingCart size={17} /> },
      { id: "member:procurement-orders", label: "代購訂單", description: "代購訂單資料、狀態與付款操作", icon: <FileText size={17} />, implemented: true },
      { id: "member:orders", label: "訂單管理", description: "代拍、集運與綜合訂單狀態追蹤", icon: <ClipboardList size={17} /> },
      { id: "member:inbound", label: "入庫包裹管理", description: "入庫預報與認領", icon: <PackagePlus size={17} /> },
      { id: "member:stored-items", label: "商品入庫列表", description: "已入庫商品與增值服務", icon: <Boxes size={17} /> },
      { id: "member:shipments", label: "運單管理", description: "合箱、紙箱費與國際運費付款", icon: <Truck size={17} /> },
      { id: "member:shipment-packages", label: "運單包裹管理", description: "包裹明細與物流節點", icon: <PackageCheck size={17} /> },
      { id: "member:after-sales", label: "售後申請", description: "退款、損壞、少件漏件與爭議處理", icon: <ShieldCheck size={17} /> }
    ]
  },
  {
    title: "財務中心",
    items: [
      { id: "member:payment-requests", label: "付款請求", description: "待付款、補款與扣款確認", icon: <CircleDollarSign size={17} /> },
      { id: "member:bank-transfer", label: "轉帳充值", description: "線上充值與線下轉帳充值", icon: <Building2 size={17} />, implemented: true },
      { id: "member:remittance", label: "匯款管理", description: "轉帳憑證與處理記錄", icon: <FileText size={17} />, implemented: true },
      { id: "member:ledger", label: "交易流水", description: "餘額、退款、運費與服務費流水", icon: <BookOpen size={17} />, implemented: true },
      { id: "member:refunds", label: "餘額與退款", description: "退回餘額與退款申請狀態", icon: <RefreshCw size={17} /> }
    ]
  },
  {
    title: "帳號設定",
    items: [
      { id: "member:profile", label: "個人資料", description: "電郵註冊資料與會員等級", icon: <UserRound size={17} /> },
      { id: "member:addresses", label: "收貨地址", description: "中國、香港、澳門、澳大利亞等收件地址", icon: <MapPin size={17} />, implemented: true },
      { id: "member:deduction", label: "扣款授權", description: "自動扣款上限與確認條件", icon: <LockKeyhole size={17} /> },
      { id: "member:security", label: "修改密碼", description: "登入密碼與安全設定", icon: <ShieldCheck size={17} /> },
      { id: "member:notification", label: "通知偏好", description: "Email 與 WhatsApp 通知選項", icon: <Bell size={17} /> }
    ]
  }
];

const adminMenu: MenuGroup[] = [
  {
    title: "工作台",
    items: [
      { id: "admin:dashboard", label: "營運概覽", description: "訂單、包裹、財務與待辦統計", icon: <Gauge size={17} /> },
      { id: "admin:procurement", label: "代購訂單", description: "代購付款、採購與狀態處理", icon: <ShoppingBag size={17} />, implemented: true },
      { id: "admin:reports", label: "數據報表", description: "Excel/CSV 匯出與定制報表", icon: <FileText size={17} /> }
    ]
  },
  {
    title: "代購與代拍",
    items: [
      { id: "admin:quote", label: "報價處理", description: "商品金額、服務費與本地運費報價", icon: <CircleDollarSign size={17} /> },
      { id: "admin:purchase", label: "採購處理", description: "已付款訂單採購與狀態更新", icon: <PackageCheck size={17} /> },
      { id: "admin:auction", label: "Yahoo 代拍", description: "人工出價、落札價與固定費", icon: <Scale size={17} /> },
      { id: "admin:negotiation", label: "議價服務", description: "個別網店議價與增值服務費", icon: <HandCoins size={17} /> },
      { id: "admin:refund-review", label: "退款/取消審核", description: "未採購取消與退款回餘額", icon: <RefreshCw size={17} /> }
    ]
  },
  {
    title: "集運倉儲",
    items: [
      { id: "admin:warehouses", label: "倉庫管理", description: "多倉庫資料、啟停與入出庫開關", icon: <Warehouse size={17} />, implemented: true },
      { id: "admin:inbound-scan", label: "入庫掃碼", description: "日本物流單號與倉庫入庫", icon: <PackagePlus size={17} /> },
      { id: "admin:claim", label: "包裹認領", description: "自動匹配與人工認領", icon: <Search size={17} />, implemented: true },
      { id: "admin:shelving", label: "上架管理", description: "貨架位與免倉期計算", icon: <Warehouse size={17} /> },
      { id: "admin:consolidation", label: "合箱管理", description: "免費合箱、箱型與紙箱費", icon: <Boxes size={17} /> },
      { id: "admin:packing", label: "打包出庫", description: "一件直發、打包與出庫掃碼", icon: <PackageCheck size={17} /> },
      { id: "admin:orphan", label: "無主包裹", description: "公海包裹與 60 天銷毀流程", icon: <ClipboardList size={17} /> },
      { id: "admin:value-added", label: "增值服務", description: "拍照、加強包裝、抽真空、去鞋盒", icon: <Tags size={17} /> }
    ]
  },
  {
    title: "財務管理",
    items: [
      { id: "admin:topup-review", label: "銀行轉帳審核", description: "充值憑證、入帳與拒絕", icon: <Building2 size={17} />, implemented: true },
      { id: "admin:wallet-adjust", label: "餘額調整", description: "補款、扣款、退款與人工調整", icon: <CircleDollarSign size={17} /> },
      { id: "admin:exchange-rate", label: "匯率管理", description: "日元兌港幣、人民幣與澳幣匯率", icon: <RefreshCw size={17} />, implemented: true },
      { id: "admin:fee-settings", label: "費用配置", description: "服務費、紙箱費、免倉期與倉租", icon: <Settings size={17} /> },
      { id: "admin:finance-ledger", label: "財務流水", description: "每筆資金變動與審計追蹤", icon: <BookOpen size={17} />, implemented: true }
    ]
  },
  {
    title: "會員客服",
    items: [
      { id: "admin:members", label: "會員管理", description: "會員資料、等級與 5 位識別碼", icon: <UsersRound size={17} />, implemented: true },
      { id: "admin:levels", label: "會員等級", description: "累計消費、運費、充值與訂單數規則", icon: <ShieldCheck size={17} /> },
      { id: "admin:verification", label: "認證審核", description: "會員認證人工審核", icon: <UserCog size={17} /> },
      { id: "admin:tickets", label: "客戶工單", description: "查看、回覆與關閉會員工單", icon: <ClipboardList size={17} />, implemented: true },
      { id: "admin:notifications", label: "通知發送", description: "Email 與 WhatsApp 通知模板", icon: <Bell size={17} /> }
    ]
  },
  {
    title: "系統設定",
    items: [
      { id: "admin:staff", label: "員工帳號", description: "客服、倉庫、財務與管理員帳號", icon: <UserCog size={17} />, implemented: true },
      { id: "admin:roles", label: "角色權限", description: "到菜單級別的權限控制", icon: <ShieldCheck size={17} />, implemented: true },
      { id: "admin:audit", label: "操作日誌", description: "後台操作審計記錄", icon: <BookOpen size={17} /> },
      { id: "admin:dictionary", label: "字典管理", description: "基礎設置與系統字典", icon: <Settings size={17} /> },
      { id: "admin:migration", label: "資料遷移", description: "現有系統資料導入計劃", icon: <RefreshCw size={17} /> },
      { id: "admin:i18n", label: "多語內容", description: "繁體中文、英文、日文內容管理", icon: <Languages size={17} /> },
      { id: "admin:seo", label: "SEO 管理", description: "Title、Meta、Slug、OG、Sitemap、robots", icon: <Megaphone size={17} /> }
    ]
  }
];

const allMenuItems = [...memberMenu, ...adminMenu].flatMap((group) => group.items);

async function loadJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(path, { headers: { Accept: "application/json" } });
    return response.ok ? ((await response.json()) as T) : fallback;
  } catch {
    return fallback;
  }
}

async function postJson<T>(path: string, body: Record<string, unknown> = {}): Promise<T> {
  const response = await fetch(path, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const raw = await response.text();
  let payload: T | { error?: string };
  try {
    payload = raw ? (JSON.parse(raw) as T | { error?: string }) : {};
  } catch {
    payload = { error: raw || "伺服器返回了無法解析的內容" };
  }
  if (!response.ok) throw new Error((payload as { error?: string }).error ?? "提交失敗");
  return payload as T;
}

async function authJson<T>(path: string, body: Record<string, unknown> = {}): Promise<T> {
  return postJson<T>(path, body);
}

function App() {
  const initialMode: SystemMode = window.location.hostname.startsWith("admin.") || window.location.pathname.startsWith("/admin") ? "admin" : "member";
  const [systemMode, setSystemMode] = useState<SystemMode>(initialMode);
  const [activeView, setActiveView] = useState(initialMode === "admin" ? "admin:procurement" : "member:procurement");
  const [authChecked, setAuthChecked] = useState(false);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<MemberProfile>(emptyProfile);
  const [memberOrders, setMemberOrders] = useState<ProcurementOrder[]>([]);
  const [adminOrders, setAdminOrders] = useState<ProcurementOrder[]>([]);
  const [memberTickets, setMemberTickets] = useState<SupportTicket[]>([]);
  const [adminTickets, setAdminTickets] = useState<SupportTicket[]>([]);
  const [adminInboundPackages, setAdminInboundPackages] = useState<InboundPackage[]>([]);
  const [topups, setTopups] = useState<TopupRequest[]>([]);
  const [memberTopups, setMemberTopups] = useState<TopupRequest[]>([]);
  const [memberWalletTransactions, setMemberWalletTransactions] = useState<WalletTransaction[]>([]);
  const [adminWalletTransactions, setAdminWalletTransactions] = useState<WalletTransaction[]>([]);
  const [members, setMembers] = useState<AdminMember[]>([]);
  const [staffAccounts, setStaffAccounts] = useState<StaffAccount[]>([]);
  const [staffDepartments, setStaffDepartments] = useState<StaffDepartment[]>([]);
  const [staffRoles, setStaffRoles] = useState<StaffRole[]>([]);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);
  const [warehouses, setWarehouses] = useState<WarehouseRecord[]>([]);
  const [shippingAddresses, setShippingAddresses] = useState<ShippingAddress[]>([]);
  const [shippingCountries, setShippingCountries] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const menu = systemMode === "admin" ? adminMenu : memberMenu;

  async function refresh() {
    const [profilePayload, memberPayload, memberTicketPayload, addressPayload, memberWalletPayload, memberTopupPayload, adminPayload, adminTicketPayload, adminInboundPayload, topupPayload, adminWalletPayload, memberAdminPayload, staffPayload, rolePayload, exchangeRatePayload, warehousePayload] = await Promise.all([
      loadJson<{ profile: MemberProfile }>("/api/member/profile", { profile: emptyProfile }),
      loadJson<{ items: ProcurementOrder[] }>("/api/procurement/orders", { items: [] }),
      loadJson<{ items: SupportTicket[] }>("/api/tickets", { items: [] }),
      loadJson<{ items: ShippingAddress[]; countries: Record<string, string> }>("/api/member/addresses", { items: [], countries: {} }),
      loadJson<{ items: WalletTransaction[] }>("/api/wallet/transactions", { items: [] }),
      loadJson<{ items: TopupRequest[] }>("/api/topups", { items: [] }),
      loadJson<{ items: ProcurementOrder[] }>("/api/admin/procurement/orders", { items: [] }),
      loadJson<{ items: SupportTicket[] }>("/api/admin/tickets", { items: [] }),
      loadJson<{ items: InboundPackage[] }>("/api/admin/inbound/packages", { items: [] }),
      loadJson<{ items: TopupRequest[] }>("/api/admin/topups", { items: [] }),
      loadJson<{ items: WalletTransaction[] }>("/api/admin/wallet/transactions", { items: [] }),
      loadJson<{ items: AdminMember[] }>("/api/admin/members", { items: [] }),
      loadJson<{ items: StaffAccount[]; departments: StaffDepartment[]; roles: StaffRole[] }>("/api/admin/staff", { items: [], departments: [], roles: [] }),
      loadJson<{ items: StaffRole[] }>("/api/admin/roles", { items: [] }),
      loadJson<{ items: ExchangeRate[] }>("/api/admin/exchange-rates", { items: [] }),
      loadJson<{ items: WarehouseRecord[] }>(systemMode === "admin" ? "/api/admin/warehouses" : "/api/member/warehouses", { items: [] })
    ]);
    setProfile(profilePayload.profile);
    setMemberOrders(memberPayload.items);
    setMemberTickets(memberTicketPayload.items);
    setShippingAddresses(addressPayload.items);
    setShippingCountries(addressPayload.countries);
    setMemberWalletTransactions(memberWalletPayload.items);
    setMemberTopups(memberTopupPayload.items);
    setAdminOrders(adminPayload.items);
    setAdminTickets(adminTicketPayload.items);
    setAdminInboundPackages(adminInboundPayload.items);
    setTopups(topupPayload.items);
    setAdminWalletTransactions(adminWalletPayload.items);
    setMembers(memberAdminPayload.items);
    setStaffAccounts(staffPayload.items);
    setStaffDepartments(staffPayload.departments);
    setStaffRoles(rolePayload.items.length ? rolePayload.items : staffPayload.roles);
    setExchangeRates(exchangeRatePayload.items);
    setWarehouses(warehousePayload.items);
  }

  useEffect(() => {
    async function boot() {
      const session = await loadJson<{ authenticated: boolean; mode: SystemMode | null; user: AuthUser | null }>("/api/auth/session", { authenticated: false, mode: null, user: null });
      if (session.authenticated && session.mode === initialMode && session.user) {
        setAuthUser(session.user);
        await refresh();
      }
      setAuthChecked(true);
    }
    void boot();
  }, []);

  async function loginSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = Object.fromEntries(new FormData(event.currentTarget).entries());
    setSubmitting(true);
    try {
      const payload = await authJson<{ authenticated: boolean; user: AuthUser }>("/api/auth/login", { ...body, mode: initialMode });
      setAuthUser(payload.user);
      setMessage("");
      await refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "登入失敗");
    } finally {
      setSubmitting(false);
      setAuthChecked(true);
    }
  }

  async function logoutSubmit() {
    setSubmitting(true);
    try {
      await postJson("/api/auth/logout");
      setAuthUser(null);
      setMessage("");
    } finally {
      setSubmitting(false);
    }
  }

  async function submitForm(event: FormEvent<HTMLFormElement>, path: string, success: string) {
    event.preventDefault();
    const form = event.currentTarget;
    const body = Object.fromEntries(new FormData(form).entries());
    setSubmitting(true);
    try {
      await postJson(path, body);
      form.reset();
      setMessage(success);
      await refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "提交失敗");
    } finally {
      setSubmitting(false);
    }
  }

  async function action(path: string, success: string) {
    setSubmitting(true);
    try {
      await postJson(path);
      setMessage(success);
      await refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "操作失敗");
    } finally {
      setSubmitting(false);
    }
  }

  async function submitJson(path: string, body: Record<string, unknown>, success: string) {
    setSubmitting(true);
    try {
      await postJson(path, body);
      setMessage(success);
      await refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "操作失敗");
    } finally {
      setSubmitting(false);
    }
  }

  if (!authChecked) {
    return <main className="auth-shell"><section className="auth-card"><strong>DropPilot</strong><p>正在檢查登入狀態...</p></section></main>;
  }

  if (!authUser) {
    return <LoginScreen mode={initialMode} message={message} onSubmit={loginSubmit} submitting={submitting} />;
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">DP</div>
          <div>
            <strong>DropPilot</strong>
            <small>{systemMode === "admin" ? "管理後台" : "消費者前台"}</small>
          </div>
        </div>
        <MenuSection activeView={activeView} groups={menu} onSelect={setActiveView} title={systemMode === "admin" ? "管理後台" : "消費者前台"} />
      </aside>
      <section className="content">
        <header className="topbar">
          <div>
            <span className="eyebrow">{systemMode === "admin" ? "ADMIN" : "MEMBER"}</span>
            <h1>{allMenuItems.find((item) => item.id === activeView)?.label ?? "DropPilot"}</h1>
            <small>{authUser.displayName} · {authUser.email}</small>
          </div>
          <div className="topbar-actions">
            <button className="secondary" onClick={() => void refresh()} type="button"><RefreshCw size={16} />刷新</button>
            <button className="secondary" onClick={() => void logoutSubmit()} type="button">退出</button>
          </div>
        </header>
        {message ? <div className="notice">{message}</div> : null}
        {activeView === "member:procurement" ? <MemberProcurement onSubmit={submitForm} submitting={submitting} /> : null}
        {activeView === "member:offline-procurement" ? <MemberOfflineProcurement onSubmit={submitJson} submitting={submitting} /> : null}
        {activeView === "member:tickets" ? <MemberTickets onSubmit={submitJson} submitting={submitting} tickets={memberTickets} /> : null}
        {activeView === "member:warehouse-address" ? <MemberWarehouseAddresses profile={profile} warehouses={warehouses} /> : null}
        {activeView === "member:addresses" ? <MemberShippingAddresses addresses={shippingAddresses} countries={shippingCountries} onDelete={action} onSubmit={submitJson} submitting={submitting} /> : null}
        {activeView === "member:ledger" ? <WalletLedger showMember={false} title="交易流水" transactions={memberWalletTransactions} /> : null}
        {activeView === "member:bank-transfer" ? <MemberTopupCenter profile={profile} onSubmit={submitJson} requests={memberTopups} submitting={submitting} /> : null}
        {activeView === "member:remittance" ? <section className="panel full-span"><MemberTopupRecords requests={memberTopups.filter((request) => request.topupType === "offline")} title="匯款管理" /></section> : null}
        {activeView === "member:procurement-orders" ? <MemberOrders action={action} orders={memberOrders} submitting={submitting} /> : null}
        {activeView === "admin:procurement" ? <AdminProcurement action={action} orders={adminOrders} submitting={submitting} /> : null}
        {activeView === "admin:topup-review" ? <AdminTopupReview action={action} requests={topups} submitting={submitting} /> : null}
        {activeView === "admin:members" ? <AdminMembers members={members} /> : null}
        {activeView === "admin:staff" ? <AdminStaffAccounts departments={staffDepartments} onDelete={action} onSubmit={submitJson} roles={staffRoles} staff={staffAccounts} submitting={submitting} /> : null}
        {activeView === "admin:roles" ? <AdminRoleManagement onDelete={action} onSubmit={submitJson} roles={staffRoles} submitting={submitting} /> : null}
        {activeView === "admin:tickets" ? <AdminTickets onSubmit={submitJson} submitting={submitting} tickets={adminTickets} /> : null}
        {activeView === "admin:claim" ? <AdminPackageClaimList onSubmit={submitJson} packages={adminInboundPackages} submitting={submitting} /> : null}
        {activeView === "admin:exchange-rate" ? <AdminExchangeRates onSubmit={submitJson} rates={exchangeRates} submitting={submitting} /> : null}
        {activeView === "admin:warehouses" ? <AdminWarehouses onDelete={action} onSubmit={submitJson} submitting={submitting} warehouses={warehouses} /> : null}
        {activeView === "admin:finance-ledger" ? <WalletLedger showMember title="財務流水" transactions={adminWalletTransactions} /> : null}
        {!["member:procurement", "member:offline-procurement", "member:tickets", "member:warehouse-address", "member:addresses", "member:ledger", "member:bank-transfer", "member:remittance", "member:procurement-orders", "admin:procurement", "admin:topup-review", "admin:members", "admin:staff", "admin:roles", "admin:tickets", "admin:claim", "admin:exchange-rate", "admin:warehouses", "admin:finance-ledger"].includes(activeView) ? <Placeholder activeView={activeView} /> : null}
      </section>
    </main>
  );
}

function LoginScreen({
  message,
  mode,
  onSubmit,
  submitting
}: {
  message: string;
  mode: SystemMode;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  submitting: boolean;
}) {
  const isAdmin = mode === "admin";
  return (
    <main className="auth-shell">
      <section className="auth-card">
        <div className="auth-brand">
          <div className="brand-mark">DP</div>
          <div>
            <strong>DropPilot</strong>
            <span>{isAdmin ? "管理後台登入" : "會員中心登入"}</span>
          </div>
        </div>
        <form className="auth-form" onSubmit={onSubmit}>
          <label>
            <span>電郵</span>
            <input autoComplete="email" defaultValue={isAdmin ? "admin@droppilot.net" : "demo@droppilot.net"} name="email" required type="email" />
          </label>
          <label>
            <span>密碼</span>
            <input autoComplete="current-password" defaultValue={isAdmin ? "admin123456" : "member123456"} name="password" required type="password" />
          </label>
          {message ? <div className="inline-error">{message}</div> : null}
          <button disabled={submitting} type="submit">提交工單</button>
        </form>
        <p className="auth-hint">
          測試帳號：{isAdmin ? "admin@droppilot.net / admin123456" : "demo@droppilot.net / member123456"}
        </p>
      </section>
    </main>
  );
}

function MenuSection({ activeView, groups, onSelect, title }: { activeView: string; groups: MenuGroup[]; onSelect: (id: string) => void; title: string }) {
  return (
    <div className="menu-section">
      <p>{title}</p>
      {groups.map((group) => (
        <div className="menu-group" key={group.title}>
          <h3>{group.title}</h3>
          <nav aria-label={group.title}>
            {group.items.map((item) => (
              <button className={activeView === item.id ? "active" : ""} key={item.id} onClick={() => onSelect(item.id)} type="button">
                {item.icon}
                <span>{item.label}</span>
                {item.implemented ? <em>已接入</em> : null}
              </button>
            ))}
          </nav>
        </div>
      ))}
    </div>
  );
}

function Placeholder({ activeView }: { activeView: string }) {
  const item = allMenuItems.find((entry) => entry.id === activeView);
  return (
    <section className="panel full-span placeholder-panel">
      <h2>{item?.label ?? "鍔熻兘闋?"}</h2>
      <p>{item?.description ?? "姝ゅ姛鑳界◢寰屾帴鍏ャ€?"}</p>
      <strong>姝ら爜闈㈢洰鍓嶄繚鐣欒彍鍠叆鍙ｏ紝鍔熻兘灏囨寜妯″閫愭鎺ュ叆銆?</strong>
    </section>
  );
}

function MemberWarehouseAddresses({ profile, warehouses }: { profile: MemberProfile; warehouses: WarehouseRecord[] }) {
  const [copiedId, setCopiedId] = useState("");
  const availableWarehouses = warehouses.filter((warehouse) => warehouse.status === "active" && warehouse.allowInbound);

  async function copyWarehouseAddress(warehouse: WarehouseRecord) {
    const content = warehouseAddressText(warehouse, profile.userCode);
    await copyText(content);
    setCopiedId(warehouse.id);
    window.setTimeout(() => setCopiedId(""), 1600);
  }

  async function copyWarehouseField(key: string, content: string) {
    await copyText(content);
    setCopiedId(key);
    window.setTimeout(() => setCopiedId(""), 1600);
  }

  return (
    <section className="full-span warehouse-list">
      <div className="warehouse-code-note">
        <strong>會員識別碼：{profile.userCode}</strong>
        <span>請在日本平台下單時保留姓名和地址後方的識別碼，倉庫會用此碼匹配包裹歸屬。</span>
      </div>
      {availableWarehouses.map((warehouse) => (
        <article className="warehouse-card" key={warehouse.id}>
          <div className="warehouse-card-header">
            <PanelTitle icon={<Warehouse />} title={warehouse.name} />
            <span>{warehouse.isDefault ? "最終出發集運倉，代購與集運包裹請優先寄送至此倉。" : `${warehouse.type}，適合指定門市交收或臨時代收。`}</span>
          </div>
          <dl className="warehouse-table">
            <div>
              <dt>姓名：</dt>
              <dd>
                <span>用戶名 {profile.userCode}</span>
                <button
                  aria-label="複製姓名"
                  className="copy-field-button"
                  onClick={() => void copyWarehouseField(`${warehouse.id}:name`, `用戶名 ${profile.userCode}`)}
                  title={copiedId === `${warehouse.id}:name` ? "已複製" : "複製姓名"}
                  type="button"
                >
                  <Copy size={15} />
                </button>
              </dd>
            </div>
            <div>
              <dt>郵編：</dt>
              <dd>
                <span>{warehouse.postalCode || "-"}</span>
                <button
                  aria-label="複製郵編"
                  className="copy-field-button"
                  onClick={() => void copyWarehouseField(`${warehouse.id}:postalCode`, warehouse.postalCode || "")}
                  title={copiedId === `${warehouse.id}:postalCode` ? "已複製" : "複製郵編"}
                  type="button"
                >
                  <Copy size={15} />
                </button>
              </dd>
            </div>
            <div>
              <dt>倉庫地址：</dt>
              <dd>
                <span>{formatWarehouseAddress(warehouse, profile.userCode)}</span>
                <button
                  aria-label="複製倉庫地址"
                  className="copy-field-button"
                  onClick={() => void copyWarehouseField(`${warehouse.id}:address`, formatWarehouseAddress(warehouse, profile.userCode))}
                  title={copiedId === `${warehouse.id}:address` ? "已複製" : "複製倉庫地址"}
                  type="button"
                >
                  <Copy size={15} />
                </button>
              </dd>
            </div>
            <div>
              <dt>電話：</dt>
              <dd>
                <span>{warehouse.phone || "07092504670"}</span>
                <button
                  aria-label="複製電話"
                  className="copy-field-button"
                  onClick={() => void copyWarehouseField(`${warehouse.id}:phone`, warehouse.phone || "07092504670")}
                  title={copiedId === `${warehouse.id}:phone` ? "已複製" : "複製電話"}
                  type="button"
                >
                  <Copy size={15} />
                </button>
              </dd>
            </div>
          </dl>
          <div className="warehouse-actions">
            <button onClick={() => void copyWarehouseAddress(warehouse)} type="button">
              {copiedId === warehouse.id ? "已複製" : "複製倉庫地址"}
            </button>
          </div>
        </article>
      ))}
      {availableWarehouses.length === 0 ? (
        <section className="panel empty-state">暫無可用倉庫地址</section>
      ) : null}
    </section>
  );
}

function formatWarehouseAddress(warehouse: WarehouseRecord, userCode: string) {
  return `${warehouse.address} DropPilot ${userCode}`;
}

function warehouseAddressText(warehouse: WarehouseRecord, userCode: string) {
  return [
    `姓名：用戶名 ${userCode}`,
    `郵編：${warehouse.postalCode || ""}`,
    `倉庫地址：${formatWarehouseAddress(warehouse, userCode)}`,
    `電話：${warehouse.phone || "07092504670"}`
  ].join("\n");
}

async function copyText(content: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(content);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = content;
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function MemberShippingAddresses({
  addresses,
  countries,
  onDelete,
  onSubmit,
  submitting
}: {
  addresses: ShippingAddress[];
  countries: Record<string, string>;
  onDelete: (path: string, success: string) => Promise<void>;
  onSubmit: (path: string, body: Record<string, unknown>, success: string) => Promise<void>;
  submitting: boolean;
}) {
  const [editing, setEditing] = useState<ShippingAddress | null>(null);
  const [creating, setCreating] = useState(false);
  const current = editing;
  const showModal = creating || Boolean(editing);
  const countryEntries = Object.entries(countries).length
    ? Object.entries(countries)
    : [["CN", "涓湅澶ч櫢"], ["HK", "涓湅棣欐腐"], ["MO", "涓湅婢抽杸"], ["TW", "涓湅鍙扮仯"], ["AU", "婢冲ぇ鍒╀簽"]];

  function closeModal() {
    setCreating(false);
    setEditing(null);
  }

  async function submitAddress(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = Object.fromEntries(new FormData(event.currentTarget).entries());
    await onSubmit(
      current ? `/api/member/addresses/${encodeURIComponent(current.id)}` : "/api/member/addresses",
      body,
      current ? "收貨地址已更新" : "收貨地址已新增"
    );
    closeModal();
  }

  return (
    <section className="panel full-span">
      <div className="panel-heading-row">
        <PanelTitle icon={<MapPin />} title="收貨地址" />
        <div className="panel-actions">
          <span>共 {addresses.length} 個地址</span>
          <button onClick={() => setCreating(true)} type="button"><Plus size={16} />新增地址</button>
        </div>
      </div>
      <div className="table-wrap compact-table address-table">
        <table>
          <thead>
            <tr>
              <th>收件人</th>
              <th>國家/地區</th>
              <th>地址</th>
              <th>電話</th>
              <th>標籤</th>
              <th>更新時間</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {addresses.map((address) => (
              <tr key={address.id}>
                <td>
                  <strong>{address.recipientName}</strong>
                  <small>{address.isDefault ? "默認地址" : "普通地址"}</small>
                </td>
                <td>{address.countryName}</td>
                <td>
                  <strong>{formatShippingAddress(address)}</strong>
                  <small>{address.postalCode || "-"}{address.remarks ? ` 路 ${address.remarks}` : ""}</small>
                </td>
                <td>{address.phone}</td>
                <td>{address.label || "-"}</td>
                <td>{new Date(address.updatedAt).toLocaleString("zh-HK")}</td>
                <td>
                  <div className="row-actions">
                    <button className="secondary" onClick={() => setEditing(address)} type="button"><Pencil size={15} />編輯</button>
                    <button className="danger" disabled={submitting} onClick={() => void onDelete(`/api/member/addresses/${encodeURIComponent(address.id)}/delete`, "收貨地址已刪除")} type="button"><Trash2 size={15} />刪除</button>
                  </div>
                </td>
              </tr>
            ))}
            {addresses.length === 0 ? <tr><td colSpan={7}>暫無收貨地址</td></tr> : null}
          </tbody>
        </table>
      </div>

      {showModal ? (
        <div className="modal-backdrop">
          <div className="ticket-modal">
            <button className="modal-close" onClick={closeModal} type="button">關閉</button>
            <section className="panel">
              <PanelTitle icon={<MapPin />} title={current ? "編輯收貨地址" : "新增收貨地址"} />
              <form className="form-grid" onSubmit={(event) => void submitAddress(event)}>
                <label><span>地址標籤</span><input defaultValue={current?.label ?? ""} name="label" placeholder="例如：香港家中、澳洲倉庫" /></label>
                <label><span>收件人</span><input defaultValue={current?.recipientName ?? ""} name="recipientName" required /></label>
                <label><span>電話</span><input defaultValue={current?.phone ?? ""} name="phone" required /></label>
                <label>
                  <span>國家/地區</span>
                  <select defaultValue={current?.countryCode ?? "HK"} name="countryCode" required>
                    {countryEntries.map(([code, name]) => <option key={code} value={code}>{name}</option>)}
                  </select>
                </label>
                <label><span>省/州/地區</span><input defaultValue={current?.region ?? ""} name="region" /></label>
                <label><span>城市</span><input defaultValue={current?.city ?? ""} name="city" /></label>
                <label><span>區/縣</span><input defaultValue={current?.district ?? ""} name="district" /></label>
                <label><span>郵編</span><input defaultValue={current?.postalCode ?? ""} name="postalCode" /></label>
                <label className="full"><span>詳細地址</span><input defaultValue={current?.addressLine1 ?? ""} name="addressLine1" required /></label>
                <label className="full"><span>地址補充</span><input defaultValue={current?.addressLine2 ?? ""} name="addressLine2" /></label>
                <label className="full"><span>備註</span><textarea defaultValue={current?.remarks ?? ""} name="remarks" /></label>
                <div className="full checkbox-row">
                  <label><input defaultChecked={current?.isDefault ?? addresses.length === 0} name="isDefault" type="checkbox" />設為默認地址</label>
                </div>
                <button disabled={submitting} type="submit">{current ? "保存地址" : "新增地址"}</button>
              </form>
            </section>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function formatShippingAddress(address: ShippingAddress) {
  return [address.region, address.city, address.district, address.addressLine1, address.addressLine2]
    .filter(Boolean)
    .join(" ");
}

const topupAmounts = [500, 1000, 5000, 20000];
const paymentMethods = [
  { value: "alipay", label: "鏀粯瀵舵敮浠?", icon: "鏀?" },
  { value: "alipayhk", label: "AlipayHK 鏀粯", icon: "HK" },
  { value: "wechat", label: "微信充值", icon: "微" }
];
const bankAccounts = [
  { id: "hsbc-hkd", name: "DropPilot HSBC 娓梗鎴跺彛", bank: "HSBC", accountNo: "808-000000-001" },
  { id: "boc-hkd", name: "DropPilot 涓妧棣欐腐鎴跺彛", bank: "Bank of China HK", accountNo: "012-000-00000000" }
];

function MemberTopupCenter({
  onSubmit,
  profile,
  requests,
  submitting
}: {
  onSubmit: (path: string, body: Record<string, unknown>, success: string) => Promise<void>;
  profile: MemberProfile;
  requests: TopupRequest[];
  submitting: boolean;
}) {
  const [modal, setModal] = useState<"online" | "offline" | null>(null);

  return (
    <section className="panel full-span">
      <div className="panel-heading-row">
        <PanelTitle icon={<Building2 />} title="轉帳充值" />
        <div className="panel-actions">
          <button onClick={() => setModal("online")} type="button">線上充值</button>
          <button onClick={() => setModal("offline")} type="button">線下充值</button>
        </div>
      </div>
      <div className="balance-hero">
        <div>
          <span>消費者帳戶餘額</span>
          <strong>HKD {profile.balanceHkd.toLocaleString("zh-HK")}</strong>
          <small>{profile.displayName} 路 {profile.userCode}</small>
        </div>
      </div>
      <MemberTopupRecords requests={requests} title="最近充值記錄" />
      {modal === "online" ? <OnlineTopupModal onClose={() => setModal(null)} onSubmit={onSubmit} submitting={submitting} /> : null}
      {modal === "offline" ? <OfflineTopupModal onClose={() => setModal(null)} onSubmit={onSubmit} submitting={submitting} /> : null}
    </section>
  );
}

function OnlineTopupModal({ onClose, onSubmit, submitting }: { onClose: () => void; onSubmit: (path: string, body: Record<string, unknown>, success: string) => Promise<void>; submitting: boolean }) {
  const [amount, setAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("alipay");
  const finalAmount = customAmount ? Number(customAmount) : amount;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onSubmit("/api/topups", { topupType: "online", amountHkd: finalAmount, paymentMethod }, "線上充值申請已提交");
    onClose();
  }

  return (
    <div className="modal-backdrop">
      <div className="ticket-modal">
        <button className="modal-close" onClick={onClose} type="button">關閉</button>
        <section className="panel">
          <PanelTitle icon={<CircleDollarSign />} title="線上充值" />
          <form className="form-grid topup-form" onSubmit={(event) => void submit(event)}>
            <div className="full amount-picker">
              {topupAmounts.map((value) => (
                <button className={!customAmount && amount === value ? "active" : ""} key={value} onClick={() => { setAmount(value); setCustomAmount(""); }} type="button">
                  HKD {value.toLocaleString("zh-HK")}
                </button>
              ))}
            </div>
            <label className="full">
              <span>自定義金額</span>
              <input min="1" onChange={(event) => setCustomAmount(event.target.value)} placeholder="可輸入自定義充值金額" type="number" value={customAmount} />
            </label>
            <div className="full payment-method-picker">
              {paymentMethods.map((method) => (
                <button className={paymentMethod === method.value ? "active" : ""} key={method.value} onClick={() => setPaymentMethod(method.value)} type="button">
                  <b>{method.icon}</b>{method.label}
                </button>
              ))}
            </div>
            <button disabled={submitting || !finalAmount || finalAmount < 1} type="submit">提交線上充值</button>
          </form>
        </section>
      </div>
    </div>
  );
}

function OfflineTopupModal({ onClose, onSubmit, submitting }: { onClose: () => void; onSubmit: (path: string, body: Record<string, unknown>, success: string) => Promise<void>; submitting: boolean }) {
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const voucher = data.get("voucher") as File | null;
    const body = Object.fromEntries(data.entries());
    await onSubmit("/api/topups", {
      ...body,
      topupType: "offline",
      voucherFileName: voucher?.name || "",
      bankAccountName: bankAccounts.find((account) => account.id === body.bankAccountId)?.name || ""
    }, "線下充值申請已提交，等待財務審核");
    onClose();
  }

  return (
    <div className="modal-backdrop">
      <div className="ticket-modal">
        <button className="modal-close" onClick={onClose} type="button">關閉</button>
        <section className="panel">
          <PanelTitle icon={<Building2 />} title="線下充值" />
          <div className="payment-account-list">
            {bankAccounts.map((account) => (
              <article key={account.id}>
                <strong>{account.name}</strong>
                <span>{account.bank} 路 {account.accountNo}</span>
              </article>
            ))}
          </div>
          <form className="form-grid topup-form" onSubmit={(event) => void submit(event)}>
            <label>
              <span>收款賬號</span>
              <select name="bankAccountId" required>
                {bankAccounts.map((account) => <option key={account.id} value={account.id}>{account.name}</option>)}
              </select>
            </label>
            <label><span>充值金額</span><input min="1" name="amountHkd" required type="number" /></label>
            <label><span>流水號</span><input name="transferSerialNo" required /></label>
            <label><span>匯款人名稱</span><input name="remitterName" required /></label>
            <label><span>匯款人電話</span><input name="remitterPhone" required /></label>
            <label><span>匯款時間</span><input name="remittedAt" required type="datetime-local" /></label>
            <label className="full"><span>匯款憑證</span><input accept="image/*,.pdf" name="voucher" type="file" /></label>
            <label className="full"><span>匯款備註</span><textarea name="remarks" /></label>
            <button disabled={submitting} type="submit">提交線下充值</button>
          </form>
        </section>
      </div>
    </div>
  );
}

function MemberTopupRecords({ requests, title }: { requests: TopupRequest[]; title: string }) {
  const pageSize = 15;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(requests.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = requests.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <section className="topup-records-block">
      <div className="panel-heading-row">
        <PanelTitle icon={<FileText />} title={title} />
        <span>鍏?{requests.length} 绛嗭紝姣忛爜 {pageSize} 绛?</span>
      </div>
      <div className="table-wrap compact-table">
        <table>
          <thead>
            <tr>
              <th>充值單</th>
              <th>方式</th>
              <th>金額</th>
              <th>付款資料</th>
              <th>狀態</th>
              <th>提交時間</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((request) => (
              <tr key={request.id}>
                <td><strong>{request.id}</strong></td>
                <td>{request.topupType === "online" ? "線上充值" : "線下充值"}</td>
                <td>HKD {request.amountHkd.toLocaleString("zh-HK")}</td>
                <td><strong>{request.paymentMethod || request.bankAccountName || request.bankAccountId || "-"}</strong><small>{request.transferSerialNo || request.voucherFileName || ""}</small></td>
                <td><mark>{request.statusLabel}</mark></td>
                <td>{new Date(request.createdAt).toLocaleString("zh-HK")}</td>
              </tr>
            ))}
            {pageItems.length === 0 ? <tr><td colSpan={6}>暫無充值記錄</td></tr> : null}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button disabled={currentPage <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))} type="button">上一頁</button>
        <span>第 {currentPage} / {totalPages} 頁</span>
        <button disabled={currentPage >= totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))} type="button">下一頁</button>
      </div>
    </section>
  );
}

function WalletLedger({ showMember, title, transactions }: { showMember: boolean; title: string; transactions: WalletTransaction[] }) {
  const pageSize = 15;
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const filtered = transactions.filter((item) => {
    const categoryMatched = category === "all" || item.category === category;
    const statusMatched = status === "all" || item.status === status;
    return categoryMatched && statusMatched;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const categories = Array.from(new Map(transactions.map((item) => [item.category, item.categoryLabel])).entries());
  const statuses = Array.from(new Map(transactions.map((item) => [item.status, item.statusLabel])).entries());

  return (
    <section className="panel full-span">
      <div className="panel-heading-row">
        <PanelTitle icon={<BookOpen />} title={title} />
        <span>共 {filtered.length} 筆，每頁 {pageSize} 筆</span>
      </div>
      <div className="ledger-toolbar">
        <label>
          <span>分類</span>
          <select onChange={(event) => { setCategory(event.target.value); setPage(1); }} value={category}>
            <option value="all">全部分類</option>
            {categories.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>
        <label>
          <span>狀態</span>
          <select onChange={(event) => { setStatus(event.target.value); setPage(1); }} value={status}>
            <option value="all">全部狀態</option>
            {statuses.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>
      </div>
      <div className="table-wrap compact-table ledger-table">
        <table>
          <thead>
            <tr>
              <th>流水</th>
              {showMember ? <th>會員</th> : null}
              <th>分類</th>
              <th>金額</th>
              <th>餘額</th>
              <th>關聯</th>
              <th>狀態</th>
              <th>時間</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <strong>{item.title}</strong>
                  <small>{item.description || item.id}</small>
                </td>
                {showMember ? (
                  <td>
                    <strong>{item.memberDisplayName || item.memberId}</strong>
                    <small>{item.memberUserCode || item.memberEmail || "-"}</small>
                  </td>
                ) : null}
                <td>{item.categoryLabel}</td>
                <td>
                  <strong className={item.direction === "credit" ? "amount-credit" : "amount-debit"}>
                    {item.direction === "credit" ? "+" : "-"} HKD {item.amountHkd.toLocaleString("zh-HK")}
                  </strong>
                </td>
                <td>{item.balanceAfterHkd === null ? "-" : `HKD ${item.balanceAfterHkd.toLocaleString("zh-HK")}`}</td>
                <td>
                  <strong>{item.relatedType || "-"}</strong>
                  <small>{item.relatedId || ""}</small>
                </td>
                <td><mark>{item.statusLabel}</mark></td>
                <td>{new Date(item.createdAt).toLocaleString("zh-HK")}</td>
              </tr>
            ))}
            {pageItems.length === 0 ? <tr><td colSpan={showMember ? 8 : 7}>暫無交易流水</td></tr> : null}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button disabled={currentPage <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))} type="button">上一頁</button>
        <span>第 {currentPage} / {totalPages} 頁</span>
        <button disabled={currentPage >= totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))} type="button">下一頁</button>
      </div>
    </section>
  );
}

function PanelTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return <div className="panel-title">{icon}<h2>{title}</h2></div>;
}

function StatusFilterBar({ active, counts, onChange, options }: { active: string; counts: Record<string, number>; onChange: (value: string) => void; options: { value: string; label: string }[] }) {
  return (
    <div className="status-filter-bar">
      {options.map((option) => (
        <button className={active === option.value ? "active" : ""} key={option.value} onClick={() => onChange(option.value)} type="button">
          {option.label}<span>{counts[option.value] ?? 0}</span>
        </button>
      ))}
    </div>
  );
}

function MemberProcurement({ onSubmit, submitting }: { onSubmit: (event: FormEvent<HTMLFormElement>, path: string, success: string) => Promise<void>; submitting: boolean }) {
  const [productUrl, setProductUrl] = useState("");
  const [title, setTitle] = useState("");
  const [spec, setSpec] = useState("");
  const [unitPriceJpy, setUnitPriceJpy] = useState("");
  const [productImageUrl, setProductImageUrl] = useState("");
  const [fetching, setFetching] = useState(false);
  const [message, setMessage] = useState("請輸入商品連結");

  async function fetchProduct() {
    if (!productUrl.trim()) {
      setMessage("請輸入商品連結");
      return;
    }
    setFetching(true);
    setMessage("正在獲取商品資料...");
    try {
      const payload = await postJson<{ item: ProductPreview; warning?: string }>("/api/procurement/fetch-product", { productUrl });
      if (payload.item.title) setTitle(payload.item.title);
      if (payload.item.spec) setSpec(payload.item.spec);
      if (payload.item.unitPriceJpy) setUnitPriceJpy(String(payload.item.unitPriceJpy));
      setMessage(payload.warning ?? "已獲取商品名稱、規格與單價");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "商品資料獲取失敗，請手動填寫");
    } finally {
      setFetching(false);
    }
  }

  function fetchImage() {
    if (!productImageUrl.trim()) return;
    setMessage("已載入商品圖片");
  }

  function previewUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setMessage("圖片大小不可超過 5MB");
      event.target.value = "";
      return;
    }
    setProductImageUrl(URL.createObjectURL(file));
    setMessage("鍦栫墖宸查伕鎿囷紝鎻愪氦鏅傝珛淇濈暀鍦栫墖鍦板潃鎴栫敱瀹㈡湇瑁滃厖");
  }

  return (
    <section className="panel full-span">
      <PanelTitle icon={<ShoppingBag />} title="线上随意购" />
      <form className="procurement-form online-shopping-form" onSubmit={(event) => void onSubmit(event, "/api/procurement/orders", "线上随意购需求已提交")}>
        <label className="full required">
          <span>商品連結</span>
          <div className="product-link-control">
            <input name="productUrl" onChange={(event) => setProductUrl(event.target.value)} placeholder="請輸入商品連結" required value={productUrl} />
            <button disabled={fetching || submitting} onClick={() => void fetchProduct()} type="button">獲取</button>
          </div>
          <small>{message}</small>
        </label>

        <label>
          <span>所屬購物平台</span>
          <select name="platform" defaultValue="Mercari 煤爐">
            <option>Mercari 煤爐</option>
            <option>Yahoo Auction</option>
            <option>Rakuten Rakuma</option>
            <option>Suruga-ya</option>
            <option>Amazon Japan</option>
            <option>其他</option>
          </select>
          <small>如未找到您需要購買的平台，提交訂單後將由客服填寫。</small>
        </label>

        <label className="required">
          <span>商品品名</span>
          <input name="title" onChange={(event) => setTitle(event.target.value)} placeholder="請輸入商品品名" required value={title} />
        </label>

        <label>
          <span>規格型號</span>
          <input name="spec" onChange={(event) => setSpec(event.target.value)} placeholder="請輸入規格型號" value={spec} />
        </label>

        <label className="required">
          <span>單價 (JPY¥)</span>
          <input min="1" name="unitPriceJpy" onChange={(event) => setUnitPriceJpy(event.target.value)} placeholder="請輸入單價 (JPY¥)" required type="number" value={unitPriceJpy} />
        </label>

        <label className="required">
          <span>購買數量</span>
          <input min="1" name="quantity" placeholder="請輸入購買數量" required type="number" />
        </label>

        <div className="image-upload-field procurement-image-block">
          <span>商品圖片</span>
          <div className="image-url-control">
            <input name="productImageUrl" onChange={(event) => setProductImageUrl(event.target.value)} placeholder="請輸入商品圖片地址" value={productImageUrl} />
            <button onClick={fetchImage} type="button">抓取</button>
          </div>
          <label className="upload-box">
            {productImageUrl ? <img alt="商品圖片預覽" src={productImageUrl} /> : <b>+</b>}
            <input accept="image/png,image/jpeg,image/jpg" onChange={previewUpload} type="file" />
          </label>
          <small>請上傳大小不超過 <b>5MB</b>，格式為 <b>png/jpg/jpeg</b> 的文件</small>
        </div>

        <label>
          <span>日本國內運費</span>
          <input min="0" name="localShippingJpy" placeholder="請輸入日本國內運費" type="number" />
        </label>

        <div className="readonly-amount">
          <span>商品金額</span>
          <strong>待報價</strong>
        </div>

        <div className="readonly-amount">
          <span>訂單處理費</span>
          <strong>待報價</strong>
        </div>

        <div className="readonly-amount">
          <span>總金額</span>
          <strong>待報價</strong>
        </div>

        <label className="full">
          <span>備註</span>
          <textarea name="remarks" placeholder="購買要求、日本本地運費說明等" />
        </label>

        <p className="form-warning full">* 如果下單時產生支付手續費和運費另算。</p>
        <button disabled={submitting} type="submit">提交线上随意购</button>
      </form>
    </section>
  );
}

type OfflineProcurementDraft = {
  itemName: string;
  itemType: string;
  spec: string;
  color: string;
  unitPriceJpy: string;
  quantity: string;
  imageUrl: string;
};

const emptyOfflineItem = (): OfflineProcurementDraft => ({
  itemName: "",
  itemType: "普通物資",
  spec: "",
  color: "",
  unitPriceJpy: "",
  quantity: "1",
  imageUrl: ""
});

function MemberOfflineProcurement({
  onSubmit,
  submitting
}: {
  onSubmit: (path: string, body: Record<string, unknown>, success: string) => Promise<void>;
  submitting: boolean;
}) {
  const [items, setItems] = useState<OfflineProcurementDraft[]>([emptyOfflineItem()]);
  const [message, setMessage] = useState("");
  const totalJpy = items.reduce((sum, item) => {
    const unitPrice = Number(item.unitPriceJpy || 0);
    const quantity = Number(item.quantity || 0);
    return sum + (Number.isFinite(unitPrice) && Number.isFinite(quantity) ? unitPrice * quantity : 0);
  }, 0);

  function updateItem(index: number, patch: Partial<OfflineProcurementDraft>) {
    setItems((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, ...patch } : item));
  }

  function addItem() {
    setItems((current) => [...current, emptyOfflineItem()]);
  }

  function removeItem(index: number) {
    setItems((current) => current.length === 1 ? current : current.filter((_, itemIndex) => itemIndex !== index));
  }

  function previewUpload(index: number, event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setMessage("圖片大小不可超過 5MB");
      event.target.value = "";
      return;
    }
    updateItem(index, { imageUrl: URL.createObjectURL(file) });
    setMessage("圖片已選擇；如需長期保存，請填入圖片地址");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const form = event.currentTarget;
    const body = Object.fromEntries(new FormData(form).entries());
    const normalizedItems = items.map((item) => ({
      ...item,
      unitPriceJpy: Number(item.unitPriceJpy),
      quantity: Number(item.quantity)
    }));
    const invalid = normalizedItems.some((item) => !item.itemName.trim() || !item.itemType.trim() || !item.imageUrl.trim() || !item.unitPriceJpy || item.unitPriceJpy < 1 || !item.quantity || item.quantity < 1);
    if (invalid) {
      setMessage("請完整填寫每件商品的名稱、類型、單價、數量和產品圖片");
      return;
    }
    await onSubmit("/api/procurement/offline-orders", { ...body, items: normalizedItems }, "线下随意购需求已提交");
    form.reset();
    setItems([emptyOfflineItem()]);
  }

  return (
    <section className="panel full-span">
      <PanelTitle icon={<PackagePlus />} title="线下随意购" />
      {message ? <div className="inline-error">{message}</div> : null}
      <form className="offline-procurement-form" onSubmit={(event) => void submit(event)}>
        <div className="offline-section-title">門店信息</div>
        <div className="offline-store-grid">
          <label><span>門店名稱</span><input name="storeName" placeholder="填寫店鋪名稱，必填" required /></label>
          <label><span>聯絡人</span><input name="storeContact" placeholder="填寫店鋪聯絡人姓名，必填" required /></label>
          <label><span>聯絡電話</span><input name="storePhone" placeholder="填寫店鋪聯絡人電話，必填" required /></label>
          <label className="wide"><span>門店地址</span><input name="storeAddress" placeholder="填寫門店地址，必填" required /></label>
        </div>

        <div className="offline-list-heading">
          <div>
            <strong>商品明細</strong>
            <small>貨幣：JPY，產品圖片必填，可添加多件商品。</small>
          </div>
          <div className="offline-total">商品總價(JPY)：<b>{totalJpy.toLocaleString("zh-HK")}</b></div>
        </div>

        <div className="offline-items-table">
          <div className="offline-items-head">
            <span>貨物名稱</span>
            <span>貨物類型</span>
            <span>規格型號</span>
            <span>顏色</span>
            <span>單價(JPY)</span>
            <span>數量</span>
            <span>產品圖片</span>
            <span>操作</span>
          </div>
          {items.map((item, index) => (
            <div className="offline-item-row" key={index}>
              <input onChange={(event) => updateItem(index, { itemName: event.target.value })} placeholder="必填" required value={item.itemName} />
              <select onChange={(event) => updateItem(index, { itemType: event.target.value })} required value={item.itemType}>
                <option>普通物資</option>
                <option>食品</option>
                <option>服飾鞋包</option>
                <option>玩具模型</option>
                <option>電器</option>
                <option>其他</option>
              </select>
              <input onChange={(event) => updateItem(index, { spec: event.target.value })} placeholder="選填" value={item.spec} />
              <input onChange={(event) => updateItem(index, { color: event.target.value })} placeholder="選填" value={item.color} />
              <input min="1" onChange={(event) => updateItem(index, { unitPriceJpy: event.target.value })} placeholder="必填" required type="number" value={item.unitPriceJpy} />
              <input min="1" onChange={(event) => updateItem(index, { quantity: event.target.value })} placeholder="必填" required type="number" value={item.quantity} />
              <div className="offline-image-cell">
                <input onChange={(event) => updateItem(index, { imageUrl: event.target.value })} placeholder="圖片地址，必填" required value={item.imageUrl} />
                <label>
                  上傳
                  <input accept="image/png,image/jpeg,image/jpg" onChange={(event) => previewUpload(index, event)} type="file" />
                </label>
              </div>
              <div className="row-actions">
                <button className="secondary" onClick={addItem} type="button">新增</button>
                <button className="danger" disabled={items.length === 1} onClick={() => removeItem(index)} type="button">刪除</button>
              </div>
            </div>
          ))}
        </div>

        <label className="offline-remarks">
          <span>訂單備註</span>
          <textarea name="remarks" placeholder="如有特殊要求，請填寫備註" />
        </label>
        <button disabled={submitting} type="submit">提交线下随意购</button>
      </form>
    </section>
  );
}

function MemberOrders({ action, orders, submitting }: { action: (path: string, success: string) => Promise<void>; orders: ProcurementOrder[]; submitting: boolean }) {
  return <OrderList action={action} orders={orders} showMemberActions submitting={submitting} title="代購訂單" />;
}

function AdminProcurement({ action, orders, submitting }: { action: (path: string, success: string) => Promise<void>; orders: ProcurementOrder[]; submitting: boolean }) {
  const stats = {
    pendingPayment: orders.filter((order) => order.status === "pending_payment").length,
    platformPendingOrder: orders.filter((order) => order.status === "platform_pending_order").length,
    platformPendingShipment: orders.filter((order) => order.status === "platform_pending_shipment").length,
    issue: orders.filter((order) => order.status === "issue").length
  };
  return (
    <>
      <section className="stat-grid full-span">
        <StatCard label="待付款" value={stats.pendingPayment} tone="orange" />
        <StatCard label="平台待下單" value={stats.platformPendingOrder} tone="blue" />
        <StatCard label="平台待發貨" value={stats.platformPendingShipment} tone="green" />
        <StatCard label="問題訂單" value={stats.issue} tone="dark" />
      </section>
      <OrderList action={action} orders={orders} showAdminActions submitting={submitting} title="代購處理列表" />
    </>
  );
}

function StatCard({ label, tone, value }: { label: string; tone: string; value: number }) {
  return <article className={`stat-card ${tone}`}><span>{label}</span><strong>{value}</strong></article>;
}

const ticketStatusOptions = [
  { value: "all", label: "全部" },
  { value: "pending", label: "待處理" },
  { value: "processing", label: "處理中" },
  { value: "replied", label: "已回覆" },
  { value: "closed", label: "已關閉" }
];

const ticketTypeOptions = [
  {
    value: "optimization",
    label: "優化建議",
    subtypes: ["活動相關", "商品相關", "功能優化建議", "其他"]
  },
  {
    value: "service",
    label: "工單服務",
    subtypes: ["服務相關問題", "活動相關問題", "平台功能異常諮詢", "其他"]
  }
];

function MemberTickets({
  onSubmit,
  submitting,
  tickets
}: {
  onSubmit: (path: string, body: Record<string, unknown>, success: string) => Promise<void>;
  submitting: boolean;
  tickets: SupportTicket[];
}) {
  const pageSize = 15;
  const [page, setPage] = useState(1);
  const [creating, setCreating] = useState(false);
  const [detail, setDetail] = useState<SupportTicket | null>(null);
  const [ticketType, setTicketType] = useState(ticketTypeOptions[0].value);
  const totalPages = Math.max(1, Math.ceil(tickets.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = tickets.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const currentType = ticketTypeOptions.find((option) => option.value === ticketType) ?? ticketTypeOptions[0];

  async function createTicket(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const body = Object.fromEntries(new FormData(form).entries());
    await onSubmit("/api/tickets", body, "工單已提交");
    form.reset();
    setCreating(false);
    setTicketType(ticketTypeOptions[0].value);
  }

  async function openTicket(ticket: SupportTicket) {
    setDetail(ticket);
    const payload = await loadJson<{ item: SupportTicket }>(`/api/tickets/${encodeURIComponent(ticket.id)}`, { item: ticket });
    setDetail(payload.item);
  }

  return (
    <section className="panel full-span">
      <div className="panel-heading-row">
        <PanelTitle icon={<ClipboardList />} title="工單服務" />
        <div className="panel-actions">
          <span>共 {tickets.length} 張工單，每頁 {pageSize} 筆</span>
          <button onClick={() => setCreating(true)} type="button"><Plus size={16} />新增工單</button>
        </div>
      </div>
      <div className="table-wrap compact-table">
        <table>
          <thead>
            <tr>
              <th>工單</th>
              <th>類型</th>
              <th>內容</th>
              <th>狀態</th>
              <th>更新時間</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((ticket) => (
              <tr key={ticket.id}>
                <td><strong>{ticket.id}</strong><small>{new Date(ticket.createdAt).toLocaleString("zh-HK")}</small></td>
                <td><strong>{ticket.typeLabel}</strong><small>{ticket.subtype}</small></td>
                <td><span className="line-clamp">{ticket.content}</span></td>
                <td><mark>{ticket.statusLabel}</mark></td>
                <td>{new Date(ticket.updatedAt).toLocaleString("zh-HK")}</td>
                <td><div className="row-actions"><button className="secondary" onClick={() => void openTicket(ticket)} type="button">查看</button></div></td>
              </tr>
            ))}
            {pageItems.length === 0 ? <tr><td colSpan={6}>暫無工單資料</td></tr> : null}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button disabled={currentPage <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))} type="button">上一頁</button>
        <span>第 {currentPage} / {totalPages} 頁</span>
        <button disabled={currentPage >= totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))} type="button">下一頁</button>
      </div>

      {creating ? (
        <div className="modal-backdrop">
          <div className="ticket-modal">
            <button className="modal-close" onClick={() => setCreating(false)} type="button">關閉</button>
            <section className="panel">
              <PanelTitle icon={<ClipboardList />} title="新增工單" />
              <form className="form-grid" onSubmit={(event) => void createTicket(event)}>
                <label>
                  <span>工單類型</span>
                  <select name="type" onChange={(event) => setTicketType(event.target.value)} value={ticketType}>
                    {ticketTypeOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </select>
                </label>
                <label>
                  <span>工單子類型</span>
                  <select name="subtype">
                    {currentType.subtypes.map((subtype) => <option key={subtype} value={subtype}>{subtype}</option>)}
                  </select>
                </label>
                <label className="full">
                  <span>工單內容</span>
                  <textarea name="content" placeholder="請輸入需要平台協助處理的內容" required />
                </label>
                <button disabled={submitting} type="submit">提交工單</button>
              </form>
            </section>
          </div>
        </div>
      ) : null}

      {detail ? (
        <div className="modal-backdrop">
          <div className="ticket-modal">
            <button className="modal-close" onClick={() => setDetail(null)} type="button">關閉</button>
            <section className="panel ticket-detail">
              <PanelTitle icon={<ClipboardList />} title="工單詳情" />
              <div className="ticket-meta">
                <strong>{detail.id}</strong>
                <mark>{detail.statusLabel}</mark>
                <span>{detail.typeLabel} / {detail.subtype}</span>
                <span>{new Date(detail.updatedAt).toLocaleString("zh-HK")}</span>
              </div>
              <div className="message-thread">
                {(detail.messages?.length ? detail.messages : [{ id: "content", ticketId: detail.id, actorType: "member", actorId: detail.memberId, message: detail.content, createdAt: detail.createdAt }]).map((message) => (
                  <article className={message.actorType === "staff" ? "平台客服" : "會員"} key={message.id}>
                    <strong>{message.actorType === "staff" ? "平台客服" : "會員"} 路 {message.actorId}</strong>
                    <p>{message.message}</p>
                    <small>{new Date(message.createdAt).toLocaleString("zh-HK")}</small>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function AdminTickets({
  onSubmit,
  submitting,
  tickets
}: {
  onSubmit: (path: string, body: Record<string, unknown>, success: string) => Promise<void>;
  submitting: boolean;
  tickets: SupportTicket[];
}) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [detail, setDetail] = useState<SupportTicket | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const filtered = statusFilter === "all" ? tickets : tickets.filter((ticket) => ticket.status === statusFilter);
  const counts = tickets.reduce<Record<string, number>>((acc, ticket) => {
    acc.all = (acc.all ?? 0) + 1;
    acc[ticket.status] = (acc[ticket.status] ?? 0) + 1;
    return acc;
  }, { all: 0 });

  async function openTicket(ticket: SupportTicket) {
    setLoadingDetail(true);
    setDetail(ticket);
    try {
      const payload = await loadJson<{ item: SupportTicket }>(`/api/admin/tickets/${encodeURIComponent(ticket.id)}`, { item: ticket });
      setDetail(payload.item);
    } finally {
      setLoadingDetail(false);
    }
  }

  async function submitReply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!detail) return;
    const form = event.currentTarget;
    const body = Object.fromEntries(new FormData(form).entries());
    await onSubmit(`/api/admin/tickets/${encodeURIComponent(detail.id)}/reply`, body, "工單已回覆");
    form.reset();
    await openTicket(detail);
  }

  async function updateStatus(status: string) {
    if (!detail) return;
    await onSubmit(`/api/admin/tickets/${encodeURIComponent(detail.id)}/status`, { status }, "工單狀態已更新");
    await openTicket(detail);
  }

  return (
    <section className="panel full-span">
      <div className="panel-heading-row">
        <PanelTitle icon={<ClipboardList />} title="客戶工單" />
        <span>共 {tickets.length} 張工單</span>
      </div>
      <StatusFilterBar active={statusFilter} counts={counts} onChange={setStatusFilter} options={ticketStatusOptions} />
      <div className="table-wrap compact-table">
        <table>
          <thead>
            <tr>
              <th>工單</th>
              <th>會員</th>
              <th>類型</th>
              <th>內容</th>
              <th>狀態</th>
              <th>更新時間</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((ticket) => (
              <tr key={ticket.id}>
                <td><strong>{ticket.id}</strong><small>{new Date(ticket.createdAt).toLocaleString("zh-HK")}</small></td>
                <td>{ticket.memberId}</td>
                <td><strong>{ticket.typeLabel}</strong><small>{ticket.subtype}</small></td>
                <td><span className="line-clamp">{ticket.content}</span></td>
                <td><mark>{ticket.statusLabel}</mark></td>
                <td>{new Date(ticket.updatedAt).toLocaleString("zh-HK")}</td>
                <td><div className="row-actions"><button className="secondary" onClick={() => void openTicket(ticket)} type="button">查看</button></div></td>
              </tr>
            ))}
            {filtered.length === 0 ? <tr><td colSpan={7}>暫無工單資料</td></tr> : null}
          </tbody>
        </table>
      </div>

      {detail ? (
        <div className="modal-backdrop">
          <div className="ticket-modal">
            <button className="modal-close" onClick={() => setDetail(null)} type="button">關閉</button>
            <section className="panel ticket-detail">
              <PanelTitle icon={<ClipboardList />} title="工單詳情" />
              <div className="ticket-meta">
                <strong>{detail.id}</strong>
                <mark>{detail.statusLabel}</mark>
                <span>{detail.typeLabel} / {detail.subtype}</span>
                <span>{new Date(detail.updatedAt).toLocaleString("zh-HK")}</span>
              </div>
              {loadingDetail ? <div className="empty-state">載入中...</div> : null}
              <div className="message-thread">
                {(detail.messages?.length ? detail.messages : [{ id: "content", ticketId: detail.id, actorType: "member", actorId: detail.memberId, message: detail.content, createdAt: detail.createdAt }]).map((message) => (
                  <article className={message.actorType === "staff" ? "平台客服" : "會員"} key={message.id}>
                    <strong>{message.actorType === "staff" ? "平台客服" : "會員"} 路 {message.actorId}</strong>
                    <p>{message.message}</p>
                    <small>{new Date(message.createdAt).toLocaleString("zh-HK")}</small>
                  </article>
                ))}
              </div>
              <form className="ticket-reply-form" onSubmit={(event) => void submitReply(event)}>
                <textarea disabled={detail.status === "closed"} name="message" placeholder="輸入回覆內容" required />
                <button disabled={submitting || detail.status === "closed"} type="submit">回覆工單</button>
              </form>
            </section>
            <section className="panel ticket-status-panel">
              <PanelTitle icon={<ShieldCheck />} title="處理狀態" />
              <div className="detail-actions">
                <button className="secondary" disabled={submitting} onClick={() => void updateStatus("processing")} type="button">標記處理中</button>
                <button disabled={submitting} onClick={() => void updateStatus("replied")} type="button">標記已回覆</button>
                <button className="danger" disabled={submitting} onClick={() => void updateStatus("closed")} type="button">關閉工單</button>
              </div>
            </section>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function AdminPackageClaimList({
  onSubmit,
  packages,
  submitting
}: {
  onSubmit: (path: string, body: Record<string, unknown>, success: string) => Promise<void>;
  packages: InboundPackage[];
  submitting: boolean;
}) {
  const pageSize = 15;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(packages.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = packages.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  async function claimPackage(event: FormEvent<HTMLFormElement>, item: InboundPackage) {
    event.preventDefault();
    const body = Object.fromEntries(new FormData(event.currentTarget).entries());
    await onSubmit(`/api/admin/inbound/packages/${encodeURIComponent(item.id)}/claim`, body, "包裹已認領");
  }

  return (
    <section className="panel full-span">
      <div className="panel-heading-row">
        <PanelTitle icon={<Search />} title="包裹認領列表" />
        <span>共 {packages.length} 筆，每頁 {pageSize} 筆</span>
      </div>
      <div className="table-wrap compact-table package-claim-table">
        <table>
          <thead>
            <tr>
              <th>包裹</th>
              <th>物流單號</th>
              <th>倉庫</th>
              <th>商品</th>
              <th>會員</th>
              <th>狀態</th>
              <th>入庫資料</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <strong>{item.customerPackageNo}</strong>
                  <small>入庫號：{item.warehouseInboundNo}</small>
                </td>
                <td>
                  <strong>{item.japaneseTrackingNo}</strong>
                  <small>{item.senderName || item.platform || "-"}</small>
                </td>
                <td>{item.warehouseName}</td>
                <td>
                  <strong>{item.itemName}</strong>
                  <small>數量：{item.quantity}{item.remarks ? ` · ${item.remarks}` : ""}</small>
                </td>
                <td>
                  <strong>{item.memberId || "未匹配"}</strong>
                  <small>識別碼：{item.recipientCode || "-"}</small>
                </td>
                <td><mark>{inboundStatusText(item.status, item.statusLabel)}</mark></td>
                <td>
                  <strong>{item.inboundedAt ? "已入庫" : "待入庫"}</strong>
                  <small>{item.shelfCode ? `貨架：${item.shelfCode}` : "未上架"}</small>
                </td>
                <td>
                  {item.memberId ? (
                    <span className="muted-text">已匹配</span>
                  ) : (
                    <form className="claim-inline-form" onSubmit={(event) => void claimPackage(event, item)}>
                      <input name="memberCode" placeholder="會員識別碼" required />
                      <button disabled={submitting} type="submit">認領</button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
            {pageItems.length === 0 ? <tr><td colSpan={8}>沒有符合條件的會員資料</td></tr> : null}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button disabled={currentPage <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))} type="button">上一頁</button>
        <span>第 {currentPage} / {totalPages} 頁</span>
        <button disabled={currentPage >= totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))} type="button">下一頁</button>
      </div>
    </section>
  );
}

function inboundStatusText(status: string, fallback: string) {
  const labels: Record<string, string> = {
    forecasted: "待入庫",
    inbounded: "已入庫",
    claimed: "已認領",
    consolidated: "寰呭悎绠?",
    packed: "鎵撳寘涓?",
    outbounded: "宸插嚭搴?",
    orphan: "待認領",
    destroyed: "宸查姺姣€"
  };
  return labels[status] ?? fallback;
}

function AdminWarehouses({
  onDelete,
  onSubmit,
  submitting,
  warehouses
}: {
  onDelete: (path: string, success: string) => Promise<void>;
  onSubmit: (path: string, body: Record<string, unknown>, success: string) => Promise<void>;
  submitting: boolean;
  warehouses: WarehouseRecord[];
}) {
  const [editing, setEditing] = useState<WarehouseRecord | null>(null);
  const [creating, setCreating] = useState(false);
  const current = editing;
  const showModal = creating || Boolean(editing);

  function closeModal() {
    setCreating(false);
    setEditing(null);
  }

  async function submitWarehouse(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = Object.fromEntries(new FormData(event.currentTarget).entries());
    await onSubmit(
      current ? `/api/admin/warehouses/${encodeURIComponent(current.id)}` : "/api/admin/warehouses",
      body,
      current ? "倉庫資料已更新" : "倉庫已新增"
    );
    closeModal();
  }

  async function toggleWarehouseStatus(item: WarehouseRecord) {
    await onSubmit(
      `/api/admin/warehouses/${encodeURIComponent(item.id)}`,
      warehouseFormBody(item, { status: item.status === "active" ? "disabled" : "active" }),
      item.status === "active" ? "倉庫已停用" : "倉庫已啟用"
    );
  }

  return (
    <section className="panel full-span">
      <div className="panel-heading-row">
        <PanelTitle icon={<Warehouse />} title="倉庫管理" />
        <div className="panel-actions">
          <span>共 {warehouses.length} 個倉庫</span>
          <button onClick={() => setCreating(true)} type="button"><Plus size={16} />新增倉庫</button>
        </div>
      </div>
      <div className="table-wrap compact-table warehouse-admin-table">
        <table>
          <thead>
            <tr>
              <th>倉庫</th>
              <th>類型</th>
              <th>地址</th>
              <th>聯絡</th>
              <th>狀態</th>
              <th>入出庫</th>
              <th>排序</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {warehouses.map((item) => (
              <tr key={item.id}>
                <td>
                  <strong>{item.name}</strong>
                  <small>{item.code}{item.isDefault ? " · 默認倉" : ""}</small>
                </td>
                <td>{item.type}</td>
                <td>
                  <strong>{item.country} {item.postalCode || ""}</strong>
                  <small>{item.address}</small>
                </td>
                <td>
                  <strong>{item.contactName || "-"}</strong>
                  <small>{item.phone || "-"}</small>
                </td>
                <td><mark>{item.statusLabel}</mark></td>
                <td>
                  <span>{item.allowInbound ? "可入庫" : "不可入庫"}</span>
                  <small>{item.allowOutbound ? "可出庫" : "不可出庫"}</small>
                </td>
                <td>{item.sortOrder}</td>
                <td>
                  <div className="row-actions">
                    <button className="secondary" onClick={() => setEditing(item)} type="button"><Pencil size={15} />編輯</button>
                    <button className="secondary" disabled={submitting} onClick={() => void toggleWarehouseStatus(item)} type="button">{item.status === "active" ? "停用" : "啟用"}</button>
                    <button className="danger" disabled={submitting} onClick={() => void onDelete(`/api/admin/warehouses/${encodeURIComponent(item.id)}/delete`, "倉庫已刪除")} type="button"><Trash2 size={15} />刪除</button>
                  </div>
                </td>
              </tr>
            ))}
            {warehouses.length === 0 ? <tr><td colSpan={8}>暫無倉庫資料</td></tr> : null}
          </tbody>
        </table>
      </div>

      {showModal ? (
        <div className="modal-backdrop">
          <div className="ticket-modal">
            <button className="modal-close" onClick={closeModal} type="button">關閉</button>
            <section className="panel">
              <PanelTitle icon={<Warehouse />} title={current ? "編輯倉庫" : "新增倉庫"} />
              <form className="form-grid" onSubmit={(event) => void submitWarehouse(event)}>
                <label><span>倉庫名稱</span><input defaultValue={current?.name ?? ""} name="name" required /></label>
                <label><span>倉庫編碼</span><input defaultValue={current?.code ?? ""} name="code" placeholder="FUNABASHI" required /></label>
                <label>
                  <span>倉庫類型</span>
                  <select defaultValue={current?.type ?? "集運倉"} name="type">
                    <option>集運倉</option>
                    <option>門市</option>
                    <option>退貨倉</option>
                    <option>臨時倉</option>
                  </select>
                </label>
                <label>
                  <span>狀態</span>
                  <select defaultValue={current?.status ?? "active"} name="status">
                    <option value="active">啟用</option>
                    <option value="disabled">停用</option>
                  </select>
                </label>
                <label><span>國家/地區</span><input defaultValue={current?.country ?? "日本"} name="country" required /></label>
                <label><span>郵編</span><input defaultValue={current?.postalCode ?? ""} name="postalCode" /></label>
                <label className="full"><span>地址</span><input defaultValue={current?.address ?? ""} name="address" required /></label>
                <label><span>電話</span><input defaultValue={current?.phone ?? ""} name="phone" /></label>
                <label><span>聯絡人</span><input defaultValue={current?.contactName ?? ""} name="contactName" /></label>
                <label><span>排序</span><input defaultValue={current?.sortOrder ?? 100} min="0" name="sortOrder" type="number" /></label>
                <div className="full checkbox-row">
                  <label><input defaultChecked={current?.isDefault ?? false} name="isDefault" type="checkbox" />默認倉庫</label>
                  <label><input defaultChecked={current?.allowInbound ?? true} name="allowInbound" type="checkbox" />允許入庫</label>
                  <label><input defaultChecked={current?.allowOutbound ?? true} name="allowOutbound" type="checkbox" />允許出庫</label>
                </div>
                <label className="full"><span>備註</span><textarea defaultValue={current?.remarks ?? ""} name="remarks" /></label>
                <button disabled={submitting} type="submit">{current ? "保存倉庫" : "新增倉庫"}</button>
              </form>
            </section>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function warehouseFormBody(item: WarehouseRecord, overrides: Partial<WarehouseRecord> = {}) {
  const next = { ...item, ...overrides };
  return {
    code: next.code,
    name: next.name,
    type: next.type,
    country: next.country,
    postalCode: next.postalCode ?? "",
    address: next.address,
    phone: next.phone ?? "",
    contactName: next.contactName ?? "",
    status: next.status,
    isDefault: next.isDefault,
    allowInbound: next.allowInbound,
    allowOutbound: next.allowOutbound,
    sortOrder: next.sortOrder,
    remarks: next.remarks ?? ""
  };
}

function AdminExchangeRates({
  onSubmit,
  rates,
  submitting
}: {
  onSubmit: (path: string, body: Record<string, unknown>, success: string) => Promise<void>;
  rates: ExchangeRate[];
  submitting: boolean;
}) {
  const [editing, setEditing] = useState<ExchangeRate | null>(null);

  async function submitRate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editing) return;
    const body = Object.fromEntries(new FormData(event.currentTarget).entries());
    await onSubmit(`/api/admin/exchange-rates/${encodeURIComponent(editing.id)}`, body, "匯率已更新");
    setEditing(null);
  }

  return (
    <section className="panel full-span">
      <div className="panel-heading-row">
        <PanelTitle icon={<RefreshCw />} title="匯率管理" />
        <span>默認貨幣：日元-港幣、日元-人民幣、日元-澳幣</span>
      </div>
      <div className="table-wrap compact-table exchange-rate-table">
        <table>
          <thead>
            <tr>
              <th>貨幣對</th>
              <th>基準貨幣</th>
              <th>目標貨幣</th>
              <th>匯率</th>
              <th>狀態</th>
              <th>備註</th>
              <th>更新時間</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {rates.map((rate) => (
              <tr key={rate.id}>
                <td><strong>{rate.baseCurrency}-{rate.quoteCurrency}</strong><small>{rate.baseCurrencyName} - {rate.quoteCurrencyName}</small></td>
                <td>{rate.baseCurrency}</td>
                <td>{rate.quoteCurrency}</td>
                <td><strong>{rate.rate.toFixed(6)}</strong><small>1 {rate.baseCurrency} = {rate.rate.toFixed(6)} {rate.quoteCurrency}</small></td>
                <td><mark>{rate.statusLabel}</mark></td>
                <td><span className="line-clamp">{rate.note || "-"}</span></td>
                <td>{new Date(rate.updatedAt).toLocaleString("zh-HK")}</td>
                <td><div className="row-actions"><button className="secondary" onClick={() => setEditing(rate)} type="button"><Pencil size={15} />編輯</button></div></td>
              </tr>
            ))}
            {rates.length === 0 ? <tr><td colSpan={8}>暫無匯率資料</td></tr> : null}
          </tbody>
        </table>
      </div>

      {editing ? (
        <div className="modal-backdrop">
          <div className="ticket-modal">
            <button className="modal-close" onClick={() => setEditing(null)} type="button">關閉</button>
            <section className="panel">
              <PanelTitle icon={<RefreshCw />} title="編輯匯率" />
              <form className="form-grid" onSubmit={(event) => void submitRate(event)}>
                <label><span>貨幣對</span><input readOnly value={`${editing.baseCurrency}-${editing.quoteCurrency}`} /></label>
                <label><span>匯率</span><input defaultValue={editing.rate} min="0.000001" name="rate" required step="0.000001" type="number" /></label>
                <label>
                  <span>狀態</span>
                  <select defaultValue={editing.status} name="status">
                    <option value="active">啟用</option>
                    <option value="disabled">停用</option>
                  </select>
                </label>
                <label className="full"><span>備註</span><textarea defaultValue={editing.note ?? ""} name="note" /></label>
                <button disabled={submitting} type="submit">保存匯率</button>
              </form>
            </section>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function AdminStaffAccounts({
  departments,
  onDelete,
  onSubmit,
  roles,
  staff,
  submitting
}: {
  departments: StaffDepartment[];
  onDelete: (path: string, success: string) => Promise<void>;
  onSubmit: (path: string, body: Record<string, unknown>, success: string) => Promise<void>;
  roles: StaffRole[];
  staff: StaffAccount[];
  submitting: boolean;
}) {
  const [editing, setEditing] = useState<StaffAccount | null>(null);
  const [creating, setCreating] = useState(false);
  const current = editing;
  const showModal = creating || Boolean(editing);

  function closeModal() {
    setCreating(false);
    setEditing(null);
  }

  async function submitStaff(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = Object.fromEntries(new FormData(event.currentTarget).entries());
    await onSubmit(current ? `/api/admin/staff/${encodeURIComponent(current.id)}` : "/api/admin/staff", body, current ? "員工帳號已更新" : "員工帳號已新增");
    closeModal();
  }

  return (
    <section className="panel full-span">
      <div className="panel-heading-row">
        <PanelTitle icon={<UserCog />} title="員工帳號" />
        <div className="panel-actions">
          <span>共 {staff.length} 名員工，每頁 15 筆</span>
          <button onClick={() => setCreating(true)} type="button"><Plus size={16} />新增員工</button>
        </div>
      </div>
      <div className="table-wrap compact-table admin-staff-table">
        <table>
          <thead>
            <tr>
              <th>員工</th>
              <th>部門</th>
              <th>角色</th>
              <th>狀態</th>
              <th>最後登入</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((item) => (
              <tr key={item.id}>
                <td><strong>{item.displayName}</strong><small>{item.email}</small></td>
                <td>{item.departmentName ?? "-"}</td>
                <td>{item.roleName ?? "-"}</td>
                <td><mark>{item.statusLabel}</mark></td>
                <td>{item.lastLoginAt ? new Date(item.lastLoginAt).toLocaleString("zh-HK") : "未登入"}</td>
                <td>
                  <div className="row-actions">
                    <button className="secondary" onClick={() => setEditing(item)} type="button"><Pencil size={15} />編輯</button>
                    <button className="danger" disabled={submitting} onClick={() => void onDelete(`/api/admin/staff/${encodeURIComponent(item.id)}/delete`, "員工帳號已刪除")} type="button"><Trash2 size={15} />刪除</button>
                  </div>
                </td>
              </tr>
            ))}
            {staff.length === 0 ? <tr><td colSpan={6}>暫無員工資料</td></tr> : null}
          </tbody>
        </table>
      </div>

      {showModal ? (
        <div className="modal-backdrop">
          <div className="ticket-modal">
            <button className="modal-close" onClick={closeModal} type="button">關閉</button>
            <section className="panel">
              <PanelTitle icon={<UserCog />} title={current ? "編輯員工" : "新增員工"} />
              <form className="form-grid" onSubmit={(event) => void submitStaff(event)}>
                <label><span>員工名稱</span><input defaultValue={current?.displayName ?? ""} name="displayName" required /></label>
                <label><span>電郵</span><input defaultValue={current?.email ?? ""} name="email" required type="email" /></label>
                <label>
                  <span>部門</span>
                  <select defaultValue={current?.departmentId ?? departments[0]?.id ?? ""} name="departmentId" required>
                    {departments.map((department) => <option key={department.id} value={department.id}>{department.name}</option>)}
                  </select>
                </label>
                <label>
                  <span>角色</span>
                  <select defaultValue={current?.roleId ?? roles[0]?.id ?? ""} name="roleId" required>
                    {roles.map((role) => <option key={role.id} value={role.id}>{role.name}</option>)}
                  </select>
                </label>
                <label>
                  <span>狀態</span>
                  <select defaultValue={current?.status ?? "active"} name="status">
                    <option value="active">啟用</option>
                    <option value="disabled">停用</option>
                  </select>
                </label>
                <button disabled={submitting} type="submit">{current ? "保存修改" : "新增員工"}</button>
              </form>
            </section>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function AdminRoleManagement({
  onDelete,
  onSubmit,
  roles,
  submitting
}: {
  onDelete: (path: string, success: string) => Promise<void>;
  onSubmit: (path: string, body: Record<string, unknown>, success: string) => Promise<void>;
  roles: StaffRole[];
  submitting: boolean;
}) {
  const [editing, setEditing] = useState<StaffRole | null>(null);
  const [creating, setCreating] = useState(false);
  const current = editing;
  const showModal = creating || Boolean(editing);
  const permissionGroups = adminMenu.map((group) => ({
    title: group.title,
    items: group.items.map((item) => ({ value: item.id, label: item.label }))
  }));

  function closeModal() {
    setCreating(false);
    setEditing(null);
  }

  async function submitRole(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const body = Object.fromEntries(new FormData(form).entries());
    const permissions = Array.from(form.querySelectorAll<HTMLInputElement>("input[name='permissions']:checked")).map((input) => input.value);
    await onSubmit(current ? `/api/admin/roles/${encodeURIComponent(current.id)}` : "/api/admin/roles", { ...body, permissions }, current ? "角色權限已更新" : "角色權限已新增");
    closeModal();
  }

  return (
    <section className="panel full-span">
      <div className="panel-heading-row">
        <PanelTitle icon={<ShieldCheck />} title="角色權限" />
        <div className="panel-actions">
          <span>共 {roles.length} 個角色</span>
          <button onClick={() => setCreating(true)} type="button"><Plus size={16} />新增角色</button>
        </div>
      </div>
      <div className="table-wrap compact-table admin-role-table">
        <table>
          <thead>
            <tr>
              <th>角色</th>
              <th>說明</th>
              <th>權限數</th>
              <th>狀態</th>
              <th>更新時間</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id}>
                <td><strong>{role.name}</strong></td>
                <td>{role.description || "-"}</td>
                <td>{role.permissionCount}</td>
                <td><mark>{role.statusLabel}</mark></td>
                <td>{new Date(role.updatedAt).toLocaleString("zh-HK")}</td>
                <td>
                  <div className="row-actions">
                    <button className="secondary" onClick={() => setEditing(role)} type="button"><Pencil size={15} />編輯</button>
                    <button className="danger" disabled={submitting} onClick={() => void onDelete(`/api/admin/roles/${encodeURIComponent(role.id)}/delete`, "角色權限已刪除")} type="button"><Trash2 size={15} />刪除</button>
                  </div>
                </td>
              </tr>
            ))}
            {roles.length === 0 ? <tr><td colSpan={6}>暫無角色資料</td></tr> : null}
          </tbody>
        </table>
      </div>

      {showModal ? (
        <div className="modal-backdrop">
          <div className="ticket-modal">
            <button className="modal-close" onClick={closeModal} type="button">關閉</button>
            <section className="panel">
              <PanelTitle icon={<ShieldCheck />} title={current ? "編輯角色" : "新增角色"} />
              <form className="form-grid" onSubmit={(event) => void submitRole(event)}>
                <label><span>角色名稱</span><input defaultValue={current?.name ?? ""} name="name" required /></label>
                <label>
                  <span>狀態</span>
                  <select defaultValue={current?.status ?? "active"} name="status">
                    <option value="active">啟用</option>
                    <option value="disabled">停用</option>
                  </select>
                </label>
                <label className="full"><span>角色說明</span><textarea defaultValue={current?.description ?? ""} name="description" /></label>
                <div className="full permission-groups">
                  <span>菜單權限</span>
                  {permissionGroups.map((group) => (
                    <fieldset key={group.title}>
                      <legend>{group.title}</legend>
                      <div>
                        {group.items.map((option) => (
                          <label key={option.value}>
                            <input defaultChecked={current?.permissions.includes(option.value) ?? false} name="permissions" type="checkbox" value={option.value} />
                            <strong>{option.label}</strong>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                    ))}
                </div>
                <button disabled={submitting} type="submit">{current ? "保存修改" : "新增角色"}</button>
              </form>
            </section>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function AdminMembers({ members }: { members: AdminMember[] }) {
  const [keyword, setKeyword] = useState("");
  const normalizedKeyword = keyword.trim().toLowerCase();
  const filteredMembers = normalizedKeyword
    ? members.filter((member) => {
      const fields = [member.displayName, member.email, member.userCode, member.levelCode];
      return fields.some((field) => field.toLowerCase().includes(normalizedKeyword));
    })
    : members;
  const levelCounts = members.reduce<Record<string, number>>((acc, member) => {
    acc[member.levelCode] = (acc[member.levelCode] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <section className="panel full-span">
      <div className="panel-heading-row">
        <PanelTitle icon={<UsersRound />} title="會員管理" />
        <span>共 {members.length} 名會員</span>
      </div>
      <div className="member-summary-grid">
        <article><span>會員總數</span><strong>{members.length}</strong></article>
        <article><span>總餘額</span><strong>HKD {members.reduce((sum, member) => sum + member.balanceHkd, 0).toLocaleString("zh-HK")}</strong></article>
        <article><span>最高等級</span><strong>{Object.keys(levelCounts).sort().at(-1) ?? "-"}</strong></article>
      </div>
      <div className="member-toolbar">
        <label>
          <Search size={16} />
          <input
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="搜尋會員名稱、會員識別碼"
            type="search"
            value={keyword}
          />
        </label>
        <span>顯示 {filteredMembers.length} 筆</span>
      </div>
      <div className="table-wrap compact-table">
        <table>
          <thead>
            <tr>
              <th>會員</th>
              <th>識別碼</th>
              <th>等級</th>
              <th>餘額</th>
              <th>代購訂單</th>
              <th>入庫包裹</th>
              <th>充值記錄</th>
              <th>註冊時間</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
              <tr key={member.id}>
                <td>
                  <strong>{member.displayName}</strong>
                  <small>{member.email}</small>
                </td>
                <td><mark>{member.userCode}</mark></td>
                <td>{member.levelCode}</td>
                <td>HKD {member.balanceHkd.toLocaleString("zh-HK")}</td>
                <td>{member.orderCount}</td>
                <td>{member.packageCount}</td>
                <td>{member.topupCount}</td>
                <td>{new Date(member.createdAt).toLocaleString("zh-HK")}</td>
              </tr>
            ))}
            {filteredMembers.length === 0 ? (
              <tr>
                <td colSpan={8}>沒有符合條件的會員資料</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function OrderList({ action, orders, showAdminActions, showMemberActions, submitting, title }: { action: (path: string, success: string) => Promise<void>; orders: ProcurementOrder[]; showAdminActions?: boolean; showMemberActions?: boolean; submitting: boolean; title: string }) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [detail, setDetail] = useState<ProcurementOrder | null>(null);
  const filtered = statusFilter === "all" ? orders : orders.filter((order) => order.status === statusFilter);
  const counts = orders.reduce<Record<string, number>>((acc, order) => {
    acc.all = (acc.all ?? 0) + 1;
    acc[order.status] = (acc[order.status] ?? 0) + 1;
    return acc;
  }, { all: 0 });

  return (
    <section className="panel full-span">
      <PanelTitle icon={<PackageCheck />} title={title} />
      <StatusFilterBar active={statusFilter} counts={counts} onChange={setStatusFilter} options={procurementStatusFilters} />
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>訂單</th>
              <th>商品</th>
              <th>平台</th>
              <th>報價</th>
              <th>狀態</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={6}>暫無代購訂單</td></tr>
            ) : filtered.map((order) => (
              <tr key={order.id}>
                <td><strong>{order.id}</strong><small>{new Date(order.updatedAt).toLocaleString("zh-HK")}</small></td>
                <td>
                  <mark>{order.orderType === "offline" ? "線下隨意購" : "線上隨意購"}</mark>
                  {order.productUrl ? <a className="product-title-link" href={order.productUrl} rel="noreferrer" target="_blank">{order.title}</a> : <span>{order.title}</span>}
                  <small>{order.spec || order.remarks || "未填備註"}</small>
                </td>
                <td>{order.platform}</td>
                <td>{order.quotedTotalHkd ? `HKD ${order.quotedTotalHkd}` : "待報價"}</td>
                <td><mark>{order.statusLabel}</mark></td>
                <td>
                  <div className="row-actions">
                    <button className="secondary" onClick={() => setDetail(order)} type="button">查看</button>
                    {showMemberActions && order.status === "pending_payment" && order.quotedTotalHkd ? <button disabled={submitting} onClick={() => void action(`/api/procurement/orders/${encodeURIComponent(order.id)}/pay`, "已付款，等待平台下單")} type="button">餘額付款</button> : null}
                    {showMemberActions && !["shipped", "completed", "cancelled"].includes(order.status) ? <button className="secondary" disabled={submitting} onClick={() => void action(`/api/procurement/orders/${encodeURIComponent(order.id)}/cancel`, "訂單已取消")} type="button">取消</button> : null}
                    {showAdminActions && order.status === "platform_pending_order" ? <button disabled={submitting} onClick={() => void action(`/api/admin/procurement/orders/${encodeURIComponent(order.id)}/mark-purchased`, "已標記平台待發貨")} type="button">標記待發貨</button> : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {detail ? (
        <div className="modal-backdrop">
          <div className="ticket-modal procurement-detail-modal">
            <button className="modal-close" onClick={() => setDetail(null)} type="button">關閉</button>
            <section className="panel">
              <PanelTitle icon={<PackageCheck />} title="代購訂單詳情" />
              <div className="order-detail-grid">
                <article><span>訂單編號</span><strong>{detail.id}</strong></article>
                <article><span>訂單類型</span><strong>{detail.orderType === "offline" ? "線下隨意購" : "線上隨意購"}</strong></article>
                <article><span>狀態</span><strong>{detail.statusLabel}</strong></article>
                <article><span>應付金額</span><strong>{detail.quotedTotalHkd ? `HKD ${detail.quotedTotalHkd}` : "待報價"}</strong></article>
              </div>
              {detail.orderType === "offline" ? (
                <>
                  <div className="order-detail-section">
                    <h3>門店信息</h3>
                    <p><b>門店名稱：</b>{detail.storeName}</p>
                    <p><b>聯絡人：</b>{detail.storeContact}</p>
                    <p><b>聯絡電話：</b>{detail.storePhone}</p>
                    <p><b>門店地址：</b>{detail.storeAddress}</p>
                  </div>
                  <div className="table-wrap compact-table">
                    <table>
                      <thead>
                        <tr>
                          <th>商品</th>
                          <th>類型</th>
                          <th>規格/顏色</th>
                          <th>單價</th>
                          <th>數量</th>
                          <th>圖片</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(detail.items ?? []).map((item) => (
                          <tr key={item.id}>
                            <td><strong>{item.itemName}</strong></td>
                            <td>{item.itemType}</td>
                            <td>{[item.spec, item.color].filter(Boolean).join(" / ") || "-"}</td>
                            <td>JPY {item.unitPriceJpy.toLocaleString("zh-HK")}</td>
                            <td>{item.quantity}</td>
                            <td><a href={item.imageUrl} rel="noreferrer" target="_blank">查看圖片</a></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <div className="order-detail-section">
                  <h3>商品信息</h3>
                  <p><b>商品名稱：</b>{detail.title}</p>
                  <p><b>規格：</b>{detail.spec || "-"}</p>
                  <p><b>商品連結：</b>{detail.productUrl ? <a href={detail.productUrl} rel="noreferrer" target="_blank">{detail.productUrl}</a> : "-"}</p>
                  <p><b>商品圖片：</b>{detail.productImageUrl ? <a href={detail.productImageUrl} rel="noreferrer" target="_blank">查看圖片</a> : "-"}</p>
                </div>
              )}
              <div className="order-detail-section">
                <h3>備註</h3>
                <p>{detail.remarks || "-"}</p>
              </div>
            </section>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function AdminTopupReview({ action, requests, submitting }: { action: (path: string, success: string) => Promise<void>; requests: TopupRequest[]; submitting: boolean }) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [detail, setDetail] = useState<TopupRequest | null>(null);
  const filtered = statusFilter === "all" ? requests : requests.filter((request) => request.status === statusFilter);
  const counts = requests.reduce<Record<string, number>>((acc, request) => {
    acc.all = (acc.all ?? 0) + 1;
    acc[request.status] = (acc[request.status] ?? 0) + 1;
    return acc;
  }, { all: 0 });

  return (
    <section className="panel full-span">
      <PanelTitle icon={<Building2 />} title="銀行轉帳審核" />
      <StatusFilterBar active={statusFilter} counts={counts} onChange={setStatusFilter} options={topupStatusFilters} />
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>充值單</th>
              <th>會員</th>
              <th>金額</th>
              <th>付款資料</th>
              <th>狀態</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={6}>暫無符合條件的充值申請</td></tr>
            ) : filtered.map((request) => (
              <tr key={request.id}>
                <td><strong>{request.id}</strong><small>{new Date(request.createdAt).toLocaleString("zh-HK")}</small></td>
                <td><span>{request.memberDisplayName || request.memberId}</span><small>{request.memberEmail || ""}</small></td>
                <td>HKD {request.amountHkd.toLocaleString("zh-HK")}</td>
                <td><span>{request.bankAccountName || request.paymentMethod || request.bankAccountId || "未填"}</span><small>{request.transferSerialNo || "未填流水號"}</small></td>
                <td><mark>{request.statusLabel}</mark></td>
                <td><button className="secondary" onClick={() => setDetail(request)} type="button">查看</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {detail ? (
        <div className="modal-backdrop">
          <section className="panel topup-review-detail">
            <div className="panel-heading-row">
              <PanelTitle icon={<Building2 />} title="充值申請詳情" />
              <button className="secondary" onClick={() => setDetail(null)} type="button">關閉</button>
            </div>
            <dl className="detail-list">
              <div><dt>充值單號</dt><dd>{detail.id}</dd></div>
              <div><dt>會員</dt><dd>{detail.memberDisplayName || detail.memberId}<small>{detail.memberEmail || ""}</small></dd></div>
              <div><dt>充值金額</dt><dd>HKD {detail.amountHkd.toLocaleString("zh-HK")}</dd></div>
              <div><dt>收款帳號</dt><dd>{detail.bankAccountName || detail.bankAccountId || detail.paymentMethod || "未填"}</dd></div>
              <div><dt>流水號</dt><dd>{detail.transferSerialNo || "未填"}</dd></div>
              <div><dt>匯款人</dt><dd>{detail.remitterName || "未填"}{detail.remitterPhone ? ` / ${detail.remitterPhone}` : ""}</dd></div>
              <div><dt>備註</dt><dd>{detail.remarks || "無備註"}</dd></div>
            </dl>
            <div className="review-log-block">
              <strong>審核日誌</strong>
              {(detail.reviewLogs ?? []).length === 0 ? <p>暫無審核日誌</p> : detail.reviewLogs?.map((log) => (
                <article key={log.id}>
                  <span>{log.actionLabel} 路 HKD {log.amountHkd}</span>
                  <small>{log.actorId} 路 {new Date(log.createdAt).toLocaleString("zh-HK")} 路 {log.note || ""}</small>
                </article>
              ))}
            </div>
            {["approved", "rejected", "cancelled"].includes(detail.status) ? null : (
              <div className="detail-actions">
                <button disabled={submitting} onClick={() => void action(`/api/admin/topups/${encodeURIComponent(detail.id)}/approve`, "充值已入帳").then(() => setDetail(null))} type="button">復核入帳</button>
                <button className="danger" disabled={submitting} onClick={() => void action(`/api/admin/topups/${encodeURIComponent(detail.id)}/reject`, "充值申請已拒絕").then(() => setDetail(null))} type="button">拒絕</button>
              </div>
            )}
          </section>
        </div>
      ) : null}
    </section>
  );
}

createRoot(document.getElementById("root")!).render(<React.StrictMode><App /></React.StrictMode>);
