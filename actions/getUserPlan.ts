"use server";

import { prisma } from "@/lib/prisma";

export default async function GetUserPlan(userId: string) {
  if (!userId) {
    return { plan: null };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return { plan: null };
  }

  return { plan: user.plan };
}
