"use server";

import { prisma } from "@/lib/prisma";

export default async function GetUserById(userId: string) {
  if (!userId && typeof userId !== "string") {
    return null;
  }

  const user = prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return null;
  }

  return user;
}
