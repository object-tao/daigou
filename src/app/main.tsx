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

const memberFlows = [
  { icon: ShoppingCart, title: "代購購物車", text: "跨平台商品可合併提交，保留備註與日本本地運費後補。" },
  { icon: Gavel, title: "Yahoo 人工代拍", text: "會員設定最高出價與授權上限，客服在授權範圍內人工出價。" },
  { icon: Boxes, title: "集運與合箱", text: "船橋倉作為最終出發倉，免費合箱，紙箱費與增值服務另計。" },
  { icon: PackageCheck, title: "一件直發", text: "單件貨不需上架等待時，提醒轉入出庫打包區等待發運。" }
];

const adminModules = [
  "會員與標籤",
  "角色權限",
  "員工帳號",
  "匯率設定",
  "銀行入帳審核",
  "代購訂單",
  "代拍訂單",
  "倉庫包裹",
  "無主公海",
  "增值服務",
  "優惠券",
  "翻譯管理",
  "字典管理",
  "操作日誌",
  "報表匯出",
  "售後審核"
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
  const [metrics, setMetrics] = useState<Metric[]>(adminMetrics);
  const [orders, setOrders] = useState<MemberOrder[]>(demoOrders);
  const [operations, setOperations] = useState<string[]>(fallbackAdminSummary.operations);
  const [workQueue, setWorkQueue] = useState<WorkQueue>(emptyWorkQueue);
  const [notice, setNotice] = useState("Ready");
  const [submitting, setSubmitting] = useState(false);

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

  async function submitProcurement(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSubmitting(true);
    setNotice("Submitting procurement order...");

    try {
      const result = await postJson<{ id: string; status: string }>("/api/procurement/orders", {
        platform: String(form.get("platform") ?? ""),
        productUrl: String(form.get("productUrl") ?? ""),
        title: String(form.get("title") ?? ""),
        quantity: Number(form.get("quantity") ?? 1),
        remarks: String(form.get("remarks") ?? "")
      });
      setNotice(`代購訂單已提交：${result.id}`);
      event.currentTarget.reset();
      await refreshData();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "提交失敗");
    } finally {
      setSubmitting(false);
    }
  }

  async function submitPayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSubmitting(true);
    setNotice("Submitting bank transfer request...");

    try {
      const result = await postJson<{ id: string; status: string }>("/api/payments/bank-transfer-requests", {
        amountHkd: Number(form.get("amountHkd") ?? 0),
        proofUrl: String(form.get("proofUrl") ?? "")
      });
      setNotice(`充值申請已提交：${result.id}`);
      event.currentTarget.reset();
      await refreshData();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "提交失敗");
    } finally {
      setSubmitting(false);
    }
  }

  async function submitTicket(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSubmitting(true);
    setNotice("Submitting support ticket...");

    try {
      const result = await postJson<{ id: string; status: string }>("/api/support/tickets", {
        ticketType: String(form.get("ticketType") ?? ""),
        subject: String(form.get("subject") ?? ""),
        description: String(form.get("description") ?? ""),
        relatedType: String(form.get("relatedType") ?? ""),
        relatedId: String(form.get("relatedId") ?? "")
      });
      setNotice(`客服工單已提交：${result.id}`);
      event.currentTarget.reset();
      await refreshData();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "提交失敗");
    } finally {
      setSubmitting(false);
    }
  }

  async function submitInboundPackage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSubmitting(true);
    setNotice("Receiving inbound package...");

    try {
      const result = await postJson<{ id: string; status: string; ownerStatus: string }>(
        "/api/admin/warehouse/inbound-packages",
        {
          memberId: String(form.get("memberId") ?? ""),
          warehouseId: String(form.get("warehouseId") ?? "warehouse-funabashi"),
          trackingNo: String(form.get("trackingNo") ?? ""),
          weightGram: Number(form.get("weightGram") ?? 0),
          volumeCm3: Number(form.get("volumeCm3") ?? 0)
        }
      );
      setNotice(`入庫包裹已建立：${result.id} / ${result.ownerStatus}`);
      event.currentTarget.reset();
      await refreshData();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "入庫失敗");
    } finally {
      setSubmitting(false);
    }
  }

  async function submitShipment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSubmitting(true);
    setNotice("Creating shipment...");

    try {
      const result = await postJson<{ id: string; status: string; packageCount: number }>("/api/admin/shipments", {
        packageIds: String(form.get("packageIds") ?? ""),
        lineCode: String(form.get("lineCode") ?? ""),
        cartonFeeHkd: Number(form.get("cartonFeeHkd") ?? 0),
        freightFeeHkd: Number(form.get("freightFeeHkd") ?? 0)
      });
      setNotice(`發貨單已建立：${result.id}，包裹 ${result.packageCount} 件`);
      event.currentTarget.reset();
      await refreshData();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "發貨單建立失敗");
    } finally {
      setSubmitting(false);
    }
  }

  async function submitTrackingEvent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const shipmentId = String(form.get("shipmentId") ?? "").trim();
    setSubmitting(true);
    setNotice("Adding tracking event...");

    try {
      const result = await postJson<{ id: string; shipmentStatus: string }>(
        `/api/admin/shipments/${encodeURIComponent(shipmentId)}/tracking-events`,
        {
          status: String(form.get("status") ?? ""),
          location: String(form.get("location") ?? ""),
          description: String(form.get("description") ?? ""),
          trackingNo: String(form.get("trackingNo") ?? "")
        }
      );
      setNotice(`物流節點已新增：${result.id}，發貨單狀態 ${result.shipmentStatus}`);
      event.currentTarget.reset();
      await refreshData();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "物流節點新增失敗");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="shell">
      <aside className="sidebar" aria-label="主導航">
        <div className="brand">
          <span className="brand-mark">D</span>
          <div>
            <strong>DropPilot</strong>
            <small>日本代購及集運</small>
          </div>
        </div>
        <nav>
          <a href="#home" className="active"><Home size={18} /> 首頁</a>
          <a href="#actions"><ShoppingCart size={18} /> 提交</a>
          <a href="#warehouse"><Boxes size={18} /> 倉儲</a>
          <a href="#finance"><CircleDollarSign size={18} /> 財務</a>
          <a href="#admin"><Settings size={18} /> 後台</a>
        </nav>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">繁體中文優先 · 港幣結算 · Cloudflare 部署</p>
            <h1>面向香港用戶的日本代購、代拍、集運營運系統</h1>
          </div>
          <div className="actions">
            <button aria-label="搜尋"><Search size={19} /></button>
            <button aria-label="通知"><Bell size={19} /></button>
          </div>
        </header>

        <section className="metric-grid" aria-label="營運摘要">
          {metrics.map((metric) => (
            <article className={`metric ${metric.tone}`} key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </article>
          ))}
        </section>

        <section className="content-grid">
          <div className="panel main-panel" id="home">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Member Journey</p>
                <h2>會員端 MVP 流程</h2>
              </div>
              <Globe2 size={22} />
            </div>
            <div className="task-grid">
              {memberFlows.map((task) => (
                <article className="task" key={task.title}>
                  <task.icon size={21} />
                  <h3>{task.title}</h3>
                  <p>{task.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="panel" id="finance">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Finance</p>
                <h2>支付、匯率與餘額</h2>
              </div>
              <WalletCards size={22} />
            </div>
            <ul className="check-list">
              <li>前期銀行轉帳，財務人工審核入帳。</li>
              <li>港幣充值，人工匯率折算日元成本。</li>
              <li>授權範圍內自動扣款，超額轉確認。</li>
              <li>佣金按營收百分比回充至會員餘額。</li>
            </ul>
          </div>

          <div className="panel main-panel" id="actions">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Member Actions</p>
                <h2>會員提交入口</h2>
              </div>
              <ShoppingCart size={22} />
            </div>
            <p className="notice" aria-live="polite">{notice}</p>
            <div className="form-grid">
              <form onSubmit={submitProcurement}>
                <h3>人工代購</h3>
                <input name="platform" placeholder="平台，例如 Mercari" required />
                <input name="productUrl" placeholder="商品 URL" required />
                <input name="title" placeholder="商品名稱" required />
                <input name="quantity" type="number" min="1" defaultValue="1" required />
                <textarea name="remarks" placeholder="備註" />
                <button disabled={submitting} type="submit">提交代購</button>
              </form>
              <form onSubmit={submitPayment}>
                <h3>銀行轉帳充值</h3>
                <input name="amountHkd" type="number" min="1" placeholder="金額 HKD" required />
                <input name="proofUrl" placeholder="付款憑證 URL（可後補）" />
                <button disabled={submitting} type="submit">提交充值</button>
              </form>
              <form onSubmit={submitTicket}>
                <h3>客服工單</h3>
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
            </div>
          </div>

          <div className="panel main-panel" id="warehouse-actions">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Warehouse Actions</p>
                <h2>後台倉庫操作</h2>
              </div>
              <Boxes size={22} />
            </div>
            <div className="form-grid">
              <form onSubmit={submitInboundPackage}>
                <h3>入庫登記</h3>
                <input name="memberId" placeholder="會員 ID；無主包裹可留空" defaultValue="demo-member" />
                <input name="warehouseId" placeholder="倉庫 ID" defaultValue="warehouse-funabashi" />
                <input name="trackingNo" placeholder="日本物流單號" required />
                <input name="weightGram" type="number" min="0" placeholder="重量 g" />
                <input name="volumeCm3" type="number" min="0" placeholder="體積 cm3" />
                <button disabled={submitting} type="submit">登記入庫</button>
              </form>
              <form onSubmit={submitShipment}>
                <h3>建立合箱發貨單</h3>
                <input name="packageIds" placeholder="包裹 ID，逗號分隔；先入庫後再填入" required />
                <input name="lineCode" placeholder="線路代碼" defaultValue="HK-AIR-STANDARD" required />
                <input name="cartonFeeHkd" type="number" min="0" placeholder="紙箱費 HKD" defaultValue="15" />
                <input name="freightFeeHkd" type="number" min="0" placeholder="國際運費 HKD" />
                <button disabled={submitting} type="submit">建立發貨單</button>
              </form>
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
            </div>
          </div>

          <div className="panel" id="warehouse">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Warehouse</p>
                <h2>物流與倉儲</h2>
              </div>
              <Truck size={22} />
            </div>
            <ul className="timeline">
              <li><span>門市/供應商</span><strong>收貨與初檢</strong></li>
              <li><span>船橋倉</span><strong>入庫、合箱、增值服務</strong></li>
              <li><span>自建線路</span><strong>國際發運與追蹤</strong></li>
              <li><span>客戶</span><strong>簽收與售後申請</strong></li>
            </ul>
          </div>

          <div className="panel main-panel" id="admin">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Admin Console</p>
                <h2>後台管理模組</h2>
              </div>
              <ShieldCheck size={22} />
            </div>
            <div className="module-grid">
              {adminModules.map((module) => (
                <span key={module}>{module}</span>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Roles</p>
                <h2>多角色權限</h2>
              </div>
              <Users size={22} />
            </div>
            <div className="role-list">
              {roleMatrix.filter((role) => role.role !== "super_admin").map((role) => (
                <div className="role-row" key={role.role}>
                  <strong>{role.label}</strong>
                  <span>{role.scope}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Growth</p>
                <h2>會員推薦與積分</h2>
              </div>
              <TicketPercent size={22} />
            </div>
            <p className="body-text">
              支援 {serviceBlueprint.memberLevels.length} 級會員、推薦佣金、代購商品積分與物流費用積分。開團者獎勵和優惠券限制由後台配置。
            </p>
          </div>

          <div className="panel main-panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Live Orders</p>
                <h2>會員訂單樣例</h2>
              </div>
              <ClipboardList size={22} />
            </div>
            <div className="order-list">
              {orders.map((order) => (
                <article className="order-row" key={order.id}>
                  <div>
                    <strong>{order.id}</strong>
                    <span>{order.type} · {order.platform ?? order.warehouse}</span>
                  </div>
                  <mark>{order.status}</mark>
                </article>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Content</p>
                <h2>多語與 SEO</h2>
              </div>
              <Languages size={22} />
            </div>
            <p className="body-text">
              前台與後台內容保留繁體中文、英文、日文翻譯管理。H5 先做好語義標題、描述和可索引內容。
            </p>
          </div>

          <div className="panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Security</p>
                <h2>安全與審計</h2>
              </div>
              <LockKeyhole size={22} />
            </div>
            <p className="body-text">
              身份圖片、付款憑證和包裹照片後續放私有 R2。會員提交和後台操作全量寫入審計日誌。
            </p>
          </div>

          <div className="panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Reports</p>
                <h2>報表與遷移</h2>
              </div>
              <FileText size={22} />
            </div>
            <p className="body-text">
              首期提供 CSV/Excel 匯出接口邊界；舊系統資料遷移需先盤點會員、餘額、訂單、包裹、圖片和交易流水。
            </p>
          </div>

          <div className="panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Operations</p>
                <h2>自動刷新策略</h2>
              </div>
              <ClipboardList size={22} />
            </div>
            <p className="body-text">
              MVP 以服務端排程和列表輪詢為主，待訂單量與客服使用節奏穩定後再引入 WebSocket 或 SSE。
            </p>
          </div>

          <div className="panel main-panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Rules</p>
                <h2>基礎規則配置</h2>
              </div>
              <Settings size={22} />
            </div>
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
          </div>

          <div className="panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Runbook</p>
                <h2>待處理運營動作</h2>
              </div>
              <ChartNoAxesCombined size={22} />
            </div>
            <ul className="check-list">
              {operations.slice(0, 5).map((operation) => (
                <li key={operation}>{operation}</li>
              ))}
            </ul>
          </div>

          <div className="panel main-panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Work Queue</p>
                <h2>後台工作隊列</h2>
              </div>
              <ChartNoAxesCombined size={22} />
            </div>
            <div className="queue-grid">
              <div>
                <strong>Tickets</strong>
                <span>{workQueue.tickets[0]?.subject ?? "No open ticket"}</span>
              </div>
              <div>
                <strong>Warehouse Scan</strong>
                <span>{workQueue.scans[0] ? `${workQueue.scans[0].packageId} · ${workQueue.scans[0].step}` : "No scan event"}</span>
              </div>
              <div>
                <strong>Ledger</strong>
                <span>{workQueue.ledger[0] ? `${workQueue.ledger[0].bucket} · ${workQueue.ledger[0].direction}` : "No ledger entry"}</span>
              </div>
              <div>
                <strong>SEO</strong>
                <span>{workQueue.seo[0] ? `${workQueue.seo[0].title} · /${workQueue.seo[0].urlSlug}` : "No SEO entry"}</span>
              </div>
              <div>
                <strong>Shipments</strong>
                <span>
                  {workQueue.shipments[0]
                    ? `${workQueue.shipments[0].id} · ${workQueue.shipments[0].status} · ${workQueue.shipments[0].packageCount}件`
                    : "No shipment"}
                </span>
              </div>
              <div>
                <strong>Tracking</strong>
                <span>
                  {workQueue.trackingEvents[0]
                    ? `${workQueue.trackingEvents[0].shipmentId} · ${workQueue.trackingEvents[0].status}`
                    : "No tracking event"}
                </span>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
