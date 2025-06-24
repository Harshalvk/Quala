import DashboardPage from "@/components/DashboardPage";
import { redirect } from "next/navigation";
import React from "react";
import UpgradePageContent from "./_components/UpgradePageContent";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import GetUserById from "@/actions/getUserById";

const UpgradePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session) {
    return <div>Session not found</div>;
  }

  const user = await GetUserById(session.user.id);

  if (!user) {
    redirect("sign-in");
  }

  return (
    <DashboardPage
      title={user.plan === "FREE" ? "Free Membership" : "Pro Membership"}
    >
      {user.plan ? (
        <UpgradePageContent user={user} />
      ) : (
        <div>No plan found</div>
      )}
    </DashboardPage>
  );
};

export default UpgradePage;
