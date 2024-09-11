"use client";

import { useEffect, useState } from "react";
import { Threat, columns } from "@/app/(home)/threats/colums";
import { DataTable } from "@/components/data-table";
import { useUser } from "@clerk/nextjs";
import { fetchData } from "@/lib/data-fetcher";
import TopLoader from "nextjs-toploader"; // Import TopLoader

export default function ThreatsPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [data, setData] = useState<Threat[]>([]);
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

  // Fetch threat data based on metadata
  useEffect(() => {
    if (!privateMetadata) return;

    const fetchDataFromAPI = async () => {
      try {
        // Fetch data only if private metadata is available
        const result = await fetchData(
          "/edr/alerts",
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
    <div>
      {/* Include TopLoader component */}
      <TopLoader />

      <div className="container mx-auto p-10">
        <p className="text-3xl font-bold">Threats</p>
        {data.length > 0 ? (
          <DataTable columns={columns} data={data} />
        ) : (
          <p>No threat data available.</p>
        )}
      </div>
    </div>
  );
}
