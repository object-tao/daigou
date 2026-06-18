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
type MenuItem = { id: string; label: string; icon: typeof Home };
type SessionPayload = {
  session: null | {
    actorType: "member" | "staff";
    actorId: string;
    roleName: string | null;
    expiresAt: string;
  };
};
type WorkQueue = {
  tickets: Array<{ id: string; type: string; status: string; priority: string; subject: string }>;
  scans: Array<{ id: string; packageId: string; step: string; code: string; location: string | null }>;
  ledger: Array<{ id: string; bucket: string; direction: string; amountHkd: number; amountJpy: number; source: string }>;
  seo: Array<{ entityType: string; entityId: string; locale: string; title: string; urlSlug: string }>;
  shipments: Array<{ id: string; lineCode: string; status: string; trackingNo: string | null; packageCount: number }>;
  trackingEvents: Array<{ id: string; shipmentId: string; status: string; location: string | null; description: string }>;
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
  { id: "member-home", label: "會員首頁", icon: Home },
  { id: "member-auth", label: "註冊登入", icon: LockKeyhole },
  { id: "member-procurement", label: "人工代購", icon: ShoppingCart },
  { id: "member-auction", label: "Yahoo 代拍", icon: Gavel },
  { id: "member-cart", label: "購物車", icon: ShoppingCart },
  { id: "member-wallet", label: "充值與餘額", icon: WalletCards },
  { id: "member-packages", label: "包裹與增值", icon: Boxes },
  { id: "member-shipments", label: "合箱與物流", icon: Truck },
  { id: "member-support", label: "客服與售後", icon: ClipboardList },
  { id: "member-growth", label: "會員積分", icon: TicketPercent }
];

const adminMenus: MenuItem[] = [
  { id: "admin-dashboard", label: "工作台", icon: ChartNoAxesCombined },
  { id: "admin-auth", label: "後台登入", icon: ShieldCheck },
  { id: "admin-quotes", label: "代購報價", icon: ShoppingCart },
  { id: "admin-auction", label: "代拍處理", icon: Gavel },
  { id: "admin-purchasing", label: "採購入庫預報", icon: PackageCheck },
  { id: "admin-inbound", label: "入庫與無主件", icon: Boxes },
  { id: "admin-consolidation", label: "合箱與運費", icon: Truck },
  { id: "admin-tracking", label: "物流節點", icon: Globe2 },
  { id: "admin-finance", label: "財務與退款", icon: CircleDollarSign },
  { id: "admin-roles", label: "角色權限", icon: Users },
  { id: "admin-content", label: "多語與 SEO", icon: Languages },
  { id: "admin-export", label: "匯出與附件", icon: FileText },
  { id: "admin-rules", label: "基礎規則", icon: Settings }
];

async function loadJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(path, { credentials: "include", headers: { Accept: "application/json" } });
    return response.ok ? ((await response.json()) as T) : fallback;
  } catch {
    return fallback;
  }
}

