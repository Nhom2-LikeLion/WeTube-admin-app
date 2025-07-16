import { type MutableRefObject, useMemo } from 'react';
import * as echarts from 'echarts/core';
import {
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import type EChartsReactCore from 'echarts-for-react/lib/core';
import ReactEchart from '../../../base/ReactEhart';
import colors from 'tailwindcss/colors';

echarts.use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
]);

/* -------------------------------------------------- */
/*  Cấu hình “theme” thủ công (tự chỉnh nếu muốn)     */
/* -------------------------------------------------- */
const COLOR_SECONDARY_DARKER = colors.purple[700];   // secondary.darker
const COLOR_ERROR_DARKER     = colors.red[700];      // error.darker
const COLOR_SUCCESS_DARKER   = colors.emerald[700];  // success.darker

const TEXT_GRAY_200  = colors.slate[300];   // #cbd5e1 ≈ grey[200]
const TEXT_GRAY_A200 = colors.slate[400];   // #94a3b8 ≈ grey.A200
const LINE_GRAY_A400 = colors.slate[300];   // #cbd5e1 ≈ grey.A400

const FONT_FAMILY = "'Inter', 'Helvetica', 'Arial', sans-serif";
const FONT_SIZE   = 12;   // ~ theme.typography.fontSize / 1.4
const CAPTION_FONT_SIZE = 11;
/* -------------------------------------------------- */

interface UserInsightsChartProps {
  chartRef: MutableRefObject<EChartsReactCore | null>;
  data: {
    'normal users': number[];
    'pro users': number[];
  };
  timeRange: 'day' | 'weeks' | 'month' | 'year';
  style?: {
    height: number;
    width?: number;
  };
}

const UserInsightsChart = ({
  chartRef,
  data,
  timeRange,
  style,
}: UserInsightsChartProps) => {
  /* ---------------- CẮT DATA THEO RANGE ---------------- */
  const filteredData = useMemo(() => {
    switch (timeRange) {
      case "day":
        return {
          categories: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
          series: {
            "normal users": data["normal users"].slice(0, 30),
            "pro users": data["pro users"].slice(0, 30),
          },
        };
      case "weeks":
        return {
          categories: Array.from({ length: 12 }, (_, i) => `Week ${i + 1}`),
          series: {
            "normal users": data["normal users"].slice(0, 12),
            "pro users": data["pro users"].slice(0, 12),
          },
        };
      case "year":
        return {
          categories: Array.from({ length: 5 }, (_, i) => `Year ${2020 + i}`),
          series: {
            "normal users": data["normal users"].slice(0, 5),
            "pro users": data["pro users"].slice(0, 5),
          },
        };
      default: // month
        return {
          categories: [
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
          ],
          series: data,
        };
    }
  }, [data, timeRange]);

  /* ------------------ OPTION ECHARTS ------------------- */
  const option = useMemo(
    () => ({
      color: [COLOR_SECONDARY_DARKER, COLOR_ERROR_DARKER, COLOR_SUCCESS_DARKER],

      tooltip: { trigger: "axis", confine: true },
      legend: { show: false },

      xAxis: {
        type: "category",
        data: filteredData.categories,
        axisTick: { show: false },
        axisLabel: {
          fontFamily: FONT_FAMILY,
          fontSize: FONT_SIZE,
          color: TEXT_GRAY_200,
        },
        axisLine: { show: false },
      },

      yAxis: {
        type: "value",
        axisLabel: {
          fontSize: CAPTION_FONT_SIZE,
          color: TEXT_GRAY_A200,
        },
        splitLine: { lineStyle: { color: LINE_GRAY_A400 } },
      },

      grid: { top: 8, left: 0, right: 0, bottom: 0, containLabel: true },

      series: [
        {
          name: "Normal Users",
          type: "line",
          data: filteredData.series["normal users"],
          smooth: true,
          symbol: "circle",
          showSymbol: false,
          symbolSize: 14,
          lineStyle: { width: 4 },
        },
        {
          name: "Pro Users",
          type: "line",
          data: filteredData.series["pro users"],
          smooth: true,
          symbol: "circle",
          showSymbol: false,
          symbolSize: 14,
          lineStyle: { width: 4 },
        },
      ],
    }),
    [filteredData]
  );

  /* ------------- JSX ------------- */
  return (
    <ReactEchart
      echarts={echarts}
      option={option}
      ref={chartRef}
      style={style} /* ví dụ { height: 176 } */
    />
  );
};

export default UserInsightsChart;