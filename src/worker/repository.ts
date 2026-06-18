import {
  adminSummary,
  autoDebitPolicy,
  consolidationOptions,
  demoMember,
  demoOrders,
  financeLedgerBuckets,
  localShippingFeeRules,
  logisticsChannelTemplates,
  packageNumberRules,
  seoFields,
  supportTicketTypes,
  warehouseScanSteps,
  workflowStates,
  type MemberOrder
} from "../shared/domain";

type D1Value = string | number | boolean | null;

type WalletRow = {
  id: string;
  display_name: string;
  locale: string;
  level_code: string;
  balance_hkd: number | null;
  commission_balance_hkd: number | null;
};

type PointRow = {
  bucket: string;
  total: number;
};

type PreferenceRow = {
  channel: string;
  enabled: number;
};

type ProcurementRow = {
  id: string;
  platform: string;
  status: string;
  item_amount_jpy: number | null;
  local_shipping_jpy: number | null;
  service_fee_hkd: number | null;
  remarks: string | null;
  updated_at: string;
};

type AuctionRow = {
  id: string;
  platform: string;
  status: string;
  max_bid_jpy: number;
  authorization_limit_jpy: number;
  updated_at: string;
};

type PackageRow = {
  id: string;
  warehouse_name: string;
  status: string;
  free_storage_until: string | null;
  updated_at: string;
};

type CountRow = {
  count: number;
};

type StatusDefinitionRow = {
  order_type: string;
  code: string;
  label: string;
  sort_order: number;
  is_terminal: number;
};

type PackageIdentifierRow = {
  identifier_type: string;
  identifier_value: string;
};

type LocalShippingRuleRow = {
  code: string;
  label: string;
  debt_behavior: string;
  enabled: number;
};

type ConsolidationOptionRow = {
  code: string;
  label: string;
  fee_type: string;
  enabled: number;
};

type LogisticsChannelRow = {
  code: string;
  name: string;
  destination_region: string;
  transport_mode: string;
  billing_method: string;
  restricted_items_json: string;
  transit_time_note: string | null;
  weight_limit_gram: number | null;
  volumetric_formula: string | null;
  enabled: number;
};

type AutoDebitRuleRow = {
  balance_limit_hkd: number;
  reconfirm_over_hkd: number;
  credit_allowed: number;
  insufficient_balance_action: string;
};

type SupportTicketRow = {
  id: string;
  ticket_type: string;
  status: string;
  priority: string;
  subject: string;
  related_type: string | null;
  related_id: string | null;
  updated_at: string;
};

type WarehouseScanRow = {
  id: string;
  package_id: string;
  scan_step: string;
  scanned_code: string;
  location: string | null;
  created_at: string;
};

type FinancialLedgerRow = {
  id: string;
  bucket: string;
  direction: string;
  amount_hkd: number;
  amount_jpy: number;
  source_type: string;
  source_id: string;
  created_at: string;
};

type SeoEntryRow = {
  entity_type: string;
  entity_id: string;
  locale: string;
  title: string;
  meta_description: string | null;
  url_slug: string;
  sitemap_enabled: number;
  robots_directive: string;
};

export type CreateProcurementInput = {
  platform: string;
  productUrl: string;
  title: string;
  quantity: number;
  remarks?: string;
};

export type CreatePaymentRequestInput = {
  amountHkd: number;
  proofUrl?: string;
};

export type CreateSupportTicketInput = {
  ticketType: string;
  subject: string;
  description: string;
  relatedType?: string;
  relatedId?: string;
  priority?: string;
};

async function first<T>(db: D1Database, sql: string, ...binds: D1Value[]): Promise<T | null> {
  return db.prepare(sql).bind(...binds).first<T>();
}

async function all<T>(db: D1Database, sql: string, ...binds: D1Value[]): Promise<T[]> {
  const result = await db.prepare(sql).bind(...binds).all<T>();
  return result.results ?? [];
}

