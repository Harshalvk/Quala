import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { HTMLAttributes } from "react";

interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  width?: number;
  height?: number;
}

const Logo = ({ width, height, className, ...props }: LogoProps) => {
  return (
    <div
      className={cn("w-full flex items-center gap-1 select-none", className)}
      {...props}
    >
      <Image
        src={"/logo.png"}
        alt="logo"
        width={width || 100}
        height={height || 100}
        className="size-8 dark:invert"
      />
      <p className="text-3xl font-semibold tracking-tight">Quala</p>
    </div>
  );
};

export default Logo;
