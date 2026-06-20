"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import ModeToggle from "@/components/ModeToggle";

const Navbar = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const router = useRouter();
  const { data: session } = authClient.useSession();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 10);
  });

  return (
    <motion.nav
      initial={{ y: -10, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "w-full sticky top-2 z-50 rounded-lg border p-3",
        "flex items-center justify-between",
        scrolled
          ? "bg-white/80 dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-700 backdrop-blur-md shadow-sm"
          : "bg-transparent border-transparent",
      )}
    >
      <h1 className="font-semibold text-zinc-900 dark:text-zinc-100">Quala</h1>

      <ul className="hidden md:flex gap-4 text-sm">
        <li className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline underline-offset-2 transition-colors cursor-pointer duration-300">
          Home
        </li>
        <li className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline underline-offset-2 transition-colors cursor-pointer duration-300">
          Pricing
        </li>
      </ul>

      <div className="flex items-center gap-2">
        <ModeToggle />
        <Button
          onClick={() => {
            if (session?.user) {
              router.push("/dashboard");
            } else {
              router.push("/sign-in");
            }
          }}
          variant="outline"
          size="sm"
          className="rounded-full border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          {session?.user ? "Dashboard" : "Sign in"}
        </Button>
        <button
          className="md:hidden p-1 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-3 mt-2 w-48 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg p-3 text-sm shadow-lg flex flex-col space-y-1 md:hidden"
          >
            <li className="px-3 py-2 rounded-md text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer transition-colors">
              Home
            </li>
            <li className="px-3 py-2 rounded-md text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer transition-colors">
              Pricing
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
