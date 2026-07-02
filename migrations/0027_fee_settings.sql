CREATE TABLE IF NOT EXISTS fee_settings (
  id TEXT PRIMARY KEY,
  category_code TEXT NOT NULL,
  category_name TEXT NOT NULL,
  fee_code TEXT NOT NULL UNIQUE,
  fee_name TEXT NOT NULL,
  charge_mode TEXT NOT NULL DEFAULT 'fixed',
  amount_hkd REAL NOT NULL DEFAULT 0,
  percent_rate REAL NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'HKD',
  status TEXT NOT NULL DEFAULT 'active',
  sort_order INTEGER NOT NULL DEFAULT 100,
  remarks TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO fee_settings (
  id, category_code, category_name, fee_code, fee_name, charge_mode, amount_hkd, percent_rate, currency, status, sort_order, remarks
) VALUES
  ('fee-procurement-percent', 'procurement', '代購服務費', 'procurement_percent', '代購商品金額比例服務費', 'percent', 0, 0.08, 'HKD', 'active', 10, '按商品金額百分比收取，可按實際營運調整'),
  ('fee-procurement-fixed', 'procurement', '代購服務費', 'procurement_fixed', '代購每單固定服務費', 'fixed', 20, 0, 'HKD', 'active', 20, '固定代購處理費'),
  ('fee-auction-percent', 'auction', 'Yahoo 代拍費', 'auction_percent', '代拍落札價比例服務費', 'percent', 0, 0.08, 'HKD', 'active', 30, '按落札價百分比收取'),
  ('fee-auction-fixed', 'auction', 'Yahoo 代拍費', 'auction_fixed', '代拍每單固定服務費', 'fixed', 30, 0, 'HKD', 'active', 40, '代拍固定處理費'),
  ('fee-carton-small', 'package_material', '紙箱費', 'carton_small', '小號紙箱', 'fixed', 8, 0, 'HKD', 'active', 50, '合箱紙箱費'),
  ('fee-carton-medium', 'package_material', '紙箱費', 'carton_medium', '中號紙箱', 'fixed', 12, 0, 'HKD', 'active', 60, '合箱紙箱費'),
  ('fee-carton-large', 'package_material', '紙箱費', 'carton_large', '大號紙箱', 'fixed', 18, 0, 'HKD', 'active', 70, '合箱紙箱費'),
  ('fee-photo', 'value_added', '增值服務費', 'photo', '全方面拍照', 'fixed', 10, 0, 'HKD', 'active', 80, '入庫或打包拍照服務'),
  ('fee-reinforce', 'value_added', '增值服務費', 'reinforce_packaging', '加強包裝', 'fixed', 20, 0, 'HKD', 'active', 90, '加固包裝材料與人工'),
  ('fee-vacuum', 'value_added', '增值服務費', 'vacuum_packaging', '抽真空', 'fixed', 15, 0, 'HKD', 'active', 100, '適用衣物等可壓縮商品'),
  ('fee-remove-shoebox', 'value_added', '增值服務費', 'remove_shoebox', '去鞋盒', 'fixed', 5, 0, 'HKD', 'active', 110, '去除原鞋盒'),
  ('fee-keep-original-box', 'value_added', '增值服務費', 'keep_original_box', '保留原箱', 'fixed', 0, 0, 'HKD', 'active', 120, '保留商品原箱'),
  ('fee-negotiation', 'value_added', '增值服務費', 'negotiation', '議價服務', 'fixed', 20, 0, 'HKD', 'active', 130, '個別網店議價服務'),
  ('fee-storage-default', 'storage', '倉儲費', 'storage_default', '逾期倉儲費 / 天', 'fixed', 3, 0, 'HKD', 'active', 140, '超過免倉期後每日按包裹收取');
