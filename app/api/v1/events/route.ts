import { NextRequest, NextResponse } from "next/server";
import { CATEGORY_NAME_VALIDATOR } from "@/lib/validators/category.validator";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { FREE_QUOTA, PRO_QUOTA } from "@/lib/config";
import { DiscordClient } from "@/lib/discord-client";

const REQUEST_VALIDATOR = z
  .object({
    category: CATEGORY_NAME_VALIDATOR,
    fields: z.record(z.string().or(z.number()).or(z.boolean()).optional()),
    description: z.string().optional(),
  })
  .strict();

export const POST = async (req: NextRequest) => {
  try {
    const authHeader = req.headers.get("Authorization");

    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          message: "Invalid auth header format. Expected: 'Bearer [API_KEY]'",
        },
        { status: 401 }
      );
    }

    const apiKey = authHeader.split(" ")[1];

    if (!apiKey || apiKey.trim() === "") {
      return NextResponse.json({ message: "Invliad API Key" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { apiKey },
      include: { eventCategories: true },
    });

    if (!user) {
      return NextResponse.json({ message: "Invliad API Key" }, { status: 401 });
    }

    if (!user.discordId) {
      return NextResponse.json(
        { message: "Please enter your discord ID in your account settings" },
        { status: 403 }
      );
    }

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const quota = await prisma.quota.findUnique({
      where: {
        userId: user.id,
        month: currentMonth,
        year: currentYear,
      },
    });

    const quotaLimit =
      user.plan === "FREE"
        ? FREE_QUOTA.maxEventsPerMonth
        : PRO_QUOTA.maxEventsPerMonth;

    if (quota && quota.count >= quotaLimit) {
      return NextResponse.json(
        {
          message:
            "Monthly quota reached. Please upgrade your plan for more events",
        },
        { status: 429 }
      );
    }

    const discord = new DiscordClient(process.env.DISCORD_BOT_TOKEN);

    const dmChannel = await discord.createDM(user.discordId);

    let requestData: unknown;

    try {
      requestData = await req.json();
    } catch (error) {
      return NextResponse.json(
        {
          message: "Invalid JSON request body",
        },
        { status: 400 }
      );
    }

    const validationResult = REQUEST_VALIDATOR.parse(requestData);

    const category = user.eventCategories.find(
      (cat) => cat.name === validationResult.category
    );

    if (!category) {
      return NextResponse.json(
        {
          message: `You don't have a category named "${validationResult.category}"`,
        },
        { status: 404 }
      );
    }

    const eventData = {
      title: `${category.emoji || "🔔"} ${
        category.name.charAt(0).toUpperCase() + category.name.slice(1)
      }`,
      description:
        validationResult.description ||
        `A new ${category.name} event has occured!`,
      color: category.color,
      timestamp: new Date().toISOString(),
      fields: Object.entries(validationResult.fields || {}).map(
        ([key, value]) => {
          return {
            name: key,
            value: String(value),
            inline: true,
          };
        }
      ),
    };

    const event = await prisma.event.create({
      data: {
        name: category.name,
        formatedMessage: `${eventData.title}\n\n${eventData.description}`,
        userId: user.id,
        fields: validationResult.fields || {},
        eventCategoryId: category.id,
      },
    });

    try {
      await discord.sendEmbed(dmChannel.id, eventData);

      await prisma.event.update({
        where: {
          id: event.id,
        },
        data: { deliveryStatus: "DELIVERED" },
      });

      await prisma.quota.upsert({
        where: {
          userId: user.id,
          month: currentMonth,
          year: currentYear,
        },
        update: { count: { increment: 1 } },
        create: {
          userId: user.id,
          month: currentMonth,
          year: currentYear,
          count: 1,
        },
      });
    } catch (error) {
      await prisma.event.update({
        where: {
          id: event.id,
        },
        data: { deliveryStatus: "FAILED" },
      });

      console.log(error);

      return NextResponse.json(
        {
          message: "Error processing event",
          eventId: event.id,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Event processed successfully",
        eventId: event.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.message }, { status: 422 });
    }

    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
};
