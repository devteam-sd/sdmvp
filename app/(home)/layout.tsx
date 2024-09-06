"use client";
import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  // State to receive collapsed state from SideBar
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/sign-in"); // Redirect if not authenticated
    }
  }, [isLoaded, userId, router]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside>
        <SideBar />
      </aside>

      {/* Content area with dynamic margin based on sidebar collapsed state */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarCollapsed ? "ml-0" : "ml-0"
        }`}
      >
        <nav>
          <Navbar />
        </nav>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
