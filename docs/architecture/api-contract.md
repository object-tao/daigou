# DropPilot API 合同

## 健康檢查

- `GET /api/health`
- 用途：部署與監控檢查。

## 基礎配置

- `GET /api/config`
- 來源：共享領域模型。
- 包含：語言、市場、幣種、功能開關。

## 服務藍圖

- `GET /api/catalog/service-blueprint`
- 來源：共享領域模型。
- 包含：代購平台、代拍平台、增值服務、通知渠道、會員等級、積分、團購規則。

## 運營規則

- `GET /api/catalog/operational-rules`
- 來源：優先 D1，失敗時回退共享領域模型。
- 包含：
  - 代購與集運狀態。
  - 包裹多編號規則。
  - 日本本地運費補收規則。
  - 合箱配置。
  - 自建物流線路配置。
  - 自動扣款規則。
  - 客服工單類型。
  - 倉庫掃碼步驟。
  - 財務流水分桶。
  - SEO 欄位。

## 會員

- `GET /api/member/me`
- 來源：D1 `members`、`wallets`、`member_tags`、`points_ledger`、`notification_preferences`。

- `GET /api/member/orders`
- 來源：D1 `procurement_orders`、`auction_orders`、`inbound_packages`、`warehouses`。

## 後台

- `GET /api/admin/roles`
- 來源：共享領域模型。

- `GET /api/admin/workflows`
- 來源：共享領域模型。

- `GET /api/admin/summary`
- 來源：D1 聚合查詢。
- 包含：待報價、代拍、入庫包裹、無主包裹、退款審核、增值服務、銀行轉帳等計數。

- `GET /api/admin/work-queue`
- 來源：D1 `support_tickets`、`warehouse_scan_events`、`financial_ledger_entries`、`seo_entries`。
- 用途：後台首頁展示客服、倉庫、財務、SEO 的待處理工作。

## 物流

- `GET /api/logistics/lines`
- 來源：共享領域模型。
- 後續可切換至 D1 `logistics_channel_configs`。
