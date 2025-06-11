import React from "react";
import DashboardPage from "@/components/DashboardPage";
import DashboardPageContent from "./_components/DashboardPageContent";
import GetUser from "@/actions/getUser";
import CreateEventCategoryModal from "@/components/CreateEventCategoryModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Dashboard = async () => {
  const user = await GetUser();

  return (
    <DashboardPage
      title="Dashboard"
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
  );
};

export default Dashboard;
