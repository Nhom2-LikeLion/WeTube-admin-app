import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartsManagerProps {
  siteVisitsData: { labels: string[]; datasets: { label: string; data: number[]; backgroundColor: string; borderColor: string; borderWidth: number; fill: boolean; tension: number }[] };
  revenueData: { labels: string[]; datasets: { label: string; data: number[]; backgroundColor: string; borderColor: string; borderWidth: number; fill: boolean; tension: number }[] };
}

const ChartsManager: React.FC<ChartsManagerProps> = ({ siteVisitsData, revenueData }) => {
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
        <h3 className="text-lg font-semibold mb-2">Lượt truy cập</h3>
        <div className="h-64">
          <Line data={siteVisitsData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { ...chartOptions.plugins.title, text: "Lượt truy cập hàng tháng" } } }} />
        </div>
      </div>
      <div className="flex-1 bg-white rounded-xl shadow p-4">
        <h3 className="text-lg font-semibold mb-2">Doanh thu</h3>
        <div className="h-64">
          <Line data={revenueData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { ...chartOptions.plugins.title, text: "Doanh thu hàng tháng" } } }} />
        </div>
      </div>
    </div>
  );
};

export default ChartsManager;