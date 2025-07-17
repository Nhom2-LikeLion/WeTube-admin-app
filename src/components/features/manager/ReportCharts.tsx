import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ReportChartsProps {
  dailyReports: number;
  weeklyReports: number;
  monthlyReports: number;
  processedReports: number;
  unprocessedReports: number;
}

const ReportCharts: React.FC<ReportChartsProps> = ({
  dailyReports,
  weeklyReports,
  monthlyReports,
  processedReports,
  unprocessedReports,
}) => {
  const reportData = {
    labels: ["Ngày", "Tuần", "Tháng"],
    datasets: [
      {
        label: "Số lượng báo cáo",
        data: [dailyReports, weeklyReports, monthlyReports],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const statusData = {
    labels: ["Đã xử lý", "Chưa xử lý"],
    datasets: [
      {
        data: [processedReports, unprocessedReports],
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "rgba(0, 0, 0, 0.1)" },
      },
      x: {
        grid: { display: false },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
        labels: { font: { size: 12 }, color: "#333" },
      },
      title: { display: true, font: { size: 16 }, color: "#333" },
    },
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-1 bg-white rounded-xl shadow p-4">
        <h3 className="text-lg font-semibold mb-2">Tổng số lượng báo cáo</h3>
        <div className="h-64">
          <Bar data={reportData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { ...chartOptions.plugins.title, text: "Báo cáo theo thời gian" } } }} />
        </div>
      </div>
      <div className="flex-1 bg-white rounded-xl shadow p-4">
        <h3 className="text-lg font-semibold mb-2">Trạng thái báo cáo</h3>
        <div className="h-64">
          <Bar data={statusData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { ...chartOptions.plugins.title, text: "Đã xử lý vs Chưa xử lý" } } }} />
        </div>
      </div>
    </div>
  );
};

export default ReportCharts;