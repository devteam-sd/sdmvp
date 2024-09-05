"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchData } from "@/lib/data-fetcher";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [privateMetadata, setPrivateMetadata] = useState<any>(null);

  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    const fetchPrivateMetadata = async () => {
      if (!isLoaded || !isSignedIn || !user) return;

      try {
        const userId = user.id;
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

    fetchPrivateMetadata();
  }, [isLoaded, isSignedIn, user]);

  useEffect(() => {
    const getData = async () => {
      if (!privateMetadata || !user) return;

      try {
        const result = await fetchData(
          "/entities/devices",
          privateMetadata.LEEN_API_KEY,
          privateMetadata.LEEN_S1_CONNECTION_ID
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
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-6">Device Data</h1>
      {data && data.items.length > 0 ? (
        <Table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 py-2">Hostname</TableHead>
              <TableHead className="px-4 py-2">Platform</TableHead>
              <TableHead className="px-4 py-2">Status</TableHead>
              <TableHead className="px-4 py-2">IP Addresses</TableHead>
              <TableHead className="px-4 py-2">Last Seen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.items.map((device: any) => (
              <TableRow key={device.id} className="hover:bg-gray-100">
                <TableCell className="border px-4 py-2">
                  {device.hostnames && device.hostnames.length > 0
                    ? device.hostnames.join(", ")
                    : "N/A"}
                </TableCell>
                <TableCell className="border px-4 py-2">
                  {device.platform || "N/A"}
                </TableCell>
                <TableCell className="border px-4 py-2">
                  {device.status || "N/A"}
                </TableCell>
                <TableCell className="border px-4 py-2">
                  {device.ipv4s && device.ipv4s.length > 0
                    ? device.ipv4s.join(", ")
                    : "N/A"}
                </TableCell>
                <TableCell className="border px-4 py-2">
                  {device.last_seen
                    ? new Date(device.last_seen).toLocaleString()
                    : "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>No device data available.</p>
      )}
    </div>
  );
}
