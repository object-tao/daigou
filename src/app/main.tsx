import React, { type FormEvent, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Bell,
  Boxes,
  ChartNoAxesCombined,
  CircleDollarSign,
  ClipboardList,
  FileText,
  Gavel,
  Globe2,
  Home,
  Languages,
  LockKeyhole,
  PackageCheck,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  TicketPercent,
  Truck,
  Users,
  WalletCards
} from "lucide-react";
import {
  adminMetrics,
  adminSummary as fallbackAdminSummary,
  demoOrders,
  packageNumberRules,
  roleMatrix,
  seoFields,
  serviceBlueprint,
  supportTicketTypes,
  warehouseScanSteps,
  type MemberOrder,
  type Metric
} from "../shared/domain";
import "./styles.css";

type AppMode = "member" | "admin";

type MenuItem = {
  id: string;
  label: string;
  icon: typeof Home;
};

type WorkQueue = {
  tickets: Array<{ id: string; type: string; status: string; priority: string; subject: string }>;
  scans: Array<{ id: string; packageId: string; step: string; code: string; location: string | null }>;
  ledger: Array<{ id: string; bucket: string; direction: string; amountHkd: number; amountJpy: number; source: string }>;
  seo: Array<{ entityType: string; entityId: string; locale: string; title: string; urlSlug: string }>;
  shipments: Array<{
    id: string;
    lineCode: string;
    status: string;
    trackingNo: string | null;
    packageCount: number;
  }>;
  trackingEvents: Array<{
    id: string;
    shipmentId: string;
    status: string;
    location: string | null;
    description: string;
  }>;
};

const emptyWorkQueue: WorkQueue = {
  tickets: [],
  scans: [],
  ledger: [],
  seo: [],
  shipments: [],
  trackingEvents: []
};

const memberMenus: MenuItem[] = [
  { id: "member-home", label: "首頁", icon: Home },
  { id: "member-procurement", label: "人工代購", icon: ShoppingCart },
  { id: "member-wallet", label: "充值與餘額", icon: WalletCards },
  { id: "member-packages", label: "我的包裹", icon: Boxes },
  { id: "member-shipments", label: "我的物流", icon: Truck },
  { id: "member-support", label: "客服工單", icon: ClipboardList }
];

const adminMenus: MenuItem[] = [
  { id: "admin-dashboard", label: "工作台", icon: ChartNoAxesCombined },
  { id: "admin-quotes", label: "代購報價", icon: ShoppingCart },
  { id: "admin-purchasing", label: "採購處理", icon: PackageCheck },
  { id: "admin-inbound", label: "入庫登記", icon: Boxes },
  { id: "admin-consolidation", label: "合箱出庫", icon: Truck },
  { id: "admin-tracking", label: "物流節點", icon: Globe2 },
  { id: "admin-finance", label: "財務審核", icon: CircleDollarSign },
  { id: "admin-roles", label: "角色權限", icon: Users },
  { id: "admin-content", label: "多語與 SEO", icon: Languages },
  { id: "admin-rules", label: "基礎規則", icon: Settings }
];

const memberFlows = [
  { icon: ShoppingCart, title: "人工代購", text: "會員提交商品連結，客服報價後由會員用港幣餘額付款。" },
  { icon: Gavel, title: "Yahoo 代拍", text: "先以人工代拍為主，會員設定最高出價與授權範圍。" },
  { icon: Boxes, title: "集運合箱", text: "包裹到日本倉後可選擇合箱、紙箱、加強包裝等服務。" },
  { icon: Truck, title: "自建物流", text: "展示自建線路、禁運品、計費規則與物流追蹤節點。" }
];

async function loadJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(path, { headers: { Accept: "application/json" } });

    if (!response.ok) {
      return fallback;
    }

    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}

