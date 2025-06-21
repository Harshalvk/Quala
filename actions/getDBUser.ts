"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function GetDBUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const sessionUser = session.user;

  const user = await prisma.user.findUnique({
    where: {
      id: sessionUser.id,
      email: sessionUser.email,
    },
  });

  if (!user) {
    redirect("/sign-in");
  }

  return user;
}
