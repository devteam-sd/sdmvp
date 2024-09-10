"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import DeviceRadialChart from "@/components/device-radial-chart";
import { fetchData } from "@/lib/data-fetcher";

export default function TestPage() {
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
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-6">Device Overview</h1>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3">
        {/* Total Devices Card 
        <Card className="p-4">
          <CardHeader className="flex justify-between pb-2">
            <CardTitle>Total Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDevices}</div>
            <p className="text-xs text-muted-foreground">
              The total number of devices.
            </p>
          </CardContent>
        </Card> */}

        {/* Active Devices Card 
        <Card className="p-4">
          <CardHeader className="flex justify-between pb-2">
            <CardTitle>Active Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeDevices}</div>
            <p className="text-xs text-muted-foreground">
              Filtered by active status.
            </p>
          </CardContent>
        </Card> */}

        {/* Device Radial Chart */}
        <DeviceRadialChart
          activeDevices={activeDevices}
          offlineDevices={offlineDevices}
        />
      </div>
    </div>
  );
}
