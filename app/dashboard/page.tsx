"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 4000 },
  { month: "May", sales: 6000 },
  { month: "Jun", sales: 7000 },
];

export default function DashboardPage() {
  const [chartType, setChartType] = useState("line");
  const [threshold, setThreshold] = useState(0);

  const filteredData = data.filter((item) => item.sales >= threshold);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6">Sales Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-gray-500">Total Sales</h2>
          <p className="text-2xl font-bold">₹25,000</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-gray-500">Revenue</h2>
          <p className="text-2xl font-bold">₹1,20,000</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-gray-500">Growth</h2>
          <p className="text-2xl font-bold text-green-600">+12%</p>
        </div>
      </div>

      {/* Controls Section */}
      <div className="flex gap-4 mb-6">
        <input
          type="number"
          placeholder="Enter sales threshold"
          className="border p-2 rounded-md"
          onChange={(e) => setThreshold(Number(e.target.value))}
        />

        <button
          onClick={() => setChartType("line")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Line Chart
        </button>

        <button
          onClick={() => setChartType("bar")}
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          Bar Chart
        </button>
      </div>

      {/* Chart Card */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <ResponsiveContainer width="100%" height={400}>
          {chartType === "line" ? (
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#2563eb" />
            </LineChart>
          ) : (
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#16a34a" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}