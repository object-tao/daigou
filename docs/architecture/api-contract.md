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

## 會員寫入動作

- `POST /api/procurement/orders`
- 用途：會員提交人工代購需求，狀態進入 `pending_quote`。
- 必填：`platform`、`productUrl`、`title`、`quantity`。
- 寫入：`procurement_orders`、`audit_logs`。
- H5 接入：會員提交入口的「人工代購」表單。

- `POST /api/payments/bank-transfer-requests`
- 用途：會員提交銀行轉帳充值申請，等待財務人工審核。
- 必填：`amountHkd`。
- 可選：`proofUrl`。
- 寫入：`payment_requests`、`audit_logs`。
- H5 接入：會員提交入口的「銀行轉帳充值」表單。

- `POST /api/support/tickets`
- 用途：會員提交客服工單，支持售後、補款、退款、查件、包裹異常、商品損壞、少件漏件。
- 必填：`ticketType`、`subject`、`description`。
- 可選：`relatedType`、`relatedId`、`priority`。
- 寫入：`support_tickets`、`audit_logs`。
- H5 接入：會員提交入口的「客服工單」表單。

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

## 後台寫入動作

- `POST /api/admin/procurement/orders/:id/quote`
- 用途：客服或管理員對人工代購訂單報價，訂單進入 `pending_payment`。
- 必填：`itemAmountJpy`。
- 可選：`localShippingJpy`、`serviceFeeHkd`、`remarks`。
- 寫入：`procurement_orders`、`audit_logs`。

- `POST /api/admin/payments/:id/approve`
- 用途：財務審核銀行轉帳充值，入帳到會員港幣餘額。
- 寫入：`payment_requests`、`wallets`、`financial_ledger_entries`、`audit_logs`。

## 物流

- `GET /api/logistics/lines`
- 來源：共享領域模型。
- 後續可切換至 D1 `logistics_channel_configs`。
