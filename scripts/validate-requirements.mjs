import { readFileSync } from "node:fs";

const files = {
  domain: "src/shared/domain.ts",
  migration4: "migrations/0004_response2_operational_rules.sql",
  api: "src/worker/index.ts",
  repository: "src/worker/repository.ts",
  app: "src/app/main.tsx",
  prd: "docs/product/requirements-response-2.md",
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
    needles: [
      "japan_tracking_no",
      "warehouse_inbound_no",
      "member_package_no",
      "consolidation_batch_no",
      "international_tracking_no"
    ]
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
    needles: ["support_tickets", "warehouse_scan_events", "售後申請", "入庫掃碼", "出庫掃碼"]
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

const utf8Needles = ["香港", "船橋倉", "超級管理員", "日本物流單號", "後台工作隊列"];
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