async function postJson<T>(path: string, body: Record<string, unknown>): Promise<T> {
  const response = await fetch(path, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  const payload = (await response.json()) as T | { error?: string };

  if (!response.ok) {
    const errorPayload = payload as { error?: string };
    throw new Error(errorPayload.error ?? "提交失敗");
  }

  return payload as T;
}

function App() {
  const [mode, setMode] = useState<AppMode>("member");
  const [activeMenu, setActiveMenu] = useState("member-home");
  const [metrics, setMetrics] = useState<Metric[]>(adminMetrics);
  const [orders, setOrders] = useState<MemberOrder[]>(demoOrders);
  const [operations, setOperations] = useState<string[]>(fallbackAdminSummary.operations);
  const [workQueue, setWorkQueue] = useState<WorkQueue>(emptyWorkQueue);
  const [notice, setNotice] = useState("Ready");
  const [submitting, setSubmitting] = useState(false);

  const menus = mode === "member" ? memberMenus : adminMenus;

  function switchMode(nextMode: AppMode) {
    setMode(nextMode);
    setActiveMenu(nextMode === "member" ? "member-home" : "admin-dashboard");
  }

  async function refreshData() {
    const [summary, orderPayload, queuePayload] = await Promise.all([
      loadJson<{ counters: typeof fallbackAdminSummary.counters; operations: string[] }>(
        "/api/admin/summary",
        fallbackAdminSummary
      ),
      loadJson<{ items: MemberOrder[] }>("/api/member/orders", { items: demoOrders }),
      loadJson<WorkQueue>("/api/admin/work-queue", emptyWorkQueue)
    ]);

    setMetrics([
      { label: "待報價", value: String(summary.counters.pendingQuotes), tone: "amber" },
      { label: "代拍中", value: String(summary.counters.auctionBids), tone: "blue" },
      { label: "入庫包裹", value: String(summary.counters.inboundPackages), tone: "green" },
      { label: "退款審核", value: String(summary.counters.refundReviews), tone: "red" }
    ]);
    setOperations(summary.operations);
    setOrders(orderPayload.items);
    setWorkQueue(queuePayload);
  }

  useEffect(() => {
    void refreshData();
  }, []);

  async function handleForm<T>(
    event: FormEvent<HTMLFormElement>,
    busyText: string,
    callback: (form: FormData) => Promise<T>,
    success: (result: T) => string
  ) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    setSubmitting(true);
    setNotice(busyText);

    try {
      const result = await callback(form);
      setNotice(success(result));
      formElement.reset();
      await refreshData();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "提交失敗");
    } finally {
      setSubmitting(false);
    }
  }

  function submitProcurement(event: FormEvent<HTMLFormElement>) {
    void handleForm(
      event,
      "Submitting procurement order...",
      (form) =>
        postJson<{ id: string; status: string }>("/api/procurement/orders", {
          platform: String(form.get("platform") ?? ""),
          productUrl: String(form.get("productUrl") ?? ""),
          title: String(form.get("title") ?? ""),
          quantity: Number(form.get("quantity") ?? 1),
          remarks: String(form.get("remarks") ?? "")
        }),
      (result) => `代購訂單已提交：${result.id}`
    );
  }

  function submitPayment(event: FormEvent<HTMLFormElement>) {
    void handleForm(
      event,
      "Submitting bank transfer request...",
      (form) =>
        postJson<{ id: string; status: string }>("/api/payments/bank-transfer-requests", {
          amountHkd: Number(form.get("amountHkd") ?? 0),
          proofUrl: String(form.get("proofUrl") ?? "")
        }),
      (result) => `充值申請已提交：${result.id}`
    );
  }

  function submitTicket(event: FormEvent<HTMLFormElement>) {
    void handleForm(
      event,
      "Submitting support ticket...",
      (form) =>
        postJson<{ id: string; status: string }>("/api/support/tickets", {
          ticketType: String(form.get("ticketType") ?? ""),
          subject: String(form.get("subject") ?? ""),
          description: String(form.get("description") ?? ""),
          relatedType: String(form.get("relatedType") ?? ""),
          relatedId: String(form.get("relatedId") ?? "")
        }),
      (result) => `客服工單已提交：${result.id}`
    );
  }

  function submitProcurementPayment(event: FormEvent<HTMLFormElement>) {
    void handleForm(
      event,
      "Paying procurement order...",
      (form) => {
        const orderId = String(form.get("orderId") ?? "").trim();
        return postJson<{ id: string; payableHkd: number; balanceAfterHkd: number }>(
          `/api/procurement/orders/${encodeURIComponent(orderId)}/pay`,
          {}
        );
      },
      (result) => `代購已付款：${result.id}，扣款 HKD ${result.payableHkd}，餘額 HKD ${result.balanceAfterHkd}`
    );
  }

  function submitQuote(event: FormEvent<HTMLFormElement>) {
    void handleForm(
      event,
      "Quoting procurement order...",
      (form) => {
        const orderId = String(form.get("orderId") ?? "").trim();
        return postJson<{ id: string; status: string }>(`/api/admin/procurement/orders/${encodeURIComponent(orderId)}/quote`, {
          itemAmountJpy: Number(form.get("itemAmountJpy") ?? 0),
          localShippingJpy: Number(form.get("localShippingJpy") ?? 0),
          serviceFeeHkd: Number(form.get("serviceFeeHkd") ?? 0),
          remarks: String(form.get("remarks") ?? "")
        });
      },
      (result) => `代購已報價：${result.id}`
    );
  }

  function submitProcurementPurchased(event: FormEvent<HTMLFormElement>) {
    void handleForm(
      event,
      "Marking procurement order purchased...",
      (form) => {
        const orderId = String(form.get("orderId") ?? "").trim();
        return postJson<{ id: string; packageId: string }>(
          `/api/admin/procurement/orders/${encodeURIComponent(orderId)}/mark-purchased`,
          {
            japanTrackingNo: String(form.get("japanTrackingNo") ?? ""),
            warehouseId: String(form.get("warehouseId") ?? "warehouse-funabashi"),
            remarks: String(form.get("remarks") ?? "")
          }
        );
      },
      (result) => `代購已採購：${result.id}，入庫預報 ${result.packageId}`
    );
  }

  function submitInboundPackage(event: FormEvent<HTMLFormElement>) {
    void handleForm(
      event,
      "Receiving inbound package...",
      (form) =>
        postJson<{ id: string; ownerStatus: string }>("/api/admin/warehouse/inbound-packages", {
          memberId: String(form.get("memberId") ?? ""),
          warehouseId: String(form.get("warehouseId") ?? "warehouse-funabashi"),
          trackingNo: String(form.get("trackingNo") ?? ""),
          weightGram: Number(form.get("weightGram") ?? 0),
          volumeCm3: Number(form.get("volumeCm3") ?? 0)
        }),
      (result) => `入庫包裹已建立：${result.id} / ${result.ownerStatus}`
    );
  }

  function submitShipment(event: FormEvent<HTMLFormElement>) {
    void handleForm(
      event,
      "Creating shipment...",
      (form) =>
        postJson<{ id: string; packageCount: number }>("/api/admin/shipments", {
          packageIds: String(form.get("packageIds") ?? ""),
          lineCode: String(form.get("lineCode") ?? ""),
          cartonFeeHkd: Number(form.get("cartonFeeHkd") ?? 0),
          freightFeeHkd: Number(form.get("freightFeeHkd") ?? 0)
        }),
      (result) => `發貨單已建立：${result.id}，包裹 ${result.packageCount} 件`
    );
  }

  function submitTrackingEvent(event: FormEvent<HTMLFormElement>) {
    void handleForm(
      event,
      "Adding tracking event...",
      (form) => {
        const shipmentId = String(form.get("shipmentId") ?? "").trim();
        return postJson<{ id: string; shipmentStatus: string }>(
          `/api/admin/shipments/${encodeURIComponent(shipmentId)}/tracking-events`,
          {
            status: String(form.get("status") ?? ""),
            location: String(form.get("location") ?? ""),
            description: String(form.get("description") ?? ""),
            trackingNo: String(form.get("trackingNo") ?? "")
          }
        );
      },
      (result) => `物流節點已新增：${result.id}，發貨單狀態 ${result.shipmentStatus}`
    );
  }

  function submitPaymentApproval(event: FormEvent<HTMLFormElement>) {
    void handleForm(
      event,
      "Approving bank transfer...",
      (form) => {
        const paymentId = String(form.get("paymentId") ?? "").trim();
        return postJson<{ id: string; balanceAfterHkd: number }>(`/api/admin/payments/${encodeURIComponent(paymentId)}/approve`, {});
      },
      (result) => `銀行轉帳已入帳：${result.id}，餘額 HKD ${result.balanceAfterHkd}`
    );
  }

  function renderMemberPage() {
    switch (activeMenu) {
      case "member-procurement":
        return (
          <section className="page-grid">
            <Panel eyebrow="Procurement" title="人工代購下單" icon={ShoppingCart}>
              <FormGrid>
                <form onSubmit={submitProcurement}>
                  <h3>提交代購需求</h3>
                  <input name="platform" placeholder="平台，例如 Mercari" required />
                  <input name="productUrl" placeholder="商品 URL" required />
                  <input name="title" placeholder="商品名稱" required />
                  <input name="quantity" type="number" min="1" defaultValue="1" required />
                  <textarea name="remarks" placeholder="備註" />
                  <button disabled={submitting} type="submit">提交代購</button>
                </form>
                <form onSubmit={submitProcurementPayment}>
                  <h3>支付已報價訂單</h3>
                  <input name="orderId" placeholder="代購訂單 ID" defaultValue="DP-PO-10001" required />
                  <button disabled={submitting} type="submit">餘額付款</button>
                </form>
              </FormGrid>
            </Panel>
            <OrderPanel orders={orders.filter((order) => order.type.includes("代購"))} title="我的代購訂單" />
          </section>
        );
      case "member-wallet":
        return (
          <section className="page-grid">
            <Panel eyebrow="Wallet" title="充值與餘額" icon={WalletCards}>
              <FormGrid>
                <form onSubmit={submitPayment}>
                  <h3>銀行轉帳充值</h3>
                  <input name="amountHkd" type="number" min="1" placeholder="金額 HKD" required />
                  <input name="proofUrl" placeholder="付款憑證 URL（可後補）" />
                  <button disabled={submitting} type="submit">提交充值</button>
                </form>
              </FormGrid>
            </Panel>
            <Panel eyebrow="Ledger" title="最近財務流水" icon={CircleDollarSign}>
              <QueueList
                items={workQueue.ledger}
                empty="暫無流水"
                render={(entry) => `${entry.bucket} / ${entry.direction} / HKD ${entry.amountHkd}`}
              />
            </Panel>
          </section>
        );
      case "member-packages":
        return (
          <section className="page-grid">
            <OrderPanel orders={orders.filter((order) => order.type.includes("集運"))} title="我的包裹" />
            <Panel eyebrow="Rules" title="包裹編號" icon={Boxes}>
              <div className="rule-grid">
                {packageNumberRules.map((rule) => (
                  <div key={rule.code}>
                    <strong>{rule.label}</strong>
                    <span>{rule.example}</span>
                  </div>
                ))}
              </div>
            </Panel>
          </section>
        );
      case "member-shipments":
        return (
          <section className="page-grid">
            <Panel eyebrow="Shipment" title="我的物流" icon={Truck}>
              <QueueList
                items={workQueue.shipments}
                empty="暫無發貨單"
                render={(shipment) => `${shipment.id} / ${shipment.lineCode} / ${shipment.status}`}
              />
            </Panel>
            <Panel eyebrow="Tracking" title="物流節點" icon={Globe2}>
              <QueueList
                items={workQueue.trackingEvents}
                empty="暫無物流節點"
                render={(event) => `${event.shipmentId} / ${event.status} / ${event.location ?? "-"} `}
              />
            </Panel>
          </section>
        );
      case "member-support":
        return (
          <section className="page-grid">
            <Panel eyebrow="Support" title="客服工單" icon={ClipboardList}>
              <FormGrid>
                <form onSubmit={submitTicket}>
                  <h3>提交工單</h3>
                  <select name="ticketType" required>
                    {supportTicketTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <input name="subject" placeholder="主題" required />
                  <textarea name="description" placeholder="問題描述" required />
                  <input name="relatedType" placeholder="關聯類型，例如 package" />
                  <input name="relatedId" placeholder="關聯編號，例如 DP-PK-10003" />
                  <button disabled={submitting} type="submit">提交工單</button>
                </form>
              </FormGrid>
            </Panel>
            <Panel eyebrow="Open Tickets" title="我的工單" icon={Bell}>
              <QueueList items={workQueue.tickets} empty="暫無工單" render={(ticket) => `${ticket.subject} / ${ticket.status}`} />
            </Panel>
          </section>
        );
      default:
        return (
          <section className="page-grid">
            <Panel eyebrow="Member Portal" title="會員前台" icon={Home} className="full-span">
              <div className="task-grid">
                {memberFlows.map((task) => (
                  <article className="task" key={task.title}>
                    <task.icon size={21} />
                    <h3>{task.title}</h3>
                    <p>{task.text}</p>
                  </article>
                ))}
              </div>
            </Panel>
            <OrderPanel orders={orders} title="我的最新訂單" />
          </section>
        );
    }
  }

  function renderAdminPage() {
    switch (activeMenu) {
      case "admin-quotes":
        return (
          <section className="page-grid">
            <Panel eyebrow="Quote" title="代購報價" icon={ShoppingCart}>
              <FormGrid>
                <form onSubmit={submitQuote}>
                  <h3>報價訂單</h3>
                  <input name="orderId" placeholder="代購訂單 ID" defaultValue="DP-PO-10001" required />
                  <input name="itemAmountJpy" type="number" min="1" placeholder="商品金額 JPY" required />
                  <input name="localShippingJpy" type="number" min="0" placeholder="日本本地運費 JPY" />
                  <input name="serviceFeeHkd" type="number" min="0" placeholder="服務費 HKD" />
                  <textarea name="remarks" placeholder="報價備註" />
                  <button disabled={submitting} type="submit">提交報價</button>
                </form>
              </FormGrid>
            </Panel>
            <OrderPanel orders={orders} title="待處理訂單" />
          </section>
        );
      case "admin-purchasing":
        return (
          <section className="page-grid">
            <Panel eyebrow="Purchasing" title="採購處理" icon={PackageCheck}>
              <FormGrid>
                <form onSubmit={submitProcurementPurchased}>
                  <h3>標記已採購</h3>
                  <input name="orderId" placeholder="代購訂單 ID" defaultValue="DP-PO-10001" required />
                  <input name="japanTrackingNo" placeholder="日本物流單號；可後補" />
                  <input name="warehouseId" placeholder="預計入庫倉" defaultValue="warehouse-funabashi" />
                  <textarea name="remarks" placeholder="採購備註" />
                  <button disabled={submitting} type="submit">生成入庫預報</button>
                </form>
              </FormGrid>
            </Panel>
          </section>
        );
      case "admin-inbound":
        return (
          <section className="page-grid">
            <Panel eyebrow="Inbound" title="入庫登記" icon={Boxes}>
              <FormGrid>
                <form onSubmit={submitInboundPackage}>
                  <h3>登記包裹</h3>
                  <input name="memberId" placeholder="會員 ID；無主包裹可留空" defaultValue="demo-member" />
                  <input name="warehouseId" placeholder="倉庫 ID" defaultValue="warehouse-funabashi" />
                  <input name="trackingNo" placeholder="日本物流單號" required />
                  <input name="weightGram" type="number" min="0" placeholder="重量 g" />
                  <input name="volumeCm3" type="number" min="0" placeholder="體積 cm3" />
                  <button disabled={submitting} type="submit">登記入庫</button>
                </form>
              </FormGrid>
            </Panel>
            <Panel eyebrow="Scans" title="最近掃碼" icon={ClipboardList}>
              <QueueList items={workQueue.scans} empty="暫無掃碼" render={(scan) => `${scan.packageId} / ${scan.step}`} />
            </Panel>
          </section>
        );
      case "admin-consolidation":
        return (
          <section className="page-grid">
            <Panel eyebrow="Consolidation" title="合箱出庫" icon={Truck}>
              <FormGrid>
                <form onSubmit={submitShipment}>
                  <h3>建立發貨單</h3>
                  <input name="packageIds" placeholder="包裹 ID，逗號分隔；先入庫後再填入" required />
                  <input name="lineCode" placeholder="線路代碼" defaultValue="HK-AIR-STANDARD" required />
                  <input name="cartonFeeHkd" type="number" min="0" placeholder="紙箱費 HKD" defaultValue="15" />
                  <input name="freightFeeHkd" type="number" min="0" placeholder="國際運費 HKD" />
                  <button disabled={submitting} type="submit">建立發貨單</button>
                </form>
              </FormGrid>
            </Panel>
            <Panel eyebrow="Shipments" title="發貨單" icon={Boxes}>
              <QueueList
                items={workQueue.shipments}
                empty="暫無發貨單"
                render={(shipment) => `${shipment.id} / ${shipment.status} / ${shipment.packageCount} 件`}
              />
            </Panel>
          </section>
        );
      case "admin-tracking":
        return (
          <section className="page-grid">
            <Panel eyebrow="Tracking" title="物流節點" icon={Globe2}>
              <FormGrid>
                <form onSubmit={submitTrackingEvent}>
                  <h3>新增物流節點</h3>
                  <input name="shipmentId" placeholder="發貨單 ID" defaultValue={workQueue.shipments[0]?.id ?? "DP-SH-10001"} required />
                  <select name="status" defaultValue="outbound" required>
                    <option value="packed">已打包</option>
                    <option value="outbound">已出庫</option>
                    <option value="departed_by_air_or_sea">已上飛機/船</option>
                    <option value="arrived_port">到港</option>
                    <option value="customs_clearance">清關</option>
                    <option value="delivery">派送</option>
                    <option value="signed">簽收</option>
                  </select>
                  <input name="location" placeholder="地點" defaultValue="Funabashi" />
                  <input name="trackingNo" placeholder="國際物流號" />
                  <textarea name="description" placeholder="節點描述" defaultValue="Package moved to next logistics step." required />
                  <button disabled={submitting} type="submit">新增節點</button>
                </form>
              </FormGrid>
            </Panel>
            <Panel eyebrow="Events" title="最近物流節點" icon={Truck}>
              <QueueList
                items={workQueue.trackingEvents}
                empty="暫無節點"
                render={(event) => `${event.shipmentId} / ${event.status} / ${event.description}`}
              />
            </Panel>
          </section>
        );
      case "admin-finance":
        return (
          <section className="page-grid">
            <Panel eyebrow="Finance" title="財務審核" icon={CircleDollarSign}>
              <FormGrid>
                <form onSubmit={submitPaymentApproval}>
                  <h3>銀行轉帳入帳</h3>
                  <input name="paymentId" placeholder="充值申請 ID" defaultValue="pay-demo-bank-1" required />
                  <button disabled={submitting} type="submit">審核入帳</button>
                </form>
              </FormGrid>
            </Panel>
            <Panel eyebrow="Ledger" title="財務流水" icon={FileText}>
              <QueueList
                items={workQueue.ledger}
                empty="暫無流水"
                render={(entry) => `${entry.bucket} / ${entry.direction} / HKD ${entry.amountHkd}`}
              />
            </Panel>
          </section>
        );
      case "admin-roles":
        return (
          <section className="page-grid">
            <Panel eyebrow="Roles" title="角色權限" icon={Users} className="full-span">
              <div className="role-list">
                {roleMatrix.map((role) => (
                  <div className="role-row" key={role.role}>
                    <strong>{role.label}</strong>
                    <span>{role.scope}</span>
                  </div>
                ))}
              </div>
            </Panel>
          </section>
        );
      case "admin-content":
        return (
          <section className="page-grid">
            <Panel eyebrow="Content" title="多語與 SEO" icon={Languages}>
              <p className="body-text">第一版支援繁體中文、英文、日文，預設繁體中文。SEO 保留 Title、Meta Description、URL Slug、Open Graph、Sitemap、robots.txt。</p>
            </Panel>
            <Panel eyebrow="SEO Queue" title="SEO 工作" icon={Search}>
              <QueueList items={workQueue.seo} empty="暫無 SEO 任務" render={(entry) => `${entry.title} / ${entry.locale} / ${entry.urlSlug}`} />
            </Panel>
          </section>
        );
      case "admin-rules":
        return (
          <section className="page-grid">
            <Panel eyebrow="Rules" title="基礎規則" icon={Settings} className="full-span">
              <div className="rule-grid">
                <div>
                  <strong>包裹編號</strong>
                  <span>{packageNumberRules.map((rule) => rule.label).join("、")}</span>
                </div>
                <div>
                  <strong>客服工單</strong>
                  <span>{supportTicketTypes.slice(0, 4).join("、")} 等</span>
                </div>
                <div>
                  <strong>倉庫掃碼</strong>
                  <span>{warehouseScanSteps.join("、")}</span>
                </div>
                <div>
                  <strong>SEO 欄位</strong>
                  <span>{seoFields.join("、")}</span>
                </div>
              </div>
            </Panel>
          </section>
        );
      default:
        return (
          <section className="page-grid">
            <div className="metric-grid full-span">
              {metrics.map((metric) => (
                <article className={`metric ${metric.tone}`} key={metric.label}>
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                </article>
              ))}
            </div>
            <Panel eyebrow="Work Queue" title="後台工作隊列" icon={ChartNoAxesCombined}>
              <div className="queue-grid">
                <QueueTile title="Tickets" text={workQueue.tickets[0]?.subject ?? "No open ticket"} />
                <QueueTile
                  title="Warehouse"
                  text={workQueue.scans[0] ? `${workQueue.scans[0].packageId} / ${workQueue.scans[0].step}` : "No scan event"}
                />
                <QueueTile
                  title="Shipments"
                  text={workQueue.shipments[0] ? `${workQueue.shipments[0].id} / ${workQueue.shipments[0].status}` : "No shipment"}
                />
                <QueueTile
                  title="Tracking"
                  text={workQueue.trackingEvents[0] ? `${workQueue.trackingEvents[0].shipmentId} / ${workQueue.trackingEvents[0].status}` : "No event"}
                />
              </div>
            </Panel>
            <Panel eyebrow="Runbook" title="待處理運營動作" icon={ClipboardList}>
              <ul className="check-list">
                {operations.slice(0, 5).map((operation) => (
                  <li key={operation}>{operation}</li>
                ))}
              </ul>
            </Panel>
          </section>
        );
    }
  }

  return (
    <main className="shell">
      <aside className="sidebar" aria-label="主導航">
        <div className="brand">
          <span className="brand-mark">D</span>
          <div>
            <strong>DropPilot</strong>
            <small>{mode === "member" ? "會員前台" : "管理後台"}</small>
          </div>
        </div>

        <div className="mode-switch" aria-label="切換使用端">
          <button className={mode === "member" ? "active" : ""} onClick={() => switchMode("member")} type="button">會員前台</button>
          <button className={mode === "admin" ? "active" : ""} onClick={() => switchMode("admin")} type="button">管理後台</button>
        </div>

        <nav>
          <span className="nav-section">{mode === "member" ? "消費者功能" : "後台功能"}</span>
          {menus.map((menu) => (
            <button
              className={activeMenu === menu.id ? "active" : ""}
              key={menu.id}
              onClick={() => setActiveMenu(menu.id)}
              type="button"
            >
              <menu.icon size={18} />
              {menu.label}
            </button>
          ))}
        </nav>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">{mode === "member" ? "Customer H5" : "Admin Console"}</p>
            <h1>{menus.find((menu) => menu.id === activeMenu)?.label ?? "DropPilot"}</h1>
          </div>
          <div className="actions">
            <button aria-label="搜索"><Search size={19} /></button>
            <button aria-label="通知"><Bell size={19} /></button>
          </div>
        </header>

        <p className="notice" aria-live="polite">{notice}</p>
        {mode === "member" ? renderMemberPage() : renderAdminPage()}
      </section>
    </main>
  );
}

