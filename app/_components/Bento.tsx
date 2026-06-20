"use client";

import Image from "next/image";
import React from "react";
import { motion } from "motion/react";
import { Zap, ShieldCheck } from "lucide-react";

const Bento = () => {
  return (
    <section>
      <motion.h1
        initial={{ y: -10, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 1 }}
        viewport={{ once: true, amount: 1 }}
        className="text-center text-3xl md:text-4xl lg:text-5xl tracking-tight"
      >
        How our platform <br /> makes your workflow easy
      </motion.h1>

      <div className="space-y-3 mt-10">
        {/* Row 1 */}
        <div className="w-full grid grid-cols-3 gap-3">
          {/* Box 1: Sign in (image) */}
          <div className="h-64 col-span-2 bg-zinc-100 dark:bg-neutral-950 rounded-2xl border border-zinc-200 dark:border-white/10 relative overflow-hidden group transition-colors duration-300">
            <div className="absolute -top-20 -left-20 size-72 bg-pink-300/30 dark:bg-pink-700/30 rounded-full blur-3xl transition-colors duration-300" />
            <Image
              src="/saas.png"
              alt="SaaS Screen Shot"
              width={1000}
              height={1000}
              className="rounded-xl shadow-lg outline outline-zinc-300 dark:outline-white/10 absolute inset-x-16 top-7 group-hover:-translate-y-1 transition-transform duration-300"
            />
            <div className="absolute inset-0 z-[1] bg-white/20 dark:bg-black/40 backdrop-blur-[0.5px] [mask-image:linear-gradient(to_top,black_50%,transparent)] transition-colors duration-300" />
            <div className="absolute inset-x-0 inset-y-32 -bottom-1 z-[1] backdrop-blur-3xl [mask-image:linear-gradient(to_top,black_50%,transparent)]" />
            <div className="absolute bottom-3 z-[3] w-full mx-auto text-center px-9">
              <h1 className="text-white/90 text-lg transition-colors duration-300">
                Sign in and begin
              </h1>
              <p className="text-sm text-white italic transition-colors duration-300">
                Set up fast and fine-tune Quala to deliver alerts the way your
                business needs them.
              </p>
            </div>
          </div>

          {/* Box 2: Pay once (image) */}
          <div className="h-64 col-span-1 bg-zinc-100 dark:bg-neutral-950 rounded-2xl border border-zinc-200 dark:border-white/10 relative overflow-hidden group transition-colors duration-300">
            <div className="absolute -top-16 -right-16 size-56 bg-pink-300/30 dark:bg-pink-700/30 rounded-full blur-3xl transition-colors duration-300" />
            <div className="absolute top-3 z-[3] w-full text-center px-3">
              <h1 className="text-zinc-900 dark:text-white/90 text-lg transition-colors duration-300">
                Pay once, use forever
              </h1>
              <p className="text-sm text-zinc-500 dark:text-white/60 italic transition-colors duration-300">
                Lifetime access to Quala — no renewals, no hidden fees.
              </p>
            </div>
            <div className="absolute inset-x-0 inset-y-32 -bottom-1 z-[1] bg-white/20 dark:bg-black/30 backdrop-blur-[1px] [mask-image:linear-gradient(to_top,black_50%,transparent)] transition-colors duration-300" />
            <Image
              src="/payment.png"
              alt="Payment Screen Shot"
              width={500}
              height={500}
              className="rounded-xl shadow-lg outline outline-zinc-300 dark:outline-white/10 absolute -right-11 bottom-2 md:-right-24 md:-bottom-16 scale-150 z-0 group-hover:-translate-x-1 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="w-full grid grid-cols-3 gap-3">
          {/* Box 3: Integrate (icon) */}
          <div className="h-64 col-span-1 bg-zinc-100 dark:bg-neutral-950 rounded-2xl border border-zinc-200 dark:border-white/10 relative overflow-hidden group flex flex-col items-center justify-center text-center px-4 transition-colors duration-300">
            <div className="absolute -bottom-20 -left-10 size-56 bg-pink-300/30 dark:bg-pink-700/25 rounded-full blur-3xl transition-colors duration-300" />
            <div className="z-[3] flex flex-col items-center">
              <Zap className="size-7 text-zinc-700 dark:text-white/80 mb-3 group-hover:scale-110 transition-transform duration-300" />
              <h1 className="text-zinc-900 dark:text-white/90 text-lg transition-colors duration-300">
                Integrate in minutes, not hours
              </h1>
              <p className="text-sm text-zinc-500 dark:text-white/60 italic transition-colors duration-300">
                Quala fits effortlessly into your existing tools and workflows.
              </p>
            </div>
          </div>

          {/* Box 4: Security (icon) */}
          <div className="h-64 col-span-2 bg-zinc-100 dark:bg-neutral-950 rounded-2xl border border-zinc-200 dark:border-white/10 relative overflow-hidden group flex flex-col items-center justify-center text-center px-8 transition-colors duration-300">
            <div className="absolute -bottom-24 -right-10 size-72 bg-pink-300/30 dark:bg-pink-700/25 rounded-full blur-3xl transition-colors duration-300" />
            <div className="z-[3] flex flex-col items-center">
              <ShieldCheck className="size-7 text-zinc-700 dark:text-white/80 mb-3 group-hover:scale-110 transition-transform duration-300" />
              <h1 className="text-zinc-900 dark:text-white/90 text-lg transition-colors duration-300">
                Enterprise-grade security, by default
              </h1>
              <p className="text-sm text-zinc-500 dark:text-white/60 italic max-w-md mx-auto transition-colors duration-300">
                Your data is encrypted end-to-end and never shared. Quala meets
                the bar your compliance team expects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bento;
