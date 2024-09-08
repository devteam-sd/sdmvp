"use client";

import { useEffect, useState } from "react";
import { Device, columns } from "@/app/(home)/endpoints/colums";
import { DataTable } from "@/components/data-table";
import { useUser } from "@clerk/nextjs";
import { fetchData } from "@/lib/data-fetcher";

export default function EndpointsPage() {
  const { user } = useUser();
  const [data, setData] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [privateMetadata, setPrivateMetadata] = useState<any>(null);

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
          setLoading(false); // Stop loading if there's an error
        }
      } catch (err: any) {
        setError("Error fetching metadata: " + err.message);
        setLoading(false); // Stop loading if there's an error
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
        setLoading(false); // Stop loading after both data and metadata are fetched
      }
    };

    fetchDataFromAPI();
  }, [privateMetadata]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-10">
      {data.length > 0 ? (
        <DataTable columns={columns} data={data} />
      ) : (
        <p>No device data available.</p>
      )}
    </div>
  );
}
