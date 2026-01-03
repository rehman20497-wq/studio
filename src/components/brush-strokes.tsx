"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const BrushStroke = ({ d, from, duration = 2, delay = 0 }: { d: string; from: "left" | "right", duration?: number, delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const pathVariants = {
    hidden: { pathLength: 0, pathOffset: from === "left" ? 0 : 1 },
    visible: { 
      pathLength: 1, 
      pathOffset: from === "left" ? 0 : 0,
      transition: { duration, ease: [0.42, 0, 0.58, 1], delay }
    }
  };

  return (
    <svg
      ref={ref}
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className="w-full h-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d={d}
        strokeWidth="80"
        variants={pathVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      />
    </svg>
  );
};

export default function BrushStrokes() {
  return (
    <div className="relative my-12 space-y-4">
       <div className="stroke-[#D4EDCC]">
        <BrushStroke 
          d="M-20 40 C 280 10, 1160 10, 1460 40"
          from="right"
          duration={1.5}
        />
       </div>
       <div className="stroke-[#C0E7F9]">
        <BrushStroke 
          d="M-20 40 C 280 70, 1160 70, 1460 40"
          from="left"
          duration={1.5}
          delay={0.3}
        />
       </div>
    </div>
  );
}
