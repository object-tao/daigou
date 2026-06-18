import {
  adminSummary,
  autoDebitPolicy,
  cartonTypeTemplates,
  consolidationOptions,
  confirmedBusinessRules,
  demoMember,
  demoOrders,
  financeLedgerBuckets,
  localShippingFeeRules,
  logisticsChannelTemplates,
  packageNumberRules,
  seoFields,
  serviceFeeRuleTemplates,
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

type ProcurementPaymentRow = {
  id: string;
  member_id: string;
  status: string;
  item_amount_jpy: number | null;
  local_shipping_jpy: number | null;
  service_fee_hkd: number | null;
  balance_hkd: number | null;
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

type BusinessRuleSettingRow = {
  namespace: string;
  rule_key: string;
  value_json: string;
  description: string | null;
};

type ServiceFeeRuleRow = {
  service_type: string;
  fee_type: string;
  rate_percent: number | null;
  fixed_fee_hkd: number | null;
  currency: string;
  enabled: number;
};

type CartonTypeRow = {
  code: string;
  name: string;
  fixed_fee_hkd: number;
  enabled: number;
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

type ShipmentRow = {
  id: string;
  member_id: string;
  line_code: string;
  status: string;
  carton_fee_hkd: number;
  freight_fee_hkd: number | null;
  tracking_no: string | null;
  updated_at: string;
  package_count: number;
};

type TrackingEventRow = {
  id: string;
  shipment_id: string;
  status: string;
  location: string | null;
  description: string;
  occurred_at: string;
};

type PaymentRequestRow = {
  id: string;
  member_id: string;
  amount_hkd: number;
  status: string;
};

type WalletBalanceRow = {
  balance_hkd: number;
};

type ExchangeRateRow = {
  rate: number;
};

type AuthCredentialRow = {
  actor_type: "member" | "staff";
  actor_id: string;
  email: string;
  password_salt: string;
  password_hash: string;
  status: string;
  role_name: string | null;
  display_name: string | null;
};

type AuthSessionRow = {
  id: string;
  actor_type: "member" | "staff";
  actor_id: string;
  role_name: string | null;
  expires_at: string;
};

type AdminPermissionRow = {
  module_key: string;
  can_read: number;
  can_write: number;
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

export type QuoteProcurementInput = {
  itemAmountJpy: number;
  localShippingJpy?: number | null;
  serviceFeeHkd?: number | null;
  remarks?: string;
};

export type MarkProcurementPurchasedInput = {
  japanTrackingNo?: string;
  warehouseId?: string;
  remarks?: string;
};

export type ReceiveInboundPackageInput = {
  memberId?: string;
  warehouseId?: string;
  trackingNo?: string;
  weightGram?: number | null;
  volumeCm3?: number | null;
};

export type CreateShipmentInput = {
  packageIds: string[];
  lineCode: string;
  cartonFeeHkd: number;
  freightFeeHkd?: number | null;
};

export type CreateTrackingEventInput = {
  status: string;
  location?: string;
  description: string;
  occurredAt?: string;
  trackingNo?: string;
};

export type ActorSession = {
  id: string;
  actorType: "member" | "staff";
  actorId: string;
  roleName: string | null;
  expiresAt: string;
};

export type RegisterMemberInput = {
  email: string;
  password: string;
  displayName?: string;
  locale?: string;
};

export type LoginInput = {
  email: string;
  password: string;
  actorType?: "member" | "staff";
};

export type AuctionOrderInput = {
  lotUrl: string;
  title: string;
  maxBidJpy: number;
  authorizationLimitJpy: number;
};

export type CartItemInput = {
  platform: string;
  productUrl: string;
  title: string;
  quantity: number;
  remarks?: string;
};

export type ValueAddedRequestInput = {
  packageId: string;
  serviceType: string;
};

export type FreightQuoteInput = {
  actualWeightGram: number;
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  ratePerKgHkd: number;
};

export type AftersalesInput = {
  orderType: string;
  orderId: string;
  requestType: string;
  reason: string;
};

export type TranslationInput = {
  namespace: string;
  translationKey: string;
  locale: string;
  value: string;
};

export type SeoInput = {
  entityType: string;
  entityId: string;
  locale: string;
  title: string;
  metaDescription?: string;
  urlSlug: string;
  robotsDirective?: string;
};

export type AttachmentInput = {
  ownerType: string;
  ownerId: string;
  fileName: string;
  contentType?: string;
  publicUrl?: string;
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

async function sha256Hex(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(hash)].map((item) => item.toString(16).padStart(2, "0")).join("");
}

function parseJsonValue(value: string): unknown {
  try {
    return JSON.parse(value) as unknown;
  } catch {
    return value;
  }
}

function dateAfterDays(days: number): string {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function shipmentStatusFromTrackingEvent(status: string): string {
  const statuses: Record<string, string> = {
    packed: "packing",
    outbound: "outbound",
    departed_by_air_or_sea: "in_transit",
    arrived_port: "in_transit",
    customs_clearance: "in_transit",
    delivery: "in_transit",
    signed: "signed"
  };

  return statuses[status] ?? "in_transit";
}

async function getExchangeRate(db: D1Database, sourceCurrency: string, targetCurrency: string): Promise<number> {
  const row = await first<ExchangeRateRow>(
    db,
    `SELECT rate
       FROM exchange_rates
      WHERE source_currency = ? AND target_currency = ?
      ORDER BY effective_from DESC, created_at DESC
      LIMIT 1`,
    sourceCurrency,
    targetCurrency
  );

  return Number(row?.rate ?? 0.055);
}

async function ensureWallet(db: D1Database, memberId: string): Promise<WalletBalanceRow> {
  const wallet = await first<WalletBalanceRow>(
    db,
    "SELECT balance_hkd FROM wallets WHERE member_id = ?",
    memberId
  );

  if (wallet) {
    return wallet;
  }

  await run(
    db,
    "INSERT INTO wallets (id, member_id, balance_hkd, commission_balance_hkd) VALUES (?, ?, ?, ?)",
    createId("wallet"),
    memberId,
    0,
    0
  );

  return { balance_hkd: 0 };
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
    const businessRules = await all<BusinessRuleSettingRow>(
      db,
      `SELECT namespace, rule_key, value_json, description
         FROM business_rule_settings
        ORDER BY namespace, rule_key`
    );
    const serviceFeeRules = await all<ServiceFeeRuleRow>(
      db,
      `SELECT service_type, fee_type, rate_percent, fixed_fee_hkd, currency, enabled
         FROM service_fee_rules
        ORDER BY service_type, fee_type`
    );
    const cartonTypes = await all<CartonTypeRow>(
      db,
      `SELECT code, name, fixed_fee_hkd, enabled
         FROM carton_types
        ORDER BY code`
    );

    return {
      confirmedBusinessRules: businessRules.length
        ? businessRules.reduce<Record<string, Record<string, unknown>>>((groups, rule) => {
            groups[rule.namespace] ??= {};
            groups[rule.namespace][rule.rule_key] = parseJsonValue(rule.value_json);
            return groups;
          }, {})
        : confirmedBusinessRules,
      serviceFeeRules: serviceFeeRules.length
        ? serviceFeeRules.map((rule) => ({
            serviceType: rule.service_type,
            feeType: rule.fee_type,
            ratePercent: rule.rate_percent,
            fixedFeeHkd: rule.fixed_fee_hkd,
            currency: rule.currency,
            enabled: rule.enabled === 1
          }))
        : serviceFeeRuleTemplates,
      cartonTypes: cartonTypes.length
        ? cartonTypes.map((carton) => ({
            code: carton.code,
            name: carton.name,
            fixedFeeHkd: carton.fixed_fee_hkd,
            enabled: carton.enabled === 1
          }))
        : cartonTypeTemplates,
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
      confirmedBusinessRules,
      serviceFeeRules: serviceFeeRuleTemplates,
      cartonTypes: cartonTypeTemplates,
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
    const shipments = await all<ShipmentRow>(
      db,
      `SELECT shipments.id,
              shipments.member_id,
              shipments.line_code,
              shipments.status,
              shipments.carton_fee_hkd,
              shipments.freight_fee_hkd,
              shipments.tracking_no,
              shipments.updated_at,
              COUNT(shipment_packages.package_id) AS package_count
         FROM shipments
         LEFT JOIN shipment_packages ON shipment_packages.shipment_id = shipments.id
        GROUP BY shipments.id
        ORDER BY shipments.updated_at DESC
        LIMIT 10`
    );
    const trackingEvents = await all<TrackingEventRow>(
      db,
      `SELECT id, shipment_id, status, location, description, occurred_at
         FROM logistics_tracking_events
        ORDER BY occurred_at DESC
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
      })),
      shipments: shipments.map((shipment) => ({
        id: shipment.id,
        memberId: shipment.member_id,
        lineCode: shipment.line_code,
        status: shipment.status,
        cartonFeeHkd: shipment.carton_fee_hkd,
        freightFeeHkd: shipment.freight_fee_hkd,
        trackingNo: shipment.tracking_no,
        packageCount: shipment.package_count,
        updatedAt: shipment.updated_at
      })),
      trackingEvents: trackingEvents.map((event) => ({
        id: event.id,
        shipmentId: event.shipment_id,
        status: event.status,
        location: event.location,
        description: event.description,
        occurredAt: event.occurred_at
      }))
    };
  } catch {
    return {
      tickets: [],
      scans: [],
      ledger: [],
      seo: [],
      shipments: [],
      trackingEvents: []
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

export async function receiveInboundPackage(
  db: D1Database,
  input: ReceiveInboundPackageInput,
  staffId = "staff-admin-demo"
) {
  const id = createId("DP-PK");
  const memberId = input.memberId?.trim() || null;
  const warehouseId = input.warehouseId?.trim() || "warehouse-funabashi";
  const trackingNo = input.trackingNo?.trim() || null;
  const ownerStatus = memberId ? "identified" : "ownerless_pool";
  const freeStorageUntil = memberId ? dateAfterDays(30) : null;

  await run(
    db,
    `INSERT INTO inbound_packages (
      id, member_id, warehouse_id, tracking_no, status, owner_status, weight_gram, volume_cm3, free_storage_until
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    id,
    memberId,
    warehouseId,
    trackingNo,
    "received",
    ownerStatus,
    input.weightGram === null || input.weightGram === undefined ? null : Math.trunc(input.weightGram),
    input.volumeCm3 === null || input.volumeCm3 === undefined ? null : Math.trunc(input.volumeCm3),
    freeStorageUntil
  );

  await run(
    db,
    `INSERT INTO warehouse_scan_events (id, package_id, scan_step, scanned_code, staff_id, location)
     VALUES (?, ?, ?, ?, ?, ?)`,
    createId("scan"),
    id,
    "inbound_scan",
    trackingNo ?? id,
    staffId,
    warehouseId
  );

  await run(
    db,
    `INSERT OR IGNORE INTO package_identifiers (id, package_id, identifier_type, identifier_value)
     VALUES (?, ?, ?, ?)`,
    createId("pkgid"),
    id,
    "warehouse_inbound_no",
    id
  );

  if (trackingNo) {
    await run(
      db,
      `INSERT OR IGNORE INTO package_identifiers (id, package_id, identifier_type, identifier_value)
       VALUES (?, ?, ?, ?)`,
      createId("pkgid"),
      id,
      "japan_tracking_no",
      trackingNo
    );
  }

  await writeAuditLog(db, "staff", staffId, "inbound_package.receive", "inbound_package", id, {
    memberId,
    warehouseId,
    ownerStatus,
    trackingNo
  });

  return {
    id,
    status: "received",
    ownerStatus,
    freeStorageUntil
  };
}

export async function createShipmentFromPackages(
  db: D1Database,
  input: CreateShipmentInput,
  staffId = "staff-admin-demo"
) {
  const packageIds = [...new Set(input.packageIds.map((id) => id.trim()).filter(Boolean))];

  if (packageIds.length === 0) {
    throw new Error("At least one package is required");
  }

  const placeholders = packageIds.map(() => "?").join(", ");
  const packages = await all<{ id: string; member_id: string | null; status: string }>(
    db,
    `SELECT id, member_id, status FROM inbound_packages WHERE id IN (${placeholders})`,
    ...packageIds
  );

  if (packages.length !== packageIds.length) {
    throw new Error("One or more packages were not found");
  }

  const memberIds = [...new Set(packages.map((item) => item.member_id).filter(Boolean))];

  if (memberIds.length !== 1) {
    throw new Error("Packages must be identified and belong to one member");
  }

  const existingLinks = await all<{ package_id: string; shipment_id: string }>(
    db,
    `SELECT package_id, shipment_id FROM shipment_packages WHERE package_id IN (${placeholders})`,
    ...packageIds
  );

  if (existingLinks.length > 0) {
    throw new Error(`Package already belongs to shipment ${existingLinks[0].shipment_id}`);
  }

  const shipmentId = createId("DP-SH");
  const cartonFeeHkd = Math.max(0, Math.trunc(input.cartonFeeHkd || 0));
  const freightFeeHkd = input.freightFeeHkd === null || input.freightFeeHkd === undefined
    ? null
    : Math.max(0, Math.trunc(input.freightFeeHkd));

  await run(
    db,
    `INSERT INTO shipments (id, member_id, line_code, status, carton_fee_hkd, freight_fee_hkd)
     VALUES (?, ?, ?, ?, ?, ?)`,
    shipmentId,
    memberIds[0],
    input.lineCode,
    "packing",
    cartonFeeHkd,
    freightFeeHkd
  );

  for (const packageId of packageIds) {
    await run(
      db,
      `INSERT INTO shipment_packages (id, shipment_id, package_id, added_by)
       VALUES (?, ?, ?, ?)`,
      createId("ship-pkg"),
      shipmentId,
      packageId,
      staffId
    );
  }

  await run(
    db,
    `UPDATE inbound_packages
        SET status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id IN (${placeholders})`,
    "packing",
    ...packageIds
  );

  await run(
    db,
    `INSERT INTO logistics_tracking_events (id, shipment_id, status, location, description, occurred_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
    createId("track"),
    shipmentId,
    "packed",
    "Funabashi warehouse",
    "Shipment created from consolidated packages.",
    new Date().toISOString()
  );

  await writeAuditLog(db, "staff", staffId, "shipment.create_from_packages", "shipment", shipmentId, {
    packageIds,
    lineCode: input.lineCode,
    cartonFeeHkd,
    freightFeeHkd
  });

  return {
    id: shipmentId,
    status: "packing",
    packageCount: packageIds.length
  };
}

export async function addShipmentTrackingEvent(
  db: D1Database,
  shipmentId: string,
  input: CreateTrackingEventInput,
  staffId = "staff-admin-demo"
) {
  const shipment = await first<{ id: string; status: string }>(
    db,
    "SELECT id, status FROM shipments WHERE id = ?",
    shipmentId
  );

  if (!shipment) {
    throw new Error("Shipment not found");
  }

  const eventId = createId("track");
  const nextShipmentStatus = shipmentStatusFromTrackingEvent(input.status);
  const occurredAt = input.occurredAt?.trim() || new Date().toISOString();

  await run(
    db,
    `INSERT INTO logistics_tracking_events (id, shipment_id, status, location, description, occurred_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
    eventId,
    shipmentId,
    input.status,
    input.location?.trim() || null,
    input.description,
    occurredAt
  );

  await run(
    db,
    `UPDATE shipments
        SET status = ?,
            tracking_no = COALESCE(?, tracking_no),
            updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`,
    nextShipmentStatus,
    input.trackingNo?.trim() || null,
    shipmentId
  );

  await writeAuditLog(db, "staff", staffId, "shipment.tracking_event.add", "shipment", shipmentId, {
    eventId,
    previousStatus: shipment.status,
    nextStatus: nextShipmentStatus,
    trackingEventStatus: input.status
  });

  return {
    id: eventId,
    shipmentId,
    shipmentStatus: nextShipmentStatus
  };
}

export async function quoteProcurementOrder(
  db: D1Database,
  orderId: string,
  input: QuoteProcurementInput,
  staffId = "staff-admin-demo"
) {
  const order = await first<{ id: string; member_id: string; status: string }>(
    db,
    "SELECT id, member_id, status FROM procurement_orders WHERE id = ?",
    orderId
  );

  if (!order) {
    throw new Error("Procurement order not found");
  }

  const itemAmountJpy = Math.trunc(input.itemAmountJpy);
  const localShippingJpy = input.localShippingJpy === null || input.localShippingJpy === undefined
    ? null
    : Math.trunc(input.localShippingJpy);
  const serviceFeeHkd = input.serviceFeeHkd === null || input.serviceFeeHkd === undefined
    ? null
    : Math.trunc(input.serviceFeeHkd);

  await run(
    db,
    `UPDATE procurement_orders
        SET item_amount_jpy = ?,
            local_shipping_jpy = ?,
            service_fee_hkd = ?,
            status = ?,
            remarks = COALESCE(?, remarks),
            updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`,
    itemAmountJpy,
    localShippingJpy,
    serviceFeeHkd,
    "pending_payment",
    input.remarks ?? null,
    orderId
  );
  await writeAuditLog(db, "staff", staffId, "procurement_order.quote", "procurement_order", orderId, {
    previousStatus: order.status,
    nextStatus: "pending_payment",
    itemAmountJpy,
    localShippingJpy,
    serviceFeeHkd
  });

  return {
    id: orderId,
    status: "pending_payment"
  };
}

export async function payProcurementOrder(
  db: D1Database,
  orderId: string,
  memberId = "demo-member"
) {
  const order = await first<ProcurementPaymentRow>(
    db,
    `SELECT procurement_orders.id,
            procurement_orders.member_id,
            procurement_orders.status,
            procurement_orders.item_amount_jpy,
            procurement_orders.local_shipping_jpy,
            procurement_orders.service_fee_hkd,
            wallets.balance_hkd
       FROM procurement_orders
       LEFT JOIN wallets ON wallets.member_id = procurement_orders.member_id
      WHERE procurement_orders.id = ? AND procurement_orders.member_id = ?`,
    orderId,
    memberId
  );

  if (!order) {
    throw new Error("Procurement order not found");
  }

  if (order.status !== "pending_payment") {
    throw new Error("Procurement order is not pending payment");
  }

  if (order.item_amount_jpy === null) {
    throw new Error("Procurement order has not been quoted");
  }

  const exchangeRate = await getExchangeRate(db, "JPY", "HKD");
  const itemAmountJpy = order.item_amount_jpy ?? 0;
  const localShippingJpy = order.local_shipping_jpy ?? 0;
  const serviceFeeHkd = order.service_fee_hkd ?? 0;
  const jpySubtotal = itemAmountJpy + localShippingJpy;
  const convertedHkd = Math.ceil(jpySubtotal * exchangeRate);
  const payableHkd = convertedHkd + serviceFeeHkd;
  const wallet = await ensureWallet(db, memberId);

  if (wallet.balance_hkd < payableHkd) {
    throw new Error("Insufficient wallet balance");
  }

  const balanceAfterHkd = wallet.balance_hkd - payableHkd;

  await run(
    db,
    "UPDATE wallets SET balance_hkd = ?, updated_at = CURRENT_TIMESTAMP WHERE member_id = ?",
    balanceAfterHkd,
    memberId
  );
  await run(
    db,
    `UPDATE procurement_orders
        SET status = ?,
            updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`,
    "pending_purchase",
    orderId
  );
  await run(
    db,
    `INSERT INTO financial_ledger_entries (
      id, member_id, bucket, direction, amount_hkd, amount_jpy, source_type, source_id, balance_after_hkd, note
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    createId("ledger"),
    memberId,
    "代購消費",
    "debit",
    payableHkd,
    jpySubtotal,
    "procurement_order",
    orderId,
    balanceAfterHkd,
    `Procurement payment at JPY/HKD ${exchangeRate}`
  );
  await writeAuditLog(db, "member", memberId, "procurement_order.pay", "procurement_order", orderId, {
    previousStatus: order.status,
    nextStatus: "pending_purchase",
    itemAmountJpy,
    localShippingJpy,
    serviceFeeHkd,
    exchangeRate,
    payableHkd,
    balanceAfterHkd
  });

  return {
    id: orderId,
    status: "pending_purchase",
    payableHkd,
    balanceAfterHkd,
    exchangeRate
  };
}

export async function markProcurementPurchased(
  db: D1Database,
  orderId: string,
  input: MarkProcurementPurchasedInput,
  staffId = "staff-admin-demo"
) {
  const order = await first<{ id: string; member_id: string; status: string; title: string }>(
    db,
    "SELECT id, member_id, status, title FROM procurement_orders WHERE id = ?",
    orderId
  );

  if (!order) {
    throw new Error("Procurement order not found");
  }

  if (!["pending_purchase", "purchasing"].includes(order.status)) {
    throw new Error("Procurement order is not ready to mark purchased");
  }

  const packageId = createId("DP-PK");
  const warehouseId = input.warehouseId?.trim() || "warehouse-funabashi";
  const japanTrackingNo = input.japanTrackingNo?.trim() || null;

  await run(
    db,
    `UPDATE procurement_orders
        SET status = ?,
            remarks = COALESCE(?, remarks),
            updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`,
    "purchased",
    input.remarks?.trim() || null,
    orderId
  );
  await run(
    db,
    `INSERT INTO inbound_packages (
      id, member_id, warehouse_id, tracking_no, status, owner_status, free_storage_until
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    packageId,
    order.member_id,
    warehouseId,
    japanTrackingNo,
    "pending_inbound",
    "identified",
    dateAfterDays(30)
  );
  await run(
    db,
    `INSERT INTO procurement_order_packages (id, procurement_order_id, package_id)
     VALUES (?, ?, ?)`,
    createId("po-pkg"),
    orderId,
    packageId
  );
  await run(
    db,
    `INSERT OR IGNORE INTO package_identifiers (id, package_id, identifier_type, identifier_value)
     VALUES (?, ?, ?, ?)`,
    createId("pkgid"),
    packageId,
    "member_package_no",
    packageId
  );
  await run(
    db,
    `INSERT OR IGNORE INTO package_identifiers (id, package_id, identifier_type, identifier_value)
     VALUES (?, ?, ?, ?)`,
    createId("pkgid"),
    packageId,
    "source_order_no",
    orderId
  );

  if (japanTrackingNo) {
    await run(
      db,
      `INSERT OR IGNORE INTO package_identifiers (id, package_id, identifier_type, identifier_value)
       VALUES (?, ?, ?, ?)`,
      createId("pkgid"),
      packageId,
      "japan_tracking_no",
      japanTrackingNo
    );
  }

  await writeAuditLog(db, "staff", staffId, "procurement_order.mark_purchased", "procurement_order", orderId, {
    previousStatus: order.status,
    nextStatus: "purchased",
    packageId,
    warehouseId,
    japanTrackingNo
  });

  return {
    id: orderId,
    status: "purchased",
    packageId,
    packageStatus: "pending_inbound"
  };
}

export async function approvePaymentRequest(
  db: D1Database,
  paymentRequestId: string,
  staffId = "staff-finance-demo"
) {
  const payment = await first<PaymentRequestRow>(
    db,
    "SELECT id, member_id, amount_hkd, status FROM payment_requests WHERE id = ?",
    paymentRequestId
  );

  if (!payment) {
    throw new Error("Payment request not found");
  }

  if (payment.status !== "pending_review") {
    throw new Error("Payment request is not pending review");
  }

  const wallet = await first<WalletBalanceRow>(
    db,
    "SELECT balance_hkd FROM wallets WHERE member_id = ?",
    payment.member_id
  );
  const balanceAfterHkd = Number(wallet?.balance_hkd ?? 0) + payment.amount_hkd;

  if (wallet) {
    await run(
      db,
      "UPDATE wallets SET balance_hkd = ?, updated_at = CURRENT_TIMESTAMP WHERE member_id = ?",
      balanceAfterHkd,
      payment.member_id
    );
  } else {
    await run(
      db,
      "INSERT INTO wallets (id, member_id, balance_hkd, commission_balance_hkd) VALUES (?, ?, ?, ?)",
      createId("wallet"),
      payment.member_id,
      balanceAfterHkd,
      0
    );
  }

  await run(
    db,
    `UPDATE payment_requests
        SET status = ?,
            reviewed_by = ?,
            reviewed_at = CURRENT_TIMESTAMP
      WHERE id = ?`,
    "approved",
    staffId,
    paymentRequestId
  );
  await run(
    db,
    `INSERT INTO financial_ledger_entries (
      id, member_id, bucket, direction, amount_hkd, amount_jpy, source_type, source_id, balance_after_hkd, note
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    createId("ledger"),
    payment.member_id,
    "會員餘額",
    "credit",
    payment.amount_hkd,
    0,
    "payment_request",
    paymentRequestId,
    balanceAfterHkd,
    "銀行轉帳人工審核入帳"
  );
  await writeAuditLog(db, "staff", staffId, "payment_request.approve", "payment_request", paymentRequestId, {
    amountHkd: payment.amount_hkd,
    balanceAfterHkd
  });

  return {
    id: paymentRequestId,
    status: "approved",
    balanceAfterHkd
  };
}

export async function registerMember(db: D1Database, input: RegisterMemberInput) {
  const email = input.email.trim().toLowerCase();
  const existing = await first<{ id: string }>(db, "SELECT id FROM members WHERE email = ?", email);

  if (existing) {
    throw new Error("Email is already registered");
  }

  const memberId = createId("member");
  const salt = createId("salt");
  const passwordHash = await sha256Hex(salt + input.password);

  await run(
    db,
    `INSERT INTO members (id, email, display_name, locale, settlement_currency, level_code, status)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    memberId,
    email,
    input.displayName?.trim() || email,
    input.locale?.trim() || "zh-Hant",
    "HKD",
    "LV1",
    "active"
  );
  await run(
    db,
    "INSERT INTO wallets (id, member_id, balance_hkd, commission_balance_hkd) VALUES (?, ?, ?, ?)",
    createId("wallet"),
    memberId,
    0,
    0
  );
  await run(
    db,
    `INSERT INTO auth_credentials (id, actor_type, actor_id, email, password_salt, password_hash)
     VALUES (?, ?, ?, ?, ?, ?)`,
    createId("cred"),
    "member",
    memberId,
    email,
    salt,
    passwordHash
  );
  await run(
    db,
    `INSERT OR IGNORE INTO notification_preferences (id, member_id, channel, enabled, paid_addon)
     VALUES (?, ?, ?, ?, ?), (?, ?, ?, ?, ?)`,
    createId("notify"),
    memberId,
    "email",
    1,
    0,
    createId("notify"),
    memberId,
    "whatsapp",
    0,
    1
  );
  await writeAuditLog(db, "member", memberId, "member.register", "member", memberId, { email });

  return { id: memberId, email, status: "active" };
}

export async function loginActor(db: D1Database, input: LoginInput): Promise<ActorSession & { displayName: string | null }> {
  const email = input.email.trim().toLowerCase();
  const credential = await first<AuthCredentialRow>(
    db,
    `SELECT auth_credentials.actor_type,
            auth_credentials.actor_id,
            auth_credentials.email,
            auth_credentials.password_salt,
            auth_credentials.password_hash,
            auth_credentials.status,
            roles.name AS role_name,
            COALESCE(members.display_name, staff_users.display_name) AS display_name
       FROM auth_credentials
       LEFT JOIN members ON auth_credentials.actor_type = 'member' AND members.id = auth_credentials.actor_id
       LEFT JOIN staff_users ON auth_credentials.actor_type = 'staff' AND staff_users.id = auth_credentials.actor_id
       LEFT JOIN roles ON staff_users.role_id = roles.id
      WHERE auth_credentials.email = ?
        AND (? IS NULL OR auth_credentials.actor_type = ?)
      LIMIT 1`,
    email,
    input.actorType ?? null,
    input.actorType ?? null
  );

  if (!credential || credential.status !== "active") {
    throw new Error("Invalid email or password");
  }

  const passwordHash = await sha256Hex(credential.password_salt + input.password);

  if (passwordHash !== credential.password_hash) {
    throw new Error("Invalid email or password");
  }

  const sessionId = createId("sess");
  const expires = new Date();
  expires.setUTCDate(expires.getUTCDate() + 14);
  const expiresAt = expires.toISOString();

  await run(
    db,
    `INSERT INTO auth_sessions (id, actor_type, actor_id, role_name, expires_at)
     VALUES (?, ?, ?, ?, ?)`,
    sessionId,
    credential.actor_type,
    credential.actor_id,
    credential.role_name,
    expiresAt
  );
  await writeAuditLog(db, credential.actor_type, credential.actor_id, "auth.login", "auth_session", sessionId, {
    email,
    roleName: credential.role_name
  });

  return {
    id: sessionId,
    actorType: credential.actor_type,
    actorId: credential.actor_id,
    roleName: credential.role_name,
    expiresAt,
    displayName: credential.display_name
  };
}

export async function getSession(db: D1Database, sessionId: string | null): Promise<ActorSession | null> {
  if (!sessionId) {
    return null;
  }

  const row = await first<AuthSessionRow>(
    db,
    "SELECT id, actor_type, actor_id, role_name, expires_at FROM auth_sessions WHERE id = ? AND expires_at > ?",
    sessionId,
    new Date().toISOString()
  );

  if (!row) {
    return null;
  }

  return {
    id: row.id,
    actorType: row.actor_type,
    actorId: row.actor_id,
    roleName: row.role_name,
    expiresAt: row.expires_at
  };
}

export async function logoutSession(db: D1Database, sessionId: string) {
  await run(db, "DELETE FROM auth_sessions WHERE id = ?", sessionId);
  return { ok: true };
}

export async function hasAdminPermission(db: D1Database, roleName: string | null, moduleKey: string, write = false) {
  if (!roleName) {
    return false;
  }

  if (roleName === "super_admin") {
    return true;
  }

  const rows = await all<AdminPermissionRow>(
    db,
    `SELECT module_key, can_read, can_write
       FROM admin_role_permissions
      WHERE role_name = ? AND module_key IN (?, '*')`,
    roleName,
    moduleKey
  );

  return rows.some((row) => (write ? row.can_write === 1 : row.can_read === 1));
}

export async function createAuctionOrder(db: D1Database, input: AuctionOrderInput, memberId = "demo-member") {
  const id = createId("DP-AU");
  await run(
    db,
    `INSERT INTO auction_orders (
      id, member_id, platform, lot_url, title, max_bid_jpy, status, authorization_limit_jpy
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    id,
    memberId,
    "Yahoo! Auctions",
    input.lotUrl,
    input.title,
    Math.trunc(input.maxBidJpy),
    "manual_bid_setup",
    Math.trunc(input.authorizationLimitJpy)
  );
  await writeAuditLog(db, "member", memberId, "auction_order.create", "auction_order", id, input);
  return { id, status: "manual_bid_setup" };
}

export async function resolveAuctionOrder(
  db: D1Database,
  orderId: string,
  result: "won" | "lost",
  winningBidJpy = 0,
  staffId = "staff-admin-demo"
) {
  const order = await first<{ id: string; member_id: string; status: string; title: string; max_bid_jpy: number }>(
    db,
    "SELECT id, member_id, status, title, max_bid_jpy FROM auction_orders WHERE id = ?",
    orderId
  );

  if (!order) {
    throw new Error("Auction order not found");
  }

  if (result === "lost") {
    await run(db, "UPDATE auction_orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?", "lost", orderId);
    await writeAuditLog(db, "staff", staffId, "auction_order.lost", "auction_order", orderId, { refundDestination: "wallet_balance" });
    return { id: orderId, status: "lost", refundDestination: "wallet_balance" };
  }

  const packageId = createId("DP-PK");
  await run(db, "UPDATE auction_orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?", "won", orderId);
  await run(
    db,
    `INSERT INTO inbound_packages (id, member_id, warehouse_id, tracking_no, status, owner_status, free_storage_until)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    packageId,
    order.member_id,
    "warehouse-funabashi",
    null,
    "pending_inbound",
    "identified",
    dateAfterDays(30)
  );
  await run(
    db,
    "INSERT INTO auction_order_packages (id, auction_order_id, package_id) VALUES (?, ?, ?)",
    createId("au-pkg"),
    orderId,
    packageId
  );
  await run(
    db,
    "INSERT OR IGNORE INTO package_identifiers (id, package_id, identifier_type, identifier_value) VALUES (?, ?, ?, ?)",
    createId("pkgid"),
    packageId,
    "source_order_no",
    orderId
  );
  await writeAuditLog(db, "staff", staffId, "auction_order.won", "auction_order", orderId, { winningBidJpy, packageId });
  return { id: orderId, status: "won", packageId };
}

export async function createCartItem(db: D1Database, input: CartItemInput, memberId = "demo-member") {
  const id = createId("cart");
  await run(
    db,
    `INSERT INTO cart_items (id, member_id, platform, product_url, title, quantity, remarks)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    id,
    memberId,
    input.platform,
    input.productUrl,
    input.title,
    Math.max(1, Math.trunc(input.quantity || 1)),
    input.remarks ?? null
  );
  return { id, status: "active" };
}

export async function checkoutCart(db: D1Database, memberId = "demo-member") {
  const items = await all<{ id: string; platform: string; product_url: string; title: string; quantity: number; remarks: string | null }>(
    db,
    "SELECT id, platform, product_url, title, quantity, remarks FROM cart_items WHERE member_id = ? ORDER BY created_at",
    memberId
  );

  if (!items.length) {
    throw new Error("Cart is empty");
  }

  const orderIds: string[] = [];
  for (const item of items) {
    const order = await createProcurementOrder(
      db,
      {
        platform: item.platform,
        productUrl: item.product_url,
        title: item.title,
        quantity: item.quantity,
        remarks: item.remarks ?? undefined
      },
      memberId
    );
    orderIds.push(order.id);
  }
  await run(db, "DELETE FROM cart_items WHERE member_id = ?", memberId);
  return { orderIds, count: orderIds.length };
}

export async function listMemberGrowth(db: D1Database, memberId = "demo-member") {
  const levels = await all<{ code: string; name: string; rank: number; upgrade_rule_json: string; benefit_json: string }>(
    db,
    "SELECT code, name, rank, upgrade_rule_json, benefit_json FROM member_levels ORDER BY rank"
  );
  const totals = await first<{ spend_hkd: number; freight_hkd: number; topup_hkd: number; orders_count: number }>(
    db,
    `SELECT
       COALESCE(SUM(CASE WHEN bucket LIKE '%代購%' OR bucket LIKE '%Procurement%' THEN amount_hkd ELSE 0 END), 0) AS spend_hkd,
       COALESCE(SUM(CASE WHEN bucket LIKE '%運費%' OR bucket LIKE '%freight%' THEN amount_hkd ELSE 0 END), 0) AS freight_hkd,
       COALESCE(SUM(CASE WHEN source_type = 'payment_request' AND direction = 'credit' THEN amount_hkd ELSE 0 END), 0) AS topup_hkd,
       (SELECT COUNT(*) FROM procurement_orders WHERE member_id = ?) AS orders_count
     FROM financial_ledger_entries
     WHERE member_id = ?`,
    memberId,
    memberId
  );
  const points = await all<PointRow>(
    db,
    "SELECT bucket, COALESCE(SUM(points), 0) AS total FROM points_ledger WHERE member_id = ? GROUP BY bucket",
    memberId
  );
  const commissions = await all<{ total: number }>(
    db,
    "SELECT COALESCE(SUM(commission_hkd), 0) AS total FROM commission_ledger WHERE member_id = ?",
    memberId
  );

  return {
    levels,
    totals: {
      cumulativeSpendHkd: totals?.spend_hkd ?? 0,
      cumulativeFreightHkd: totals?.freight_hkd ?? 0,
      topUpHkd: totals?.topup_hkd ?? 0,
      orderCount: totals?.orders_count ?? 0
    },
    points: {
      procurement: points.find((point) => point.bucket === "procurement")?.total ?? 0,
      logistics: points.find((point) => point.bucket === "logistics")?.total ?? 0
    },
    commissionHkd: commissions[0]?.total ?? 0
  };
}

export async function requestValueAddedService(
  db: D1Database,
  input: ValueAddedRequestInput,
  memberId = "demo-member"
) {
  const pkg = await first<{ id: string; member_id: string | null }>(
    db,
    "SELECT id, member_id FROM inbound_packages WHERE id = ?",
    input.packageId
  );

  if (!pkg || pkg.member_id !== memberId) {
    throw new Error("Package not found");
  }

  const fee = await first<{ fixed_fee_hkd: number | null }>(
    db,
    "SELECT fixed_fee_hkd FROM service_fee_rules WHERE service_type = ? AND enabled = 1 ORDER BY fixed_fee_hkd DESC LIMIT 1",
    input.serviceType
  );
  const id = createId("vas");
  await run(
    db,
    "INSERT INTO value_added_services (id, package_id, service_type, status, fee_hkd) VALUES (?, ?, ?, ?, ?)",
    id,
    input.packageId,
    input.serviceType,
    "pending",
    fee?.fixed_fee_hkd ?? 0
  );
  await writeAuditLog(db, "member", memberId, "value_added_service.request", "value_added_service", id, input);
  return { id, status: "pending", feeHkd: fee?.fixed_fee_hkd ?? 0 };
}

export async function quoteShipmentFreight(db: D1Database, shipmentId: string, input: FreightQuoteInput, staffId = "staff-warehouse-demo") {
  const shipment = await first<{ id: string; member_id: string }>(db, "SELECT id, member_id FROM shipments WHERE id = ?", shipmentId);

  if (!shipment) {
    throw new Error("Shipment not found");
  }

  const volumetricWeightGram = Math.ceil((input.lengthCm * input.widthCm * input.heightCm) / 6000 * 1000);
  const actualWeightGram = Math.max(0, Math.trunc(input.actualWeightGram));
  const billingWeightGram = Math.max(actualWeightGram, volumetricWeightGram);
  const freightFeeHkd = Math.ceil((billingWeightGram / 1000) * Math.max(0, Math.trunc(input.ratePerKgHkd)));
  const quoteId = createId("freight");

  await run(
    db,
    `INSERT INTO freight_quotes (
      id, shipment_id, actual_weight_gram, volumetric_weight_gram, billing_weight_gram, rate_per_kg_hkd, freight_fee_hkd
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    quoteId,
    shipmentId,
    actualWeightGram,
    volumetricWeightGram,
    billingWeightGram,
    Math.trunc(input.ratePerKgHkd),
    freightFeeHkd
  );
  await run(
    db,
    "UPDATE shipments SET freight_fee_hkd = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
    freightFeeHkd,
    "pending_payment",
    shipmentId
  );
  await writeAuditLog(db, "staff", staffId, "shipment.freight_quote", "shipment", shipmentId, {
    quoteId,
    actualWeightGram,
    volumetricWeightGram,
    billingWeightGram,
    freightFeeHkd
  });
  return { id: quoteId, shipmentId, billingWeightGram, freightFeeHkd, status: "pending_payment" };
}

export async function payShipmentFreight(db: D1Database, shipmentId: string, memberId = "demo-member") {
  const shipment = await first<{ id: string; member_id: string; freight_fee_hkd: number | null; carton_fee_hkd: number }>(
    db,
    "SELECT id, member_id, freight_fee_hkd, carton_fee_hkd FROM shipments WHERE id = ? AND member_id = ?",
    shipmentId,
    memberId
  );

  if (!shipment || shipment.freight_fee_hkd === null) {
    throw new Error("Shipment freight is not ready for payment");
  }

  const wallet = await ensureWallet(db, memberId);
  const payableHkd = shipment.freight_fee_hkd + shipment.carton_fee_hkd;

  if (wallet.balance_hkd < payableHkd) {
    throw new Error("Insufficient wallet balance");
  }

  const balanceAfterHkd = wallet.balance_hkd - payableHkd;
  await run(db, "UPDATE wallets SET balance_hkd = ?, updated_at = CURRENT_TIMESTAMP WHERE member_id = ?", balanceAfterHkd, memberId);
  await run(db, "UPDATE shipments SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?", "pending_outbound", shipmentId);
  await run(
    db,
    `INSERT INTO financial_ledger_entries (
      id, member_id, bucket, direction, amount_hkd, amount_jpy, source_type, source_id, balance_after_hkd, note
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    createId("ledger"),
    memberId,
    "international_freight",
    "debit",
    payableHkd,
    0,
    "shipment",
    shipmentId,
    balanceAfterHkd,
    "Shipment freight and carton payment"
  );
  await run(
    db,
    "INSERT INTO points_ledger (id, member_id, bucket, points, source_type, source_id) VALUES (?, ?, ?, ?, ?, ?)",
    createId("points"),
    memberId,
    "logistics",
    payableHkd,
    "shipment",
    shipmentId
  );
  return { id: shipmentId, status: "pending_outbound", payableHkd, balanceAfterHkd };
}

export async function createAftersalesRequest(db: D1Database, input: AftersalesInput, memberId = "demo-member") {
  const id = createId("after");

  if (input.orderType === "procurement" && input.requestType === "cancel") {
    const order = await first<{ status: string }>(
      db,
      "SELECT status FROM procurement_orders WHERE id = ? AND member_id = ?",
      input.orderId,
      memberId
    );

    if (!order) {
      throw new Error("Order not found");
    }

    if (["purchased", "arrived_japan_warehouse", "shelved", "completed"].includes(order.status)) {
      throw new Error("Purchased orders cannot be cancelled");
    }
  }

  await run(
    db,
    `INSERT INTO aftersales_requests (id, member_id, order_type, order_id, request_type, status, reason)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    id,
    memberId,
    input.orderType,
    input.orderId,
    input.requestType,
    "pending_review",
    input.reason
  );
  await writeAuditLog(db, "member", memberId, "aftersales_request.create", "aftersales_request", id, input);
  return { id, status: "pending_review" };
}

export async function reviewAftersalesRequest(
  db: D1Database,
  requestId: string,
  decision: "approved" | "rejected",
  refundHkd = 0,
  staffId = "staff-finance-demo"
) {
  const request = await first<{ id: string; member_id: string; order_type: string; order_id: string; request_type: string; status: string }>(
    db,
    "SELECT id, member_id, order_type, order_id, request_type, status FROM aftersales_requests WHERE id = ?",
    requestId
  );

  if (!request || request.status !== "pending_review") {
    throw new Error("Aftersales request is not pending review");
  }

  await run(
    db,
    "UPDATE aftersales_requests SET status = ?, reviewed_at = CURRENT_TIMESTAMP WHERE id = ?",
    decision,
    requestId
  );

  if (decision === "approved") {
    if (request.order_type === "procurement" && request.request_type === "cancel") {
      await run(db, "UPDATE procurement_orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?", "cancelled", request.order_id);
    }

    if (refundHkd > 0) {
      const wallet = await ensureWallet(db, request.member_id);
      const balanceAfterHkd = wallet.balance_hkd + Math.trunc(refundHkd);
      await run(db, "UPDATE wallets SET balance_hkd = ?, updated_at = CURRENT_TIMESTAMP WHERE member_id = ?", balanceAfterHkd, request.member_id);
      await run(
        db,
        `INSERT INTO financial_ledger_entries (
          id, member_id, bucket, direction, amount_hkd, amount_jpy, source_type, source_id, balance_after_hkd, note
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        createId("ledger"),
        request.member_id,
        "refund",
        "credit",
        Math.trunc(refundHkd),
        0,
        "aftersales_request",
        requestId,
        balanceAfterHkd,
        "Refund returned to wallet balance"
      );
    }
  }

  await writeAuditLog(db, "staff", staffId, `aftersales_request.${decision}`, "aftersales_request", requestId, { refundHkd });
  return { id: requestId, status: decision, refundDestination: refundHkd > 0 ? "wallet_balance" : null };
}

export async function claimOwnerlessPackage(db: D1Database, packageId: string, memberId = "demo-member") {
  const pkg = await first<{ id: string; owner_status: string }>(db, "SELECT id, owner_status FROM inbound_packages WHERE id = ?", packageId);

  if (!pkg || pkg.owner_status !== "ownerless_pool") {
    throw new Error("Ownerless package not found");
  }

  await run(
    db,
    "UPDATE inbound_packages SET member_id = ?, owner_status = ?, status = ?, free_storage_until = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
    memberId,
    "identified",
    "claimed",
    dateAfterDays(30),
    packageId
  );
  await writeAuditLog(db, "member", memberId, "inbound_package.claim", "inbound_package", packageId);
  return { id: packageId, ownerStatus: "identified", status: "claimed" };
}

export async function destroyExpiredOwnerlessPackages(db: D1Database, staffId = "staff-admin-demo") {
  const result = await db.prepare(
    `UPDATE inbound_packages
        SET status = 'destroyed',
            updated_at = CURRENT_TIMESTAMP
      WHERE owner_status = 'ownerless_pool'
        AND status != 'destroyed'
        AND datetime(created_at, '+60 days') < datetime('now')`
  ).run();
  await writeAuditLog(db, "staff", staffId, "inbound_package.destroy_expired_ownerless", "inbound_package", "batch", {
    changed: result.meta.changes
  });
  return { destroyed: result.meta.changes ?? 0 };
}

export async function creditCommission(db: D1Database, memberId: string, sourceType: string, sourceId: string, revenueHkd: number, rate: number) {
  const commissionHkd = Math.floor(Math.max(0, revenueHkd) * Math.max(0, rate));
  const wallet = await ensureWallet(db, memberId);
  const balanceAfterHkd = wallet.balance_hkd + commissionHkd;
  await run(
    db,
    `INSERT INTO commission_ledger (
      id, member_id, source_type, source_id, revenue_hkd, commission_rate, commission_hkd, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    createId("commission"),
    memberId,
    sourceType,
    sourceId,
    Math.trunc(revenueHkd),
    rate,
    commissionHkd,
    "credited_to_balance"
  );
  await run(db, "UPDATE wallets SET balance_hkd = ?, updated_at = CURRENT_TIMESTAMP WHERE member_id = ?", balanceAfterHkd, memberId);
  return { memberId, commissionHkd, balanceAfterHkd };
}

export async function redeemPoints(db: D1Database, bucket: string, points: number, rewardName: string, memberId = "demo-member") {
  const available = await first<PointRow>(
    db,
    "SELECT bucket, COALESCE(SUM(points), 0) AS total FROM points_ledger WHERE member_id = ? AND bucket = ? GROUP BY bucket",
    memberId,
    bucket
  );

  if ((available?.total ?? 0) < points) {
    throw new Error("Insufficient points");
  }

  const id = createId("point-redemption");
  await run(
    db,
    "INSERT INTO points_ledger (id, member_id, bucket, points, source_type, source_id) VALUES (?, ?, ?, ?, ?, ?)",
    createId("points"),
    memberId,
    bucket,
    -Math.trunc(points),
    "point_redemption",
    id
  );
  await run(
    db,
    "INSERT INTO point_redemptions (id, member_id, bucket, points, reward_name, status) VALUES (?, ?, ?, ?, ?, ?)",
    id,
    memberId,
    bucket,
    Math.trunc(points),
    rewardName,
    "pending_review"
  );
  return { id, status: "pending_review" };
}

export async function redeemCoupon(db: D1Database, code: string, sourceType: string, sourceId: string, memberId = "demo-member") {
  const coupon = await first<{ id: string; rule_json: string; status: string }>(
    db,
    "SELECT id, rule_json, status FROM coupons WHERE code = ?",
    code.trim().toUpperCase()
  );

  if (!coupon || coupon.status !== "active") {
    throw new Error("Coupon is not active");
  }

  const rule = parseJsonValue(coupon.rule_json) as { discountHkd?: number };
  const discountHkd = Math.trunc(rule.discountHkd ?? 0);
  const id = createId("coupon-redemption");
  await run(
    db,
    `INSERT INTO coupon_redemptions (id, coupon_id, member_id, source_type, source_id, discount_hkd)
     VALUES (?, ?, ?, ?, ?, ?)`,
    id,
    coupon.id,
    memberId,
    sourceType,
    sourceId,
    discountHkd
  );
  return { id, discountHkd };
}

export async function upsertTranslation(db: D1Database, input: TranslationInput, staffId = "staff-admin-demo") {
  const id = createId("i18n");
  await run(
    db,
    `INSERT INTO translations (id, namespace, translation_key, locale, value, updated_by)
     VALUES (?, ?, ?, ?, ?, ?)
     ON CONFLICT(namespace, translation_key, locale)
     DO UPDATE SET value = excluded.value, updated_by = excluded.updated_by, updated_at = CURRENT_TIMESTAMP`,
    id,
    input.namespace,
    input.translationKey,
    input.locale,
    input.value,
    staffId
  );
  return { namespace: input.namespace, translationKey: input.translationKey, locale: input.locale };
}

export async function upsertSeoEntry(db: D1Database, input: SeoInput) {
  const id = createId("seo");
  await run(
    db,
    `INSERT INTO seo_entries (
      id, entity_type, entity_id, locale, title, meta_description, url_slug, open_graph_json, sitemap_enabled, robots_directive
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(entity_type, entity_id, locale)
    DO UPDATE SET title = excluded.title,
                  meta_description = excluded.meta_description,
                  url_slug = excluded.url_slug,
                  robots_directive = excluded.robots_directive,
                  updated_at = CURRENT_TIMESTAMP`,
    id,
    input.entityType,
    input.entityId,
    input.locale,
    input.title,
    input.metaDescription ?? null,
    input.urlSlug,
    JSON.stringify({ title: input.title }),
    1,
    input.robotsDirective ?? "index,follow"
  );
  return { entityType: input.entityType, entityId: input.entityId, locale: input.locale, urlSlug: input.urlSlug };
}

export async function getPublicPricing(db: D1Database) {
  const logistics = await all<LogisticsChannelRow>(
    db,
    `SELECT code, name, destination_region, transport_mode, billing_method, restricted_items_json,
            transit_time_note, weight_limit_gram, volumetric_formula, enabled
       FROM logistics_channel_configs
      WHERE enabled = 1
      ORDER BY destination_region, transport_mode`
  );
  const serviceFees = await all<ServiceFeeRuleRow>(
    db,
    "SELECT service_type, fee_type, rate_percent, fixed_fee_hkd, currency, enabled FROM service_fee_rules WHERE enabled = 1 ORDER BY service_type"
  );
  const cartons = await all<CartonTypeRow>(db, "SELECT code, name, fixed_fee_hkd, enabled FROM carton_types WHERE enabled = 1 ORDER BY code");
  return { logistics, serviceFees, cartons };
}

export async function getSitemap(db: D1Database) {
  const entries = await all<{ url_slug: string; updated_at: string }>(
    db,
    "SELECT url_slug, updated_at FROM seo_entries WHERE sitemap_enabled = 1 AND robots_directive LIKE 'index%' ORDER BY url_slug"
  );
  return entries.map((entry) => ({ loc: `/${entry.url_slug}`, lastmod: entry.updated_at }));
}

export async function exportAdminCsv(db: D1Database, report: string) {
  if (report === "ledger") {
    const rows = await all<FinancialLedgerRow>(
      db,
      `SELECT id, bucket, direction, amount_hkd, amount_jpy, source_type, source_id, created_at
         FROM financial_ledger_entries
        ORDER BY created_at DESC
        LIMIT 500`
    );
    return [
      "id,bucket,direction,amount_hkd,amount_jpy,source_type,source_id,created_at",
      ...rows.map((row) =>
        [row.id, row.bucket, row.direction, row.amount_hkd, row.amount_jpy, row.source_type, row.source_id, row.created_at]
          .map((value) => `"${String(value).replaceAll('"', '""')}"`)
          .join(",")
      )
    ].join("\n");
  }

  const rows = await all<ProcurementRow>(
    db,
    `SELECT id, platform, status, item_amount_jpy, local_shipping_jpy, service_fee_hkd, remarks, updated_at
       FROM procurement_orders
      ORDER BY updated_at DESC
      LIMIT 500`
  );
  return [
    "id,platform,status,item_amount_jpy,local_shipping_jpy,service_fee_hkd,remarks,updated_at",
    ...rows.map((row) =>
      [row.id, row.platform, row.status, row.item_amount_jpy, row.local_shipping_jpy, row.service_fee_hkd, row.remarks, row.updated_at]
        .map((value) => `"${String(value ?? "").replaceAll('"', '""')}"`)
        .join(",")
    )
  ].join("\n");
}

export async function createAttachment(db: D1Database, input: AttachmentInput, actor: ActorSession | null) {
  const id = createId("file");
  await run(
    db,
    `INSERT INTO storage_objects (id, owner_type, owner_id, file_name, content_type, storage_key, public_url)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    id,
    input.ownerType,
    input.ownerId,
    input.fileName,
    input.contentType ?? "application/octet-stream",
    `${input.ownerType}/${input.ownerId}/${id}-${input.fileName}`,
    input.publicUrl ?? null
  );
  await writeAuditLog(
    db,
    actor?.actorType ?? "system",
    actor?.actorId ?? "anonymous",
    "storage_object.create",
    "storage_object",
    id,
    input
  );
  return { id, storageKey: `${input.ownerType}/${input.ownerId}/${id}-${input.fileName}`, publicUrl: input.publicUrl ?? null };
}

export async function updateNotificationPreference(db: D1Database, channel: string, enabled: boolean, memberId = "demo-member") {
  await run(
    db,
    `INSERT INTO notification_preferences (id, member_id, channel, enabled, paid_addon)
     VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(member_id, channel)
     DO UPDATE SET enabled = excluded.enabled`,
    createId("notify"),
    memberId,
    channel,
    enabled ? 1 : 0,
    channel === "whatsapp" ? 1 : 0
  );
  return { channel, enabled };
}
