import DashboardPage from "@/components/DashboardPage";
import { redirect } from "next/navigation";
import React from "react";
import UpgradePageContent from "./_components/UpgradePageContent";
import { authClient } from "@/lib/auth-client";
import { prisma } from "@/lib/prisma";

const UpgradePage = async () => {
  const session = await authClient.getSession();
  if (!session) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findFirst({
    where: {
      id: session.data?.user.id,
      email: session.data?.user.email,
    },
  });

  if (!user) {
    redirect("sign-in");
  }

  return (
    <DashboardPage
      title={user.plan === "FREE" ? "Free Membership" : "Pro Membership"}
    >
      {user.plan ? (
        <UpgradePageContent plan={user.plan} />
      ) : (
        <div>No plan found</div>
      )}
    </DashboardPage>
  );
};

export default UpgradePage;
