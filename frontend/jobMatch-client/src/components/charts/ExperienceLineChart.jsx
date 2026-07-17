import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function ExperienceLineChart({ data }) {

  const chartData = data.map((item) => ({
    experience: item._id,
    jobs: item.count,
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={chartData}>

        <CartesianGrid strokeDasharray="3 3"/>

        <XAxis dataKey="experience"/>

        <YAxis/>

        <Tooltip/>

        <Line
          type="monotone"
          dataKey="jobs"
          stroke="#0ea5e9"
          strokeWidth={3}
        />

      </LineChart>
    </ResponsiveContainer>
  );
}

export default ExperienceLineChart;