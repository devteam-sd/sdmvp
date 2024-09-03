"use client";

import Sidebar from "@/components/sidebar";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return (
      <>
        <Sidebar />
        <SignInButton />
      </>
    );
  }

  return (
    <>
      <Sidebar />
      <UserButton />
    </>
  );
}