async function postJson<T>(path: string, body: Record<string, unknown>): Promise<T> {
  const response = await fetch(path, {
    method: "POST",
    credentials: "include",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const payload = (await response.json()) as T | { error?: string };

  if (!response.ok) {
    throw new Error((payload as { error?: string }).error ?? "提交失敗");
  }

  return payload as T;
}

function App() {
  const [mode, setMode] = useState<AppMode>("member");
  const [activeMenu, setActiveMenu] = useState("member-home");
  const [session, setSession] = useState<SessionPayload["session"]>(null);
  const [metrics, setMetrics] = useState<Metric[]>(adminMetrics);
  const [orders, setOrders] = useState<MemberOrder[]>(demoOrders);
  const [operations, setOperations] = useState<string[]>(fallbackAdminSummary.operations);
  const [workQueue, setWorkQueue] = useState<WorkQueue>(emptyWorkQueue);
  const [notice, setNotice] = useState("Ready");
  const [submitting, setSubmitting] = useState(false);

  const menus = mode === "member" ? memberMenus : adminMenus;

  async function refreshData() {
    const [me, summary, orderPayload, queuePayload] = await Promise.all([
      loadJson<SessionPayload>("/api/auth/me", { session: null }),
      loadJson<{ counters: typeof fallbackAdminSummary.counters; operations: string[] }>("/api/admin/summary", fallbackAdminSummary),
      loadJson<{ items: MemberOrder[] }>("/api/member/orders", { items: demoOrders }),
      loadJson<WorkQueue>("/api/admin/work-queue", emptyWorkQueue)
    ]);

    setSession(me.session);
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

  function switchMode(nextMode: AppMode) {
    setMode(nextMode);
    setActiveMenu(nextMode === "member" ? "member-home" : "admin-dashboard");
  }

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

  function login(event: FormEvent<HTMLFormElement>, actorType: "member" | "staff") {
    void handleForm(
      event,
      "登入中...",
      (form) =>
        postJson<{ actorType: string; actorId: string; roleName: string | null }>("/api/auth/login", {
          email: String(form.get("email") ?? ""),
          password: String(form.get("password") ?? ""),
          actorType
        }),
      (result) => `已登入：${result.actorType} / ${result.actorId}${result.roleName ? ` / ${result.roleName}` : ""}`
    );
  }

  function submit(path: string, busy: string, message: (result: { id?: string; status?: string; [key: string]: unknown }) => string) {
    return (event: FormEvent<HTMLFormElement>) => {
      void handleForm(event, busy, (form) => postJson(path, Object.fromEntries(form.entries())), message);
    };
  }

  function submitWithId(
    pathBuilder: (form: FormData) => string,
    busy: string,
    message: (result: { id?: string; status?: string; [key: string]: unknown }) => string
  ) {
    return (event: FormEvent<HTMLFormElement>) => {
      void handleForm(event, busy, (form) => postJson(pathBuilder(form), Object.fromEntries(form.entries())), message);
    };
  }

  function renderAuthPage(actorType: "member" | "staff") {
    const isMember = actorType === "member";
    return (
      <section className="page-grid">
        <Panel eyebrow="Auth" title={isMember ? "會員註冊登入" : "管理後台登入"} icon={LockKeyhole}>
          <FormGrid>
            {isMember && (
              <form onSubmit={submit("/api/auth/register", "註冊中...", (result) => `會員已建立：${result.id}`)}>
                <h3>電郵註冊</h3>
                <input name="email" type="email" placeholder="email" required />
                <input name="displayName" placeholder="顯示名稱" />
                <input name="password" type="password" placeholder="密碼至少 8 位" required />
                <select name="locale" defaultValue="zh-Hant">
                  <option value="zh-Hant">繁體中文</option>
                  <option value="en">English</option>
                  <option value="ja">日本語</option>
                </select>
                <button disabled={submitting} type="submit">註冊</button>
              </form>
            )}
            <form onSubmit={(event) => login(event, actorType)}>
              <h3>{isMember ? "會員登入" : "員工登入"}</h3>
              <input name="email" type="email" defaultValue={isMember ? "demo@droppilot.net" : "admin@droppilot.net"} required />
              <input name="password" type="password" defaultValue={isMember ? "Member123!" : "Admin123!"} required />
              <button disabled={submitting} type="submit">登入</button>
            </form>
            <form onSubmit={submit("/api/auth/logout", "登出中...", () => "已登出")}>
              <h3>目前身份</h3>
              <p className="body-text">{session ? `${session.actorType} / ${session.actorId} / ${session.roleName ?? "member"}` : "未登入"}</p>
              <button disabled={submitting} type="submit">登出</button>
            </form>
          </FormGrid>
        </Panel>
        <Panel eyebrow="Demo" title="測試帳號" icon={ShieldCheck}>
          <div className="rule-grid">
            <div><strong>會員</strong><span>demo@droppilot.net / Member123!</span></div>
            <div><strong>管理員</strong><span>admin@droppilot.net / Admin123!</span></div>
            <div><strong>財務</strong><span>finance@droppilot.net / Finance123!</span></div>
            <div><strong>倉庫</strong><span>warehouse@droppilot.net / Warehouse123!</span></div>
          </div>
        </Panel>
      </section>
    );
  }

  function renderMemberPage() {
    switch (activeMenu) {
      case "member-auth":
        return renderAuthPage("member");
      case "member-procurement":
        return (
          <section className="page-grid">
            <Panel eyebrow="Procurement" title="人工代購" icon={ShoppingCart}>
              <FormGrid>
                <form onSubmit={submit("/api/procurement/orders", "提交代購...", (result) => `代購單已建立：${result.id}`)}>
                  <h3>提交代購需求</h3>
                  <input name="platform" placeholder="平台，如 Mercari" required />
                  <input name="productUrl" placeholder="商品 URL" required />
                  <input name="title" placeholder="商品名稱" required />
                  <input name="quantity" type="number" min="1" defaultValue="1" required />
                  <textarea name="remarks" placeholder="備註" />
                  <button disabled={submitting} type="submit">提交代購</button>
                </form>
                <form onSubmit={submitWithId((form) => `/api/procurement/orders/${encodeURIComponent(String(form.get("orderId") ?? ""))}/pay`, "扣款中...", (result) => `已付款：${result.id}`)}>
                  <h3>支付已報價訂單</h3>
                  <input name="orderId" defaultValue="DP-PO-10001" placeholder="代購單 ID" required />
                  <button disabled={submitting} type="submit">餘額付款</button>
                </form>
              </FormGrid>
            </Panel>
            <OrderPanel orders={orders.filter((order) => order.type.includes("代") || order.type.includes("浠"))} title="我的代購單" />
          </section>
        );
      case "member-auction":
        return (
          <section className="page-grid">
            <Panel eyebrow="Auction" title="Yahoo 人工代拍" icon={Gavel}>
              <FormGrid>
                <form onSubmit={submit("/api/auction/orders", "提交代拍...", (result) => `代拍單已建立：${result.id}`)}>
                  <h3>提交代拍授權</h3>
                  <input name="lotUrl" placeholder="Yahoo 拍賣 URL" required />
                  <input name="title" placeholder="拍品名稱" required />
                  <input name="maxBidJpy" type="number" min="1" placeholder="最高出價 JPY" required />
                  <input name="authorizationLimitJpy" type="number" min="1" placeholder="授權扣款上限 JPY" required />
                  <button disabled={submitting} type="submit">提交代拍</button>
                </form>
              </FormGrid>
            </Panel>
            <OrderPanel orders={orders.filter((order) => order.type.includes("拍") || order.type.includes("媿"))} title="我的代拍" />
          </section>
        );
      case "member-cart":
        return (
          <section className="page-grid">
            <Panel eyebrow="Cart" title="跨平台購物車" icon={ShoppingCart}>
              <FormGrid>
                <form onSubmit={submit("/api/cart/items", "加入購物車...", (result) => `已加入購物車：${result.id}`)}>
                  <h3>加入商品</h3>
                  <input name="platform" placeholder="平台" required />
                  <input name="productUrl" placeholder="商品 URL" required />
                  <input name="title" placeholder="商品名稱" required />
                  <input name="quantity" type="number" min="1" defaultValue="1" />
                  <textarea name="remarks" placeholder="備註；日本本地運費採購後補收" />
                  <button disabled={submitting} type="submit">加入購物車</button>
                </form>
                <form onSubmit={submit("/api/cart/checkout", "建立代購單...", (result) => `已建立 ${result.count} 張代購單`)}>
                  <h3>轉為代購單</h3>
                  <p className="body-text">跨平台商品會分別生成代購單，保留備註與後補本地運費。</p>
                  <button disabled={submitting} type="submit">購物車結帳</button>
                </form>
              </FormGrid>
            </Panel>
          </section>
        );
      case "member-wallet":
        return (
          <section className="page-grid">
            <Panel eyebrow="Wallet" title="充值與餘額" icon={WalletCards}>
              <FormGrid>
                <form onSubmit={submit("/api/payments/bank-transfer-requests", "提交充值...", (result) => `充值申請已提交：${result.id}`)}>
                  <h3>銀行轉帳充值</h3>
                  <input name="amountHkd" type="number" min="1" placeholder="金額 HKD" required />
                  <input name="proofUrl" placeholder="付款憑證 URL" />
                  <button disabled={submitting} type="submit">提交充值</button>
                </form>
                <form onSubmit={submit("/api/member/notification-preferences", "更新通知...", (result) => `通知已更新：${result.channel}`)}>
                  <h3>通知偏好</h3>
                  <select name="channel"><option value="email">Email</option><option value="whatsapp">WhatsApp</option></select>
                  <select name="enabled"><option value="true">啟用</option><option value="">停用</option></select>
                  <button disabled={submitting} type="submit">儲存通知</button>
                </form>
              </FormGrid>
            </Panel>
            <LedgerPanel workQueue={workQueue} />
          </section>
        );
      case "member-packages":
        return (
          <section className="page-grid">
            <OrderPanel orders={orders.filter((order) => order.type.includes("集") || order.type.includes("亱"))} title="我的包裹" />
            <Panel eyebrow="Value Added" title="增值服務與認領" icon={Boxes}>
              <FormGrid>
                <form onSubmit={submit("/api/value-added-services", "提交增值服務...", (result) => `增值服務已建立：${result.id}`)}>
                  <h3>增值服務</h3>
                  <input name="packageId" defaultValue="DP-PK-10003" placeholder="包裹 ID" required />
                  <select name="serviceType">
                    {serviceBlueprint.valueAddedServices.map((service) => <option key={service.code} value={service.code}>{service.label}</option>)}
                  </select>
                  <button disabled={submitting} type="submit">提交服務</button>
                </form>
                <form onSubmit={submitWithId((form) => `/api/packages/${encodeURIComponent(String(form.get("packageId") ?? ""))}/claim`, "認領中...", (result) => `包裹已認領：${result.id}`)}>
                  <h3>無主包裹認領</h3>
                  <input name="packageId" defaultValue="DP-PK-OWNERLESS" placeholder="包裹 ID" required />
                  <button disabled={submitting} type="submit">提交認領</button>
                </form>
              </FormGrid>
            </Panel>
          </section>
        );
      case "member-shipments":
        return (
          <section className="page-grid">
            <Panel eyebrow="Shipment" title="合箱與物流" icon={Truck}>
              <FormGrid>
                <form onSubmit={submitWithId((form) => `/api/shipments/${encodeURIComponent(String(form.get("shipmentId") ?? ""))}/pay-freight`, "支付運費...", (result) => `運費已支付：${result.id}`)}>
                  <h3>支付國際運費</h3>
                  <input name="shipmentId" defaultValue="DP-SH-10001" placeholder="發貨單 ID" required />
                  <button disabled={submitting} type="submit">餘額支付</button>
                </form>
              </FormGrid>
              <QueueList items={workQueue.shipments} empty="暫無發貨單" render={(shipment) => `${shipment.id} / ${shipment.lineCode} / ${shipment.status}`} />
            </Panel>
            <Panel eyebrow="Tracking" title="物流追蹤" icon={Globe2}>
              <QueueList items={workQueue.trackingEvents} empty="暫無物流節點" render={(event) => `${event.shipmentId} / ${event.status} / ${event.location ?? "-"}`} />
            </Panel>
          </section>
        );
      case "member-support":
        return (
          <section className="page-grid">
            <Panel eyebrow="Support" title="客服工單與售後" icon={ClipboardList}>
              <FormGrid>
                <form onSubmit={submit("/api/support/tickets", "提交工單...", (result) => `工單已提交：${result.id}`)}>
                  <h3>客服工單</h3>
                  <select name="ticketType">{supportTicketTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select>
                  <input name="subject" placeholder="主題" required />
                  <textarea name="description" placeholder="問題描述" required />
                  <input name="relatedType" placeholder="關聯類型，如 package" />
                  <input name="relatedId" placeholder="關聯 ID" />
                  <button disabled={submitting} type="submit">提交工單</button>
                </form>
                <form onSubmit={submit("/api/aftersales/requests", "提交售後...", (result) => `售後申請已提交：${result.id}`)}>
                  <h3>取消 / 退款申請</h3>
                  <select name="orderType"><option value="procurement">代購</option><option value="shipment">物流</option></select>
                  <input name="orderId" defaultValue="DP-PO-10001" placeholder="訂單 ID" required />
                  <select name="requestType"><option value="cancel">取消</option><option value="refund">退款</option></select>
                  <textarea name="reason" placeholder="原因" required />
                  <button disabled={submitting} type="submit">提交售後</button>
                </form>
              </FormGrid>
            </Panel>
            <Panel eyebrow="Tickets" title="我的工單" icon={Bell}>
              <QueueList items={workQueue.tickets} empty="暫無工單" render={(ticket) => `${ticket.subject} / ${ticket.status}`} />
            </Panel>
          </section>
        );
      case "member-growth":
        return (
          <section className="page-grid">
            <Panel eyebrow="Growth" title="會員等級、積分、佣金與優惠券" icon={TicketPercent}>
              <FormGrid>
                <form onSubmit={submit("/api/points/redemptions", "兌換積分...", (result) => `兌換申請已提交：${result.id}`)}>
                  <h3>積分兌換</h3>
                  <select name="bucket"><option value="procurement">代購商品積分</option><option value="logistics">物流費用積分</option></select>
                  <input name="points" type="number" min="1" placeholder="積分" required />
                  <input name="rewardName" placeholder="兌換商品" required />
                  <button disabled={submitting} type="submit">提交兌換</button>
                </form>
                <form onSubmit={submit("/api/coupons/redeem", "使用優惠券...", (result) => `優惠券已使用：HKD ${result.discountHkd}`)}>
                  <h3>優惠券</h3>
                  <input name="code" defaultValue="WELCOME30" placeholder="券碼" required />
                  <input name="sourceType" defaultValue="procurement_order" required />
                  <input name="sourceId" defaultValue="DP-PO-10001" required />
                  <button disabled={submitting} type="submit">使用優惠券</button>
                </form>
              </FormGrid>
            </Panel>
          </section>
        );
      default:
        return (
          <section className="page-grid">
            <Panel eyebrow="Member Portal" title="會員前台" icon={Home} className="full-span">
              <div className="task-grid">
                {["人工代購", "Yahoo 代拍", "購物車", "充值餘額", "包裹增值", "合箱物流", "售後工單", "積分優惠"].map((title) => (
                  <article className="task" key={title}><h3>{title}</h3><p>按左側功能選單進入對應流程。</p></article>
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
      case "admin-auth":
        return renderAuthPage("staff");
      case "admin-quotes":
        return (
          <AdminFormPanel title="代購報價" icon={ShoppingCart}>
            <form onSubmit={submitWithId((form) => `/api/admin/procurement/orders/${encodeURIComponent(String(form.get("orderId") ?? ""))}/quote`, "報價中...", (result) => `已報價：${result.id}`)}>
              <h3>報價訂單</h3><input name="orderId" defaultValue="DP-PO-10001" required /><input name="itemAmountJpy" type="number" min="1" placeholder="商品金額 JPY" required /><input name="localShippingJpy" type="number" min="0" placeholder="日本本地運費 JPY" /><input name="serviceFeeHkd" type="number" min="0" placeholder="服務費 HKD" /><textarea name="remarks" placeholder="報價備註" /><button disabled={submitting}>提交報價</button>
            </form>
          </AdminFormPanel>
        );
      case "admin-auction":
        return (
          <AdminFormPanel title="代拍結果處理" icon={Gavel}>
            <form onSubmit={submitWithId((form) => `/api/admin/auction/orders/${encodeURIComponent(String(form.get("orderId") ?? ""))}/resolve`, "處理代拍...", (result) => `代拍已處理：${result.id}`)}>
              <h3>得標 / 流標</h3><input name="orderId" defaultValue="DP-AU-10002" required /><select name="result"><option value="won">得標</option><option value="lost">流標退款</option></select><input name="winningBidJpy" type="number" min="0" placeholder="落札價 JPY" /><button disabled={submitting}>確認結果</button>
            </form>
          </AdminFormPanel>
        );
      case "admin-purchasing":
        return (
          <AdminFormPanel title="採購後生成入庫預報" icon={PackageCheck}>
            <form onSubmit={submitWithId((form) => `/api/admin/procurement/orders/${encodeURIComponent(String(form.get("orderId") ?? ""))}/mark-purchased`, "生成預報...", (result) => `已生成入庫預報：${result.packageId}`)}>
              <h3>標記已採購</h3><input name="orderId" defaultValue="DP-PO-10001" required /><input name="japanTrackingNo" placeholder="日本物流單號" /><input name="warehouseId" defaultValue="warehouse-funabashi" /><textarea name="remarks" placeholder="採購備註" /><button disabled={submitting}>生成入庫預報</button>
            </form>
          </AdminFormPanel>
        );
      case "admin-inbound":
        return (
          <AdminFormPanel title="入庫與無主件" icon={Boxes}>
            <form onSubmit={submit("/api/admin/warehouse/inbound-packages", "入庫中...", (result) => `包裹已入庫：${result.id}`)}>
              <h3>入庫掃碼</h3><input name="memberId" defaultValue="demo-member" placeholder="會員 ID；無主件留空" /><input name="warehouseId" defaultValue="warehouse-funabashi" /><input name="trackingNo" placeholder="日本物流單號" required /><input name="weightGram" type="number" min="0" placeholder="重量 g" /><input name="volumeCm3" type="number" min="0" placeholder="體積 cm3" /><button disabled={submitting}>登記入庫</button>
            </form>
            <form onSubmit={submit("/api/admin/warehouse/destroy-expired-ownerless", "清理中...", (result) => `已銷毀 ${result.destroyed} 件`)}>
              <h3>60 天無主件處理</h3><p className="body-text">超過保留期的公海包裹會標記為 destroyed。</p><button disabled={submitting}>執行清理</button>
            </form>
          </AdminFormPanel>
        );
      case "admin-consolidation":
        return (
          <AdminFormPanel title="合箱與運費" icon={Truck}>
            <form onSubmit={submit("/api/admin/shipments", "建立發貨單...", (result) => `發貨單已建立：${result.id}`)}>
              <h3>建立合箱出庫</h3><input name="packageIds" placeholder="包裹 ID，以逗號分隔" required /><input name="lineCode" defaultValue="HK-AIR-STANDARD" required /><input name="cartonFeeHkd" type="number" min="0" defaultValue="15" /><input name="freightFeeHkd" type="number" min="0" placeholder="可先留空" /><button disabled={submitting}>建立發貨單</button>
            </form>
            <form onSubmit={submitWithId((form) => `/api/admin/shipments/${encodeURIComponent(String(form.get("shipmentId") ?? ""))}/freight-quotes`, "計算運費...", (result) => `計費重量 ${result.billingWeightGram}g，運費 HKD ${result.freightFeeHkd}`)}>
              <h3>實重 / 體積重取高</h3><input name="shipmentId" defaultValue="DP-SH-10001" required /><input name="actualWeightGram" type="number" min="1" placeholder="實重 g" required /><input name="lengthCm" type="number" min="1" placeholder="長 cm" required /><input name="widthCm" type="number" min="1" placeholder="寬 cm" required /><input name="heightCm" type="number" min="1" placeholder="高 cm" required /><input name="ratePerKgHkd" type="number" min="1" placeholder="每 kg HKD" required /><button disabled={submitting}>計算運費</button>
            </form>
          </AdminFormPanel>
        );
      case "admin-tracking":
        return (
          <AdminFormPanel title="物流節點" icon={Globe2}>
            <form onSubmit={submitWithId((form) => `/api/admin/shipments/${encodeURIComponent(String(form.get("shipmentId") ?? ""))}/tracking-events`, "新增節點...", (result) => `物流節點已新增：${result.id}`)}>
              <h3>新增物流追蹤</h3><input name="shipmentId" defaultValue="DP-SH-10001" required /><select name="status"><option value="packed">已打包</option><option value="outbound">已出庫</option><option value="departed_by_air_or_sea">已上飛機/船</option><option value="arrived_port">到港</option><option value="customs_clearance">清關</option><option value="delivery">派送</option><option value="signed">簽收</option></select><input name="location" defaultValue="Funabashi" /><input name="trackingNo" placeholder="國際物流號" /><textarea name="description" defaultValue="Package moved to next logistics step." /><button disabled={submitting}>新增節點</button>
            </form>
          </AdminFormPanel>
        );
      case "admin-finance":
        return (
          <AdminFormPanel title="財務與退款" icon={CircleDollarSign}>
            <form onSubmit={submitWithId((form) => `/api/admin/payments/${encodeURIComponent(String(form.get("paymentId") ?? ""))}/approve`, "入帳中...", (result) => `充值已入帳：${result.id}`)}>
              <h3>銀行轉帳入帳</h3><input name="paymentId" defaultValue="pay-demo-bank-1" required /><button disabled={submitting}>審核入帳</button>
            </form>
            <form onSubmit={submitWithId((form) => `/api/admin/aftersales/${encodeURIComponent(String(form.get("requestId") ?? ""))}/review`, "審核售後...", (result) => `售後已處理：${result.id}`)}>
              <h3>售後 / 退款審核</h3><input name="requestId" defaultValue="after-demo-refund" required /><select name="decision"><option value="approved">批准</option><option value="rejected">拒絕</option></select><input name="refundHkd" type="number" min="0" placeholder="退款 HKD" /><button disabled={submitting}>提交審核</button>
            </form>
          </AdminFormPanel>
        );
      case "admin-roles":
        return <RolePanel />;
      case "admin-content":
        return (
          <AdminFormPanel title="多語與 SEO" icon={Languages}>
            <form onSubmit={submit("/api/admin/translations", "保存翻譯...", (result) => `翻譯已保存：${result.locale}`)}>
              <h3>翻譯管理</h3><input name="namespace" defaultValue="ui" /><input name="translationKey" placeholder="key" required /><select name="locale"><option value="zh-Hant">繁體</option><option value="en">English</option><option value="ja">日本語</option></select><textarea name="value" placeholder="內容" required /><button disabled={submitting}>保存翻譯</button>
            </form>
            <form onSubmit={submit("/api/admin/seo", "保存 SEO...", (result) => `SEO 已保存：${result.urlSlug}`)}>
              <h3>SEO 條目</h3><input name="entityType" defaultValue="page" /><input name="entityId" defaultValue="pricing" /><select name="locale"><option value="zh-Hant">繁體</option><option value="en">English</option><option value="ja">日本語</option></select><input name="title" placeholder="Title" required /><input name="urlSlug" placeholder="URL Slug" required /><textarea name="metaDescription" placeholder="Meta Description" /><button disabled={submitting}>保存 SEO</button>
            </form>
          </AdminFormPanel>
        );
      case "admin-export":
        return (
          <AdminFormPanel title="匯出與附件" icon={FileText}>
            <form action="/api/admin/export/ledger.csv" method="get"><h3>CSV 匯出</h3><p className="body-text">登入財務或管理員後可下載流水 CSV。</p><button type="submit">下載財務流水</button></form>
            <form onSubmit={submit("/api/attachments", "登記附件...", (result) => `附件已登記：${result.id}`)}>
              <h3>附件登記</h3><input name="ownerType" defaultValue="payment_request" /><input name="ownerId" defaultValue="pay-demo-bank-1" /><input name="fileName" placeholder="檔名" required /><input name="contentType" defaultValue="image/jpeg" /><input name="publicUrl" placeholder="暫存 URL" /><button disabled={submitting}>登記附件</button>
            </form>
          </AdminFormPanel>
        );
      case "admin-rules":
        return <RulesPanel />;
      default:
        return (
          <section className="page-grid">
            <div className="metric-grid full-span">{metrics.map((metric) => <article className={`metric ${metric.tone}`} key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong></article>)}</div>
            <Panel eyebrow="Work Queue" title="後台工作隊列" icon={ChartNoAxesCombined}><div className="queue-grid"><QueueTile title="Tickets" text={workQueue.tickets[0]?.subject ?? "No ticket"} /><QueueTile title="Warehouse" text={workQueue.scans[0] ? `${workQueue.scans[0].packageId} / ${workQueue.scans[0].step}` : "No scan"} /><QueueTile title="Shipments" text={workQueue.shipments[0] ? `${workQueue.shipments[0].id} / ${workQueue.shipments[0].status}` : "No shipment"} /><QueueTile title="Tracking" text={workQueue.trackingEvents[0] ? `${workQueue.trackingEvents[0].shipmentId} / ${workQueue.trackingEvents[0].status}` : "No event"} /></div></Panel>
            <Panel eyebrow="Runbook" title="待處理運營動作" icon={ClipboardList}><ul className="check-list">{operations.slice(0, 5).map((operation) => <li key={operation}>{operation}</li>)}</ul></Panel>
          </section>
        );
    }
  }

  return (
    <main className="shell">
      <aside className="sidebar" aria-label="主導航">
        <div className="brand"><span className="brand-mark">D</span><div><strong>DropPilot</strong><small>{mode === "member" ? "會員前台" : "管理後台"}</small></div></div>
        <div className="mode-switch" aria-label="切換使用端"><button className={mode === "member" ? "active" : ""} onClick={() => switchMode("member")} type="button">會員前台</button><button className={mode === "admin" ? "active" : ""} onClick={() => switchMode("admin")} type="button">管理後台</button></div>
        <nav><span className="nav-section">{mode === "member" ? "消費者功能" : "後台功能"}</span>{menus.map((menu) => <button className={activeMenu === menu.id ? "active" : ""} key={menu.id} onClick={() => setActiveMenu(menu.id)} type="button"><menu.icon size={18} />{menu.label}</button>)}</nav>
      </aside>
      <section className="workspace">
        <header className="topbar"><div><p className="eyebrow">{mode === "member" ? "Customer H5" : "Admin Console"}</p><h1>{menus.find((menu) => menu.id === activeMenu)?.label ?? "DropPilot"}</h1></div><div className="actions"><button aria-label="搜索"><Search size={19} /></button><button aria-label="通知"><Bell size={19} /></button></div></header>
        <p className="notice" aria-live="polite">{notice}</p>
        {mode === "member" ? renderMemberPage() : renderAdminPage()}
      </section>
    </main>
  );
}

function AdminFormPanel({ title, icon, children }: { title: string; icon: typeof Home; children: React.ReactNode }) {
  return (
    <section className="page-grid">
      <Panel eyebrow="Admin" title={title} icon={icon} className="full-span"><FormGrid>{children}</FormGrid></Panel>
    </section>
  );
}

function Panel({ eyebrow, title, icon: Icon, className = "", children }: { eyebrow: string; title: string; icon: typeof Home; className?: string; children: React.ReactNode }) {
  return <section className={`panel ${className}`}><div className="panel-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div><Icon size={22} /></div>{children}</section>;
}

function FormGrid({ children }: { children: React.ReactNode }) {
  return <div className="form-grid">{children}</div>;
}

function OrderPanel({ orders, title }: { orders: MemberOrder[]; title: string }) {
  return (
    <Panel eyebrow="Orders" title={title} icon={ClipboardList}>
      <div className="order-list">{(orders.length ? orders : demoOrders).map((order) => <article className="order-row" key={order.id}><div><strong>{order.id}</strong><span>{order.type} / {order.platform ?? order.warehouse}</span></div><mark>{order.status}</mark></article>)}</div>
    </Panel>
  );
}

function LedgerPanel({ workQueue }: { workQueue: WorkQueue }) {
  return <Panel eyebrow="Ledger" title="最近財務流水" icon={CircleDollarSign}><QueueList items={workQueue.ledger} empty="暫無流水" render={(entry) => `${entry.bucket} / ${entry.direction} / HKD ${entry.amountHkd}`} /></Panel>;
}

function RolePanel() {
  return <section className="page-grid"><Panel eyebrow="Roles" title="角色權限" icon={Users} className="full-span"><div className="role-list">{roleMatrix.map((role) => <div className="role-row" key={role.role}><strong>{role.label}</strong><span>{role.scope}</span></div>)}</div></Panel></section>;
}

function RulesPanel() {
  return (
    <section className="page-grid">
      <Panel eyebrow="Rules" title="基礎規則" icon={Settings} className="full-span">
        <div className="rule-grid">
          <div><strong>包裹編號</strong><span>{packageNumberRules.map((rule) => rule.label).join("、")}</span></div>
          <div><strong>客服工單</strong><span>{supportTicketTypes.slice(0, 5).join("、")}</span></div>
          <div><strong>倉庫掃碼</strong><span>{warehouseScanSteps.join("、")}</span></div>
          <div><strong>SEO 欄位</strong><span>{seoFields.join("、")}</span></div>
        </div>
      </Panel>
    </section>
  );
}

function QueueList<T>({ items, empty, render }: { items: T[]; empty: string; render: (item: T) => string }) {
  return <div className="order-list">{items.length === 0 ? <article className="order-row"><span>{empty}</span></article> : items.slice(0, 8).map((item, index) => <article className="order-row" key={index}><span>{render(item)}</span></article>)}</div>;
}

function QueueTile({ title, text }: { title: string; text: string }) {
  return <div><strong>{title}</strong><span>{text}</span></div>;
}

createRoot(document.getElementById("root")!).render(<React.StrictMode><App /></React.StrictMode>);
