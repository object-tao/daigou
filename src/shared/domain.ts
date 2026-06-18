export type Tone = "blue" | "green" | "amber" | "red";

export type Metric = {
  label: string;
  value: string;
  tone: Tone;
};

export type RoleDefinition = {
  role: string;
  label: string;
  permissions: string[];
  scope: string;
};

export type MemberOrder = {
  id: string;
  type: string;
  platform?: string;
  warehouse?: string;
  status: string;
  amountJpy?: number;
  maxBidJpy?: number;
  authorizationLimitJpy?: number;
  localShippingJpy?: string;
  serviceFeeHkd?: number | null;
  storageFreeUntil?: string;
  directDispatchCandidate?: boolean;
  remarks?: string;
  updatedAt: string;
};

export const appLocales = ["zh-Hant", "en", "ja"] as const;

export const launchMarkets = ["香港", "澳門", "台灣", "英國", "加拿大", "澳大利亞"];

export const featureFlags = {
  manualProcurement: true,
  yahooAuctionManualBidding: true,
  platformApiIntegrations: false,
  bankTransferTopUp: true,
  whatsappAddon: true,
  imageSearch: "planned",
  seo: true,
  miniProgram: false
};

export const roleMatrix: RoleDefinition[] = [
  {
    role: "super_admin",
    label: "超級管理員",
    permissions: ["*"],
    scope: "全局配置、權限、字典、翻譯、審計"
  },
  {
    role: "customer_service",
    label: "客服",
    permissions: ["member.read", "order.quote", "aftersales.review", "message.send"],
    scope: "報價、會員溝通、售後申請、通知發送"
  },
  {
    role: "warehouse",
    label: "倉庫",
    permissions: ["package.receive", "package.merge", "shipment.pack", "value_added.handle"],
    scope: "入庫、合箱、出庫、一件直發、增值服務"
  },
  {
    role: "finance",
    label: "財務",
    permissions: ["payment.review", "exchange_rate.write", "wallet.adjust", "report.export"],
    scope: "銀行轉帳、人工匯率、餘額調整、退款"
  },
  {
    role: "operator",
    label: "營運",
    permissions: ["group_buy.manage", "coupon.manage", "content.translate", "dictionary.manage"],
    scope: "團購、優惠券、會員等級、多語內容"
  }
];

export const workflowStates = {
  procurement: ["draft_cart", "pending_quote", "awaiting_payment", "purchasing", "ordered", "inbound_pending", "completed", "cancelled"],
  auction: ["manual_bid_setup", "bidding", "won", "lost", "awaiting_payment", "refund_pending", "completed"],
  package: ["received", "identified", "ownerless_pool", "value_added_pending", "ready_to_merge", "direct_dispatch", "packing", "shipped"],
  aftersales: ["pending_review", "approved", "rejected", "executed"]
};

export const adminMetrics: Metric[] = [
  { label: "待報價", value: "18", tone: "amber" },
  { label: "代拍中", value: "7", tone: "blue" },
  { label: "入庫包裹", value: "42", tone: "green" },
  { label: "退款審核", value: "3", tone: "red" }
];

export const serviceBlueprint = {
  purchasePlatforms: ["Mercari", "Rakuma", "Amazon Japan", "日本線下供應商", "其他人工錄入"],
  auctionPlatforms: ["Yahoo! Auctions"],
  valueAddedServices: [
    { code: "photo_full", label: "全方面拍照", billing: "per_package" },
    { code: "reinforce_packaging", label: "加強包裝", billing: "per_package" },
    { code: "vacuum_pack", label: "抽空", billing: "per_package" },
    { code: "negotiation", label: "議價服務", billing: "per_order" }
  ],
  notificationChannels: [
    { code: "email", label: "郵件", defaultEnabled: true, paidAddon: false },
    { code: "whatsapp", label: "WhatsApp", defaultEnabled: false, paidAddon: true }
  ],
  memberLevels: ["LV1", "LV2", "LV3", "LV4", "LV5"],
  pointBuckets: ["代購商品積分", "物流費用積分"],
  groupBuyRule: "會員推薦成團，線下同供應商談好貨同價；開團者獎勵規則由後台配置。"
};

export const demoMember = {
  id: "demo-member",
  displayName: "Demo Member",
  locale: "zh-Hant",
  level: "LV1",
  balanceHkd: 1280,
  commissionBalanceHkd: 86,
  points: {
    procurement: 320,
    logistics: 180
  },
  tags: ["香港", "繁體中文", "銀行轉帳"],
  preferences: {
    email: true,
    whatsapp: false
  }
};

export const demoOrders: MemberOrder[] = [
  {
    id: "DP-PO-10001",
    type: "代購",
    platform: "Mercari",
    status: "待人工報價",
    amountJpy: 9800,
    localShippingJpy: "待確認",
    serviceFeeHkd: null,
    remarks: "可議價則先詢問客服",
    updatedAt: "2026-06-18T09:30:00.000Z"
  },
  {
    id: "DP-AU-10002",
    type: "代拍",
    platform: "Yahoo! Auctions",
    status: "人工出價設定中",
    amountJpy: 12000,
    maxBidJpy: 18000,
    authorizationLimitJpy: 18000,
    updatedAt: "2026-06-18T10:10:00.000Z"
  },
  {
    id: "DP-PK-10003",
    type: "集運",
    warehouse: "船橋倉",
    status: "等待合箱",
    storageFreeUntil: "2026-06-25",
    directDispatchCandidate: false,
    updatedAt: "2026-06-18T11:20:00.000Z"
  }
];

export const logisticsLines = [
  {
    code: "HK-AIR-STANDARD",
    name: "香港空運標準線",
    currency: "HKD",
    priceNote: "按重量及體積重取高者計費",
    restrictions: ["不可寄易燃品", "不可寄現金或有價證券"],
    tracking: true
  },
  {
    code: "HK-SEA-BULK",
    name: "香港海運合箱線",
    currency: "HKD",
    priceNote: "免運合箱，另收紙箱費",
    restrictions: ["適合非急件", "超材需人工審核"],
    tracking: true
  }
];

export const adminSummary = {
  counters: {
    pendingQuotes: 18,
    auctionBids: 7,
    inboundPackages: 42,
    ownerlessPackages: 5,
    refundReviews: 3,
    valueAddedTasks: 11,
    bankTransfers: 9,
    translationTasks: 4
  },
  operations: [
    "人工匯率設定",
    "銀行轉帳入帳審核",
    "一件直發提醒",
    "無主包裹入公海",
    "會員認證人工審核",
    "多語內容翻譯",
    "CSV/Excel 報表匯出"
  ]
};
