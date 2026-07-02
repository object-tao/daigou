UPDATE shipping_restrictions
   SET keywords = '爆炸品,煙火,烟火,火藥,火药,彈藥,弹药,鞭炮,煙花,烟花',
       updated_at = CURRENT_TIMESTAMP
 WHERE rule_name = '爆炸品與煙火類禁運'
   AND (keywords IS NULL OR keywords = '');

UPDATE shipping_restrictions
   SET keywords = '易燃,易爆,氣體,气体,液體,液体,高壓噴霧,高压喷雾,噴霧,喷雾,打火機,打火机,酒精,汽油',
       updated_at = CURRENT_TIMESTAMP
 WHERE rule_name = '易燃易爆氣體與液體禁運'
   AND (keywords IS NULL OR keywords = '');

UPDATE shipping_restrictions
   SET keywords = '腐蝕,腐蚀,毒害,放射性,危險化學品,危险化学品,強酸,强酸,強鹼,强碱,農藥,农药',
       updated_at = CURRENT_TIMESTAMP
 WHERE rule_name = '腐蝕性毒害性放射性物品禁運'
   AND (keywords IS NULL OR keywords = '');

UPDATE shipping_restrictions
   SET keywords = '武器,仿真武器,管制刀具,警械,刀,槍,枪,弓弩',
       updated_at = CURRENT_TIMESTAMP
 WHERE rule_name = '武器與管制刀具禁運'
   AND (keywords IS NULL OR keywords = '');

UPDATE shipping_restrictions
   SET keywords = '違禁藥,违禁药,受管制藥物,受管制药物,毒品,麻醉藥,麻醉药',
       updated_at = CURRENT_TIMESTAMP
 WHERE rule_name = '違禁藥品與受管制藥物禁運'
   AND (keywords IS NULL OR keywords = '');

UPDATE shipping_restrictions
   SET keywords = '現金,现金,有價證券,有价证券,票據,票据,支票,流通貨幣,流通货币',
       updated_at = CURRENT_TIMESTAMP
 WHERE rule_name = '現金票據貴重流通物禁運'
   AND (keywords IS NULL OR keywords = '');

UPDATE shipping_restrictions
   SET keywords = '活體動物,活体动物,活體植物,活体植物,種子,种子,土壤,泥土,檢疫,检疫',
       updated_at = CURRENT_TIMESTAMP
 WHERE rule_name = '活體動植物與土壤類禁運'
   AND (keywords IS NULL OR keywords = '');
