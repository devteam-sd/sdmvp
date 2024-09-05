"use client";

import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

export default function Example() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return (
      <>
        <SignInButton />
      </>
    );
  }

  return (
    <>
      <p>Hello, {user.firstName}!</p>
      <br />
      <p>Your current active session is: {user.id}.</p>
      <br />
      <UserButton />
    </>
  );
}
