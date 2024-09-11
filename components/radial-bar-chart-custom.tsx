"use client";

import { TrendingUp } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface RadialChartProps {
  activeDevices?: number;
  offlineDevices?: number;
  unresolvedThreats?: number;
  otherThreats?: number;
  title: string;
  subtitle?: string;
}

export default function RadialBarChartCustom({
  activeDevices,
  offlineDevices,
  unresolvedThreats,
  otherThreats,
  title,
  subtitle,
}: RadialChartProps) {
  const total =
    (activeDevices ?? otherThreats ?? 0) +
    (offlineDevices ?? unresolvedThreats ?? 0);
  var [attribute1, attribute2] = subtitle?.split(" / ") ?? [];
  var [attribute1_value, attribute2_value] = [0, 0];

  attribute1_value = activeDevices ?? unresolvedThreats ?? 0;
  attribute2_value = offlineDevices ?? otherThreats ?? 0;

  const chartData = [
    { attribute1: attribute1_value, attribute2: attribute2_value },
  ];

  const chartConfig = {
    attribute1: {
      label: attribute1,
      color: "lightgreen",
    },
    attribute2: {
      label: attribute2,
      color: "red",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          {title}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="attribute1"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-attribute1)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="attribute2"
              fill="var(--color-attribute2)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {title} Status Overview <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex justify-center space-x-4 leading-none text-muted-foreground">
          <div
            className="flex items-center"
            style={{ color: "var(--color-attribute1, green)" }}
          >
            <span className="text-lg">●</span>{" "}
            <span className="ml-1 font-bold">
              {attribute1} {attribute1_value}
            </span>
          </div>
          <div
            className="flex items-center"
            style={{ color: "var(--color-attribute2, red)" }}
          >
            <span className="text-lg">●</span>{" "}
            <span className="ml-1 font-bold">
              {attribute2} {attribute2_value}
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
