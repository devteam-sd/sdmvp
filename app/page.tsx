"use client";

import Sidebar from "@/components/sidebar";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="grid grid-cols-5 grid-rows-[auto_1fr_auto] md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] h-screen">
        {/* Sidebar (10) */}
        <div className="row-span-3 border-t border-b border-l border-r">
          <Sidebar />
        </div>

        {/* Top fixed height (13) */}
        <div className="col-span-3 col-start-2 row-start-1 h-16"></div>

        {/* Right fixed height (14) - centered SignInButton */}
        <div className="col-start-5 row-start-1 h-16 p-2 flex items-center justify-center">
          <SignInButton />
        </div>

        {/* Main content (11) taking the remaining height */}
        <div className="col-span-4 col-start-2 row-start-2 row-end-3">
          <div className="h-full flex items-center justify-center">
            <h1 className="text-3xl font-bold">Welcome to StartupDefense</h1>
          </div>
        </div>

        {/* Bottom fixed height (12) - centered footer */}
        <div className="col-span-4 col-start-2 row-start-3 h-16 flex items-center justify-center">
          StartupDefense LLC
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-5 grid-rows-[auto_1fr_auto] md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] h-screen">
      {/* Sidebar (10) */}
      <div className="row-span-3 border-t border-b border-l border-r">
        <Sidebar />
      </div>

      {/* Top fixed height (13) */}
      <div className="col-span-3 col-start-2 row-start-1 h-16"></div>

      {/* Right fixed height (14) - centered SignInButton */}
      <div className="col-start-5 row-start-1 h-16 p-2 flex items-center justify-center">
        <UserButton />
      </div>

      {/* Main content (11) taking the remaining height */}
      <div className="col-span-4 col-start-2 row-start-2 row-end-3">
        <div className="h-full flex items-center justify-center">
          <h1 className="text-3xl font-bold">
            Welcome to StartupDefense {user.firstName}!
          </h1>
        </div>
      </div>

      {/* Bottom fixed height (12) - centered footer */}
      <div className="col-span-4 col-start-2 row-start-3 h-16 flex items-center justify-center">
        StartupDefense LLC
      </div>
    </div>
  );
}
