"use server";

import { z, ZodError } from "zod";
import GetDBUser from "./getDBUser";
import { prisma } from "@/lib/prisma";

const SetDiscordIdType = z.object({
  discordId: z.string(),
});

export default async function SetDiscordId(data: { discordId: string }) {
  try {
    const user = await GetDBUser();

    const { discordId: parsedDiscordId } = SetDiscordIdType.parse(data);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: { discordId: parsedDiscordId },
    });

    return { success: true };
  } catch (error) {
    if (error instanceof ZodError) {
      console.log("Error parsing discordId");
    } else {
      console.log("Could not update discordId");
      return { success: false };
    }

    return { success: false };
  }
}
