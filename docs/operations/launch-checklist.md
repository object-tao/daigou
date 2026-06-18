# DropPilot 上線授權清單

## 必做

| 項目 | 你需要做的事 | 腳本是否自動 |
| --- | --- | --- |
| Cloudflare Account | 確認 `droppilot.net` 已在 Cloudflare 帳號內 | 不可自動 |
| Cloudflare API Token | 在 Cloudflare 建立部署 Token | 不可自動 |
| D1 Database | 建立 `droppilot-db` 並回填 ID | 可自動 |
| GitHub Secrets | 寫入 `CLOUDFLARE_API_TOKEN`、`CLOUDFLARE_ACCOUNT_ID` | 可自動，需 GitHub 登入 |
| Custom Domains | 綁定 `droppilot.net`、`www.droppilot.net` | 可自動，取決於 Token 權限 |
| Remote Migrations | 套用 D1 migrations | 可自動 |
| Worker Deploy | 部署 Cloudflare Worker | 可自動 |

## 推薦方式

```powershell
npm run setup:production
```

這是首選流程。腳本會在需要授權時停下來讓你登入或輸入 Token，其餘步驟自動完成。

## 手動備援

如果自動腳本某一步失敗，可分段執行：

```powershell
npm ci
npm run check:requirements
npm run build
npm run db:migrate:remote
npm run deploy
```

GitHub Actions Secrets 手動位置：

`GitHub repo -> Settings -> Secrets and variables -> Actions -> New repository secret`

需要新增：

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## 上線前檢查

- `npm run check:requirements` 通過。
- `npm run build` 通過。
- `npx wrangler deploy --dry-run` 通過。
- 遠端 D1 migrations 已套用。
- `/api/health` 返回 `ok: true`。
- `droppilot.net` 和 `www.droppilot.net` 都能打開。

## 第二階段再接

| 能力 | 建議服務 | 用途 |
| --- | --- | --- |
| Email 通知 | Resend、SendGrid、MailChannels 或 Cloudflare Email Workers | 訂單、付款、出入庫、售後通知 |
| WhatsApp 通知 | WhatsApp Business Platform | 付費附加提醒 |
| 私有圖片 | Cloudflare R2 | 付款憑證、商品圖、包裹照片 |
| 線上付款 | AlipayHK、微信、信用卡 | 充值與付款 |
| OCR/以圖搜圖 | Cloudflare Workers AI、Google Vision 或第三方 | 圖片搜索與商品識別 |
