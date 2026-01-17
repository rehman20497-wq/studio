"use client";

import { motion } from "framer-motion";
import Image from "next/image";

/* =======================
   Arrow animation (approach → pulse → fade)
======================= */
const arrowRight = {
  animate: {
    x: [0, 34, 34],
    scale: [1, 1.15, 1],
    opacity: [0, 1, 0],
    transition: {
      duration: 4.2,
      times: [0, 0.65, 1],
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

const arrowLeft = {
  animate: {
    x: [0, -34, -34],
    scale: [1, 1.15, 1],
    opacity: [0, 1, 0],
    transition: {
      duration: 4.2,
      times: [0, 0.65, 1],
      ease: "easeInOut",
      repeat: Infinity,
      delay: 0.9,
    },
  },
};

/* =======================
   Subtle heartbeat (lines & dots)
======================= */
const beat = {
  animate: {
    scale: [1, 1.18, 1],
    opacity: [0.6, 1, 0.6],
    transition: {
      duration: 2.6,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

const Stroke = ({ className, delay, children }) => (
  <motion.div
    className={`absolute ${className}`}
    variants={beat}
    animate="animate"
    transition={{ delay }}
  >
    {children}
  </motion.div>
);

/* =======================
   Component
======================= */
export default function AnimatedButton() {
  return (
    <div className="relative w-full h-12 flex items-center justify-center bg-[#fff9e6]">
      <div className="relative">

        {/* LEFT ARROW */}
        <motion.div
          className="absolute -left-24 top-[46%]"
          variants={arrowRight}
          animate="animate"
        >
          <Image src="/arrow-right.png" alt="Arrow" width={26} height={26} />
        </motion.div>

        {/* RIGHT ARROW */}
        <motion.div
          className="absolute -right-24 top-[46%]"
          variants={arrowLeft}
          animate="animate"
        >
          <Image
            src="/arrow-right.png"
            alt="Arrow"
            width={26}
            height={26}
            className="scale-x-[-1]"
          />
        </motion.div>

        {/* =======================
            STROKES / DOTS (TOP)
        ======================= */}
        <Stroke className="-top-10 left-10 rotate-[-20deg]" delay={0}>
          <svg width="32" height="14">
            <path d="M2 7 H30" stroke="black" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </Stroke>

        <Stroke className="-top-6 right-12 rotate-[25deg]" delay={0.7}>
          <svg width="22" height="12">
            <path d="M2 6 H20" stroke="black" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </Stroke>

        <Stroke className="-top-3 left-1/2 -translate-x-1/2" delay={1.2}>
          <svg width="6" height="6">
            <circle cx="3" cy="3" r="3" fill="black" />
          </svg>
        </Stroke>

        {/* =======================
            STROKES / DOTS (SIDES)
        ======================= */}
        <Stroke className="top-1/2 -left-10 rotate-[15deg]" delay={0.4}>
          <svg width="18" height="12">
            <path d="M2 6 H16" stroke="black" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </Stroke>

        <Stroke className="top-1/2 -right-10 rotate-[-15deg]" delay={0.9}>
          <svg width="18" height="12">
            <path d="M2 6 H16" stroke="black" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </Stroke>

        {/* =======================
            STROKES / DOTS (BOTTOM)
        ======================= */}
        <Stroke className="-bottom-10 right-10 rotate-[-25deg]" delay={0.3}>
          <svg width="32" height="14">
            <path d="M2 7 H30" stroke="black" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </Stroke>

        <Stroke className="-bottom-6 left-12 rotate-[20deg]" delay={1}>
          <svg width="22" height="12">
            <path d="M2 6 H20" stroke="black" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </Stroke>

        <Stroke className="-bottom-3 left-1/2 -translate-x-1/2" delay={1.4}>
          <svg width="6" height="6">
            <circle cx="3" cy="3" r="3" fill="black" />
          </svg>
        </Stroke>

        {/* =======================
            BUTTON
        ======================= */}
        <button
          className="
            bg-black
            text-white
            font-semibold
            text-lg
            py-4 px-10
            rounded-full
            shadow-xl
            transition-all
            duration-300
            hover:text-yellow-400
            hover:bg-zinc-800
          "
        >
          Book a Meeting
        </button>

      </div>
    </div>
  );
}
