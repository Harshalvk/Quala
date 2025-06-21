"use server";

import { createCheckoutSession } from "@/lib/stripe";
import GetUser from "./getUser";

export default async function StripeCreateCheckoutSession() {
  const user = await GetUser();

  const session = await createCheckoutSession({
    userEmail: user.email,
    userId: user.id,
  });

  return { url: session.url };
}
