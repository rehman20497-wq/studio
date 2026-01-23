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
        stroke="#e64628"
        strokeWidth="70"
        strokeLinecap="round"
        variants={pathVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      />
    </svg>
  );
};

export default function YellowBrushStrokesss() {
  return (
    <div className="relative mt-[0px] py-0" style={{ background: "linear-gradient(to bottom, #ffffff 50%, #fff9e6 50%)" }}>
       <BrushStroke 
          d="M-20 50 C 320 20, 1120 80, 1460 50"
          duration={2.5}
        />
    </div>
  );
}
