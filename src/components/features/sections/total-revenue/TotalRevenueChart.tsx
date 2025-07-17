import * as echarts from "echarts/core";
import {
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from "echarts/components";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { useMemo } from "react";
import ReactEchart from "../../../../components/base/ReactEhart";
import colors from "tailwindcss/colors"; // bảng màu mặc định

echarts.use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer,
]);

/* ---------------------------------- */
/* 1. Hook kiểm tra breakpoint sm     */
/* ---------------------------------- */
import { useEffect, useState } from "react";
const useIsSmUp = () => {
  const [isSm, setIsSm] = useState(() => window.innerWidth >= 640);
  useEffect(() => {
    const handler = () => setIsSm(window.innerWidth >= 640);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isSm;
};
/* ---------------------------------- */

interface TotalRevenueChartProps {
  data: {
    'WeTube Ads': number[];
    'WeTube Pro': number[];
    Memberships: number[];
  };
  timeRange: 'day' | 'month' | 'year';
  style?: {
    height?: number;
    width?: number;
  };
}

const FONT_FAMILY = "'Inter', 'Helvetica', 'Arial', sans-serif";
const FONT_SIZE = 12; // giống theme.typography.fontSize - 2
const TEXT_GRAY = colors.slate[400]; // #94a3b8
const GRID_GRAY = colors.slate[300]; // #cbd5e1

const TotalRevenueChart = ({
  data,
  timeRange,
  style,
}: TotalRevenueChartProps) => {
  const isSm = useIsSmUp();

  /* cắt bớt data theo timeRange ----------------------------- */
  const filteredData = useMemo(() => {
    if (timeRange === "day")
      return {
        "WeTube Ads": data["WeTube Ads"].slice(0, 7),
        "WeTube Pro": data["WeTube Pro"].slice(0, 7),
        Memberships: data["Memberships"].slice(0, 7),
      };
    if (timeRange === "month")
      return {
        "WeTube Ads": data["WeTube Ads"].slice(0, 12),
        "WeTube Pro": data["WeTube Pro"].slice(0, 12),
        Memberships: data["Memberships"].slice(0, 12),
      };
    return data;
  }, [data, timeRange]);

  /* label trục X ------------------------------------------- */
  const xAxisData = useMemo(() => {
    if (timeRange === "day")
      return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    if (timeRange === "month")
      return [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
    return ["2021", "2022", "2023", "2024"];
  }, [timeRange]);

  /* option ECharts ----------------------------------------- */
  const option = useMemo(
    () => ({
      color: [colors.sky[500], colors.emerald[500], colors.orange[500]],

      tooltip: { confine: true },

      legend: {
        data: ["WeTube Ads", "WeTube Pro", "Memberships"],
        left: "center",
        bottom: 0,
        icon: "circle",
        textStyle: { fontFamily: FONT_FAMILY },
        itemGap: isSm ? 20 : 10,
        itemHeight: 11,
      },

      xAxis: {
        data: xAxisData,
        axisTick: { show: false },
        axisLine: { show: false },
        axisLabel: {
          fontSize: FONT_SIZE,
          color: TEXT_GRAY,
          margin: 18,
        },
      },

      yAxis: {
        type: "value",
        axisLabel: {
          fontSize: FONT_SIZE,
          color: TEXT_GRAY,
          formatter: "{value}k",
          margin: 18,
        },
        splitLine: { lineStyle: { color: GRID_GRAY } },
      },

      grid: {
        top: "4%",
        left: 0,
        right: 6,
        bottom: 45,
        containLabel: true,
      },

      series: [
        {
          name: "WeTube Ads",
          type: "bar",
          data: filteredData["WeTube Ads"],
          itemStyle: { borderRadius: 2 },
          barCategoryGap: "65%",
        },
        {
          name: "WeTube Pro",
          type: "bar",
          data: filteredData["WeTube Pro"],
          itemStyle: { borderRadius: 2 },
          barCategoryGap: "65%",
        },
        {
          name: "Memberships",
          type: "bar",
          data: filteredData["Memberships"],
          itemStyle: { borderRadius: 2 },
          barCategoryGap: "65%",
        },
      ],
    }),
    [filteredData, isSm, xAxisData]
  );

  return <ReactEchart echarts={echarts} option={option} style={style} />;
};

export default TotalRevenueChart;
