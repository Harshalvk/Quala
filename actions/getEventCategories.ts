"use server";

import { prisma } from "@/lib/prisma";
import GetUser from "./getUser";
import { startOfMonth } from "date-fns";

export default async function GetEventCategoires() {
  const user = await GetUser();

  const categories = await prisma.eventCategory.findMany({
    where: { userId: user.id },
    select: {
      id: true,
      name: true,
      emoji: true,
      color: true,
      updatedAt: true,
      createdAt: true,
    },
    orderBy: { updatedAt: "desc" },
  });

  const categoriesWithCounts = await Promise.all(
    categories.map(async (category) => {
      const now = new Date();
      const firstDayOfMonth = startOfMonth(now);

      const [uniqueFieldCount, eventsCount, lastPing] = await Promise.all([
        prisma.event
          .findMany({
            where: {
              eventCategory: { id: category.id },
              createdAt: { gte: firstDayOfMonth },
            },
            select: {
              fields: true,
            },
            distinct: ["fields"],
          })
          .then((events) => {
            const fieldNames = new Set<string>();
            events.forEach((event) => {
              Object.keys(event.fields as object).forEach((fieldName) => {
                fieldNames.add(fieldName);
              });
            });

            return fieldNames.size;
          }),

        prisma.event.count({
          where: {
            eventCategory: { id: category.id },
            createdAt: { gte: firstDayOfMonth },
          },
        }),

        prisma.event.findFirst({
          where: {
            eventCategory: { id: category.id },
          },
          orderBy: { createdAt: "desc" },
          select: { createdAt: true },
        }),
      ]);

      return {
        ...category,
        uniqueFieldCount,
        eventsCount,
        lastPing: lastPing?.createdAt || null,
      };
    })
  );

  return { categories: categoriesWithCounts };
}
