"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const description = "An interactive area chart";

const chartData = [
  { date: "2024-04-01", normal: 222, pro: 150 },
  { date: "2024-04-02", normal: 97, pro: 180 },
  { date: "2024-04-03", normal: 167, pro: 120 },
  { date: "2024-04-04", normal: 242, pro: 260 },
  { date: "2024-04-05", normal: 373, pro: 290 },
  { date: "2024-04-06", normal: 301, pro: 340 },
  { date: "2024-04-07", normal: 245, pro: 180 },
  { date: "2024-04-08", normal: 409, pro: 320 },
  { date: "2024-04-09", normal: 59, pro: 110 },
  { date: "2024-04-10", normal: 261, pro: 190 },
  { date: "2024-04-11", normal: 327, pro: 350 },
  { date: "2024-04-12", normal: 292, pro: 210 },
  { date: "2024-04-13", normal: 342, pro: 380 },
  { date: "2024-04-14", normal: 137, pro: 220 },
  { date: "2024-04-15", normal: 120, pro: 170 },
  { date: "2024-04-16", normal: 138, pro: 190 },
  { date: "2024-04-17", normal: 446, pro: 360 },
  { date: "2024-04-18", normal: 364, pro: 410 },
  { date: "2024-04-19", normal: 243, pro: 180 },
  { date: "2024-04-20", normal: 89, pro: 150 },
  { date: "2024-04-21", normal: 137, pro: 200 },
  { date: "2024-04-22", normal: 224, pro: 170 },
  { date: "2024-04-23", normal: 138, pro: 230 },
  { date: "2024-04-24", normal: 387, pro: 290 },
  { date: "2024-04-25", normal: 215, pro: 250 },
  { date: "2024-04-26", normal: 75, pro: 130 },
  { date: "2024-04-27", normal: 383, pro: 420 },
  { date: "2024-04-28", normal: 122, pro: 180 },
  { date: "2024-04-29", normal: 315, pro: 240 },
  { date: "2024-04-30", normal: 454, pro: 380 },
  { date: "2024-05-01", normal: 165, pro: 220 },
  { date: "2024-05-02", normal: 293, pro: 310 },
  { date: "2024-05-03", normal: 247, pro: 190 },
  { date: "2024-05-04", normal: 385, pro: 420 },
  { date: "2024-05-05", normal: 481, pro: 390 },
  { date: "2024-05-06", normal: 498, pro: 520 },
  { date: "2024-05-07", normal: 388, pro: 300 },
  { date: "2024-05-08", normal: 149, pro: 210 },
  { date: "2024-05-09", normal: 227, pro: 180 },
  { date: "2024-05-10", normal: 293, pro: 330 },
  { date: "2024-05-11", normal: 335, pro: 270 },
  { date: "2024-05-12", normal: 197, pro: 240 },
  { date: "2024-05-13", normal: 197, pro: 160 },
  { date: "2024-05-14", normal: 448, pro: 490 },
  { date: "2024-05-15", normal: 473, pro: 380 },
  { date: "2024-05-16", normal: 338, pro: 400 },
  { date: "2024-05-17", normal: 499, pro: 420 },
  { date: "2024-05-18", normal: 315, pro: 350 },
  { date: "2024-05-19", normal: 235, pro: 180 },
  { date: "2024-05-20", normal: 177, pro: 230 },
  { date: "2024-05-21", normal: 82, pro: 140 },
  { date: "2024-05-22", normal: 81, pro: 120 },
  { date: "2024-05-23", normal: 252, pro: 290 },
  { date: "2024-05-24", normal: 294, pro: 220 },
  { date: "2024-05-25", normal: 201, pro: 250 },
  { date: "2024-05-26", normal: 213, pro: 170 },
  { date: "2024-05-27", normal: 420, pro: 460 },
  { date: "2024-05-28", normal: 233, pro: 190 },
  { date: "2024-05-29", normal: 78, pro: 130 },
  { date: "2024-05-30", normal: 340, pro: 280 },
  { date: "2024-05-31", normal: 178, pro: 230 },
  { date: "2024-06-01", normal: 178, pro: 200 },
  { date: "2024-06-02", normal: 470, pro: 410 },
  { date: "2024-06-03", normal: 103, pro: 160 },
  { date: "2024-06-04", normal: 439, pro: 380 },
  { date: "2024-06-05", normal: 88, pro: 140 },
  { date: "2024-06-06", normal: 294, pro: 250 },
  { date: "2024-06-07", normal: 323, pro: 370 },
  { date: "2024-06-08", normal: 385, pro: 320 },
  { date: "2024-06-09", normal: 438, pro: 480 },
  { date: "2024-06-10", normal: 155, pro: 200 },
  { date: "2024-06-11", normal: 92, pro: 150 },
  { date: "2024-06-12", normal: 492, pro: 420 },
  { date: "2024-06-13", normal: 81, pro: 130 },
  { date: "2024-06-14", normal: 426, pro: 380 },
  { date: "2024-06-15", normal: 307, pro: 350 },
  { date: "2024-06-16", normal: 371, pro: 310 },
  { date: "2024-06-17", normal: 475, pro: 520 },
  { date: "2024-06-18", normal: 107, pro: 170 },
  { date: "2024-06-19", normal: 341, pro: 290 },
  { date: "2024-06-20", normal: 408, pro: 450 },
  { date: "2024-06-21", normal: 169, pro: 210 },
  { date: "2024-06-22", normal: 317, pro: 270 },
  { date: "2024-06-23", normal: 480, pro: 530 },
  { date: "2024-06-24", normal: 132, pro: 180 },
  { date: "2024-06-25", normal: 141, pro: 190 },
  { date: "2024-06-26", normal: 434, pro: 380 },
  { date: "2024-06-27", normal: 448, pro: 490 },
  { date: "2024-06-28", normal: 149, pro: 200 },
  { date: "2024-06-29", normal: 103, pro: 160 },
  { date: "2024-06-30", normal: 446, pro: 400 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  normal: {
    label: "Normal Users",
    color: "var(--chart-1)",
  },
  pro: {
    label: "Pro Users",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export default function UsersInsightsChart() {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  const maxValue = Math.max(
    ...filteredData.flatMap((item) => [item.normal, item.pro])
  );

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Users</CardTitle>
        </div>
        <Select
          value={timeRange}
          onValueChange={setTimeRange}
        >
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem
              value="90d"
              className="rounded-lg"
            >
              Last 3 months
            </SelectItem>
            <SelectItem
              value="30d"
              className="rounded-lg"
            >
              Last 30 days
            </SelectItem>
            <SelectItem
              value="7d"
              className="rounded-lg"
            >
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient
                id="fillNormal"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--color-normal)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-normal)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient
                id="fillPro"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--color-pro)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-pro)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",

                  day: "numeric",
                });
              }}
            />

            <YAxis
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              domain={[0, maxValue]}
              tickFormatter={(value) => `${value}`}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value: number) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="pro"
              type="natural"
              fill="url(#fillPro)"
              stroke="var(--color-pro)"
              stackId="a"
            />
            <Area
              dataKey="normal"
              type="natural"
              fill="url(#fillNormal)"
              stroke="var(--color-normal)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
