"use client";

import React, { useEffect, useState } from "react";
import { fetchData } from "@/lib/data-fetcher";
import { useUser } from "@clerk/nextjs";
import RadialBarChartCustom from "@/components/radial-bar-chart-custom";

export default function Dashboard() {
  const [devicesData, setDevicesData] = useState<any>(null);
  const [threatsData, setThreatsData] = useState<any>(null);
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

    const getDevicesData = async () => {
      try {
        const filters = {
          status: "active",
        };

        const result = await fetchData(
          "/entities/devices",
          privateMetadata.LEEN_API_KEY,
          privateMetadata.LEEN_S1_CONNECTION_ID,
          filters
        );
        setDevicesData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const getThreatsData = async () => {
      try {
        const filters = {
          status: "unresolved",
        };

        const result = await fetchData(
          "/edr/alerts",
          privateMetadata.LEEN_API_KEY,
          privateMetadata.LEEN_S1_CONNECTION_ID,
          filters
        );
        setThreatsData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getDevicesData();
    getThreatsData();
  }, [privateMetadata, user]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Internal Error: {error}</p>;

  // Calculate the active and offline devices
  const activeDevices = devicesData ? devicesData.count : 0;
  const totalDevices = devicesData ? devicesData.total : 0;
  const offlineDevices = totalDevices - activeDevices;

  // Calculate the active and offline threats
  const unresolvedThreats = threatsData ? threatsData.count : 0;
  const totalThreats = threatsData ? threatsData.total : 0;
  const otherThreats = totalThreats - unresolvedThreats;

  return (
    <div className="items-center justify-center space-x-20 p-5">
      <div className="flex flex-row items-center justify-center space-x-20 p-10">
        <RadialBarChartCustom
          title={"Devices"}
          subtitle="Active / Offline"
          activeDevices={activeDevices}
          offlineDevices={offlineDevices}
        />
        <RadialBarChartCustom
          unresolvedThreats={unresolvedThreats}
          otherThreats={otherThreats}
          title="Threats"
          subtitle="Unresolved / Other"
        />
      </div>
    </div>
  );
}
