PRAGMA foreign_keys = ON;

CREATE TABLE cart_items (
  id TEXT PRIMARY KEY,
  member_id TEXT NOT NULL REFERENCES members(id),
  platform TEXT NOT NULL,
  product_url TEXT NOT NULL,
  title TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  remarks TEXT,
  local_shipping_status TEXT NOT NULL DEFAULT 'unknown',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE member_levels (
  code TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  rank INTEGER NOT NULL UNIQUE,
  upgrade_rule_json TEXT NOT NULL DEFAULT '{}',
  benefit_json TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE points_ledger (
  id TEXT PRIMARY KEY,
  member_id TEXT NOT NULL REFERENCES members(id),
  bucket TEXT NOT NULL,
  points INTEGER NOT NULL,
  source_type TEXT NOT NULL,
  source_id TEXT NOT NULL,
  expires_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE commission_ledger (
  id TEXT PRIMARY KEY,
  member_id TEXT NOT NULL REFERENCES members(id),
  referral_member_id TEXT REFERENCES members(id),
  source_type TEXT NOT NULL,
  source_id TEXT NOT NULL,
  revenue_hkd INTEGER NOT NULL,
  commission_rate REAL NOT NULL,
  commission_hkd INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'credited_to_balance',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE group_buy_campaigns (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  supplier_name TEXT NOT NULL,
  target_quantity INTEGER NOT NULL,
  current_quantity INTEGER NOT NULL DEFAULT 0,
  organizer_member_id TEXT REFERENCES members(id),
  reward_rule_json TEXT NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notification_preferences (
  id TEXT PRIMARY KEY,
  member_id TEXT NOT NULL REFERENCES members(id),
  channel TEXT NOT NULL,
  enabled INTEGER NOT NULL DEFAULT 1,
  paid_addon INTEGER NOT NULL DEFAULT 0,
  UNIQUE(member_id, channel)
);

CREATE TABLE notification_events (
  id TEXT PRIMARY KEY,
  member_id TEXT NOT NULL REFERENCES members(id),
  channel TEXT NOT NULL,
  template_key TEXT NOT NULL,
  payload_json TEXT NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  sent_at TEXT
);

CREATE TABLE translations (
  id TEXT PRIMARY KEY,
  namespace TEXT NOT NULL,
  translation_key TEXT NOT NULL,
  locale TEXT NOT NULL,
  value TEXT NOT NULL,
  updated_by TEXT REFERENCES staff_users(id),
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(namespace, translation_key, locale)
);

CREATE TABLE dictionaries (
  id TEXT PRIMARY KEY,
  namespace TEXT NOT NULL,
  code TEXT NOT NULL,
  label TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  enabled INTEGER NOT NULL DEFAULT 1,
  UNIQUE(namespace, code)
);

CREATE TABLE logistics_tracking_events (
  id TEXT PRIMARY KEY,
  shipment_id TEXT NOT NULL REFERENCES shipments(id),
  status TEXT NOT NULL,
  location TEXT,
  description TEXT NOT NULL,
  occurred_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE coupons (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  rule_json TEXT NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft',
  starts_at TEXT,
  ends_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_cart_member ON cart_items(member_id);
CREATE INDEX idx_points_member ON points_ledger(member_id, bucket);
CREATE INDEX idx_notifications_member ON notification_events(member_id, status);
CREATE INDEX idx_translations_lookup ON translations(namespace, translation_key, locale);
CREATE INDEX idx_tracking_shipment ON logistics_tracking_events(shipment_id, occurred_at);
