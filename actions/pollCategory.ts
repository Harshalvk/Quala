import { prisma } from "@/lib/prisma";
import { CATEGORY_NAME_VALIDATOR } from "@/lib/validators/category.validator";
import { z } from "zod";
import GetUser from "./getUser";

export default async function PollCategory({
  name,
}: {
  name: z.infer<typeof CATEGORY_NAME_VALIDATOR>;
}) {
  const user = await GetUser();
  const category = await prisma.eventCategory.findUnique({
    where: {
      name_userId: {
        name,
        userId: user.id,
      },
    },
    include: {
      _count: {
        select: {
          events: true,
        },
      },
    },
  });

  if (!category) {
    return;
  }

  const hasEvents = category._count.events > 0;

  return { hasEvents };
}
