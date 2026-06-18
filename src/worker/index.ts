import { Hono } from "hono";
import { cors } from "hono/cors";
import {
  adminSummary,
  appLocales,
  demoMember,
  demoOrders,
  featureFlags,
  launchMarkets,
  logisticsLines,
  roleMatrix,
  serviceBlueprint,
  workflowStates
} from "../shared/domain";

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
    locales: appLocales,
    launchMarkets,
    settlementCurrency: "HKD",
    purchaseCurrency: "JPY",
    defaultWarehouse: "船橋倉",
    featureFlags
  })
);

app.get("/api/catalog/service-blueprint", (c) => c.json(serviceBlueprint));

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

app.get("/api/member/me", (c) => c.json(demoMember));

app.get("/api/member/orders", (c) =>
  c.json({
    items: demoOrders
  })
);

app.get("/api/logistics/lines", (c) =>
  c.json({
    items: logisticsLines
  })
);

app.get("/api/admin/summary", (c) => c.json(adminSummary));

app.notFound((c) => c.env.ASSETS.fetch(c.req.raw));

export default app;
