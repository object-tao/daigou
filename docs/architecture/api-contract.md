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
  - 已確認 MVP 業務規則 `confirmedBusinessRules`。
  - 可配置服務費規則 `serviceFeeRules`。
  - 箱型固定紙箱費 `cartonTypes`。
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
- 已確認規則示例：
  - 會員以 email 註冊，MVP 不做 KYC。
  - 第一版語言為 `zh-Hant`、`en`、`ja`，預設 `zh-Hant`。
  - 代購需 `full_payment_before_purchase`，未採購可取消，已採購不可取消。
  - 合箱後不允許拆箱重組，字段為 `repackAfterConsolidationAllowed=false`。
  - 物流計費取實重與體積重較高者，字段為 `greater_of_actual_or_volumetric`。
  - 倉庫角色不可查看財務資料，字段為 `warehouseCanViewFinanceData=false`。

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

- `POST /api/procurement/orders/:id/pay`
- 用途：會員用港幣餘額全額支付已報價代購訂單。
- 規則：按最新人工 JPY/HKD 匯率折算商品與日本本地運費，再加服務費；餘額不足時拒絕，不能產生負餘額。
- 寫入：`wallets`、`procurement_orders`、`financial_ledger_entries`、`audit_logs`。
- 狀態：`pending_payment` -> `pending_purchase`。

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

- `POST /api/admin/procurement/orders/:id/mark-purchased`
- 用途：後台標記代購訂單已完成日本採購，並自動生成入庫預報包裹。
- 可選：`japanTrackingNo`、`warehouseId`、`remarks`。
- 寫入：`procurement_orders`、`inbound_packages`、`procurement_order_packages`、`package_identifiers`、`audit_logs`。
- 狀態：`pending_purchase` 或 `purchasing` -> `purchased`，包裹狀態為 `pending_inbound`。

- `POST /api/admin/payments/:id/approve`
- 用途：財務審核銀行轉帳充值，入帳到會員港幣餘額。
- 寫入：`payment_requests`、`wallets`、`financial_ledger_entries`、`audit_logs`。

- `POST /api/admin/warehouse/inbound-packages`
- 用途：倉庫人員登記日本包裹入庫；有會員 ID 時自動標記已識別，無會員 ID 時進入無主包裹池。
- 必填：`trackingNo`。
- 可選：`memberId`、`warehouseId`、`weightGram`、`volumeCm3`。
- 寫入：`inbound_packages`、`warehouse_scan_events`、`package_identifiers`、`audit_logs`。

- `POST /api/admin/shipments`
- 用途：後台將一個或多個已識別包裹建立為合箱發貨單。
- 必填：`packageIds`、`lineCode`。
- 可選：`cartonFeeHkd`、`freightFeeHkd`。
- 寫入：`shipments`、`shipment_packages`、`logistics_tracking_events`、`audit_logs`。

- `POST /api/admin/shipments/:id/tracking-events`
- 用途：自建物流線路追加物流節點並同步發貨單狀態。
- 必填：`status`、`description`。
- 可選：`location`、`occurredAt`、`trackingNo`。
- 寫入：`logistics_tracking_events`、`shipments`、`audit_logs`。

## 物流

- `GET /api/logistics/lines`
- 來源：共享領域模型。
- 後續可切換至 D1 `logistics_channel_configs`。
