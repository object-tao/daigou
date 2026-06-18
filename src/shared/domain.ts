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
  emailNotifications: false,
  whatsappAddon: false,
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
  procurement: [
    "pending_payment",
    "paid",
    "pending_purchase",
    "purchasing",
    "purchased",
    "arrived_japan_warehouse",
    "pending_shelving",
    "shelved",
    "pending_consolidation",
    "pending_packing",
    "pending_international_freight_payment",
    "pending_dispatch",
    "dispatched",
    "completed",
    "cancelled",
    "refunding",
    "refunded"
  ],
  auction: ["manual_bid_setup", "bidding", "won", "lost", "awaiting_payment", "refund_pending", "completed"],
  package: [
    "pending_inbound",
    "inbound",
    "pending_claim",
    "claimed",
    "pending_consolidation",
    "packing",
    "pending_payment",
    "pending_outbound",
    "outbound",
    "in_transit",
    "signed"
  ],
  aftersales: ["pending_review", "approved", "rejected", "executed"]
};

export const packageNumberRules = [
  { code: "japan_tracking_no", label: "日本物流單號", example: "JP-TRACK-123456" },
  { code: "warehouse_inbound_no", label: "倉庫入庫號", example: "DP-IN-20260618-0001" },
  { code: "member_package_no", label: "客戶包裹號", example: "DP-PK-10003" },
  { code: "consolidation_batch_no", label: "合箱批次號", example: "DP-MG-20260618-0001" },
  { code: "international_tracking_no", label: "國際物流號", example: "DP-HK-AIR-0001" }
];

export const localShippingFeeRules = [
  { code: "pre_collect", label: "採購前預收" },
  { code: "manual_after_purchase", label: "採購後人工補收" },
  { code: "balance_debt", label: "自動加入餘額欠款" },
  { code: "next_payment", label: "下次付款一起收" }
];

export const consolidationOptions = [
  { code: "unlimited_items", label: "不限件數", configurable: true },
  { code: "cross_platform", label: "可跨平台合箱", configurable: true },
  { code: "free_consolidation", label: "免費合箱", configurable: true },
  { code: "carton_fee", label: "收紙箱費", configurable: true },
  { code: "keep_original_box", label: "保留原箱", configurable: true },
  { code: "remove_shoe_box", label: "去除鞋盒", configurable: true },
  { code: "vacuum_pack", label: "抽真空", configurable: true },
  { code: "reinforce_packaging", label: "加強包裝", configurable: true }
];

export const logisticsChannelTemplates = [
  { code: "HK_AIR", name: "香港空運", destination: "HK", mode: "air" },
  { code: "HK_SEA", name: "香港海運", destination: "HK", mode: "sea" },
  { code: "UK_AIR", name: "英國空運", destination: "GB", mode: "air" },
  { code: "UK_SEA", name: "英國海運", destination: "GB", mode: "sea" },
  { code: "CA", name: "加拿大", destination: "CA", mode: "mixed" },
  { code: "AU", name: "澳洲", destination: "AU", mode: "mixed" },
  { code: "MO", name: "澳門", destination: "MO", mode: "mixed" },
  { code: "TW", name: "台灣", destination: "TW", mode: "mixed" }
];

export const autoDebitPolicy = {
  balanceLimitHkd: 500,
  reconfirmOverHkd: 100,
  creditAllowed: false,
  insufficientBalanceAction: "notify_member_for_top_up"
};

