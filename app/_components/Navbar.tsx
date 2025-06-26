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
import { Menu } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

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
      initial={{
        borderColor: "rgba(255,255,255,0)",
        backgroundColor: "rgba(255,255,255,0)",
        y: -10,
        opacity: 0,
      }}
      animate={{
        borderColor: scrolled ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0)",
        backgroundColor: scrolled
          ? "rgba(255,255,255,0.05)"
          : "rgba(255,255,255,0)",
        backdropFilter: scrolled ? "blur(10px)" : "blur(0px)",
        y: 0,
        opacity: 1,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "w-full sticky top-2 z-50 rounded-lg border p-3",
        "flex items-center justify-between"
      )}
    >
      <h1 className="text-white font-semibold">Quala</h1>

      <ul className="hidden md:flex gap-4 text-white/80 text-sm">
        <li className="hover:underline underline-offset-2 hover:text-pink-900 transition-colors cursor-pointer duration-300">
          Home
        </li>
        <li className="hover:underline underline-offset-2 hover:text-pink-900 transition-colors cursor-pointer duration-300">
          Pricing
        </li>
      </ul>

      <div className="flex items-center gap-2">
        <Button
          onClick={() => {
            if (session?.user) {
              router.push("/dashboard");
            } else {
              router.push("/sign-in");
            }
          }}
          variant={"outline"}
          size={"sm"}
          className="rounded-full"
        >
          {session?.user ? "Dashboard" : "Sign in"}
        </Button>
        <Menu
          className="md:hidden text-white cursor-pointer"
          onClick={() => {
            setMobileMenuOpen(!mobileMenuOpen);
          }}
        />
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full right-3 mt-2 w-40 bg-background border border-white/10 rounded-md p-3 text-sm text-white/80 backdrop-blur-md flex flex-col space-y-2 md:hidden"
          >
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">Pricing</li>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
