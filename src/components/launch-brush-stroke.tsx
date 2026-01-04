"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const BrushStroke = ({
  d,
  duration = 1.5,
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
      className="w-full h-[40px] md:h-[80px]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d={d}
        stroke="#FFD9CF"
        strokeWidth="80"
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
  return (
    <div className="relative my-12">
      <BrushStroke
        d="M -20 20
C 520 36, 720 54, 1220 20
S 1960 96, 1900 90

"
      />
    </div>
  );
}
