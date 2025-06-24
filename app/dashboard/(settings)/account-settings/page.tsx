import DashboardPage from "@/components/DashboardPage";
import { redirect } from "next/navigation";
import React from "react";
import AccountSettings from "./_components/AccountSettings";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import GetUserById from "@/actions/getUserById";

const UpgradePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const user = await GetUserById(session.user.id);

  if (!user) {
    redirect("sign-in");
  }

  return (
    <DashboardPage title={"Settings"}>
      <AccountSettings discordId={user.discordId ?? ""} />
    </DashboardPage>
  );
};

export default UpgradePage;
