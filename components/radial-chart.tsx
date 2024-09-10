"use client";

import { RadialBarChart, RadialBar, PolarRadiusAxis, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

interface DeviceRadialChartProps {
  activeDevices?: number;
  offlineDevices?: number;
  unresolvedThreats?: number;
  otherThreats?: number;
  title: string;
  subtitle?: string;
}

export default function RadialChart({
  activeDevices,
  offlineDevices,
  unresolvedThreats,
  otherThreats,
  title,
  subtitle,
}: DeviceRadialChartProps) {
  const total =
    (activeDevices ?? otherThreats ?? 0) +
    (offlineDevices ?? unresolvedThreats ?? 0);
  const [attribute1, attribute2] = subtitle?.split(" / ") ?? [];
  var [attribute1_value, attribute2_value] = [0, 0];

  attribute1_value = activeDevices ?? unresolvedThreats ?? 0;
  attribute2_value = offlineDevices ?? otherThreats ?? 0;

  // Chart Data
  const chartData = [
    { name: attribute1, value: attribute1_value, fill: "#36a2eb" }, // Blue
    { name: attribute2, value: attribute2_value, fill: "#ff6384" }, // Red
  ];

  return (
    <Card className="flex flex-col items-center">
      <CardHeader className="flex flex-col items-center pb-0">
        <div className="flex items-center space-x-2">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
      </CardHeader>

      {/* Reduce bottom padding of the content to reduce space */}
      <CardContent className="flex flex-1 items-center justify-center pb-2">
        <div className="relative">
          {/* RadialBarChart */}
          <RadialBarChart
            width={250}
            height={250}
            cx="50%"
            cy="50%"
            innerRadius="80%"
            outerRadius="100%"
            barSize={10}
            data={chartData}
            startAngle={180}
            endAngle={0}
          >
            <PolarRadiusAxis type="number" domain={[0, total]} tick={false} />

            {/* Tooltip for Hover Information */}
            <Tooltip
              content={({ payload }) => {
                if (payload && payload.length) {
                  const { value, name } = payload[0].payload;
                  return (
                    <div className="bg-white text-black text-sm p-1 rounded shadow">
                      <p>{`${name}: ${value}`}</p>
                    </div>
                  );
                }
                return null;
              }}
              wrapperStyle={{ outline: "none" }}
            />

            {/* Radial Bars */}
            <RadialBar dataKey="value" cornerRadius={5} />

            {/* Center Label - Total Devices */}
            <text
              x={125} // Center of the chart (cx)
              y={125} // Center of the chart (cy)
              textAnchor="middle"
              className="fill-foreground"
            >
              <tspan x={125} y={110} className="text-3xl font-bold">
                {total}
              </tspan>
              <tspan x={125} y={130} className="text-sm text-muted-foreground">
                {title}
              </tspan>
            </text>
          </RadialBarChart>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-1 text-sm text-center">
        <p className="font-semibold">{title} Status Overview</p>
        <div className="flex justify-center space-x-4">
          <div className="flex items-center text-blue-500">
            <span className="text-lg">●</span>{" "}
            <span className="ml-1">
              {attribute1} {attribute1_value}
            </span>
          </div>
          <div className="flex items-center text-red-500">
            <span className="text-lg">●</span>{" "}
            <span className="ml-1">
              {attribute2} {attribute2_value}
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
