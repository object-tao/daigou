PRAGMA foreign_keys = ON;

CREATE TABLE order_status_definitions (
  id TEXT PRIMARY KEY,
  order_type TEXT NOT NULL,
  code TEXT NOT NULL,
  label TEXT NOT NULL,
  sort_order INTEGER NOT NULL,
  is_terminal INTEGER NOT NULL DEFAULT 0,
  UNIQUE(order_type, code)
);

CREATE TABLE package_identifiers (
  id TEXT PRIMARY KEY,
  package_id TEXT NOT NULL REFERENCES inbound_packages(id),
  identifier_type TEXT NOT NULL,
  identifier_value TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(package_id, identifier_type)
);

CREATE TABLE local_shipping_charge_rules (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL,
  debt_behavior TEXT NOT NULL,
  enabled INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE consolidation_option_definitions (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL,
  fee_type TEXT NOT NULL DEFAULT 'configurable',
  enabled INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE logistics_channel_configs (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  destination_region TEXT NOT NULL,
  transport_mode TEXT NOT NULL,
  billing_method TEXT NOT NULL,
  restricted_items_json TEXT NOT NULL DEFAULT '[]',
  transit_time_note TEXT,
  weight_limit_gram INTEGER,
  volumetric_formula TEXT,
  enabled INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE auto_debit_rules (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  balance_limit_hkd INTEGER NOT NULL,
  reconfirm_over_hkd INTEGER NOT NULL,
  credit_allowed INTEGER NOT NULL DEFAULT 0,
  insufficient_balance_action TEXT NOT NULL,
  enabled INTEGER NOT NULL DEFAULT 1,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE support_tickets (
  id TEXT PRIMARY KEY,
  member_id TEXT NOT NULL REFERENCES members(id),
  ticket_type TEXT NOT NULL,
  related_type TEXT,
  related_id TEXT,
  status TEXT NOT NULL DEFAULT 'open',
  priority TEXT NOT NULL DEFAULT 'normal',
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  assigned_to TEXT REFERENCES staff_users(id),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE warehouse_scan_events (
  id TEXT PRIMARY KEY,
  package_id TEXT NOT NULL REFERENCES inbound_packages(id),
  scan_step TEXT NOT NULL,
  scanned_code TEXT NOT NULL,
  staff_id TEXT REFERENCES staff_users(id),
  location TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE financial_ledger_entries (
  id TEXT PRIMARY KEY,
  member_id TEXT NOT NULL REFERENCES members(id),
  bucket TEXT NOT NULL,
  direction TEXT NOT NULL,
  amount_hkd INTEGER NOT NULL DEFAULT 0,
  amount_jpy INTEGER NOT NULL DEFAULT 0,
  source_type TEXT NOT NULL,
  source_id TEXT NOT NULL,
  balance_after_hkd INTEGER,
  note TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE seo_entries (
  id TEXT PRIMARY KEY,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  locale TEXT NOT NULL DEFAULT 'zh-Hant',
  title TEXT NOT NULL,
  meta_description TEXT,
  url_slug TEXT NOT NULL,
  open_graph_json TEXT NOT NULL DEFAULT '{}',
  sitemap_enabled INTEGER NOT NULL DEFAULT 1,
  robots_directive TEXT NOT NULL DEFAULT 'index,follow',
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(entity_type, entity_id, locale),
  UNIQUE(locale, url_slug)
);

INSERT OR IGNORE INTO order_status_definitions (id, order_type, code, label, sort_order, is_terminal) VALUES
  ('status-procurement-pending-payment', 'procurement', 'pending_payment', '待付款', 10, 0),
  ('status-procurement-paid', 'procurement', 'paid', '已付款', 20, 0),
  ('status-procurement-pending-purchase', 'procurement', 'pending_purchase', '待採購', 30, 0),
  ('status-procurement-purchasing', 'procurement', 'purchasing', '採購中', 40, 0),
  ('status-procurement-purchased', 'procurement', 'purchased', '已採購', 50, 0),
  ('status-procurement-arrived-jp', 'procurement', 'arrived_japan_warehouse', '已到日本倉', 60, 0),
  ('status-procurement-pending-shelving', 'procurement', 'pending_shelving', '待上架', 70, 0),
  ('status-procurement-shelved', 'procurement', 'shelved', '已上架', 80, 0),
  ('status-procurement-pending-consolidation', 'procurement', 'pending_consolidation', '待合箱', 90, 0),
  ('status-procurement-pending-packing', 'procurement', 'pending_packing', '待打包', 100, 0),
  ('status-procurement-pending-freight', 'procurement', 'pending_international_freight_payment', '待支付國際運費', 110, 0),
  ('status-procurement-pending-dispatch', 'procurement', 'pending_dispatch', '待發貨', 120, 0),
  ('status-procurement-dispatched', 'procurement', 'dispatched', '已發貨', 130, 0),
  ('status-procurement-completed', 'procurement', 'completed', '已完成', 140, 1),
  ('status-procurement-cancelled', 'procurement', 'cancelled', '已取消', 150, 1),
  ('status-procurement-refunding', 'procurement', 'refunding', '退款中', 160, 0),
  ('status-procurement-refunded', 'procurement', 'refunded', '已退款', 170, 1),
  ('status-forward-pending-inbound', 'forwarding', 'pending_inbound', '待入庫', 10, 0),
  ('status-forward-inbound', 'forwarding', 'inbound', '已入庫', 20, 0),
  ('status-forward-pending-claim', 'forwarding', 'pending_claim', '待認領', 30, 0),
  ('status-forward-claimed', 'forwarding', 'claimed', '已認領', 40, 0),
  ('status-forward-pending-consolidation', 'forwarding', 'pending_consolidation', '待合箱', 50, 0),
  ('status-forward-packing', 'forwarding', 'packing', '打包中', 60, 0),
  ('status-forward-pending-payment', 'forwarding', 'pending_payment', '待付款', 70, 0),
  ('status-forward-pending-outbound', 'forwarding', 'pending_outbound', '待出庫', 80, 0),
  ('status-forward-outbound', 'forwarding', 'outbound', '已出庫', 90, 0),
  ('status-forward-in-transit', 'forwarding', 'in_transit', '運輸中', 100, 0),
  ('status-forward-signed', 'forwarding', 'signed', '已簽收', 110, 1);

INSERT OR IGNORE INTO package_identifiers (id, package_id, identifier_type, identifier_value) VALUES
  ('pkgid-demo-jp-tracking', 'DP-PK-10003', 'japan_tracking_no', 'JP-DEMO-10003'),
  ('pkgid-demo-inbound', 'DP-PK-10003', 'warehouse_inbound_no', 'DP-IN-20260618-0001'),
  ('pkgid-demo-member-package', 'DP-PK-10003', 'member_package_no', 'DP-PK-10003'),
  ('pkgid-demo-consolidation', 'DP-PK-10003', 'consolidation_batch_no', 'DP-MG-20260618-0001'),
  ('pkgid-demo-international', 'DP-PK-10003', 'international_tracking_no', 'DP-HK-AIR-0001');

INSERT OR IGNORE INTO local_shipping_charge_rules (id, code, label, debt_behavior) VALUES
  ('local-ship-pre-collect', 'pre_collect', '採購前預收', 'charge_before_purchase'),
  ('local-ship-manual-after', 'manual_after_purchase', '採購後人工補收', 'manual_supplement'),
  ('local-ship-balance-debt', 'balance_debt', '自動加入餘額欠款', 'add_wallet_debt'),
  ('local-ship-next-payment', 'next_payment', '下次付款一起收', 'collect_next_payment');

INSERT OR IGNORE INTO consolidation_option_definitions (id, code, label, fee_type) VALUES
  ('consolidation-unlimited', 'unlimited_items', '不限件數', 'free'),
  ('consolidation-cross-platform', 'cross_platform', '可跨平台合箱', 'free'),
  ('consolidation-free', 'free_consolidation', '免費合箱', 'free'),
  ('consolidation-carton-fee', 'carton_fee', '收紙箱費', 'paid'),
  ('consolidation-keep-original', 'keep_original_box', '保留原箱', 'configurable'),
  ('consolidation-remove-shoe-box', 'remove_shoe_box', '去除鞋盒', 'configurable'),
  ('consolidation-vacuum', 'vacuum_pack', '抽真空', 'paid'),
  ('consolidation-reinforce', 'reinforce_packaging', '加強包裝', 'paid');

INSERT OR IGNORE INTO logistics_channel_configs (
  id, code, name, destination_region, transport_mode, billing_method, restricted_items_json, transit_time_note, weight_limit_gram, volumetric_formula
) VALUES
  ('line-hk-air', 'HK_AIR', '香港空運', 'HK', 'air', 'actual_or_volumetric_weight', '["易燃品","現金或有價證券"]', '約 3-7 個工作日', 30000, 'L*W*H/6000'),
  ('line-hk-sea', 'HK_SEA', '香港海運', 'HK', 'sea', 'actual_or_volumetric_weight', '["易燃品","現金或有價證券"]', '約 14-30 個工作日', 50000, 'L*W*H/6000'),
  ('line-uk-air', 'UK_AIR', '英國空運', 'GB', 'air', 'actual_or_volumetric_weight', '[]', '待營運配置', NULL, 'L*W*H/5000'),
  ('line-uk-sea', 'UK_SEA', '英國海運', 'GB', 'sea', 'actual_or_volumetric_weight', '[]', '待營運配置', NULL, 'L*W*H/5000'),
  ('line-ca', 'CA', '加拿大', 'CA', 'mixed', 'manual_quote', '[]', '待營運配置', NULL, ''),
  ('line-au', 'AU', '澳洲', 'AU', 'mixed', 'manual_quote', '[]', '待營運配置', NULL, ''),
  ('line-mo', 'MO', '澳門', 'MO', 'mixed', 'manual_quote', '[]', '待營運配置', NULL, ''),
  ('line-tw', 'TW', '台灣', 'TW', 'mixed', 'manual_quote', '[]', '待營運配置', NULL, '');

INSERT OR IGNORE INTO auto_debit_rules (
  id, name, balance_limit_hkd, reconfirm_over_hkd, credit_allowed, insufficient_balance_action
) VALUES (
  'auto-debit-default',
  '默認自動扣款規則',
  500,
  100,
  0,
  'notify_member_for_top_up'
);

INSERT OR IGNORE INTO support_tickets (
  id, member_id, ticket_type, related_type, related_id, status, priority, subject, description, assigned_to
) VALUES (
  'ticket-demo-package',
  'demo-member',
  '查件',
  'package',
  'DP-PK-10003',
  'open',
  'normal',
  '查詢包裹入庫狀態',
  'Demo ticket for package tracking workflow.',
  'staff-admin-demo'
);

INSERT OR IGNORE INTO warehouse_scan_events (
  id, package_id, scan_step, scanned_code, staff_id, location
) VALUES
  ('scan-demo-inbound', 'DP-PK-10003', '入庫掃碼', 'DP-IN-20260618-0001', 'staff-admin-demo', '船橋倉'),
  ('scan-demo-shelving', 'DP-PK-10003', '上架掃碼', 'SHELF-A-01', 'staff-admin-demo', '船橋倉');

INSERT OR IGNORE INTO financial_ledger_entries (
  id, member_id, bucket, direction, amount_hkd, amount_jpy, source_type, source_id, balance_after_hkd, note
) VALUES
  ('ledger-demo-topup', 'demo-member', '會員餘額', 'credit', 1000, 0, 'payment_request', 'pay-demo-bank-1', 1280, '銀行轉帳入帳待審核示例'),
  ('ledger-demo-procurement', 'demo-member', '代購消費', 'debit', 0, 9800, 'procurement_order', 'DP-PO-10001', 1280, '代購商品日元成本示例'),
  ('ledger-demo-vas', 'demo-member', '增值服務費', 'debit', 20, 0, 'value_added_service', 'vas-demo-photo', 1260, '全方面拍照');

INSERT OR IGNORE INTO seo_entries (
  id, entity_type, entity_id, locale, title, meta_description, url_slug, open_graph_json, sitemap_enabled, robots_directive
) VALUES (
  'seo-home-zh-hant',
  'page',
  'home',
  'zh-Hant',
  'DropPilot 日本代購及集運',
  '面向香港用戶的日本代購、Yahoo 代拍、集運、會員與自建物流平台。',
  'home',
  '{"type":"website","site_name":"DropPilot"}',
  1,
  'index,follow'
);

CREATE INDEX idx_status_order_type ON order_status_definitions(order_type, sort_order);
CREATE INDEX idx_package_identifiers_value ON package_identifiers(identifier_type, identifier_value);
CREATE INDEX idx_tickets_member_status ON support_tickets(member_id, status);
CREATE INDEX idx_scan_package_step ON warehouse_scan_events(package_id, scan_step);
CREATE INDEX idx_financial_ledger_member ON financial_ledger_entries(member_id, created_at);
CREATE INDEX idx_seo_lookup ON seo_entries(entity_type, entity_id, locale);
