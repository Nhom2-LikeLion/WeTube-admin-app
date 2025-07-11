import React from "react";
import Sidebar from "./components/Sidebar";
import TopNav from "./components/TopNav";
import AnalyticsChart from './components/AnalyticsChart';
import DashboardStats from "./components/DashboardStats";
import RecentVideos from "./components/RecentVideos";

function App() {
  return (
    <div className="flex h-screen bg-gray-50 border">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 border">
        <TopNav/>
        <main className="flex-1 overflow-y-auto p-6 border">
          <div className="max-w-7xl mx-auto border">
            <DashboardStats/>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 border">
              <div className="lg:col-span-2 border">
                <AnalyticsChart/>
              </div>
              <div>
                <RecentVideos/>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
