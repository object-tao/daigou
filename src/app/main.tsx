import React, { type FormEvent, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { CircleDollarSign, ClipboardList, PackageCheck, RefreshCw, Search, ShoppingBag, UserRound } from "lucide-react";
import "./styles.css";

type ViewMode = "member" | "admin";

type MemberProfile = {
  id: string;
  email: string;
  displayName: string;
  locale: string;
  levelCode: string;
  balanceHkd: number;
};

type ProcurementOrder = {
  id: string;
  memberId: string;
  platform: string;
  productUrl: string;
  title: string;
  spec: string | null;
  quantity: number;
  status: string;
  statusLabel: string;
  itemAmountJpy: number | null;
  localShippingJpy: number | null;
  serviceFeeHkd: number | null;
  quotedTotalHkd: number | null;
  remarks: string | null;
  adminNote: string | null;
  createdAt: string;
  updatedAt: string;
};

const emptyProfile: MemberProfile = {
  id: "demo-member",
  email: "demo@droppilot.net",
  displayName: "Demo Member",
  locale: "zh-Hant",
  levelCode: "LV1",
  balanceHkd: 0
};

async function loadJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(path, { headers: { Accept: "application/json" } });
    return response.ok ? ((await response.json()) as T) : fallback;
  } catch {
    return fallback;
  }
}

async function postJson<T>(path: string, body: Record<string, unknown> = {}): Promise<T> {
  const response = await fetch(path, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const payload = (await response.json()) as T | { error?: string };
  if (!response.ok) throw new Error((payload as { error?: string }).error ?? "提交失敗");
  return payload as T;
}

function formBody(form: FormData) {
  return Object.fromEntries([...form.entries()].map(([key, value]) => [key, typeof value === "string" ? value.trim() : value]));
}

function App() {
  const [mode, setMode] = useState<ViewMode>("member");
  const [profile, setProfile] = useState<MemberProfile>(emptyProfile);
  const [memberOrders, setMemberOrders] = useState<ProcurementOrder[]>([]);
  const [adminOrders, setAdminOrders] = useState<ProcurementOrder[]>([]);
  const [notice, setNotice] = useState("Ready");
  const [submitting, setSubmitting] = useState(false);

  async function refresh() {
    const [profilePayload, memberPayload, adminPayload] = await Promise.all([
      loadJson<{ profile: MemberProfile }>("/api/member/profile", { profile: emptyProfile }),
      loadJson<{ items: ProcurementOrder[] }>("/api/procurement/orders", { items: [] }),
      loadJson<{ items: ProcurementOrder[] }>("/api/admin/procurement/orders", { items: [] })
    ]);
    setProfile(profilePayload.profile);
    setMemberOrders(memberPayload.items);
    setAdminOrders(adminPayload.items);
  }

  useEffect(() => {
    void refresh();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>, path: string, success: string) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmitting(true);
    setNotice("處理中...");
    try {
      await postJson(path, formBody(new FormData(form)));
      form.reset();
      setNotice(success);
      await refresh();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "提交失敗");
    } finally {
      setSubmitting(false);
    }
  }

  async function action(path: string, success: string) {
    setSubmitting(true);
    setNotice("處理中...");
    try {
      await postJson(path);
      setNotice(success);
      await refresh();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "操作失敗");
    } finally {
      setSubmitting(false);
    }
  }

  const stats = useMemo(() => ({
    pendingQuote: adminOrders.filter((order) => order.status === "pending_quote").length,
    quoted: adminOrders.filter((order) => order.status === "quoted").length,
    paid: adminOrders.filter((order) => order.status === "paid").length,
    purchased: adminOrders.filter((order) => order.status === "purchased").length
  }), [adminOrders]);

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand-mark">
          <span>DP</span>
          <div>
            <strong>DropPilot</strong>
            <small>代購模組</small>
          </div>
        </div>
        <nav>
          <button className={mode === "member" ? "active" : ""} onClick={() => setMode("member")} type="button"><UserRound size={18} />會員代購</button>
          <button className={mode === "admin" ? "active" : ""} onClick={() => setMode("admin")} type="button"><ClipboardList size={18} />後台處理</button>
        </nav>
        <section className="side-note">
          <strong>狀態流</strong>
          <span>提交需求 → 後台報價 → 會員付款 → 後台採購 → 已採購</span>
        </section>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <p>Procurement</p>
            <h1>{mode === "member" ? "會員代購中心" : "代購後台"}</h1>
          </div>
          <button className="ghost-button" onClick={() => void refresh()} type="button"><RefreshCw size={18} />刷新</button>
        </header>

        {notice !== "Ready" ? <div className="notice">{notice}</div> : null}

        {mode === "member" ? (
          <MemberProcurement
            action={action}
            orders={memberOrders}
            profile={profile}
            submitting={submitting}
            onSubmit={handleSubmit}
          />
        ) : (
          <AdminProcurement
            action={action}
            orders={adminOrders}
            stats={stats}
            submitting={submitting}
            onSubmit={handleSubmit}
          />
        )}
      </section>
    </main>
  );
}

