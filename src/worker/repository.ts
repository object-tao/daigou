import {
  adminSummary,
  demoMember,
  demoOrders,
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
