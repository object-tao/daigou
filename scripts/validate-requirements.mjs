import { readFileSync } from "node:fs";

const files = {
  domain: "src/shared/domain.ts",
  migration4: "migrations/0004_response2_operational_rules.sql",
  migration5: "migrations/0005_confirmed_decisions.sql",
  migration6: "migrations/0006_warehouse_shipping_flow.sql",
  migration7: "migrations/0007_procurement_payment_flow.sql",
  migration8: "migrations/0008_full_mvp_modules.sql",
  api: "src/worker/index.ts",
  repository: "src/worker/repository.ts",
  app: "src/app/main.tsx",
  prd: "docs/product/requirements-response-2.md",
  confirmed: "docs/product/confirmed-decisions.md",
  apiContract: "docs/architecture/api-contract.md"
};

const contents = Object.fromEntries(
  Object.entries(files).map(([key, path]) => [key, readFileSync(path, "utf8")])
);

const checks = [
  {
    name: "procurement states are documented and modeled",
    haystacks: ["domain", "migration4", "prd"],
    needles: ["pending_payment", "paid", "pending_purchase", "purchasing", "purchased", "refunding", "refunded"]
  },
  {
    name: "forwarding states are documented and modeled",
    haystacks: ["domain", "migration4", "prd"],
    needles: ["pending_inbound", "inbound", "pending_claim", "claimed", "pending_outbound", "in_transit", "signed"]
  },
  {
    name: "package identifier model covers all required identifiers",
    haystacks: ["domain", "migration4", "prd"],
    needles: ["japan_tracking_no", "warehouse_inbound_no", "member_package_no", "consolidation_batch_no", "international_tracking_no"]
  },
  {
    name: "local shipping fee policies are configurable",
    haystacks: ["domain", "migration4", "prd"],
    needles: ["pre_collect", "manual_after_purchase", "balance_debt", "next_payment"]
  },
  {
    name: "consolidation options include box and packing choices",
    haystacks: ["domain", "migration4", "prd"],
    needles: ["cross_platform", "carton_fee", "keep_original_box", "remove_shoe_box", "vacuum_pack", "reinforce_packaging"]
  },
  {
    name: "self-owned logistics channels include launch regions",
    haystacks: ["domain", "migration4"],
    needles: ["HK_AIR", "HK_SEA", "UK_AIR", "UK_SEA", "'CA'", "'AU'", "'MO'", "'TW'"]
  },
  {
    name: "auto debit policy is represented",
    haystacks: ["domain", "migration4", "prd"],
    needles: ["balanceLimitHkd", "reconfirmOverHkd", "creditAllowed", "insufficient_balance_action"]
  },
  {
    name: "support tickets and warehouse scans are represented",
    haystacks: ["domain", "migration4", "repository"],
    needles: ["support_tickets", "warehouse_scan_events", "supportTicketTypes", "warehouseScanSteps"]
  },
  {
    name: "finance ledger and SEO metadata are represented",
    haystacks: ["domain", "migration4", "repository", "apiContract"],
    needles: ["financial_ledger_entries", "seo_entries", "URL Slug", "robots_directive"]
  },
  {
    name: "API exposes operational rules and work queue",
    haystacks: ["api", "repository", "apiContract"],
    needles: ["/api/catalog/operational-rules", "/api/admin/work-queue", "getOperationalRules", "getAdminWorkQueue"]
  },
  {
    name: "API supports MVP member write actions with audit logs",
    haystacks: ["api", "repository", "apiContract"],
    needles: [
      "POST /api/procurement/orders",
      "POST /api/payments/bank-transfer-requests",
      "POST /api/support/tickets",
      "createProcurementOrder",
      "createPaymentRequest",
      "createSupportTicket",
      "audit_logs"
    ]
  },
  {
    name: "H5 exposes MVP member write forms",
    haystacks: ["app", "apiContract"],
    needles: ["提交代購", "銀行轉帳充值", "提交工單", "會員前台"]
  },
  {
    name: "H5 separates consumer portal and admin console menus",
    haystacks: ["app"],
    needles: [
      "memberMenus",
      "adminMenus",
      "會員前台",
      "管理後台",
      "人工代購",
      "充值與餘額",
      "包裹與增值",
      "代購報價",
      "採購入庫預報",
      "入庫與無主件",
      "合箱與運費",
      "物流節點",
      "財務與退款"
    ]
  },
  {
    name: "Admin APIs close quote and bank-transfer review loop",
    haystacks: ["api", "repository", "apiContract"],
    needles: [
      "POST /api/admin/procurement/orders/:id/quote",
      "POST /api/admin/payments/:id/approve",
      "quoteProcurementOrder",
      "approvePaymentRequest",
      "pending_payment",
      "financial_ledger_entries"
    ]
  },
  {
    name: "confirmed MVP decisions are physically isolated in product docs",
    haystacks: ["confirmed"],
    needles: ["email", "KYC", "zh-Hant", "en", "ja", "60", "WhatsApp"]
  },
  {
    name: "confirmed MVP decisions are modeled in D1",
    haystacks: ["migration5"],
    needles: [
      "business_rule_settings",
      "service_fee_rules",
      "carton_types",
      "registration_method",
      "kyc_required_mvp",
      "full_payment_before_purchase",
      "legacy_data_migration_mvp"
    ]
  },
  {
    name: "confirmed business rules are exposed through operational rules API",
    haystacks: ["domain", "repository", "apiContract"],
    needles: [
      "confirmedBusinessRules",
      "serviceFeeRules",
      "cartonTypes",
      "repackAfterConsolidationAllowed",
      "greater_of_actual_or_volumetric",
      "warehouseCanViewFinanceData"
    ]
  },
  {
    name: "notification MVP excludes email and WhatsApp sending",
    haystacks: ["domain", "migration5", "confirmed"],
    needles: ["emailNotifications: false", "whatsappAddon: false", "email_mvp", "whatsapp_mvp"]
  },
  {
    name: "warehouse shipment flow links packages to shipments",
    haystacks: ["migration6", "repository", "apiContract"],
    needles: ["shipment_packages", "createShipmentFromPackages", "receiveInboundPackage", "addShipmentTrackingEvent"]
  },
  {
    name: "API exposes warehouse and logistics write actions",
    haystacks: ["api", "apiContract", "app"],
    needles: [
      "POST /api/admin/warehouse/inbound-packages",
      "POST /api/admin/shipments",
      "POST /api/admin/shipments/:id/tracking-events",
      "/api/admin/warehouse/inbound-packages",
      "/api/admin/shipments",
      "/api/admin/shipments/${encodeURIComponent"
    ]
  },
  {
    name: "procurement payment flow debits wallet and blocks negative balance",
    haystacks: ["repository", "api", "app", "apiContract"],
    needles: ["payProcurementOrder", "Insufficient wallet balance", "POST /api/procurement/orders/:id/pay", "/api/procurement/orders/${encodeURIComponent"]
  },
  {
    name: "procurement purchase completion creates inbound pre-alert package",
    haystacks: ["migration7", "repository", "api", "app", "apiContract"],
    needles: [
      "procurement_order_packages",
      "markProcurementPurchased",
      "pending_inbound",
      "POST /api/admin/procurement/orders/:id/mark-purchased",
      "/api/admin/procurement/orders/${encodeURIComponent"
    ]
  },
  {
    name: "full MVP module tables and APIs are represented",
    haystacks: ["migration8", "api", "repository", "app"],
    needles: [
      "auth_credentials",
      "auth_sessions",
      "admin_role_permissions",
      "auction_order_packages",
      "consolidation_requests",
      "freight_quotes",
      "coupon_redemptions",
      "point_redemptions",
      "/api/auth/login",
      "/api/auction/orders",
      "/api/cart/items",
      "/api/value-added-services",
      "/api/aftersales/requests",
      "/api/admin/seo",
      "會員積分",
      "匯出與附件"
    ]
  }
];

const failures = [];

for (const check of checks) {
  const text = check.haystacks.map((key) => contents[key]).join("\n");
  const missing = check.needles.filter((needle) => !text.includes(needle));

  if (missing.length > 0) {
    failures.push(`${check.name}: missing ${missing.join(", ")}`);
  }
}

const utf8Needles = ["會員前台", "管理後台", "人工代購", "物流節點", "銀行轉帳充值"];
const utf8Text = Object.values(contents).join("\n");
const missingUtf8 = utf8Needles.filter((needle) => !utf8Text.includes(needle));

if (missingUtf8.length > 0) {
  failures.push(`UTF-8 business terms missing: ${missingUtf8.join(", ")}`);
}

if (failures.length > 0) {
  console.error("Requirement validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Requirement validation passed (${checks.length} coverage checks).`);
