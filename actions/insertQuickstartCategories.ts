"use server";

import { prisma } from "@/lib/prisma";
import GetUser from "./getUser";

export default async function InsertQuickstartCategories() {
  const user = await GetUser();
  const categories = await prisma.eventCategory.createMany({
    data: [
      { name: "Bug", emoji: "🐛", color: 0xff6b6b },
      { name: "Sale", emoji: "💰", color: 0xffeb3b },
      { name: "Question", emoji: "🤔", color: 0x6c5ce7 },
    ].map((category) => ({
      ...category,
      userId: user.id,
    })),
  });

  if (!categories) {
    return;
  }

  return { success: true, count: categories.count };
}
