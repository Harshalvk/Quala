import React from "react";
import { Button } from "./ui/button";
import { ArrowLeft, Heading } from "lucide-react";
import ModeToggle from "./ModeToggle";

interface DashboardPageProps {
  title: string;
  children?: React.ReactNode;
  hideBackButton?: boolean;
  cta?: React.ReactNode;
}

const DashboardPage = ({
  title,
  children,
  cta,
  hideBackButton,
}: DashboardPageProps) => {
  return (
    <section className="flex-1 h-screen w-full flex flex-col">
      <div className="w-full p-6 sm:p-8 flex justify-between border-b">
        <div className="w-full flex flex-col sm:flex-row items-start gap-y-5 gap-x-5">
          <div className="flex gap-3 items-center">
            {hideBackButton ? null : (
              <Button variant={"outline"}>
                <ArrowLeft />
              </Button>
            )}
            <h1 className="text-2xl md:text-3xl font-semibold font-sans">
              {title}
            </h1>
          </div>
          {cta ? <div className="w-full">{cta}</div> : null}
        </div>
        <ModeToggle />
      </div>
      <div className="flex-1 p-6 sm:p-8 flex flex-col overflow-y-auto h-full w-full">
        {children}
      </div>
    </section>
  );
};

export default DashboardPage;
