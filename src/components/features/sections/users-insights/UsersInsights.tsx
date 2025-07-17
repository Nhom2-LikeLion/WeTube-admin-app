// components/sections/dashboard/visitor-insights/VisitorInsights.tsx
import type EChartsReactCore from "echarts-for-react/lib/core";
import { useEffect, useRef, useState } from "react";
import { transformUserData } from "../../../../data/visitor-insights-data";
import { useGetAllUsersQuery } from "../../../../services/api/userApi";
import LegendToggleButton from "../../../common/LegendToggleButton";
import UserInsightsChart from "./UsersInsightsChart";

const UserInsights = () => {
  const chartRef = useRef<EChartsReactCore | null>(null);
  const TIME_RANGES = ["day", "month", "year"] as const;

  const [legend, setLegend] = useState({
    "normal users": false,
    "pro users": false,
  });

  const [timeRange, setTimeRange] =
    useState<(typeof TIME_RANGES)[number]>("month");

  const handleLegendToggle = (name: keyof typeof legend) => {
    setLegend((prev) => ({ ...prev, [name]: !prev[name] }));

    if (chartRef.current) {
      const instance = chartRef.current.getEchartsInstance();
      instance.dispatchAction({ type: "legendToggleSelect", name });
    }
  };

   const { data: users = [], isLoading, error } = useGetAllUsersQuery();
  useEffect(() => {
    console.log("Fetched users:", users);
  }, [users]);

  // Optional: log error/loading nếu cần
  useEffect(() => {
    if (isLoading) console.log("Loading user data...");
    if (error) console.error("Failed to fetch users:", error);
  }, [isLoading, error]);
  const transformedData = transformUserData(users, timeRange);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-2xl font-semibold text-primary-700">Users</h4>

        <div className="inline-flex gap-1">
          {TIME_RANGES.map((range) => {
            const active = timeRange === range;
            return (
              <button
                key={range}
                type="button"
                onClick={() => setTimeRange(range)}
                className={[
                  "px-2.5 py-1 text-xs font-medium rounded-md transition-colors",
                  active
                    ? "bg-primary-600 text-white"
                    : "border border-primary-600 text-primary-600 hover:bg-primary-50",
                ].join(" ")}
              >
                {range === "day" ? "D" : range === "month" ? "M" : "Y"}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chart */}
      <UserInsightsChart
        chartRef={chartRef}
        data={{
          "normal users": transformedData["normal users"],
          "pro users": transformedData["pro users"],
        }}
        // categories={transformedData.categories} // cần thêm prop này
        timeRange={timeRange}
        style={{ height: 176 }}
      />

      {/* <UserInsightsChart
        chartRef={chartRef}
        data={userInsightsData}
        timeRange={timeRange}
        style={{ height: 176 }}
      /> */}

      {/* Legend */}
      <div
        className="
          mt-4
          flex flex-col sm:flex-row
          justify-center items-start
          gap-y-2
          sm:px-2 lg:px-0
          sm:gap-x-2 md:gap-x-1 lg:gap-x-2 xl:gap-x-1
        "
      >
        <LegendToggleButton
          name="normal users"
          icon="ic:round-square"
          colorClass="text-purple-700"
          legend={legend}
          onToggle={handleLegendToggle}
        />
        <LegendToggleButton
          name="pro users"
          icon="ic:round-square"
          colorClass="text-red-700"
          legend={legend}
          onToggle={handleLegendToggle}
        />
      </div>
    </div>
  );
};

export default UserInsights;
