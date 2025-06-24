"use client";

import GetUserPlan from "@/actions/getUserPlan";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import { Check, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const PaymentSuccessModal = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [isOpen, setIsOpen] = useState(true);

  if (!session) {
    return <div>Session not found. Please Login</div>;
  }

  const user = session.user;

  const { data, isPending } = useQuery({
    queryKey: ["user-plan"],
    queryFn: async () => GetUserPlan(user.id),
    refetchInterval: (query) => {
      return query.state.data?.plan === "PRO" ? false : 1000;
    },
  });

  const handleClose = () => {
    setIsOpen(false);
    router.push("/dashboard");
  };

  const isPaymentSuccessfull = data?.plan === "PRO";

  return (
    <Modal
      showModal={isOpen}
      setShowModal={setIsOpen}
      onClose={handleClose}
      className="px-6 pt-6"
      preventDefaultClose={!isPaymentSuccessfull}
    >
      <div className="flex flex-col items-center">
        {isPending || !isPaymentSuccessfull ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Loader className="mb-4 animate-spin transition-transform" />
            <p className="text-lg/7 font-medium text-gray-900">
              Upgrading your account...
            </p>
            <p className="text-muted-foreground text-sm/6 mt-2 text-center text-pretty">
              Please wait while we process your request. This may take a moment.
            </p>
          </div>
        ) : (
          <>
            <div className="relative aspect-video border w-full overflow-hidden rounded-lg">
              <p>Thank you for upgrading</p>
            </div>
            <div className="mt-6 flex flex-col items-center gap-1 text-center">
              <p className="text-lg/7 text-pretty tracking-tight font-medium">
                Upgrade successfull!
              </p>
            </div>
            <div className="mt-8 w-full">
              <Button onClick={handleClose} className="w-full">
                <Check />
                Go to Dashboard
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default PaymentSuccessModal;
