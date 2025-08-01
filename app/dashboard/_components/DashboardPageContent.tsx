"use client";

import GetEventCategoires from "@/actions/getEventCategories";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowRight,
  BarChart2,
  Clock,
  Database,
  Loader2,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import DeleteCategory from "@/actions/deleteCategory";
import DashboardEmptyState from "./DashboardEmptyState";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardPageContent = () => {
  const [deletingCategory, setDeletingCategory] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: categories, isPending: isEventCategoriesLoading } = useQuery({
    queryKey: ["user-event-categories"],
    queryFn: async () => {
      const res = await GetEventCategoires();
      return res.categories;
    },
  });

  const { mutate: deleteCategory, isPending: isDeletingCategory } = useMutation(
    {
      mutationFn: async (name: string) => {
        await DeleteCategory(name);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user-event-categories"] });
        setDeletingCategory(null);
      },
    }
  );

  if (isEventCategoriesLoading) {
    return (
      <div className="h-full w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="w-full h-60" />
        <Skeleton className="w-full h-60" />
        <Skeleton className="w-full h-60" />
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return <DashboardEmptyState />;
  }

  return (
    <>
      <ul className="grid max-w-6xl grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {categories?.map((category) => (
          <li
            key={category.id}
            className="relative group z-10 hover:-translate-y-0.5 border rounded-lg shadow-sm transition-all duration-300 group-hover:shadow-md ring-1 ring-black/5 dark:ring-white/10 dark:bg-gradient-to-br dark:from-transparent dark:to-zinc-900/50"
          >
            <div className="absolute z-0 inset-px rounded-lg" />

            <div className="relative p-6 z-10 overflow-hidden rounded-lg">
              <div className="absolute top-0 -right-14 -rotate-12 grayscale opacity-20 text-9xl">
                {category.emoji}
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="size-12 rounded-full"
                  style={{
                    backgroundColor: category.color
                      ? `#${category.color.toString(16).padStart(6, "0")}`
                      : "#f3f4f6",
                  }}
                />
                <div>
                  <h3 className="text-lg/7 font-medium tracking-tight">
                    {category.name}
                  </h3>
                  <p className="text-sm/6 text-gray-600">
                    {format(category.createdAt, "MMM d, yyyy")}
                  </p>
                </div>
              </div>
              <div className="space-y-3 bottom-6">
                <div className="flex items-center text-sm/5 text-gray-600">
                  <Clock className="size-4 mr-2" />
                  <span className="font-medium">Last Ping:</span>
                  <span className="ml-1">
                    {category.lastPing
                      ? formatDistanceToNow(category.lastPing) + " ago"
                      : "Never"}
                  </span>
                </div>
                <div className="flex items-center text-sm/5 text-gray-600">
                  <Database className="size-4 mr-2" />
                  <span className="font-medium">Unique Fields:</span>
                  <span className="ml-1">{category.uniqueFieldCount || 0}</span>
                </div>
                <div className="flex items-center text-sm/5 text-gray-600">
                  <BarChart2 className="size-4 mr-2" />
                  <span className="font-medium">Events this month:</span>
                  <span className="ml-1">{category.eventsCount || 0}</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <Link
                  href={`/dashboard/category/${category.name}`}
                  className={buttonVariants({
                    variant: "outline",
                    size: "sm",
                    className: "flex items-center gap-2 text-sm group/btn",
                  })}
                >
                  View all{" "}
                  <ArrowRight className="size-4 -translate-x-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  className="text-gray-500 hover:text-red-600 transition-colors"
                  aria-label={`Delete ${category.name} category`}
                  onClick={() => setDeletingCategory(category.name)}
                >
                  <Trash2 />
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Modal
        showModal={!!deletingCategory}
        setShowModal={() => setDeletingCategory(null)}
        className="max-w-md p-8"
      >
        <div className="space-y-6">
          <div>
            <h2 className="text-lg/7 font-medium tracking-tight">
              Delete Category
            </h2>
            <p className="text-sm/6">
              Are you sure you want to delete the category "{deletingCategory}"?
              This action cannot be undone.
            </p>
          </div>
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button
              variant={"outline"}
              onClick={() => setDeletingCategory(null)}
            >
              Cancle
            </Button>
            <Button
              disabled={isDeletingCategory}
              variant={"destructive"}
              onClick={() =>
                deletingCategory && deleteCategory(deletingCategory)
              }
            >
              {isDeletingCategory ? (
                <>
                  <Loader2 className="animate-spin transition-transform size-4" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DashboardPageContent;
