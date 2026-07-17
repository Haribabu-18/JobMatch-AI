import {
  ResponsiveContainer,
  LineChart,
  Line,
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

function ExperienceTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-slate-800 text-slate-50 px-3 py-2 rounded-sm text-xs" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
      <p className="text-slate-400 mb-1">{label}</p>
      <p className="text-sky-400">{payload[0].value} jobs</p>
    </div>
  );
}

function ExperienceLineChart({ data }) {
  const chartData = data.map((item) => ({
    experience: item._id,
    jobs: item.count,
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={chartData}>
        <CartesianGrid vertical={false} stroke="#e2e8f0" />

        <XAxis
          dataKey="experience"
          tick={tickStyle}
          axisLine={{ stroke: "#e2e8f0" }}
          tickLine={false}
        />

        <YAxis tick={tickStyle} axisLine={false} tickLine={false} width={36} />

        <Tooltip content={<ExperienceTooltip />} />

        <Line
          type="monotone"
          dataKey="jobs"
          stroke="#0ea5e9"
          strokeWidth={2.5}
          dot={{ r: 4, fill: "#0ea5e9", strokeWidth: 2, stroke: "#ffffff" }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default ExperienceLineChart;