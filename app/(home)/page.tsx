"use client";

import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function HomePage() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      if (!userId) {
        router.push("/sign-in");
      } else {
        setLoading(false);
      }
    }
  }, [isLoaded, userId, router]);

  // If auth status is loading or we are redirecting, show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        {/* Spinning favicon */}
        <Image
          src="/favicon.ico"
          alt="Loading"
          width={50}
          height={50}
          className="animate-spin filter invert contrast-100 brightness-100"
        />
      </div>
    );
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
