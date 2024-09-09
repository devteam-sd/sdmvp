"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ThreatsCardProps {
  title: string;
  icon: React.ReactNode;
  count: number;
  unresolved: number;
}

export default function ThreatsCard({
  title,
  icon,
  count,
  unresolved,
}: ThreatsCardProps) {
  return (
    <Card className="min-w-[250px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon} {/* Render the icon directly as JSX */}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
        <p className="text-xs text-muted-foreground">
          {unresolved} Unresolved threats
        </p>
      </CardContent>
    </Card>
  );
}
