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