function Panel({
  eyebrow,
  title,
  icon: Icon,
  className = "",
  children
}: {
  eyebrow: string;
  title: string;
  icon: typeof Home;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`panel ${className}`}>
      <div className="panel-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        <Icon size={22} />
      </div>
      {children}
    </section>
  );
}

function FormGrid({ children }: { children: React.ReactNode }) {
  return <div className="form-grid">{children}</div>;
}

function OrderPanel({ orders, title }: { orders: MemberOrder[]; title: string }) {
  return (
    <Panel eyebrow="Orders" title={title} icon={ClipboardList}>
      <div className="order-list">
        {(orders.length ? orders : demoOrders).map((order) => (
          <article className="order-row" key={order.id}>
            <div>
              <strong>{order.id}</strong>
              <span>{order.type} / {order.platform ?? order.warehouse}</span>
            </div>
            <mark>{order.status}</mark>
          </article>
        ))}
      </div>
    </Panel>
  );
}

function QueueList<T>({ items, empty, render }: { items: T[]; empty: string; render: (item: T) => string }) {
  return (
    <div className="order-list">
      {items.length === 0 ? (
        <article className="order-row">
          <span>{empty}</span>
        </article>
      ) : (
        items.slice(0, 8).map((item, index) => (
          <article className="order-row" key={index}>
            <span>{render(item)}</span>
          </article>
        ))
      )}
    </div>
  );
}

function QueueTile({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <strong>{title}</strong>
      <span>{text}</span>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
