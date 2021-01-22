import {
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import axios from "axios";
import { useState, useEffect } from "react";
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
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getPrices();
  }, []);

  const normalizeData = (data) => {
    // your code here
    return data.map((d) => {
      const averagePrice = Math.round(
        d.prices.split(",").reduce((sum, num) => sum + parseInt(num), 0) /
          d.price
      );
      return { name: d.city, averagePrice };
    });
  };

  const getPrices = async () => {
    try {
      let res = await axios.get("/api/properties/city_cost");
      console.log(res);
      const normalizedData = normalizeData(res.data);
      setChartData(normalizedData);
      setLoading(false);
    } catch (err) {
      alert("err occured");
      setLoading(false);
    }
  };
  if (loading) return <p>loading</p>;

  return (
    <div>
      <h1>Cost by City</h1>
      <BarChart width={730} height={250} data={chartData}>
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
