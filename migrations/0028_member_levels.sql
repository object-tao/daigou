CREATE TABLE IF NOT EXISTS member_levels (
  id TEXT PRIMARY KEY,
  level_code TEXT NOT NULL UNIQUE,
  level_name TEXT NOT NULL,
  min_consumption_hkd REAL NOT NULL DEFAULT 0,
  min_shipping_fee_hkd REAL NOT NULL DEFAULT 0,
  min_topup_hkd REAL NOT NULL DEFAULT 0,
  min_order_count INTEGER NOT NULL DEFAULT 0,
  shipping_discount_rate REAL NOT NULL DEFAULT 1,
  service_fee_discount_rate REAL NOT NULL DEFAULT 1,
  extra_free_storage_days INTEGER NOT NULL DEFAULT 0,
  priority_level INTEGER NOT NULL DEFAULT 0,
  commission_rate REAL NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active',
  sort_order INTEGER NOT NULL DEFAULT 100,
  remarks TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO member_levels (
  id, level_code, level_name, min_consumption_hkd, min_shipping_fee_hkd, min_topup_hkd, min_order_count,
  shipping_discount_rate, service_fee_discount_rate, extra_free_storage_days, priority_level, commission_rate,
  status, sort_order, remarks
) VALUES
  ('level-lv1', 'LV1', '普通會員', 0, 0, 0, 0, 1, 1, 0, 0, 0.01, 'active', 10, '新註冊會員默認等級'),
  ('level-lv2', 'LV2', '銀級會員', 3000, 1000, 3000, 5, 0.98, 0.98, 3, 1, 0.015, 'active', 20, NULL),
  ('level-lv3', 'LV3', '金級會員', 10000, 3000, 10000, 15, 0.95, 0.95, 7, 2, 0.02, 'active', 30, NULL),
  ('level-lv4', 'LV4', '白金會員', 30000, 8000, 30000, 40, 0.92, 0.92, 10, 3, 0.025, 'active', 40, NULL),
  ('level-lv5', 'LV5', '鑽石會員', 80000, 20000, 80000, 100, 0.88, 0.9, 15, 4, 0.03, 'active', 50, NULL);
