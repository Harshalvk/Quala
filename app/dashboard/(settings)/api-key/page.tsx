import DashboardPage from "@/components/DashboardPage";
import { redirect } from "next/navigation";
import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import GetUserById from "@/actions/getUserById";
import ApiKeySettings from "./_components/ApiKeySettings";

const ApiKeyPage = async () => {
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
      <ApiKeySettings apiKey={user.apiKey ?? ""} />
    </DashboardPage>
  );
};

export default ApiKeyPage;
