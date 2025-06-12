"use server";

import { prisma } from "@/lib/prisma";
import GetUser from "./getUser";

export default async function DeleteCategory(name: string) {
  const user = await GetUser();

  await prisma.eventCategory.delete({
    where: {
      name_userId: { name, userId: user.id },
    },
  });

  return { success: true };
}
