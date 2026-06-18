PRAGMA foreign_keys = ON;

CREATE TABLE business_rule_settings (
  id TEXT PRIMARY KEY,
  namespace TEXT NOT NULL,
  rule_key TEXT NOT NULL,
  value_json TEXT NOT NULL,
  description TEXT,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(namespace, rule_key)
);

CREATE TABLE service_fee_rules (
  id TEXT PRIMARY KEY,
  service_type TEXT NOT NULL,
  fee_type TEXT NOT NULL,
  rate_percent REAL,
  fixed_fee_hkd INTEGER,
  currency TEXT NOT NULL DEFAULT 'HKD',
  enabled INTEGER NOT NULL DEFAULT 1,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(service_type, fee_type)
);

CREATE TABLE carton_types (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  fixed_fee_hkd INTEGER NOT NULL,
  enabled INTEGER NOT NULL DEFAULT 1
);

INSERT OR IGNORE INTO business_rule_settings (id, namespace, rule_key, value_json, description) VALUES
  ('rule-register-email', 'member', 'registration_method', '{"method":"email"}', '會員以電郵註冊'),
  ('rule-kyc-disabled', 'member', 'kyc_required_mvp', '{"required":false}', '第一版暫不需要 KYC'),
  ('rule-member-upgrade', 'member', 'upgrade_metrics', '{"metrics":["cumulative_spend","cumulative_freight","top_up_amount","order_count"]}', '會員升級依據'),
  ('rule-member-benefits', 'member', 'benefits', '{"benefits":["freight_discount","service_fee_discount","storage_free_days_bonus","priority_handling","commission_rate"]}', '會員等級權益'),
  ('rule-locales', 'content', 'first_release_locales', '{"locales":["zh-Hant","en","ja"],"default":"zh-Hant"}', '第一版多語'),
  ('rule-procurement-prepay', 'procurement', 'payment_policy', '{"policy":"full_payment_before_purchase"}', '代購全額付款後採購'),
  ('rule-procurement-cancel', 'procurement', 'cancellation_policy', '{"before_purchase":"allowed","after_purchase":"not_allowed"}', '代購取消規則'),
  ('rule-auction-failed-refund', 'auction', 'failed_bid_refund', '{"refund_to":"wallet_balance"}', '代拍失敗退回餘額'),
  ('rule-auction-inbound', 'auction', 'won_lot_inbound_notice', '{"auto_create_inbound_notice":true}', '代拍成功自動生成入庫預報'),
  ('rule-package-match', 'warehouse', 'inbound_matching', '{"mode":"auto_match_by_package_information"}', '入庫自動匹配'),
  ('rule-ownerless-destroy', 'warehouse', 'ownerless_package_retention', '{"days":60,"action":"destroy"}', '無主包裹 60 天銷毀'),
  ('rule-consolidation-owner', 'warehouse', 'consolidation_selection', '{"member_select":true,"staff_select":true,"repack_after_consolidation":false}', '合箱選擇與重組規則'),
  ('rule-storage-free', 'warehouse', 'free_storage_days', '{"days":30,"configurable":true}', '默認免倉期'),
  ('rule-overstorage-fee', 'warehouse', 'overstorage_fee', '{"billing":"per_package_per_day","configurable":true}', '超倉費'),
  ('rule-logistics-billing', 'logistics', 'billing_weight', '{"method":"greater_of_actual_or_volumetric"}', '實重和體積重取高'),
  ('rule-logistics-events', 'logistics', 'tracking_events', '{"events":["packed","outbound","departed_by_air_or_sea","arrived_port","customs_clearance","delivery","signed"]}', '自建物流節點'),
  ('rule-wallet-negative', 'finance', 'negative_balance', '{"allowed":false}', '會員餘額不允許為負'),
  ('rule-refund-wallet', 'finance', 'refund_destination', '{"destination":"wallet_balance"}', '退款退回餘額'),
  ('rule-commission-wallet', 'finance', 'commission_destination', '{"destination":"wallet_balance"}', '佣金轉餘額'),
  ('rule-notification-email', 'notification', 'email_mvp', '{"enabled":false}', '第一版暫不做郵件通知'),
  ('rule-notification-whatsapp', 'notification', 'whatsapp_mvp', '{"enabled":false}', '第一版暫不做 WhatsApp 通知'),
  ('rule-notification-user-toggle', 'notification', 'user_can_disable', '{"enabled":true}', '用戶可關閉通知'),
  ('rule-permission-module', 'admin', 'permission_granularity', '{"level":"module"}', '後台模組級權限'),
  ('rule-finance-edit-order', 'admin', 'finance_can_edit_order_amount', '{"allowed":true}', '財務可修改訂單金額'),
  ('rule-warehouse-finance', 'admin', 'warehouse_finance_visibility', '{"allowed":false}', '倉庫不可看財務資料'),
  ('rule-seo-articles', 'content', 'article_module_mvp', '{"enabled":false}', '第一版不做文章資訊'),
  ('rule-public-pricing', 'content', 'public_pricing_page', '{"enabled":true,"shows":["logistics_lines","restricted_items","billing_rules"]}', '第一版公開報價頁'),
  ('rule-migration-disabled', 'migration', 'legacy_data_migration_mvp', '{"enabled":false}', '第一版不考慮舊系統遷移');

INSERT OR IGNORE INTO service_fee_rules (id, service_type, fee_type, rate_percent, fixed_fee_hkd) VALUES
  ('fee-procurement-percent', 'procurement', 'item_amount_percent', 0, NULL),
  ('fee-procurement-fixed', 'procurement', 'fixed_fee', NULL, 0),
  ('fee-auction-percent', 'auction', 'winning_bid_percent', 0, NULL),
  ('fee-auction-fixed', 'auction', 'fixed_fee', NULL, 0),
  ('fee-photo-fixed', 'photo_full', 'fixed_fee', NULL, 0),
  ('fee-reinforce-fixed', 'reinforce_packaging', 'fixed_fee', NULL, 0),
  ('fee-vacuum-fixed', 'vacuum_pack', 'fixed_fee', NULL, 0),
  ('fee-remove-shoe-box-fixed', 'remove_shoe_box', 'fixed_fee', NULL, 0),
  ('fee-keep-original-box-fixed', 'keep_original_box', 'fixed_fee', NULL, 0),
  ('fee-negotiation-fixed', 'negotiation', 'fixed_fee', NULL, 0);

INSERT OR IGNORE INTO carton_types (id, code, name, fixed_fee_hkd) VALUES
  ('carton-s', 'S', 'Small carton', 0),
  ('carton-m', 'M', 'Medium carton', 0),
  ('carton-l', 'L', 'Large carton', 0);

CREATE INDEX idx_business_rule_lookup ON business_rule_settings(namespace, rule_key);
CREATE INDEX idx_service_fee_type ON service_fee_rules(service_type, fee_type);
