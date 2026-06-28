UPDATE members
   SET user_code = user_code || 'D'
 WHERE id = 'demo-member'
   AND length(user_code) = 4;

UPDATE members
   SET user_code = substr(
     user_code || replace(replace(replace(replace(upper(hex(randomblob(2))), '0', '2'), 'O', '3'), 'L', '4'), 'I', '5'),
     1,
     5
   )
 WHERE user_code IS NOT NULL
   AND user_code <> ''
   AND length(user_code) < 5;
