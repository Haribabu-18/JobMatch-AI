import React, { useEffect, useState } from "react";
import RoleBarChart from "../components/charts/RoleBarChart";
import ExperienceLineChart from "../components/charts/ExperienceLineChart";

const FONT_IMPORT_ID = "dashboard-font-import";

function useDashboardFonts() {
  useEffect(() => {
    if (document.getElementById(FONT_IMPORT_ID)) return;
    const link = document.createElement("link");
    link.id = FONT_IMPORT_ID;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);
}

function StatCard({ eyebrow, value, accent = "ink" }) {
  const accentMap = {
    ink: "text-slate-800",
    gold: "text-blue-600",
    teal: "text-sky-600",
    coral: "text-blue-800",
  };

  return (
    <div className="relative bg-white border border-slate-200 rounded-sm px-6 py-5 overflow-hidden">
      {/* corner fold */}
      <div className="absolute top-0 right-0 w-4 h-4 bg-slate-100" style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }} />
      <p
        className="text-[11px] tracking-[0.14em] text-slate-400 mb-3"
        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
      >
        {eyebrow}
      </p>
      <p
        className={`text-4xl leading-none ${accentMap[accent]}`}
        style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
      >
        {value}
      </p>
    </div>
  );
}

function ChartCard({ index, title, subtitle, children }) {
  return (
    <div className="bg-white border border-slate-200 rounded-sm p-6 md:p-8">
      <div className="flex items-baseline justify-between border-b border-slate-200 pb-4 mb-6">
        <div>
          <p
            className="text-[11px] tracking-[0.14em] text-slate-400 mb-1"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            {index}
          </p>
          <h2
            className="text-2xl text-slate-800"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
          >
            {title}
          </h2>
        </div>
        <p className="text-sm text-slate-400 hidden sm:block" style={{ fontFamily: "'Inter', sans-serif" }}>
          {subtitle}
        </p>
      </div>
      {children}
    </div>
  );
}

function Masthead({ stats }) {
  const now = new Date();
  const timestamp = now.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "short",
  });

  return (
    <div className="bg-slate-800 text-slate-50">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-400" />
            </span>
            <h1
              className="text-2xl md:text-3xl"
              style={{ fontFamily: "'Fraunces', serif", fontWeight: 700 }}
            >
              Job Market Wire
            </h1>
          </div>
          <p
            className="text-xs text-slate-400 tracking-wide"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            LIVE · {timestamp}
          </p>
        </div>

        {/* ticker row */}
        <div
          className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-300 border-t border-white/10 pt-4"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          <span>
            TOTAL <span className="text-slate-50">{stats.totalJobs}</span>
          </span>
          <span className="text-white/20">/</span>
          <span>
            TODAY <span className="text-sky-400">+{stats.postedToday}</span>
          </span>
          <span className="text-white/20">/</span>
          <span>
            ROLES <span className="text-slate-50">{stats.byRole.length}</span>
          </span>
          <span className="text-white/20">/</span>
          <span>
            EXP. BANDS <span className="text-slate-50">{stats.byExperience.length}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const [stats, setStats] = useState(null);
  useDashboardFonts();

  useEffect(() => {
    fetch("http://localhost:4000/api/dashboard")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err));
  }, []);

  if (!stats) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50 text-slate-800">
        <p
          className="text-sm tracking-[0.14em] text-slate-400"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          LOADING DASHBOARD…
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <Masthead stats={stats} />

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
          <StatCard eyebrow="TOTAL JOBS" value={stats.totalJobs} accent="ink" />
          <StatCard eyebrow="POSTED TODAY" value={`+${stats.postedToday}`} accent="coral" />
          <StatCard eyebrow="TOP ROLES" value={stats.byRole.length} accent="gold" />
          <StatCard eyebrow="EXPERIENCE GROUPS" value={stats.byExperience.length} accent="teal" />
        </div>

        {/* Charts */}
        <div className="space-y-6">
          <ChartCard index="01 · DEMAND" title="Jobs by role" subtitle="Open postings per role, ranked">
            <RoleBarChart data={stats.byRole} />
          </ChartCard>

          <ChartCard index="02 · SENIORITY" title="Jobs by experience" subtitle="Postings across experience bands">
            <ExperienceLineChart data={stats.byExperience} />
          </ChartCard>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;