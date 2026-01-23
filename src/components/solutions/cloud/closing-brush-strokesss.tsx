"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const pathVariants = {
  hidden: { pathLength: 0 },
  visible: { pathLength: 1 }
};

export default function ClosingBrushStrokesss() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const topStrokeD = "M1440 40 C 960 10, 480 70, 0 40";
  const bottomStrokeD = "M0 115 C 480 145, 960 85, 1440 115";

  return (
    <motion.div
      ref={ref}
      className="p-0 m-0"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <svg
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
        className="w-full h-auto block"
        fill="none"
      >
        {/* Top background */}
        <rect x="0" y="0" width="1440" height="180" fill="#fff9e6" />

        {/* White area below the top curve */}
        <path
          d="M0 40 C 480 70, 960 10, 1440 40 L1440 180 L0 180 Z"
          fill="#ffffff"
        />

        {/* Animated strokes */}
        <motion.path
          d={topStrokeD}
          stroke="#cda9f9"
          strokeWidth="55"
          strokeLinecap="round"
          variants={pathVariants}
          transition={{ duration: 2.5, ease: [0.42, 0, 0.58, 1] }}
        />

        <motion.path
          d={bottomStrokeD}
          stroke="#9a4afc"
          strokeWidth="55"
          strokeLinecap="round"
          variants={pathVariants}
          transition={{ duration: 2.5, ease: [0.42, 0, 0.58, 1], delay: 0.3 }}
        />
      </svg>
    </motion.div>
  );
}
