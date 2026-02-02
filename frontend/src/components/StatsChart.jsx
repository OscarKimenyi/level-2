import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export default function StatsChart({ students }) {
  const data = [{ name: "Students", total: students.length }];

  return (
    <BarChart width={300} height={200} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="total" fill="#0d6efd" />
    </BarChart>
  );
}
