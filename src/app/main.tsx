import React from "react";
import { createRoot } from "react-dom/client";
import {
  Bell,
  Boxes,
  ChartNoAxesCombined,
  CircleDollarSign,
  Gavel,
  Globe2,
  Home,
  PackageCheck,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Truck,
  Users
} from "lucide-react";
import "./styles.css";

type Metric = {
  label: string;
  value: string;
  tone: "blue" | "green" | "amber" | "red";
};

const metrics: Metric[] = [
  { label: "待報價", value: "18", tone: "amber" },
  { label: "代拍中", value: "7", tone: "blue" },
  { label: "入庫包裹", value: "42", tone: "green" },
  { label: "退款審核", value: "3", tone: "red" }
];

const memberTasks = [
  { icon: ShoppingCart, title: "代購購物車", text: "跨平台商品合併提交，保留備註與日本本地運費後補。" },
  { icon: Gavel, title: "Yahoo 代拍", text: "會員設定最高出價，客服按授權範圍人工執行。" },
  { icon: Boxes, title: "集運合箱", text: "船橋倉最終出發，免運合箱，紙箱費另計。" },
  { icon: PackageCheck, title: "一件直發", text: "單件貨提醒轉入出庫打包區，減少上架等待。" }
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
  "增值服務",
  "優惠券",
  "翻譯管理",
  "操作日誌"
];

function App() {
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
          <a href="#procurement"><ShoppingCart size={18} /> 代購</a>
          <a href="#auction"><Gavel size={18} /> 代拍</a>
          <a href="#warehouse"><Boxes size={18} /> 倉儲</a>
          <a href="#finance"><CircleDollarSign size={18} /> 財務</a>
          <a href="#admin"><Settings size={18} /> 後台</a>
        </nav>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">繁體中文優先 · 港幣結算 · 不面向中國大陸用戶</p>
            <h1>會員 H5 與營運後台一體化工作台</h1>
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
                <h2>會員核心流程</h2>
              </div>
              <Globe2 size={22} />
            </div>
            <div className="task-grid">
              {memberTasks.map((task) => (
                <article className="task" key={task.title}>
                  <task.icon size={21} />
                  <h3>{task.title}</h3>
                  <p>{task.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Finance</p>
                <h2>支付與餘額</h2>
              </div>
              <CircleDollarSign size={22} />
            </div>
            <ul className="check-list">
              <li>前期銀行轉帳，人工審核入帳</li>
              <li>港幣充值，按人工匯率折算日元成本</li>
              <li>授權範圍內自動扣款，超額觸發確認</li>
              <li>佣金按營收百分比回充至餘額</li>
            </ul>
          </div>

          <div className="panel">
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
                <p className="eyebrow">Growth</p>
                <h2>會員推薦與積分</h2>
              </div>
              <Users size={22} />
            </div>
            <p className="body-text">
              支援五級會員、推薦佣金、代購商品積分與物流費用積分。積分兌換以公司提供商品為主，規則保留後台配置。
            </p>
          </div>

          <div className="panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Data</p>
                <h2>統計與審計</h2>
              </div>
              <ChartNoAxesCombined size={22} />
            </div>
            <p className="body-text">
              後台操作全量記錄審計日誌，報表先提供 CSV/Excel 匯出接口，後續按財務、倉庫、客服維度擴展。
            </p>
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
