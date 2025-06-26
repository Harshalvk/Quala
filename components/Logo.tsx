import Image from "next/image";
import React from "react";

const Logo = ({ width, height }: { width?: number; height?: number }) => {
  return (
    <div className="w-full flex items-center gap-1 select-none">
      <Image
        src={"/logo.png"}
        alt="logo"
        width={width || 100}
        height={height || 100}
        className="size-8 dark:invert"
      />
      <p className="text-3xl font-semibold tracking-tight">
        Quala
      </p>
    </div>
  );
};

export default Logo;
