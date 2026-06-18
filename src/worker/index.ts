import { Hono } from "hono";
import { cors } from "hono/cors";

type Bindings = Env;

const app = new Hono<{ Bindings: Bindings }>();

const markets = ["香港", "澳門", "台灣", "英國", "加拿大", "澳大利亞"];
const locales = ["zh-Hant", "en", "ja"];

const roleMatrix = [
  {
    role: "super_admin",
    label: "超級管理員",
    permissions: ["*"]
  },
  {
    role: "customer_service",
    label: "客服",
    permissions: ["member.read", "order.quote", "aftersales.review", "message.send"]
  },
  {
    role: "warehouse",
    label: "倉庫",
    permissions: ["package.receive", "package.merge", "shipment.pack", "value_added.handle"]
  },
  {
    role: "finance",
    label: "財務",
    permissions: ["payment.review", "exchange_rate.write", "wallet.adjust", "report.export"]
  },
  {
    role: "operator",
    label: "營運",
    permissions: ["group_buy.manage", "coupon.manage", "content.translate", "dictionary.manage"]
  }
];

const workflowStates = {
  procurement: ["draft_cart", "pending_quote", "awaiting_payment", "purchasing", "ordered", "inbound_pending", "completed", "cancelled"],
  auction: ["manual_bid_setup", "bidding", "won", "lost", "awaiting_payment", "refund_pending", "completed"],
  package: ["received", "identified", "ownerless_pool", "value_added_pending", "ready_to_merge", "direct_dispatch", "packing", "shipped"],
  aftersales: ["pending_review", "approved", "rejected", "executed"]
};

app.use("/api/*", cors());

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
    locales,
    launchMarkets: markets,
    settlementCurrency: "HKD",
    purchaseCurrency: "JPY",
    defaultWarehouse: "船橋倉",
    featureFlags: {
      manualProcurement: true,
      yahooAuctionManualBidding: true,
      platformApiIntegrations: false,
      bankTransferTopUp: true,
      whatsappAddon: true,
      imageSearch: "planned",
      seo: true,
      miniProgram: false
    }
  })
);

app.get("/api/catalog/service-blueprint", (c) =>
  c.json({
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
  })
);

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

app.get("/api/member/me", (c) =>
  c.json({
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
  })
);

app.get("/api/member/orders", (c) =>
  c.json({
    items: [
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
    ]
  })
);

app.get("/api/logistics/lines", (c) =>
  c.json({
    items: [
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
    ]
  })
);

app.get("/api/admin/summary", (c) =>
  c.json({
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
  })
);

app.notFound((c) => c.env.ASSETS.fetch(c.req.raw));

export default app;
