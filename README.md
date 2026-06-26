# DropPilot 代購模組

本倉庫目前只重建「代購模組」：會員提交代購需求，後台報價，會員用餘額付款，後台標記已採購。

## 功能範圍

- 會員資料與錢包餘額。
- 會員提交代購訂單。
- 會員查看代購訂單。
- 會員取消未採購訂單。
- 後台查看全部代購訂單。
- 後台提交報價。
- 會員確認付款並扣減餘額。
- 後台標記已採購。
- 關鍵操作寫入審計日志。

## 狀態流

```text
pending_quote -> quoted -> paid -> purchased
                    \         \
                     \         -> cancelled
                      -> cancelled
```

## 本地啟動

```bash
npm install
npm run build
npm run db:migrate:local
npx wrangler dev --local --ip 127.0.0.1 --port 8787
```

打開：

```text
http://127.0.0.1:8787/
```

## API

會員端：

- `GET /api/member/profile`
- `GET /api/procurement/orders`
- `POST /api/procurement/orders`
- `POST /api/procurement/orders/:id/pay`
- `POST /api/procurement/orders/:id/cancel`

後台端：

- `GET /api/admin/procurement/orders`
- `POST /api/admin/procurement/orders/:id/quote`
- `POST /api/admin/procurement/orders/:id/mark-purchased`

## 資料表

- `members`
- `wallets`
- `procurement_orders`
- `audit_logs`

## 部署提醒

`wrangler.jsonc` 內的 D1 `database_id` 仍是占位值。正式部署前需要替換成 Cloudflare 上 `droppilot-db` 的真實 ID，然後執行：

```bash
npm run db:migrate:remote
npm run deploy
```
