import { PieChart, Pie, Tooltip } from "recharts";

export default function CourseChart({ students }) {
  const grouped = students.reduce((acc, s) => {
    acc[s.course] = (acc[s.course] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(grouped).map((c) => ({
    name: c,
    value: grouped[c],
  }));

  return (
    <PieChart width={250} height={250}>
      <Pie data={data} dataKey="value" nameKey="name" />
      <Tooltip />
    </PieChart>
  );
}
