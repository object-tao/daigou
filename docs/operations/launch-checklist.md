# DropPilot 上線授權清單

## 必做授權

| 項目 | 你需要做的事 | 交付給開發的值 |
| --- | --- | --- |
| Cloudflare Account | 確認 `droppilot.net` 已在 Cloudflare 帳號內 | Account ID |
| Cloudflare API Token | 建立 Workers Scripts Edit、D1 Edit、Account Read、Zone Read 權限 Token | `CLOUDFLARE_API_TOKEN` |
| GitHub Secrets | 在 `object-tao/daigou` 加入部署 secrets | `CLOUDFLARE_API_TOKEN`、`CLOUDFLARE_ACCOUNT_ID` |
| D1 Database | 建立 `droppilot-db` | `database_id`，回填到 `wrangler.jsonc` |
| Custom Domain | 將 `droppilot.net`、`www.droppilot.net` 指向 `droppilot` Worker | 域名綁定完成截圖或確認 |

## 首次遠端部署命令

```bash
npm ci
npm run build
npm run db:migrate:remote
npm run deploy
```

GitHub Actions 會在 `main` 分支推送後自動執行同等流程。

## 第二階段憑證

| 能力 | 建議服務 | 用途 |
| --- | --- | --- |
| 郵件通知 | Resend、SendGrid、MailChannels 或 Cloudflare Email Workers | 訂單、付款、出入庫、售後通知 |
| WhatsApp 通知 | WhatsApp Business Platform | 付費附加提醒 |
| 私有圖片 | Cloudflare R2 | 身份證、付款憑證、商品圖、包裹照片 |
| 付款 | 銀行轉帳先行，後續 AlipayHK、微信、信用卡 | 充值與支付 |
| OCR/以圖搜圖 | Cloudflare Workers AI、Google Vision 或第三方 | 圖片搜索與商品識別 |

## 上線前檢查

- `npm run build` 通過。
- `npx wrangler deploy --dry-run` 通過。
- 遠端 D1 migrations 已全部 apply。
- `/api/health` 返回 `ok: true`。
- H5 首屏在手機與桌面尺寸可讀。
- 後台操作日誌、付款審核、匯率設定不可繞過人工審核。
- 隱私政策覆蓋香港 PDPO、日本個人資料保護與圖片保存用途。
