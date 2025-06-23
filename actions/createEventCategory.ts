"use server";

import { EVENT_CATEGORY_VALIDATOR } from "@/lib/validators/category.validator";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { parseColor } from "@/lib/utils";
import GetUser from "./getUser";

export default async function CreateEventCategory(
  formData: z.infer<typeof EVENT_CATEGORY_VALIDATOR>
) {
  const user = await GetUser();
  const { color, name, emoji } = formData;

  const eventCategory = await prisma.eventCategory.create({
    data: {
      name: name.toLowerCase(),
      color: parseColor(color),
      emoji: emoji!,
      userId: user.id,
    },
  });

  if (!eventCategory) {
    throw new Error("Category not created");
  }

  return eventCategory;
}
