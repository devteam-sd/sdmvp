"use client";

import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Set loading initially

  useEffect(() => {
    if (isLoaded) {
      if (!userId) {
        router.push("/sign-in"); // Redirect if not authenticated
      } else {
        setLoading(false); // Set loading to false if authenticated
      }
    }
  }, [isLoaded, userId, router]);

  // If auth status is loading or we are redirecting, show loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Only render the content if the user is authenticated
  return (
    <div className="flex">
      <aside className="">
        <SideBar />
      </aside>
      <nav className="w-full">
        <Navbar />
      </nav>
    </div>
  );
}
