CREATE TABLE IF NOT EXISTS exchange_rates (
  id TEXT PRIMARY KEY,
  base_currency TEXT NOT NULL,
  quote_currency TEXT NOT NULL,
  base_currency_name TEXT NOT NULL,
  quote_currency_name TEXT NOT NULL,
  rate REAL NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  note TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(base_currency, quote_currency)
);

CREATE INDEX IF NOT EXISTS idx_exchange_rates_pair ON exchange_rates(base_currency, quote_currency);
CREATE INDEX IF NOT EXISTS idx_exchange_rates_status ON exchange_rates(status);

INSERT OR IGNORE INTO exchange_rates (id, base_currency, quote_currency, base_currency_name, quote_currency_name, rate, note) VALUES
  ('JPY-HKD', 'JPY', 'HKD', '日元', '港幣', 0.052000, '默認人工匯率，可由財務後台調整'),
  ('JPY-CNY', 'JPY', 'CNY', '日元', '人民幣', 0.046000, '默認人工匯率，可由財務後台調整'),
  ('JPY-AUD', 'JPY', 'AUD', '日元', '澳幣', 0.010000, '默認人工匯率，可由財務後台調整');
