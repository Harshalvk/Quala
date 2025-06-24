"use client";

import StripeCreateCheckoutSession from "@/actions/stripeCreateCheckoutSession";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { User } from "better-auth";
import { useRouter } from "next/navigation";
import React from "react";

const PricingPageContent = ({ user }: { user: User | null }) => {
  const router = useRouter();

  const INCLUDE_FEATURES = [
    "10.000 real-time events pre month",
    "10 event categories",
    "Advanced analytics and insights",
    "Priority support",
  ];

  const { mutate: createCheckoutSession } = useMutation({
    mutationFn: StripeCreateCheckoutSession,
    onSuccess: ({ url }) => {
      if (url) router.push(url);
    },
  });

  const handleGetAccess = () => {
    if (user) {
      createCheckoutSession();
    } else {
      router.push("/sign-in?intent=upgrade");
    }
  };
  return (
    <div>
      Pricing
      <Button onClick={handleGetAccess}>Get Quala</Button>
    </div>
  );
};

export default PricingPageContent;
