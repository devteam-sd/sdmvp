"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Device = {};

export const columns: ColumnDef<Device>[] = [
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "hostnames",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Hostname
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "platform",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Platform
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "last_seen",
    header: () => <div className="text-right">Last Seen</div>,
    cell: ({ row }) => {
      const lastSeen = parseFloat(row.getValue("last_seen"));
      const formatted = new Date(lastSeen * 1000).toLocaleString();

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "ipv4s",
    header: () => <div className="text-right">IP Addresses</div>,
    cell: ({ row }) => {
      const ipv4s = (row.getValue("ipv4s") as string[]) || [];
      return <div className="text-right">{ipv4s.join(", ")}</div>;
    },
  },
];
