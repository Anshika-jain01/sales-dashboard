"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
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

const COLORS = ["#2563eb", "#0f766e", "#f59e0b", "#7c3aed", "#dc2626", "#14b8a6"];

export default function DashboardPage() {
  const [chartType, setChartType] = useState("line");
  const [threshold, setThreshold] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  // APPLY FILTER
  const applyFilter = () => {
    if (threshold === "") {
      setFilteredData(data);
      return;
    }

    const result = data.filter(
      (item) => item.sales >= Number(threshold)
    );

    setFilteredData(result);
  };

  // RESET FILTER
  const handleReset = () => {
    setThreshold("");
    setFilteredData(data);
    setChartType("line");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-10">

      {/* HEADER */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
        Sales Dashboard
      </h1>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Total Sales</p>
          <p className="text-2xl font-bold text-blue-700">₹25,000</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Revenue</p>
          <p className="text-2xl font-bold text-teal-700">₹1,20,000</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Growth</p>
          <p className="text-2xl font-bold text-green-700">+12%</p>
        </div>

      </div>

      {/* CONTROLS */}
      <div className="flex flex-col md:flex-row flex-wrap gap-3 mb-8">

        <input
          type="number"
          value={threshold}
          placeholder="Sales Threshold"
          onChange={(e) => setThreshold(e.target.value)}
          className="border border-gray-300 bg-white px-4 py-2 rounded-md shadow-sm"
        />

        <button
          onClick={applyFilter}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-md"
        >
          Apply Filter
        </button>

        <button
          onClick={() => setChartType("line")}
          className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-md"
        >
          Line Chart
        </button>

        <button
          onClick={() => setChartType("bar")}
          className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-md"
        >
          Bar Chart
        </button>

        <button
          onClick={() => setChartType("pie")}
          className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-md"
        >
          Pie Chart
        </button>

        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md"
        >
          Reset
        </button>

      </div>

      {/* CHART */}
      <div className="bg-white p-6 rounded-xl shadow-lg">

        <ResponsiveContainer width="100%" height={350}>

          {chartType === "line" && (
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3}/>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#2563eb"
                strokeWidth={3}
              />
            </LineChart>
          )}

          {chartType === "bar" && (
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3}/>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="sales"
                fill="#0f766e"
                radius={[6,6,0,0]}
              />
            </BarChart>
          )}

          {chartType === "pie" && (
            <PieChart>
              <Tooltip />
              <Pie
                data={filteredData}
                dataKey="sales"
                nameKey="month"
                outerRadius={120}
                label
              >
                {filteredData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                    fillOpacity={0.9}
                  />
                ))}
              </Pie>
            </PieChart>
          )}

        </ResponsiveContainer>

      </div>

    </div>
  );
}