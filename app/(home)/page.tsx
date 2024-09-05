"use client";
import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/sign-in"); // Redirect if not authenticated
    }
  }, [isLoaded, userId, router]);

  if (!isLoaded) {
    // Optionally render a loading state while the auth status is being determined
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-[225px_1fr] grid-rows-[60px_1fr] h-screen">
      <div className="row-span-2">
        <SideBar />
      </div>
      <div className="col-span-1">
        <Navbar />
      </div>
      <div className="col-span-1"></div>
    </div>
  );
}
