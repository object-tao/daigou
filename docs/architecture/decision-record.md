# 架構決策記錄

## ADR-001: Cloudflare Workers + Assets + D1

日期：2026-06-18

決策：使用 Cloudflare Workers 提供 API，Workers Assets 托管 H5 靜態資源，D1 作為首期關係型資料庫。

原因：

- 使用 Cloudflare 可貼近香港、日本等目標市場。
- H5 和 API 可同域部署，減少跨域與部署複雜度。
- D1 使用 SQL migration 管理 schema，適合首期結構化訂單、會員、倉儲和財務資料。
- 後續可加入 R2 存放身份圖片、付款憑證、商品圖片和包裹照片。

限制：

- 真實支付、物流追蹤、郵件和 WhatsApp 都需要第三方服務憑證。
- D1 不適合大規模分析報表，後續可把操作與業務事件同步到獨立分析倉。

## ADR-002: 文檔與運行代碼物理隔離

日期：2026-06-18

決策：產品與運維文檔放在 `docs/`，資料庫遷移放在 `migrations/`，前端放在 `src/app/`，Worker API 放在 `src/worker/`。

原因：

- 避免需求文檔進入運行包。
- 後續可以把 `docs/` 設為獨立權限或獨立倉庫同步源。
- 開發、部署和審計邊界清晰。
