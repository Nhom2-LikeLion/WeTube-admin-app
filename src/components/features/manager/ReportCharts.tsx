import React, { useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ReportCharts = () => {
  const [filter, setFilter] = useState<"month" | "year">("month");
  const [status, setStatus] = useState<"day" | "week">("day");

  const weeklyData = [10, 15, 20, 25];
  const monthlyData = [30, 45, 50, 60, 80, 100, 90, 95, 85, 110, 120, 150];
  const dailyStatus = [2, 5];
  const weeklyProcessed = [5, 7, 6, 8, 9, 4, 5];
  const weeklyUnprocessed = [3, 2, 4, 3, 5, 1, 2];

  const reportData = {
    labels: filter === "month" ? ["W1", "W2", "W3", "W4"] : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{
      label: "Total Reports",
      data: filter === "month" ? weeklyData : monthlyData,
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    }],
  };

  const statusData = {
    labels: status === "day" ? ["Processed", "Unprocessed", "Total"] : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: status === "day" ? [{
      label: "Daily Status",
      data: [dailyStatus[0], dailyStatus[1], dailyStatus[0] + dailyStatus[1]],
      backgroundColor: ["rgba(54, 162, 235, 0.5)", "rgba(255, 99, 132, 0.5)", "rgba(255, 206, 86, 0.5)"],
      borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)", "rgba(255, 206, 86, 1)"],
      borderWidth: 1,
    }] : [{
      label: "Processed",
      data: weeklyProcessed,
      backgroundColor: "rgba(54, 162, 235, 0.5)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
    }, {
      label: "Unprocessed",
      data: weeklyUnprocessed,
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { y: { beginAtZero: true }, x: { grid: { display: false } } },
    plugins: { legend: { position: "top" as const }, title: { display: true, text: "" } },
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-1 bg-white rounded-xl shadow p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Total Reports</h3>
          <select value={filter} onChange={(e) => setFilter(e.target.value as "month" | "year")} className="border p-2 rounded-md">
            <option value="month">Monthly</option>
            <option value="year">Yearly</option>
          </select>
        </div>
        <div className="h-64">
          <Bar data={reportData} options={{ ...options, plugins: { ...options.plugins, title: { ...options.plugins.title, text: filter === "month" ? "Weekly Reports" : "Monthly Reports" } }} } />
        </div>
      </div>
      <div className="flex-1 bg-white rounded-xl shadow p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Processing Status</h3>
          <select value={status} onChange={(e) => setStatus(e.target.value as "day" | "week")} className="border p-2 rounded-md">
            <option value="day">Daily</option>
            <option value="week">Weekly</option>
          </select>
        </div>
        <div className="h-64">
          <Bar data={statusData} options={{ ...options, plugins: { ...options.plugins, title: { ...options.plugins.title, text: status === "day" ? "Daily Processed/Unprocessed" : "Weekly Processing" } }} } />
        </div>
      </div>
    </div>
  );
};

export default ReportCharts;