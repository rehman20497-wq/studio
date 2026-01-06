
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const BrushStroke = ({ d, duration = 2, delay = 0 }: { d: string; duration?: number; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const pathVariants = {
    hidden: { pathLength: 0 },
    visible: { 
      pathLength: 1,
      transition: { duration, ease: [0.42, 0, 0.58, 1], delay }
    }
  };

  return (
    <svg
      ref={ref}
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      className="w-full h-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d={d}
        stroke="#F5D34A"
        strokeWidth="40"
        strokeLinecap="round"
        variants={pathVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      />
    </svg>
  );
};

export default function YellowBrushStroke() {
  return (
    <div className="relative my-12">
       <BrushStroke 
          d="M-20 50 C 280 40, 1160 60, 1460 50"
          duration={2.5}
        />
    </div>
  );
}
