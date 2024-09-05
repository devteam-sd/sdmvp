import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

const clerk = clerkClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    const user = await clerk.users.getUser(userId);

    return NextResponse.json({
      privateMetadata: user.privateMetadata,
      publicMetadata: user.publicMetadata,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}
