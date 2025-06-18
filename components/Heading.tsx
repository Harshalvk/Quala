import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
}

const Heading = ({ children, className, ...props }: HeadingProps) => {
  return (
    <h1
      className={cn(
        "text-2xl md:text-3xl font-semibold font-sans tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
};

export default Heading;
