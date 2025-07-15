import React from 'react'
import DashboardStats from '../features/dashboard/DashboardStats';
import AnalyticsChart from '../features/dashboard/AnalyticsChart';
import RecentVideos from '../features/dashboard/RecentVideos';

const DashboardPage = () => {
  return (
        <div>
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto ">
              <DashboardStats />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
                <div className="lg:col-span-2 ">
                  <AnalyticsChart />
                </div>
                <div>
                  <RecentVideos />
                </div>
              </div>
            </div>
          </main>
        </div>
  );
}

export default DashboardPage