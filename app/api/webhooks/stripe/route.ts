import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature") as string;

  try {
    const event = stripe.webhooks.constructEvent(
      body as string,
      signature as string,
      process.env.STRIPE_WEBHOOK_SECRET! as string
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const { userId } = session.metadata || { userId: null };

      if (!userId) {
        return new Response("Invalid metadata", { status: 400 });
      }

      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          plan: "PRO",
        },
      });
    }

    return new Response("OK");
  } catch (error) {
    console.error("stripe webhook error", error);
    return new NextResponse("stripe webhook error", { status: 400 });
  }
}