function MemberProcurement({
  profile,
  orders,
  submitting,
  onSubmit,
  action
}: {
  profile: MemberProfile;
  orders: ProcurementOrder[];
  submitting: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>, path: string, success: string) => Promise<void>;
  action: (path: string, success: string) => Promise<void>;
}) {
  return (
    <div className="page-grid">
      <section className="profile-card">
        <div>
          <span>會員</span>
          <h2>{profile.displayName}</h2>
          <p>{profile.email} · {profile.levelCode}</p>
        </div>
        <div>
          <span>港幣餘額</span>
          <strong>HKD {profile.balanceHkd}</strong>
        </div>
      </section>

      <section className="panel">
        <PanelTitle icon={<ShoppingBag />} title="提交代購需求" />
        <form className="form-grid" onSubmit={(event) => void onSubmit(event, "/api/procurement/orders", "代購需求已提交")}>
          <label>商品連結<input name="productUrl" placeholder="https://jp.example/item" required /></label>
          <label>購物平台<select name="platform" defaultValue="Mercari"><option>Mercari</option><option>Yahoo</option><option>Rakuten Rakuma</option><option>Suruga-ya</option><option>Amazon Japan</option><option>Other</option></select></label>
          <label>商品名稱<input name="title" placeholder="商品名稱" required /></label>
          <label>規格型號<input name="spec" placeholder="顏色、尺寸、型號" /></label>
          <label>數量<input name="quantity" type="number" min="1" defaultValue="1" required /></label>
          <label className="full">備註<textarea name="remarks" placeholder="購買要求、日本本地運費說明等" /></label>
          <button disabled={submitting} type="submit">提交代購</button>
        </form>
      </section>

      <section className="panel full-span">
        <PanelTitle icon={<Search />} title="我的代購訂單" />
        <OrderTable
          orders={orders}
          empty="暫無代購訂單"
          renderActions={(order) => (
            <>
              {order.status === "quoted" ? <button disabled={submitting} onClick={() => void action(`/api/procurement/orders/${encodeURIComponent(order.id)}/pay`, "已付款，等待採購")} type="button">餘額付款</button> : null}
              {!["purchased", "cancelled"].includes(order.status) ? <button className="secondary" disabled={submitting} onClick={() => void action(`/api/procurement/orders/${encodeURIComponent(order.id)}/cancel`, "訂單已取消")} type="button">取消</button> : null}
            </>
          )}
        />
      </section>
    </div>
  );
}

function AdminProcurement({
  orders,
  stats,
  submitting,
  onSubmit,
  action
}: {
  orders: ProcurementOrder[];
  stats: { pendingQuote: number; quoted: number; paid: number; purchased: number };
  submitting: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>, path: string, success: string) => Promise<void>;
  action: (path: string, success: string) => Promise<void>;
}) {
  const firstPending = orders.find((order) => order.status === "pending_quote");
  return (
    <div className="page-grid">
      <section className="stat-grid full-span">
        <StatCard label="待報價" value={stats.pendingQuote} tone="orange" />
        <StatCard label="待付款" value={stats.quoted} tone="blue" />
        <StatCard label="已付款" value={stats.paid} tone="green" />
        <StatCard label="已採購" value={stats.purchased} tone="dark" />
      </section>

      <section className="panel">
        <PanelTitle icon={<CircleDollarSign />} title="後台報價" />
        <form className="form-grid" onSubmit={(event) => {
          const orderId = String(new FormData(event.currentTarget).get("orderId") ?? "");
          void onSubmit(event, `/api/admin/procurement/orders/${encodeURIComponent(orderId)}/quote`, "報價已送出");
        }}>
          <label className="full">代購單 ID<input name="orderId" defaultValue={firstPending?.id ?? ""} placeholder="DP-PO-..." required /></label>
          <label>商品金額 JPY<input name="itemAmountJpy" type="number" min="1" required /></label>
          <label>日本本地運費 JPY<input name="localShippingJpy" type="number" min="0" defaultValue="0" /></label>
          <label>服務費 HKD<input name="serviceFeeHkd" type="number" min="0" defaultValue="0" /></label>
          <label>應付總額 HKD<input name="quotedTotalHkd" type="number" min="1" required /></label>
          <label className="full">報價備註<textarea name="adminNote" placeholder="付款後安排採購；日本本地運費如有變動再補收" /></label>
          <button disabled={submitting} type="submit">提交報價</button>
        </form>
      </section>

      <section className="panel full-span">
        <PanelTitle icon={<PackageCheck />} title="代購處理列表" />
        <OrderTable
          orders={orders}
          empty="暫無代購訂單"
          renderActions={(order) => (
            order.status === "paid" || order.status === "pending_purchase"
              ? <button disabled={submitting} onClick={() => void action(`/api/admin/procurement/orders/${encodeURIComponent(order.id)}/mark-purchased`, "已標記採購")} type="button">標記已採購</button>
              : null
          )}
        />
      </section>
    </div>
  );
}

function PanelTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return <div className="panel-title">{icon}<h2>{title}</h2></div>;
}

function StatCard({ label, value, tone }: { label: string; value: number; tone: string }) {
  return <article className={`stat-card ${tone}`}><span>{label}</span><strong>{value}</strong></article>;
}

function OrderTable({
  orders,
  empty,
  renderActions
}: {
  orders: ProcurementOrder[];
  empty: string;
  renderActions: (order: ProcurementOrder) => React.ReactNode;
}) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>訂單</th>
            <th>商品</th>
            <th>平台</th>
            <th>報價</th>
            <th>狀態</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr><td colSpan={6}>{empty}</td></tr>
          ) : orders.map((order) => (
            <tr key={order.id}>
              <td><strong>{order.id}</strong><small>{new Date(order.updatedAt).toLocaleString("zh-HK")}</small></td>
              <td><span>{order.title}</span><small>{order.spec || order.remarks || "未填備註"}</small></td>
              <td>{order.platform}</td>
              <td>{order.quotedTotalHkd ? `HKD ${order.quotedTotalHkd}` : "待報價"}</td>
              <td><mark>{order.statusLabel}</mark></td>
              <td><div className="row-actions">{renderActions(order)}</div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<React.StrictMode><App /></React.StrictMode>);
