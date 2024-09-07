"use client";

import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      if (!isSignedIn) {
        router.push("/sign-in");
      } else {
        setLoading(false);
      }
    }
  }, [isLoaded, isSignedIn, router]);

  if (loading || !isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        {/* Spinning favicon */}
        <Image
          src="/icon.png"
          alt="Loading"
          width={50}
          height={50}
          className="animate-spin filter contrast-100 brightness-100"
        />
      </div>
    );
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
