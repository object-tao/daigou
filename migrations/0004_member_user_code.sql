ALTER TABLE members ADD COLUMN user_code TEXT;

UPDATE members
   SET user_code = 'A7K3'
 WHERE id = 'demo-member'
   AND (user_code IS NULL OR user_code = '');

UPDATE members
   SET user_code = substr(
     replace(replace(replace(replace(upper(hex(randomblob(3))), '0', '2'), 'O', '3'), 'L', '4'), 'I', '5'),
     1,
     4
   )
 WHERE user_code IS NULL OR user_code = '';

CREATE UNIQUE INDEX IF NOT EXISTS idx_members_user_code ON members(user_code);
