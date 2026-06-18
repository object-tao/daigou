# DropPilot Cloudflare 自動部署

## 你只需要先準備兩個授權

1. Cloudflare Account ID。
2. Cloudflare API Token。

API Token 建議權限：

- Account: Workers Scripts Edit
- Account: D1 Edit
- Account: Account Settings Read
- Zone: Zone Read
- Zone: Workers Routes Edit 或 Workers Custom Domains Edit

如果要讓腳本自動寫入 GitHub Actions Secrets，還需要登入 GitHub CLI。腳本會檢查本機是否安裝 `gh`，未安裝時可用 `winget` 自動安裝。

## 一鍵首次上線

在專案根目錄執行：

```powershell
npm run setup:production
```

腳本會自動完成：

- 驗證 Cloudflare Token。
- 建立或復用 D1 database：`droppilot-db`。
- 回填 `wrangler.jsonc` 的 `database_id`。
- 安裝依賴、執行需求校驗、執行 build。
- 套用遠端 D1 migrations。
- 部署 Worker。
- 綁定 `droppilot.net` 與 `www.droppilot.net`。
- 寫入 GitHub Actions Secrets：
  - `CLOUDFLARE_API_TOKEN`
  - `CLOUDFLARE_ACCOUNT_ID`
- 觸發 GitHub Actions 部署流程。

## 可選參數

```powershell
powershell -ExecutionPolicy Bypass -File scripts/setup-production.ps1 `
  -CloudflareAccountId "你的 account id" `
  -CloudflareApiToken "你的 token"
```

跳過 GitHub Secrets：

```powershell
powershell -ExecutionPolicy Bypass -File scripts/setup-production.ps1 -SkipGitHubSecrets
```

跳過即時部署，只做設定和檢查：

```powershell
powershell -ExecutionPolicy Bypass -File scripts/setup-production.ps1 -SkipDeploy
```

## 首次上線後

如果腳本更新了 `wrangler.jsonc` 的 D1 `database_id`，需要提交並推送：

```powershell
git add wrangler.jsonc
git commit -m "configure production D1 database"
git push origin main
```

之後每次推送 `main`，GitHub Actions 會自動：

1. 安裝依賴。
2. 執行需求覆蓋校驗。
3. build H5 和 Worker。
4. 套用 D1 migrations。
5. 部署到 Cloudflare。

## 驗證

部署後檢查：

```powershell
Invoke-WebRequest https://droppilot.net/api/health
```

預期返回包含：

```json
{
  "ok": true,
  "service": "droppilot",
  "domain": "droppilot.net"
}
```
