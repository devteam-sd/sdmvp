"use client";

import { useEffect, useState } from "react";
import { fetchData } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Adjust this path based on your shadcn setup

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData("/entities/devices");
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

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
