
import Sales from "../feature/sections/today-views/Sales";
import VisitorInsights from "../feature/sections/users-insights/UsersInsights";
import TotalRevenue from "../feature/sections/total-revenue/TotalRevenue";
import TopProducts from "../feature/sections/top-channels/TopProducts";
import SalesMapping from "../feature/sections/users-mapping/SalesMapping";
import ProductPerformance from "../feature/sections/channels-performance/ProductPerformance";

const DashboardPage = () => {
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* xs=12            xl=7 */}
      <div className="col-span-12 xl:col-span-7">
        <Sales />
      </div>

      {/* xs=12  md=7      xl=5 */}
      <div className="col-span-12 md:col-span-7 xl:col-span-5">
        <VisitorInsights />
      </div>

      {/* xs=12  md=5      xl=7 */}
      <div className="col-span-12 md:col-span-5 xl:col-span-7">
        <TotalRevenue />
      </div>

      {/* xs=12            xl=5 */}
      <div className="col-span-12 xl:col-span-5">
        <TopProducts />
      </div>

      {/* xs=12  md=6      xl=4 */}
      <div className="col-span-12 md:col-span-6 xl:col-span-4">
        <SalesMapping />
      </div>

      {/* xs=12 */}
      <div className="col-span-12">
        <ProductPerformance />
      </div>
    </div>
  );
};

export default DashboardPage;

