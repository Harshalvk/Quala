"use client";

import GetUsage from "@/actions/getUsage";
import StripeCreateCheckoutSession from "@/actions/stripeCreateCheckoutSession";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { BarChart } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const UpgradePageContent = ({ user }: { user: User }) => {
  const router = useRouter();

  const { data: usageData, isPending } = useQuery({
    queryKey: ["usage"],
    queryFn: async () => {
      if (!user) return null;
      return await GetUsage(user.id ?? "");
    },
  });

  const { mutate: createCheckoutSession } = useMutation({
    mutationFn: StripeCreateCheckoutSession,
    onSuccess: ({ url }) => {
      if (url) router.push(url);
    },
  });

  return (
    <div className="max-w-3xl flex flex-col gap-8">
      <div>
        <h1 className="mt-2 text-xl/8 font-medium tracking-tight">
          {user.plan === "PRO" ? "Plan: Pro" : "Plan: Free"}
        </h1>
        <p className="text-sm/6 max-w-prose">
          {user.plan === "PRO"
            ? "Thank you for supporting Quala. Find your increased usage limits below."
            : "Get access to more events, categories and premium support."}
        </p>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
        {isPending &&
          [...Array(2)].map((_, index) => (
            <Skeleton key={index} className="w-full h-36 rounded-xl" />
          ))}
      </div>

      {usageData && (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
          <Card className="border-2 w-full">
            <CardHeader className="flex w-full justify-between">
              <p className="text-md/6 font-medium">Total Events</p>
              <BarChart className="size-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div>
                <p className="text-2xl font-bold">
                  {usageData.eventsUsed || 0} of{" "}
                  {usageData.eventsLimit.toLocaleString() || 100}
                </p>
                <p className="text-xs/5 text-muted-foreground">
                  Events this period
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 w-full">
            <CardHeader className="flex w-full justify-between">
              <p className="text-md/6 font-medium">Event Categories</p>
              <BarChart className="size-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div>
                <p className="text-2xl font-bold">
                  {usageData.categoriesUsed || 0} of{" "}
                  {usageData.categoriesLimit.toLocaleString() || 100}
                </p>
                <p className="text-xs/5 text-muted-foreground">
                  Events this period
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <p className="text-sm text-muted-foreground flex">
        Usage will reset{" "}
        {usageData?.resetDate ? (
          format(usageData.resetDate, "MMM d, yyyy")
        ) : (
          <span className="w-24 h-4 inline bg-muted-foreground animate-pulse ml-1 rounded-lg" />
        )}
        {user.plan !== "PRO" ? (
          <span
            onClick={() => createCheckoutSession()}
            className="inline underline text-yellow-900 cursor-pointer ml-1"
          >
            or upgrade now to increase your limit &rarr;
          </span>
        ) : null}
      </p>
    </div>
  );
};

export default UpgradePageContent;
