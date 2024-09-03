"use client";

import Sidebar from "@/components/sidebar";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="flex w-screen h-screen">
        <div className="w-1/4 h-full">
          <Sidebar />
        </div>
        <div className="flex-1 flex justify-end items-start p-5">
          <SignInButton />
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-screen h-screen">
      <div className="w-1/4 h-full">
        <Sidebar />
      </div>
      <div className="flex-1 flex justify-end items-start p-5">
        <UserButton />
      </div>
    </div>
  );
}
