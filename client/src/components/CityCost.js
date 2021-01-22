import {
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const data = [
  {
    name: "SLC",
    averagePrice: 42000,
  },

  {
    name: "Draper",
    averagePrice: 42000,
  },
  {
    name: "Provo",
    averagePrice: 14000,
  },
];
export default () => {
  return (
    <div>
      <h1>form</h1>
      <BarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="averagePrice" fill="#8884d8" />
      </BarChart>
    </div>
  );
};
