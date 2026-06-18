PRAGMA foreign_keys = ON;

INSERT OR IGNORE INTO roles (id, name, description) VALUES
  ('role-super-admin', 'super_admin', 'Full system administration'),
  ('role-customer-service', 'customer_service', 'Member support, quotes, aftersales, notifications'),
  ('role-warehouse', 'warehouse', 'Inbound packages, merge, dispatch, value-added services'),
  ('role-finance', 'finance', 'Bank transfer review, exchange rates, balance, refunds'),
  ('role-operator', 'operator', 'Campaigns, coupons, member levels, content');

INSERT OR IGNORE INTO staff_users (id, email, display_name, role_id, status) VALUES
  ('staff-admin-demo', 'admin@droppilot.net', 'Demo Admin', 'role-super-admin', 'active'),
  ('staff-finance-demo', 'finance@droppilot.net', 'Demo Finance', 'role-finance', 'active');

INSERT OR IGNORE INTO members (id, email, display_name, locale, settlement_currency, level_code, status) VALUES
  ('demo-member', 'demo@droppilot.net', 'Demo Member', 'zh-Hant', 'HKD', 'LV1', 'active');

INSERT OR IGNORE INTO member_tags (id, member_id, tag) VALUES
  ('tag-demo-hk', 'demo-member', '香港'),
  ('tag-demo-traditional', 'demo-member', '繁體中文'),
  ('tag-demo-bank', 'demo-member', '銀行轉帳');

INSERT OR IGNORE INTO wallets (id, member_id, balance_hkd, commission_balance_hkd) VALUES
  ('wallet-demo-member', 'demo-member', 1280, 86);

INSERT OR IGNORE INTO notification_preferences (id, member_id, channel, enabled, paid_addon) VALUES
  ('notify-demo-email', 'demo-member', 'email', 1, 0),
  ('notify-demo-whatsapp', 'demo-member', 'whatsapp', 0, 1);

INSERT OR IGNORE INTO member_levels (code, name, rank, upgrade_rule_json, benefit_json) VALUES
  ('LV1', 'LV1', 1, '{}', '{}'),
  ('LV2', 'LV2', 2, '{}', '{}'),
  ('LV3', 'LV3', 3, '{}', '{}'),
  ('LV4', 'LV4', 4, '{}', '{}'),
  ('LV5', 'LV5', 5, '{}', '{}');

INSERT OR IGNORE INTO points_ledger (id, member_id, bucket, points, source_type, source_id) VALUES
  ('points-demo-procurement', 'demo-member', 'procurement', 320, 'procurement_order', 'DP-PO-10001'),
  ('points-demo-logistics', 'demo-member', 'logistics', 180, 'shipment', 'DP-SH-10001');

INSERT OR IGNORE INTO procurement_orders (
  id, member_id, platform, product_url, title, quantity, status, item_amount_jpy, local_shipping_jpy, service_fee_hkd, remarks
) VALUES (
  'DP-PO-10001',
  'demo-member',
  'Mercari',
  'https://jp.mercari.com/item/demo',
  'Mercari demo item',
  1,
  'pending_quote',
  9800,
  NULL,
  NULL,
  '可議價則先詢問客服'
);

INSERT OR IGNORE INTO auction_orders (
  id, member_id, platform, lot_url, title, max_bid_jpy, status, authorization_limit_jpy
) VALUES (
  'DP-AU-10002',
  'demo-member',
  'Yahoo! Auctions',
  'https://auctions.yahoo.co.jp/demo',
  'Yahoo auction demo lot',
  18000,
  'manual_bid_setup',
  18000
);

INSERT OR IGNORE INTO warehouses (id, name, type, country_code, is_final_dispatch) VALUES
  ('warehouse-funabashi', '船橋倉', 'dispatch_hub', 'JP', 1),
  ('warehouse-store-demo', '東京門市', 'storefront', 'JP', 0);

INSERT OR IGNORE INTO inbound_packages (
  id, member_id, warehouse_id, tracking_no, status, owner_status, weight_gram, volume_cm3, free_storage_until
) VALUES
  ('DP-PK-10003', 'demo-member', 'warehouse-funabashi', 'JP-DEMO-10003', 'ready_to_merge', 'identified', 1200, 8000, '2026-06-25'),
  ('DP-PK-OWNERLESS', NULL, 'warehouse-funabashi', 'JP-UNKNOWN-0001', 'received', 'ownerless_pool', 600, 3500, NULL);

INSERT OR IGNORE INTO value_added_services (id, package_id, service_type, status, fee_hkd) VALUES
  ('vas-demo-photo', 'DP-PK-10003', 'photo_full', 'pending', 20),
  ('vas-demo-reinforce', 'DP-PK-10003', 'reinforce_packaging', 'pending', 35);

INSERT OR IGNORE INTO shipments (
  id, member_id, line_code, status, carton_fee_hkd, freight_fee_hkd, tracking_no
) VALUES (
  'DP-SH-10001',
  'demo-member',
  'HK-AIR-STANDARD',
  'packing',
  15,
  NULL,
  NULL
);

INSERT OR IGNORE INTO payment_requests (id, member_id, method, amount_hkd, status, proof_url) VALUES
  ('pay-demo-bank-1', 'demo-member', 'bank_transfer', 1000, 'pending_review', NULL);

INSERT OR IGNORE INTO aftersales_requests (id, member_id, order_type, order_id, request_type, status, reason) VALUES
  ('after-demo-refund', 'demo-member', 'procurement', 'DP-PO-10001', 'refund', 'pending_review', 'Demo refund review');

INSERT OR IGNORE INTO logistics_tracking_events (
  id, shipment_id, status, location, description, occurred_at
) VALUES
  ('track-demo-created', 'DP-SH-10001', 'created', '船橋倉', '出庫單已建立', '2026-06-18T11:30:00.000Z');
