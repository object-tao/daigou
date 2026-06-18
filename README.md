# DropPilot

日本代購、Yahoo 代拍、集運、會員推薦與營運後台系統。

## 開發

```bash
npm install
npm run dev
```

## 構建

```bash
npm run build
```

## Cloudflare

```bash
npm run db:migrate:local
npm run worker:dev
npm run deploy
```

部署前請先閱讀 `docs/operations/cloudflare-setup.md`。

## 本地資料

```bash
npm run db:migrate:local
```

遷移會建立 D1 schema，並插入一組 demo 會員、訂單、包裹、角色、付款審核與售後資料。Worker API 會優先讀 D1；若本地資料庫未初始化，則回退到 `src/shared/domain.ts` 的示例資料。
