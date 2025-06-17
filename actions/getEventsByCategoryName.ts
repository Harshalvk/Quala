"use server";

import { z } from "zod";
import { CATEGORY_NAME_VALIDATOR } from "@/lib/validators/category.validator";
import GetUser from "./getUser";
import { startOfDay, startOfMonth, startOfWeek } from "date-fns";
import { prisma } from "@/lib/prisma";

const getEventsByCategoryNameSchema = z.object({
  name: CATEGORY_NAME_VALIDATOR,
  page: z.number(),
  limit: z.number().max(50),
  timeRange: z.enum(["today", "week", "month"]),
});

type GetEventsByCategoryNameParams = z.infer<
  typeof getEventsByCategoryNameSchema
>;

export default async function GetEventsByCategoryName({
  name,
  page,
  limit,
  timeRange,
}: GetEventsByCategoryNameParams) {
  const user = await GetUser();

  const now = new Date();
  let startDate: Date;

  switch (timeRange) {
    case "today":
      startDate = startOfDay(now);
      break;
    case "week":
      startDate = startOfWeek(now, { weekStartsOn: 0 });
      break;
    case "month":
      startDate = startOfMonth(now);
      break;
  }

  const [events, eventsCount, uniqueFieldCount] = await Promise.all([
    await prisma.event.findMany({
      where: {
        eventCategory: { name, userId: user.id },
        createdAt: { gte: startDate },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),

    await prisma.event.count({
      where: {
        eventCategory: { name, userId: user.id },
        createdAt: { gte: startDate },
      },
    }),

    await prisma.event
      .findMany({
        where: {
          eventCategory: { name, userId: user.id },
          createdAt: { gte: startDate },
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
  ]);

  return { events, eventsCount, uniqueFieldCount };
}