async function count(db: D1Database, sql: string, ...binds: D1Value[]): Promise<number> {
  const row = await first<CountRow>(db, sql, ...binds);
  return Number(row?.count ?? 0);
}

async function run(db: D1Database, sql: string, ...binds: D1Value[]) {
  return db.prepare(sql).bind(...binds).run();
}

function createId(prefix: string): string {
  return `${prefix}-${crypto.randomUUID()}`;
}

async function writeAuditLog(
  db: D1Database,
  actorType: string,
  actorId: string,
  action: string,
  entityType: string,
  entityId: string,
  metadata: Record<string, unknown> = {}
) {
  await run(
    db,
    `INSERT INTO audit_logs (id, actor_type, actor_id, action, entity_type, entity_id, metadata_json)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    createId("audit"),
    actorType,
    actorId,
    action,
    entityType,
    entityId,
    JSON.stringify(metadata)
  );
}

function statusLabel(status: string): string {
  const labels: Record<string, string> = {
    pending_quote: "待人工報價",
    manual_bid_setup: "人工出價設定中",
    ready_to_merge: "等待合箱",
    pending_review: "待人工審核",
    received: "已收貨",
    ownerless_pool: "無主公海",
    shipped: "已發運"
  };

  return labels[status] ?? status;
}

export async function getMemberProfile(db: D1Database, memberId = "demo-member") {
  try {
    const member = await first<WalletRow>(
      db,
      `SELECT members.id,
              members.display_name,
              members.locale,
              members.level_code,
              wallets.balance_hkd,
              wallets.commission_balance_hkd
         FROM members
         LEFT JOIN wallets ON wallets.member_id = members.id
        WHERE members.id = ?`,
      memberId
    );

    if (!member) {
      return demoMember;
    }

    const tags = await all<{ tag: string }>(db, "SELECT tag FROM member_tags WHERE member_id = ? ORDER BY created_at", memberId);
    const points = await all<PointRow>(
      db,
      "SELECT bucket, COALESCE(SUM(points), 0) AS total FROM points_ledger WHERE member_id = ? GROUP BY bucket",
      memberId
    );
    const preferences = await all<PreferenceRow>(
      db,
      "SELECT channel, enabled FROM notification_preferences WHERE member_id = ?",
      memberId
    );

    return {
      id: member.id,
      displayName: member.display_name,
      locale: member.locale,
      level: member.level_code,
      balanceHkd: member.balance_hkd ?? 0,
      commissionBalanceHkd: member.commission_balance_hkd ?? 0,
      points: {
        procurement: points.find((point) => point.bucket === "procurement")?.total ?? 0,
        logistics: points.find((point) => point.bucket === "logistics")?.total ?? 0
      },
      tags: tags.map((tag) => tag.tag),
      preferences: {
        email: preferences.find((preference) => preference.channel === "email")?.enabled === 1,
        whatsapp: preferences.find((preference) => preference.channel === "whatsapp")?.enabled === 1
      }
    };
  } catch {
    return demoMember;
  }
}

export async function getMemberOrders(db: D1Database, memberId = "demo-member"): Promise<MemberOrder[]> {
  try {
    const procurement = await all<ProcurementRow>(
      db,
      `SELECT id, platform, status, item_amount_jpy, local_shipping_jpy, service_fee_hkd, remarks, updated_at
         FROM procurement_orders
        WHERE member_id = ?
        ORDER BY updated_at DESC
        LIMIT 10`,
      memberId
    );
    const auctions = await all<AuctionRow>(
      db,
      `SELECT id, platform, status, max_bid_jpy, authorization_limit_jpy, updated_at
         FROM auction_orders
        WHERE member_id = ?
        ORDER BY updated_at DESC
        LIMIT 10`,
      memberId
    );
    const packages = await all<PackageRow>(
      db,
      `SELECT inbound_packages.id,
              warehouses.name AS warehouse_name,
              inbound_packages.status,
              inbound_packages.free_storage_until,
              inbound_packages.updated_at
         FROM inbound_packages
         JOIN warehouses ON warehouses.id = inbound_packages.warehouse_id
        WHERE inbound_packages.member_id = ?
        ORDER BY inbound_packages.updated_at DESC
        LIMIT 10`,
      memberId
    );

    const orders: MemberOrder[] = [
      ...procurement.map((order) => ({
        id: order.id,
        type: "代購",
        platform: order.platform,
        status: statusLabel(order.status),
        amountJpy: order.item_amount_jpy ?? undefined,
        localShippingJpy: order.local_shipping_jpy === null ? "待確認" : String(order.local_shipping_jpy),
        serviceFeeHkd: order.service_fee_hkd,
        remarks: order.remarks ?? undefined,
        updatedAt: order.updated_at
      })),
      ...auctions.map((order) => ({
        id: order.id,
        type: "代拍",
        platform: order.platform,
        status: statusLabel(order.status),
        maxBidJpy: order.max_bid_jpy,
        authorizationLimitJpy: order.authorization_limit_jpy,
        updatedAt: order.updated_at
      })),
      ...packages.map((item) => ({
        id: item.id,
        type: "集運",
        warehouse: item.warehouse_name,
        status: statusLabel(item.status),
        storageFreeUntil: item.free_storage_until ?? undefined,
        directDispatchCandidate: item.status === "direct_dispatch",
        updatedAt: item.updated_at
      }))
    ].sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));

    return orders.length > 0 ? orders : demoOrders;
  } catch {
    return demoOrders;
  }
}

export async function getAdminSummary(db: D1Database) {
  try {
    return {
      counters: {
        pendingQuotes: await count(db, "SELECT COUNT(*) AS count FROM procurement_orders WHERE status = 'pending_quote'"),
        auctionBids: await count(db, "SELECT COUNT(*) AS count FROM auction_orders WHERE status IN ('manual_bid_setup', 'bidding')"),
        inboundPackages: await count(db, "SELECT COUNT(*) AS count FROM inbound_packages"),
        ownerlessPackages: await count(db, "SELECT COUNT(*) AS count FROM inbound_packages WHERE owner_status = 'ownerless_pool'"),
        refundReviews: await count(db, "SELECT COUNT(*) AS count FROM aftersales_requests WHERE status = 'pending_review'"),
        valueAddedTasks: await count(db, "SELECT COUNT(*) AS count FROM value_added_services WHERE status = 'pending'"),
        bankTransfers: await count(db, "SELECT COUNT(*) AS count FROM payment_requests WHERE method = 'bank_transfer' AND status = 'pending_review'"),
        translationTasks: adminSummary.counters.translationTasks
      },
      operations: adminSummary.operations
    };
  } catch {
    return adminSummary;
  }
}

export async function getOperationalRules(db: D1Database) {
  try {
    const statuses = await all<StatusDefinitionRow>(
      db,
      `SELECT order_type, code, label, sort_order, is_terminal
         FROM order_status_definitions
        ORDER BY order_type, sort_order`
    );
    const packageIdentifiers = await all<PackageIdentifierRow>(
      db,
      `SELECT identifier_type, identifier_value
         FROM package_identifiers
        WHERE package_id = ?
        ORDER BY identifier_type`,
      "DP-PK-10003"
    );
    const localShippingRules = await all<LocalShippingRuleRow>(
      db,
      `SELECT code, label, debt_behavior, enabled
         FROM local_shipping_charge_rules
        ORDER BY rowid`
    );
    const consolidationRules = await all<ConsolidationOptionRow>(
      db,
      `SELECT code, label, fee_type, enabled
         FROM consolidation_option_definitions
        ORDER BY rowid`
    );
    const logisticsChannels = await all<LogisticsChannelRow>(
      db,
      `SELECT code,
              name,
              destination_region,
              transport_mode,
              billing_method,
              restricted_items_json,
              transit_time_note,
              weight_limit_gram,
              volumetric_formula,
              enabled
         FROM logistics_channel_configs
        ORDER BY rowid`
    );
    const debitRule = await first<AutoDebitRuleRow>(
      db,
      `SELECT balance_limit_hkd, reconfirm_over_hkd, credit_allowed, insufficient_balance_action
         FROM auto_debit_rules
        WHERE enabled = 1
        ORDER BY updated_at DESC
        LIMIT 1`
    );

    return {
      workflowStates: statuses.reduce<Record<string, Array<{ code: string; label: string; terminal: boolean }>>>(
        (groups, status) => {
          groups[status.order_type] ??= [];
          groups[status.order_type].push({
            code: status.code,
            label: status.label,
            terminal: status.is_terminal === 1
          });
          return groups;
        },
        {}
      ),
      packageNumberRules: packageIdentifiers.length
        ? packageIdentifiers.map((identifier) => ({
            code: identifier.identifier_type,
            label: identifier.identifier_type,
            example: identifier.identifier_value
          }))
        : packageNumberRules,
      localShippingFeeRules: localShippingRules.length
        ? localShippingRules.map((rule) => ({
            code: rule.code,
            label: rule.label,
            behavior: rule.debt_behavior,
            enabled: rule.enabled === 1
          }))
        : localShippingFeeRules,
      consolidationOptions: consolidationRules.length
        ? consolidationRules.map((option) => ({
            code: option.code,
            label: option.label,
            feeType: option.fee_type,
            enabled: option.enabled === 1
          }))
        : consolidationOptions,
      logisticsChannelTemplates: logisticsChannels.length
        ? logisticsChannels.map((line) => ({
            code: line.code,
            name: line.name,
            destination: line.destination_region,
            mode: line.transport_mode,
            billingMethod: line.billing_method,
            restrictedItems: JSON.parse(line.restricted_items_json) as string[],
            transitTimeNote: line.transit_time_note,
            weightLimitGram: line.weight_limit_gram,
            volumetricFormula: line.volumetric_formula,
            enabled: line.enabled === 1
          }))
        : logisticsChannelTemplates,
      autoDebitPolicy: debitRule
        ? {
            balanceLimitHkd: debitRule.balance_limit_hkd,
            reconfirmOverHkd: debitRule.reconfirm_over_hkd,
            creditAllowed: debitRule.credit_allowed === 1,
            insufficientBalanceAction: debitRule.insufficient_balance_action
          }
        : autoDebitPolicy,
      supportTicketTypes,
      warehouseScanSteps,
      financeLedgerBuckets,
      seoFields
    };
  } catch {
    return {
      workflowStates,
      packageNumberRules,
      localShippingFeeRules,
      consolidationOptions,
      logisticsChannelTemplates,
      autoDebitPolicy,
      supportTicketTypes,
      warehouseScanSteps,
      financeLedgerBuckets,
      seoFields
    };
  }
}

export async function getAdminWorkQueue(db: D1Database) {
  try {
    const tickets = await all<SupportTicketRow>(
      db,
      `SELECT id, ticket_type, status, priority, subject, related_type, related_id, updated_at
         FROM support_tickets
        ORDER BY updated_at DESC
        LIMIT 10`
    );
    const scans = await all<WarehouseScanRow>(
      db,
      `SELECT id, package_id, scan_step, scanned_code, location, created_at
         FROM warehouse_scan_events
        ORDER BY created_at DESC
        LIMIT 10`
    );
    const ledger = await all<FinancialLedgerRow>(
      db,
      `SELECT id, bucket, direction, amount_hkd, amount_jpy, source_type, source_id, created_at
         FROM financial_ledger_entries
        ORDER BY created_at DESC
        LIMIT 10`
    );
    const seo = await all<SeoEntryRow>(
      db,
      `SELECT entity_type, entity_id, locale, title, meta_description, url_slug, sitemap_enabled, robots_directive
         FROM seo_entries
        ORDER BY updated_at DESC
        LIMIT 10`
    );

    return {
      tickets: tickets.map((ticket) => ({
        id: ticket.id,
        type: ticket.ticket_type,
        status: ticket.status,
        priority: ticket.priority,
        subject: ticket.subject,
        related: ticket.related_type && ticket.related_id ? `${ticket.related_type}:${ticket.related_id}` : null,
        updatedAt: ticket.updated_at
      })),
      scans: scans.map((scan) => ({
        id: scan.id,
        packageId: scan.package_id,
        step: scan.scan_step,
        code: scan.scanned_code,
        location: scan.location,
        createdAt: scan.created_at
      })),
      ledger: ledger.map((entry) => ({
        id: entry.id,
        bucket: entry.bucket,
        direction: entry.direction,
        amountHkd: entry.amount_hkd,
        amountJpy: entry.amount_jpy,
        source: `${entry.source_type}:${entry.source_id}`,
        createdAt: entry.created_at
      })),
      seo: seo.map((entry) => ({
        entityType: entry.entity_type,
        entityId: entry.entity_id,
        locale: entry.locale,
        title: entry.title,
        metaDescription: entry.meta_description,
        urlSlug: entry.url_slug,
        sitemapEnabled: entry.sitemap_enabled === 1,
        robotsDirective: entry.robots_directive
      }))
    };
  } catch {
    return {
      tickets: [],
      scans: [],
      ledger: [],
      seo: []
    };
  }
}

export async function createProcurementOrder(
  db: D1Database,
  input: CreateProcurementInput,
  memberId = "demo-member"
) {
  const id = createId("DP-PO");
  const quantity = Math.max(1, Math.trunc(input.quantity || 1));

  await run(
    db,
    `INSERT INTO procurement_orders (
      id, member_id, platform, product_url, title, quantity, status, remarks
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    id,
    memberId,
    input.platform,
    input.productUrl,
    input.title,
    quantity,
    "pending_quote",
    input.remarks ?? null
  );
  await writeAuditLog(db, "member", memberId, "procurement_order.create", "procurement_order", id, {
    platform: input.platform,
    quantity
  });

  return {
    id,
    status: "pending_quote"
  };
}

export async function createPaymentRequest(
  db: D1Database,
  input: CreatePaymentRequestInput,
  memberId = "demo-member"
) {
  const id = createId("pay");
  const amountHkd = Math.trunc(input.amountHkd);

  await run(
    db,
    `INSERT INTO payment_requests (id, member_id, method, amount_hkd, status, proof_url)
     VALUES (?, ?, ?, ?, ?, ?)`,
    id,
    memberId,
    "bank_transfer",
    amountHkd,
    "pending_review",
    input.proofUrl ?? null
  );
  await writeAuditLog(db, "member", memberId, "payment_request.create", "payment_request", id, {
    method: "bank_transfer",
    amountHkd
  });

  return {
    id,
    status: "pending_review"
  };
}

export async function createSupportTicket(
  db: D1Database,
  input: CreateSupportTicketInput,
  memberId = "demo-member"
) {
  const id = createId("ticket");

  await run(
    db,
    `INSERT INTO support_tickets (
      id, member_id, ticket_type, related_type, related_id, status, priority, subject, description
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    id,
    memberId,
    input.ticketType,
    input.relatedType ?? null,
    input.relatedId ?? null,
    "open",
    input.priority ?? "normal",
    input.subject,
    input.description
  );
  await writeAuditLog(db, "member", memberId, "support_ticket.create", "support_ticket", id, {
    ticketType: input.ticketType,
    relatedType: input.relatedType ?? null,
    relatedId: input.relatedId ?? null
  });

  return {
    id,
    status: "open"
  };
}
