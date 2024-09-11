"use client";

import { useEffect, useState } from "react";
import { Device, columns } from "@/app/(home)/devices/colums";
import { DataTable } from "@/components/data-table";
import { useUser } from "@clerk/nextjs";
import { fetchData } from "@/lib/data-fetcher";
import TopLoader from "nextjs-toploader"; // Correct Import

export default function DevicesPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [data, setData] = useState<Device[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [privateMetadata, setPrivateMetadata] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user metadata
  useEffect(() => {
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
        }
      } catch (err: any) {
        setError("Error fetching metadata: " + err.message);
      }
    };

    if (user?.id) {
      fetchPrivateMetadata();
    }
  }, [user]);

  // Fetch device data based on metadata
  useEffect(() => {
    if (!privateMetadata) return;

    const fetchDataFromAPI = async () => {
      try {
        // Fetch data only if private metadata is available
        const result = await fetchData(
          "/entities/devices",
          privateMetadata.LEEN_API_KEY,
          privateMetadata.LEEN_S1_CONNECTION_ID
        );
        setData(result.items || []);
      } catch (err: any) {
        setError("Error fetching data: " + err.message);
      } finally {
        setLoading(false); // Data fetch complete
      }
    };

    fetchDataFromAPI();
  }, [privateMetadata]);

  // Only show TopLoader and hide content until the data is fully loaded
  if (!isLoaded || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <TopLoader />
      </div>
    );
  }

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-10">
      {/* Include TopLoader component */}
      <TopLoader />

      <p className="text-3xl font-bold">Devices</p>
      {data.length > 0 ? (
        <DataTable columns={columns} data={data} />
      ) : (
        <p>No device data available.</p>
      )}
    </div>
  );
}