export const confirmedBusinessRules = {
  member: {
    registrationMethod: "email",
    kycRequiredMvp: false,
    levelCount: 5,
    upgradeMetrics: ["cumulative_spend", "cumulative_freight", "top_up_amount", "order_count"],
    benefits: [
      "freight_discount",
      "service_fee_discount",
      "storage_free_days_bonus",
      "priority_handling",
      "commission_rate"
    ]
  },
  content: {
    firstReleaseLocales: appLocales,
    defaultLocale: "zh-Hant",
    publicPricingPage: true,
    articleModuleMvp: false
  },
  procurement: {
    paymentPolicy: "full_payment_before_purchase",
    cancellationPolicy: {
      beforePurchase: "allowed",
      afterPurchase: "not_allowed"
    },
    localShippingCollection: "after_purchase"
  },
  auction: {
    failedBidRefundDestination: "wallet_balance",
    wonLotAutoCreatesInboundNotice: true
  },
  warehouse: {
    inboundMatching: "auto_match_by_package_information",
    ownerlessPackageRetentionDays: 60,
    ownerlessPackageAction: "destroy",
    memberCanSelectConsolidation: true,
    staffCanSelectConsolidation: true,
    repackAfterConsolidationAllowed: false,
    freeStorageDays: 30,
    overstorageBilling: "per_package_per_day"
  },
  logistics: {
    billingWeight: "greater_of_actual_or_volumetric",
    trackingEvents: [
      "packed",
      "outbound",
      "departed_by_air_or_sea",
      "arrived_port",
      "customs_clearance",
      "delivery",
      "signed"
    ]
  },
  finance: {
    negativeBalanceAllowed: false,
    refundDestination: "wallet_balance",
    commissionDestination: "wallet_balance",
    autoDebitLimitConfigurable: true
  },
  notification: {
    emailMvp: false,
    whatsappMvp: false,
    userCanDisable: true
  },
  admin: {
    permissionGranularity: "module",
    financeCanEditOrderAmount: true,
    warehouseCanViewFinanceData: false
  },
  migration: {
    legacyDataMigrationMvp: false
  }
};

export const serviceFeeRuleTemplates = [
  { serviceType: "procurement", feeType: "item_amount_percent", configurable: true },
  { serviceType: "procurement", feeType: "fixed_fee", configurable: true },
  { serviceType: "auction", feeType: "winning_bid_percent", configurable: true },
  { serviceType: "auction", feeType: "fixed_fee", configurable: true },
  { serviceType: "photo_full", feeType: "fixed_fee", configurable: true },
  { serviceType: "reinforce_packaging", feeType: "fixed_fee", configurable: true },
  { serviceType: "vacuum_pack", feeType: "fixed_fee", configurable: true },
  { serviceType: "remove_shoe_box", feeType: "fixed_fee", configurable: true },
  { serviceType: "keep_original_box", feeType: "fixed_fee", configurable: true },
  { serviceType: "negotiation", feeType: "fixed_fee", configurable: true }
];

export const cartonTypeTemplates = [
  { code: "S", name: "Small carton", fixedFeeHkd: 0, enabled: true },
  { code: "M", name: "Medium carton", fixedFeeHkd: 0, enabled: true },
  { code: "L", name: "Large carton", fixedFeeHkd: 0, enabled: true }
];

export const supportTicketTypes = [
  "售後申請",
  "補款申請",
  "退款申請",
  "查件",
  "包裹異常",
  "商品損壞",
  "少件漏件"
];

export const warehouseScanSteps = [
  "入庫掃碼",
  "上架掃碼",
  "合箱掃碼",
  "打包掃碼",
  "出庫掃碼"
];

export const financeLedgerBuckets = [
  "會員餘額",
  "代購消費",
  "國際運費",
  "日本本地運費",
  "增值服務費",
  "優惠券折扣",
  "佣金",
  "積分",
  "退款紀錄"
];

export const seoFields = ["Title", "Meta Description", "URL Slug", "Open Graph", "Sitemap", "robots.txt"];

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
    { code: "email", label: "郵件", defaultEnabled: false, paidAddon: false },
    { code: "whatsapp", label: "WhatsApp", defaultEnabled: false, paidAddon: false }
  ],
  memberLevels: ["LV1", "LV2", "LV3", "LV4", "LV5"],
  pointBuckets: ["代購商品積分", "物流費用積分"],
  groupBuyRule: "會員推薦成團，線下同供應商談好貨同價；開團者獎勵規則由後台配置。",
  packageNumberRules,
  localShippingFeeRules,
  consolidationOptions,
  logisticsChannelTemplates,
  autoDebitPolicy,
  supportTicketTypes,
  warehouseScanSteps,
  financeLedgerBuckets,
  seoFields,
  confirmedBusinessRules,
  serviceFeeRuleTemplates,
  cartonTypeTemplates
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
