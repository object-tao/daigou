CREATE TABLE IF NOT EXISTS system_dictionaries (
  id TEXT PRIMARY KEY,
  category_code TEXT NOT NULL,
  category_name_zh_hant TEXT NOT NULL,
  item_code TEXT NOT NULL,
  item_value TEXT NOT NULL,
  label_zh_hant TEXT NOT NULL,
  label_en TEXT NOT NULL DEFAULT '',
  label_ja TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 100,
  status TEXT NOT NULL DEFAULT 'active',
  is_system INTEGER NOT NULL DEFAULT 0,
  remarks TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_system_dictionaries_category_item
  ON system_dictionaries(category_code, item_code);

CREATE INDEX IF NOT EXISTS idx_system_dictionaries_category_sort
  ON system_dictionaries(category_code, sort_order);

INSERT OR IGNORE INTO system_dictionaries (
  id, category_code, category_name_zh_hant, item_code, item_value,
  label_zh_hant, label_en, label_ja, sort_order, status, is_system, remarks
) VALUES
  ('dict-platform-mercari', 'product_platform', '商品平台', 'mercari', 'Mercari', 'Mercari 煤爐', 'Mercari', 'メルカリ', 10, 'active', 1, '日本二手交易平台'),
  ('dict-platform-yahoo', 'product_platform', '商品平台', 'yahoo', 'Yahoo Auction', 'Yahoo 代拍', 'Yahoo Auction', 'ヤフオク', 20, 'active', 1, 'Yahoo 拍賣'),
  ('dict-platform-amazon', 'product_platform', '商品平台', 'amazon', 'Amazon Japan', 'Amazon Japan', 'Amazon Japan', 'Amazon Japan', 30, 'active', 1, NULL),
  ('dict-platform-rakuten', 'product_platform', '商品平台', 'rakuten', 'Rakuten', 'Rakuten 樂天', 'Rakuten', '楽天', 40, 'active', 1, NULL),

  ('dict-item-normal', 'product_type', '商品類型', 'normal', 'normal', '普通物資', 'Normal goods', '通常品', 10, 'active', 1, NULL),
  ('dict-item-fragile', 'product_type', '商品類型', 'fragile', 'fragile', '易碎品', 'Fragile goods', '割れ物', 20, 'active', 1, NULL),
  ('dict-item-valuable', 'product_type', '商品類型', 'valuable', 'valuable', '貴重品', 'Valuable goods', '貴重品', 30, 'active', 1, NULL),
  ('dict-item-liquid', 'product_type', '商品類型', 'liquid', 'liquid', '液體', 'Liquid', '液体', 40, 'active', 1, NULL),
  ('dict-item-fashion', 'product_type', '商品類型', 'fashion', 'fashion', '服飾鞋包', 'Fashion', '衣類・バッグ', 50, 'active', 1, NULL),

  ('dict-ticket-optimization', 'ticket_type', '工單類型', 'optimization', 'optimization', '優化建議', 'Optimization suggestion', '改善提案', 10, 'active', 1, NULL),
  ('dict-ticket-service', 'ticket_type', '工單類型', 'service', 'service', '工單服務', 'Service ticket', 'サービスチケット', 20, 'active', 1, NULL),
  ('dict-ticket-activity', 'ticket_subtype', '工單子類型', 'activity', 'activity', '活動相關', 'Campaign related', 'キャンペーン関連', 10, 'active', 1, NULL),
  ('dict-ticket-product', 'ticket_subtype', '工單子類型', 'product', 'product', '商品相關', 'Product related', '商品関連', 20, 'active', 1, NULL),
  ('dict-ticket-function', 'ticket_subtype', '工單子類型', 'function', 'function', '功能優化建議', 'Feature improvement', '機能改善', 30, 'active', 1, NULL),
  ('dict-ticket-other', 'ticket_subtype', '工單子類型', 'other', 'other', '其他', 'Other', 'その他', 90, 'active', 1, NULL),

  ('dict-package-forecasted', 'package_status', '包裹狀態', 'forecasted', 'forecasted', '待入庫', 'Pending inbound', '入庫待ち', 10, 'active', 1, NULL),
  ('dict-package-inbounded', 'package_status', '包裹狀態', 'inbounded', 'inbounded', '已入庫', 'In warehouse', '入庫済み', 20, 'active', 1, NULL),
  ('dict-package-claimed', 'package_status', '包裹狀態', 'claimed', 'claimed', '已認領', 'Claimed', '認識済み', 30, 'active', 1, NULL),
  ('dict-package-orphan', 'package_status', '包裹狀態', 'orphan', 'orphan', '待認領', 'Unclaimed', '未認識', 40, 'active', 1, NULL),

  ('dict-order-pending-payment', 'procurement_status', '代購訂單狀態', 'pending_payment', 'pending_payment', '待付款', 'Pending payment', '支払い待ち', 10, 'active', 1, NULL),
  ('dict-order-platform-pending-order', 'procurement_status', '代購訂單狀態', 'platform_pending_order', 'platform_pending_order', '平台待下單', 'Pending platform order', '注文待ち', 20, 'active', 1, NULL),
  ('dict-order-platform-pending-shipment', 'procurement_status', '代購訂單狀態', 'platform_pending_shipment', 'platform_pending_shipment', '平台待發貨', 'Pending shipment', '発送待ち', 30, 'active', 1, NULL),
  ('dict-order-pending-inbound', 'procurement_status', '代購訂單狀態', 'pending_inbound', 'pending_inbound', '待入庫', 'Pending inbound', '入庫待ち', 40, 'active', 1, NULL),
  ('dict-order-completed', 'procurement_status', '代購訂單狀態', 'completed', 'completed', '已完成', 'Completed', '完了', 90, 'active', 1, NULL),

  ('dict-logistics-packed', 'logistics_node', '物流節點狀態', 'packed', 'packed', '已打包', 'Packed', '梱包済み', 10, 'active', 1, NULL),
  ('dict-logistics-outbound', 'logistics_node', '物流節點狀態', 'outbounded', 'outbounded', '已出庫', 'Outbounded', '出庫済み', 20, 'active', 1, NULL),
  ('dict-logistics-departed', 'logistics_node', '物流節點狀態', 'departed', 'departed', '已上飛機/船', 'Departed', '出発済み', 30, 'active', 1, NULL),
  ('dict-logistics-arrived', 'logistics_node', '物流節點狀態', 'arrived', 'arrived', '到港', 'Arrived', '到着', 40, 'active', 1, NULL),
  ('dict-logistics-signed', 'logistics_node', '物流節點狀態', 'signed', 'signed', '簽收', 'Signed', '受取済み', 90, 'active', 1, NULL),

  ('dict-member-vip', 'member_tag', '會員標籤', 'vip', 'vip', 'VIP', 'VIP', 'VIP', 10, 'active', 1, NULL),
  ('dict-member-priority', 'member_tag', '會員標籤', 'priority', 'priority', '優先處理', 'Priority', '優先対応', 20, 'active', 1, NULL),
  ('dict-member-risk', 'member_tag', '會員標籤', 'risk', 'risk', '需關注', 'Needs attention', '要注意', 30, 'active', 1, NULL),

  ('dict-service-photo', 'value_added_service', '增值服務類型', 'photo', 'photo', '拍照', 'Photo service', '写真撮影', 10, 'active', 1, NULL),
  ('dict-service-repack', 'value_added_service', '增值服務類型', 'repack', 'repack', '加強包裝', 'Repacking', '強化梱包', 20, 'active', 1, NULL),
  ('dict-service-vacuum', 'value_added_service', '增值服務類型', 'vacuum', 'vacuum', '抽真空', 'Vacuum packing', '真空包装', 30, 'active', 1, NULL),
  ('dict-service-shoebox', 'value_added_service', '增值服務類型', 'remove_shoebox', 'remove_shoebox', '去鞋盒', 'Remove shoebox', '靴箱破棄', 40, 'active', 1, NULL),
  ('dict-service-original-box', 'value_added_service', '增值服務類型', 'keep_original_box', 'keep_original_box', '保留原箱', 'Keep original box', '元箱保留', 50, 'active', 1, NULL),
  ('dict-service-negotiation', 'value_added_service', '增值服務類型', 'negotiation', 'negotiation', '議價服務', 'Negotiation service', '値段交渉', 60, 'active', 1, NULL),

  ('dict-payment-bank-transfer', 'payment_method', '支付方式', 'bank_transfer', 'bank_transfer', '銀行轉帳', 'Bank transfer', '銀行振込', 10, 'active', 1, NULL),
  ('dict-payment-alipay', 'payment_method', '支付方式', 'alipay', 'alipay', '支付寶', 'Alipay', 'Alipay', 20, 'active', 1, NULL),
  ('dict-payment-alipayhk', 'payment_method', '支付方式', 'alipayhk', 'alipayhk', 'AlipayHK', 'AlipayHK', 'AlipayHK', 30, 'active', 1, NULL),
  ('dict-payment-wechat', 'payment_method', '支付方式', 'wechat', 'wechat', '微信支付', 'WeChat Pay', 'WeChat Pay', 40, 'active', 1, NULL),

  ('dict-region-hk', 'country_region', '國家/地區', 'HK', 'HK', '中國香港', 'Hong Kong, China', '香港', 10, 'active', 1, NULL),
  ('dict-region-mo', 'country_region', '國家/地區', 'MO', 'MO', '中國澳門', 'Macao, China', 'マカオ', 20, 'active', 1, NULL),
  ('dict-region-tw', 'country_region', '國家/地區', 'TW', 'TW', '中國台灣', 'Taiwan, China', '台湾', 30, 'active', 1, NULL),
  ('dict-region-au', 'country_region', '國家/地區', 'AU', 'AU', '澳大利亞', 'Australia', 'オーストラリア', 40, 'active', 1, NULL),
  ('dict-region-gb', 'country_region', '國家/地區', 'GB', 'GB', '英國', 'United Kingdom', '英国', 50, 'active', 1, NULL),
  ('dict-region-ca', 'country_region', '國家/地區', 'CA', 'CA', '加拿大', 'Canada', 'カナダ', 60, 'active', 1, NULL),

  ('dict-lang-zh-hant', 'language', '語言', 'zh-Hant', 'zh-Hant', '繁體中文', 'Traditional Chinese', '繁体字中国語', 10, 'active', 1, NULL),
  ('dict-lang-en', 'language', '語言', 'en', 'en', '英文', 'English', '英語', 20, 'active', 1, NULL),
  ('dict-lang-ja', 'language', '語言', 'ja', 'ja', '日文', 'Japanese', '日本語', 30, 'active', 1, NULL),

  ('dict-warehouse-consolidation', 'warehouse_type', '倉庫類型', 'consolidation', '集運倉', '集運倉', 'Consolidation warehouse', '集約倉庫', 10, 'active', 1, NULL),
  ('dict-warehouse-store', 'warehouse_type', '倉庫類型', 'store', '門市', '門市', 'Store', '店舗', 20, 'active', 1, NULL),
  ('dict-warehouse-return', 'warehouse_type', '倉庫類型', 'return', '退貨倉', '退貨倉', 'Return warehouse', '返品倉庫', 30, 'active', 1, NULL),
  ('dict-warehouse-temp', 'warehouse_type', '倉庫類型', 'temporary', '臨時倉', '臨時倉', 'Temporary warehouse', '臨時倉庫', 40, 'active', 1, NULL);
