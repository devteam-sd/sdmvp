"use client";

import { ShieldAlert, Computer } from "lucide-react";
import DeviceCard from "@/components/device-card";
import React, { useEffect, useState } from "react";
import ThreatsCard from "@/components/threats-card";
import { fetchData } from "@/lib/data-fetcher";
import { useUser } from "@clerk/nextjs";
import DeviceRadialChart from "@/components/device-radial-chart";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [privateMetadata, setPrivateMetadata] = useState<any>(null);
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      setLoading(false);
      return;
    }

    const fetchPrivateMetadata = async () => {
      try {
        const userId = user?.id;
        const response = await fetch(`/api/get-user-metadata?userId=${userId}`);
        const result = await response.json();
        if (response.ok) {
          setPrivateMetadata(result.privateMetadata);
        } else {
          setError(result.error || "Failed to fetch private metadata.");
        }
      } catch (err: any) {
        setError("Error fetching metadata: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrivateMetadata();
  }, [isLoaded, isSignedIn, user]);

  useEffect(() => {
    if (!privateMetadata || !user) return;

    const getData = async () => {
      try {
        const filters = {
          status: "active",
          platform: "linux",
        };

        const result = await fetchData(
          "/entities/devices",
          privateMetadata.LEEN_API_KEY,
          privateMetadata.LEEN_S1_CONNECTION_ID,
          filters
        );
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [privateMetadata, user]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Internal Error: {error}</p>;

  // Calculate the active and offline devices
  const activeDevices = data ? data.count : 0;
  const totalDevices = data ? data.total : 0;
  const offlineDevices = totalDevices - activeDevices;
  return (
    <div className="items-center justify-center space-x-20 p-5">
      {/* <div className="flex flex-row items-center justify-center space-x-20 p-5">
        <DeviceCard
          title="Devices"
          icon={<Computer className="h-8 w-8 text-muted-foreground" />}
          count={totalDevices}
          active={activeDevices}
          offline={offlineDevices}
        />
        <ThreatsCard
          title="Threats"
          icon={<ShieldAlert className="h-8 w-8 text-muted-foreground" />}
          count={335}
          unresolved={23}
        />
      </div> */}
      <div className="flex flex-row items-center justify-center space-x-20 p-10">
        <DeviceRadialChart
          activeDevices={activeDevices}
          offlineDevices={offlineDevices}
          title="Devices"
        />
        <DeviceRadialChart
          activeDevices={activeDevices}
          offlineDevices={offlineDevices}
          title="Threats"
        />
      </div>
    </div>
  );
}
