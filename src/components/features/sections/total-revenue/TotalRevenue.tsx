import { useState } from 'react';
import TotalRevenueChart from './TotalRevenueChart';
import { generateRevenueData } from '../../../../data/generateRevenueData';

/* các giá trị cố định của time-range  */
const TIME_RANGES = ['day', 'month', 'year'] as const;

const TotalRevenue = () => {
  const [timeRange, setTimeRange] =
    useState<(typeof TIME_RANGES)[number]>('month');

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-2xl font-semibold">Total Revenue</h4>

        <div className="flex gap-2">
          {TIME_RANGES.map((range) => {
            const active = timeRange === range;

            return (
              <button
                key={range}
                type="button"
                onClick={() => setTimeRange(range)}
                className={[
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                  active
                    ? "bg-primary-600 text-white"
                    : "border border-primary-600 text-primary-600 hover:bg-primary-50",
                ].join(" ")}
              >
                {range.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-[247px]">
        <TotalRevenueChart
          data={generateRevenueData[timeRange]}
          timeRange={timeRange}
          style={{ height: 247, width: "100%" as unknown as number }}
        />
      </div>
    </div>
  );
};

export default TotalRevenue;