import json
import sys
import urllib.request
from http.cookiejar import CookieJar


BASE_URL = "http://127.0.0.1:8787"


RULES = [
    {
        "ruleName": "爆炸品與煙火類禁運",
        "scopeType": "global",
        "restrictionType": "prohibited",
        "cargoCategories": ["special"],
        "keywords": "爆炸品,煙花,爆竹,火藥,彈藥,引信,雷管",
        "customerMessage": "爆炸品、煙火、火藥及彈藥類物品禁止寄運。",
        "internalNote": "行業通用危險品禁運規則",
        "status": "active",
    },
    {
        "ruleName": "易燃易爆氣體與液體禁運",
        "scopeType": "global",
        "restrictionType": "prohibited",
        "cargoCategories": ["special"],
        "keywords": "汽油,酒精,打火機油,噴霧,瓦斯,煤氣罐,油漆,稀釋劑",
        "customerMessage": "易燃易爆氣體、液體及高壓噴霧類物品禁止寄運。",
        "internalNote": "行業通用危險品禁運規則",
        "status": "active",
    },
    {
        "ruleName": "腐蝕性毒害性放射性物品禁運",
        "scopeType": "global",
        "restrictionType": "prohibited",
        "cargoCategories": ["special"],
        "keywords": "強酸,強鹼,腐蝕,農藥,毒性,放射性,危險化學品",
        "customerMessage": "腐蝕性、毒害性、放射性及危險化學品禁止寄運。",
        "internalNote": "行業通用危險品禁運規則",
        "status": "active",
    },
    {
        "ruleName": "武器與管制刀具禁運",
        "scopeType": "global",
        "restrictionType": "prohibited",
        "cargoCategories": ["branded", "special"],
        "keywords": "槍,仿真槍,彈弓,弩,刀具,管制刀具,警械,電擊器",
        "customerMessage": "武器、仿真武器、管制刀具及警械類物品禁止寄運。",
        "internalNote": "行業通用禁運規則",
        "status": "active",
    },
    {
        "ruleName": "違禁藥品與受管制藥物禁運",
        "scopeType": "global",
        "restrictionType": "prohibited",
        "cargoCategories": ["special"],
        "keywords": "毒品,麻醉藥,精神藥品,處方藥,違禁藥,大麻",
        "customerMessage": "違禁藥品、受管制藥物及無法合規申報的藥品禁止寄運。",
        "internalNote": "行業通用禁運規則",
        "status": "active",
    },
    {
        "ruleName": "現金票據貴重流通物禁運",
        "scopeType": "global",
        "restrictionType": "prohibited",
        "cargoCategories": ["special"],
        "keywords": "現金,支票,匯票,有價證券,彩票,金條,金幣,流通貨幣",
        "customerMessage": "現金、有價證券、票據及流通貴重物品禁止寄運。",
        "internalNote": "高風險財物禁運規則",
        "status": "active",
    },
    {
        "ruleName": "活體動植物與土壤類禁運",
        "scopeType": "global",
        "restrictionType": "prohibited",
        "cargoCategories": ["special"],
        "keywords": "活體動物,昆蟲,植物,種子,土壤,標本,動物屍體",
        "customerMessage": "活體動植物、種子、土壤及相關檢疫高風險物品禁止寄運。",
        "internalNote": "檢疫類禁運規則",
        "status": "active",
    },
    {
        "ruleName": "帶電池商品需人工審核",
        "scopeType": "global",
        "restrictionType": "review_required",
        "cargoCategories": ["battery"],
        "keywords": "鋰電池,充電寶,電池,內置電池,電子煙,行動電源",
        "customerMessage": "帶電池商品需客服人工確認可寄渠道及包裝要求。",
        "internalNote": "帶電商品不一刀切禁運，按渠道產品確認。",
        "status": "active",
    },
    {
        "ruleName": "液體粉末食品化妝品需人工審核",
        "scopeType": "global",
        "restrictionType": "review_required",
        "cargoCategories": ["special"],
        "keywords": "液體,粉末,食品,飲料,保健品,化妝品,香水,護膚品",
        "customerMessage": "液體、粉末、食品及化妝品需人工審核後確認可寄渠道。",
        "internalNote": "特貨先進入審核，後續按專線細分。",
        "status": "active",
    },
    {
        "ruleName": "仿牌與品牌敏感貨需人工審核",
        "scopeType": "global",
        "restrictionType": "review_required",
        "cargoCategories": ["branded"],
        "keywords": "仿牌,高仿,品牌敏感,商標,侵權,奢侈品",
        "customerMessage": "品牌敏感或疑似仿牌商品需人工審核後確認是否可寄。",
        "internalNote": "品牌/侵權風險審核規則。",
        "status": "active",
    },
]


def request(opener, path, payload=None):
    data = None if payload is None else json.dumps(payload, ensure_ascii=False).encode("utf-8")
    req = urllib.request.Request(
        f"{BASE_URL}{path}",
        data=data,
        headers={"Accept": "application/json", "Content-Type": "application/json"},
    )
    with opener.open(req) as response:
        body = response.read().decode("utf-8")
        return json.loads(body) if body else {}


def main():
    opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(CookieJar()))
    request(opener, "/api/auth/login", {"mode": "admin", "email": "admin@droppilot.net", "password": "admin123456"})
    payload = request(opener, "/api/admin/logistics/restrictions")

    for item in payload.get("items", []):
        if "?" in item.get("ruleName", "") or item.get("ruleName") in {rule["ruleName"] for rule in RULES}:
            request(opener, f"/api/admin/logistics/restrictions/{item['id']}/delete", {})

    created = []
    for rule in RULES:
        result = request(opener, "/api/admin/logistics/restrictions", rule)
        created.append(result["item"]["ruleName"])

    print(json.dumps(created, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        raise
