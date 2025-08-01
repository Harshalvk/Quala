import React from "react";
import DashboardPage from "@/components/DashboardPage";
import DashboardPageContent from "./_components/DashboardPageContent";
import CreateEventCategoryModal from "@/components/CreateEventCategoryModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { createCheckoutSession } from "@/lib/stripe";
import { redirect } from "next/navigation";
import PaymentSuccessModal from "./_components/PaymentSuccessModal";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Dashboard = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) => {
  const SearchParams = await searchParams;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <div>Session not found. Please Login</div>;
  }

  const user = session.user;

  const intent = SearchParams.intent;

  if (intent === "upgrade") {
    const session = await createCheckoutSession({
      userEmail: user.email,
      userId: user.id,
    });

    if (session.url) redirect(session.url);
  }

  const success = Boolean(SearchParams.success);

  return (
    <>
      {success ? <PaymentSuccessModal /> : null}
      <DashboardPage
        title="Dashboard"
        hideBackButton
        cta={
          <CreateEventCategoryModal>
            <Button className="w-full sm:w-fit">
              <Plus /> Add Category
            </Button>
          </CreateEventCategoryModal>
        }
      >
        <DashboardPageContent />
      </DashboardPage>
    </>
  );
};

export default Dashboard;
