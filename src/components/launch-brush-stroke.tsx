
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function LaunchBrushStroke() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const pathVariants = {
    hidden: { pathLength: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      transition: {
        duration: 2,
        ease: [0.42, 0, 0.58, 1],
        delay: i * 0.2,
      },
    }),
  };

  return (
    <div ref={ref} className="w-full">
      <svg
        viewBox="0 0 1440 94"
        preserveAspectRatio="none"
        className="w-full h-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M1440 63.3218C1273.33 86.6551 936.4 117.155 0 2V94H1440V63.3218Z"
          fill="#FDECEC"
          variants={pathVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
        />
        <motion.path
          d="M-4 61C194 85.8333 806.8 117.5 1444 2V61H-4Z"
          fill="#FFEAE3"
          variants={pathVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={1}
        />
      </svg>
    </div>
  );
}
