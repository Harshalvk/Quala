"use client";

import PollCategory from "@/actions/pollCategory";
import EmptyStateCard from "@/components/EmptyStateCard";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const EmptyCategoryState = ({ categoryName }: { categoryName: string }) => {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["category", categoryName, "hasEvents"],
    queryFn: async () => {
      return await PollCategory({ name: categoryName });
    },
    refetchInterval(query) {
      return query.state.data?.hasEvents ? false : 1000;
    },
  });

  const hasEvents = data?.hasEvents;

  useEffect(() => {
    if (hasEvents) router.refresh();
  }, [hasEvents, router]);

  const codeSnippet = `await fetch("http://localhost:3000/api/v1/events", {
  method: "POST",
  body: JSON.stringify({
    category: "${categoryName}",
    fields: {
      plan: "PRO",
      email: "harshal@gmail.com",
      amount: 49.00
    }
  }),
  headers: {
    Authorization: "Bearer <YOUR_API_KEY>"
  }
})`;

  return (
    <EmptyStateCard
      contentClassName="max-w-2xl w-full flex flex-col items-center p-6"
      className="flex-1 flex items-center justify-center"
    >
      <h2 className="text-xl/8 font-medium text-center tracking-tight">
        Create your first {categoryName} event
      </h2>
      <p className="text-sm/6 mb-8 max-w-md text-center text-pretty">
        Get started by sending a request to our tracking API:
      </p>

      <div className="w-full max-w-3xl rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-800 px-4 py-2 flex justify-between items-center">
          <div className="flex space-x-2">
            <div className="size-3 rounded-full bg-red-500" />
            <div className="size-3 rounded-full bg-yellow-500" />
            <div className="size-3 rounded-full bg-green-500" />
          </div>
          <span className="text-muted-foreground text-sm">
            your-first-event.js
          </span>
        </div>
        <SyntaxHighlighter
          language="javascript"
          style={oneDark}
          customStyle={{
            borderRadius: "0px",
            margin: 0,
            padding: "1rem",
            fontSize: "0.875rem",
            lineHeight: "1.5",
          }}
        >
          {codeSnippet}
        </SyntaxHighlighter>
      </div>

      <div className="mt-8 flex flex-col items-center space-x-2">
        <div className="flex items-center gap-2">
          <div className="size-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-muted-foreground ">
            Listening to incoming events...
          </span>
        </div>
        <p className="text-sm/6 text-muted-foreground mt-2">
          Need help? Check out our{" "}
          <a
            href="#"
            className="text-blue-600 hover:underline underli{ne-offset-2"
          >
            documentation
          </a>{" "}
          or{" "}
          <a
            href="#"
            className="text-blue-600 hover:underline underli{ne-offset-2"
          >
            contact support
          </a>
        </p>
      </div>
    </EmptyStateCard>
  );
};

export default EmptyCategoryState;
