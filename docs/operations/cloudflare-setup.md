# Cloudflare 部署設置

## 你需要準備

1. Cloudflare 帳號已接管 `droppilot.net`。
2. 建立 D1 database：`droppilot-db`。
3. 將 D1 產生的 database id 填入 `wrangler.jsonc` 的 `database_id`。
4. 建立 API Token，權限至少包含 Workers Scripts Edit、D1 Edit，以及 Account/Zone 讀取權限。
5. 在 GitHub repository secrets 加入：
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`

## 首次部署

```bash
npm install
npm run build
npm run db:migrate:remote
npm run deploy
```

## 域名

在 Cloudflare Workers Routes 或 Custom Domains 將 `droppilot.net` 和 `www.droppilot.net` 指向 `droppilot` Worker。

## 目前未自動化的部分

- Cloudflare API Token 需要你在 Cloudflare 後台建立。
- GitHub Secrets 需要你授權或手動填入。
- D1 database id 需要在建立後回填。
