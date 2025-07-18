"use server";

import { prisma } from "@/lib/prisma";
import { addMonths, startOfMonth } from "date-fns";
import { FREE_QUOTA, PRO_QUOTA } from "@/lib/config";

export default async function GetUsage(userId: string) {
  if (!userId && typeof userId !== "string") {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return null;
  }

  const currentDate = startOfMonth(new Date());

  const userDB = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  const quota = await prisma.quota.findFirst({
    where: {
      userId: user.id,
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
    },
  });

  const eventCount = quota?.count ?? 0;

  const categoryCount = await prisma.eventCategory.count({
    where: {
      userId: user.id,
    },
  });

  const limits = userDB?.plan === "PRO" ? PRO_QUOTA : FREE_QUOTA;

  const resetDate = addMonths(currentDate, 1);

  return {
    categoriesUsed: categoryCount,
    categoriesLimit: limits.maxEventCategories,
    eventsUsed: eventCount,
    eventsLimit: limits.maxEventsPerMonth,
    resetDate,
  };
}
