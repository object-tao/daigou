import React, { type FormEvent, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Bell,
  Boxes,
  ChartNoAxesCombined,
  ChevronDown,
  CircleDollarSign,
  ClipboardList,
  CloudDownload,
  FileText,
  Gavel,
  Globe2,
  Heart,
  Home,
  Languages,
  LockKeyhole,
  PackageCheck,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Truck,
  UserRound,
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

type AppMode = "home" | "member" | "admin";
type MenuItem = { id: string; label: string; icon?: typeof Home };
type MenuGroup = { title: string; icon: typeof Home; items: MenuItem[] };
type SessionPayload = {
  session: null | { actorType: "member" | "staff"; actorId: string; roleName: string | null; expiresAt: string };
};
type WorkQueue = {
  tickets: Array<{ id: string; type: string; status: string; priority: string; subject: string }>;
  scans: Array<{ id: string; packageId: string; step: string; code: string; location: string | null }>;
  ledger: Array<{ id: string; bucket: string; direction: string; amountHkd: number; amountJpy: number; source: string }>;
  seo: Array<{ entityType: string; entityId: string; locale: string; title: string; urlSlug: string }>;
  shipments: Array<{ id: string; lineCode: string; status: string; trackingNo: string | null; packageCount: number }>;
  trackingEvents: Array<{ id: string; shipmentId: string; status: string; location: string | null; description: string }>;
};

const emptyWorkQueue: WorkQueue = { tickets: [], scans: [], ledger: [], seo: [], shipments: [], trackingEvents: [] };

const memberGroups: MenuGroup[] = [
  {
    title: "個人中心",
    icon: UserRound,
    items: [
      { id: "member-home", label: "我的消息" },
      { id: "member-growth", label: "我的積分" },
      { id: "member-commission", label: "我的佣金" },
      { id: "member-support", label: "工單服務" },
      { id: "member-coupons", label: "卡券中心" },
      { id: "member-warehouse-address", label: "倉庫地址" }
    ]
  },
  {
    title: "訂單中心",
    icon: Boxes,
    items: [
      { id: "member-procurement", label: "提交隨意購" },
      { id: "member-auction", label: "Yahoo 代拍" },
      { id: "member-cart", label: "購物車" },
      { id: "member-orders", label: "訂單管理" },
      { id: "member-packages", label: "入庫包裹管理" },
      { id: "member-inbound-list", label: "商品入庫列表" },
      { id: "member-shipments", label: "運單管理" },
      { id: "member-shipment-packages", label: "運單包裹管理" }
    ]
  },
  {
    title: "財務中心",
    icon: WalletCards,
    items: [
      { id: "member-wallet", label: "付款請求" },
      { id: "member-topup", label: "在線充值" },
      { id: "member-remittance", label: "匯款管理" },
      { id: "member-ledger", label: "交易流水" }
    ]
  },
  {
    title: "帳號設置",
    icon: Settings,
    items: [
      { id: "member-auth", label: "註冊登入" },
      { id: "member-profile", label: "個人信息" },
      { id: "member-address", label: "收貨地址" },
      { id: "member-debit", label: "扣款授權" },
      { id: "member-password", label: "修改密碼" },
      { id: "member-email", label: "修改郵箱" }
    ]
  }
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

const memberMenuItems = memberGroups.flatMap((group) => group.items);
const marketplacePlatforms = ["mercari", "Rakuten Rakuma", "駿河屋", "amazon", "animate", "Yahoo フリマ", "ZOZOTOWN", "更多"];
const homeCategories = ["遊戲玩具", "智能設備", "運動用品", "家具家居", "時尚潮流", "書刊漫畫", "美容化妝", "嬰幼兒童", "精品雜貨"];
const dailyProducts = [
  ["ちいかわ ベビー おねんね缶バッジ", "1,000 日元", "https://images.unsplash.com/photo-1633545495735-25df17fb9f31?auto=format&fit=crop&w=520&q=80"],
  ["UNIQLO 牛仔褲 日系古著", "980 日元", "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=520&q=80"],
  ["Quiksilver 快乾背心 HAWAII", "2,590 日元", "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=520&q=80"],
  ["日系小包 藍色中古單肩包", "480 日元", "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=520&q=80"],
  ["戰鬥陀螺 收藏玩具", "1,900 日元", "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=520&q=80"]
];
const featureProducts = [
  ["任天堂復古掌機收藏", "6,000 日元", "https://images.unsplash.com/photo-1616248304589-6a3d8d60ad7d?auto=format&fit=crop&w=520&q=80"],
  ["遊戲限定版卡帶", "5,200 日元", "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=520&q=80"],
  ["日版遊戲主題 T 恤", "4,580 日元", "https://images.unsplash.com/photo-1571945153237-4929e783af4a?auto=format&fit=crop&w=520&q=80"],
  ["攻略本與設定集", "1,180 日元", "https://images.unsplash.com/photo-1513001900722-370f803f498d?auto=format&fit=crop&w=520&q=80"]
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
  if (!response.ok) throw new Error((payload as { error?: string }).error ?? "提交失敗");
  return payload as T;
}

function App() {
  const [mode, setMode] = useState<AppMode>("home");
  const [activeMenu, setActiveMenu] = useState("member-home");
  const [session, setSession] = useState<SessionPayload["session"]>(null);
  const [metrics, setMetrics] = useState<Metric[]>(adminMetrics);
  const [orders, setOrders] = useState<MemberOrder[]>(demoOrders);
  const [operations, setOperations] = useState<string[]>(fallbackAdminSummary.operations);
  const [workQueue, setWorkQueue] = useState<WorkQueue>(emptyWorkQueue);
  const [notice, setNotice] = useState("Ready");
  const [submitting, setSubmitting] = useState(false);
  const adminTitle = adminMenus.find((menu) => menu.id === activeMenu)?.label ?? "DropPilot";

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
    setActiveMenu(nextMode === "admin" ? "admin-dashboard" : "member-home");
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

  function login(event: FormEvent<HTMLFormElement>, actorType: "member" | "staff") {
    void handleForm(
      event,
      "登入中...",
      (form) => postJson<{ actorType: string; actorId: string; roleName: string | null }>("/api/auth/login", {
        email: String(form.get("email") ?? ""),
        password: String(form.get("password") ?? ""),
        actorType
      }),
      (result) => `已登入：${result.actorType} / ${result.actorId}${result.roleName ? ` / ${result.roleName}` : ""}`
    );
  }

  if (mode === "home") {
    return (
      <main className="home-shell">
        <ConsumerHeader onHome={() => switchMode("home")} onModeChange={() => switchMode("admin")} onUserCenter={() => switchMode("member")} />
        <HomePage />
      </main>
    );
  }

  if (mode === "member") {
    return (
      <main className="consumer-shell">
        <ConsumerHeader onHome={() => switchMode("home")} onModeChange={() => switchMode("admin")} onUserCenter={() => switchMode("member")} />
        <section className="consumer-body">
          <MemberSidebar activeMenu={activeMenu} onSelect={setActiveMenu} />
          <section className="consumer-workspace">
            <MemberProfileCard />
            {notice !== "Ready" ? <p className="notice" aria-live="polite">{notice}</p> : null}
            <div className="consumer-content">
              <div className="consumer-main">
                <MemberPage
                  activeMenu={activeMenu}
                  orders={orders}
                  workQueue={workQueue}
                  session={session}
                  submitting={submitting}
                  onLogin={login}
                  onSubmit={submit}
                  onSubmitWithId={submitWithId}
                />
              </div>
              <RightRail />
            </div>
          </section>
        </section>
      </main>
    );
  }

  return (
    <main className="shell admin-shell">
      <aside className="sidebar" aria-label="管理後台導航">
        <div className="brand"><span className="brand-mark">D</span><div><strong>DropPilot</strong><small>管理後台</small></div></div>
        <div className="mode-switch" aria-label="切換使用端">
          <button onClick={() => switchMode("home")} type="button">首頁</button>
          <button onClick={() => switchMode("member")} type="button">會員前台</button>
        </div>
        <nav>
          <span className="nav-section">後台功能</span>
          {adminMenus.map((menu) => (
            <button className={activeMenu === menu.id ? "active" : ""} key={menu.id} onClick={() => setActiveMenu(menu.id)} type="button">
              {menu.icon ? <menu.icon size={18} /> : null}{menu.label}
            </button>
          ))}
        </nav>
      </aside>
      <section className="workspace">
        <header className="topbar"><div><p className="eyebrow">Admin Console</p><h1>{adminTitle}</h1></div><div className="actions"><button aria-label="搜索"><Search size={19} /></button><button aria-label="通知"><Bell size={19} /></button></div></header>
        <p className="notice" aria-live="polite">{notice}</p>
        <AdminPage activeMenu={activeMenu} metrics={metrics} operations={operations} workQueue={workQueue} submitting={submitting} onLogin={login} onSubmit={submit} onSubmitWithId={submitWithId} />
      </section>
    </main>
  );
}

function ConsumerHeader({ onHome, onModeChange, onUserCenter }: { onHome: () => void; onModeChange: () => void; onUserCenter: () => void }) {
  return (
    <header className="consumer-header">
      <button className="consumer-brand" onClick={onHome} type="button"><span className="logo-badge">DP</span><strong>DropPilot</strong></button>
      <nav className="market-tabs"><button className="active" onClick={onHome} type="button">日本海淘</button><button onClick={onHome} type="button">煤爐商品購買</button></nav>
      <div className="search-bar"><Search size={22} /><input placeholder="商品搜索" /><button type="button">搜索</button></div>
      <div className="header-tools">
        <button title="語言" type="button"><Globe2 /><span>中文</span></button>
        <button title="下載 APP" type="button"><CloudDownload /><span>下載APP</span></button>
        <button onClick={onUserCenter} title="用戶中心" type="button"><UserRound /><span>用戶中心</span></button>
        <button title="收藏" type="button"><Heart /><span>收藏</span></button>
        <button onClick={onModeChange} title="管理後台" type="button"><ShieldCheck /><span>後台</span></button>
      </div>
    </header>
  );
}

function HomePage() {
  return (
    <section className="home-page">
      <section className="home-hero"><div className="hero-character"><span className="hero-mascot">DP</span><strong>日本代購與集運</strong></div><div className="hero-shopping"><span>JP</span><span>HK</span><span>UK</span></div></section>
      <section className="home-top-grid">
        <article className="promo-card"><div><p>提供豐富的產品優惠信息</p><h1>專業的海淘平台</h1><span>DropPilot 是一站式跨境海淘商城，為用戶提供便捷的全流程代購與集運服務。</span></div></article>
        <article className="platform-card">{marketplacePlatforms.map((name) => <button key={name} type="button"><strong>{name}</strong><span>{name.toUpperCase()}</span></button>)}</article>
      </section>
      <nav className="category-strip">{homeCategories.map((category) => <button key={category} type="button"><span>{category.slice(0, 1)}</span>{category}</button>)}</nav>
      <HomeSection title="每日推送"><div className="product-row">{dailyProducts.map(([title, price, image]) => <ProductCard image={image} key={title} price={price} title={title} />)}</div></HomeSection>
      <HomeSection title="專題推送"><div className="feature-grid"><article className="feature-banner"><h2>THE LEGEND OF JAPAN SHOPPING</h2><p>精選遊戲、動漫、模型與古著專題。</p></article><div className="feature-products">{featureProducts.map(([title, price, image]) => <ProductCard image={image} key={title} price={price} title={title} />)}</div></div></HomeSection>
      <HomeFooter />
    </section>
  );
}

function HomeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="home-section"><h2>{title}</h2>{children}</section>;
}

function ProductCard({ title, price, image }: { title: string; price: string; image: string }) {
  return (
    <article className="product-card">
      <div aria-label={title} className="product-image" role="img" style={{ backgroundImage: `linear-gradient(135deg, rgba(18,184,223,.18), rgba(246,169,10,.16)), url(${image})` }} />
      <h3>{title}</h3>
      <strong>{price}</strong>
    </article>
  );
}

function HomeFooter() {
  const groups = [["關於 DropPilot", "什麼是 DropPilot", "新手指引", "常見問題"], ["購物指南", "購物指南", "物流相關", "退貨及退款"], ["資費說明", "費用構成", "日本郵政", "支付方式"], ["公司信息", "公司介紹", "聯繫我們", "人才招聘"]];
  return <footer className="home-footer">{groups.map(([title, ...items]) => <div key={title}><h3>{title}</h3>{items.map((item) => <span key={item}>{item}</span>)}</div>)}<div className="footer-contact"><h3>聯繫我們</h3><strong>DropPilot</strong><span>電話：03-6912-6673</span><span>郵箱：info@droppilot.net</span></div></footer>;
}

function MemberSidebar({ activeMenu, onSelect }: { activeMenu: string; onSelect: (id: string) => void }) {
  return <aside className="member-sidebar">{memberGroups.map((group) => <section className="menu-group" key={group.title}><button className="group-title" type="button"><group.icon size={22} /><span>{group.title}</span><ChevronDown size={15} /></button><div className="group-items">{group.items.map((item) => <button className={activeMenu === item.id ? "active" : ""} key={item.id} onClick={() => onSelect(item.id)} type="button">{item.label}</button>)}</div></section>)}</aside>;
}

function MemberProfileCard() {
  return <section className="member-profile-card"><div className="banner-slot">Banner</div><div className="profile-main"><h2>18126257826</h2><div className="profile-tags"><span className="green">ID：V057448</span><span className="orange">標識：DPHK</span><span className="level">晶輝會員</span></div></div><div className="balance-box"><div><span>帳戶餘額</span><strong>HKD 0</strong></div><button type="button">去充值</button></div><div className="points-box"><span>積分</span><strong>0</strong></div></section>;
}

function RightRail() {
  return <aside className="right-rail"><InfoCard title="最新公告" items={["DropPilot 新會員免手續費活動", "倉儲費減免活動延期通知", "關於手機號綁定要求調整的通知"]} /><InfoCard title="常見問題" items={["DropPilot 的營業時間", "DropPilot 支持哪些網站的代購？", "DropPilot 代購的商品是正品嗎？"]} /><section className="rail-card contact-card"><h3>聯繫我們</h3><p>電話：03-6912-6673</p><p>郵箱：info@droppilot.net</p><p>地址：東京都豐島區池袋 2 丁目</p></section></aside>;
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return <section className="rail-card"><h3>{title}</h3><ul>{items.map((item) => <li key={item}><FileText size={16} />{item}</li>)}</ul></section>;
}

function MemberPage({
  activeMenu,
  orders,
  workQueue,
  session,
  submitting,
  onLogin,
  onSubmit,
  onSubmitWithId
}: {
  activeMenu: string;
  orders: MemberOrder[];
  workQueue: WorkQueue;
  session: SessionPayload["session"];
  submitting: boolean;
  onLogin: (event: FormEvent<HTMLFormElement>, actorType: "member" | "staff") => void;
  onSubmit: (path: string, busy: string, message: (result: { id?: string; status?: string; [key: string]: unknown }) => string) => (event: FormEvent<HTMLFormElement>) => void;
  onSubmitWithId: (pathBuilder: (form: FormData) => string, busy: string, message: (result: { id?: string; status?: string; [key: string]: unknown }) => string) => (event: FormEvent<HTMLFormElement>) => void;
}) {
  const title = memberMenuItems.find((item) => item.id === activeMenu)?.label ?? "我的消息";
  if (activeMenu === "member-home") return <MemberDashboardCard action="全部已讀" title="消息列表"><div className="empty-state">無數據</div></MemberDashboardCard>;
  if (activeMenu === "member-auth") {
    return <MemberDashboardCard title="註冊登入"><FormGrid><form onSubmit={onSubmit("/api/auth/register", "註冊中...", (result) => `會員已建立：${result.id}`)}><h3>電郵註冊</h3><input name="email" type="email" placeholder="email" required /><input name="displayName" placeholder="顯示名稱" /><input name="password" type="password" placeholder="密碼至少 8 位" required /><select name="locale" defaultValue="zh-Hant"><option value="zh-Hant">繁體中文</option><option value="en">English</option><option value="ja">日本語</option></select><button disabled={submitting}>註冊</button></form><form onSubmit={(event) => onLogin(event, "member")}><h3>會員登入</h3><input name="email" type="email" defaultValue="demo@droppilot.net" required /><input name="password" type="password" defaultValue="Member123!" required /><button disabled={submitting}>登入</button></form><form onSubmit={onSubmit("/api/auth/logout", "登出中...", () => "已登出")}><h3>目前身份</h3><p className="body-text">{session ? `${session.actorType} / ${session.actorId}` : "未登入"}</p><button disabled={submitting}>登出</button></form></FormGrid></MemberDashboardCard>;
  }
  if (activeMenu === "member-procurement") return <MemberDashboardCard title="提交隨意購"><FormGrid><form onSubmit={onSubmit("/api/procurement/orders", "提交代購...", (result) => `代購單已建立：${result.id}`)}><h3>提交代購需求</h3><input name="platform" placeholder="平台，如 Mercari" required /><input name="productUrl" placeholder="商品 URL" required /><input name="title" placeholder="商品名稱" required /><input name="quantity" type="number" min="1" defaultValue="1" required /><textarea name="remarks" placeholder="備註" /><button disabled={submitting}>提交代購</button></form><form onSubmit={onSubmitWithId((form) => `/api/procurement/orders/${encodeURIComponent(String(form.get("orderId") ?? ""))}/pay`, "扣款中...", (result) => `已付款：${result.id}`)}><h3>支付已報價訂單</h3><input name="orderId" defaultValue="DP-PO-10001" required /><button disabled={submitting}>餘額付款</button></form></FormGrid></MemberDashboardCard>;
  if (activeMenu === "member-auction") return <MemberDashboardCard title="Yahoo 代拍"><FormGrid><form onSubmit={onSubmit("/api/auction/orders", "提交代拍...", (result) => `代拍單已建立：${result.id}`)}><h3>提交代拍授權</h3><input name="lotUrl" placeholder="Yahoo 拍賣 URL" required /><input name="title" placeholder="拍品名稱" required /><input name="maxBidJpy" type="number" min="1" placeholder="最高出價 JPY" required /><input name="authorizationLimitJpy" type="number" min="1" placeholder="授權扣款上限 JPY" required /><button disabled={submitting}>提交代拍</button></form></FormGrid></MemberDashboardCard>;
  if (activeMenu === "member-cart") return <MemberDashboardCard title="購物車"><FormGrid><form onSubmit={onSubmit("/api/cart/items", "加入購物車...", (result) => `已加入購物車：${result.id}`)}><h3>加入商品</h3><input name="platform" placeholder="平台" required /><input name="productUrl" placeholder="商品 URL" required /><input name="title" placeholder="商品名稱" required /><input name="quantity" type="number" min="1" defaultValue="1" /><textarea name="remarks" placeholder="備註；日本本地運費採購後補收" /><button disabled={submitting}>加入購物車</button></form><form onSubmit={onSubmit("/api/cart/checkout", "建立代購單...", (result) => `已建立 ${result.count} 張代購單`)}><h3>轉為代購單</h3><p className="body-text">跨平台商品會分別生成代購單。</p><button disabled={submitting}>購物車結帳</button></form></FormGrid></MemberDashboardCard>;
  if (["member-wallet", "member-topup", "member-remittance", "member-ledger"].includes(activeMenu)) return <MemberDashboardCard title={title}><FormGrid><form onSubmit={onSubmit("/api/payments/bank-transfer-requests", "提交充值...", (result) => `充值申請已提交：${result.id}`)}><h3>銀行轉帳充值</h3><input name="amountHkd" type="number" min="1" placeholder="金額 HKD" required /><input name="proofUrl" placeholder="付款憑證 URL" /><button disabled={submitting}>提交充值</button></form><form onSubmit={onSubmit("/api/member/notification-preferences", "更新通知...", (result) => `通知已更新：${result.channel}`)}><h3>通知偏好</h3><select name="channel"><option value="email">Email</option><option value="whatsapp">WhatsApp</option></select><select name="enabled"><option value="true">啟用</option><option value="">停用</option></select><button disabled={submitting}>儲存通知</button></form></FormGrid><QueueList items={workQueue.ledger} empty="暫無交易流水" render={(entry) => `${entry.bucket} / ${entry.direction} / HKD ${entry.amountHkd}`} /></MemberDashboardCard>;
  if (["member-packages", "member-inbound-list"].includes(activeMenu)) return <MemberDashboardCard title={title}><FormGrid><form onSubmit={onSubmit("/api/value-added-services", "提交增值服務...", (result) => `增值服務已建立：${result.id}`)}><h3>增值服務</h3><input name="packageId" defaultValue="DP-PK-10003" required /><select name="serviceType">{serviceBlueprint.valueAddedServices.map((service) => <option key={service.code} value={service.code}>{service.label}</option>)}</select><button disabled={submitting}>提交服務</button></form><form onSubmit={onSubmitWithId((form) => `/api/packages/${encodeURIComponent(String(form.get("packageId") ?? ""))}/claim`, "認領中...", (result) => `包裹已認領：${result.id}`)}><h3>無主包裹認領</h3><input name="packageId" defaultValue="DP-PK-OWNERLESS" required /><button disabled={submitting}>提交認領</button></form></FormGrid><OrderList orders={orders} /></MemberDashboardCard>;
  if (["member-shipments", "member-shipment-packages"].includes(activeMenu)) return <MemberDashboardCard title={title}><FormGrid><form onSubmit={onSubmitWithId((form) => `/api/shipments/${encodeURIComponent(String(form.get("shipmentId") ?? ""))}/pay-freight`, "支付運費...", (result) => `運費已支付：${result.id}`)}><h3>支付國際運費</h3><input name="shipmentId" defaultValue="DP-SH-10001" required /><button disabled={submitting}>餘額支付</button></form></FormGrid><QueueList items={workQueue.shipments} empty="暫無運單" render={(shipment) => `${shipment.id} / ${shipment.lineCode} / ${shipment.status}`} /><QueueList items={workQueue.trackingEvents} empty="暫無物流節點" render={(event) => `${event.shipmentId} / ${event.status} / ${event.location ?? "-"}`} /></MemberDashboardCard>;
  if (activeMenu === "member-support") return <MemberDashboardCard title="工單服務"><FormGrid><form onSubmit={onSubmit("/api/support/tickets", "提交工單...", (result) => `工單已提交：${result.id}`)}><h3>客服工單</h3><select name="ticketType">{supportTicketTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select><input name="subject" placeholder="主題" required /><textarea name="description" placeholder="問題描述" required /><button disabled={submitting}>提交工單</button></form><form onSubmit={onSubmit("/api/aftersales/requests", "提交售後...", (result) => `售後申請已提交：${result.id}`)}><h3>取消 / 退款申請</h3><select name="orderType"><option value="procurement">代購</option><option value="shipment">物流</option></select><input name="orderId" defaultValue="DP-PO-10001" required /><select name="requestType"><option value="cancel">取消</option><option value="refund">退款</option></select><textarea name="reason" placeholder="原因" required /><button disabled={submitting}>提交售後</button></form></FormGrid><QueueList items={workQueue.tickets} empty="暫無工單" render={(ticket) => `${ticket.subject} / ${ticket.status}`} /></MemberDashboardCard>;
  if (["member-growth", "member-commission", "member-coupons"].includes(activeMenu)) return <MemberDashboardCard title={title}><FormGrid><form onSubmit={onSubmit("/api/points/redemptions", "兌換積分...", (result) => `兌換申請已提交：${result.id}`)}><h3>積分兌換</h3><select name="bucket"><option value="procurement">代購商品積分</option><option value="logistics">物流費用積分</option></select><input name="points" type="number" min="1" placeholder="積分" required /><input name="rewardName" placeholder="兌換商品" required /><button disabled={submitting}>提交兌換</button></form><form onSubmit={onSubmit("/api/coupons/redeem", "使用優惠券...", (result) => `優惠券已使用：HKD ${result.discountHkd}`)}><h3>優惠券</h3><input name="code" defaultValue="WELCOME30" required /><input name="sourceType" defaultValue="procurement_order" required /><input name="sourceId" defaultValue="DP-PO-10001" required /><button disabled={submitting}>使用優惠券</button></form></FormGrid></MemberDashboardCard>;
  return <MemberDashboardCard title={title}><div className="empty-state">此功能頁已建立菜單入口，後續接入詳細資料表。</div></MemberDashboardCard>;
}

function AdminPage({
  activeMenu,
  metrics,
  operations,
  workQueue,
  submitting,
  onLogin,
  onSubmit,
  onSubmitWithId
}: {
  activeMenu: string;
  metrics: Metric[];
  operations: string[];
  workQueue: WorkQueue;
  submitting: boolean;
  onLogin: (event: FormEvent<HTMLFormElement>, actorType: "member" | "staff") => void;
  onSubmit: (path: string, busy: string, message: (result: { id?: string; status?: string; [key: string]: unknown }) => string) => (event: FormEvent<HTMLFormElement>) => void;
  onSubmitWithId: (pathBuilder: (form: FormData) => string, busy: string, message: (result: { id?: string; status?: string; [key: string]: unknown }) => string) => (event: FormEvent<HTMLFormElement>) => void;
}) {
  if (activeMenu === "admin-auth") return <AdminFormPanel title="後台登入" icon={ShieldCheck}><form onSubmit={(event) => onLogin(event, "staff")}><h3>員工登入</h3><input name="email" type="email" defaultValue="admin@droppilot.net" required /><input name="password" type="password" defaultValue="Admin123!" required /><button disabled={submitting}>登入</button></form></AdminFormPanel>;
  if (activeMenu === "admin-quotes") return <AdminFormPanel title="代購報價" icon={ShoppingCart}><form onSubmit={onSubmitWithId((form) => `/api/admin/procurement/orders/${encodeURIComponent(String(form.get("orderId") ?? ""))}/quote`, "報價中...", (result) => `已報價：${result.id}`)}><h3>報價訂單</h3><input name="orderId" defaultValue="DP-PO-10001" required /><input name="itemAmountJpy" type="number" min="1" placeholder="商品金額 JPY" required /><input name="localShippingJpy" type="number" min="0" placeholder="日本本地運費 JPY" /><input name="serviceFeeHkd" type="number" min="0" placeholder="服務費 HKD" /><textarea name="remarks" placeholder="報價備註" /><button disabled={submitting}>提交報價</button></form></AdminFormPanel>;
  if (activeMenu === "admin-auction") return <AdminFormPanel title="代拍處理" icon={Gavel}><form onSubmit={onSubmitWithId((form) => `/api/admin/auction/orders/${encodeURIComponent(String(form.get("orderId") ?? ""))}/resolve`, "處理代拍...", (result) => `代拍已處理：${result.id}`)}><h3>得標 / 流標</h3><input name="orderId" defaultValue="DP-AU-10002" required /><select name="result"><option value="won">得標</option><option value="lost">流標退款</option></select><input name="winningBidJpy" type="number" min="0" placeholder="落札價 JPY" /><button disabled={submitting}>確認結果</button></form></AdminFormPanel>;
  if (activeMenu === "admin-purchasing") return <AdminFormPanel title="採購入庫預報" icon={PackageCheck}><form onSubmit={onSubmitWithId((form) => `/api/admin/procurement/orders/${encodeURIComponent(String(form.get("orderId") ?? ""))}/mark-purchased`, "生成預報...", (result) => `已生成入庫預報：${result.packageId}`)}><h3>標記已採購</h3><input name="orderId" defaultValue="DP-PO-10001" required /><input name="japanTrackingNo" placeholder="日本物流單號" /><input name="warehouseId" defaultValue="warehouse-funabashi" /><textarea name="remarks" placeholder="採購備註" /><button disabled={submitting}>生成入庫預報</button></form></AdminFormPanel>;
  if (activeMenu === "admin-inbound") return <AdminFormPanel title="入庫與無主件" icon={Boxes}><form onSubmit={onSubmit("/api/admin/warehouse/inbound-packages", "入庫中...", (result) => `包裹已入庫：${result.id}`)}><h3>入庫掃碼</h3><input name="memberId" defaultValue="demo-member" placeholder="會員 ID；無主件留空" /><input name="warehouseId" defaultValue="warehouse-funabashi" /><input name="trackingNo" placeholder="日本物流單號" required /><input name="weightGram" type="number" min="0" placeholder="重量 g" /><input name="volumeCm3" type="number" min="0" placeholder="體積 cm3" /><button disabled={submitting}>登記入庫</button></form><form onSubmit={onSubmit("/api/admin/warehouse/destroy-expired-ownerless", "清理中...", (result) => `已銷毀 ${result.destroyed} 件`)}><h3>60 天無主件處理</h3><p className="body-text">超過保留期的公海包裹會標記為 destroyed。</p><button disabled={submitting}>執行清理</button></form></AdminFormPanel>;
  if (activeMenu === "admin-consolidation") return <AdminFormPanel title="合箱與運費" icon={Truck}><form onSubmit={onSubmit("/api/admin/shipments", "建立發貨單...", (result) => `發貨單已建立：${result.id}`)}><h3>建立合箱出庫</h3><input name="packageIds" placeholder="包裹 ID，以逗號分隔" required /><input name="lineCode" defaultValue="HK-AIR-STANDARD" required /><input name="cartonFeeHkd" type="number" min="0" defaultValue="15" /><input name="freightFeeHkd" type="number" min="0" placeholder="可先留空" /><button disabled={submitting}>建立發貨單</button></form><form onSubmit={onSubmitWithId((form) => `/api/admin/shipments/${encodeURIComponent(String(form.get("shipmentId") ?? ""))}/freight-quotes`, "計算運費...", (result) => `計費重量 ${result.billingWeightGram}g，運費 HKD ${result.freightFeeHkd}`)}><h3>實重 / 體積重取高</h3><input name="shipmentId" defaultValue="DP-SH-10001" required /><input name="actualWeightGram" type="number" min="1" placeholder="實重 g" required /><input name="lengthCm" type="number" min="1" placeholder="長 cm" required /><input name="widthCm" type="number" min="1" placeholder="寬 cm" required /><input name="heightCm" type="number" min="1" placeholder="高 cm" required /><input name="ratePerKgHkd" type="number" min="1" placeholder="每 kg HKD" required /><button disabled={submitting}>計算運費</button></form></AdminFormPanel>;
  if (activeMenu === "admin-tracking") return <AdminFormPanel title="物流節點" icon={Globe2}><form onSubmit={onSubmitWithId((form) => `/api/admin/shipments/${encodeURIComponent(String(form.get("shipmentId") ?? ""))}/tracking-events`, "新增節點...", (result) => `物流節點已新增：${result.id}`)}><h3>新增物流追蹤</h3><input name="shipmentId" defaultValue="DP-SH-10001" required /><select name="status"><option value="packed">已打包</option><option value="outbound">已出庫</option><option value="departed_by_air_or_sea">已上飛機/船</option><option value="arrived_port">到港</option><option value="customs_clearance">清關</option><option value="delivery">派送</option><option value="signed">簽收</option></select><input name="location" defaultValue="Funabashi" /><input name="trackingNo" placeholder="國際物流號" /><textarea name="description" defaultValue="Package moved to next logistics step." /><button disabled={submitting}>新增節點</button></form></AdminFormPanel>;
  if (activeMenu === "admin-finance") return <AdminFormPanel title="財務與退款" icon={CircleDollarSign}><form onSubmit={onSubmitWithId((form) => `/api/admin/payments/${encodeURIComponent(String(form.get("paymentId") ?? ""))}/approve`, "入帳中...", (result) => `充值已入帳：${result.id}`)}><h3>銀行轉帳入帳</h3><input name="paymentId" defaultValue="pay-demo-bank-1" required /><button disabled={submitting}>審核入帳</button></form><form onSubmit={onSubmitWithId((form) => `/api/admin/aftersales/${encodeURIComponent(String(form.get("requestId") ?? ""))}/review`, "審核售後...", (result) => `售後已處理：${result.id}`)}><h3>售後 / 退款審核</h3><input name="requestId" defaultValue="after-demo-refund" required /><select name="decision"><option value="approved">批准</option><option value="rejected">拒絕</option></select><input name="refundHkd" type="number" min="0" placeholder="退款 HKD" /><button disabled={submitting}>提交審核</button></form></AdminFormPanel>;
  if (activeMenu === "admin-roles") return <RolePanel />;
  if (activeMenu === "admin-content") return <ContentPanel submitting={submitting} onSubmit={onSubmit} />;
  if (activeMenu === "admin-export") return <ExportPanel submitting={submitting} onSubmit={onSubmit} />;
  if (activeMenu === "admin-rules") return <RulesPanel />;
  return <section className="page-grid"><div className="metric-grid full-span">{metrics.map((metric) => <article className={`metric ${metric.tone}`} key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong></article>)}</div><Panel eyebrow="Work Queue" title="後台工作隊列" icon={ChartNoAxesCombined}><div className="queue-grid"><QueueTile title="Tickets" text={workQueue.tickets[0]?.subject ?? "No ticket"} /><QueueTile title="Warehouse" text={workQueue.scans[0] ? `${workQueue.scans[0].packageId} / ${workQueue.scans[0].step}` : "No scan"} /><QueueTile title="Shipments" text={workQueue.shipments[0] ? `${workQueue.shipments[0].id} / ${workQueue.shipments[0].status}` : "No shipment"} /><QueueTile title="Tracking" text={workQueue.trackingEvents[0] ? `${workQueue.trackingEvents[0].shipmentId} / ${workQueue.trackingEvents[0].status}` : "No event"} /></div></Panel><Panel eyebrow="Runbook" title="待處理運營動作" icon={ClipboardList}><ul className="check-list">{operations.slice(0, 5).map((operation) => <li key={operation}>{operation}</li>)}</ul></Panel></section>;
}

function MemberDashboardCard({ title, action, children }: { title: string; action?: string; children: React.ReactNode }) {
  return <section className="member-dashboard-card"><div className="member-card-heading"><h2>{title}</h2>{action ? <button type="button">{action}</button> : null}</div>{children}</section>;
}

function AdminFormPanel({ title, icon, children }: { title: string; icon: typeof Home; children: React.ReactNode }) {
  return <section className="page-grid"><Panel eyebrow="Admin" title={title} icon={icon} className="full-span"><FormGrid>{children}</FormGrid></Panel></section>;
}

function Panel({ eyebrow, title, icon: Icon, className = "", children }: { eyebrow: string; title: string; icon: typeof Home; className?: string; children: React.ReactNode }) {
  return <section className={`panel ${className}`}><div className="panel-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div><Icon size={22} /></div>{children}</section>;
}

function FormGrid({ children }: { children: React.ReactNode }) {
  return <div className="form-grid">{children}</div>;
}

function OrderList({ orders }: { orders: MemberOrder[] }) {
  return <div className="order-list">{(orders.length ? orders : demoOrders).map((order) => <article className="order-row" key={order.id}><div><strong>{order.id}</strong><span>{order.type} / {order.platform ?? order.warehouse}</span></div><mark>{order.status}</mark></article>)}</div>;
}

function QueueList<T>({ items, empty, render }: { items: T[]; empty: string; render: (item: T) => string }) {
  return <div className="order-list">{items.length === 0 ? <article className="order-row"><span>{empty}</span></article> : items.slice(0, 8).map((item, index) => <article className="order-row" key={index}><span>{render(item)}</span></article>)}</div>;
}

function QueueTile({ title, text }: { title: string; text: string }) {
  return <div><strong>{title}</strong><span>{text}</span></div>;
}

function RolePanel() {
  return <section className="page-grid"><Panel eyebrow="Roles" title="角色權限" icon={Users} className="full-span"><div className="role-list">{roleMatrix.map((role) => <div className="role-row" key={role.role}><strong>{role.label}</strong><span>{role.scope}</span></div>)}</div></Panel></section>;
}

function ContentPanel({ submitting, onSubmit }: { submitting: boolean; onSubmit: (path: string, busy: string, message: (result: { id?: string; status?: string; [key: string]: unknown }) => string) => (event: FormEvent<HTMLFormElement>) => void }) {
  return <AdminFormPanel title="多語與 SEO" icon={Languages}><form onSubmit={onSubmit("/api/admin/translations", "保存翻譯...", (result) => `翻譯已保存：${result.locale}`)}><h3>翻譯管理</h3><input name="namespace" defaultValue="ui" /><input name="translationKey" placeholder="key" required /><select name="locale"><option value="zh-Hant">繁體</option><option value="en">English</option><option value="ja">日本語</option></select><textarea name="value" placeholder="內容" required /><button disabled={submitting}>保存翻譯</button></form><form onSubmit={onSubmit("/api/admin/seo", "保存 SEO...", (result) => `SEO 已保存：${result.urlSlug}`)}><h3>SEO 條目</h3><input name="entityType" defaultValue="page" /><input name="entityId" defaultValue="pricing" /><select name="locale"><option value="zh-Hant">繁體</option><option value="en">English</option><option value="ja">日本語</option></select><input name="title" placeholder="Title" required /><input name="urlSlug" placeholder="URL Slug" required /><textarea name="metaDescription" placeholder="Meta Description" /><button disabled={submitting}>保存 SEO</button></form></AdminFormPanel>;
}

function ExportPanel({ submitting, onSubmit }: { submitting: boolean; onSubmit: (path: string, busy: string, message: (result: { id?: string; status?: string; [key: string]: unknown }) => string) => (event: FormEvent<HTMLFormElement>) => void }) {
  return <AdminFormPanel title="匯出與附件" icon={FileText}><form action="/api/admin/export/ledger.csv" method="get"><h3>CSV 匯出</h3><p className="body-text">登入財務或管理員後可下載流水 CSV。</p><button type="submit">下載財務流水</button></form><form onSubmit={onSubmit("/api/attachments", "登記附件...", (result) => `附件已登記：${result.id}`)}><h3>附件登記</h3><input name="ownerType" defaultValue="payment_request" /><input name="ownerId" defaultValue="pay-demo-bank-1" /><input name="fileName" placeholder="檔名" required /><input name="contentType" defaultValue="image/jpeg" /><input name="publicUrl" placeholder="暫存 URL" /><button disabled={submitting}>登記附件</button></form></AdminFormPanel>;
}

function RulesPanel() {
  return <section className="page-grid"><Panel eyebrow="Rules" title="基礎規則" icon={Settings} className="full-span"><div className="rule-grid"><div><strong>包裹編號</strong><span>{packageNumberRules.map((rule) => rule.label).join("、")}</span></div><div><strong>客服工單</strong><span>{supportTicketTypes.slice(0, 5).join("、")}</span></div><div><strong>倉庫掃碼</strong><span>{warehouseScanSteps.join("、")}</span></div><div><strong>SEO 欄位</strong><span>{seoFields.join("、")}</span></div></div></Panel></section>;
}

createRoot(document.getElementById("root")!).render(<React.StrictMode><App /></React.StrictMode>);
