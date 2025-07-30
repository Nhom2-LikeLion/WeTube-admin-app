import ProductPerformance from "../features/sections/channels-performance/ProductPerformance";
import Sales from "../features/sections/today-views/Sales";
import TopProducts from "../features/sections/top-channels/TopProducts";
import TotalRevenueChart from "../features/sections/total-revenue/TotalRevenueChart";
import UsersInsightsChart from "../features/sections/users-insights/UsersInsightsChart";
import SalesMapping from "../features/sections/users-mapping/SalesMapping";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* xs=12            xl=7 */}
      <div className="col-span-12 xl:col-span-7 ">
        <Sales />
      </div>

      {/* xs=12  md=7      xl=5 */}
      <div className="col-span-12 md:col-span-7 xl:col-span-5">
        <UsersInsightsChart />
      </div>

      {/* xs=12  md=5      xl=7 */}
      <div className="col-span-12 md:col-span-5 xl:col-span-7">
        <TopProducts />
      </div>

      {/* xs=12            xl=5 */}
      <div className="col-span-12 xl:col-span-5">
        <TotalRevenueChart />
      </div>

      {/* xs=12  md=6      xl=4 */}
      <div className="col-span-12 ">
        <SalesMapping />
      </div>

      {/* xs=12 */}
      <div className="col-span-12">
        <ProductPerformance />
      </div>
    </div>
  );
};

export default Dashboard;
