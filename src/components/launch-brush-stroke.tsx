"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const BrushStroke = ({
  d,
  duration = 2,
  delay = 0,
}: {
  d: string;
  duration?: number;
  delay?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <svg
      ref={ref}
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className="w-full h-[60px] md:h-[120px]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d={d}
        stroke="#fed9d2"
        strokeWidth="60"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : {}}
        transition={{
          duration,
          ease: [0.42, 0, 0.58, 1],
          delay,
        }}
      />
    </svg>
  );
};

export default function LaunchBrushStroke() {
  const wavePath = `
    M -20 40
    C 480 0, 960 80, 1440 40
  `;

  return (
    <div
      className="relative mb-12 py-4"
      style={{
        background: "linear-gradient(to bottom, #ffffff 50%, #fff9e6 50%)",
      }}
    >
      <BrushStroke d={wavePath} duration={2} />
    </div>
  );
}
