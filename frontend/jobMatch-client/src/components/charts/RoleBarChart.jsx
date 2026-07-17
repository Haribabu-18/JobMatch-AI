import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const tickStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: 11,
  fill: "#94a3b8",
};

function RoleTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-slate-800 text-slate-50 px-3 py-2 rounded-sm text-xs" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
      <p className="text-slate-400 mb-1">{label}</p>
      <p className="text-sky-400">{payload[0].value} jobs</p>
    </div>
  );
}

function RoleBarChart({ data }) {
  const chartData = data.map((item) => ({
    role: item._id,
    jobs: item.count,
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData} barCategoryGap="28%">
        <CartesianGrid vertical={false} stroke="#e2e8f0" />

        <XAxis
          dataKey="role"
          angle={-20}
          textAnchor="end"
          interval={0}
          height={80}
          tick={tickStyle}
          axisLine={{ stroke: "#e2e8f0" }}
          tickLine={false}
        />

        <YAxis tick={tickStyle} axisLine={false} tickLine={false} width={36} />

        <Tooltip cursor={{ fill: "#f1f5f9" }} content={<RoleTooltip />} />

        <Bar dataKey="jobs" fill="#2563eb" radius={[3, 3, 0, 0]} maxBarSize={48} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default RoleBarChart;