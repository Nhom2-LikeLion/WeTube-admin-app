"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
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

const chartData = [
  { date: "2024-04-01", ads: 461, pro: 128, mem: 137 },
  { date: "2024-04-02", ads: 314, pro: 415, mem: 215 },
  { date: "2024-04-03", ads: 189, pro: 104, mem: 224 },
  { date: "2024-04-04", ads: 276, pro: 172, mem: 200 },
  { date: "2024-04-05", ads: 150, pro: 289, mem: 269 },
  { date: "2024-04-06", ads: 285, pro: 273, mem: 209 },
  { date: "2024-04-07", ads: 456, pro: 105, mem: 298 },
  { date: "2024-04-08", ads: 108, pro: 382, mem: 125 },
  { date: "2024-04-09", ads: 349, pro: 380, mem: 220 },
  { date: "2024-04-10", ads: 365, pro: 396, mem: 174 },
  { date: "2024-04-11", ads: 210, pro: 233, mem: 231 },
  { date: "2024-04-12", ads: 395, pro: 476, mem: 97 },
  { date: "2024-04-13", ads: 190, pro: 287, mem: 264 },
  { date: "2024-04-14", ads: 331, pro: 235, mem: 162 },
  { date: "2024-04-15", ads: 136, pro: 440, mem: 290 },
  { date: "2024-04-16", ads: 499, pro: 443, mem: 153 },
  { date: "2024-04-17", ads: 305, pro: 388, mem: 206 },
  { date: "2024-04-18", ads: 344, pro: 109, mem: 59 },
  { date: "2024-04-19", ads: 346, pro: 363, mem: 241 },
  { date: "2024-04-20", ads: 403, pro: 395, mem: 111 },
  { date: "2024-04-21", ads: 319, pro: 394, mem: 86 },
  { date: "2024-04-22", ads: 324, pro: 417, mem: 239 },
  { date: "2024-04-23", ads: 246, pro: 367, mem: 66 },
  { date: "2024-04-24", ads: 399, pro: 180, mem: 138 },
  { date: "2024-04-25", ads: 238, pro: 455, mem: 250 },
  { date: "2024-04-26", ads: 389, pro: 111, mem: 242 },
  { date: "2024-04-27", ads: 482, pro: 462, mem: 267 },
  { date: "2024-04-28", ads: 412, pro: 185, mem: 192 },
  { date: "2024-04-29", ads: 195, pro: 352, mem: 167 },
  { date: "2024-04-30", ads: 451, pro: 306, mem: 132 },
  { date: "2024-05-01", ads: 271, pro: 285, mem: 288 },
  { date: "2024-05-02", ads: 466, pro: 224, mem: 167 },
  { date: "2024-05-03", ads: 394, pro: 456, mem: 73 },
  { date: "2024-05-04", ads: 369, pro: 409, mem: 135 },
  { date: "2024-05-05", ads: 493, pro: 422, mem: 93 },
  { date: "2024-05-06", ads: 488, pro: 430, mem: 138 },
  { date: "2024-05-07", ads: 175, pro: 360, mem: 270 },
  { date: "2024-05-08", ads: 191, pro: 226, mem: 229 },
  { date: "2024-05-09", ads: 368, pro: 373, mem: 284 },
  { date: "2024-05-10", ads: 216, pro: 436, mem: 112 },
  { date: "2024-05-11", ads: 415, pro: 486, mem: 138 },
  { date: "2024-05-12", ads: 446, pro: 267, mem: 57 },
  { date: "2024-05-13", ads: 462, pro: 484, mem: 277 },
  { date: "2024-05-14", ads: 376, pro: 336, mem: 110 },
  { date: "2024-05-15", ads: 168, pro: 303, mem: 269 },
  { date: "2024-05-16", ads: 399, pro: 361, mem: 275 },
  { date: "2024-05-17", ads: 314, pro: 287, mem: 218 },
  { date: "2024-05-18", ads: 392, pro: 287, mem: 90 },
  { date: "2024-05-19", ads: 373, pro: 295, mem: 237 },
  { date: "2024-05-20", ads: 158, pro: 381, mem: 58 },
  { date: "2024-05-21", ads: 366, pro: 242, mem: 208 },
  { date: "2024-05-22", ads: 367, pro: 376, mem: 95 },
  { date: "2024-05-23", ads: 257, pro: 367, mem: 169 },
  { date: "2024-05-24", ads: 443, pro: 259, mem: 217 },
  { date: "2024-05-25", ads: 232, pro: 342, mem: 78 },
  { date: "2024-05-26", ads: 321, pro: 462, mem: 229 },
  { date: "2024-05-27", ads: 189, pro: 272, mem: 83 },
  { date: "2024-05-28", ads: 259, pro: 338, mem: 292 },
  { date: "2024-05-29", ads: 267, pro: 293, mem: 145 },
  { date: "2024-05-30", ads: 493, pro: 294, mem: 190 },
  { date: "2024-05-31", ads: 453, pro: 231, mem: 144 },
  { date: "2024-06-01", ads: 370, pro: 483, mem: 271 },
  { date: "2024-06-02", ads: 424, pro: 341, mem: 267 },
  { date: "2024-06-03", ads: 244, pro: 299, mem: 87 },
  { date: "2024-06-04", ads: 479, pro: 216, mem: 102 },
  { date: "2024-06-05", ads: 447, pro: 180, mem: 238 },
  { date: "2024-06-06", ads: 174, pro: 488, mem: 76 },
  { date: "2024-06-07", ads: 453, pro: 444, mem: 102 },
  { date: "2024-06-08", ads: 402, pro: 220, mem: 210 },
  { date: "2024-06-09", ads: 490, pro: 398, mem: 140 },
  { date: "2024-06-10", ads: 317, pro: 394, mem: 136 },
  { date: "2024-06-11", ads: 493, pro: 145, mem: 191 },
  { date: "2024-06-12", ads: 205, pro: 346, mem: 69 },
  { date: "2024-06-13", ads: 336, pro: 281, mem: 297 },
  { date: "2024-06-14", ads: 273, pro: 449, mem: 72 },
  { date: "2024-06-15", ads: 464, pro: 343, mem: 253 },
  { date: "2024-06-16", ads: 412, pro: 442, mem: 120 },
  { date: "2024-06-17", ads: 333, pro: 400, mem: 267 },
  { date: "2024-06-18", ads: 441, pro: 228, mem: 232 },
  { date: "2024-06-19", ads: 491, pro: 220, mem: 74 },
  { date: "2024-06-20", ads: 266, pro: 476, mem: 298 },
  { date: "2024-06-21", ads: 452, pro: 390, mem: 118 },
  { date: "2024-06-22", ads: 261, pro: 313, mem: 242 },
  { date: "2024-06-23", ads: 363, pro: 471, mem: 193 },
  { date: "2024-06-24", ads: 273, pro: 471, mem: 110 },
  { date: "2024-06-25", ads: 295, pro: 449, mem: 248 },
  { date: "2024-06-26", ads: 481, pro: 136, mem: 90 },
  { date: "2024-06-27", ads: 325, pro: 286, mem: 69 },
  { date: "2024-06-28", ads: 279, pro: 418, mem: 158 },
  { date: "2024-06-29", ads: 246, pro: 109, mem: 260 },
  { date: "2024-06-30", ads: 246, pro: 109, mem: 260 },
];

const chartConfig = {
  ads: {
    label: "WeTubeAds",
    color: "hsl(var(--chart-1))",
  },
  pro: {
    label: "WeTubePro",
    color: "hsl(var(--chart-2))",
  },
  mem: {
    label: "Memberships",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function TotalRevenueChart() {
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
    ...filteredData.flatMap((item) => [item.ads, item.pro, item.mem])
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Revenue</CardTitle>
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
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={filteredData}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
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
              tickFormatter={(value) => `$${value}`}
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
            <Bar
              dataKey="ads"
              fill="#6366F1"
              radius={4}
            />
            <Bar
              dataKey="pro"
              fill="#EF4444"
              radius={4}
            />
            <Bar
              dataKey="mem"
              fill="#42e35dff"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-2 w-full">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-[#6366F1]" />
            <span className="text-xs sm:text-sm">WeTubeAds</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-[#EF4444]" />
            <span className="text-xs sm:text-sm">WeTubePro</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-[#42e35dff]" />
            <span className="text-xs sm:text-sm">Memberships</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
