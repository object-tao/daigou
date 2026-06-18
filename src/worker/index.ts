import { Hono } from "hono";
import { cors } from "hono/cors";

type Bindings = Env;

const app = new Hono<{ Bindings: Bindings }>();

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
    locales: ["zh-Hant", "en", "ja"],
    settlementCurrency: "HKD",
    purchaseCurrency: "JPY",
    launchMarkets: ["香港", "澳門", "台灣", "英國", "加拿大", "澳大利亞"],
    featureFlags: {
      manualProcurement: true,
      yahooAuctionManualBidding: true,
      platformApiIntegrations: false,
      whatsappAddon: true,
      imageSearch: "planned"
    }
  })
);

app.get("/api/member/me", (c) =>
  c.json({
    id: "demo-member",
    displayName: "Demo Member",
    locale: "zh-Hant",
    level: "Lv1",
    balanceHkd: 1280,
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
        serviceFeeHkd: null,
        updatedAt: "2026-06-18T09:30:00.000Z"
      },
      {
        id: "DP-AU-10002",
        type: "代拍",
        platform: "Yahoo! Auctions",
        status: "人工出價設定中",
        amountJpy: 12000,
        maxBidJpy: 18000,
        updatedAt: "2026-06-18T10:10:00.000Z"
      },
      {
        id: "DP-PK-10003",
        type: "集運",
        warehouse: "船橋倉",
        status: "等待合箱",
        storageFreeUntil: "2026-06-25",
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
      valueAddedTasks: 11
    },
    operations: [
      "人工匯率設定",
      "銀行轉帳入帳審核",
      "一件直發提醒",
      "無主包裹入公海",
      "會員認證人工審核"
    ]
  })
);

app.notFound((c) => c.env.ASSETS.fetch(c.req.raw));

export default app;
