import React from "react";
import PricingPageContent from "./_component/PricingPageContent";
import { authClient } from "@/lib/auth-client";

const PricingPage = async () => {
  const session = await authClient.getSession();
  const user = session.data?.user ?? null;

  return <PricingPageContent user={user} />;
};

export default PricingPage;
