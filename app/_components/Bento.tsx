"use client";

import Image from "next/image";
import React from "react";
import { motion } from "motion/react";

const Bento = () => {
  return (
    <section className="">
      <motion.h1
        initial={{ y: -10, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration:  1}}
        viewport={{ once: true, amount: 1 }}
        className="text-center text-3xl md:text-4xl lg:text-5xl tracking-tight"
      >
        How our platform <br /> makes your workflow easy
      </motion.h1>
      <div className="space-y-3 mt-10">
        <div className="w-full h-full grid grid-cols-3 gap-3">
          <div className="h-64 col-span-2 bg-gradient-to-tr from-pink-900 to-white/10 rounded-2xl outline backdrop-blur-lg relative overflow-hidden w-full inset-shadow-sm group">
            <Image
              src={"/saas.png"}
              alt="SaaS Screen Shot"
              width={1000}
              height={1000}
              className="rounded-xl shadow-lg outline absolute inset-x-16 top-7 group-hover:-translate-y-1 transition-transform"
            />
            <div className="absolute z-0 bg-black/30 backdrop-blur-[0.5px] inset-0 [mask-image:linear-gradient(to_top,black_50%,transparent)]" />
            <div className="absolute -bottom-1 z-0 backdrop-blur-3xl inset-x-0 inset-y-32 [mask-image:linear-gradient(to_top,black_50%,transparent)]" />

            <div className="rounded-lg absolute inset-0 inset-shadow-sm inset-shadow-zinc-600 z-100" />
            <div className="absolute bottom-3 text-center px-9 w-full mx-auto">
              <h1 className="text-white/80 text-lg">Sign in and begin</h1>
              <p className="text-sm text-white/70 italic">
                Set up fast and fine-tune Quala to deliver alerts the way your
                business needs them.
              </p>
            </div>
          </div>
          <div className="h-64 col-span-1 bg-gradient-to-tr from-pink-900 to-white/15 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-3 z-10 text-center px-1">
              <h1 className="text-white/80 text-lg">Pay once, use forever</h1>
              <p className="text-sm text-muted-foreground italic text-shadow-2xs">
                Lifetime access to Quala — no renewals, no hidden fees.
              </p>
            </div>
            <div className="absolute -bottom-1 z-10 backdrop-blur-[1px] inset-x-0 inset-y-32 [mask-image:linear-gradient(to_top,black_50%,transparent)]" />
            <div className="rounded-lg absolute inset-0 inset-shadow-sm inset-shadow-zinc-600 z-100" />
            <Image
              src={"/payment.png"}
              alt="SaaS Screen Shot"
              width={500}
              height={500}
              className="rounded-xl shadow-lg outline absolute -right-11 bottom-2 md:-right-24 md:-bottom-16 group-hover:-translate-x-1 z-0 transition-transform scale-150"
            />
          </div>
        </div>
        <div className="w-full grid grid-cols-3 gap-3">
          <div className="h-64 col-span-1 bg-gradient-to-tl from-pink-900 to-white/15 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-3 z-10 text-center px-1">
              <h1 className="text-white/80 text-lg">
                Integrate in minutes, not hours
              </h1>
              <p className="text-sm text-muted-foreground italic text-shadow-2xs">
                Quala fits effortlessly into your existing tools and workflows.
              </p>
            </div>
            <div className="absolute -bottom-1 z-10 backdrop-blur-[1px] inset-x-0 inset-y-32 [mask-image:linear-gradient(to_top,black_50%,transparent)]" />
            <div className="rounded-lg absolute inset-0 inset-shadow-sm inset-shadow-zinc-600 z-100" />
          </div>
          <div className="h-64 col-span-2 bg-muted-foreground/20 rounded-2xl bg-gradient-to-tl from-pink-900 to-white/15 relative overflow-hidden group"></div>
        </div>
      </div>
    </section>
  );
};

export default Bento;
