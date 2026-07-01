// lib/auth.ts
import { auth } from "@clerk/nextjs/server";

export async function requireUserId(): Promise<string> {
  const { userId, isAuthenticated } = await auth();

  if (!isAuthenticated || !userId) {
    throw new Error("Unauthorized");
  }

  return userId;
}
