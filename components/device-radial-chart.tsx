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
  activeDevices: number;
  offlineDevices: number;
  title: string;
}

export default function DeviceRadialChart({
  activeDevices,
  offlineDevices,
  title,
}: DeviceRadialChartProps) {
  const totalDevices = activeDevices + offlineDevices;

  // Chart Data
  const chartData = [
    { name: "Active", value: activeDevices, fill: "#36a2eb" }, // Blue for active devices
    { name: "Offline", value: offlineDevices, fill: "#ff6384" }, // Red for offline devices
  ];

  return (
    <Card className="flex flex-col items-center">
      <CardHeader className="flex flex-col items-center pb-0">
        <div className="flex items-center space-x-2">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
        </div>
        <p className="text-xs text-muted-foreground mt-1">Active / Offline</p>
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
            <PolarRadiusAxis
              type="number"
              domain={[0, totalDevices]}
              tick={false}
            />

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
                {totalDevices}
              </tspan>
              <tspan x={125} y={130} className="text-sm text-muted-foreground">
                Devices
              </tspan>
            </text>
          </RadialBarChart>
        </div>
      </CardContent>

      {/* Adjust the footer to reduce space between chart and footer */}
      <CardFooter className="flex-col gap-1 text-sm text-center">
        <p className="font-semibold">Device Status Overview</p>
        <div className="flex justify-center space-x-4">
          <div className="flex items-center text-blue-500">
            <span className="text-lg">●</span>{" "}
            <span className="ml-1">Active {activeDevices}</span>
          </div>
          <div className="flex items-center text-red-500">
            <span className="text-lg">●</span>{" "}
            <span className="ml-1">Offline {offlineDevices}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
