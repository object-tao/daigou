import React, { type FormEvent, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  BookOpen,
  Boxes,
  Building2,
  Calculator,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  Copy,
  ExternalLink,
  FileText,
  Gauge,
  Gift,
  HandCoins,
  Languages,
  LayoutDashboard,
  LogIn,
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
  UserPlus,
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
  realName: string;
  phone: string;
  whatsapp: string;
  countryRegion: string;
  preferredLanguage: string;
  notes: string;
  profileUpdatedAt: string | null;
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

type RefundRequest = {
  id: string;
  memberId: string;
  memberEmail?: string | null;
  memberDisplayName?: string | null;
  memberUserCode?: string | null;
  amountHkd: number;
  refundMethod: string;
  refundMethodLabel: string;
  recipientName: string;
  recipientAccount: string;
  bankName: string | null;
  phone: string | null;
  reason: string;
  remarks: string | null;
  status: string;
  statusLabel: string;
  adminNote: string | null;
  createdAt: string;
  updatedAt: string;
  reviewedAt: string | null;
  paidAt: string | null;
  cancelledAt: string | null;
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

type PointTransaction = {
  id: string;
  memberId: string;
  direction: string;
  category: string;
  categoryLabel: string;
  points: number;
  balanceAfter: number | null;
  relatedType: string | null;
  relatedId: string | null;
  title: string;
  description: string | null;
  status: string;
  statusLabel: string;
  createdAt: string;
};

type PointSummary = {
  balance: number;
  earned: number;
  used: number;
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

type MemberMessage = {
  id: string;
  memberId: string;
  messageType: string;
  messageTypeLabel: string;
  title: string;
  content: string;
  isRead: boolean;
  statusLabel: string;
  createdAt: string;
  readAt: string | null;
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

type PackageForecast = {
  id: string;
  forecastNo: string;
  memberId: string;
  trackingNo: string;
  carrierName: string;
  sourceType: string | null;
  sourceName: string | null;
  itemName: string | null;
  quantity: number;
  remarks: string | null;
  expectedArrivalDate: string | null;
  status: string;
  statusLabel: string;
  matchedInboundPackageId: string | null;
  createdAt: string;
  updatedAt: string;
  cancelledAt: string | null;
  matchedAt: string | null;
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

type MemberLevel = {
  id: string;
  levelCode: string;
  levelName: string;
  minConsumptionHkd: number;
  minShippingFeeHkd: number;
  minTopupHkd: number;
  minOrderCount: number;
  shippingDiscountRate: number;
  serviceFeeDiscountRate: number;
  extraFreeStorageDays: number;
  priorityLevel: number;
  commissionRate: number;
  status: string;
  statusLabel: string;
  sortOrder: number;
  remarks: string | null;
  createdAt: string;
  updatedAt: string;
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
  warehouseIds: string[];
  warehouseNames: string[];
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
  freeStorageDays: number;
  storageFeeHkdPerDay: number;
  remarks: string | null;
  createdAt: string;
  updatedAt: string;
};

type SystemDictionary = {
  id: string;
  categoryCode: string;
  categoryNameZhHant: string;
  itemCode: string;
  itemValue: string;
  labelZhHant: string;
  labelEn: string;
  labelJa: string;
  sortOrder: number;
  status: string;
  statusLabel: string;
  isSystem: boolean;
  remarks: string | null;
  createdAt: string;
  updatedAt: string;
};

type DictionaryCategory = {
  code: string;
  name: string;
};

type FeeSetting = {
  id: string;
  categoryCode: string;
  categoryName: string;
  feeCode: string;
  feeName: string;
  chargeMode: string;
  chargeModeLabel: string;
  amountHkd: number;
  percentRate: number;
  currency: string;
  status: string;
  statusLabel: string;
  sortOrder: number;
  remarks: string | null;
  createdAt: string;
  updatedAt: string;
};

type ValueAddedRequest = {
  id: string;
  packageId: string;
  warehouseId: string;
  warehouseName: string | null;
  memberId: string | null;
  memberEmail: string | null;
  memberUserCode: string | null;
  serviceCode: string;
  serviceName: string;
  amountHkd: number;
  status: string;
  statusLabel: string;
  requestNote: string | null;
  processNote: string | null;
  packageTrackingNo: string | null;
  packageItemName: string | null;
  packageShelfCode: string | null;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
};

type ConsolidationBatch = {
  id: string;
  batchNo: string;
  warehouseId: string;
  warehouseName: string | null;
  memberId: string | null;
  memberEmail: string | null;
  memberUserCode: string | null;
  packageCount: number;
  packageIds: string[];
  cartonType: string | null;
  cartonFeeHkd: number;
  weightKg: number | null;
  lengthCm: number | null;
  widthCm: number | null;
  heightCm: number | null;
  internationalTrackingNo: string | null;
  logisticsProductName: string | null;
  shippingFeeHkd: number;
  status: string;
  statusLabel: string;
  remarks: string | null;
  createdAt: string;
  updatedAt: string;
  packedAt: string | null;
  outboundedAt: string | null;
};

type WarehouseShelf = {
  id: string;
  warehouseId: string;
  warehouseName: string | null;
  code: string;
  name: string;
  areaCode: string | null;
  shelfNo: string | null;
  locationCount: number;
  status: string;
  statusLabel: string;
  sortOrder: number;
  remarks: string | null;
  createdAt: string;
  updatedAt: string;
};

type WarehouseLocation = {
  id: string;
  warehouseId: string;
  warehouseName: string | null;
  shelfId: string;
  shelfCode: string | null;
  code: string;
  areaCode: string | null;
  shelfNo: string | null;
  layerNo: number | null;
  slotNo: number | null;
  locationType: string;
  locationTypeLabel: string;
  status: string;
  statusLabel: string;
  maxPackages: number | null;
  maxWeightKg: number | null;
  maxVolumeCm3: number | null;
  remarks: string | null;
  createdAt: string;
  updatedAt: string;
};

type LogisticsSupplier = {
  id: string;
  supplierCode: string;
  name: string;
  contactName: string | null;
  contactPhone: string | null;
  contactEmail: string | null;
  loginEmail: string | null;
  countryCode: string;
  countryName: string;
  city: string | null;
  settlementCurrency: string;
  status: string;
  statusLabel: string;
  channelProductCount: number;
  remarks: string | null;
  createdAt: string;
  updatedAt: string;
};

type LogisticsSupplierCountry = {
  code: string;
  name: string;
};

type ChannelProduct = {
  id: string;
  channelProductCode: string;
  supplierId: string;
  supplierCode: string;
  supplierName: string;
  name: string;
  carrierName: string | null;
  serviceName: string | null;
  originCountryCode: string;
  originCountryName: string;
  originCity: string | null;
  destinationCountryCode: string;
  destinationCountryName: string;
  destinationCity: string | null;
  transitTime: string | null;
  costCurrency: string;
  firstWeightKg: number;
  firstWeightPrice: number;
  additionalWeightUnitKg: number;
  additionalWeightPrice: number;
  maxWeightKg: number | null;
  status: string;
  statusLabel: string;
  remarks: string | null;
  createdAt: string;
  updatedAt: string;
};

type LogisticsProductAttribute = {
  code: string;
  name: string;
  description: string;
};

type LogisticsProduct = {
  id: string;
  productCode: string;
  productName: string;
  channelProductId: string | null;
  channelProductCode: string | null;
  channelProductName: string | null;
  routeName: string | null;
  originCountryCode: string;
  originCountryName: string;
  originCity: string | null;
  destinationCountryCode: string;
  destinationCountryName: string;
  destinationCity: string | null;
  estimatedDays: string | null;
  supportCategories: string[];
  forbiddenCategories: string[];
  chargeWeightMode: string;
  pricingMode: string;
  minWeight: number;
  maxWeight: number;
  volumeDivisor: number;
  roundingUnit: number;
  densityThreshold: number;
  densityLowMode: string;
  densityHighMode: string;
  firstWeight: number;
  firstPrice: number;
  additionalWeight: number;
  additionalPrice: number;
  priceTiers: string | null;
  attributeSurcharges: string | null;
  handlingFee: number;
  fuelSurchargeRate: number;
  cargoSurchargeRate: number;
  isTaxIncluded: boolean;
  needIdentity: boolean;
  supportTracking: boolean;
  status: string;
  statusLabel: string;
  remarks: string | null;
  createdAt: string;
  updatedAt: string;
};

type ShippingCalculateResult = {
  available: Array<{
    product: LogisticsProduct;
    warnings?: Array<{ id: string; ruleName: string; restrictionType: string; message: string }>;
    weightDetail: {
      actualWeight: number;
      volumeWeight: number;
      density: number | null;
      chargeableWeight: number;
    };
    feeDetail: {
      pricingMode: string;
      baseFreight: number;
      fuelSurcharge: number;
      cargoSurcharge: number;
      attributeSurcharge: number;
      handlingFee: number;
      remoteAreaFee: number;
      freightTotal: number;
    };
    totalAmount: number;
  }>;
  unavailable: Array<{ productName: string; productCode: string; reason: string }>;
};

type ShippingRestriction = {
  id: string;
  ruleName: string;
  scopeType: string;
  scopeLabel: string;
  destinationCountryCode: string | null;
  destinationCountryName: string | null;
  logisticsProductId: string | null;
  logisticsProductCode: string | null;
  logisticsProductName: string | null;
  cargoCategories: string[];
  keywords: string | null;
  restrictionType: string;
  restrictionTypeLabel: string;
  maxWeightKg: number | null;
  maxLengthCm: number | null;
  maxWidthCm: number | null;
  maxHeightCm: number | null;
  customerMessage: string | null;
  internalNote: string | null;
  status: string;
  statusLabel: string;
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
  balanceHkd: 0,
  realName: "",
  phone: "",
  whatsapp: "",
  countryRegion: "",
  preferredLanguage: "zh-Hant",
  notes: "",
  profileUpdatedAt: null
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

const refundStatusFilters = [
  { value: "all", label: "全部" },
  { value: "pending_review", label: "待審核" },
  { value: "approved", label: "已通過" },
  { value: "rejected", label: "已拒絕" },
  { value: "paid", label: "已退款" },
  { value: "cancelled", label: "已取消" }
];

const refundMethods = [
  { value: "bank_transfer", label: "銀行轉帳" },
  { value: "alipayhk", label: "AlipayHK" },
  { value: "alipay", label: "支付寶" },
  { value: "wechat", label: "微信支付" }
];

const messageStatusFilters = [
  { value: "all", label: "全部" },
  { value: "unread", label: "未讀" },
  { value: "read", label: "已讀" }
];

const pointCategoryFilters = [
  { value: "all", label: "全部" },
  { value: "procurement", label: "代購商品積分" },
  { value: "shipping", label: "物流費用積分" },
  { value: "exchange", label: "積分兌換" },
  { value: "adjustment", label: "人工調整" },
  { value: "referral", label: "推薦積分" }
];

const memberMenu: MenuGroup[] = [
  {
    title: "個人中心",
    items: [
      { id: "member:overview", label: "會員概覽", description: "會員資料、餘額、積分與最新消息", icon: <LayoutDashboard size={17} />, implemented: true },
      { id: "member:messages", label: "我的消息", description: "站內通知與系統公告", icon: <Bell size={17} />, implemented: true },
      { id: "member:points", label: "我的積分", description: "代購商品積分與物流費用積分", icon: <Gift size={17} />, implemented: true },
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
      { id: "member:package-forecast", label: "包裹預報", description: "提前提交日本物流單號與商品資料", icon: <PackagePlus size={17} />, implemented: true },
      { id: "member:inbound", label: "入庫包裹管理", description: "入庫預報與認領", icon: <PackagePlus size={17} /> },
      { id: "member:stored-items", label: "商品入庫列表", description: "已入庫商品與增值服務", icon: <Boxes size={17} /> },
      { id: "member:shipments", label: "運單管理", description: "合箱、紙箱費與國際運費付款", icon: <Truck size={17} /> },
      { id: "member:shipment-packages", label: "運單包裹管理", description: "包裹明細與物流節點", icon: <PackageCheck size={17} /> },
      { id: "member:shipping-calculator", label: "運費試算", description: "按國家、重量、尺寸與貨物屬性試算物流產品", icon: <CircleDollarSign size={17} />, implemented: true },
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
      { id: "member:refunds", label: "餘額與退款", description: "退回餘額與退款申請狀態", icon: <RefreshCw size={17} />, implemented: true }
    ]
  },
  {
    title: "帳號設定",
    items: [
      { id: "member:profile", label: "個人資料", description: "電郵註冊資料與會員等級", icon: <UserRound size={17} />, implemented: true },
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
      { id: "admin:negotiation", label: "議價服務", description: "個別網店議價與增值服務費", icon: <HandCoins size={17} /> }
    ]
  },
  {
    title: "集運倉儲",
    items: [
      { id: "admin:warehouses", label: "倉庫管理", description: "多倉庫資料、啟停與入出庫開關", icon: <Warehouse size={17} />, implemented: true },
      { id: "admin:shelves", label: "貨架管理", description: "每個倉庫的區域、貨架與上架容量", icon: <Boxes size={17} />, implemented: true },
      { id: "admin:locations", label: "庫位管理", description: "庫位編碼、類型、狀態與批量生成", icon: <MapPin size={17} />, implemented: true },
      { id: "admin:inbound-scan", label: "入庫掃碼", description: "日本物流單號與倉庫入庫", icon: <PackagePlus size={17} /> },
      { id: "admin:packages", label: "包裹管理", description: "按倉庫、狀態與關鍵字查詢包裹", icon: <PackageCheck size={17} />, implemented: true },
      { id: "admin:claim", label: "包裹認領", description: "自動匹配與人工認領", icon: <Search size={17} />, implemented: true },
      { id: "admin:shelving", label: "上架管理", description: "貨架位與免倉期計算", icon: <Warehouse size={17} /> },
      { id: "admin:consolidation", label: "合箱管理", description: "免費合箱、箱型與紙箱費", icon: <Boxes size={17} /> },
      { id: "admin:packing", label: "打包出庫", description: "一件直發、打包與出庫掃碼", icon: <PackageCheck size={17} /> },
      { id: "admin:orphan", label: "無主包裹", description: "公海包裹與 60 天銷毀流程", icon: <ClipboardList size={17} /> },
      { id: "admin:value-added", label: "增值服務", description: "拍照、加強包裝、抽真空、去鞋盒", icon: <Tags size={17} /> }
    ]
  },
  {
    title: "物流渠道",
    items: [
      { id: "admin:logistics-suppliers", label: "供应商", description: "物流供应商资料、联系人与合作状态", icon: <Building2 size={17} />, implemented: true },
      { id: "admin:channel-products", label: "渠道产品", description: "渠道线路产品、目的地与服务类型", icon: <Tags size={17} />, implemented: true },
      { id: "admin:logistics-products", label: "物流產品", description: "面向客戶展示的物流產品與報價", icon: <PackageCheck size={17} />, implemented: true },
      { id: "admin:routes", label: "物流渠道", description: "自建物流線路、目的地與時效", icon: <Truck size={17} /> },
      { id: "admin:logistics-orders", label: "物流订单", description: "物流下單、訂單狀態與供應商訂單記錄", icon: <ClipboardList size={17} /> },
      { id: "admin:tracking", label: "物流軌跡", description: "物流節點、追蹤狀態與簽收", icon: <RefreshCw size={17} /> },
      { id: "admin:restrictions", label: "禁運與限制", description: "禁運品、重量限制與體積限制", icon: <ShieldCheck size={17} />, implemented: true },
      { id: "admin:shipping-fees", label: "運費計費", description: "計費方式、體積重公式與報價", icon: <CircleDollarSign size={17} /> }
    ]
  },
  {
    title: "財務管理",
    items: [
      { id: "admin:topup-review", label: "銀行轉帳審核", description: "充值憑證、入帳與拒絕", icon: <Building2 size={17} />, implemented: true },
      { id: "admin:refund-review", label: "退款審核", description: "餘額退款申請審核與標記已退款", icon: <RefreshCw size={17} />, implemented: true },
      { id: "admin:wallet-adjust", label: "餘額調整", description: "補款、扣款、退款與人工調整", icon: <CircleDollarSign size={17} />, implemented: true },
      { id: "admin:exchange-rate", label: "匯率管理", description: "日元兌港幣、人民幣與澳幣匯率", icon: <RefreshCw size={17} />, implemented: true },
      { id: "admin:fee-settings", label: "費用配置", description: "服務費、紙箱費、免倉期與倉租", icon: <Settings size={17} />, implemented: true },
      { id: "admin:finance-ledger", label: "財務流水", description: "每筆資金變動與審計追蹤", icon: <BookOpen size={17} />, implemented: true }
    ]
  },
  {
    title: "會員客服",
    items: [
      { id: "admin:members", label: "會員管理", description: "會員資料、等級與 5 位識別碼", icon: <UsersRound size={17} />, implemented: true },
      { id: "admin:levels", label: "會員等級", description: "累計消費、運費、充值與訂單數規則", icon: <ShieldCheck size={17} />, implemented: true },
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
      { id: "admin:dictionary", label: "字典管理", description: "基礎設置與系統字典", icon: <Settings size={17} />, implemented: true },
      { id: "admin:migration", label: "資料遷移", description: "現有系統資料導入計劃", icon: <RefreshCw size={17} /> },
      { id: "admin:i18n", label: "多語內容", description: "繁體中文、英文、日文內容管理", icon: <Languages size={17} /> },
      { id: "admin:seo", label: "SEO 管理", description: "Title、Meta、Slug、OG、Sitemap、robots", icon: <Megaphone size={17} /> }
    ]
  }
];

const storeMenu: MenuGroup[] = [
  {
    title: "倉庫作業",
    items: [
      { id: "admin:inbound-scan", label: "入庫掃碼", description: "日本物流單號與倉庫入庫", icon: <PackagePlus size={17} />, implemented: true },
      { id: "admin:claim", label: "包裹認領", description: "自動匹配與人工認領", icon: <Search size={17} />, implemented: true },
      { id: "admin:shelves", label: "貨架管理", description: "每個倉庫的區域、貨架與上架容量", icon: <Boxes size={17} />, implemented: true },
      { id: "admin:locations", label: "庫位管理", description: "庫位編碼、類型、狀態與批量生成", icon: <MapPin size={17} />, implemented: true },
      { id: "admin:shelving", label: "上架管理", description: "包裹上架與庫位綁定", icon: <Warehouse size={17} /> },
      { id: "admin:consolidation", label: "合箱管理", description: "合箱拣货與包裹合併", icon: <Boxes size={17} /> },
      { id: "admin:packing", label: "打包出庫", description: "打包、稱重與出庫掃碼", icon: <PackageCheck size={17} /> },
      { id: "admin:orphan", label: "無主包裹", description: "無法匹配會員的公海包裹", icon: <ClipboardList size={17} /> },
      { id: "admin:value-added", label: "增值服務", description: "拍照、加強包裝與抽真空", icon: <Tags size={17} /> }
    ]
  }
];

type MemberLanguage = "zh-Hant" | "ja" | "en";

const memberLanguageOptions: { value: MemberLanguage; label: string }[] = [
  { value: "zh-Hant", label: "繁體中文" },
  { value: "ja", label: "日本語" },
  { value: "en", label: "English" }
];

const memberUiText: Record<MemberLanguage, {
  portalTitle: string;
  language: string;
  refresh: string;
  logout: string;
  groups: Record<string, string>;
  items: Record<string, { label: string; description: string }>;
}> = {
  "zh-Hant": {
    portalTitle: "消費者前台",
    language: "語言",
    refresh: "刷新",
    logout: "退出",
    groups: {
      "個人中心": "個人中心",
      "訂單中心": "訂單中心",
      "財務中心": "財務中心",
      "帳號設定": "帳號設定"
    },
    items: {
      "member:overview": { label: "會員概覽", description: "會員資料、餘額、積分與最新消息" },
      "member:messages": { label: "我的消息", description: "站內通知與系統公告" },
      "member:points": { label: "我的積分", description: "代購商品積分與物流費用積分" },
      "member:commission": { label: "我的佣金", description: "推薦佣金與轉入餘額記錄" },
      "member:tickets": { label: "工單服務", description: "提交客服工單與查看平台回覆" },
      "member:coupons": { label: "卡券中心", description: "優惠券與活動限制" },
      "member:warehouse-address": { label: "倉庫地址", description: "日本倉地址與入庫識別碼" },
      "member:procurement": { label: "線上隨意購", description: "線上商品連結提交與餘額付款" },
      "member:offline-procurement": { label: "線下隨意購", description: "線下門店採購需求提交" },
      "member:auction": { label: "Yahoo 代拍", description: "人工代拍、落札與補款" },
      "member:cart": { label: "購物車", description: "跨平台商品合併與備註" },
      "member:procurement-orders": { label: "代購訂單", description: "代購訂單資料、狀態與付款操作" },
      "member:orders": { label: "訂單管理", description: "代拍、集運與綜合訂單狀態追蹤" },
      "member:package-forecast": { label: "包裹預報", description: "提前提交日本物流單號與商品資料" },
      "member:inbound": { label: "入庫包裹管理", description: "入庫預報與認領" },
      "member:stored-items": { label: "商品入庫列表", description: "已入庫商品與增值服務" },
      "member:shipments": { label: "運單管理", description: "合箱、紙箱費與國際運費付款" },
      "member:shipment-packages": { label: "運單包裹管理", description: "包裹明細與物流節點" },
      "member:shipping-calculator": { label: "運費試算", description: "按國家、重量、尺寸與貨物屬性試算物流產品" },
      "member:after-sales": { label: "售後申請", description: "退款、損壞、少件漏件與爭議處理" },
      "member:payment-requests": { label: "付款請求", description: "待付款、補款與扣款確認" },
      "member:bank-transfer": { label: "轉帳充值", description: "線上充值與線下轉帳充值" },
      "member:remittance": { label: "匯款管理", description: "轉帳憑證與處理記錄" },
      "member:ledger": { label: "交易流水", description: "餘額、退款、運費與服務費流水" },
      "member:refunds": { label: "餘額與退款", description: "退回餘額與退款申請狀態" },
      "member:profile": { label: "個人資料", description: "電郵註冊資料與會員等級" },
      "member:addresses": { label: "收貨地址", description: "中國、香港、澳門、澳大利亞等收件地址" },
      "member:deduction": { label: "扣款授權", description: "自動扣款上限與確認條件" },
      "member:security": { label: "修改密碼", description: "登入密碼與安全設定" },
      "member:notification": { label: "通知偏好", description: "Email 與 WhatsApp 通知選項" }
    }
  },
  ja: {
    portalTitle: "会員ポータル",
    language: "言語",
    refresh: "更新",
    logout: "ログアウト",
    groups: {
      "個人中心": "マイページ",
      "訂單中心": "注文管理",
      "財務中心": "残高・決済",
      "帳號設定": "アカウント設定"
    },
    items: {
      "member:overview": { label: "会員概要", description: "会員情報、残高、ポイント、最新通知" },
      "member:messages": { label: "メッセージ", description: "サイト内通知とお知らせ" },
      "member:points": { label: "ポイント", description: "購入ポイントと物流費ポイント" },
      "member:commission": { label: "紹介報酬", description: "紹介報酬と残高への振替記録" },
      "member:tickets": { label: "サポートチケット", description: "問い合わせの送信と返信確認" },
      "member:coupons": { label: "クーポン", description: "クーポンと利用条件" },
      "member:warehouse-address": { label: "倉庫住所", description: "日本倉庫住所と入庫識別コード" },
      "member:procurement": { label: "オンライン購入代行", description: "商品URL送信と残高決済" },
      "member:offline-procurement": { label: "オフライン購入代行", description: "店舗での購入依頼を送信" },
      "member:auction": { label: "Yahoo代理入札", description: "手動入札、落札、追加請求" },
      "member:cart": { label: "カート", description: "複数サイト商品のまとめと備考" },
      "member:procurement-orders": { label: "購入代行注文", description: "注文情報、ステータス、支払い操作" },
      "member:orders": { label: "注文一覧", description: "代理入札、転送、総合注文の追跡" },
      "member:package-forecast": { label: "荷物到着予定", description: "日本の追跡番号と商品情報を事前登録" },
      "member:inbound": { label: "入庫荷物管理", description: "入庫予定と荷物認領" },
      "member:stored-items": { label: "入庫商品一覧", description: "入庫済み商品と追加サービス" },
      "member:shipments": { label: "配送管理", description: "同梱、箱代、国際送料の支払い" },
      "member:shipment-packages": { label: "配送荷物管理", description: "荷物明細と物流ステータス" },
      "member:shipping-calculator": { label: "送料試算", description: "国、重量、サイズ、貨物属性で試算" },
      "member:after-sales": { label: "アフターサービス", description: "返金、破損、不足、紛争申請" },
      "member:payment-requests": { label: "支払い請求", description: "未払い、追加請求、引き落とし確認" },
      "member:bank-transfer": { label: "チャージ", description: "オンラインチャージと銀行振込" },
      "member:remittance": { label: "振込管理", description: "振込証明と処理記録" },
      "member:ledger": { label: "取引履歴", description: "残高、返金、送料、サービス費の履歴" },
      "member:refunds": { label: "残高・返金", description: "残高返金と返金申請ステータス" },
      "member:profile": { label: "個人情報", description: "登録情報と会員ランク" },
      "member:addresses": { label: "配送先住所", description: "中国、香港、マカオ、オーストラリア等の住所" },
      "member:deduction": { label: "自動引落設定", description: "自動引落上限と確認条件" },
      "member:security": { label: "パスワード変更", description: "ログインパスワードと安全設定" },
      "member:notification": { label: "通知設定", description: "Email と WhatsApp 通知設定" }
    }
  },
  en: {
    portalTitle: "Member Portal",
    language: "Language",
    refresh: "Refresh",
    logout: "Logout",
    groups: {
      "個人中心": "Account",
      "訂單中心": "Orders",
      "財務中心": "Finance",
      "帳號設定": "Settings"
    },
    items: {
      "member:overview": { label: "Member Overview", description: "Profile, balance, points and latest notices" },
      "member:messages": { label: "Messages", description: "Account notices and announcements" },
      "member:points": { label: "My Points", description: "Procurement points and shipping-fee points" },
      "member:commission": { label: "Commission", description: "Referral commission and balance transfers" },
      "member:tickets": { label: "Support Tickets", description: "Submit tickets and view replies" },
      "member:coupons": { label: "Coupons", description: "Coupons and campaign restrictions" },
      "member:warehouse-address": { label: "Warehouse Addresses", description: "Japan warehouse addresses and inbound code" },
      "member:procurement": { label: "Online Buy-for-me", description: "Submit product URLs and pay with balance" },
      "member:offline-procurement": { label: "Offline Buy-for-me", description: "Submit in-store purchase requests" },
      "member:auction": { label: "Yahoo Bidding", description: "Manual bidding, winning bids and top-ups" },
      "member:cart": { label: "Cart", description: "Combine cross-platform products and notes" },
      "member:procurement-orders": { label: "Procurement Orders", description: "Order details, status and payment actions" },
      "member:orders": { label: "Order Management", description: "Track bidding, forwarding and combined orders" },
      "member:package-forecast": { label: "Package Forecast", description: "Submit Japan tracking number and item details in advance" },
      "member:inbound": { label: "Inbound Packages", description: "Inbound forecast and package claims" },
      "member:stored-items": { label: "Stored Items", description: "Stored goods and value-added services" },
      "member:shipments": { label: "Shipments", description: "Consolidation, carton fee and international freight" },
      "member:shipment-packages": { label: "Shipment Packages", description: "Package details and tracking events" },
      "member:shipping-calculator": { label: "Shipping Calculator", description: "Estimate by country, weight, size and cargo type" },
      "member:after-sales": { label: "After-sales", description: "Refund, damage, shortage and dispute requests" },
      "member:payment-requests": { label: "Payment Requests", description: "Pending payments, top-ups and deduction checks" },
      "member:bank-transfer": { label: "Top Up", description: "Online top-up and offline bank transfer" },
      "member:remittance": { label: "Remittance", description: "Transfer proofs and processing records" },
      "member:ledger": { label: "Transaction Ledger", description: "Balance, refund, shipping and service-fee records" },
      "member:refunds": { label: "Balance & Refunds", description: "Balance refund requests and status" },
      "member:profile": { label: "Profile", description: "Registration details and member level" },
      "member:addresses": { label: "Delivery Addresses", description: "China, Hong Kong, Macau, Australia and more" },
      "member:deduction": { label: "Deduction Authorization", description: "Auto-deduction limit and confirmation rules" },
      "member:security": { label: "Change Password", description: "Login password and security settings" },
      "member:notification": { label: "Notification Preferences", description: "Email and WhatsApp notification options" }
    }
  }
};

const memberGroupKeys = ["個人中心", "訂單中心", "財務中心", "帳號設定"];

function localizeMemberMenu(language: MemberLanguage): MenuGroup[] {
  const copy = memberUiText[language];
  return memberMenu.map((group, index) => {
    const groupKey = memberGroupKeys[index] ?? group.title;
    return {
      ...group,
      title: copy.groups[groupKey] ?? group.title,
      items: group.items.map((item) => ({
        ...item,
        label: copy.items[item.id]?.label ?? item.label,
        description: copy.items[item.id]?.description ?? item.description
      }))
    };
  });
}

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
  if (!response.ok && path.startsWith("/api/") && response.status === 404) {
    throw new Error("API 服務未啟動，請使用 Worker 本地地址 http://127.0.0.1:8787 測試登入");
  }
  if (!response.ok) throw new Error((payload as { error?: string }).error ?? "提交失敗");
  return payload as T;
}

async function authJson<T>(path: string, body: Record<string, unknown> = {}): Promise<T> {
  return postJson<T>(path, body);
}

function App() {
  const isStorePortal = window.location.hostname.startsWith("store.") || window.location.pathname.startsWith("/store");
  const initialMode: SystemMode = window.location.hostname.startsWith("admin.") || window.location.pathname.startsWith("/admin") || isStorePortal ? "admin" : "member";
  const [systemMode, setSystemMode] = useState<SystemMode>(initialMode);
  const [activeView, setActiveView] = useState(initialMode === "admin" ? (isStorePortal ? "admin:inbound-scan" : "admin:procurement") : "member:overview");
  const [memberOrderStatusFilter, setMemberOrderStatusFilter] = useState("all");
  const [authChecked, setAuthChecked] = useState(false);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<MemberProfile>(emptyProfile);
  const [memberOrders, setMemberOrders] = useState<ProcurementOrder[]>([]);
  const [adminOrders, setAdminOrders] = useState<ProcurementOrder[]>([]);
  const [packageForecasts, setPackageForecasts] = useState<PackageForecast[]>([]);
  const [memberMessages, setMemberMessages] = useState<MemberMessage[]>([]);
  const [memberTickets, setMemberTickets] = useState<SupportTicket[]>([]);
  const [adminTickets, setAdminTickets] = useState<SupportTicket[]>([]);
  const [adminInboundPackages, setAdminInboundPackages] = useState<InboundPackage[]>([]);
  const [topups, setTopups] = useState<TopupRequest[]>([]);
  const [memberTopups, setMemberTopups] = useState<TopupRequest[]>([]);
  const [refunds, setRefunds] = useState<RefundRequest[]>([]);
  const [memberRefunds, setMemberRefunds] = useState<RefundRequest[]>([]);
  const [memberWalletTransactions, setMemberWalletTransactions] = useState<WalletTransaction[]>([]);
  const [memberPointTransactions, setMemberPointTransactions] = useState<PointTransaction[]>([]);
  const [memberPointSummary, setMemberPointSummary] = useState<PointSummary>({ balance: 0, earned: 0, used: 0 });
  const [adminWalletTransactions, setAdminWalletTransactions] = useState<WalletTransaction[]>([]);
  const [members, setMembers] = useState<AdminMember[]>([]);
  const [memberLevels, setMemberLevels] = useState<MemberLevel[]>([]);
  const [staffAccounts, setStaffAccounts] = useState<StaffAccount[]>([]);
  const [staffDepartments, setStaffDepartments] = useState<StaffDepartment[]>([]);
  const [staffRoles, setStaffRoles] = useState<StaffRole[]>([]);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);
  const [warehouses, setWarehouses] = useState<WarehouseRecord[]>([]);
  const [warehouseShelves, setWarehouseShelves] = useState<WarehouseShelf[]>([]);
  const [warehouseLocations, setWarehouseLocations] = useState<WarehouseLocation[]>([]);
  const [dictionaries, setDictionaries] = useState<SystemDictionary[]>([]);
  const [dictionaryCategories, setDictionaryCategories] = useState<DictionaryCategory[]>([]);
  const [feeSettings, setFeeSettings] = useState<FeeSetting[]>([]);
  const [valueAddedRequests, setValueAddedRequests] = useState<ValueAddedRequest[]>([]);
  const [valueAddedServices, setValueAddedServices] = useState<FeeSetting[]>([]);
  const [consolidationBatches, setConsolidationBatches] = useState<ConsolidationBatch[]>([]);
  const [logisticsSuppliers, setLogisticsSuppliers] = useState<LogisticsSupplier[]>([]);
  const [logisticsSupplierCountries, setLogisticsSupplierCountries] = useState<LogisticsSupplierCountry[]>([]);
  const [logisticsSupplierCurrencies, setLogisticsSupplierCurrencies] = useState<string[]>([]);
  const [channelProducts, setChannelProducts] = useState<ChannelProduct[]>([]);
  const [logisticsProducts, setLogisticsProducts] = useState<LogisticsProduct[]>([]);
  const [logisticsProductAttributes, setLogisticsProductAttributes] = useState<LogisticsProductAttribute[]>([]);
  const [shippingRestrictions, setShippingRestrictions] = useState<ShippingRestriction[]>([]);
  const [shippingAddresses, setShippingAddresses] = useState<ShippingAddress[]>([]);
  const [shippingCountries, setShippingCountries] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [memberLanguage, setMemberLanguage] = useState<MemberLanguage>(() => {
    const saved = window.localStorage.getItem("droppilot-member-language");
    return saved === "ja" || saved === "en" || saved === "zh-Hant" ? saved : "zh-Hant";
  });

  const localizedMemberMenu = useMemo(() => localizeMemberMenu(memberLanguage), [memberLanguage]);
  const menu = systemMode === "admin" ? (isStorePortal ? storeMenu : adminMenu) : localizedMemberMenu;
  const currentMenuItems = useMemo(() => menu.flatMap((group) => group.items), [menu]);
  const memberCopy = memberUiText[memberLanguage];

  useEffect(() => {
    window.localStorage.setItem("droppilot-member-language", memberLanguage);
  }, [memberLanguage]);

  async function refresh() {
    const [profilePayload, memberPayload, packageForecastPayload, memberMessagePayload, memberTicketPayload, addressPayload, memberWalletPayload, memberPointPayload, memberTopupPayload, memberRefundPayload, adminPayload, adminTicketPayload, adminInboundPayload, topupPayload, refundPayload, adminWalletPayload, memberAdminPayload, memberLevelPayload, staffPayload, rolePayload, exchangeRatePayload, warehousePayload, shelfPayload, locationPayload, dictionaryPayload, feeSettingPayload, valueAddedPayload, consolidationPayload, supplierPayload, channelProductPayload, logisticsProductPayload, restrictionPayload] = await Promise.all([
      loadJson<{ profile: MemberProfile }>("/api/member/profile", { profile: emptyProfile }),
      loadJson<{ items: ProcurementOrder[] }>("/api/procurement/orders", { items: [] }),
      loadJson<{ items: PackageForecast[] }>("/api/package-forecasts", { items: [] }),
      loadJson<{ items: MemberMessage[] }>("/api/messages", { items: [] }),
      loadJson<{ items: SupportTicket[] }>("/api/tickets", { items: [] }),
      loadJson<{ items: ShippingAddress[]; countries: Record<string, string> }>("/api/member/addresses", { items: [], countries: {} }),
      loadJson<{ items: WalletTransaction[] }>("/api/wallet/transactions", { items: [] }),
      loadJson<{ items: PointTransaction[]; summary: PointSummary }>("/api/points/transactions", { items: [], summary: { balance: 0, earned: 0, used: 0 } }),
      loadJson<{ items: TopupRequest[] }>("/api/topups", { items: [] }),
      loadJson<{ items: RefundRequest[] }>("/api/refunds", { items: [] }),
      loadJson<{ items: ProcurementOrder[] }>("/api/admin/procurement/orders", { items: [] }),
      loadJson<{ items: SupportTicket[] }>("/api/admin/tickets", { items: [] }),
      loadJson<{ items: InboundPackage[] }>("/api/admin/inbound/packages", { items: [] }),
      loadJson<{ items: TopupRequest[] }>("/api/admin/topups", { items: [] }),
      loadJson<{ items: RefundRequest[] }>("/api/admin/refunds", { items: [] }),
      loadJson<{ items: WalletTransaction[] }>("/api/admin/wallet/transactions", { items: [] }),
      loadJson<{ items: AdminMember[] }>("/api/admin/members", { items: [] }),
      loadJson<{ items: MemberLevel[] }>("/api/admin/member-levels", { items: [] }),
      loadJson<{ items: StaffAccount[]; departments: StaffDepartment[]; roles: StaffRole[] }>("/api/admin/staff", { items: [], departments: [], roles: [] }),
      loadJson<{ items: StaffRole[] }>("/api/admin/roles", { items: [] }),
      loadJson<{ items: ExchangeRate[] }>("/api/admin/exchange-rates", { items: [] }),
      loadJson<{ items: WarehouseRecord[] }>(systemMode === "admin" ? "/api/admin/warehouses" : "/api/member/warehouses", { items: [] }),
      loadJson<{ items: WarehouseShelf[] }>("/api/admin/warehouse-shelves", { items: [] }),
      loadJson<{ items: WarehouseLocation[] }>("/api/admin/warehouse-locations", { items: [] }),
      loadJson<{ items: SystemDictionary[]; categories: DictionaryCategory[] }>("/api/admin/dictionaries", { items: [], categories: [] }),
      loadJson<{ items: FeeSetting[] }>("/api/admin/fee-settings", { items: [] }),
      loadJson<{ items: ValueAddedRequest[]; services: FeeSetting[] }>("/api/admin/value-added", { items: [], services: [] }),
      loadJson<{ items: ConsolidationBatch[] }>("/api/admin/consolidation-batches", { items: [] }),
      loadJson<{ items: LogisticsSupplier[]; countries: LogisticsSupplierCountry[]; currencies: string[] }>("/api/admin/logistics/suppliers", { items: [], countries: [], currencies: [] }),
      loadJson<{ items: ChannelProduct[] }>("/api/admin/logistics/channel-products", { items: [] }),
      loadJson<{ items: LogisticsProduct[]; attributes: LogisticsProductAttribute[] }>("/api/admin/logistics/products", { items: [], attributes: [] }),
      loadJson<{ items: ShippingRestriction[] }>("/api/admin/logistics/restrictions", { items: [] })
    ]);
    setProfile(profilePayload.profile);
    setMemberOrders(memberPayload.items);
    setPackageForecasts(packageForecastPayload.items);
    setMemberMessages(memberMessagePayload.items);
    setMemberTickets(memberTicketPayload.items);
    setShippingAddresses(addressPayload.items);
    setShippingCountries(addressPayload.countries);
    setMemberWalletTransactions(memberWalletPayload.items);
    setMemberPointTransactions(memberPointPayload.items);
    setMemberPointSummary(memberPointPayload.summary);
    setMemberTopups(memberTopupPayload.items);
    setMemberRefunds(memberRefundPayload.items);
    setAdminOrders(adminPayload.items);
    setAdminTickets(adminTicketPayload.items);
    setAdminInboundPackages(adminInboundPayload.items);
    setTopups(topupPayload.items);
    setRefunds(refundPayload.items);
    setAdminWalletTransactions(adminWalletPayload.items);
    setMembers(memberAdminPayload.items);
    setMemberLevels(memberLevelPayload.items);
    setStaffAccounts(staffPayload.items);
    setStaffDepartments(staffPayload.departments);
    setStaffRoles(rolePayload.items.length ? rolePayload.items : staffPayload.roles);
    setExchangeRates(exchangeRatePayload.items);
    setWarehouses(warehousePayload.items);
    setWarehouseShelves(shelfPayload.items);
    setWarehouseLocations(locationPayload.items);
    setDictionaries(dictionaryPayload.items);
    setDictionaryCategories(dictionaryPayload.categories);
    setFeeSettings(feeSettingPayload.items);
    setValueAddedRequests(valueAddedPayload.items);
    setValueAddedServices(valueAddedPayload.services);
    setConsolidationBatches(consolidationPayload.items);
    setLogisticsSuppliers(supplierPayload.items);
    setLogisticsSupplierCountries(supplierPayload.countries);
    setLogisticsSupplierCurrencies(supplierPayload.currencies);
    setChannelProducts(channelProductPayload.items);
    setLogisticsProducts(logisticsProductPayload.items);
    setLogisticsProductAttributes(logisticsProductPayload.attributes);
    setShippingRestrictions(restrictionPayload.items);
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

  async function registerSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = Object.fromEntries(new FormData(event.currentTarget).entries());
    setSubmitting(true);
    try {
      const payload = await authJson<{ authenticated: boolean; user: AuthUser }>("/api/auth/register", body);
      setAuthUser(payload.user);
      setMessage("");
      await refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "註冊失敗");
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
    if (initialMode === "admin") {
      return <LoginScreen mode={initialMode} message={message} onSubmit={loginSubmit} submitting={submitting} />;
    }
    return <PublicPortal message={message} onLoginSubmit={loginSubmit} onRegisterSubmit={registerSubmit} submitting={submitting} />;
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <img alt="DropPilot" className="brand-logo" src="/logo.png" />
          <div>
            <strong>DropPilot</strong>
            <small>{systemMode === "admin" ? (isStorePortal ? "倉庫作業端" : "管理後台") : memberCopy.portalTitle}</small>
          </div>
        </div>
        <MenuSection activeView={activeView} groups={menu} onSelect={setActiveView} title={systemMode === "admin" ? (isStorePortal ? "倉庫作業端" : "管理後台") : memberCopy.portalTitle} />
      </aside>
      <section className="content">
        <header className="topbar">
          <div>
            <span className="eyebrow">{systemMode === "admin" ? (isStorePortal ? "STORE" : "ADMIN") : "MEMBER"}</span>
            <h1>{currentMenuItems.find((item) => item.id === activeView)?.label ?? "DropPilot"}</h1>
            <small>{authUser.displayName} · {authUser.email}</small>
          </div>
          <div className="topbar-actions">
            {systemMode === "member" ? (
              <label className="member-language-switch">
                <Languages size={16} />
                <span>{memberCopy.language}</span>
                <select value={memberLanguage} onChange={(event) => setMemberLanguage(event.target.value as MemberLanguage)}>
                  {memberLanguageOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
              </label>
            ) : null}
            <button className="secondary" onClick={() => void refresh()} type="button"><RefreshCw size={16} />{systemMode === "member" ? memberCopy.refresh : "刷新"}</button>
            <button className="secondary" onClick={() => void logoutSubmit()} type="button">{systemMode === "member" ? memberCopy.logout : "退出"}</button>
          </div>
        </header>
        {message ? <div className="notice">{message}</div> : null}
        {activeView === "member:overview" ? (
          <MemberOverview
            orders={memberOrders}
            profile={profile}
            setActiveView={setActiveView}
            setOrderStatusFilter={setMemberOrderStatusFilter}
            warehouses={warehouses}
          />
        ) : null}
        {activeView === "member:messages" ? <MemberMessages action={action} messages={memberMessages} submitting={submitting} /> : null}
        {activeView === "member:procurement" ? <MemberProcurement onSubmit={submitForm} submitting={submitting} /> : null}
        {activeView === "member:offline-procurement" ? <MemberOfflineProcurement onSubmit={submitJson} submitting={submitting} /> : null}
        {activeView === "member:tickets" ? <MemberTickets onSubmit={submitJson} submitting={submitting} tickets={memberTickets} /> : null}
        {activeView === "member:warehouse-address" ? <MemberWarehouseAddresses profile={profile} warehouses={warehouses} /> : null}
        {activeView === "member:addresses" ? <MemberShippingAddresses addresses={shippingAddresses} countries={shippingCountries} onDelete={action} onSubmit={submitJson} submitting={submitting} /> : null}
        {activeView === "member:ledger" ? <WalletLedger showMember={false} title="交易流水" transactions={memberWalletTransactions} /> : null}
        {activeView === "member:points" ? <MemberPoints summary={memberPointSummary} transactions={memberPointTransactions} /> : null}
        {activeView === "member:bank-transfer" ? <MemberTopupCenter profile={profile} onSubmit={submitJson} requests={memberTopups} submitting={submitting} /> : null}
        {activeView === "member:remittance" ? <section className="panel full-span"><MemberTopupRecords requests={memberTopups.filter((request) => request.topupType === "offline")} title="匯款管理" /></section> : null}
        {activeView === "member:refunds" ? <MemberRefundCenter action={action} onSubmit={submitJson} profile={profile} refunds={memberRefunds} submitting={submitting} /> : null}
        {activeView === "member:profile" ? <MemberProfileSettings onSubmit={submitJson} profile={profile} submitting={submitting} /> : null}
        {activeView === "member:procurement-orders" ? <MemberOrders action={action} orders={memberOrders} statusFilter={memberOrderStatusFilter} submitting={submitting} /> : null}
        {activeView === "member:package-forecast" ? <MemberPackageForecasts forecasts={packageForecasts} onSubmit={submitJson} submitting={submitting} /> : null}
        {activeView === "member:shipping-calculator" ? <MemberShippingCalculator attributes={logisticsProductAttributes} countries={logisticsSupplierCountries} submitting={submitting} /> : null}
        {activeView === "admin:procurement" ? <AdminProcurement action={action} orders={adminOrders} submitting={submitting} /> : null}
        {activeView === "admin:topup-review" ? <AdminTopupReview action={action} requests={topups} submitting={submitting} /> : null}
        {activeView === "admin:refund-review" ? <AdminRefundReview action={action} onSubmit={submitJson} refunds={refunds} submitting={submitting} /> : null}
        {activeView === "admin:members" ? <AdminMembers members={members} /> : null}
        {activeView === "admin:levels" ? <AdminMemberLevels levels={memberLevels} onDelete={action} onSubmit={submitJson} submitting={submitting} /> : null}
        {activeView === "admin:wallet-adjust" ? <AdminWalletAdjust members={members} onSubmit={submitJson} submitting={submitting} transactions={adminWalletTransactions} /> : null}
        {activeView === "admin:staff" ? <AdminStaffAccounts departments={staffDepartments} onDelete={action} onSubmit={submitJson} roles={staffRoles} staff={staffAccounts} submitting={submitting} warehouses={warehouses} /> : null}
        {activeView === "admin:roles" ? <AdminRoleManagement onDelete={action} onSubmit={submitJson} roles={staffRoles} submitting={submitting} /> : null}
        {activeView === "admin:tickets" ? <AdminTickets onSubmit={submitJson} submitting={submitting} tickets={adminTickets} /> : null}
        {activeView === "admin:inbound-scan" ? <AdminInboundScan onSubmit={submitJson} packages={adminInboundPackages} submitting={submitting} warehouses={warehouses} /> : null}
        {activeView === "admin:packages" ? <AdminPackageManagement packages={adminInboundPackages} warehouses={warehouses} /> : null}
        {activeView === "admin:claim" ? <AdminPackageClaimList onSubmit={submitJson} packages={adminInboundPackages} submitting={submitting} /> : null}
        {activeView === "admin:shelving" ? <AdminShelving packages={adminInboundPackages} locations={warehouseLocations} onSubmit={submitJson} submitting={submitting} warehouses={warehouses} /> : null}
        {activeView === "admin:consolidation" ? <AdminConsolidation batches={consolidationBatches} onSubmit={submitJson} packages={adminInboundPackages} submitting={submitting} /> : null}
        {activeView === "admin:packing" ? <AdminPackingOutbound batches={consolidationBatches} onSubmit={submitJson} submitting={submitting} /> : null}
        {activeView === "admin:orphan" ? <AdminOrphanPackages action={action} onSubmit={submitJson} packages={adminInboundPackages} submitting={submitting} /> : null}
        {activeView === "admin:value-added" ? <AdminValueAdded packages={adminInboundPackages} onSubmit={submitJson} requests={valueAddedRequests} services={valueAddedServices} submitting={submitting} /> : null}
        {activeView === "admin:exchange-rate" ? <AdminExchangeRates onSubmit={submitJson} rates={exchangeRates} submitting={submitting} /> : null}
        {activeView === "admin:warehouses" ? <AdminWarehouses onDelete={action} onSubmit={submitJson} submitting={submitting} warehouses={warehouses} /> : null}
        {activeView === "admin:shelves" ? <AdminWarehouseShelves onDelete={action} onSubmit={submitJson} shelves={warehouseShelves} submitting={submitting} warehouses={warehouses} /> : null}
        {activeView === "admin:locations" ? <AdminWarehouseLocations locations={warehouseLocations} onDelete={action} onSubmit={submitJson} shelves={warehouseShelves} submitting={submitting} warehouses={warehouses} /> : null}
        {activeView === "admin:dictionary" ? <AdminDictionaries categories={dictionaryCategories} dictionaries={dictionaries} onDelete={action} onSubmit={submitJson} submitting={submitting} /> : null}
        {activeView === "admin:fee-settings" ? <AdminFeeSettings fees={feeSettings} onDelete={action} onSubmit={submitJson} submitting={submitting} /> : null}
        {activeView === "admin:logistics-suppliers" ? <AdminLogisticsSuppliers countries={logisticsSupplierCountries} currencies={logisticsSupplierCurrencies} onDelete={action} onSubmit={submitJson} submitting={submitting} suppliers={logisticsSuppliers} /> : null}
        {activeView === "admin:channel-products" ? <AdminChannelProducts countries={logisticsSupplierCountries} onDelete={action} onSubmit={submitJson} products={channelProducts} submitting={submitting} suppliers={logisticsSuppliers} /> : null}
        {activeView === "admin:logistics-products" ? <AdminLogisticsProducts attributes={logisticsProductAttributes} channelProducts={channelProducts} countries={logisticsSupplierCountries} onDelete={action} onSubmit={submitJson} products={logisticsProducts} submitting={submitting} /> : null}
        {activeView === "admin:restrictions" ? <AdminShippingRestrictions attributes={logisticsProductAttributes} countries={logisticsSupplierCountries} logisticsProducts={logisticsProducts} onDelete={action} onSubmit={submitJson} restrictions={shippingRestrictions} submitting={submitting} /> : null}
        {activeView === "admin:finance-ledger" ? <WalletLedger showMember title="財務流水" transactions={adminWalletTransactions} /> : null}
        {!["member:overview", "member:messages", "member:procurement", "member:offline-procurement", "member:tickets", "member:warehouse-address", "member:addresses", "member:ledger", "member:points", "member:bank-transfer", "member:remittance", "member:refunds", "member:profile", "member:procurement-orders", "member:package-forecast", "member:shipping-calculator", "admin:procurement", "admin:topup-review", "admin:refund-review", "admin:members", "admin:levels", "admin:wallet-adjust", "admin:staff", "admin:roles", "admin:tickets", "admin:inbound-scan", "admin:packages", "admin:claim", "admin:shelving", "admin:consolidation", "admin:packing", "admin:orphan", "admin:value-added", "admin:exchange-rate", "admin:warehouses", "admin:shelves", "admin:locations", "admin:dictionary", "admin:fee-settings", "admin:logistics-suppliers", "admin:channel-products", "admin:logistics-products", "admin:restrictions", "admin:finance-ledger"].includes(activeView) ? <Placeholder activeView={activeView} /> : null}
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
          <img alt="DropPilot" className="auth-logo" src="/logo.png" />
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
          <button disabled={submitting} type="submit">登入</button>
        </form>
        <p className="auth-hint">
          測試帳號：{isAdmin ? "admin@droppilot.net / admin123456" : "demo@droppilot.net / member123456"}
        </p>
      </section>
    </main>
  );
}

const publicCopies = {
  "zh-Hant": {
    nav: { home: "首頁", calculator: "運費計算", consolidation: "集運業務", procurement: "代購業務", auction: "代拍業務", tracking: "物流查詢", merchants: "商家展示" },
    banners: [
      { title: "日本好物，專人代購到你手上", text: "支援線上隨意購、線下隨意購、集運倉儲與自建物流追蹤。", action: "開始代購" },
      { title: "集運、合箱、發貨一站處理", text: "日本倉識別會員包裹，支援多倉地址、入庫預報、合箱與出庫。", action: "查看集運" },
      { title: "Yahoo 代拍與門市採購", text: "人工代拍、人工採購，適合沒有平台帳號或需要線下購買的商品。", action: "了解代拍" }
    ],
    hero: { secondary: "先試算運費" },
    auth: {
      login: "登入", register: "註冊", loginEyebrow: "Welcome back", registerEyebrow: "Create account",
      loginTitle: "登入會員中心", registerTitle: "建立 DropPilot 帳號",
      loginText: "登入後可提交代購、管理包裹與查看物流進度。", registerText: "使用電郵註冊即可取得會員識別碼與日本倉庫地址。",
      email: "電郵", password: "密碼", name: "會員名稱", namePlaceholder: "例如：Chan Tai Man", confirmPassword: "確認密碼",
      create: "建立帳號", noAccount: "還沒有帳號？", registerNow: "立即註冊", hasAccount: "已經有帳號？", backLogin: "返回登入"
    },
    metrics: {
      consolidation: { title: "日本集運", text: "入庫、合箱、打包、出庫" },
      procurement: { title: "人工代購", text: "線上/線下商品都可提交" },
      auction: { title: "代拍服務", text: "Yahoo 拍賣人工協助" },
      tracking: { title: "物流追蹤", text: "自建線路進度查詢" }
    },
    calculator: {
      title: "運費計算", description: "輸入目的地、重量和尺寸，系統會根據已啟用的物流產品試算可用線路與預估費用。",
      notes: ["支援普貨、帶電、品牌敏感與特貨屬性", "顯示可用線路、計費重量、預估費用", "正式報價仍以倉庫實際量度與客服確認為準"],
      origin: "起始國家", destination: "目的國家", cargo: "貨物屬性", weight: "重量 kg", length: "長 cm", width: "寬 cm", height: "高 cm", remote: "偏遠費",
      submit: "開始試算", loading: "試算中", available: "查詢結果", empty: "暫無可用物流產品",
      totalFee: "總費用", days: "時效", daysPending: "待確認", chargeable: "計費重", channelInfo: "渠道信息", route: "路線：", features: "特點：", limit: "限制：", noLimit: "未限制", roundingUnit: "進位單位"
    },
    cargo: { normal: "普貨", battery: "帶電", branded: "品牌敏感", special: "特貨" },
    consolidation: {
      title: "日本集運業務", description: "在日本平台購物後寄到 DropPilot 日本倉，系統按會員識別碼匹配包裹，支持入庫預報、合箱、增值服務與出庫發運。", action: "註冊取得倉庫地址",
      items: ["多倉地址管理，船橋倉作為最終集運倉", "一件直發、合箱、紙箱費、免倉期與倉租規則", "拍照、加強包裝、抽真空、去鞋盒、保留原箱等增值服務"]
    },
    procurement: {
      title: "日本代購業務", description: "提交商品連結或門市採購需求，由平台人工確認商品、報價、採購、入庫和發貨。", action: "登入提交代購",
      items: ["線上隨意購：提交商品連結，系統可嘗試抓取名稱、規格、價格與圖片", "線下隨意購：提交門店、聯絡人、地址和多商品明細", "已採購訂單不可取消，未採購訂單可申請取消"]
    },
    auction: {
      title: "Yahoo 代拍業務", description: "針對日本 Yahoo 拍賣等競拍場景，由平台人工設置出價、跟進落札、補收費用與後續入庫。", action: "了解代拍流程",
      items: ["支持按落札價百分比或每單固定費計算服務費", "可設定最高出價與代拍授權範圍", "落札後按訂單流程入庫、合箱與出庫"]
    },
    tracking: { title: "物流查詢", description: "物流軌跡功能將逐步對接供應商與自建線路，目前先預留查詢入口。", field: "物流單號", placeholder: "輸入國際物流號或包裹號", submit: "查詢", note: "當前為預留功能，正式軌跡接入後會顯示已打包、已出庫、已上飛機/船、到港、清關、派送、簽收等節點。" },
    merchants: { eyebrow: "Merchants", title: "日本常用商家", expandedTitle: "日本常用商家展示", description: "常用日本購物平台，支持代購或集運到倉。", expandedDescription: "點擊商家會在新窗口打開原網站。後續可接入後台配置、分類與排序。", visit: "前往商家" },
    popular: { eyebrow: "Popular", title: "熱門商品預留", description: "前期先以靜態展示為主，未來可增加後台商品、分類篩選與排序。", filters: ["全部", "玩具模型", "服飾潮流", "美妝護理"] },
    products: [
      { category: "玩具模型", name: "限定動漫周邊", price: "JPY 1,980" },
      { category: "服飾潮流", name: "日系古著外套", price: "JPY 4,500" },
      { category: "美妝護理", name: "藥妝熱賣套裝", price: "JPY 2,300" },
      { category: "收藏卡牌", name: "熱門收藏卡盒", price: "JPY 6,800" }
    ],
    footer: {
      description: "DropPilot 提供日本代購、集運、代拍與自建物流服務，面向香港、澳門、台灣、英國、加拿大及澳大利亞用戶。",
      transfer: "轉運服務", procurement: "代購代拍", notices: "通知公告", about: "關於我們", support: "在線客服咨詢",
      consult: "立即咨詢", hours: "週一至週日：9:00 ~ 18:00", email: "客服郵箱：service@droppilot.net",
      payment: "轉運費用支付方式將逐步支持國際信用卡、PayPal、AlipayHK、WeChat Pay。© 2026 DropPilot."
    }
  },
  en: {
    nav: { home: "Home", calculator: "Rate Calculator", consolidation: "Forwarding", procurement: "Proxy Buying", auction: "Auction Proxy", tracking: "Tracking", merchants: "Stores" },
    banners: [
      { title: "Japan finds, delivered with care", text: "Proxy buying, warehouse forwarding, consolidation and self-managed logistics tracking.", action: "Start shopping" },
      { title: "Receive, consolidate and ship in one workflow", text: "Member-code matching, inbound forecast, consolidation, packing and outbound shipping.", action: "View forwarding" },
      { title: "Yahoo auctions and offline buying support", text: "Manual bidding and store purchasing for items that need local assistance.", action: "Learn more" }
    ],
    hero: { secondary: "Estimate shipping" },
    auth: {
      login: "Login", register: "Sign up", loginEyebrow: "Welcome back", registerEyebrow: "Create account",
      loginTitle: "Member login", registerTitle: "Create your DropPilot account",
      loginText: "Submit proxy orders, manage packages and check shipping progress.", registerText: "Register by email to get your member code and Japan warehouse address.",
      email: "Email", password: "Password", name: "Name", namePlaceholder: "e.g. Alex Chan", confirmPassword: "Confirm password",
      create: "Create account", noAccount: "No account?", registerNow: "Sign up", hasAccount: "Already have an account?", backLogin: "Back to login"
    },
    metrics: {
      consolidation: { title: "Japan Forwarding", text: "Inbound, consolidate, pack, ship" },
      procurement: { title: "Proxy Buying", text: "Online and offline requests" },
      auction: { title: "Auction Proxy", text: "Manual Yahoo auction support" },
      tracking: { title: "Tracking", text: "Self-managed route updates" }
    },
    calculator: {
      title: "Rate Calculator", description: "Enter destination, weight and dimensions to estimate available logistics products and shipping fees.",
      notes: ["Supports normal, battery, sensitive-brand and special cargo", "Shows available routes, chargeable weight and estimated cost", "Final price depends on warehouse measurement and service confirmation"],
      origin: "Origin", destination: "Destination", cargo: "Cargo type", weight: "Weight kg", length: "Length cm", width: "Width cm", height: "Height cm", remote: "Remote fee",
      submit: "Calculate", loading: "Calculating", available: "Results", empty: "No available logistics product",
      totalFee: "Total", days: "ETA", daysPending: "To confirm", chargeable: "Chargeable", channelInfo: "Channel info", route: "Route: ", features: "Features: ", limit: "Limits: ", noLimit: "No limit", roundingUnit: "Rounding"
    },
    cargo: { normal: "Normal", battery: "Battery", branded: "Brand-sensitive", special: "Special" },
    consolidation: {
      title: "Japan Forwarding", description: "Ship your Japan purchases to the DropPilot warehouse. Packages are matched by member code and can be forecasted, consolidated, packed and shipped internationally.", action: "Get warehouse address",
      items: ["Multi-warehouse addresses with Funabashi as the final forwarding hub", "Single-item direct shipping, consolidation, carton fee, free storage and storage fee rules", "Photos, reinforced packing, vacuum packing, shoe-box removal and keep-original-box services"]
    },
    procurement: {
      title: "Japan Proxy Buying", description: "Submit product links or offline store requests. Our team confirms product details, quotes, purchases, receives and ships.", action: "Login to submit",
      items: ["Online request: submit a product link and fetch name, specs, price and image when possible", "Offline request: submit store, contact, address and multi-item details", "Orders can be cancelled before purchase, but not after purchase"]
    },
    auction: {
      title: "Yahoo Auction Proxy", description: "For Yahoo Auctions and similar bidding scenarios, our team manually bids, follows winning bids, collects fees and handles inbound processing.", action: "Learn auction flow",
      items: ["Service fee can be percentage-based or fixed per order", "Set maximum bid and authorization scope", "After winning, the order proceeds to inbound, consolidation and outbound shipping"]
    },
    tracking: { title: "Tracking", description: "Tracking will gradually connect supplier and self-managed routes. This entry is reserved for now.", field: "Tracking number", placeholder: "Enter international tracking no. or package no.", submit: "Search", note: "Future tracking will show packed, outbound, air/sea departure, arrival, customs, delivery and signed nodes." },
    merchants: { eyebrow: "Merchants", title: "Popular Japan stores", expandedTitle: "Popular Japan stores", description: "Common Japan shopping platforms supported by proxy buying or forwarding.", expandedDescription: "Click a store to open its official website in a new window. Admin configuration and sorting can be added later.", visit: "Visit store" },
    popular: { eyebrow: "Popular", title: "Popular products placeholder", description: "Static showcase for now; later it can support admin-managed products, categories and sorting.", filters: ["All", "Toys", "Fashion", "Beauty"] },
    products: [
      { category: "Toys", name: "Limited anime goods", price: "JPY 1,980" },
      { category: "Fashion", name: "Japanese vintage jacket", price: "JPY 4,500" },
      { category: "Beauty", name: "Drugstore hot set", price: "JPY 2,300" },
      { category: "Collectibles", name: "Trading card box", price: "JPY 6,800" }
    ],
    footer: {
      description: "DropPilot provides Japan proxy buying, forwarding, auction proxy and self-managed logistics for users in Hong Kong, Macao, Taiwan, UK, Canada and Australia.",
      transfer: "Forwarding", procurement: "Proxy Buying", notices: "Notices", about: "About", support: "Online Support",
      consult: "Contact now", hours: "Mon-Sun: 9:00 - 18:00", email: "Email: service@droppilot.net",
      payment: "Shipping payment methods will gradually support international cards, PayPal, AlipayHK and WeChat Pay. © 2026 DropPilot."
    }
  },
  ja: {
    nav: { home: "ホーム", calculator: "送料計算", consolidation: "転送サービス", procurement: "購入代行", auction: "オークション代行", tracking: "配送追跡", merchants: "ショップ" },
    banners: [
      { title: "日本の商品を、ていねいにお届け", text: "購入代行、倉庫転送、同梱、独自物流追跡に対応します。", action: "購入を始める" },
      { title: "入庫、同梱、発送を一括管理", text: "会員コードで荷物を識別し、入庫予告、同梱、梱包、出庫まで対応します。", action: "転送を見る" },
      { title: "Yahoo!オークションと店舗購入をサポート", text: "現地対応が必要な商品も、手動入札・店舗購入でサポートします。", action: "詳しく見る" }
    ],
    hero: { secondary: "送料を試算" },
    auth: {
      login: "ログイン", register: "登録", loginEyebrow: "Welcome back", registerEyebrow: "Create account",
      loginTitle: "会員ログイン", registerTitle: "DropPilotアカウント作成",
      loginText: "購入依頼、荷物管理、配送状況の確認ができます。", registerText: "メールで登録すると会員識別コードと日本倉庫住所を取得できます。",
      email: "メール", password: "パスワード", name: "会員名", namePlaceholder: "例：Alex Chan", confirmPassword: "パスワード確認",
      create: "アカウント作成", noAccount: "アカウント未登録？", registerNow: "登録する", hasAccount: "すでに登録済み？", backLogin: "ログインへ"
    },
    metrics: {
      consolidation: { title: "日本転送", text: "入庫・同梱・梱包・発送" },
      procurement: { title: "購入代行", text: "オンライン/店舗依頼に対応" },
      auction: { title: "代拍サービス", text: "Yahoo!オークション手動対応" },
      tracking: { title: "配送追跡", text: "独自ルートの進捗確認" }
    },
    calculator: {
      title: "送料計算", description: "配送先、重量、サイズを入力して、利用可能な物流商品と概算送料を確認できます。",
      notes: ["普通品、電池入り、ブランド敏感品、特殊品に対応", "利用可能ルート、課金重量、概算費用を表示", "最終料金は倉庫での実測と確認結果に基づきます"],
      origin: "発送国", destination: "配送先", cargo: "貨物属性", weight: "重量 kg", length: "長さ cm", width: "幅 cm", height: "高さ cm", remote: "遠隔地料金",
      submit: "計算する", loading: "計算中", available: "検索結果", empty: "利用可能な物流商品がありません",
      totalFee: "合計", days: "目安", daysPending: "確認中", chargeable: "課金重量", channelInfo: "チャネル情報", route: "ルート：", features: "特徴：", limit: "制限：", noLimit: "制限なし", roundingUnit: "丸め単位"
    },
    cargo: { normal: "普通品", battery: "電池入り", branded: "ブランド敏感", special: "特殊品" },
    consolidation: {
      title: "日本転送サービス", description: "日本のECサイトで購入した商品をDropPilot日本倉庫へ発送し、会員コードで荷物を識別します。入庫予告、同梱、付加サービス、国際発送に対応します。", action: "倉庫住所を取得",
      items: ["複数倉庫住所に対応、船橋倉庫を最終転送拠点として利用", "単品直送、同梱、箱代、無料保管期間、保管料ルール", "写真撮影、強化梱包、真空包装、靴箱除去、元箱保持など"]
    },
    procurement: {
      title: "日本購入代行", description: "商品リンクまたは店舗購入依頼を提出すると、当社スタッフが商品確認、見積、購入、入庫、発送まで対応します。", action: "ログインして依頼",
      items: ["オンライン依頼：商品リンクから名称、仕様、価格、画像を取得可能", "店舗購入依頼：店舗名、連絡先、住所、複数商品明細を提出", "購入前は取消可能、購入後は取消不可"]
    },
    auction: {
      title: "Yahoo!オークション代行", description: "Yahoo!オークションなどの入札シーンで、スタッフが手動入札、落札確認、費用精算、入庫処理を行います。", action: "代拍フローを見る",
      items: ["落札価格の割合または固定手数料に対応", "最高入札額と授权範囲を設定可能", "落札後は入庫、同梱、国際発送の流れに進みます"]
    },
    tracking: { title: "配送追跡", description: "物流追跡は今後、サプライヤーおよび独自物流ルートに接続予定です。現在は入口を準備しています。", field: "追跡番号", placeholder: "国際追跡番号または荷物番号を入力", submit: "検索", note: "正式接続後、梱包済み、出庫、航空/船便出発、到着、通関、配送、受領済みなどの進捗を表示します。" },
    merchants: { eyebrow: "Merchants", title: "日本の主要ショップ", expandedTitle: "日本の主要ショップ", description: "購入代行または転送で利用しやすい日本のショッピングサイトです。", expandedDescription: "クリックすると公式サイトを新しいウィンドウで開きます。今後、管理画面から設定や並び替えが可能になります。", visit: "ショップへ" },
    popular: { eyebrow: "Popular", title: "人気商品表示枠", description: "現在は静的表示です。今後、管理画面の商品、カテゴリ、並び替えに対応できます。", filters: ["すべて", "玩具", "ファッション", "美容"] },
    products: [
      { category: "玩具", name: "限定アニメグッズ", price: "JPY 1,980" },
      { category: "ファッション", name: "日本古着ジャケット", price: "JPY 4,500" },
      { category: "美容", name: "ドラッグストア人気セット", price: "JPY 2,300" },
      { category: "コレクション", name: "トレーディングカードBOX", price: "JPY 6,800" }
    ],
    footer: {
      description: "DropPilotは日本購入代行、転送、オークション代行、独自物流サービスを香港、マカオ、台湾、英国、カナダ、オーストラリア向けに提供します。",
      transfer: "転送サービス", procurement: "購入代行", notices: "お知らせ", about: "会社情報", support: "オンラインサポート",
      consult: "相談する", hours: "月-日：9:00 - 18:00", email: "メール：service@droppilot.net",
      payment: "送料支払いは国際カード、PayPal、AlipayHK、WeChat Payに順次対応予定です。© 2026 DropPilot."
    }
  }
};

function PublicPortal({
  message,
  onLoginSubmit,
  onRegisterSubmit,
  submitting
}: {
  message: string;
  onLoginSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onRegisterSubmit: (event: FormEvent<HTMLFormElement>) => void;
  submitting: boolean;
}) {
  const [publicLang, setPublicLang] = useState<"zh-Hant" | "en" | "ja">("zh-Hant");
  const publicText = publicCopies[publicLang];
  const banners = publicText.banners;
  const merchants = [
    { name: "Mercari", url: "https://jp.mercari.com", tone: "mercari" },
    { name: "Yahoo! Auction", url: "https://auctions.yahoo.co.jp", tone: "yahoo" },
    { name: "Rakuten", url: "https://www.rakuten.co.jp", tone: "rakuten" },
    { name: "Amazon JP", url: "https://www.amazon.co.jp", tone: "amazon" },
    { name: "ZOZOTOWN", url: "https://zozo.jp", tone: "zozo" },
    { name: "Suruga-ya", url: "https://www.suruga-ya.jp", tone: "suruga" },
    { name: "Animate", url: "https://www.animate-onlineshop.jp", tone: "animate" },
    { name: "Rakuma", url: "https://fril.jp", tone: "rakuma" },
    { name: "PayPay Flea Market", url: "https://paypayfleamarket.yahoo.co.jp", tone: "paypay" },
    { name: "Yahoo! Shopping", url: "https://shopping.yahoo.co.jp", tone: "shopping" },
    { name: "Rakuten Fashion", url: "https://brandavenue.rakuten.co.jp", tone: "fashion" },
    { name: "Mandarake", url: "https://www.mandarake.co.jp", tone: "mandarake" }
  ];
  const products = publicText.products;
  const [bannerIndex, setBannerIndex] = useState(0);
  const [authMode, setAuthMode] = useState<"login" | "register" | null>(null);
  const [shippingResult, setShippingResult] = useState<ShippingCalculateResult | null>(null);
  const [shippingError, setShippingError] = useState("");
  const [shippingLoading, setShippingLoading] = useState(false);
  const [publicPage, setPublicPage] = useState("home");
  const countryOptions: LogisticsSupplierCountry[] = [
    { code: "JP", name: "日本 Japan" },
    { code: "HK", name: "中國香港 Hong Kong (HK)" },
    { code: "MO", name: "中國澳門 Macao (MO)" },
    { code: "TW", name: "中國台灣 Taiwan (TW)" },
    { code: "GB", name: "英國 United Kingdom (GB)" },
    { code: "CA", name: "加拿大 Canada (CA)" },
    { code: "AU", name: "澳大利亞 Australia (AU)" }
  ];
  const activeBanner = banners[bannerIndex];
  const publicPages = [
    { id: "home", label: publicText.nav.home },
    { id: "calculator", label: publicText.nav.calculator },
    { id: "consolidation", label: publicText.nav.consolidation },
    { id: "procurement", label: publicText.nav.procurement },
    { id: "auction", label: publicText.nav.auction },
    { id: "tracking", label: publicText.nav.tracking },
    { id: "merchants", label: publicText.nav.merchants }
  ];

  function moveBanner(direction: -1 | 1) {
    setBannerIndex((current) => (current + direction + banners.length) % banners.length);
  }

  async function submitPublicCalculator(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShippingLoading(true);
    setShippingError("");
    try {
      const body = Object.fromEntries(new FormData(event.currentTarget).entries()) as Record<string, unknown>;
      const payload = await postJson<ShippingCalculateResult>("/api/shipping/calculate", body);
      setShippingResult(payload);
    } catch (error) {
      setShippingResult(null);
      setShippingError(error instanceof Error ? error.message : "試算失敗");
    } finally {
      setShippingLoading(false);
    }
  }

  return (
    <main className="public-portal">
      <header className="public-header">
        <button className="public-brand" onClick={() => setPublicPage("home")} type="button">
          <img alt="DropPilot" src="/logo.png" />
        </button>
        <nav>
          {publicPages.map((page) => (
            <button className={publicPage === page.id ? "active" : ""} key={page.id} onClick={() => setPublicPage(page.id)} type="button">
              {page.label}
            </button>
          ))}
        </nav>
        <div className="public-auth-actions">
          <label className="public-language-switch">
            <Languages size={16} />
            <select aria-label="Language" value={publicLang} onChange={(event) => setPublicLang(event.target.value as "zh-Hant" | "en" | "ja")}>
              <option value="zh-Hant">繁中</option>
              <option value="en">EN</option>
              <option value="ja">日本語</option>
            </select>
          </label>
          <button className="secondary" onClick={() => setAuthMode("login")} type="button"><LogIn size={16} />{publicText.auth.login}</button>
          <button onClick={() => setAuthMode("register")} type="button"><UserPlus size={16} />{publicText.auth.register}</button>
        </div>
      </header>

      <section className="public-page">
        {publicPage === "home" ? (
          <>
            <section className="public-hero">
              <div className="public-hero-copy">
                <span className="eyebrow">DropPilot Japan Shopping & Shipping</span>
                <h1>{activeBanner.title}</h1>
                <p>{activeBanner.text}</p>
                <div className="public-hero-actions">
                  <button onClick={() => setAuthMode("register")} type="button">{activeBanner.action}</button>
                  <button className="secondary" onClick={() => setPublicPage("calculator")} type="button">{publicText.hero.secondary}</button>
                </div>
                <div className="public-banner-dots">
                  {banners.map((item, index) => (
                    <button aria-label={`切換至 banner ${index + 1}`} className={index === bannerIndex ? "active" : ""} key={item.title} onClick={() => setBannerIndex(index)} type="button" />
                  ))}
                </div>
              </div>
              <div className="public-hero-art">
                <button aria-label="上一張" className="banner-arrow left" onClick={() => moveBanner(-1)} type="button"><ArrowLeft size={18} /></button>
                <img alt="DropPilot" src="/logo.png" />
                <button aria-label="下一張" className="banner-arrow right" onClick={() => moveBanner(1)} type="button"><ArrowRight size={18} /></button>
              </div>
            </section>

            <section className="public-metrics">
              <button onClick={() => setPublicPage("consolidation")} type="button"><Truck /><strong>{publicText.metrics.consolidation.title}</strong><span>{publicText.metrics.consolidation.text}</span></button>
              <button onClick={() => setPublicPage("procurement")} type="button"><ShoppingBag /><strong>{publicText.metrics.procurement.title}</strong><span>{publicText.metrics.procurement.text}</span></button>
              <button onClick={() => setPublicPage("auction")} type="button"><ShieldCheck /><strong>{publicText.metrics.auction.title}</strong><span>{publicText.metrics.auction.text}</span></button>
              <button onClick={() => setPublicPage("tracking")} type="button"><PackageCheck /><strong>{publicText.metrics.tracking.title}</strong><span>{publicText.metrics.tracking.text}</span></button>
            </section>

            <PublicMerchants copy={publicText.merchants} merchants={merchants} />
            <PublicPopularProducts copy={publicText.popular} products={products} />
          </>
        ) : null}

        {publicPage === "calculator" ? (
          <section className="public-section public-feature-page">
            <div className="public-page-intro">
              <span className="eyebrow">Shipping Calculator</span>
              <h2>{publicText.calculator.title}</h2>
              <p>{publicText.calculator.description}</p>
              <div className="public-note-list">
                {publicText.calculator.notes.map((note) => <span key={note}>{note}</span>)}
              </div>
            </div>
            <form className="public-calculator" onSubmit={(event) => void submitPublicCalculator(event)}>
              <label><span>{publicText.calculator.origin}</span><select defaultValue="JP" name="originCountryCode"><option value="JP">日本 Japan</option></select></label>
              <label><span>{publicText.calculator.destination}</span><select defaultValue="HK" name="destinationCountryCode">{countryOptions.filter((country) => country.code !== "JP").map((country) => <option key={country.code} value={country.code}>{country.name}</option>)}</select></label>
              <label><span>{publicText.calculator.cargo}</span><select defaultValue="normal" name="cargoType"><option value="normal">{publicText.cargo.normal}</option><option value="battery">{publicText.cargo.battery}</option><option value="branded">{publicText.cargo.branded}</option><option value="special">{publicText.cargo.special}</option></select></label>
              <label><span>{publicText.calculator.weight}</span><input defaultValue="1" min="0.01" name="weight" required step="0.01" type="number" /></label>
              <label><span>{publicText.calculator.length}</span><input defaultValue="0" min="0" name="length" step="0.1" type="number" /></label>
              <label><span>{publicText.calculator.width}</span><input defaultValue="0" min="0" name="width" step="0.1" type="number" /></label>
              <label><span>{publicText.calculator.height}</span><input defaultValue="0" min="0" name="height" step="0.1" type="number" /></label>
              <label><span>{publicText.calculator.remote}</span><input defaultValue="0" min="0" name="remoteAreaFee" step="0.01" type="number" /></label>
              <button disabled={shippingLoading} type="submit"><Calculator size={16} />{shippingLoading ? publicText.calculator.loading : publicText.calculator.submit}</button>
              {shippingError ? <div className="inline-error full">{shippingError}</div> : null}
              {shippingResult ? (
                <div className="public-calculator-result full">
                  <strong>{publicText.calculator.available}</strong>
                  {shippingResult.available.slice(0, 5).map((item) => (
                    <article className="public-rate-card" key={item.product.id}>
                      <div className="public-rate-summary">
                        <h3>{item.product.productName}</h3>
                        <div className="public-rate-metrics">
                          <span><small>{publicText.calculator.totalFee}</small><b>HKD {item.totalAmount.toFixed(2)}</b></span>
                          <span><small>{publicText.calculator.days}</small><b>{item.product.estimatedDays || publicText.calculator.daysPending}</b></span>
                          <span><small>{publicText.calculator.chargeable}</small><b>{item.weightDetail.chargeableWeight} kg</b></span>
                        </div>
                      </div>
                      <div className="public-rate-detail">
                        <h4>{publicText.calculator.channelInfo}</h4>
                        <p><b>{publicText.calculator.route}</b>{item.product.originCountryName} {"->"} {item.product.destinationCountryName}</p>
                        <p><b>{publicText.calculator.features}</b>{item.product.supportCategories.map((code) => publicText.cargo[code as keyof typeof publicText.cargo] ?? code).join(" / ") || publicText.calculator.noLimit}</p>
                        <p><b>{publicText.calculator.limit}</b>{item.product.minWeight}~{item.product.maxWeight} kg，{publicText.calculator.roundingUnit} {item.product.roundingUnit} kg</p>
                        {item.warnings?.length ? <p className="public-rate-warning">{item.warnings.map((warning) => warning.message).join("；")}</p> : null}
                      </div>
                    </article>
                  ))}
                  {shippingResult.available.length === 0 ? <p>{publicText.calculator.empty}</p> : null}
                </div>
              ) : null}
            </form>
          </section>
        ) : null}

        {publicPage === "consolidation" ? (
          <PublicInfoPage
            eyebrow="Consolidation"
            title={publicText.consolidation.title}
            description={publicText.consolidation.description}
            actionLabel={publicText.consolidation.action}
            onAction={() => setAuthMode("register")}
            items={publicText.consolidation.items}
          />
        ) : null}

        {publicPage === "procurement" ? (
          <PublicInfoPage
            eyebrow="Procurement"
            title={publicText.procurement.title}
            description={publicText.procurement.description}
            actionLabel={publicText.procurement.action}
            onAction={() => setAuthMode("login")}
            items={publicText.procurement.items}
          />
        ) : null}

        {publicPage === "auction" ? (
          <PublicInfoPage
            eyebrow="Auction"
            title={publicText.auction.title}
            description={publicText.auction.description}
            actionLabel={publicText.auction.action}
            onAction={() => setAuthMode("register")}
            items={publicText.auction.items}
          />
        ) : null}

        {publicPage === "tracking" ? (
          <section className="public-section public-feature-page">
            <div className="public-page-intro">
              <span className="eyebrow">Tracking</span>
              <h2>{publicText.tracking.title}</h2>
              <p>{publicText.tracking.description}</p>
            </div>
            <form className="public-tracking" onSubmit={(event) => event.preventDefault()}>
              <label><span>{publicText.tracking.field}</span><input placeholder={publicText.tracking.placeholder} /></label>
              <button type="submit"><Search size={16} />{publicText.tracking.submit}</button>
              <small>{publicText.tracking.note}</small>
            </form>
          </section>
        ) : null}

        {publicPage === "merchants" ? <PublicMerchants copy={publicText.merchants} merchants={merchants} expanded /> : null}
      </section>

      <PublicFooter copy={publicText.footer} setPublicPage={setPublicPage} />

      {authMode ? (
        <div className="modal-backdrop">
          <section className="modal-card public-auth-modal">
            <button className="public-auth-close" aria-label="關閉" onClick={() => setAuthMode(null)} type="button">×</button>
            <div className="public-auth-panel-head">
              <img alt="DropPilot" src="/logo.png" />
              <span className="eyebrow">{authMode === "login" ? publicText.auth.loginEyebrow : publicText.auth.registerEyebrow}</span>
              <h2>{authMode === "login" ? publicText.auth.loginTitle : publicText.auth.registerTitle}</h2>
              <p>{authMode === "login" ? publicText.auth.loginText : publicText.auth.registerText}</p>
            </div>
            {authMode === "login" ? (
              <form className="public-auth-form" onSubmit={onLoginSubmit}>
                <label><span>{publicText.auth.email}</span><input autoComplete="email" name="email" required type="email" /></label>
                <label><span>{publicText.auth.password}</span><input autoComplete="current-password" name="password" required type="password" /></label>
                {message ? <div className="inline-error">{message}</div> : null}
                <button disabled={submitting} type="submit">{publicText.auth.login}</button>
                <p>{publicText.auth.noAccount}<button className="link-action" onClick={() => setAuthMode("register")} type="button">{publicText.auth.registerNow}</button></p>
              </form>
            ) : (
              <form className="public-auth-form" onSubmit={onRegisterSubmit}>
                <label><span>{publicText.auth.name}</span><input name="displayName" placeholder={publicText.auth.namePlaceholder} required /></label>
                <label><span>{publicText.auth.email}</span><input autoComplete="email" name="email" required type="email" /></label>
                <label><span>{publicText.auth.password}</span><input autoComplete="new-password" minLength={8} name="password" required type="password" /></label>
                <label><span>{publicText.auth.confirmPassword}</span><input autoComplete="new-password" minLength={8} name="confirmPassword" required type="password" /></label>
                {message ? <div className="inline-error">{message}</div> : null}
                <button disabled={submitting} type="submit">{publicText.auth.create}</button>
                <p>{publicText.auth.hasAccount}<button className="link-action" onClick={() => setAuthMode("login")} type="button">{publicText.auth.backLogin}</button></p>
              </form>
            )}
          </section>
        </div>
      ) : null}
    </main>
  );
}

function PublicInfoPage({
  actionLabel,
  description,
  eyebrow,
  items,
  onAction,
  title
}: {
  actionLabel: string;
  description: string;
  eyebrow: string;
  items: string[];
  onAction: () => void;
  title: string;
}) {
  return (
    <section className="public-section public-info-page">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <p>{description}</p>
        <button onClick={onAction} type="button">{actionLabel}<ArrowRight size={16} /></button>
      </div>
      <div className="public-info-steps">
        {items.map((item, index) => (
          <article key={item}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{item}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

function PublicMerchants({
  copy,
  expanded = false,
  merchants
}: {
  copy: typeof publicCopies["zh-Hant"]["merchants"];
  expanded?: boolean;
  merchants: Array<{ name: string; tone: string; url: string }>;
}) {
  return (
    <section className="public-section">
      <div className="public-section-heading">
        <span className="eyebrow">{copy.eyebrow}</span>
        <h2>{expanded ? copy.expandedTitle : copy.title}</h2>
        <p>{expanded ? copy.expandedDescription : copy.description}</p>
      </div>
      <div className="merchant-card-grid">
        {merchants.map((merchant) => (
          <a className="merchant-card" href={merchant.url} key={merchant.name} rel="noreferrer" target="_blank">
            <div className={`merchant-visual merchant-${merchant.tone}`}>
              <span>{merchant.name}</span>
            </div>
            <div className="merchant-card-body">
              <strong>{merchant.name}</strong>
              <span>{copy.visit} <ExternalLink size={14} /></span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function PublicPopularProducts({
  copy,
  products
}: {
  copy: typeof publicCopies["zh-Hant"]["popular"];
  products: Array<{ category: string; name: string; price: string }>;
}) {
  return (
    <section className="public-section">
      <div className="public-section-heading">
        <span className="eyebrow">{copy.eyebrow}</span>
        <h2>{copy.title}</h2>
        <p>{copy.description}</p>
      </div>
      <div className="popular-filter">
        {copy.filters.map((filter, index) => <button className={index === 0 ? "active" : ""} key={filter} type="button">{filter}</button>)}
      </div>
      <div className="popular-grid">
        {products.map((product) => (
          <article key={product.name}>
            <div className="product-thumb"><ShoppingBag size={30} /></div>
            <small>{product.category}</small>
            <strong>{product.name}</strong>
            <span>{product.price}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function PublicFooter({
  copy,
  setPublicPage
}: {
  copy: typeof publicCopies["zh-Hant"]["footer"];
  setPublicPage: (page: string) => void;
}) {
  return (
    <footer className="public-footer">
      <div className="public-footer-main">
        <div className="public-footer-brand">
          <img alt="DropPilot" src="/logo.png" />
          <p>{copy.description}</p>
        </div>
        <div className="public-footer-links">
          <section>
            <h3>{copy.transfer}</h3>
            <button onClick={() => setPublicPage("calculator")} type="button">收費規則</button>
            <button onClick={() => setPublicPage("consolidation")} type="button">集運服務</button>
            <button type="button">禁運物品</button>
            <button onClick={() => setPublicPage("home")} type="button">會員中心</button>
          </section>
          <section>
            <h3>{copy.procurement}</h3>
            <button onClick={() => setPublicPage("procurement")} type="button">代購業務</button>
            <button onClick={() => setPublicPage("auction")} type="button">Yahoo 代拍</button>
            <button onClick={() => setPublicPage("merchants")} type="button">日本商家</button>
            <button type="button">常見問題</button>
          </section>
          <section>
            <h3>{copy.notices}</h3>
            <button type="button">重要通知</button>
            <button type="button">線路通知</button>
            <button type="button">活動公告</button>
            <button type="button">企業公告</button>
          </section>
          <section>
            <h3>{copy.about}</h3>
            <button type="button">公司介紹</button>
            <button type="button">聯絡我們</button>
            <button type="button">私隱聲明</button>
            <button type="button">服務條款</button>
          </section>
          <section className="public-footer-contact">
            <h3>{copy.support}</h3>
            <button className="footer-consult" type="button">{copy.consult}</button>
            <p>{copy.hours}</p>
            <p>{copy.email}</p>
            <div className="footer-socials"><span>Mail</span><span>WhatsApp</span><span>WeChat</span><span>IG</span></div>
          </section>
        </div>
      </div>
      <div className="public-footer-bottom">
        <div className="payment-badges">
          <span className="payment-badge visa">VISA</span>
          <span className="payment-badge mastercard"><i />Mastercard</span>
          <span className="payment-badge paypal">PayPal</span>
          <span className="payment-badge alipay">支 AlipayHK</span>
          <span className="payment-badge wechat">微信 WeChat Pay</span>
          <span className="payment-badge unionpay">UnionPay</span>
        </div>
        <p>{copy.payment}</p>
      </div>
    </footer>
  );
}

function MemberOverview({
  orders,
  profile,
  setActiveView,
  setOrderStatusFilter,
  warehouses
}: {
  orders: ProcurementOrder[];
  profile: MemberProfile;
  setActiveView: (view: string) => void;
  setOrderStatusFilter: (status: string) => void;
  warehouses: WarehouseRecord[];
}) {
  const availableWarehouses = warehouses.filter((warehouse) => warehouse.status === "active" && warehouse.allowInbound);
  const counts = orders.reduce<Record<string, number>>((acc, order) => {
    acc[order.status] = (acc[order.status] ?? 0) + 1;
    return acc;
  }, {});
  const statusCards = procurementStatusFilters.filter((item) => item.value !== "all");

  function goOrderStatus(status: string) {
    setOrderStatusFilter(status);
    setActiveView("member:procurement-orders");
  }

  return (
    <section className="full-span member-overview">
      <div className="overview-top-grid">
        <section className="overview-card member-profile-summary">
          <img alt="DropPilot" className="default-avatar" src="/logo.png" />
          <div>
            <h2>{profile.displayName}</h2>
            <p>{profile.email}</p>
            <dl>
              <div><dt>會員識別碼</dt><dd>{profile.userCode}</dd></div>
              <div><dt>收件標識</dt><dd>{profile.userCode}</dd></div>
              <div><dt>會員級別</dt><dd>{profile.levelCode}</dd></div>
            </dl>
            <button className="link-action" onClick={() => setActiveView("member:profile")} type="button">完善個人資料</button>
          </div>
        </section>
        <section className="overview-card account-assets-card">
          <div className="asset-number">
            <strong>{profile.balanceHkd.toLocaleString("zh-HK", { minimumFractionDigits: 2 })}</strong>
            <span>餘額 HKD</span>
          </div>
          <div className="asset-number">
            <strong>0</strong>
            <span>積分</span>
          </div>
          <div className="overview-actions">
            <button onClick={() => setActiveView("member:bank-transfer")} type="button">帳戶充值</button>
            <button className="secondary" onClick={() => setActiveView("member:ledger")} type="button">財務明細</button>
            <button className="secondary" onClick={() => setActiveView("member:remittance")} type="button">充值管理</button>
            <button className="secondary" onClick={() => setActiveView("member:points")} type="button">積分兌換</button>
            <button className="secondary" onClick={() => setActiveView("member:commission")} type="button">推廣賺積分</button>
          </div>
        </section>
      </div>

      <section className="overview-card order-overview-card">
        <div className="overview-tabs">
          <button className="active" type="button">代購訂單</button>
          <button onClick={() => setActiveView("member:inbound")} type="button">我的包裹</button>
          <button onClick={() => setActiveView("member:shipments")} type="button">我的運單</button>
        </div>
        <div className="order-status-grid">
          {statusCards.map((item) => (
            <button key={item.value} className="status-circle-card" onClick={() => goOrderStatus(item.value)} type="button">
              <strong>{counts[item.value] ?? 0}</strong>
              <span>{item.label}</span>
            </button>
          ))}
          <button className="status-circle-card order-create-card" onClick={() => setActiveView("member:procurement")} type="button">
            <ShoppingCart size={30} />
            <span>我要代購</span>
          </button>
        </div>
      </section>

      <section className="overview-card overview-warehouse-card">
        <div className="overview-card-title">
          <h2>倉庫地址</h2>
          <span>日本倉地址與會員識別碼，請完整填入購物平台收件資訊。</span>
        </div>
        <MemberWarehouseAddresses profile={profile} warehouses={availableWarehouses} />
      </section>
    </section>
  );
}

function MemberProfileSettings({
  onSubmit,
  profile,
  submitting
}: {
  onSubmit: (path: string, body: Record<string, unknown>, success: string) => Promise<void>;
  profile: MemberProfile;
  submitting: boolean;
}) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = Object.fromEntries(new FormData(event.currentTarget).entries());
    void onSubmit("/api/member/profile", body, "個人資料已更新");
  }

  return (
    <section className="panel full-span">
      <div className="panel-heading-row">
        <PanelTitle icon={<UserRound />} title="個人資料" />
        <span>{profile.profileUpdatedAt ? `最後更新：${new Date(profile.profileUpdatedAt).toLocaleString("zh-HK")}` : "尚未更新擴展資料"}</span>
      </div>
      <div className="profile-settings-grid">
        <article className="profile-readonly-card">
          <div className="profile-avatar">
            <img alt="DropPilot" src="/logo.png" />
          </div>
          <div>
            <span>登入電郵</span>
            <strong>{profile.email}</strong>
          </div>
          <div>
            <span>會員識別碼</span>
            <strong>{profile.userCode}</strong>
          </div>
          <div>
            <span>會員等級</span>
            <strong>{profile.levelCode}</strong>
          </div>
          <div>
            <span>港幣餘額</span>
            <strong>HKD {profile.balanceHkd.toLocaleString("zh-HK")}</strong>
          </div>
        </article>

        <form className="profile-settings-form" onSubmit={handleSubmit}>
          <label>
            <span>會員名稱</span>
            <input defaultValue={profile.displayName} maxLength={80} name="displayName" required />
          </label>
          <label>
            <span>真實姓名</span>
            <input defaultValue={profile.realName} maxLength={80} name="realName" placeholder="可選填" />
          </label>
          <label>
            <span>偏好語言</span>
            <select defaultValue={profile.preferredLanguage || profile.locale} name="preferredLanguage">
              <option value="zh-Hant">繁體中文</option>
              <option value="en">English</option>
              <option value="ja">日本語</option>
            </select>
          </label>
          <label>
            <span>所在地區</span>
            <input defaultValue={profile.countryRegion} maxLength={80} name="countryRegion" placeholder="例如：香港、澳門、澳大利亞" />
          </label>
          <label>
            <span>聯絡電話</span>
            <input defaultValue={profile.phone} maxLength={40} name="phone" placeholder="請輸入聯絡電話" />
          </label>
          <label>
            <span>WhatsApp</span>
            <input defaultValue={profile.whatsapp} maxLength={40} name="whatsapp" placeholder="如需 WhatsApp 通知可填寫" />
          </label>
          <label className="wide">
            <span>備註</span>
            <textarea defaultValue={profile.notes} maxLength={500} name="notes" placeholder="可填寫常用聯絡時間、通知偏好或其他補充資料" />
          </label>
          <div className="profile-settings-actions">
            <small>電郵、會員識別碼與會員等級暫由系統管理，如需修改請提交工單。</small>
            <button disabled={submitting} type="submit">{submitting ? "保存中..." : "保存資料"}</button>
          </div>
        </form>
      </div>
    </section>
  );
}

function MemberMessages({ action, messages, submitting }: { action: (path: string, success: string) => Promise<void>; messages: MemberMessage[]; submitting: boolean }) {
  const pageSize = 15;
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [detail, setDetail] = useState<MemberMessage | null>(null);
  const filtered = messages.filter((message) => {
    if (statusFilter === "unread") return !message.isRead;
    if (statusFilter === "read") return message.isRead;
    return true;
  });
  const counts = messages.reduce<Record<string, number>>((acc, message) => {
    acc.all = (acc.all ?? 0) + 1;
    acc[message.isRead ? "read" : "unread"] = (acc[message.isRead ? "read" : "unread"] ?? 0) + 1;
    return acc;
  }, { all: 0 });
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  async function openMessage(message: MemberMessage) {
    setDetail(message);
    if (!message.isRead) {
      await action(`/api/messages/${encodeURIComponent(message.id)}/read`, "消息已標記為已讀");
    }
  }

  return (
    <section className="panel full-span">
      <div className="panel-heading-row">
        <PanelTitle icon={<Bell />} title="我的消息" />
        <div className="panel-actions">
          <span>未讀 {counts.unread ?? 0} 則</span>
          <button disabled={submitting || !(counts.unread ?? 0)} onClick={() => void action("/api/messages/read-all", "全部消息已標記為已讀")} type="button">全部已讀</button>
        </div>
      </div>
      <StatusFilterBar active={statusFilter} counts={counts} onChange={(value) => { setStatusFilter(value); setPage(1); }} options={messageStatusFilters} />
      <div className="message-list">
        {pageItems.map((message) => (
          <button className={message.isRead ? "read" : "unread"} key={message.id} onClick={() => void openMessage(message)} type="button">
            <span className="message-dot" />
            <div>
              <strong>{message.title}</strong>
              <small>{message.messageTypeLabel} · {new Date(message.createdAt).toLocaleString("zh-HK")}</small>
              <p>{message.content}</p>
            </div>
            <mark>{message.statusLabel}</mark>
          </button>
        ))}
        {pageItems.length === 0 ? <section className="empty-state">暫無消息</section> : null}
      </div>
      <div className="pagination">
        <button disabled={currentPage <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))} type="button">上一頁</button>
        <span>第 {currentPage} / {totalPages} 頁</span>
        <button disabled={currentPage >= totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))} type="button">下一頁</button>
      </div>
      {detail ? (
        <div className="modal-backdrop">
          <div className="ticket-modal">
            <button className="modal-close" onClick={() => setDetail(null)} type="button">關閉</button>
            <section className="panel message-detail">
              <PanelTitle icon={<Bell />} title="消息詳情" />
              <mark>{detail.statusLabel}</mark>
              <h2>{detail.title}</h2>
              <span>{detail.messageTypeLabel} · {new Date(detail.createdAt).toLocaleString("zh-HK")}</span>
              <p>{detail.content}</p>
              <small>讀取時間：{detail.readAt ? new Date(detail.readAt).toLocaleString("zh-HK") : "未讀"}</small>
            </section>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function MenuSection({ activeView, groups, onSelect, title }: { activeView: string; groups: MenuGroup[]; onSelect: (id: string) => void; title: string }) {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  function toggleGroup(groupTitle: string) {
    setExpandedGroups((current) => ({
      ...current,
      [groupTitle]: !current[groupTitle]
    }));
  }

  return (
    <div className="menu-section">
      <p>{title}</p>
      {groups.map((group) => {
        const expanded = Boolean(expandedGroups[group.title]);
        const groupActive = group.items.some((item) => item.id === activeView);

        return (
          <div className="menu-group" key={group.title}>
            <button
              aria-expanded={expanded}
              className={`menu-group-toggle${groupActive ? " active" : ""}`}
              onClick={() => toggleGroup(group.title)}
              type="button"
            >
              <span>{group.title}</span>
              {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            {expanded ? (
              <nav aria-label={group.title}>
                {group.items.map((item) => (
                  <button className={activeView === item.id ? "active" : ""} key={item.id} onClick={() => onSelect(item.id)} type="button">
                    {item.icon}
                    <span>{item.label}</span>
                    {item.implemented ? <em>已接入</em> : null}
                  </button>
                ))}
              </nav>
            ) : null}
          </div>
        );
      })}
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

const forecastStatusFilters = [
  { value: "all", label: "全部" },
  { value: "forecasted", label: "已預報" },
  { value: "arrived", label: "已到倉" },
  { value: "claimed", label: "已認領" },
  { value: "exception", label: "異常" },
  { value: "cancelled", label: "已取消" }
];

const packageForecastSourceTypes = [
  { value: "shopping_site", label: "購物網站" },
  { value: "friend", label: "朋友寄送" },
  { value: "store", label: "門店寄送" },
  { value: "other", label: "其他" }
];

const packageForecastCarriers = ["Yamato", "佐川急便", "日本郵便", "Amazon Logistics", "Seino", "福山通運", "其他"];

function MemberPackageForecasts({
  forecasts,
  onSubmit,
  submitting
}: {
  forecasts: PackageForecast[];
  onSubmit: (path: string, body: Record<string, unknown>, success: string) => Promise<void>;
  submitting: boolean;
}) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<PackageForecast | null>(null);
  const pageSize = 15;
  const filtered = statusFilter === "all" ? forecasts : forecasts.filter((item) => item.status === statusFilter);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const showModal = creating || Boolean(editing);

  function closeModal() {
    setCreating(false);
    setEditing(null);
  }

  async function submitForecast(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = Object.fromEntries(new FormData(event.currentTarget).entries());
    await onSubmit(
      editing ? `/api/package-forecasts/${encodeURIComponent(editing.id)}` : "/api/package-forecasts",
      body,
      editing ? "包裹預報已更新" : "包裹預報已新增"
    );
    closeModal();
  }

  async function cancelForecast(item: PackageForecast) {
    await onSubmit(`/api/package-forecasts/${encodeURIComponent(item.id)}/cancel`, {}, "包裹預報已取消");
  }

  return (
    <section className="panel full-span">
      <div className="panel-heading-row">
        <PanelTitle icon={<PackagePlus />} title="包裹預報" />
        <div className="panel-actions">
          <span>共 {filtered.length} 筆，每頁 {pageSize} 筆</span>
          <button onClick={() => setCreating(true)} type="button"><Plus size={16} />新增預報</button>
        </div>
      </div>

      <div className="status-filter-row">
        {forecastStatusFilters.map((item) => (
          <button
            className={statusFilter === item.value ? "active" : ""}
            key={item.value}
            onClick={() => {
              setStatusFilter(item.value);
              setPage(1);
            }}
            type="button"
          >
            {item.label}
            <span>{item.value === "all" ? forecasts.length : forecasts.filter((forecast) => forecast.status === item.value).length}</span>
          </button>
        ))}
      </div>

      <div className="table-wrap compact-table">
        <table>
          <thead>
            <tr>
              <th>預報編號</th>
              <th>物流單號</th>
              <th>物流公司</th>
              <th>來源/商品</th>
              <th>預報狀態</th>
              <th>建立時間</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((item) => (
              <tr key={item.id}>
                <td><strong>{item.forecastNo}</strong><small>{item.expectedArrivalDate ? `預計 ${item.expectedArrivalDate}` : "未填預計到倉"}</small></td>
                <td><strong>{item.trackingNo}</strong>{item.matchedInboundPackageId ? <small>已匹配入庫包裹</small> : null}</td>
                <td>{item.carrierName}</td>
                <td>
                  <strong>{item.itemName || "-"}</strong>
                  <small>{item.sourceName || item.sourceType || "-"} · 數量 {item.quantity}</small>
                </td>
                <td><mark>{item.statusLabel}</mark></td>
                <td>{new Date(item.createdAt).toLocaleString("zh-HK")}</td>
                <td>
                  <div className="row-actions">
                    <button className="secondary" disabled={item.status !== "forecasted"} onClick={() => setEditing(item)} type="button"><Pencil size={15} />編輯</button>
                    <button className="danger" disabled={submitting || item.status !== "forecasted"} onClick={() => void cancelForecast(item)} type="button">取消</button>
                  </div>
                </td>
              </tr>
            ))}
            {pageItems.length === 0 ? <tr><td colSpan={7}>暫無包裹預報資料</td></tr> : null}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button disabled={currentPage <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))} type="button">上一頁</button>
        <span>第 {currentPage} / {totalPages} 頁</span>
        <button disabled={currentPage >= totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))} type="button">下一頁</button>
      </div>

      {showModal ? (
        <div className="modal-backdrop">
          <div className="ticket-modal">
            <button className="modal-close" onClick={closeModal} type="button">關閉</button>
            <section className="panel">
              <PanelTitle icon={<PackagePlus />} title={editing ? "編輯包裹預報" : "新增包裹預報"} />
              <form className="form-grid" onSubmit={(event) => void submitForecast(event)}>
                <label><span>物流單號</span><input defaultValue={editing?.trackingNo ?? ""} name="trackingNo" required /></label>
                <label>
                  <span>物流公司</span>
                  <select defaultValue={editing?.carrierName ?? "Yamato"} name="carrierName" required>
                    {packageForecastCarriers.map((carrier) => <option key={carrier} value={carrier}>{carrier}</option>)}
                  </select>
                </label>
                <label>
                  <span>來源類型</span>
                  <select defaultValue={editing?.sourceType ?? "shopping_site"} name="sourceType">
                    {packageForecastSourceTypes.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                  </select>
                </label>
                <label><span>來源名稱</span><input defaultValue={editing?.sourceName ?? ""} name="sourceName" placeholder="如 Amazon、Mercari、朋友姓名" /></label>
                <label><span>商品名稱</span><input defaultValue={editing?.itemName ?? ""} name="itemName" /></label>
                <label><span>商品數量</span><input defaultValue={editing?.quantity ?? 1} min="1" name="quantity" type="number" /></label>
                <label><span>預計到倉時間</span><input defaultValue={editing?.expectedArrivalDate ?? ""} name="expectedArrivalDate" type="date" /></label>
                <label className="full"><span>備註</span><textarea defaultValue={editing?.remarks ?? ""} name="remarks" placeholder="可填寫包裹內容、寄件人、注意事項等" /></label>
                <button disabled={submitting} type="submit">{editing ? "保存修改" : "新增預報"}</button>
              </form>
            </section>
          </div>
        </div>
      ) : null}
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

function MemberRefundCenter({
  action,
  onSubmit,
  profile,
  refunds,
  submitting
}: {
  action: (path: string, success: string) => Promise<void>;
  onSubmit: (path: string, body: Record<string, unknown>, success: string) => Promise<void>;
  profile: MemberProfile;
  refunds: RefundRequest[];
  submitting: boolean;
}) {
  const [modal, setModal] = useState(false);
  const processingAmount = refunds
    .filter((refund) => ["pending_review", "approved"].includes(refund.status))
    .reduce((sum, refund) => sum + refund.amountHkd, 0);
  const paidAmount = refunds
    .filter((refund) => refund.status === "paid")
    .reduce((sum, refund) => sum + refund.amountHkd, 0);
  const refundableAmount = Math.max(0, profile.balanceHkd - processingAmount);

  return (
    <section className="panel full-span">
      <div className="panel-heading-row">
        <PanelTitle icon={<RefreshCw />} title="餘額與退款" />
        <div className="panel-actions">
          <button onClick={() => setModal(true)} type="button">新增退款申請</button>
        </div>
      </div>
      <div className="refund-summary-grid">
        <article><span>帳戶餘額</span><strong>HKD {profile.balanceHkd.toLocaleString("zh-HK")}</strong></article>
        <article><span>可退款餘額</span><strong>HKD {refundableAmount.toLocaleString("zh-HK")}</strong></article>
        <article><span>退款處理中</span><strong>HKD {processingAmount.toLocaleString("zh-HK")}</strong></article>
        <article><span>已退款總額</span><strong>HKD {paidAmount.toLocaleString("zh-HK")}</strong></article>
      </div>
      <RefundRequestTable action={action} refunds={refunds} showMemberActions submitting={submitting} />
      {modal ? <RefundRequestModal maxAmount={refundableAmount} onClose={() => setModal(false)} onSubmit={onSubmit} submitting={submitting} /> : null}
    </section>
  );
}

function RefundRequestModal({ maxAmount, onClose, onSubmit, submitting }: { maxAmount: number; onClose: () => void; onSubmit: (path: string, body: Record<string, unknown>, success: string) => Promise<void>; submitting: boolean }) {
  const [method, setMethod] = useState("bank_transfer");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = Object.fromEntries(new FormData(event.currentTarget).entries());
    await onSubmit("/api/refunds", body, "退款申請已提交，等待財務審核");
    onClose();
  }

  return (
    <div className="modal-backdrop">
      <div className="ticket-modal">
        <button className="modal-close" onClick={onClose} type="button">關閉</button>
        <section className="panel">
          <PanelTitle icon={<RefreshCw />} title="新增退款申請" />
          <form className="form-grid" onSubmit={(event) => void submit(event)}>
            <label><span>退款金額 HKD</span><input max={maxAmount || undefined} min="1" name="amountHkd" required type="number" /></label>
            <label>
              <span>退款方式</span>
              <select name="refundMethod" onChange={(event) => setMethod(event.target.value)} value={method}>
                {refundMethods.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
              </select>
            </label>
            <label><span>收款人姓名</span><input name="recipientName" required /></label>
            <label><span>收款帳號</span><input name="recipientAccount" required /></label>
            <label><span>銀行名稱</span><input name="bankName" required={method === "bank_transfer"} /></label>
            <label><span>聯絡電話</span><input name="phone" /></label>
            <label className="full"><span>退款原因</span><textarea name="reason" required /></label>
            <label className="full"><span>備註</span><textarea name="remarks" /></label>
            <button disabled={submitting || maxAmount <= 0} type="submit">提交退款申請</button>
          </form>
        </section>
      </div>
    </div>
  );
}

function RefundRequestTable({
  action,
  onSubmit,
  refunds,
  showAdminActions,
  showMemberActions,
  submitting
}: {
  action?: (path: string, success: string) => Promise<void>;
  onSubmit?: (path: string, body: Record<string, unknown>, success: string) => Promise<void>;
  refunds: RefundRequest[];
  showAdminActions?: boolean;
  showMemberActions?: boolean;
  submitting: boolean;
}) {
  const pageSize = 15;
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [detail, setDetail] = useState<RefundRequest | null>(null);
  const filtered = statusFilter === "all" ? refunds : refunds.filter((refund) => refund.status === statusFilter);
  const counts = refunds.reduce<Record<string, number>>((acc, refund) => {
    acc.all = (acc.all ?? 0) + 1;
    acc[refund.status] = (acc[refund.status] ?? 0) + 1;
    return acc;
  }, { all: 0 });
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <section className="refund-records-block">
      <div className="panel-heading-row">
        <PanelTitle icon={<FileText />} title="退款申請記錄" />
        <span>共 {filtered.length} 筆，每頁 {pageSize} 筆</span>
      </div>
      <StatusFilterBar active={statusFilter} counts={counts} onChange={(value) => { setStatusFilter(value); setPage(1); }} options={refundStatusFilters} />
      <div className="table-wrap compact-table refund-table">
        <table>
          <thead>
            <tr>
              <th>退款單</th>
              {showAdminActions ? <th>會員</th> : null}
              <th>金額</th>
              <th>退款方式</th>
              <th>收款資料</th>
              <th>狀態</th>
              <th>申請時間</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((refund) => (
              <tr key={refund.id}>
                <td><strong>{refund.id}</strong></td>
                {showAdminActions ? <td><strong>{refund.memberDisplayName || "-"}</strong><small>{refund.memberEmail || refund.memberUserCode || ""}</small></td> : null}
                <td>HKD {refund.amountHkd.toLocaleString("zh-HK")}</td>
                <td>{refund.refundMethodLabel}</td>
                <td><strong>{refund.recipientName}</strong><small>{refund.bankName ? `${refund.bankName} · ` : ""}{refund.recipientAccount}</small></td>
                <td><mark>{refund.statusLabel}</mark></td>
                <td>{new Date(refund.createdAt).toLocaleString("zh-HK")}</td>
                <td>
                  <div className="row-actions">
                    <button className="secondary" onClick={() => setDetail(refund)} type="button">查看</button>
                    {showMemberActions && refund.status === "pending_review" && action ? (
                      <button className="secondary" disabled={submitting} onClick={() => void action(`/api/refunds/${encodeURIComponent(refund.id)}/cancel`, "退款申請已取消")} type="button">取消</button>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
            {pageItems.length === 0 ? <tr><td colSpan={showAdminActions ? 8 : 7}>暫無退款申請</td></tr> : null}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button disabled={currentPage <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))} type="button">上一頁</button>
        <span>第 {currentPage} / {totalPages} 頁</span>
        <button disabled={currentPage >= totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))} type="button">下一頁</button>
      </div>
      {detail ? (
        <RefundDetailModal action={action} detail={detail} onClose={() => setDetail(null)} onSubmit={onSubmit} showAdminActions={showAdminActions} submitting={submitting} />
      ) : null}
    </section>
  );
}

function RefundDetailModal({ action, detail, onClose, onSubmit, showAdminActions, submitting }: { action?: (path: string, success: string) => Promise<void>; detail: RefundRequest; onClose: () => void; onSubmit?: (path: string, body: Record<string, unknown>, success: string) => Promise<void>; showAdminActions?: boolean; submitting: boolean }) {
  const [adminNote, setAdminNote] = useState(detail.adminNote || "");

  async function run(path: string, success: string) {
    if (onSubmit) {
      await onSubmit(path, { adminNote }, success);
    } else if (action) {
      await action(path, success);
    }
    onClose();
  }

  return (
    <div className="modal-backdrop">
      <div className="ticket-modal">
        <button className="modal-close" onClick={onClose} type="button">關閉</button>
        <section className="panel topup-review-detail">
          <PanelTitle icon={<RefreshCw />} title="退款申請詳情" />
          <div className="order-detail-grid">
            <article><span>退款單號</span><strong>{detail.id}</strong></article>
            <article><span>金額</span><strong>HKD {detail.amountHkd.toLocaleString("zh-HK")}</strong></article>
            <article><span>方式</span><strong>{detail.refundMethodLabel}</strong></article>
            <article><span>狀態</span><strong>{detail.statusLabel}</strong></article>
          </div>
          <div className="order-detail-section">
            <h3>收款資料</h3>
            <p><b>收款人：</b>{detail.recipientName}</p>
            <p><b>收款帳號：</b>{detail.recipientAccount}</p>
            <p><b>銀行名稱：</b>{detail.bankName || "-"}</p>
            <p><b>聯絡電話：</b>{detail.phone || "-"}</p>
          </div>
          <div className="order-detail-section">
            <h3>申請內容</h3>
            <p><b>退款原因：</b>{detail.reason}</p>
            <p><b>會員備註：</b>{detail.remarks || "-"}</p>
            <p><b>審核備註：</b>{detail.adminNote || "-"}</p>
            <p><b>申請時間：</b>{new Date(detail.createdAt).toLocaleString("zh-HK")}</p>
            <p><b>審核時間：</b>{detail.reviewedAt ? new Date(detail.reviewedAt).toLocaleString("zh-HK") : "-"}</p>
            <p><b>退款時間：</b>{detail.paidAt ? new Date(detail.paidAt).toLocaleString("zh-HK") : "-"}</p>
          </div>
          {showAdminActions ? (
            <div className="detail-actions">
              <label className="full admin-note-field">
                <span>審核備註</span>
                <textarea onChange={(event) => setAdminNote(event.target.value)} value={adminNote} />
              </label>
              {detail.status === "pending_review" ? (
                <>
                  <button disabled={submitting} onClick={() => void run(`/api/admin/refunds/${encodeURIComponent(detail.id)}/approve`, "退款申請已通過")} type="button">通過</button>
                  <button className="danger" disabled={submitting} onClick={() => void run(`/api/admin/refunds/${encodeURIComponent(detail.id)}/reject`, "退款申請已拒絕")} type="button">拒絕</button>
                </>
              ) : null}
              {detail.status === "approved" ? (
                <button disabled={submitting} onClick={() => void run(`/api/admin/refunds/${encodeURIComponent(detail.id)}/paid`, "已標記退款並扣減餘額")} type="button">標記已退款</button>
              ) : null}
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}

function AdminRefundReview({ action, onSubmit, refunds, submitting }: { action: (path: string, success: string) => Promise<void>; onSubmit: (path: string, body: Record<string, unknown>, success: string) => Promise<void>; refunds: RefundRequest[]; submitting: boolean }) {
  const stats = {
    pending: refunds.filter((refund) => refund.status === "pending_review").length,
    approved: refunds.filter((refund) => refund.status === "approved").length,
    paid: refunds.filter((refund) => refund.status === "paid").length,
    rejected: refunds.filter((refund) => refund.status === "rejected").length
  };

  return (
    <section className="panel full-span">
      <PanelTitle icon={<RefreshCw />} title="退款審核" />
      <div className="stat-grid refund-admin-stats">
        <article className="stat-card orange"><span>待審核</span><strong>{stats.pending}</strong></article>
        <article className="stat-card"><span>已通過待退款</span><strong>{stats.approved}</strong></article>
        <article className="stat-card green"><span>已退款</span><strong>{stats.paid}</strong></article>
        <article className="stat-card dark"><span>已拒絕</span><strong>{stats.rejected}</strong></article>
      </div>
      <RefundRequestTable action={action} onSubmit={onSubmit} refunds={refunds} showAdminActions submitting={submitting} />
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

function AdminWalletAdjust({
  members,
  onSubmit,
  submitting,
  transactions
}: {
  members: AdminMember[];
  onSubmit: (path: string, body: Record<string, unknown>, success: string) => Promise<void>;
  submitting: boolean;
  transactions: WalletTransaction[];
}) {
  const pageSize = 15;
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [memberKeyword, setMemberKeyword] = useState("");
  const [selectedMemberId, setSelectedMemberId] = useState(members[0]?.id ?? "");
  const normalizedMemberKeyword = memberKeyword.trim().toLowerCase();
  const filteredMembers = members.filter((member) => {
    if (!normalizedMemberKeyword) return true;
    return [member.userCode, member.displayName, member.email].some((field) => field.toLowerCase().includes(normalizedMemberKeyword));
  });
  const selectedMember = members.find((member) => member.id === selectedMemberId) ?? members[0] ?? null;
  const adjustments = transactions.filter((item) => item.category === "adjustment");
  const totalPages = Math.max(1, Math.ceil(adjustments.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = adjustments.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  useEffect(() => {
    if (!selectedMemberId && members[0]) setSelectedMemberId(members[0].id);
  }, [members, selectedMemberId]);

  useEffect(() => {
    if (filteredMembers.length && !filteredMembers.some((member) => member.id === selectedMemberId)) {
      setSelectedMemberId(filteredMembers[0].id);
    }
  }, [filteredMembers, selectedMemberId]);

  async function submitAdjustment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const body = Object.fromEntries(new FormData(form).entries());
    await onSubmit("/api/admin/wallet/adjust", body, "餘額已調整，流水已生成");
    form.reset();
    setSelectedMemberId(members[0]?.id ?? "");
    setShowModal(false);
  }

  return (
    <section className="panel full-span">
      <div className="panel-heading-row">
        <PanelTitle icon={<CircleDollarSign />} title="餘額調整" />
        <div className="panel-actions">
          <span>共 {adjustments.length} 筆，每頁 {pageSize} 筆</span>
          <button onClick={() => setShowModal(true)} type="button"><Plus size={16} />新增調整</button>
        </div>
      </div>
      <div className="table-wrap compact-table">
        <table>
          <thead>
            <tr>
              <th>流水</th>
              <th>會員</th>
              <th>方向</th>
              <th>金額</th>
              <th>調整後餘額</th>
              <th>狀態</th>
              <th>時間</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((item) => (
              <tr key={item.id}>
                <td><strong>{item.title}</strong><small>{item.description || item.id}</small></td>
                <td><strong>{item.memberDisplayName || item.memberId}</strong><small>{item.memberUserCode || item.memberEmail || "-"}</small></td>
                <td>{item.direction === "credit" ? "增加" : "扣減"}</td>
                <td><strong className={item.direction === "credit" ? "amount-credit" : "amount-debit"}>{item.direction === "credit" ? "+" : "-"} HKD {item.amountHkd.toLocaleString("zh-HK")}</strong></td>
                <td>{item.balanceAfterHkd === null ? "-" : `HKD ${item.balanceAfterHkd.toLocaleString("zh-HK")}`}</td>
                <td><mark>{item.statusLabel}</mark></td>
                <td>{new Date(item.createdAt).toLocaleString("zh-HK")}</td>
              </tr>
            ))}
            {pageItems.length === 0 ? <tr><td colSpan={7}>暫無人工調整流水</td></tr> : null}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button disabled={currentPage <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))} type="button">上一頁</button>
        <span>第 {currentPage} / {totalPages} 頁</span>
        <button disabled={currentPage >= totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))} type="button">下一頁</button>
      </div>

      {showModal ? (
        <div className="modal-backdrop">
          <div className="ticket-modal">
            <button className="modal-close" onClick={() => setShowModal(false)} type="button">關閉</button>
            <section className="panel">
              <PanelTitle icon={<CircleDollarSign />} title="新增餘額調整" />
              <form className="form-grid wallet-adjust-form" onSubmit={(event) => void submitAdjustment(event)}>
                <label className="full">
                  <span>搜索會員</span>
                  <input onChange={(event) => setMemberKeyword(event.target.value)} placeholder="輸入會員識別碼、名稱或電郵" type="search" value={memberKeyword} />
                  <small>支持會員識別碼搜索，也可以直接使用下方下拉選擇。</small>
                </label>
                <label className="full">
                  <span>會員</span>
                  <select name="memberId" onChange={(event) => setSelectedMemberId(event.target.value)} required value={selectedMemberId}>
                    {filteredMembers.map((member) => (
                      <option key={member.id} value={member.id}>{member.displayName} · {member.email} · {member.userCode}</option>
                    ))}
                  </select>
                </label>
                <div className="wallet-member-card full">
                  <span>當前餘額</span>
                  <strong>HKD {(selectedMember?.balanceHkd ?? 0).toLocaleString("zh-HK")}</strong>
                  <small>{selectedMember ? `${selectedMember.displayName} / ${selectedMember.userCode}` : "請先選擇會員"}</small>
                </div>
                <label>
                  <span>調整方向</span>
                  <select name="direction" required>
                    <option value="credit">增加餘額</option>
                    <option value="debit">扣減餘額</option>
                  </select>
                </label>
                <label><span>金額 HKD</span><input min="0.01" name="amountHkd" required step="0.01" type="number" /></label>
                <label><span>流水標題</span><input name="title" placeholder="例如 人工補款 / 退款補正" /></label>
                <label className="full"><span>調整原因</span><textarea name="description" placeholder="請填寫調整原因，方便財務審計" required /></label>
                <button disabled={submitting || !members.length} type="submit">提交調整</button>
              </form>
            </section>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function AdminMemberLevels({
  levels,
  onDelete,
  onSubmit,
  submitting
}: {
  levels: MemberLevel[];
  onDelete: (path: string, success: string) => Promise<void>;
  onSubmit: (path: string, body: Record<string, unknown>, success: string) => Promise<void>;
  submitting: boolean;
}) {
  const pageSize = 15;
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<MemberLevel | null>(null);
  const [creating, setCreating] = useState(false);
  const current = editing;
  const showModal = creating || Boolean(editing);
  const totalPages = Math.max(1, Math.ceil(levels.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = levels.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  function closeModal() {
    setCreating(false);
    setEditing(null);
  }

  async function submitLevel(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = Object.fromEntries(new FormData(event.currentTarget).entries());
    await onSubmit(
      current ? `/api/admin/member-levels/${encodeURIComponent(current.id)}` : "/api/admin/member-levels",
      body,
      current ? "會員等級已更新" : "會員等級已新增"
    );
    closeModal();
  }

  return (
    <section className="panel full-span">
      <div className="panel-heading-row">
        <PanelTitle icon={<ShieldCheck />} title="會員等級" />
        <div className="panel-actions">
          <span>共 {levels.length} 個等級，每頁 {pageSize} 筆</span>
          <button onClick={() => setCreating(true)} type="button"><Plus size={16} />新增等級</button>
        </div>
      </div>
      <div className="table-wrap compact-table member-level-table">
        <table>
          <thead>
            <tr>
              <th>等級</th>
              <th>升級條件</th>
              <th>折扣與權益</th>
              <th>佣金</th>
              <th>狀態</th>
              <th>排序</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((level) => (
              <tr key={level.id}>
                <td><strong>{level.levelName}</strong><small>{level.levelCode}</small></td>
                <td>
                  <small>消費 HKD {level.minConsumptionHkd.toLocaleString("zh-HK")}</small>
                  <small>運費 HKD {level.minShippingFeeHkd.toLocaleString("zh-HK")} · 充值 HKD {level.minTopupHkd.toLocaleString("zh-HK")}</small>
                  <small>訂單 {level.minOrderCount} 單</small>
                </td>
                <td>
                  <small>運費 {(level.shippingDiscountRate * 100).toFixed(0)}% · 服務費 {(level.serviceFeeDiscountRate * 100).toFixed(0)}%</small>
                  <small>免倉 +{level.extraFreeStorageDays} 天 · 優先級 {level.priorityLevel}</small>
                </td>
                <td>{(level.commissionRate * 100).toFixed(2)}%</td>
                <td><mark>{level.statusLabel}</mark></td>
                <td>{level.sortOrder}</td>
                <td>
                  <div className="row-actions">
                    <button className="secondary" onClick={() => setEditing(level)} type="button"><Pencil size={15} />編輯</button>
                    <button className="danger" disabled={submitting} onClick={() => void onDelete(`/api/admin/member-levels/${encodeURIComponent(level.id)}/delete`, "會員等級已刪除")} type="button">刪除</button>
                  </div>
                </td>
              </tr>
            ))}
            {pageItems.length === 0 ? <tr><td colSpan={7}>暫無會員等級</td></tr> : null}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button disabled={currentPage <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))} type="button">上一頁</button>
        <span>第 {currentPage} / {totalPages} 頁</span>
        <button disabled={currentPage >= totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))} type="button">下一頁</button>
      </div>

      {showModal ? (
        <div className="modal-backdrop">
          <div className="ticket-modal">
            <button className="modal-close" onClick={closeModal} type="button">關閉</button>
            <section className="panel">
              <PanelTitle icon={<ShieldCheck />} title={current ? "編輯會員等級" : "新增會員等級"} />
              <form className="form-grid" onSubmit={(event) => void submitLevel(event)}>
                <label><span>等級編碼</span><input defaultValue={current?.levelCode ?? ""} name="levelCode" placeholder="LV1" required /></label>
                <label><span>等級名稱</span><input defaultValue={current?.levelName ?? ""} name="levelName" required /></label>
                <label><span>累計消費 HKD</span><input defaultValue={current?.minConsumptionHkd ?? 0} min="0" name="minConsumptionHkd" step="0.01" type="number" /></label>
                <label><span>累計運費 HKD</span><input defaultValue={current?.minShippingFeeHkd ?? 0} min="0" name="minShippingFeeHkd" step="0.01" type="number" /></label>
                <label><span>累計充值 HKD</span><input defaultValue={current?.minTopupHkd ?? 0} min="0" name="minTopupHkd" step="0.01" type="number" /></label>
                <label><span>訂單數量</span><input defaultValue={current?.minOrderCount ?? 0} min="0" name="minOrderCount" type="number" /></label>
                <label><span>運費折扣</span><input defaultValue={current?.shippingDiscountRate ?? 1} min="0" name="shippingDiscountRate" step="0.0001" type="number" /><small>1 = 無折扣，0.95 = 95 折</small></label>
                <label><span>服務費折扣</span><input defaultValue={current?.serviceFeeDiscountRate ?? 1} min="0" name="serviceFeeDiscountRate" step="0.0001" type="number" /></label>
                <label><span>免倉期增加</span><input defaultValue={current?.extraFreeStorageDays ?? 0} min="0" name="extraFreeStorageDays" type="number" /></label>
                <label><span>優先級</span><input defaultValue={current?.priorityLevel ?? 0} min="0" name="priorityLevel" type="number" /></label>
                <label><span>佣金比例</span><input defaultValue={current?.commissionRate ?? 0} min="0" name="commissionRate" step="0.0001" type="number" /></label>
                <label><span>排序</span><input defaultValue={current?.sortOrder ?? 100} name="sortOrder" type="number" /></label>
                <label>
                  <span>狀態</span>
                  <select defaultValue={current?.status ?? "active"} name="status">
                    <option value="active">啟用</option>
                    <option value="disabled">停用</option>
                  </select>
                </label>
                <label className="full"><span>備註</span><textarea defaultValue={current?.remarks ?? ""} name="remarks" /></label>
                <button disabled={submitting} type="submit">{current ? "保存修改" : "新增等級"}</button>
              </form>
            </section>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function MemberPoints({ summary, transactions }: { summary: PointSummary; transactions: PointTransaction[] }) {
  const pageSize = 15;
  const [category, setCategory] = useState("all");
  const [direction, setDirection] = useState("all");
  const [page, setPage] = useState(1);
  const filtered = transactions.filter((item) => {
    const categoryMatched = category === "all" || item.category === category;
    const directionMatched = direction === "all" || item.direction === direction;
    return categoryMatched && directionMatched;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <section className="panel full-span">
      <div className="panel-heading-row">
        <PanelTitle icon={<Gift />} title="我的積分" />
        <span>共 {filtered.length} 筆，每頁 {pageSize} 筆</span>
      </div>
      <div className="points-summary-grid">
        <article>
          <span>可用積分</span>
          <strong>{summary.balance.toLocaleString("zh-HK")}</strong>
        </article>
        <article>
          <span>累計獲得</span>
          <strong>{summary.earned.toLocaleString("zh-HK")}</strong>
        </article>
        <article>
          <span>累計使用</span>
          <strong>{summary.used.toLocaleString("zh-HK")}</strong>
        </article>
      </div>
      <div className="ledger-toolbar">
        <label>
          <span>積分類型</span>
          <select onChange={(event) => { setCategory(event.target.value); setPage(1); }} value={category}>
            {pointCategoryFilters.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
        </label>
        <label>
          <span>方向</span>
          <select onChange={(event) => { setDirection(event.target.value); setPage(1); }} value={direction}>
            <option value="all">全部方向</option>
            <option value="credit">獲得</option>
            <option value="debit">使用</option>
          </select>
        </label>
      </div>
      <div className="table-wrap compact-table point-table">
        <table>
          <thead>
            <tr>
              <th>積分單號</th>
              <th>類型</th>
              <th>方向</th>
              <th>積分</th>
              <th>餘額</th>
              <th>說明</th>
              <th>狀態</th>
              <th>時間</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((item) => (
              <tr key={item.id}>
                <td><strong>{item.id}</strong></td>
                <td>{item.categoryLabel}</td>
                <td>{item.direction === "credit" ? "獲得" : "使用"}</td>
                <td>
                  <strong className={item.direction === "credit" ? "amount-credit" : "amount-debit"}>
                    {item.direction === "credit" ? "+" : "-"} {item.points.toLocaleString("zh-HK")}
                  </strong>
                </td>
                <td>{item.balanceAfter == null ? "-" : item.balanceAfter.toLocaleString("zh-HK")}</td>
                <td>
                  <strong>{item.title}</strong>
                  <small>{item.description || "-"}</small>
                </td>
                <td><mark>{item.statusLabel}</mark></td>
                <td>{new Date(item.createdAt).toLocaleString("zh-HK")}</td>
              </tr>
            ))}
            {pageItems.length === 0 ? <tr><td colSpan={8}>暫無積分流水</td></tr> : null}
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

function MemberOrders({ action, orders, statusFilter, submitting }: { action: (path: string, success: string) => Promise<void>; orders: ProcurementOrder[]; statusFilter: string; submitting: boolean }) {
  return <OrderList action={action} initialStatusFilter={statusFilter} orders={orders} showMemberActions submitting={submitting} title="代購訂單" />;
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
      <section className="stat-grid procurement-stat-grid full-span">
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

const adminPackageStatusFilters = [
  { value: "all", label: "全部" },
  { value: "forecasted", label: "待入庫" },
  { value: "inbounded", label: "已入庫" },
  { value: "claimed", label: "已認領" },
  { value: "shelved", label: "已上架" },
  { value: "consolidated", label: "待合箱" },
  { value: "packed", label: "打包中" },
  { value: "outbounded", label: "已出庫" },
  { value: "orphan", label: "待認領" },
  { value: "destroyed", label: "已銷毀" }
];

function AdminPackageManagement({ packages, warehouses }: { packages: InboundPackage[]; warehouses: WarehouseRecord[] }) {
  const [warehouseId, setWarehouseId] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [detail, setDetail] = useState<InboundPackage | null>(null);
  const pageSize = 15;
  const normalizedKeyword = keyword.trim().toLowerCase();
  const filtered = packages.filter((item) => {
    const matchWarehouse = warehouseId === "all" || item.warehouseId === warehouseId;
    const matchStatus = statusFilter === "all" || item.status === statusFilter;
    const text = [
      item.customerPackageNo,
      item.warehouseInboundNo,
      item.japaneseTrackingNo,
      item.recipientCode,
      item.itemName,
      item.platform,
      item.senderName,
      item.warehouseName,
      item.memberId
    ].filter(Boolean).join(" ").toLowerCase();
    return matchWarehouse && matchStatus && (!normalizedKeyword || text.includes(normalizedKeyword));
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <section className="panel full-span">
      <div className="panel-heading-row">
        <PanelTitle icon={<PackageCheck />} title="包裹管理" />
        <span>共 {filtered.length} 筆，每頁 {pageSize} 筆</span>
      </div>

      <div className="toolbar-row">
        <label>
          <span>倉庫</span>
          <select value={warehouseId} onChange={(event) => { setWarehouseId(event.target.value); setPage(1); }}>
            <option value="all">全部倉庫</option>
            {warehouses.map((warehouse) => <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>)}
          </select>
        </label>
        <label>
          <span>關鍵字</span>
          <input
            placeholder="物流單號、包裹號、入庫號、會員識別碼、商品名稱"
            type="search"
            value={keyword}
            onChange={(event) => {
              setKeyword(event.target.value);
              setPage(1);
            }}
          />
        </label>
      </div>

      <div className="status-filter-row">
        {adminPackageStatusFilters.map((item) => (
          <button
            className={statusFilter === item.value ? "active" : ""}
            key={item.value}
            onClick={() => {
              setStatusFilter(item.value);
              setPage(1);
            }}
            type="button"
          >
            {item.label}
            <span>{item.value === "all" ? packages.length : packages.filter((pkg) => pkg.status === item.value).length}</span>
          </button>
        ))}
      </div>

      <div className="table-wrap compact-table package-management-table">
        <table>
          <thead>
            <tr>
              <th>包裹</th>
              <th>日本物流單號</th>
              <th>倉庫</th>
              <th>會員</th>
              <th>商品</th>
              <th>狀態</th>
              <th>庫位/重量</th>
              <th>更新時間</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((item) => (
              <tr key={item.id}>
                <td><strong>{item.customerPackageNo}</strong><small>入庫號：{item.warehouseInboundNo}</small></td>
                <td>{item.japaneseTrackingNo}</td>
                <td>{item.warehouseName}</td>
                <td><strong>{item.memberId || "無主包裹"}</strong><small>{item.recipientCode ? `識別碼：${item.recipientCode}` : "-"}</small></td>
                <td><strong>{item.itemName}</strong><small>數量 {item.quantity}{item.platform ? ` · ${item.platform}` : ""}{item.senderName ? ` · ${item.senderName}` : ""}</small></td>
                <td><mark>{inboundStatusText(item.status, item.statusLabel)}</mark></td>
                <td><strong>{item.shelfCode || "-"}</strong><small>{item.weightKg ? `${item.weightKg} kg` : "未稱重"}</small></td>
                <td>{new Date(item.updatedAt).toLocaleString("zh-HK")}</td>
                <td><div className="row-actions"><button className="secondary" onClick={() => setDetail(item)} type="button">查看</button></div></td>
              </tr>
            ))}
            {pageItems.length === 0 ? <tr><td colSpan={9}>沒有符合條件的包裹資料</td></tr> : null}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button disabled={currentPage <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))} type="button">上一頁</button>
        <span>第 {currentPage} / {totalPages} 頁</span>
        <button disabled={currentPage >= totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))} type="button">下一頁</button>
      </div>

      {detail ? (
        <div className="modal-backdrop">
          <div className="ticket-modal">
            <button className="modal-close" onClick={() => setDetail(null)} type="button">關閉</button>
            <section className="panel detail-grid">
              <PanelTitle icon={<PackageCheck />} title="包裹詳情" />
              <article><span>客戶包裹號</span><strong>{detail.customerPackageNo}</strong></article>
              <article><span>入庫號</span><strong>{detail.warehouseInboundNo}</strong></article>
              <article><span>日本物流單號</span><strong>{detail.japaneseTrackingNo}</strong></article>
              <article><span>倉庫</span><strong>{detail.warehouseName}</strong></article>
              <article><span>會員</span><strong>{detail.memberId || "無主包裹"}</strong></article>
              <article><span>會員識別碼</span><strong>{detail.recipientCode || "-"}</strong></article>
              <article><span>狀態</span><strong>{inboundStatusText(detail.status, detail.statusLabel)}</strong></article>
              <article><span>庫位</span><strong>{detail.shelfCode || "-"}</strong></article>
              <article><span>商品名稱</span><strong>{detail.itemName}</strong></article>
              <article><span>數量</span><strong>{detail.quantity}</strong></article>
              <article><span>平台</span><strong>{detail.platform || "-"}</strong></article>
              <article><span>寄件人</span><strong>{detail.senderName || "-"}</strong></article>
              <article><span>重量</span><strong>{detail.weightKg ? `${detail.weightKg} kg` : "-"}</strong></article>
              <article><span>尺寸</span><strong>{[detail.lengthCm, detail.widthCm, detail.heightCm].every(Boolean) ? `${detail.lengthCm} x ${detail.widthCm} x ${detail.heightCm} cm` : "-"}</strong></article>
              <article><span>入庫時間</span><strong>{detail.inboundedAt ? new Date(detail.inboundedAt).toLocaleString("zh-HK") : "-"}</strong></article>
              <article><span>更新時間</span><strong>{new Date(detail.updatedAt).toLocaleString("zh-HK")}</strong></article>
              <article className="full"><span>備註</span><strong>{detail.remarks || "-"}</strong></article>
              <article className="full"><span>內部備註</span><strong>{detail.adminNote || "-"}</strong></article>
            </section>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function AdminInboundScan({
  onSubmit,
  packages,
  submitting,
  warehouses
}: {
  onSubmit: (path: string, body: Record<string, unknown>, success: string) => Promise<void>;
  packages: InboundPackage[];
  submitting: boolean;
  warehouses: WarehouseRecord[];
}) {
  const inboundWarehouses = warehouses.filter((warehouse) => warehouse.allowInbound);
  const recent = packages.slice(0, 8);

  async function submitScan(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const body = Object.fromEntries(new FormData(form).entries());
    await onSubmit("/api/admin/inbound/scan", body, "包裹已入庫");
    form.reset();
  }

  return (
    <section className="panel full-span">
      <div className="panel-heading-row">
        <PanelTitle icon={<PackagePlus />} title="入庫掃碼" />
        <div className="panel-actions">
          <span>掃碼或輸入日本物流單號，系統會根據會員識別碼自動匹配。</span>
        </div>
      </div>
      <form className="form-grid inbound-scan-form" onSubmit={(event) => void submitScan(event)}>
        <label>
          <span>入庫倉庫</span>
          <select name="warehouseId" required>
            {inboundWarehouses.map((warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
            ))}
          </select>
        </label>
        <label><span>日本物流單號</span><input autoFocus name="japaneseTrackingNo" placeholder="掃碼或輸入 Tracking No." required /></label>
        <label><span>會員識別碼</span><input name="recipientCode" placeholder="如 A7K3D，可空白成為無主包裹" /></label>
        <label><span>購物平台</span><input name="platform" placeholder="Mercari / Amazon / Yahoo" /></label>
        <label><span>寄件人</span><input name="senderName" /></label>
        <label><span>商品名稱</span><input name="itemName" placeholder="未填則為未命名包裹" /></label>
        <label><span>數量</span><input defaultValue={1} min="1" name="quantity" type="number" /></label>
        <label><span>重量 kg</span><input min="0" name="weightKg" step="0.01" type="number" /></label>
        <label><span>長 cm</span><input min="0" name="lengthCm" type="number" /></label>
        <label><span>寬 cm</span><input min="0" name="widthCm" type="number" /></label>
        <label><span>高 cm</span><input min="0" name="heightCm" type="number" /></label>
        <label><span>庫位編碼</span><input name="shelfCode" placeholder="可先空白，後續上架補錄" /></label>
        <label className="full"><span>備註</span><textarea name="adminNote" placeholder="破損、少件、需拍照等內部備註" /></label>
        <button disabled={submitting || inboundWarehouses.length === 0} type="submit">確認入庫</button>
      </form>

      <div className="sub-panel">
        <div className="panel-heading-row">
          <PanelTitle icon={<ClipboardList />} title="最近入庫記錄" />
          <span>顯示最近 {recent.length} 筆</span>
        </div>
        <div className="table-wrap compact-table">
          <table>
            <thead>
              <tr>
                <th>包裹</th>
                <th>物流單號</th>
                <th>倉庫</th>
                <th>會員</th>
                <th>商品</th>
                <th>狀態</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((item) => (
                <tr key={item.id}>
                  <td><strong>{item.id}</strong><small>{item.warehouseInboundNo}</small></td>
                  <td>{item.japaneseTrackingNo}</td>
                  <td>{item.warehouseName}</td>
                  <td>{item.recipientCode || "-"}</td>
                  <td><strong>{item.itemName}</strong><small>數量：{item.quantity}</small></td>
                  <td><mark>{item.statusLabel}</mark></td>
                </tr>
              ))}
              {recent.length === 0 ? <tr><td colSpan={6}>暫無入庫記錄</td></tr> : null}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function AdminShelving({
  locations,
  onSubmit,
  packages,
  submitting,
  warehouses
}: {
  locations: WarehouseLocation[];
  onSubmit: (path: string, body: Record<string, unknown>, success: string) => Promise<void>;
  packages: InboundPackage[];
  submitting: boolean;
  warehouses: WarehouseRecord[];
}) {
  const [warehouseFilter, setWarehouseFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("pending");
  const candidates = packages.filter((item) => {
    const matchWarehouse = warehouseFilter === "all" || item.warehouseId === warehouseFilter;
    const isPending = ["forecasted", "inbounded", "claimed", "orphan"].includes(item.status) && !item.shelfCode;
    const matchStatus = statusFilter === "all" ? true : statusFilter === "pending" ? isPending : item.status === statusFilter;
    return matchWarehouse && matchStatus;
  });

  function locationOptions(packageItem: InboundPackage) {
    return locations.filter((location) => location.warehouseId === packageItem.warehouseId && ["active", "occupied"].includes(location.status));
  }

  async function submitShelve(event: FormEvent<HTMLFormElement>, packageId: string) {
    event.preventDefault();
    const body = Object.fromEntries(new FormData(event.currentTarget).entries());
    await onSubmit(`/api/admin/inbound/packages/${encodeURIComponent(packageId)}/shelve`, body, "包裹已上架");
  }

  return (
    <section className="panel full-span">
      <div className="panel-heading-row">
        <PanelTitle icon={<Warehouse />} title="上架管理" />
        <div className="panel-actions">
          <span>共 {candidates.length} 個待處理包裹</span>
        </div>
      </div>
      <div className="status-filter-bar">
        <button className={statusFilter === "pending" ? "active" : ""} onClick={() => setStatusFilter("pending")} type="button">待上架</button>
        <button className={statusFilter === "inbounded" ? "active" : ""} onClick={() => setStatusFilter("inbounded")} type="button">已入庫</button>
        <button className={statusFilter === "claimed" ? "active" : ""} onClick={() => setStatusFilter("claimed")} type="button">已認領</button>
        <button className={statusFilter === "orphan" ? "active" : ""} onClick={() => setStatusFilter("orphan")} type="button">無主包裹</button>
        <button className={statusFilter === "shelved" ? "active" : ""} onClick={() => setStatusFilter("shelved")} type="button">已上架</button>
        <button className={statusFilter === "all" ? "active" : ""} onClick={() => setStatusFilter("all")} type="button">全部</button>
      </div>
      <div className="toolbar-row">
        <label>
          <span>倉庫</span>
          <select value={warehouseFilter} onChange={(event) => setWarehouseFilter(event.target.value)}>
            <option value="all">全部倉庫</option>
            {warehouses.map((warehouse) => <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>)}
          </select>
        </label>
      </div>
      <div className="table-wrap compact-table">
        <table>
          <thead>
            <tr>
              <th>包裹</th>
              <th>物流單號</th>
              <th>倉庫</th>
              <th>商品</th>
              <th>會員</th>
              <th>狀態</th>
              <th>庫位</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((item) => {
              const options = locationOptions(item);
              return (
                <tr key={item.id}>
                  <td><strong>{item.id}</strong><small>{item.warehouseInboundNo}</small></td>
                  <td>{item.japaneseTrackingNo}</td>
                  <td>{item.warehouseName}</td>
                  <td><strong>{item.itemName}</strong><small>數量：{item.quantity}</small></td>
                  <td>{item.recipientCode || "-"}</td>
                  <td><mark>{inboundStatusText(item.status, item.statusLabel)}</mark></td>
                  <td>{item.shelfCode || "未上架"}</td>
                  <td>
                    <form className="inline-action-form" onSubmit={(event) => void submitShelve(event, item.id)}>
                      <select defaultValue="" name="locationId" required>
                        <option value="" disabled>選擇庫位</option>
                        {options.map((location) => (
                          <option key={location.id} value={location.id}>{location.code} · {location.locationTypeLabel}</option>
                        ))}
                      </select>
                      <button disabled={submitting || options.length === 0} type="submit">上架</button>
                    </form>
                  </td>
                </tr>
              );
            })}
            {candidates.length === 0 ? <tr><td colSpan={8}>暫無符合條件包裹</td></tr> : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function AdminOrphanPackages({
  action,
  onSubmit,
  packages,
  submitting
}: {
  action: (path: string, success: string) => Promise<void>;
  onSubmit: (path: string, body: Record<string, unknown>, success: string) => Promise<void>;
  packages: InboundPackage[];
  submitting: boolean;
}) {
  const orphanPackages = packages.filter((item) => item.status === "orphan");

  async function submitClaim(event: FormEvent<HTMLFormElement>, packageId: string) {
    event.preventDefault();
    const body = Object.fromEntries(new FormData(event.currentTarget).entries());
    await onSubmit(`/api/admin/inbound/packages/${encodeURIComponent(packageId)}/claim`, body, "包裹已認領");
  }

  function ageDays(createdAt: string) {
    const created = new Date(createdAt).getTime();
    if (!Number.isFinite(created)) return 0;
    return Math.max(0, Math.floor((Date.now() - created) / 86400000));
  }

  return (
    <section className="panel full-span">
      <div className="panel-heading-row">
        <PanelTitle icon={<ClipboardList />} title="無主包裹" />
        <div className="panel-actions">
          <span>共 {orphanPackages.length} 個無主包裹，超過 60 天可按流程銷毀。</span>
        </div>
      </div>
      <div className="table-wrap compact-table">
        <table>
          <thead>
            <tr>
              <th>包裹</th>
              <th>物流單號</th>
              <th>倉庫/庫位</th>
              <th>商品</th>
              <th>停留天數</th>
              <th>認領</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {orphanPackages.map((item) => {
              const days = ageDays(item.createdAt);
              return (
                <tr key={item.id}>
                  <td><strong>{item.id}</strong><small>{item.warehouseInboundNo}</small></td>
                  <td>{item.japaneseTrackingNo}</td>
                  <td><strong>{item.warehouseName}</strong><small>{item.shelfCode || "未上架"}</small></td>
                  <td><strong>{item.itemName}</strong><small>{item.platform || "-"}</small></td>
                  <td><mark>{days} 天</mark></td>
                  <td>
                    <form className="inline-action-form" onSubmit={(event) => void submitClaim(event, item.id)}>
                      <input name="memberCode" placeholder="會員識別碼" required />
                      <button disabled={submitting} type="submit">認領</button>
                    </form>
                  </td>
                  <td>
                    <button
                      className="danger"
                      disabled={submitting}
                      onClick={() => void action(`/api/admin/inbound/packages/${encodeURIComponent(item.id)}/destroy`, "無主包裹已標記銷毀")}
                      type="button"
                    >
                      <Trash2 size={15} />銷毀
                    </button>
                  </td>
                </tr>
              );
            })}
            {orphanPackages.length === 0 ? <tr><td colSpan={7}>暫無無主包裹</td></tr> : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function AdminValueAdded({
  onSubmit,
  packages,
  requests,
  services,
  submitting
}: {
  onSubmit: (path: string, body: Record<string, unknown>, success: string) => Promise<void>;
  packages: InboundPackage[];
  requests: ValueAddedRequest[];
  services: FeeSetting[];
  submitting: boolean;
}) {
  const [creating, setCreating] = useState(false);
  const [statusFilter, setStatusFilter] = useState("pending");
  const filtered = requests.filter((item) => statusFilter === "all" || item.status === statusFilter);
  const packageOptions = packages.filter((item) => !["outbounded", "destroyed"].includes(item.status));

  async function submitCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = {
      ...Object.fromEntries(formData.entries()),
      serviceCodes: formData.getAll("serviceCodes")
    };
    await onSubmit("/api/admin/value-added", body, "增值服務已新增");
    setCreating(false);
  }

  async function submitStatus(event: FormEvent<HTMLFormElement>, id: string, status: string) {
    event.preventDefault();
    const body = {
      ...Object.fromEntries(new FormData(event.currentTarget).entries()),
      status
    };
    await onSubmit(`/api/admin/value-added/${encodeURIComponent(id)}/status`, body, status === "completed" ? "增值服務已完成" : "增值服務狀態已更新");
  }

  return (
    <section className="panel full-span">
      <div className="panel-heading-row">
        <PanelTitle icon={<Tags />} title="增值服務" />
        <div className="panel-actions">
          <span>共 {filtered.length} 筆</span>
          <button onClick={() => setCreating(true)} type="button"><Plus size={16} />新增服務</button>
        </div>
      </div>
      <div className="status-filter-bar">
        {[
          ["pending", "待處理"],
          ["processing", "處理中"],
          ["completed", "已完成"],
          ["cancelled", "已取消"],
          ["all", "全部"]
        ].map(([value, label]) => (
          <button className={statusFilter === value ? "active" : ""} key={value} onClick={() => setStatusFilter(value)} type="button">{label}</button>
        ))}
      </div>
      <div className="table-wrap compact-table">
        <table>
          <thead>
            <tr>
              <th>包裹</th>
              <th>倉庫/庫位</th>
              <th>會員</th>
              <th>服務</th>
              <th>費用</th>
              <th>狀態</th>
              <th>備註</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id}>
                <td><strong>{item.packageId}</strong><small>{item.packageTrackingNo || "-"} · {item.packageItemName || "-"}</small></td>
                <td><strong>{item.warehouseName || item.warehouseId}</strong><small>{item.packageShelfCode || "未上架"}</small></td>
                <td>{item.memberUserCode || item.memberEmail || "-"}</td>
                <td><strong>{item.serviceName}</strong><small>{item.serviceCode}</small></td>
                <td>HKD {item.amountHkd.toLocaleString("zh-HK")}</td>
                <td><mark>{item.statusLabel}</mark></td>
                <td><small>{item.requestNote || item.processNote || "-"}</small></td>
                <td>
                  <form className="inline-action-form" onSubmit={(event) => void submitStatus(event, item.id, item.status === "pending" ? "processing" : "completed")}>
                    <input name="processNote" placeholder="處理備註" />
                    <button disabled={submitting || item.status === "completed" || item.status === "cancelled"} type="submit">
                      {item.status === "pending" ? "開始" : "完成"}
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {filtered.length === 0 ? <tr><td colSpan={8}>暫無增值服務</td></tr> : null}
          </tbody>
        </table>
      </div>

      {creating ? (
        <div className="modal-backdrop">
          <div className="ticket-modal">
            <button className="modal-close" onClick={() => setCreating(false)} type="button">關閉</button>
            <section className="panel">
              <PanelTitle icon={<Tags />} title="新增增值服務" />
              <form className="form-grid" onSubmit={(event) => void submitCreate(event)}>
                <label className="full">
                  <span>包裹</span>
                  <select name="packageId" required>
                    <option value="">請選擇包裹</option>
                    {packageOptions.map((item) => (
                      <option key={item.id} value={item.id}>{item.id} · {item.warehouseName} · {item.itemName}</option>
                    ))}
                  </select>
                </label>
                <div className="full warehouse-permission-box">
                  <span>服務項目</span>
                  <small>價格來自「費用配置」中的增值服務費。</small>
                  <div>
                    {services.map((service) => (
                      <label key={service.feeCode}>
                        <input name="serviceCodes" type="checkbox" value={service.feeCode} />
                        {service.feeName} · HKD {service.amountHkd}
                      </label>
                    ))}
                  </div>
                </div>
                <label className="full"><span>需求備註</span><textarea name="requestNote" placeholder="例如：請拍外盒四面、易碎品加強包裝" /></label>
                <button disabled={submitting || packageOptions.length === 0 || services.length === 0} type="submit">新增增值服務</button>
              </form>
            </section>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function AdminConsolidation({
  batches,
  onSubmit,
  packages,
  submitting
}: {
  batches: ConsolidationBatch[];
  onSubmit: (path: string, body: Record<string, unknown>, success: string) => Promise<void>;
  packages: InboundPackage[];
  submitting: boolean;
}) {
  const [creating, setCreating] = useState(false);
  const [selectedMember, setSelectedMember] = useState("");
  const candidates = packages.filter((item) => ["shelved", "claimed", "inbounded"].includes(item.status) && !item.consolidationBatchNo && item.memberId);
  const memberOptions = Array.from(new Map(candidates.map((item) => [item.memberId!, `${item.recipientCode || item.memberId} · ${item.warehouseName}`])).entries());
  const visibleCandidates = selectedMember ? candidates.filter((item) => item.memberId === selectedMember) : candidates;

  async function submitCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = {
      ...Object.fromEntries(formData.entries()),
      packageIds: formData.getAll("packageIds")
    };
    await onSubmit("/api/admin/consolidation-batches", body, "合箱批次已建立");
    setCreating(false);
  }

  return (
    <section className="panel full-span">
      <div className="panel-heading-row">
        <PanelTitle icon={<Boxes />} title="合箱管理" />
        <div className="panel-actions">
          <span>共 {batches.length} 個批次</span>
          <button onClick={() => setCreating(true)} type="button"><Plus size={16} />新增合箱</button>
        </div>
      </div>
      <div className="table-wrap compact-table">
        <table>
          <thead>
            <tr>
              <th>批次</th>
              <th>倉庫</th>
              <th>會員</th>
              <th>包裹數</th>
              <th>紙箱</th>
              <th>狀態</th>
              <th>包裹</th>
            </tr>
          </thead>
          <tbody>
            {batches.map((batch) => (
              <tr key={batch.id}>
                <td><strong>{batch.batchNo}</strong><small>{new Date(batch.createdAt).toLocaleString("zh-HK")}</small></td>
                <td>{batch.warehouseName || batch.warehouseId}</td>
                <td>{batch.memberUserCode || batch.memberEmail || "-"}</td>
                <td>{batch.packageCount}</td>
                <td><strong>{batch.cartonType || "-"}</strong><small>HKD {batch.cartonFeeHkd}</small></td>
                <td><mark>{batch.statusLabel}</mark></td>
                <td><small>{batch.packageIds.join("、") || "-"}</small></td>
              </tr>
            ))}
            {batches.length === 0 ? <tr><td colSpan={7}>暫無合箱批次</td></tr> : null}
          </tbody>
        </table>
      </div>

      {creating ? (
        <div className="modal-backdrop">
          <div className="ticket-modal">
            <button className="modal-close" onClick={() => setCreating(false)} type="button">關閉</button>
            <section className="panel">
              <PanelTitle icon={<Boxes />} title="新增合箱批次" />
              <form className="form-grid" onSubmit={(event) => void submitCreate(event)}>
                <label>
                  <span>會員/倉庫</span>
                  <select value={selectedMember} onChange={(event) => setSelectedMember(event.target.value)}>
                    <option value="">全部可合箱包裹</option>
                    {memberOptions.map(([id, label]) => <option key={id} value={id}>{label}</option>)}
                  </select>
                </label>
                <label><span>紙箱類型</span><input name="cartonType" placeholder="小號 / 中號 / 大號" /></label>
                <label><span>紙箱費 HKD</span><input defaultValue={0} min="0" name="cartonFeeHkd" step="0.01" type="number" /></label>
                <div className="full warehouse-permission-box">
                  <span>選擇包裹</span>
                  <small>合箱包裹必須屬於同一會員及同一倉庫。</small>
                  <div>
                    {visibleCandidates.map((item) => (
                      <label key={item.id}>
                        <input name="packageIds" type="checkbox" value={item.id} />
                        {item.id} · {item.itemName} · {item.shelfCode || "未上架"}
                      </label>
                    ))}
                  </div>
                </div>
                <label className="full"><span>備註</span><textarea name="remarks" /></label>
                <button disabled={submitting || visibleCandidates.length === 0} type="submit">建立合箱批次</button>
              </form>
            </section>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function AdminPackingOutbound({
  batches,
  onSubmit,
  submitting
}: {
  batches: ConsolidationBatch[];
  onSubmit: (path: string, body: Record<string, unknown>, success: string) => Promise<void>;
  submitting: boolean;
}) {
  const [statusFilter, setStatusFilter] = useState("created");
  const filtered = batches.filter((batch) => statusFilter === "all" || batch.status === statusFilter);

  async function submitPack(event: FormEvent<HTMLFormElement>, batchId: string) {
    event.preventDefault();
    const body = Object.fromEntries(new FormData(event.currentTarget).entries());
    await onSubmit(`/api/admin/consolidation-batches/${encodeURIComponent(batchId)}/pack`, body, "批次已打包");
  }

  async function submitOutbound(event: FormEvent<HTMLFormElement>, batchId: string) {
    event.preventDefault();
    const body = Object.fromEntries(new FormData(event.currentTarget).entries());
    await onSubmit(`/api/admin/consolidation-batches/${encodeURIComponent(batchId)}/outbound`, body, "批次已出庫");
  }

  return (
    <section className="panel full-span">
      <div className="panel-heading-row">
        <PanelTitle icon={<PackageCheck />} title="打包出庫" />
        <div className="panel-actions">
          <span>共 {filtered.length} 個批次</span>
        </div>
      </div>
      <div className="status-filter-bar">
        {[
          ["created", "待打包"],
          ["packed", "已打包"],
          ["outbounded", "已出庫"],
          ["all", "全部"]
        ].map(([value, label]) => (
          <button className={statusFilter === value ? "active" : ""} key={value} onClick={() => setStatusFilter(value)} type="button">{label}</button>
        ))}
      </div>
      <div className="table-wrap compact-table">
        <table>
          <thead>
            <tr>
              <th>批次</th>
              <th>倉庫/會員</th>
              <th>包裹</th>
              <th>重量尺寸</th>
              <th>物流</th>
              <th>狀態</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((batch) => (
              <tr key={batch.id}>
                <td><strong>{batch.batchNo}</strong><small>{batch.cartonType || "-"} · 紙箱費 HKD {batch.cartonFeeHkd}</small></td>
                <td><strong>{batch.warehouseName || batch.warehouseId}</strong><small>{batch.memberUserCode || batch.memberEmail || "-"}</small></td>
                <td><strong>{batch.packageCount} 件</strong><small>{batch.packageIds.join("、")}</small></td>
                <td>
                  <strong>{batch.weightKg ? `${batch.weightKg} kg` : "-"}</strong>
                  <small>{batch.lengthCm && batch.widthCm && batch.heightCm ? `${batch.lengthCm} x ${batch.widthCm} x ${batch.heightCm} cm` : "-"}</small>
                </td>
                <td><strong>{batch.logisticsProductName || "-"}</strong><small>{batch.internationalTrackingNo || "-"}</small></td>
                <td><mark>{batch.statusLabel}</mark></td>
                <td>
                  {batch.status === "created" ? (
                    <form className="inline-action-form wide-inline-form" onSubmit={(event) => void submitPack(event, batch.id)}>
                      <input name="weightKg" placeholder="kg" required type="number" min="0" step="0.01" />
                      <input name="lengthCm" placeholder="長" type="number" min="0" step="0.1" />
                      <input name="widthCm" placeholder="寬" type="number" min="0" step="0.1" />
                      <input name="heightCm" placeholder="高" type="number" min="0" step="0.1" />
                      <input name="logisticsProductName" placeholder="物流產品" />
                      <input name="shippingFeeHkd" placeholder="運費HKD" type="number" min="0" step="0.01" />
                      <button disabled={submitting} type="submit">打包</button>
                    </form>
                  ) : batch.status === "packed" ? (
                    <form className="inline-action-form" onSubmit={(event) => void submitOutbound(event, batch.id)}>
                      <input name="internationalTrackingNo" placeholder="國際物流號" required />
                      <button disabled={submitting} type="submit">出庫</button>
                    </form>
                  ) : (
                    <span>{batch.internationalTrackingNo || "已處理"}</span>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 ? <tr><td colSpan={7}>暫無批次</td></tr> : null}
          </tbody>
        </table>
      </div>
    </section>
  );
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
              <th>倉租</th>
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
                <td>
                  <strong>免倉 {item.freeStorageDays ?? 30} 天</strong>
                  <small>HKD {(item.storageFeeHkdPerDay ?? 0).toLocaleString("zh-HK")} / 天</small>
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
            {warehouses.length === 0 ? <tr><td colSpan={9}>暫無倉庫資料</td></tr> : null}
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
                <label><span>免倉期天數</span><input defaultValue={current?.freeStorageDays ?? 30} min="0" name="freeStorageDays" type="number" /></label>
                <label><span>倉儲費 / 天 (HKD)</span><input defaultValue={current?.storageFeeHkdPerDay ?? 0} min="0" name="storageFeeHkdPerDay" type="number" /></label>
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

function AdminWarehouseShelves({
  onDelete,
  onSubmit,
  shelves,
  submitting,
  warehouses
}: {
  onDelete: (path: string, success: string) => Promise<void>;
  onSubmit: (path: string, body: Record<string, unknown>, success: string) => Promise<void>;
  shelves: WarehouseShelf[];
  submitting: boolean;
  warehouses: WarehouseRecord[];
}) {
  const [editing, setEditing] = useState<WarehouseShelf | null>(null);
  const [creating, setCreating] = useState(false);
  const current = editing;
  const showModal = creating || Boolean(editing);

  function closeModal() {
    setCreating(false);
    setEditing(null);
  }

  async function submitShelf(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = Object.fromEntries(new FormData(event.currentTarget).entries());
    await onSubmit(current ? `/api/admin/warehouse-shelves/${encodeURIComponent(current.id)}` : "/api/admin/warehouse-shelves", body, current ? "貨架已更新" : "貨架已新增");
    closeModal();
  }

  return (
    <section className="panel full-span">
      <div className="panel-heading-row">
        <PanelTitle icon={<Boxes />} title="貨架管理" />
        <div className="panel-actions">
          <span>共 {shelves.length} 個貨架</span>
          <button onClick={() => setCreating(true)} type="button"><Plus size={16} />新增貨架</button>
        </div>
      </div>
      <div className="table-wrap compact-table">
        <table>
          <thead>
            <tr>
              <th>貨架</th>
              <th>倉庫</th>
              <th>區域/貨架號</th>
              <th>庫位數</th>
              <th>狀態</th>
              <th>排序</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {shelves.map((item) => (
              <tr key={item.id}>
                <td><strong>{item.name}</strong><small>{item.code}</small></td>
                <td>{item.warehouseName ?? item.warehouseId}</td>
                <td><strong>{item.areaCode || "-"}</strong><small>{item.shelfNo || "-"}</small></td>
                <td>{item.locationCount}</td>
                <td><mark>{item.statusLabel}</mark></td>
                <td>{item.sortOrder}</td>
                <td>
                  <div className="row-actions">
                    <button className="secondary" onClick={() => setEditing(item)} type="button"><Pencil size={15} />編輯</button>
                    <button className="danger" disabled={submitting} onClick={() => void onDelete(`/api/admin/warehouse-shelves/${encodeURIComponent(item.id)}/delete`, "貨架已刪除")} type="button"><Trash2 size={15} />刪除</button>
                  </div>
                </td>
              </tr>
            ))}
            {shelves.length === 0 ? <tr><td colSpan={7}>暫無貨架資料</td></tr> : null}
          </tbody>
        </table>
      </div>

      {showModal ? (
        <div className="modal-backdrop">
          <div className="ticket-modal">
            <button className="modal-close" onClick={closeModal} type="button">關閉</button>
            <section className="panel">
              <PanelTitle icon={<Boxes />} title={current ? "編輯貨架" : "新增貨架"} />
              <form className="form-grid" onSubmit={(event) => void submitShelf(event)}>
                <label>
                  <span>所屬倉庫</span>
                  <select defaultValue={current?.warehouseId ?? warehouses[0]?.id ?? ""} name="warehouseId" required>
                    {warehouses.map((warehouse) => <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>)}
                  </select>
                </label>
                <label><span>貨架編碼</span><input defaultValue={current?.code ?? ""} name="code" placeholder="A01" required /></label>
                <label><span>貨架名稱</span><input defaultValue={current?.name ?? ""} name="name" placeholder="A01 貨架" required /></label>
                <label><span>區域</span><input defaultValue={current?.areaCode ?? ""} name="areaCode" placeholder="A" /></label>
                <label><span>貨架號</span><input defaultValue={current?.shelfNo ?? ""} name="shelfNo" placeholder="01" /></label>
                <label>
                  <span>狀態</span>
                  <select defaultValue={current?.status ?? "active"} name="status">
                    <option value="active">啟用</option>
                    <option value="disabled">停用</option>
                  </select>
                </label>
                <label><span>排序</span><input defaultValue={current?.sortOrder ?? 100} min="0" name="sortOrder" type="number" /></label>
                <label className="full"><span>備註</span><textarea defaultValue={current?.remarks ?? ""} name="remarks" /></label>
                <button disabled={submitting} type="submit">{current ? "保存貨架" : "新增貨架"}</button>
              </form>
            </section>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function AdminWarehouseLocations({
  locations,
  onDelete,
  onSubmit,
  shelves,
  submitting,
  warehouses
}: {
  locations: WarehouseLocation[];
  onDelete: (path: string, success: string) => Promise<void>;
  onSubmit: (path: string, body: Record<string, unknown>, success: string) => Promise<void>;
  shelves: WarehouseShelf[];
  submitting: boolean;
  warehouses: WarehouseRecord[];
}) {
  const [editing, setEditing] = useState<WarehouseLocation | null>(null);
  const [creating, setCreating] = useState(false);
  const [bulkCreating, setBulkCreating] = useState(false);
  const current = editing;
  const showModal = creating || Boolean(editing);
  const activeShelves = shelves.filter((shelf) => shelf.status === "active");

  function closeModal() {
    setCreating(false);
    setEditing(null);
    setBulkCreating(false);
  }

  async function submitLocation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = Object.fromEntries(new FormData(event.currentTarget).entries());
    await onSubmit(current ? `/api/admin/warehouse-locations/${encodeURIComponent(current.id)}` : "/api/admin/warehouse-locations", body, current ? "庫位已更新" : "庫位已新增");
    closeModal();
  }

  async function submitBulk(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = Object.fromEntries(new FormData(event.currentTarget).entries());
    await onSubmit("/api/admin/warehouse-locations/bulk", body, "庫位已批量生成");
    closeModal();
  }

  return (
    <section className="panel full-span">
      <div className="panel-heading-row">
        <PanelTitle icon={<MapPin />} title="庫位管理" />
        <div className="panel-actions">
          <span>共 {locations.length} 個庫位</span>
          <button className="secondary" onClick={() => setBulkCreating(true)} type="button"><Plus size={16} />批量生成</button>
          <button onClick={() => setCreating(true)} type="button"><Plus size={16} />新增庫位</button>
        </div>
      </div>
      <div className="table-wrap compact-table">
        <table>
          <thead>
            <tr>
              <th>庫位</th>
              <th>倉庫</th>
              <th>貨架</th>
              <th>層/格口</th>
              <th>類型</th>
              <th>容量</th>
              <th>狀態</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((item) => (
              <tr key={item.id}>
                <td><strong>{item.code}</strong><small>{item.remarks || "-"}</small></td>
                <td>{item.warehouseName ?? item.warehouseId}</td>
                <td>{item.shelfCode ?? item.shelfId}</td>
                <td><strong>{item.layerNo ?? "-"}</strong><small>{item.slotNo ?? "-"}</small></td>
                <td>{item.locationTypeLabel}</td>
                <td>
                  <strong>{item.maxPackages ? `${item.maxPackages} 件` : "-"}</strong>
                  <small>{item.maxWeightKg ? `${item.maxWeightKg} kg` : "-"}</small>
                </td>
                <td><mark>{item.statusLabel}</mark></td>
                <td>
                  <div className="row-actions">
                    <button className="secondary" onClick={() => setEditing(item)} type="button"><Pencil size={15} />編輯</button>
                    <button className="danger" disabled={submitting} onClick={() => void onDelete(`/api/admin/warehouse-locations/${encodeURIComponent(item.id)}/delete`, "庫位已刪除")} type="button"><Trash2 size={15} />刪除</button>
                  </div>
                </td>
              </tr>
            ))}
            {locations.length === 0 ? <tr><td colSpan={8}>暫無庫位資料</td></tr> : null}
          </tbody>
        </table>
      </div>

      {showModal ? (
        <LocationModal
          current={current}
          onClose={closeModal}
          onSubmit={submitLocation}
          shelves={activeShelves}
          submitting={submitting}
          warehouses={warehouses}
        />
      ) : null}
      {bulkCreating ? (
        <div className="modal-backdrop">
          <div className="ticket-modal">
            <button className="modal-close" onClick={closeModal} type="button">關閉</button>
            <section className="panel">
              <PanelTitle icon={<MapPin />} title="批量生成庫位" />
              <form className="form-grid" onSubmit={(event) => void submitBulk(event)}>
                <label>
                  <span>所屬倉庫</span>
                  <select defaultValue={warehouses[0]?.id ?? ""} name="warehouseId" required>
                    {warehouses.map((warehouse) => <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>)}
                  </select>
                </label>
                <label>
                  <span>所屬貨架</span>
                  <select defaultValue={activeShelves[0]?.id ?? ""} name="shelfId" required>
                    {activeShelves.map((shelf) => <option key={shelf.id} value={shelf.id}>{shelf.warehouseName} · {shelf.code}</option>)}
                  </select>
                </label>
                <label><span>區域</span><input defaultValue="A" name="areaCode" required /></label>
                <label><span>貨架號</span><input defaultValue="01" name="shelfNo" required /></label>
                <label><span>層數</span><input defaultValue={5} min="1" max="30" name="layerCount" type="number" /></label>
                <label><span>每層格口</span><input defaultValue={20} min="1" max="200" name="slotsPerLayer" type="number" /></label>
                <LocationTypeSelect />
                <label><span>每庫位最大件數</span><input min="0" name="maxPackages" type="number" /></label>
                <label><span>每庫位最大重量 kg</span><input min="0" name="maxWeightKg" step="0.01" type="number" /></label>
                <label className="full"><span>備註</span><textarea name="remarks" /></label>
                <button disabled={submitting} type="submit">生成庫位</button>
              </form>
            </section>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function LocationTypeSelect({ defaultValue = "normal" }: { defaultValue?: string }) {
  return (
    <label>
      <span>庫位類型</span>
      <select defaultValue={defaultValue} name="locationType">
        <option value="normal">普通</option>
        <option value="valuable">貴重</option>
        <option value="large">大件</option>
        <option value="exception">異常</option>
        <option value="pending">待處理</option>
      </select>
    </label>
  );
}

function LocationModal({
  current,
  onClose,
  onSubmit,
  shelves,
  submitting,
  warehouses
}: {
  current: WarehouseLocation | null;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  shelves: WarehouseShelf[];
  submitting: boolean;
  warehouses: WarehouseRecord[];
}) {
  const warehouseId = current?.warehouseId ?? warehouses[0]?.id ?? "";
  const shelfOptions = shelves.filter((shelf) => shelf.warehouseId === warehouseId);
  return (
    <div className="modal-backdrop">
      <div className="ticket-modal">
        <button className="modal-close" onClick={onClose} type="button">關閉</button>
        <section className="panel">
          <PanelTitle icon={<MapPin />} title={current ? "編輯庫位" : "新增庫位"} />
          <form className="form-grid" onSubmit={onSubmit}>
            <label>
              <span>所屬倉庫</span>
              <select defaultValue={warehouseId} name="warehouseId" required>
                {warehouses.map((warehouse) => <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>)}
              </select>
            </label>
            <label>
              <span>所屬貨架</span>
              <select defaultValue={current?.shelfId ?? shelfOptions[0]?.id ?? shelves[0]?.id ?? ""} name="shelfId" required>
                {shelves.map((shelf) => <option key={shelf.id} value={shelf.id}>{shelf.warehouseName} · {shelf.code}</option>)}
              </select>
            </label>
            <label><span>庫位編碼</span><input defaultValue={current?.code ?? ""} name="code" placeholder="A-01-01-01" required /></label>
            <label><span>區域</span><input defaultValue={current?.areaCode ?? ""} name="areaCode" /></label>
            <label><span>貨架號</span><input defaultValue={current?.shelfNo ?? ""} name="shelfNo" /></label>
            <label><span>層號</span><input defaultValue={current?.layerNo ?? ""} min="0" name="layerNo" type="number" /></label>
            <label><span>格口號</span><input defaultValue={current?.slotNo ?? ""} min="0" name="slotNo" type="number" /></label>
            <LocationTypeSelect defaultValue={current?.locationType ?? "normal"} />
            <label>
              <span>狀態</span>
              <select defaultValue={current?.status ?? "active"} name="status">
                <option value="active">啟用</option>
                <option value="disabled">停用</option>
                <option value="occupied">占用</option>
                <option value="maintenance">維護中</option>
              </select>
            </label>
            <label><span>最大件數</span><input defaultValue={current?.maxPackages ?? ""} min="0" name="maxPackages" type="number" /></label>
            <label><span>最大重量 kg</span><input defaultValue={current?.maxWeightKg ?? ""} min="0" name="maxWeightKg" step="0.01" type="number" /></label>
            <label><span>最大體積 cm3</span><input defaultValue={current?.maxVolumeCm3 ?? ""} min="0" name="maxVolumeCm3" step="0.01" type="number" /></label>
            <label className="full"><span>備註</span><textarea defaultValue={current?.remarks ?? ""} name="remarks" /></label>
            <button disabled={submitting} type="submit">{current ? "保存庫位" : "新增庫位"}</button>
          </form>
        </section>
      </div>
    </div>
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
    freeStorageDays: next.freeStorageDays ?? 30,
    storageFeeHkdPerDay: next.storageFeeHkdPerDay ?? 0,
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

const feeCategories = [
  { code: "procurement", name: "代購服務費" },
  { code: "auction", name: "Yahoo 代拍費" },
  { code: "package_material", name: "紙箱費" },
  { code: "value_added", name: "增值服務費" },
  { code: "storage", name: "倉儲費" },
  { code: "other", name: "其他費用" }
];

function AdminFeeSettings({
  fees,
  onDelete,
  onSubmit,
  submitting
}: {
  fees: FeeSetting[];
  onDelete: (path: string, success: string) => Promise<void>;
  onSubmit: (path: string, body: Record<string, unknown>, success: string) => Promise<void>;
  submitting: boolean;
}) {
  const pageSize = 15;
  const [page, setPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [editing, setEditing] = useState<FeeSetting | null>(null);
  const [creating, setCreating] = useState(false);
  const filtered = categoryFilter === "all" ? fees : fees.filter((fee) => fee.categoryCode === categoryFilter);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const current = editing;
  const showModal = creating || Boolean(editing);
  const categories = Array.from(new Map([...feeCategories.map((item) => [item.code, item.name] as const), ...fees.map((item) => [item.categoryCode, item.categoryName] as const)]).entries())
    .map(([code, name]) => ({ code, name }));

  function closeModal() {
    setCreating(false);
    setEditing(null);
  }

  async function submitFee(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const body = Object.fromEntries(new FormData(form).entries());
    const selectedCategory = categories.find((item) => item.code === body.categoryCode);
    body.categoryName = selectedCategory?.name ?? String(body.categoryName ?? "");
    await onSubmit(
      current ? `/api/admin/fee-settings/${encodeURIComponent(current.id)}` : "/api/admin/fee-settings",
      body,
      current ? "費用配置已更新" : "費用配置已新增"
    );
    closeModal();
  }

  return (
    <section className="panel full-span">
      <div className="panel-heading-row">
        <PanelTitle icon={<Settings />} title="費用配置" />
        <div className="panel-actions">
          <span>共 {filtered.length} 項費用，每頁 {pageSize} 筆</span>
          <button onClick={() => setCreating(true)} type="button"><Plus size={16} />新增費用</button>
        </div>
      </div>
      <div className="status-filter-bar">
        <button className={categoryFilter === "all" ? "active" : ""} onClick={() => { setCategoryFilter("all"); setPage(1); }} type="button">全部 {fees.length}</button>
        {categories.map((category) => {
          const count = fees.filter((fee) => fee.categoryCode === category.code).length;
          return <button className={categoryFilter === category.code ? "active" : ""} key={category.code} onClick={() => { setCategoryFilter(category.code); setPage(1); }} type="button">{category.name} {count}</button>;
        })}
      </div>
      <div className="table-wrap compact-table fee-settings-table">
        <table>
          <thead>
            <tr>
              <th>分類</th>
              <th>費用</th>
              <th>收費方式</th>
              <th>金額 / 比例</th>
              <th>狀態</th>
              <th>排序</th>
              <th>備註</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((fee) => (
              <tr key={fee.id}>
                <td><strong>{fee.categoryName}</strong><small>{fee.categoryCode}</small></td>
                <td><strong>{fee.feeName}</strong><small>{fee.feeCode}</small></td>
                <td>{fee.chargeModeLabel}</td>
                <td>
                  <strong>{fee.chargeMode === "percent" ? `${(fee.percentRate * 100).toFixed(2)}%` : `${fee.currency} ${fee.amountHkd.toFixed(2)}`}</strong>
                  <small>{fee.chargeMode === "percent" ? "按基礎金額比例" : "固定收費"}</small>
                </td>
                <td><mark>{fee.statusLabel}</mark></td>
                <td>{fee.sortOrder}</td>
                <td><span className="line-clamp">{fee.remarks || "-"}</span></td>
                <td>
                  <div className="row-actions">
                    <button className="secondary" onClick={() => setEditing(fee)} type="button"><Pencil size={15} />編輯</button>
                    <button className="danger" disabled={submitting} onClick={() => void onDelete(`/api/admin/fee-settings/${encodeURIComponent(fee.id)}/delete`, "費用配置已刪除")} type="button">刪除</button>
                  </div>
                </td>
              </tr>
            ))}
            {pageItems.length === 0 ? <tr><td colSpan={8}>暫無費用配置</td></tr> : null}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button disabled={currentPage <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))} type="button">上一頁</button>
        <span>第 {currentPage} / {totalPages} 頁</span>
        <button disabled={currentPage >= totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))} type="button">下一頁</button>
      </div>

      {showModal ? (
        <div className="modal-backdrop">
          <div className="ticket-modal">
            <button className="modal-close" onClick={closeModal} type="button">關閉</button>
            <section className="panel">
              <PanelTitle icon={<Settings />} title={current ? "編輯費用配置" : "新增費用配置"} />
              <form className="form-grid" onSubmit={(event) => void submitFee(event)}>
                <label>
                  <span>費用分類</span>
                  <select defaultValue={current?.categoryCode ?? "procurement"} name="categoryCode">
                    {categories.map((category) => <option key={category.code} value={category.code}>{category.name}</option>)}
                  </select>
                </label>
                <label><span>費用編碼</span><input defaultValue={current?.feeCode ?? ""} name="feeCode" placeholder="例如 carton_small" required /></label>
                <label><span>費用名稱</span><input defaultValue={current?.feeName ?? ""} name="feeName" required /></label>
                <label>
                  <span>收費方式</span>
                  <select defaultValue={current?.chargeMode ?? "fixed"} name="chargeMode">
                    <option value="fixed">固定金額</option>
                    <option value="percent">按比例</option>
                  </select>
                </label>
                <label><span>固定金額 HKD</span><input defaultValue={current?.amountHkd ?? 0} min="0" name="amountHkd" step="0.01" type="number" /></label>
                <label><span>比例</span><input defaultValue={current?.percentRate ?? 0} min="0" name="percentRate" step="0.0001" type="number" /><small>例如 0.08 表示 8%</small></label>
                <label><span>幣種</span><input defaultValue={current?.currency ?? "HKD"} name="currency" /></label>
                <label><span>排序</span><input defaultValue={current?.sortOrder ?? 100} name="sortOrder" type="number" /></label>
                <label>
                  <span>狀態</span>
                  <select defaultValue={current?.status ?? "active"} name="status">
                    <option value="active">啟用</option>
                    <option value="disabled">停用</option>
                  </select>
                </label>
                <label className="full"><span>備註</span><textarea defaultValue={current?.remarks ?? ""} name="remarks" /></label>
                <button disabled={submitting} type="submit">{current ? "保存修改" : "新增費用"}</button>
              </form>
            </section>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function AdminLogisticsSuppliers({
  countries,
  currencies,
  onDelete,
  onSubmit,
  submitting,
  suppliers
}: {
  countries: LogisticsSupplierCountry[];
  currencies: string[];
  onDelete: (path: string, success: string) => Promise<void>;
  onSubmit: (path: string, body: Record<string, unknown>, success: string) => Promise<void>;
  submitting: boolean;
  suppliers: LogisticsSupplier[];
}) {
  const pageSize = 15;
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<LogisticsSupplier | null>(null);
  const [creating, setCreating] = useState(false);
  const current = editing;
  const showModal = creating || Boolean(editing);
  const totalPages = Math.max(1, Math.ceil(suppliers.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = suppliers.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const countryOptions = countries.length ? countries : [
    { code: "JP", name: "日本 Japan" },
    { code: "HK", name: "中國香港 Hong Kong (HK)" },
    { code: "GB", name: "英國 United Kingdom (GB)" }
  ];
  const currencyOptions = currencies.length ? currencies : ["JPY", "HKD", "CNY", "GBP", "CAD", "AUD", "USD"];

  function closeModal() {
    setCreating(false);
    setEditing(null);
  }

  async function submitSupplier(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = Object.fromEntries(new FormData(event.currentTarget).entries());
    await onSubmit(
      current ? `/api/admin/logistics/suppliers/${encodeURIComponent(current.id)}` : "/api/admin/logistics/suppliers",
      body,
      current ? "供應商已更新" : "供應商已新增"
    );
    closeModal();
  }

  async function toggleSupplierStatus(item: LogisticsSupplier) {
    await onSubmit(
      `/api/admin/logistics/suppliers/${encodeURIComponent(item.id)}`,
      logisticsSupplierFormBody(item, { status: item.status === "active" ? "disabled" : "active" }),
      item.status === "active" ? "供應商已停用" : "供應商已啟用"
    );
  }

  return (
    <section className="panel full-span">
      <div className="panel-heading-row">
        <PanelTitle icon={<Building2 />} title="供应商管理" />
        <div className="panel-actions">
          <span>共 {suppliers.length} 個供應商，每頁 {pageSize} 筆</span>
          <button onClick={() => setCreating(true)} type="button"><Plus size={16} />新增供應商</button>
        </div>
      </div>
      <div className="supplier-list">
        {pageItems.map((supplier) => (
          <article className="supplier-card" key={supplier.id}>
            <div>
              <strong>{supplier.name}</strong>
              <small>{supplier.supplierCode}</small>
              <small>{supplier.countryName}{supplier.city ? ` · ${supplier.city}` : ""} · {supplier.settlementCurrency}</small>
            </div>
            <div className="supplier-card-meta">
              <mark>{supplier.statusLabel}</mark>
              <span>{supplier.channelProductCount} 个渠道产品</span>
              <button className="secondary" onClick={() => setEditing(supplier)} type="button">编辑</button>
              <button className="secondary" disabled={submitting} onClick={() => void toggleSupplierStatus(supplier)} type="button">{supplier.status === "active" ? "停用" : "启用"}</button>
              <button className="danger" disabled={submitting} onClick={() => void onDelete(`/api/admin/logistics/suppliers/${encodeURIComponent(supplier.id)}/delete`, "供應商已刪除")} type="button">删除</button>
            </div>
          </article>
        ))}
        {pageItems.length === 0 ? <div className="empty-state">暫無供應商資料</div> : null}
      </div>
      <div className="pagination">
        <button disabled={currentPage <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))} type="button">上一頁</button>
        <span>第 {currentPage} / {totalPages} 頁</span>
        <button disabled={currentPage >= totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))} type="button">下一頁</button>
      </div>

      {showModal ? (
        <div className="modal-backdrop">
          <div className="ticket-modal">
            <button className="modal-close" onClick={closeModal} type="button">關閉</button>
            <section className="panel">
              <PanelTitle icon={<Building2 />} title={current ? "编辑供应商" : "新增供应商"} />
              <form className="form-grid" onSubmit={(event) => void submitSupplier(event)}>
                <label><span>供应商名称</span><input defaultValue={current?.name ?? ""} name="name" required /></label>
                <label>
                  <span>供应商编码</span>
                  <input readOnly value={current?.supplierCode ?? "系统自动生成"} />
                  <small>供应商编码由系统生成，不能手动修改</small>
                </label>
                <label><span>联系人</span><input defaultValue={current?.contactName ?? ""} name="contactName" /></label>
                <label><span>联系电话</span><input defaultValue={current?.contactPhone ?? ""} name="contactPhone" /></label>
                <label><span>联系邮箱</span><input defaultValue={current?.contactEmail ?? ""} name="contactEmail" type="email" /></label>
                <label>
                  <span>供应商登录邮箱</span>
                  <input defaultValue={current?.loginEmail ?? ""} name="loginEmail" type="email" />
                  <small>新增供应商时可同步创建 supplier 角色账号</small>
                </label>
                <label><span>初始密码</span><input name="initialPassword" placeholder={current ? "留空则不修改密码" : "新增登录邮箱时必填"} type="password" /></label>
                <label>
                  <span>国家</span>
                  <select defaultValue={current?.countryCode ?? "GB"} name="countryCode">
                    {countryOptions.map((country) => <option key={country.code} value={country.code}>{country.name}</option>)}
                  </select>
                </label>
                <label><span>城市</span><input defaultValue={current?.city ?? ""} name="city" /></label>
                <label>
                  <span>结算币种</span>
                  <select defaultValue={current?.settlementCurrency ?? "GBP"} name="settlementCurrency">
                    {currencyOptions.map((currency) => <option key={currency} value={currency}>{currency}</option>)}
                  </select>
                </label>
                <label>
                  <span>状态</span>
                  <select defaultValue={current?.status ?? "active"} name="status">
                    <option value="active">启用</option>
                    <option value="disabled">停用</option>
                  </select>
                </label>
                <label className="full"><span>备注</span><textarea defaultValue={current?.remarks ?? ""} name="remarks" /></label>
                <button disabled={submitting} type="submit">{current ? "保存修改" : "新增供应商"}</button>
              </form>
            </section>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function logisticsSupplierFormBody(item: LogisticsSupplier, overrides: Partial<LogisticsSupplier> = {}) {
  const next = { ...item, ...overrides };
  return {
    name: next.name,
    contactName: next.contactName ?? "",
    contactPhone: next.contactPhone ?? "",
    contactEmail: next.contactEmail ?? "",
    loginEmail: next.loginEmail ?? "",
    initialPassword: "",
    countryCode: next.countryCode,
    city: next.city ?? "",
    settlementCurrency: next.settlementCurrency,
    status: next.status,
    remarks: next.remarks ?? ""
  };
}

function AdminChannelProducts({
  countries,
  onDelete,
  onSubmit,
  products,
  submitting,
  suppliers
}: {
  countries: LogisticsSupplierCountry[];
  onDelete: (path: string, success: string) => Promise<void>;
  onSubmit: (path: string, body: Record<string, unknown>, success: string) => Promise<void>;
  products: ChannelProduct[];
  submitting: boolean;
  suppliers: LogisticsSupplier[];
}) {
  const pageSize = 15;
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<ChannelProduct | null>(null);
  const [creating, setCreating] = useState(false);
  const current = editing;
  const showModal = creating || Boolean(editing);
  const totalPages = Math.max(1, Math.ceil(products.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = products.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const activeSuppliers = suppliers.filter((supplier) => supplier.status === "active" || supplier.id === current?.supplierId);
  const firstSupplier = activeSuppliers[0] ?? suppliers[0];
  const countryOptions = countries.length ? countries : [
    { code: "JP", name: "日本 Japan" },
    { code: "CN", name: "中國大陸 China (CN)" },
    { code: "GB", name: "英國 United Kingdom (GB)" }
  ];
  const defaultSupplierId = current?.supplierId ?? firstSupplier?.id ?? "";

  function closeModal() {
    setCreating(false);
    setEditing(null);
  }

  async function submitChannelProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = Object.fromEntries(new FormData(event.currentTarget).entries());
    await onSubmit(
      current ? `/api/admin/logistics/channel-products/${encodeURIComponent(current.id)}` : "/api/admin/logistics/channel-products",
      body,
      current ? "渠道產品已更新" : "渠道產品已新增"
    );
    closeModal();
  }

  async function toggleChannelProductStatus(item: ChannelProduct) {
    await onSubmit(
      `/api/admin/logistics/channel-products/${encodeURIComponent(item.id)}`,
      channelProductFormBody(item, { status: item.status === "active" ? "disabled" : "active" }),
      item.status === "active" ? "渠道產品已停用" : "渠道產品已啟用"
    );
  }

  return (
    <section className="panel full-span">
      <div className="panel-heading-row">
        <PanelTitle icon={<Tags />} title="渠道產品" />
        <div className="panel-actions">
          <span>共 {products.length} 個渠道產品，每頁 {pageSize} 筆</span>
          <button disabled={!suppliers.length} onClick={() => setCreating(true)} type="button"><Plus size={16} />新增渠道產品</button>
        </div>
      </div>
      {!suppliers.length ? <div className="notice">請先新增供應商，再建立渠道產品。</div> : null}
      <div className="supplier-list">
        {pageItems.map((product) => (
          <article className="supplier-card" key={product.id}>
            <div>
              <strong>{product.name}</strong>
              <small>{product.channelProductCode} · {product.supplierName}</small>
              <small>{product.originCountryName}{product.originCity ? ` / ${product.originCity}` : ""} → {product.destinationCountryName}{product.destinationCity ? ` / ${product.destinationCity}` : ""}</small>
            </div>
            <div className="supplier-card-meta">
              <mark>{product.statusLabel}</mark>
              <span>{product.costCurrency} {product.firstWeightPrice.toFixed(2)} 首重 / {product.additionalWeightPrice.toFixed(2)} 續重</span>
              <button className="secondary" onClick={() => setEditing(product)} type="button">編輯</button>
              <button className="secondary" disabled={submitting} onClick={() => void toggleChannelProductStatus(product)} type="button">{product.status === "active" ? "停用" : "啟用"}</button>
              <button className="danger" disabled={submitting} onClick={() => void onDelete(`/api/admin/logistics/channel-products/${encodeURIComponent(product.id)}/delete`, "渠道產品已刪除")} type="button">刪除</button>
            </div>
          </article>
        ))}
        {pageItems.length === 0 ? <div className="empty-state">暫無渠道產品資料</div> : null}
      </div>
      <div className="pagination">
        <button disabled={currentPage <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))} type="button">上一頁</button>
        <span>第 {currentPage} / {totalPages} 頁</span>
        <button disabled={currentPage >= totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))} type="button">下一頁</button>
      </div>

      {showModal ? (
        <div className="modal-backdrop">
          <div className="ticket-modal">
            <button className="modal-close" onClick={closeModal} type="button">關閉</button>
            <section className="panel">
              <PanelTitle icon={<Tags />} title={current ? "編輯渠道產品" : "新增渠道產品"} />
              <form className="form-grid" onSubmit={(event) => void submitChannelProduct(event)}>
                <label>
                  <span>所屬供應商</span>
                  <select defaultValue={defaultSupplierId} name="supplierId" required>
                    {activeSuppliers.map((supplier) => <option key={supplier.id} value={supplier.id}>{supplier.name} · {supplier.supplierCode}</option>)}
                  </select>
                </label>
                <label>
                  <span>渠道產品編碼</span>
                  <input readOnly value={current?.channelProductCode ?? "系統自動生成"} />
                  <small>渠道產品編碼由系統生成，不能手動修改</small>
                </label>
                <label><span>渠道產品名稱</span><input defaultValue={current?.name ?? ""} name="name" required /></label>
                <label><span>承運商名稱</span><input defaultValue={current?.carrierName ?? ""} name="carrierName" /></label>
                <label><span>服務名稱</span><input defaultValue={current?.serviceName ?? ""} name="serviceName" /></label>
                <label>
                  <span>起始國家</span>
                  <select defaultValue={current?.originCountryCode ?? "CN"} name="originCountryCode" required>
                    {countryOptions.map((country) => <option key={country.code} value={country.code}>{country.name}</option>)}
                  </select>
                </label>
                <label><span>起始城市</span><input defaultValue={current?.originCity ?? ""} name="originCity" /></label>
                <label>
                  <span>目的國家</span>
                  <select defaultValue={current?.destinationCountryCode ?? "GB"} name="destinationCountryCode" required>
                    {countryOptions.map((country) => <option key={country.code} value={country.code}>{country.name}</option>)}
                  </select>
                </label>
                <label><span>目的城市</span><input defaultValue={current?.destinationCity ?? ""} name="destinationCity" /></label>
                <label><span>承運時效</span><input defaultValue={current?.transitTime ?? ""} name="transitTime" placeholder="例如 7-12 days" /></label>
                <label><span>成本首重 kg</span><input defaultValue={current?.firstWeightKg ?? 1} min="0.01" name="firstWeightKg" required step="0.01" type="number" /></label>
                <label><span>成本首重價</span><input defaultValue={current?.firstWeightPrice ?? 0} min="0" name="firstWeightPrice" required step="0.01" type="number" /></label>
                <label><span>成本續重單位 kg</span><input defaultValue={current?.additionalWeightUnitKg ?? 0.5} min="0.01" name="additionalWeightUnitKg" required step="0.01" type="number" /></label>
                <label><span>成本續重價</span><input defaultValue={current?.additionalWeightPrice ?? 0} min="0" name="additionalWeightPrice" required step="0.01" type="number" /></label>
                <label><span>最大重量 kg</span><input defaultValue={current?.maxWeightKg ?? ""} min="0.01" name="maxWeightKg" step="0.01" type="number" /></label>
                <label>
                  <span>狀態</span>
                  <select defaultValue={current?.status ?? "active"} name="status">
                    <option value="active">啟用</option>
                    <option value="disabled">停用</option>
                  </select>
                </label>
                <label className="full"><span>備註</span><textarea defaultValue={current?.remarks ?? ""} name="remarks" /></label>
                <button disabled={submitting || !suppliers.length} type="submit">{current ? "保存修改" : "新增渠道產品"}</button>
              </form>
            </section>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function channelProductFormBody(item: ChannelProduct, overrides: Partial<ChannelProduct> = {}) {
  const next = { ...item, ...overrides };
  return {
    supplierId: next.supplierId,
    name: next.name,
    carrierName: next.carrierName ?? "",
    serviceName: next.serviceName ?? "",
    originCountryCode: next.originCountryCode,
    originCity: next.originCity ?? "",
    destinationCountryCode: next.destinationCountryCode,
    destinationCity: next.destinationCity ?? "",
    transitTime: next.transitTime ?? "",
    firstWeightKg: next.firstWeightKg,
    firstWeightPrice: next.firstWeightPrice,
    additionalWeightUnitKg: next.additionalWeightUnitKg,
    additionalWeightPrice: next.additionalWeightPrice,
    maxWeightKg: next.maxWeightKg ?? "",
    status: next.status,
    remarks: next.remarks ?? ""
  };
}

const defaultLogisticsAttributes: LogisticsProductAttribute[] = [
  { code: "normal", name: "普貨", description: "普通日用品、服飾、書籍等無特殊限制貨物" },
  { code: "battery", name: "帶電", description: "含內置電池或配套電池的商品" },
  { code: "branded", name: "仿牌", description: "品牌敏感、疑似仿牌或需要特殊申報的商品" },
  { code: "special", name: "特貨", description: "食品、液體、粉末、化妝品等特殊貨物" }
];

function AdminLogisticsProducts({
  attributes,
  channelProducts,
  countries,
  onDelete,
  onSubmit,
  products,
  submitting
}: {
  attributes: LogisticsProductAttribute[];
  channelProducts: ChannelProduct[];
  countries: LogisticsSupplierCountry[];
  onDelete: (path: string, success: string) => Promise<void>;
  onSubmit: (path: string, body: Record<string, unknown>, success: string) => Promise<void>;
  products: LogisticsProduct[];
  submitting: boolean;
}) {
  const pageSize = 15;
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<LogisticsProduct | null>(null);
  const [creating, setCreating] = useState(false);
  const [chargeWeightMode, setChargeWeightMode] = useState("max_actual_volume");
  const [pricingMode, setPricingMode] = useState("first_additional");
  const current = editing;
  const showModal = creating || Boolean(editing);
  const attrOptions = attributes.length ? attributes : defaultLogisticsAttributes;
  const countryOptions = countries.length ? countries : [
    { code: "JP", name: "日本 Japan" },
    { code: "CN", name: "中國大陸 China (CN)" },
    { code: "GB", name: "英國 United Kingdom (GB)" }
  ];
  const totalPages = Math.max(1, Math.ceil(products.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = products.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  function closeModal() {
    setCreating(false);
    setEditing(null);
  }

  function openCreate() {
    setEditing(null);
    setChargeWeightMode("max_actual_volume");
    setPricingMode("first_additional");
    setCreating(true);
  }

  function openEdit(product: LogisticsProduct) {
    setChargeWeightMode(product.chargeWeightMode || "max_actual_volume");
    setPricingMode(product.pricingMode || "first_additional");
    setEditing(product);
  }

  function bodyFromForm(form: HTMLFormElement) {
    const formData = new FormData(form);
    const body = Object.fromEntries(formData.entries()) as Record<string, unknown>;
    body.supportCategories = formData.getAll("supportCategories").map(String);
    body.forbiddenCategories = formData.getAll("forbiddenCategories").map(String);
    body.priceTiers = buildPriceTiersJson(formData);
    body.attributeSurcharges = buildAttributeSurchargesJson(formData, attrOptions);
    body.isTaxIncluded = formData.has("isTaxIncluded");
    body.needIdentity = formData.has("needIdentity");
    body.supportTracking = formData.has("supportTracking");
    return body;
  }

  async function submitLogisticsProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onSubmit(
      current ? `/api/admin/logistics/products/${encodeURIComponent(current.id)}` : "/api/admin/logistics/products",
      bodyFromForm(event.currentTarget),
      current ? "物流產品已更新" : "物流產品已新增"
    );
    closeModal();
  }

  async function toggleStatus(item: LogisticsProduct) {
    await onSubmit(
      `/api/admin/logistics/products/${encodeURIComponent(item.id)}`,
      logisticsProductFormBody(item, { status: item.status === "active" ? "disabled" : "active" }),
      item.status === "active" ? "物流產品已停用" : "物流產品已啟用"
    );
  }

  return (
    <section className="panel full-span">
      <div className="panel-heading-row">
        <PanelTitle icon={<PackageCheck />} title="物流產品" />
        <div className="panel-actions">
          <span>共 {products.length} 個物流產品，每頁 {pageSize} 筆</span>
          <button onClick={openCreate} type="button"><Plus size={16} />新增物流產品</button>
        </div>
      </div>
      <div className="supplier-list">
        {pageItems.map((product) => (
          <article className="supplier-card" key={product.id}>
            <div>
              <strong>{product.productName}</strong>
              <small>{product.productCode} · {product.routeName || "未設定路線名稱"}</small>
              <small>{product.originCountryName}{product.originCity ? ` / ${product.originCity}` : ""} → {product.destinationCountryName}{product.destinationCity ? ` / ${product.destinationCity}` : ""}</small>
              <small>支持：{attributeNames(product.supportCategories, attrOptions) || "全部"} · 禁運：{attributeNames(product.forbiddenCategories, attrOptions) || "無"}</small>
            </div>
            <div className="supplier-card-meta">
              <mark>{product.statusLabel}</mark>
              <span>{product.firstPrice.toFixed(2)} 首重 / {product.additionalPrice.toFixed(2)} 續重</span>
              <span>{product.channelProductName ? `已綁定 ${product.channelProductName}` : "未綁定渠道"}</span>
              <button className="secondary" onClick={() => openEdit(product)} type="button">編輯</button>
              <button className="secondary" disabled={submitting} onClick={() => void toggleStatus(product)} type="button">{product.status === "active" ? "停用" : "啟用"}</button>
              <button className="danger" disabled={submitting} onClick={() => void onDelete(`/api/admin/logistics/products/${encodeURIComponent(product.id)}/delete`, "物流產品已刪除")} type="button">刪除</button>
            </div>
          </article>
        ))}
        {pageItems.length === 0 ? <div className="empty-state">暫無物流產品資料</div> : null}
      </div>
      <div className="pagination">
        <button disabled={currentPage <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))} type="button">上一頁</button>
        <span>第 {currentPage} / {totalPages} 頁</span>
        <button disabled={currentPage >= totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))} type="button">下一頁</button>
      </div>

      {showModal ? (
        <div className="modal-backdrop">
          <div className="ticket-modal">
            <button className="modal-close" onClick={closeModal} type="button">關閉</button>
            <section className="panel">
              <PanelTitle icon={<PackageCheck />} title={current ? "編輯物流產品" : "新增物流產品"} />
              <form className="form-grid" onSubmit={(event) => void submitLogisticsProduct(event)}>
                <label><span>物流產品名稱</span><input defaultValue={current?.productName ?? ""} name="productName" required /></label>
                <label><span>物流產品編碼</span><input readOnly value={current?.productCode ?? "系統自動生成"} /><small>編碼由系統生成，不能手動修改</small></label>
                <label>
                  <span>綁定渠道產品</span>
                  <select defaultValue={current?.channelProductId ?? ""} name="channelProductId">
                    <option value="">暫不綁定</option>
                    {channelProducts.map((channel) => <option key={channel.id} value={channel.id}>{channel.name} · {channel.channelProductCode}</option>)}
                  </select>
                </label>
                <label><span>路線名稱</span><input defaultValue={current?.routeName ?? ""} name="routeName" /></label>
                <label><span>起始國家</span><select defaultValue={current?.originCountryCode ?? "CN"} name="originCountryCode">{countryOptions.map((country) => <option key={country.code} value={country.code}>{country.name}</option>)}</select></label>
                <label><span>起始城市</span><input defaultValue={current?.originCity ?? ""} name="originCity" /></label>
                <label><span>目的國家</span><select defaultValue={current?.destinationCountryCode ?? "GB"} name="destinationCountryCode">{countryOptions.map((country) => <option key={country.code} value={country.code}>{country.name}</option>)}</select></label>
                <label><span>目的城市</span><input defaultValue={current?.destinationCity ?? ""} name="destinationCity" /></label>
                <label><span>展示時效</span><input defaultValue={current?.estimatedDays ?? ""} name="estimatedDays" placeholder="例如 7-12 days" /></label>
                <fieldset className="full checkbox-fieldset"><legend>支持貨物屬性</legend>{attrOptions.map((attr) => <label key={attr.code}><input defaultChecked={current?.supportCategories.includes(attr.code) ?? false} name="supportCategories" type="checkbox" value={attr.code} />{attr.name}</label>)}</fieldset>
                <fieldset className="full checkbox-fieldset"><legend>禁運貨物屬性</legend>{attrOptions.map((attr) => <label key={attr.code}><input defaultChecked={current?.forbiddenCategories.includes(attr.code) ?? false} name="forbiddenCategories" type="checkbox" value={attr.code} />{attr.name}</label>)}</fieldset>
                <section className="full billing-rule-card">
                  <div className="billing-rule-intro">
                    <strong>計費規則</strong>
                    <small>先按重量模式得到「計費重量」，再按價格模式計算基礎運費。每個物流產品兩者各選一種。</small>
                  </div>
                <fieldset className="billing-step mode-tab-fieldset">
                  <legend><b>1</b> 計費重量</legend>
                  <div className="mode-tabs">
                    {[
                      { value: "max_actual_volume", label: "實重/體積重取大" },
                      { value: "actual", label: "實重計費" },
                      { value: "volume", label: "體積重計費" },
                      { value: "density", label: "密度計費" }
                    ].map((mode) => (
                      <label key={mode.value}>
                        <input checked={chargeWeightMode === mode.value} name="chargeWeightMode" onChange={() => setChargeWeightMode(mode.value)} type="radio" value={mode.value} />
                        <span>{mode.label}</span>
                      </label>
                    ))}
                  </div>
                  <div className="mode-tab-panel">
                    <label><span>最低計費重量 kg</span><input defaultValue={current?.minWeight ?? 0.5} min="0.01" name="minWeight" step="0.01" type="number" /></label>
                    <label><span>最大計費重量 kg</span><input defaultValue={current?.maxWeight ?? 30} min="0.01" name="maxWeight" step="0.01" type="number" /></label>
                    {chargeWeightMode !== "actual" ? <label><span>體積重系數</span><input defaultValue={current?.volumeDivisor ?? 5000} min="1" name="volumeDivisor" step="1" type="number" /></label> : <input name="volumeDivisor" type="hidden" value={current?.volumeDivisor ?? 5000} />}
                    <label><span>進位單位 kg</span><input defaultValue={current?.roundingUnit ?? 0.5} min="0.01" name="roundingUnit" step="0.01" type="number" /></label>
                    {chargeWeightMode === "density" ? (
                      <>
                        <label><span>密度閾值 kg/m3</span><input defaultValue={current?.densityThreshold ?? 120} min="0.01" name="densityThreshold" step="0.01" type="number" /></label>
                        <label><span>低密度模式</span><select defaultValue={current?.densityLowMode ?? "volume"} name="densityLowMode"><option value="volume">體積重</option><option value="actual">實重</option></select></label>
                        <label><span>高密度模式</span><select defaultValue={current?.densityHighMode ?? "actual"} name="densityHighMode"><option value="actual">實重</option><option value="volume">體積重</option></select></label>
                      </>
                    ) : (
                      <>
                        <input name="densityThreshold" type="hidden" value={current?.densityThreshold ?? 120} />
                        <input name="densityLowMode" type="hidden" value={current?.densityLowMode ?? "volume"} />
                        <input name="densityHighMode" type="hidden" value={current?.densityHighMode ?? "actual"} />
                      </>
                    )}
                  </div>
                </fieldset>
                <fieldset className="billing-step mode-tab-fieldset">
                  <legend><b>2</b> 價格規則</legend>
                  <div className="mode-tabs">
                    {[
                      { value: "first_additional", label: "首重續重" },
                      { value: "tier_unit", label: "階梯價格" },
                      { value: "multi_additional", label: "多級續重" },
                      { value: "tier_first_additional", label: "階梯首重續重" }
                    ].map((mode) => (
                      <label key={mode.value}>
                        <input checked={pricingMode === mode.value} name="pricingMode" onChange={() => setPricingMode(mode.value)} type="radio" value={mode.value} />
                        <span>{mode.label}</span>
                      </label>
                    ))}
                  </div>
                  <div className="mode-tab-panel price-mode-panel">
                    {pricingMode === "first_additional" ? (
                      <>
                        <label><span>首重 kg</span><input defaultValue={current?.firstWeight ?? 1} min="0.01" name="firstWeight" step="0.01" type="number" /></label>
                        <label><span>首重價格</span><input defaultValue={current?.firstPrice ?? 0} min="0" name="firstPrice" step="0.01" type="number" /></label>
                        <label><span>續重單位 kg</span><input defaultValue={current?.additionalWeight ?? 0.5} min="0.01" name="additionalWeight" step="0.01" type="number" /></label>
                        <label><span>續重價格</span><input defaultValue={current?.additionalPrice ?? 0} min="0" name="additionalPrice" step="0.01" type="number" /></label>
                      </>
                    ) : null}
                    {pricingMode === "tier_unit" ? (
                      <>
                        <input name="firstWeight" type="hidden" value={current?.firstWeight ?? 1} />
                        <input name="firstPrice" type="hidden" value={current?.firstPrice ?? 0} />
                        <input name="additionalWeight" type="hidden" value={current?.additionalWeight ?? 0.5} />
                        <input name="additionalPrice" type="hidden" value={current?.additionalPrice ?? 0} />
                        <div className="full rate-editor">
                          <div>
                            <strong>階梯價格</strong>
                            <small>整單命中一個重量區間，按該區間單位價格計算。</small>
                          </div>
                          <div className="rate-table tier-table">
                            <span>起始 kg</span>
                            <span>截止 kg</span>
                            <span>單位 kg</span>
                            <span>單位價格</span>
                            {priceTierRows(current?.priceTiers ?? null).map((tier, index) => (
                              <React.Fragment key={index}>
                                <input defaultValue={tier.from} min="0" name="tierFrom" step="0.001" type="number" />
                                <input defaultValue={tier.to} min="0" name="tierTo" placeholder="不限" step="0.001" type="number" />
                                <input defaultValue={tier.unitWeight} min="0.01" name="tierUnitWeight" step="0.01" type="number" />
                                <input defaultValue={tier.unitPrice} min="0" name="tierUnitPrice" step="0.01" type="number" />
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : null}
                    {pricingMode === "multi_additional" ? (
                      <>
                        <label><span>首重 kg</span><input defaultValue={current?.firstWeight ?? 1} min="0.01" name="firstWeight" step="0.01" type="number" /></label>
                        <label><span>首重價格</span><input defaultValue={current?.firstPrice ?? 0} min="0" name="firstPrice" step="0.01" type="number" /></label>
                        <input name="additionalWeight" type="hidden" value={current?.additionalWeight ?? 0.5} />
                        <input name="additionalPrice" type="hidden" value={current?.additionalPrice ?? 0} />
                        <div className="full rate-editor">
                          <div>
                            <strong>續重階梯</strong>
                            <small>超出首重後按區間分段累進計算續重費。</small>
                          </div>
                          <div className="rate-table tier-table">
                            <span>起始 kg</span>
                            <span>截止 kg</span>
                            <span>續重單位 kg</span>
                            <span>續重價格</span>
                            {priceTierRows(current?.priceTiers ?? null).map((tier, index) => (
                              <React.Fragment key={index}>
                                <input defaultValue={tier.from} min="0" name="tierFrom" step="0.001" type="number" />
                                <input defaultValue={tier.to} min="0" name="tierTo" placeholder="不限" step="0.001" type="number" />
                                <input defaultValue={tier.unitWeight} min="0.01" name="tierUnitWeight" step="0.01" type="number" />
                                <input defaultValue={tier.unitPrice} min="0" name="tierUnitPrice" step="0.01" type="number" />
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : null}
                    {pricingMode === "tier_first_additional" ? (
                      <>
                        <input name="firstWeight" type="hidden" value={current?.firstWeight ?? 1} />
                        <input name="firstPrice" type="hidden" value={current?.firstPrice ?? 0} />
                        <input name="additionalWeight" type="hidden" value={current?.additionalWeight ?? 0.5} />
                        <input name="additionalPrice" type="hidden" value={current?.additionalPrice ?? 0} />
                        <div className="full rate-editor">
                          <div>
                            <strong>階梯首重續重</strong>
                            <small>整單命中階梯後，再使用該階梯的首重與續重規則計算。</small>
                          </div>
                          <div className="rate-table tier-first-table">
                            <span>起始 kg</span>
                            <span>截止 kg</span>
                            <span>首重 kg</span>
                            <span>首重價格</span>
                            <span>續重單位 kg</span>
                            <span>續重價格</span>
                            {tierFirstAdditionalRows(current?.priceTiers ?? null).map((tier, index) => (
                              <React.Fragment key={index}>
                                <input defaultValue={tier.from} min="0" name="tierFrom" step="0.001" type="number" />
                                <input defaultValue={tier.to} min="0" name="tierTo" placeholder="不限" step="0.001" type="number" />
                                <input defaultValue={tier.firstWeight} min="0.001" name="tierFirstWeight" step="0.001" type="number" />
                                <input defaultValue={tier.firstPrice} min="0" name="tierFirstPrice" step="0.01" type="number" />
                                <input defaultValue={tier.additionalWeight} min="0.001" name="tierAdditionalWeight" step="0.001" type="number" />
                                <input defaultValue={tier.additionalPrice} min="0" name="tierAdditionalPrice" step="0.01" type="number" />
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : null}
                  </div>
                </fieldset>
                </section>
                <label><span>操作費</span><input defaultValue={current?.handlingFee ?? 0} min="0" name="handlingFee" step="0.01" type="number" /></label>
                <label><span>燃油附加比例</span><input defaultValue={current?.fuelSurchargeRate ?? 0} min="0" name="fuelSurchargeRate" step="0.001" type="number" /></label>
                <label><span>品類附加比例</span><input defaultValue={current?.cargoSurchargeRate ?? 0} min="0" name="cargoSurchargeRate" step="0.001" type="number" /></label>
                <label><span>狀態</span><select defaultValue={current?.status ?? "active"} name="status"><option value="active">啟用</option><option value="disabled">停用</option></select></label>
                <div className="full rate-editor">
                  <div>
                    <strong>屬性附加費</strong>
                    <small>按貨物屬性加收，可選固定金額或按基礎運費比例。</small>
                  </div>
                  <div className="rate-table surcharge-table">
                    <span>貨物屬性</span>
                    <span>收費方式</span>
                    <span>數值</span>
                    <span>顯示名稱</span>
                    {attrOptions.map((attr) => {
                      const rule = attributeSurchargeRule(current?.attributeSurcharges ?? null, attr.code);
                      return (
                        <React.Fragment key={attr.code}>
                          <strong>{attr.name}</strong>
                          <select defaultValue={rule.type} name={`attrSurchargeType:${attr.code}`}>
                            <option value="fixed">固定金額</option>
                            <option value="rate">比例</option>
                          </select>
                          <input defaultValue={rule.value} min="0" name={`attrSurchargeValue:${attr.code}`} placeholder="不收費留空" step="0.001" type="number" />
                          <input defaultValue={rule.label} name={`attrSurchargeLabel:${attr.code}`} placeholder={`${attr.name}附加費`} />
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
                <fieldset className="full checkbox-fieldset"><legend>服務能力</legend><label><input defaultChecked={current?.isTaxIncluded ?? false} name="isTaxIncluded" type="checkbox" />含稅</label><label><input defaultChecked={current?.needIdentity ?? false} name="needIdentity" type="checkbox" />需要身份信息</label><label><input defaultChecked={current?.supportTracking ?? true} name="supportTracking" type="checkbox" />支持軌跡</label></fieldset>
                <label className="full"><span>備註</span><textarea defaultValue={current?.remarks ?? ""} name="remarks" /></label>
                <button disabled={submitting} type="submit">{current ? "保存修改" : "新增物流產品"}</button>
              </form>
            </section>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function logisticsProductFormBody(item: LogisticsProduct, overrides: Partial<LogisticsProduct> = {}) {
  const next = { ...item, ...overrides };
  return {
    productName: next.productName,
    channelProductId: next.channelProductId ?? "",
    routeName: next.routeName ?? "",
    originCountryCode: next.originCountryCode,
    originCity: next.originCity ?? "",
    destinationCountryCode: next.destinationCountryCode,
    destinationCity: next.destinationCity ?? "",
    estimatedDays: next.estimatedDays ?? "",
    supportCategories: next.supportCategories,
    forbiddenCategories: next.forbiddenCategories,
    chargeWeightMode: next.chargeWeightMode,
    pricingMode: next.pricingMode,
    minWeight: next.minWeight,
    maxWeight: next.maxWeight,
    volumeDivisor: next.volumeDivisor,
    roundingUnit: next.roundingUnit,
    densityThreshold: next.densityThreshold,
    densityLowMode: next.densityLowMode,
    densityHighMode: next.densityHighMode,
    firstWeight: next.firstWeight,
    firstPrice: next.firstPrice,
    additionalWeight: next.additionalWeight,
    additionalPrice: next.additionalPrice,
    priceTiers: next.priceTiers ?? "",
    attributeSurcharges: next.attributeSurcharges ?? "",
    handlingFee: next.handlingFee,
    fuelSurchargeRate: next.fuelSurchargeRate,
    cargoSurchargeRate: next.cargoSurchargeRate,
    isTaxIncluded: next.isTaxIncluded,
    needIdentity: next.needIdentity,
    supportTracking: next.supportTracking,
    status: next.status,
    remarks: next.remarks ?? ""
  };
}


function jsonArray(value: string | null) {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function priceTierRows(value: string | null) {
  const parsed = jsonArray(value);
  const rows = parsed.slice(0, 4).map((item) => ({
    from: item?.from ?? "",
    to: item?.to ?? "",
    unitWeight: item?.unit_weight ?? item?.additional_weight ?? "",
    unitPrice: item?.unit_price ?? item?.additional_price ?? ""
  }));
  while (rows.length < 4) rows.push({ from: "", to: "", unitWeight: "", unitPrice: "" });
  return rows;
}

function tierFirstAdditionalRows(value: string | null) {
  const parsed = jsonArray(value);
  const rows = parsed.slice(0, 4).map((item) => ({
    from: item?.from ?? "",
    to: item?.to ?? "",
    firstWeight: item?.first_weight ?? item?.firstWeight ?? "",
    firstPrice: item?.first_price ?? item?.firstPrice ?? "",
    additionalWeight: item?.additional_weight ?? item?.unit_weight ?? "",
    additionalPrice: item?.additional_price ?? item?.unit_price ?? ""
  }));
  while (rows.length < 4) rows.push({ from: "", to: "", firstWeight: "", firstPrice: "", additionalWeight: "", additionalPrice: "" });
  return rows;
}

function attributeSurchargeRule(value: string | null, attribute: string) {
  const parsed = jsonArray(value);
  const rule = parsed.find((item) => item?.attribute === attribute);
  return {
    type: rule?.type === "rate" ? "rate" : "fixed",
    value: rule?.value ?? "",
    label: rule?.label ?? ""
  };
}

function buildPriceTiersJson(formData: FormData) {
  const pricingMode = String(formData.get("pricingMode") ?? "first_additional");
  if (pricingMode === "first_additional") return "";

  const fromValues = formData.getAll("tierFrom").map(String);
  const toValues = formData.getAll("tierTo").map(String);
  if (pricingMode === "tier_first_additional") {
    const firstWeightValues = formData.getAll("tierFirstWeight").map(String);
    const firstPriceValues = formData.getAll("tierFirstPrice").map(String);
    const additionalWeightValues = formData.getAll("tierAdditionalWeight").map(String);
    const additionalPriceValues = formData.getAll("tierAdditionalPrice").map(String);
    const tiers = fromValues.map((from, index) => {
      const to = toValues[index] ?? "";
      const firstWeight = firstWeightValues[index] ?? "";
      const firstPrice = firstPriceValues[index] ?? "";
      const additionalWeight = additionalWeightValues[index] ?? "";
      const additionalPrice = additionalPriceValues[index] ?? "";
      if (!from && !to && !firstWeight && !firstPrice && !additionalWeight && !additionalPrice) return null;
      const parsedFrom = Number(from || 0);
      const parsedTo = to ? Number(to) : null;
      const parsedFirstWeight = Number(firstWeight || 0);
      const parsedFirstPrice = Number(firstPrice || 0);
      const parsedAdditionalWeight = Number(additionalWeight || 0);
      const parsedAdditionalPrice = Number(additionalPrice || 0);
      if (![parsedFrom, parsedFirstWeight, parsedFirstPrice, parsedAdditionalWeight, parsedAdditionalPrice].every(Number.isFinite)) return null;
      if (parsedFirstWeight <= 0 || parsedFirstPrice < 0 || parsedAdditionalWeight <= 0 || parsedAdditionalPrice < 0) return null;
      return {
        from: parsedFrom,
        to: parsedTo,
        first_weight: parsedFirstWeight,
        first_price: parsedFirstPrice,
        additional_weight: parsedAdditionalWeight,
        additional_price: parsedAdditionalPrice
      };
    }).filter(Boolean);
    return tiers.length ? JSON.stringify(tiers) : "";
  }

  const unitWeightValues = formData.getAll("tierUnitWeight").map(String);
  const unitPriceValues = formData.getAll("tierUnitPrice").map(String);
  const tiers = fromValues.map((from, index) => {
    const to = toValues[index] ?? "";
    const unitWeight = unitWeightValues[index] ?? "";
    const unitPrice = unitPriceValues[index] ?? "";
    if (!from && !to && !unitWeight && !unitPrice) return null;
    const parsedFrom = Number(from || 0);
    const parsedTo = to ? Number(to) : null;
    const parsedUnitWeight = Number(unitWeight || 0);
    const parsedUnitPrice = Number(unitPrice || 0);
    if (!Number.isFinite(parsedFrom) || !Number.isFinite(parsedUnitWeight) || !Number.isFinite(parsedUnitPrice)) return null;
    if (parsedUnitWeight <= 0 || parsedUnitPrice < 0) return null;
    return {
      from: parsedFrom,
      to: parsedTo,
      unit_weight: parsedUnitWeight,
      unit_price: parsedUnitPrice
    };
  }).filter(Boolean);
  return tiers.length ? JSON.stringify(tiers) : "";
}

function buildAttributeSurchargesJson(formData: FormData, attributes: LogisticsProductAttribute[]) {
  const rules = attributes.map((attr) => {
    const rawValue = String(formData.get(`attrSurchargeValue:${attr.code}`) ?? "");
    if (!rawValue) return null;
    const value = Number(rawValue);
    if (!Number.isFinite(value) || value < 0) return null;
    const type = String(formData.get(`attrSurchargeType:${attr.code}`) ?? "fixed") === "rate" ? "rate" : "fixed";
    const label = String(formData.get(`attrSurchargeLabel:${attr.code}`) ?? "") || `${attr.name}附加費`;
    return {
      attribute: attr.code,
      type,
      value,
      label
    };
  }).filter(Boolean);
  return rules.length ? JSON.stringify(rules) : "";
}

function attributeNames(codes: string[], attributes: LogisticsProductAttribute[]) {
  return codes.map((code) => attributes.find((attr) => attr.code === code)?.name ?? code).join("?");
}

function MemberShippingCalculator({
  attributes,
  countries,
  submitting
}: {
  attributes: LogisticsProductAttribute[];
  countries: LogisticsSupplierCountry[];
  submitting: boolean;
}) {
  const [result, setResult] = useState<ShippingCalculateResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const attrOptions = attributes.length ? attributes : defaultLogisticsAttributes;
  const countryOptions = countries.length ? countries : [
    { code: "JP", name: "日本 Japan" },
    { code: "CN", name: "中國大陸 China (CN)" },
    { code: "GB", name: "英國 United Kingdom (GB)" }
  ];

  async function submitCalculator(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const body = Object.fromEntries(new FormData(event.currentTarget).entries()) as Record<string, unknown>;
      const payload = await postJson<ShippingCalculateResult>("/api/shipping/calculate", body);
      setResult(payload);
    } catch (err) {
      setError(err instanceof Error ? err.message : "試算失敗");
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="panel full-span">
      <PanelTitle icon={<CircleDollarSign />} title="運費試算" />
      <form className="form-grid" onSubmit={(event) => void submitCalculator(event)}>
        <label><span>起始國家</span><select defaultValue="JP" name="originCountryCode">{countryOptions.map((country) => <option key={country.code} value={country.code}>{country.name}</option>)}</select></label>
        <label><span>目的國家</span><select defaultValue="HK" name="destinationCountryCode">{countryOptions.map((country) => <option key={country.code} value={country.code}>{country.name}</option>)}</select></label>
        <label><span>貨物屬性</span><select defaultValue="normal" name="cargoType">{attrOptions.map((attr) => <option key={attr.code} value={attr.code}>{attr.name}</option>)}</select></label>
        <label><span>實際重量 kg</span><input defaultValue="1" min="0.01" name="weight" required step="0.01" type="number" /></label>
        <label><span>長 cm</span><input defaultValue="0" min="0" name="length" step="0.1" type="number" /></label>
        <label><span>寬 cm</span><input defaultValue="0" min="0" name="width" step="0.1" type="number" /></label>
        <label><span>高 cm</span><input defaultValue="0" min="0" name="height" step="0.1" type="number" /></label>
        <label><span>偏遠地區費</span><input defaultValue="0" min="0" name="remoteAreaFee" step="0.01" type="number" /></label>
        <button disabled={submitting || loading} type="submit">{loading ? "試算中..." : "開始試算"}</button>
      </form>
      {error ? <div className="inline-error">{error}</div> : null}
      {result ? (
        <div className="supplier-list">
          <h3>可用物流產品</h3>
          {result.available.map((item) => (
            <article className="supplier-card" key={item.product.id}>
              <div>
                <strong>{item.product.productName}</strong>
                <small>{item.product.productCode} · {item.product.estimatedDays || "時效待定"}</small>
                <small>計費重 {item.weightDetail.chargeableWeight} kg，體積重 {item.weightDetail.volumeWeight} kg</small>
                {item.warnings?.length ? <small>提示：{item.warnings.map((warning) => warning.message).join("；")}</small> : null}
              </div>
              <div className="supplier-card-meta">
                <span>HKD {item.totalAmount.toFixed(2)}</span>
                <small>基礎 {item.feeDetail.baseFreight.toFixed(2)} / 附加 {(item.feeDetail.freightTotal - item.feeDetail.baseFreight).toFixed(2)}</small>
              </div>
            </article>
          ))}
          {result.available.length === 0 ? <div className="empty-state">暫無可用物流產品</div> : null}
          <h3>不可用原因</h3>
          {result.unavailable.map((item) => (
            <article className="supplier-card" key={item.productCode}>
              <div><strong>{item.productName}</strong><small>{item.productCode}</small></div>
              <div className="supplier-card-meta"><span>{item.reason}</span></div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function AdminShippingRestrictions({
  attributes,
  countries,
  logisticsProducts,
  onDelete,
  onSubmit,
  restrictions,
  submitting
}: {
  attributes: LogisticsProductAttribute[];
  countries: LogisticsSupplierCountry[];
  logisticsProducts: LogisticsProduct[];
  onDelete: (path: string, success: string) => Promise<void>;
  onSubmit: (path: string, body: Record<string, unknown>, success: string) => Promise<void>;
  restrictions: ShippingRestriction[];
  submitting: boolean;
}) {
  const pageSize = 15;
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [editing, setEditing] = useState<ShippingRestriction | null>(null);
  const [creating, setCreating] = useState(false);
  const current = editing;
  const showModal = creating || Boolean(editing);
  const attrOptions = attributes.length ? attributes : defaultLogisticsAttributes;
  const countryOptions = countries.length ? countries : [
    { code: "JP", name: "日本 Japan" },
    { code: "HK", name: "中國香港 Hong Kong (HK)" },
    { code: "GB", name: "英國 United Kingdom (GB)" }
  ];
  const filtered = restrictions.filter((item) => {
    const statusMatched = statusFilter === "all" || item.status === statusFilter;
    const typeMatched = typeFilter === "all" || item.restrictionType === typeFilter;
    return statusMatched && typeMatched;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  function closeModal() {
    setCreating(false);
    setEditing(null);
  }

  function bodyFromForm(form: HTMLFormElement) {
    const formData = new FormData(form);
    const body = Object.fromEntries(formData.entries()) as Record<string, unknown>;
    body.cargoCategories = formData.getAll("cargoCategories").map(String);
    return body;
  }

  async function submitRestriction(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onSubmit(
      current ? `/api/admin/logistics/restrictions/${encodeURIComponent(current.id)}` : "/api/admin/logistics/restrictions",
      bodyFromForm(event.currentTarget),
      current ? "禁運限制規則已更新" : "禁運限制規則已新增"
    );
    closeModal();
  }

  async function toggleRestriction(item: ShippingRestriction) {
    await onSubmit(
      `/api/admin/logistics/restrictions/${encodeURIComponent(item.id)}`,
      shippingRestrictionFormBody(item, { status: item.status === "active" ? "disabled" : "active" }),
      item.status === "active" ? "禁運限制規則已停用" : "禁運限制規則已啟用"
    );
  }

  return (
    <section className="panel full-span">
      <div className="panel-heading-row">
        <PanelTitle icon={<ShieldCheck />} title="禁運與限制" />
        <div className="panel-actions">
          <select value={typeFilter} onChange={(event) => { setTypeFilter(event.target.value); setPage(1); }}>
            <option value="all">全部限制類型</option>
            <option value="prohibited">禁運</option>
            <option value="max_weight">最大重量限制</option>
            <option value="max_dimensions">最大尺寸限制</option>
            <option value="review_required">需要人工審核</option>
            <option value="identity_required">需要身份信息</option>
          </select>
          <select value={statusFilter} onChange={(event) => { setStatusFilter(event.target.value); setPage(1); }}>
            <option value="all">全部狀態</option>
            <option value="active">啟用</option>
            <option value="disabled">停用</option>
          </select>
          <span>共 {filtered.length} 條規則</span>
          <button onClick={() => setCreating(true)} type="button"><Plus size={16} />新增規則</button>
        </div>
      </div>

      <div className="supplier-list">
        {pageItems.map((item) => (
          <article className="supplier-card" key={item.id}>
            <div>
              <strong>{item.ruleName}</strong>
              <small>{item.scopeLabel} · {item.restrictionTypeLabel} · {item.statusLabel}</small>
              <small>
                {item.destinationCountryName || item.logisticsProductName || "全局"} ·
                貨物屬性：{attributeNames(item.cargoCategories, attrOptions) || "全部"}
              </small>
              {item.customerMessage ? <small>提示：{item.customerMessage}</small> : null}
            </div>
            <div className="supplier-card-meta">
              <mark>{item.restrictionTypeLabel}</mark>
              <button className="secondary" onClick={() => setEditing(item)} type="button">編輯</button>
              <button className="secondary" disabled={submitting} onClick={() => void toggleRestriction(item)} type="button">{item.status === "active" ? "停用" : "啟用"}</button>
              <button className="danger" disabled={submitting} onClick={() => void onDelete(`/api/admin/logistics/restrictions/${encodeURIComponent(item.id)}/delete`, "禁運限制規則已刪除")} type="button">刪除</button>
            </div>
          </article>
        ))}
        {pageItems.length === 0 ? <div className="empty-state">暫無禁運限制規則</div> : null}
      </div>
      <div className="pagination">
        <button disabled={currentPage <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))} type="button">上一頁</button>
        <span>第 {currentPage} / {totalPages} 頁</span>
        <button disabled={currentPage >= totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))} type="button">下一頁</button>
      </div>

      {showModal ? (
        <div className="modal-backdrop">
          <div className="ticket-modal">
            <button className="modal-close" onClick={closeModal} type="button">關閉</button>
            <section className="panel">
              <PanelTitle icon={<ShieldCheck />} title={current ? "編輯禁運限制規則" : "新增禁運限制規則"} />
              <form className="form-grid" onSubmit={(event) => void submitRestriction(event)}>
                <label><span>規則名稱</span><input defaultValue={current?.ruleName ?? ""} name="ruleName" required /></label>
                <label>
                  <span>適用範圍</span>
                  <select defaultValue={current?.scopeType ?? "global"} name="scopeType">
                    <option value="global">全局</option>
                    <option value="country">指定目的國家</option>
                    <option value="logistics_product">指定物流產品</option>
                  </select>
                </label>
                <label>
                  <span>目的國家</span>
                  <select defaultValue={current?.destinationCountryCode ?? ""} name="destinationCountryCode">
                    <option value="">不指定</option>
                    {countryOptions.map((country) => <option key={country.code} value={country.code}>{country.name}</option>)}
                  </select>
                </label>
                <label>
                  <span>物流產品</span>
                  <select defaultValue={current?.logisticsProductId ?? ""} name="logisticsProductId">
                    <option value="">不指定</option>
                    {logisticsProducts.map((product) => <option key={product.id} value={product.id}>{product.productName} · {product.productCode}</option>)}
                  </select>
                </label>
                <label>
                  <span>限制類型</span>
                  <select defaultValue={current?.restrictionType ?? "prohibited"} name="restrictionType">
                    <option value="prohibited">禁運</option>
                    <option value="max_weight">最大重量限制</option>
                    <option value="max_dimensions">最大尺寸限制</option>
                    <option value="review_required">需要人工審核</option>
                    <option value="identity_required">需要身份信息</option>
                  </select>
                </label>
                <label><span>禁運關鍵詞</span><input defaultValue={current?.keywords ?? ""} name="keywords" placeholder="電池、液體、食品，可用逗號分隔" /></label>
                <fieldset className="full checkbox-fieldset">
                  <legend>貨物屬性</legend>
                  {attrOptions.map((attr) => <label key={attr.code}><input defaultChecked={current?.cargoCategories.includes(attr.code) ?? false} name="cargoCategories" type="checkbox" value={attr.code} />{attr.name}</label>)}
                </fieldset>
                <label><span>最大重量 kg</span><input defaultValue={current?.maxWeightKg ?? ""} min="0" name="maxWeightKg" step="0.01" type="number" /></label>
                <label><span>最大長 cm</span><input defaultValue={current?.maxLengthCm ?? ""} min="0" name="maxLengthCm" step="0.1" type="number" /></label>
                <label><span>最大寬 cm</span><input defaultValue={current?.maxWidthCm ?? ""} min="0" name="maxWidthCm" step="0.1" type="number" /></label>
                <label><span>最大高 cm</span><input defaultValue={current?.maxHeightCm ?? ""} min="0" name="maxHeightCm" step="0.1" type="number" /></label>
                <label>
                  <span>狀態</span>
                  <select defaultValue={current?.status ?? "active"} name="status">
                    <option value="active">啟用</option>
                    <option value="disabled">停用</option>
                  </select>
                </label>
                <label className="full"><span>前台提示文案</span><textarea defaultValue={current?.customerMessage ?? ""} name="customerMessage" /></label>
                <label className="full"><span>內部備註</span><textarea defaultValue={current?.internalNote ?? ""} name="internalNote" /></label>
                <button disabled={submitting} type="submit">{current ? "保存修改" : "新增規則"}</button>
              </form>
            </section>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function shippingRestrictionFormBody(item: ShippingRestriction, overrides: Partial<ShippingRestriction> = {}) {
  const next = { ...item, ...overrides };
  return {
    ruleName: next.ruleName,
    scopeType: next.scopeType,
    destinationCountryCode: next.destinationCountryCode ?? "",
    logisticsProductId: next.logisticsProductId ?? "",
    cargoCategories: next.cargoCategories,
    keywords: next.keywords ?? "",
    restrictionType: next.restrictionType,
    maxWeightKg: next.maxWeightKg ?? "",
    maxLengthCm: next.maxLengthCm ?? "",
    maxWidthCm: next.maxWidthCm ?? "",
    maxHeightCm: next.maxHeightCm ?? "",
    customerMessage: next.customerMessage ?? "",
    internalNote: next.internalNote ?? "",
    status: next.status
  };
}

function AdminDictionaries({
  categories,
  dictionaries,
  onDelete,
  onSubmit,
  submitting
}: {
  categories: DictionaryCategory[];
  dictionaries: SystemDictionary[];
  onDelete: (path: string, success: string) => Promise<void>;
  onSubmit: (path: string, body: Record<string, unknown>, success: string) => Promise<void>;
  submitting: boolean;
}) {
  const pageSize = 15;
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<SystemDictionary | null>(null);
  const [creating, setCreating] = useState(false);
  const current = editing;
  const showModal = creating || Boolean(editing);
  const normalizedKeyword = keyword.trim().toLowerCase();
  const filtered = dictionaries.filter((item) => {
    const categoryMatched = categoryFilter === "all" || item.categoryCode === categoryFilter;
    const statusMatched = statusFilter === "all" || item.status === statusFilter;
    const keywordMatched = !normalizedKeyword || [
      item.categoryCode,
      item.categoryNameZhHant,
      item.itemCode,
      item.itemValue,
      item.labelZhHant,
      item.labelEn,
      item.labelJa,
      item.remarks ?? ""
    ].some((field) => field.toLowerCase().includes(normalizedKeyword));
    return categoryMatched && statusMatched && keywordMatched;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  function closeModal() {
    setCreating(false);
    setEditing(null);
  }

  async function submitDictionary(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = Object.fromEntries(new FormData(event.currentTarget).entries());
    await onSubmit(
      current ? `/api/admin/dictionaries/${encodeURIComponent(current.id)}` : "/api/admin/dictionaries",
      body,
      current ? "字典項已更新" : "字典項已新增"
    );
    closeModal();
  }

  async function toggleDictionaryStatus(item: SystemDictionary) {
    await onSubmit(
      `/api/admin/dictionaries/${encodeURIComponent(item.id)}`,
      dictionaryFormBody(item, { status: item.status === "active" ? "disabled" : "active" }),
      item.status === "active" ? "字典項已停用" : "字典項已啟用"
    );
  }

  function resetFilters(nextCategory = categoryFilter, nextStatus = statusFilter, nextKeyword = keyword) {
    setCategoryFilter(nextCategory);
    setStatusFilter(nextStatus);
    setKeyword(nextKeyword);
    setPage(1);
  }

  return (
    <section className="panel full-span">
      <div className="panel-heading-row">
        <PanelTitle icon={<Settings />} title="字典管理" />
        <div className="panel-actions">
          <span>共 {dictionaries.length} 個字典項</span>
          <button onClick={() => setCreating(true)} type="button"><Plus size={16} />新增字典</button>
        </div>
      </div>
      <div className="dictionary-toolbar">
        <label>
          <span>分類</span>
          <select onChange={(event) => resetFilters(event.target.value, statusFilter, keyword)} value={categoryFilter}>
            <option value="all">全部分類</option>
            {categories.map((category) => <option key={category.code} value={category.code}>{category.name}</option>)}
          </select>
        </label>
        <label>
          <span>狀態</span>
          <select onChange={(event) => resetFilters(categoryFilter, event.target.value, keyword)} value={statusFilter}>
            <option value="all">全部狀態</option>
            <option value="active">啟用</option>
            <option value="disabled">停用</option>
          </select>
        </label>
        <label className="dictionary-search">
          <Search size={16} />
          <input onChange={(event) => resetFilters(categoryFilter, statusFilter, event.target.value)} placeholder="搜尋分類、編碼、名稱、字典值" type="search" value={keyword} />
        </label>
        <span>顯示 {filtered.length} 筆，每頁 {pageSize} 筆</span>
      </div>
      <div className="table-wrap compact-table dictionary-table">
        <table>
          <thead>
            <tr>
              <th>字典分類</th>
              <th>字典編碼</th>
              <th>字典名稱</th>
              <th>字典值</th>
              <th>多語名稱</th>
              <th>排序</th>
              <th>狀態</th>
              <th>更新時間</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((item) => (
              <tr key={item.id}>
                <td><strong>{item.categoryNameZhHant}</strong><small>{item.categoryCode}</small></td>
                <td><strong>{item.itemCode}</strong><small>{item.isSystem ? "系統預置" : "自定義"}</small></td>
                <td>{item.labelZhHant}</td>
                <td>{item.itemValue}</td>
                <td>
                  <strong>{item.labelEn || "-"}</strong>
                  <small>{item.labelJa || "-"}</small>
                </td>
                <td>{item.sortOrder}</td>
                <td><mark>{item.statusLabel}</mark></td>
                <td>{new Date(item.updatedAt).toLocaleString("zh-HK")}</td>
                <td>
                  <div className="row-actions">
                    <button className="secondary" onClick={() => setEditing(item)} type="button"><Pencil size={15} />編輯</button>
                    <button className="secondary" disabled={submitting} onClick={() => void toggleDictionaryStatus(item)} type="button">{item.status === "active" ? "停用" : "啟用"}</button>
                    <button className="danger" disabled={submitting || item.isSystem} onClick={() => void onDelete(`/api/admin/dictionaries/${encodeURIComponent(item.id)}/delete`, "字典項已刪除")} type="button"><Trash2 size={15} />刪除</button>
                  </div>
                </td>
              </tr>
            ))}
            {pageItems.length === 0 ? <tr><td colSpan={9}>暫無字典資料</td></tr> : null}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button disabled={currentPage <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))} type="button">上一頁</button>
        <span>第 {currentPage} / {totalPages} 頁</span>
        <button disabled={currentPage >= totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))} type="button">下一頁</button>
      </div>

      {showModal ? (
        <div className="modal-backdrop">
          <div className="ticket-modal">
            <button className="modal-close" onClick={closeModal} type="button">關閉</button>
            <section className="panel">
              <PanelTitle icon={<Settings />} title={current ? "編輯字典項" : "新增字典項"} />
              <form className="form-grid" onSubmit={(event) => void submitDictionary(event)}>
                <label>
                  <span>分類編碼</span>
                  <input defaultValue={current?.categoryCode ?? ""} list="dictionary-category-codes" name="categoryCode" placeholder="product_platform" required />
                  <datalist id="dictionary-category-codes">
                    {categories.map((category) => <option key={category.code} value={category.code}>{category.name}</option>)}
                  </datalist>
                </label>
                <label><span>分類名稱</span><input defaultValue={current?.categoryNameZhHant ?? ""} name="categoryNameZhHant" placeholder="商品平台" required /></label>
                <label><span>字典編碼</span><input defaultValue={current?.itemCode ?? ""} name="itemCode" placeholder="mercari" required /></label>
                <label><span>字典值</span><input defaultValue={current?.itemValue ?? ""} name="itemValue" placeholder="Mercari" required /></label>
                <label><span>繁體名稱</span><input defaultValue={current?.labelZhHant ?? ""} name="labelZhHant" required /></label>
                <label><span>英文名稱</span><input defaultValue={current?.labelEn ?? ""} name="labelEn" /></label>
                <label><span>日文名稱</span><input defaultValue={current?.labelJa ?? ""} name="labelJa" /></label>
                <label><span>排序</span><input defaultValue={current?.sortOrder ?? 100} min="0" name="sortOrder" type="number" /></label>
                <label>
                  <span>狀態</span>
                  <select defaultValue={current?.status ?? "active"} name="status">
                    <option value="active">啟用</option>
                    <option value="disabled">停用</option>
                  </select>
                </label>
                <label className="full"><span>備註</span><textarea defaultValue={current?.remarks ?? ""} name="remarks" /></label>
                <button disabled={submitting} type="submit">{current ? "保存字典" : "新增字典"}</button>
              </form>
            </section>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function dictionaryFormBody(item: SystemDictionary, overrides: Partial<SystemDictionary> = {}) {
  const next = { ...item, ...overrides };
  return {
    categoryCode: next.categoryCode,
    categoryNameZhHant: next.categoryNameZhHant,
    itemCode: next.itemCode,
    itemValue: next.itemValue,
    labelZhHant: next.labelZhHant,
    labelEn: next.labelEn,
    labelJa: next.labelJa,
    sortOrder: next.sortOrder,
    status: next.status,
    remarks: next.remarks ?? ""
  };
}

function AdminStaffAccounts({
  departments,
  onDelete,
  onSubmit,
  roles,
  staff,
  submitting,
  warehouses
}: {
  departments: StaffDepartment[];
  onDelete: (path: string, success: string) => Promise<void>;
  onSubmit: (path: string, body: Record<string, unknown>, success: string) => Promise<void>;
  roles: StaffRole[];
  staff: StaffAccount[];
  submitting: boolean;
  warehouses: WarehouseRecord[];
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
    const formData = new FormData(event.currentTarget);
    const body = {
      ...Object.fromEntries(formData.entries()),
      warehouseIds: formData.getAll("warehouseIds")
    };
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
              <th>授權倉庫</th>
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
                <td>{item.warehouseNames.length ? item.warehouseNames.join("、") : "全部 / 未限制"}</td>
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
            {staff.length === 0 ? <tr><td colSpan={7}>暫無員工資料</td></tr> : null}
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
                <div className="full warehouse-permission-box">
                  <span>授權倉庫</span>
                  <small>不勾選表示暫不限制；未來 store.droppilot.net 會依此控制可見倉庫資料。</small>
                  <div>
                    {warehouses.map((warehouse) => (
                      <label key={warehouse.id}>
                        <input defaultChecked={current?.warehouseIds.includes(warehouse.id) ?? false} name="warehouseIds" type="checkbox" value={warehouse.id} />
                        {warehouse.name}
                      </label>
                    ))}
                  </div>
                </div>
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

function OrderList({ action, initialStatusFilter = "all", orders, showAdminActions, showMemberActions, submitting, title }: { action: (path: string, success: string) => Promise<void>; initialStatusFilter?: string; orders: ProcurementOrder[]; showAdminActions?: boolean; showMemberActions?: boolean; submitting: boolean; title: string }) {
  const [statusFilter, setStatusFilter] = useState(initialStatusFilter);
  const [detail, setDetail] = useState<ProcurementOrder | null>(null);
  useEffect(() => {
    setStatusFilter(initialStatusFilter);
  }, [initialStatusFilter]);
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

