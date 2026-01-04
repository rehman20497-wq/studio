
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function SurgeProtectSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const listItems = [
    "Holiday Seasons",
    "Seasons of the year",
    "Tax Season",
    "Crisis Management",
    "Sporting Events",
    "Brand Campaigns",
    "Back to School",
    "Weather Events and more!",
  ];

  return (
    <section className="relative bg-[#FEF9F2] py-12">
      <div
        ref={ref}
        className="relative container mx-auto rounded-3xl overflow-hidden p-16"
        style={{
          background:
            "linear-gradient(98deg, #D6F5FE 8.35%, #D8D6FE 25.43%, #FED6F1 49.33%, #FEFDD6 69.83%, #D6FEF0 91.43%)",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-24 bg-[#FEF9F2]">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path d="M0,100 C40,0 60,0 100,100 Z" fill="hsl(var(--background))" />
          </svg>
        </div>

        <motion.div
          className="relative z-10 grid md:grid-cols-2 gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="flex flex-col gap-8">
            <motion.div variants={itemVariants}>
              <Image
                src="/surge.png"
                alt="SurgeProtect Logo"
                width={400}
                height={100}
                className="object-contain"
              />
            </motion.div>
            <motion.p
              className="text-zinc-700 text-lg max-w-md"
              variants={itemVariants}
            >
              From expected surges and urgent projects to unexpected demands,
              we've got your back. Access elite talent instantly, scale down
              seamlessly.
            </motion.p>
            <motion.div variants={itemVariants}>
              <button className="bg-black text-white font-semibold py-3 px-6 rounded-full hover:bg-zinc-800 transition-colors">
                Speak to an expert
              </button>
            </motion.div>
          </div>

          <motion.div
            className="bg-white/70 p-8 rounded-2xl shadow-lg border border-white/50"
            variants={itemVariants}
          >
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <ul className="space-y-3">
                {listItems.slice(0, 4).map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-black rounded-full"></span>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <ul className="space-y-3">
                {listItems.slice(4).map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-black rounded-full"></span>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 w-full h-24 bg-[#FEF9F2]">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path d="M0,0 C40,100 60,100 100,0 Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </div>
    </section>
  );
}
