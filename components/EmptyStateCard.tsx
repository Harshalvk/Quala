import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  contentClassName?: string;
}

const EmptyStateCard = ({
  className,
  contentClassName,
  children,
  ...props
}: CardProps) => {
  return (
    <div className={cn("relative rounded-lg", className)} {...props}>
      <div className={cn("relative z-10 p-6", contentClassName)}>
        {children}
      </div>
      <div className="absolute z-0 inset-px rounded-lg" />
      <div className="pointer-events-none z-0 absolute inset-px rounded-lg shadow-sm right-1 ring-black" />
    </div>
  );
};

export default EmptyStateCard;
