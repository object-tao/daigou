# 本地資料初始化

## 目的

本地開發需要一組可重複建立的 demo 資料，讓會員端、後台摘要、訂單列表和倉庫流程不只依賴硬編碼。

## 命令

```bash
npm run db:migrate:local
```

目前 migrations 包含：

- `0001_initial_schema.sql`：核心會員、財務、代購、代拍、倉儲、售後表。
- `0002_operational_modules.sql`：購物車、會員等級、積分、佣金、團購、通知、多語、字典、物流軌跡、優惠券。
- `0003_seed_demo_data.sql`：demo 會員、角色、員工、錢包、訂單、包裹、付款審核、售後審核。

## API 資料來源

Worker API 會先讀 D1：

- `/api/member/me`
- `/api/member/orders`
- `/api/admin/summary`

如果 D1 尚未初始化或查詢失敗，API 會回退到 `src/shared/domain.ts` 的示例資料，方便前端在純 Vite 模式下繼續開發。

## 遠端環境

遠端首次部署前要先把 `wrangler.jsonc` 的 D1 `database_id` 改成 Cloudflare 真實 ID，再執行：

```bash
npm run db:migrate:remote
```
