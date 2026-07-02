CREATE TABLE IF NOT EXISTS member_point_transactions (
  id TEXT PRIMARY KEY,
  member_id TEXT NOT NULL REFERENCES members(id),
  direction TEXT NOT NULL,
  category TEXT NOT NULL,
  points INTEGER NOT NULL,
  balance_after INTEGER,
  related_type TEXT,
  related_id TEXT,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'posted',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_member_points_member_created
  ON member_point_transactions(member_id, created_at);

CREATE INDEX IF NOT EXISTS idx_member_points_category_created
  ON member_point_transactions(category, created_at);

INSERT OR IGNORE INTO member_point_transactions (
  id, member_id, direction, category, points, balance_after, title, description, status
) VALUES
  ('pt-demo-procurement', 'demo-member', 'credit', 'procurement', 0, 0, '代購商品積分', '未來按代購商品規則自動產生', 'posted'),
  ('pt-demo-shipping', 'demo-member', 'credit', 'shipping', 0, 0, '物流費用積分', '未來按物流費用規則自動產生', 'posted');
