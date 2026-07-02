CREATE TABLE IF NOT EXISTS member_messages (
  id TEXT PRIMARY KEY,
  member_id TEXT NOT NULL REFERENCES members(id),
  message_type TEXT NOT NULL DEFAULT 'system',
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_read INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  read_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_member_messages_member_created
  ON member_messages(member_id, created_at);

CREATE INDEX IF NOT EXISTS idx_member_messages_member_read
  ON member_messages(member_id, is_read, created_at);

INSERT OR IGNORE INTO member_messages (id, member_id, message_type, title, content, is_read)
VALUES
  ('msg-demo-welcome', 'demo-member', 'system', '歡迎使用 DropPilot', '您的會員中心已啟用，可以提交線上隨意購、查看倉庫地址、管理訂單與餘額。', 0),
  ('msg-demo-warehouse', 'demo-member', 'notice', '倉庫地址已更新', '請在日本平台下單時填寫會員識別碼，倉庫會依識別碼匹配包裹歸屬。', 0),
  ('msg-demo-topup', 'demo-member', 'finance', '轉帳充值功能已開放', '您可以在財務中心提交線上充值或線下轉帳充值申請。', 1);
