import DashboardPage from "@/components/DashboardPage";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";
import CategoryPageContent from "./_components/CategoryPageContent";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ name: string | string[] }>;
}) => {
  const { name: categoryName } = await params;

  if (typeof categoryName !== "string") notFound();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <div>Session not found. Please Login</div>;
  }

  const user = session.user;

  if (!user) return notFound();

  const category = await prisma.eventCategory.findUnique({
    where: {
      name_userId: {
        name: categoryName,
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

  if (!category) return notFound();

  const hasEvents = category._count.events > 0;

  return (
    <DashboardPage title={`${category.emoji} ${category.name} events`}>
      <CategoryPageContent category={category} hasEvents={hasEvents} />
    </DashboardPage>
  );
};

export default CategoryPage;
