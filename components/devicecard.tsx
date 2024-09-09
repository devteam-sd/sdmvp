"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DeviceCardProps {
  title: string;
  icon: React.ReactNode;
  count: number;
  active: number;
}

export default function DeviceCard({
  title,
  icon,
  count,
  active,
}: DeviceCardProps) {
  return (
    <Card className="min-w-[250px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon} {/* Render the icon directly as JSX */}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
        <p className="text-xs text-muted-foreground">{active} Active devices</p>
      </CardContent>
    </Card>
  );
}
