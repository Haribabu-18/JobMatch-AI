import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function RoleBarChart({ data }) {
  const chartData = data.map((item) => ({
    role: item._id,
    jobs: item.count,
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          dataKey="role"
          angle={-20}
          textAnchor="end"
          interval={0}
          height={80}
        />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="jobs"
          fill="#2563eb"
          radius={[5, 5, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default RoleBarChart;