import { ShieldAlert, Computer } from "lucide-react";
import DeviceCard from "@/components/devicecard";
import React from "react";
import ThreatsCard from "@/components/threatscard";

export default function Dashboard() {
  return (
    <div className="flex flex-row items-center justify-center space-x-6 p-10">
      <DeviceCard
        title="Devices"
        icon={<Computer className="h-8 w-8 text-muted-foreground" />}
        count={257}
        active={221}
      />
      <ThreatsCard
        title="Threats"
        icon={<ShieldAlert className="h-8 w-8 text-muted-foreground" />}
        count={335}
        unresolved={23}
      />
    </div>
  );
}
