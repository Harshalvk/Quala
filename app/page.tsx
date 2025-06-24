import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl font-semibold">Quala</h1>
      <div className="flex flex-col gap-4">
        <Link
          href={"/sign-in"}
          className={buttonVariants({ variant: "secondary" })}
        >
          Sign In
        </Link>
        <Link
          href={"/dashboard"}
          className={buttonVariants({ variant: "secondary" })}
        >
          Dashboard
        </Link>
        <Link
          href={"/pricing"}
          className={buttonVariants({ variant: "secondary" })}
        >
          Pricing
        </Link>
      </div>
    </div>
  );
}
