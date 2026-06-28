CREATE TABLE IF NOT EXISTS members (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  locale TEXT NOT NULL DEFAULT 'zh-Hant',
  level_code TEXT NOT NULL DEFAULT 'LV1',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS wallets (
  member_id TEXT PRIMARY KEY REFERENCES members(id),
  balance_hkd INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS procurement_orders (
  id TEXT PRIMARY KEY,
  member_id TEXT NOT NULL REFERENCES members(id),
  platform TEXT NOT NULL,
  product_url TEXT NOT NULL,
  title TEXT NOT NULL,
  spec TEXT,
  quantity INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'pending_payment',
  item_amount_jpy INTEGER,
  local_shipping_jpy INTEGER,
  service_fee_hkd INTEGER,
  quoted_total_hkd INTEGER,
  remarks TEXT,
  admin_note TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  quoted_at TEXT,
  paid_at TEXT,
  purchased_at TEXT,
  cancelled_at TEXT
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id TEXT PRIMARY KEY,
  actor_type TEXT NOT NULL,
  actor_id TEXT NOT NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  detail_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_procurement_member_updated ON procurement_orders(member_id, updated_at);
CREATE INDEX IF NOT EXISTS idx_procurement_status_updated ON procurement_orders(status, updated_at);

INSERT OR IGNORE INTO members (id, email, display_name, locale, level_code)
VALUES ('demo-member', 'demo@droppilot.net', 'Demo Member', 'zh-Hant', 'LV1');

INSERT OR IGNORE INTO wallets (member_id, balance_hkd)
VALUES ('demo-member', 5000);
