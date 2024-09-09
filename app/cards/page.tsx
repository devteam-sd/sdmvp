"use client";

import { Lightbulb, ComputerIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchData } from "@/lib/data-fetcher";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";

export default function TestCards() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true); // Keep loading until all data is fetched
  const [error, setError] = useState<string | null>(null);
  const [privateMetadata, setPrivateMetadata] = useState<any>(null);

  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (!isLoaded) {
      return; // Do nothing if the Clerk user is not loaded yet
    }

    if (!isSignedIn) {
      setLoading(false); // User is not signed in, so stop loading and return
      return;
    }

    const fetchPrivateMetadata = async () => {
      try {
        const userId = user?.id;
        // Fetch private metadata from the API route
        const response = await fetch(`/api/get-user-metadata?userId=${userId}`);
        const result = await response.json();

        if (response.ok) {
          setPrivateMetadata(result.privateMetadata);
        } else {
          setError(result.error || "Failed to fetch private metadata.");
          setLoading(false); // Stop loading if there's an error
        }
      } catch (err: any) {
        setError("Error fetching metadata: " + err.message);
        setLoading(false); // Stop loading if there's an error
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
          //hostnames: "leen-lab",
        };

        // Fetch data only if private metadata is available
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
        setLoading(false); // Only stop loading after both data and metadata are fetched
      }
    };

    getData();
  }, [privateMetadata, user]);

  // Show "Loading..." until both metadata and data are fetched
  if (loading) return <p>Loading...</p>;

  if (error) return <p>Internal Error: {error}</p>;

  if (!isSignedIn) {
    return <p>You need to be signed in to view this page.</p>;
  }
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-6">Cards Test</h1>
      {data && data.items.length > 0 ? (
        <>
          <p>Total devices count: {data.total}</p>
          <p>Filtered devices count: {data.count}</p>
          <p>Filters: {JSON.stringify(data.filters)}</p>
          <br />
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
              <Card x-chunk="dashboard-01-chunk-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Devices
                  </CardTitle>
                  <ComputerIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.total}</div>
                  <p className="text-xs text-muted-foreground">
                    By devices I mean devices :D
                  </p>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-01-chunk-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Devices
                  </CardTitle>
                  <Lightbulb className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.count}</div>
                  <p className="text-xs text-muted-foreground">
                    Filtered by status active and platform linux as example
                  </p>
                </CardContent>
              </Card>
            </div>
          </main>
        </>
      ) : (
        <p>No device data available.</p>
      )}
    </div>
  );
}
