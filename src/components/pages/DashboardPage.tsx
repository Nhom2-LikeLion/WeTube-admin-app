import VideosPerformance from "../features/sections/videos-performance/VideosPerformance";
import Summary from "../features/sections/today-views/summary";
import TopChannels from "../features/sections/top-channels/TopChannels";
import TotalRevenueChart from "../features/sections/total-revenue/TotalRevenueChart";
import UsersInsightsChart from "../features/sections/users-insights/UsersInsightsChart";
import SalesMapping from "../features/sections/users-mapping/SalesMapping";
import { useEffect, useState } from "react";
import Loading from "../common/Loading";
import LayoutAnimation from "../common/DarkLightMode";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); 
    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div className="grid grid-cols-10 gap-6 w-full">
      <div className="col-span-full rounded-xl shadow">
        <Summary />
        <LayoutAnimation />
      </div>

      <div className="col-span-6 rounded-xl shadow">
        <UsersInsightsChart />
      </div>

      <div className="col-span-4 rounded-xl shadow">
        <TopChannels />
      </div>

      <div className="col-span-full rounded-xl shadow">
        <TotalRevenueChart />
      </div>

      <div className="col-span-full rounded-xl shadow">
        <SalesMapping />
      </div>

      <div className="col-span-full rounded-xl shadow">
        <VideosPerformance />
      </div>
    </div>
  );
};

export default Dashboard;
