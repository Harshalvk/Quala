"use client";

import InsertQuickstartCategories from "@/actions/insertQuickstartCategories";
import CreateEventCategoryModal from "@/components/CreateEventCategoryModal";
import EmptyStateCard from "@/components/EmptyStateCard";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

const DashboardEmptyState = () => {
  const queryClient = useQueryClient();

  const { mutate: insertQuickstartCategories, isPending } = useMutation({
    mutationFn: async () => {
      await InsertQuickstartCategories();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-event-categories"],
      });
    },
  });

  return (
    <EmptyStateCard className="flex flex-col items-center justify-center rounded-2xl flex-1 text-center p-6">
      <div className="flex flex-col justify-center w-full">
        <h1 className="text-xl/8 font-medium tracking-tight">
          No Event Categoreis Yet
        </h1>
        <p className="text-sm/6 max-w-prose mt-2 mb-8">
          Start tracking events by creating your first category
        </p>
      </div>
      <div className="space-y-4 sm:space-x-4 w-full">
        <Button
          variant={"outline"}
          className="flex items-center space-x-2 w-full"
          onClick={() => insertQuickstartCategories()}
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Quickstart"}
        </Button>

        <CreateEventCategoryModal containerClassName="w-full">
          <Button className="flex items-center space-x-2 w-full">
            Add Category
          </Button>
        </CreateEventCategoryModal>
      </div>
    </EmptyStateCard>
  );
};

export default DashboardEmptyState;
