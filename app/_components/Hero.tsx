"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const Hero = () => {
  const [scope, animate] = useAnimate();

  const router = useRouter();

  const { data: session } = authClient.useSession();

  const startAnimating = () => {
    animate(
      "#hero",
      {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
      },
      {
        delay: stagger(0.1, { startDelay: 0.2 }),
        duration: 0.3,
        ease: "easeInOut",
      }
    );
  };

  useEffect(() => {
    startAnimating();
  }, []);

  return (
    <section
      ref={scope}
      className="w-full mt-28 mb-20 flex flex-col items-center gap-3"
    >
      <motion.h1
        initial={{
          y: -12,
          opacity: 0,
          filter: "blur(10px)",
        }}
        animate={{
          y: 0,
          opacity: 100,
          filter: "blur(0px)",
        }}
        transition={{
          duration: 1,
        }}
        className="text-center text-4xl md:text-5xl lg:text-6xl tracking-tight"
        id="hero"
      >
        <p>Enhance Every Moment</p>
        <p>with Thoughtful Notifications</p>
      </motion.h1>
      <motion.p
        initial={{
          y: -12,
          opacity: 0,
          filter: "blur(10px)",
        }}
        id="hero"
        className="text-xs md:text-sm italic text-center w-3/4"
      >
        With Quala, alerts are no longer interruptions. They’re enhancements —
        subtle, timely, and perfectly in tune with your day.
      </motion.p>
      <motion.span
        initial={{
          y: -12,
          opacity: 0,
          filter: "blur(10px)",
        }}
        id="hero"
      >
        <Button
          onClick={() => {
            if (session?.user) {
              router.push("/dashboard");
            } else {
              router.push("/sign-in");
            }
          }}
          className="rounded-full group inline-flex items-center gap-1 transition-all duration-300"
        >
          Get Started
          <span className="relative w-5 h-5 inline-flex overflow-hidden">
            <ChevronRight className="absolute inset-0 transition-all duration-300 opacity-100 group-hover:opacity-0 translate-x-0 group-hover:translate-x-1 top-0.5" />
            <ArrowRight className="absolute inset-0 transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 top-0.5" />
          </span>
        </Button>
      </motion.span>

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          ease: "easeInOut",
        }}
        id="hero"
        className="bg-gradient-to-t from-gray-200 via-pink-900 rounded-b-3xl to-transparent p-10 w-full h-56 sm:h-64 md:h-[400px] relative overflow-hidden"
      >
        <div className="absolute inset-x-5 rounded-xl p-2 bg-white/10 backdrop-blur-lg outline">
          <Image
            src={"/saas.png"}
            alt="SaaS Screen Shot"
            width={1000}
            height={1000}
            className="w-full h-full rounded-lg outline"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
