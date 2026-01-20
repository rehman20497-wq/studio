"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const pathVariants = {
  hidden: { pathLength: 0 },
  visible: { 
    pathLength: 1,
  }
};

export default function ClosingBrushStrokes() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  // Path for right-to-left animation (top stroke)
  const topStrokeD = "M1440 40 C 960 10, 480 70, 0 40";
  // Path for left-to-right animation (bottom stroke)
  const bottomStrokeD = "M0 170 C 480 200, 960 140, 1440 170";

  return (
    <motion.div 
        ref={ref}
        className="bg-[#FCFBF8] py-16"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
    >
       <svg viewBox="0 0 1440 210" preserveAspectRatio="none" className="w-full h-auto" fill="none">
            <motion.path
                d={topStrokeD}
                stroke="#B9E2E8" // Light Blue
                strokeWidth="80"
                strokeLinecap="round"
                variants={pathVariants}
                transition={{ duration: 2.5, ease: [0.42, 0, 0.58, 1], delay: 0 }}
            />
            <motion.path
                d={bottomStrokeD}
                stroke="#38A7B3" // Dark Teal
                strokeWidth="80"
                strokeLinecap="round"
                variants={pathVariants}
                transition={{ duration: 2.5, ease: [0.42, 0, 0.58, 1], delay: 0.3 }}
            />
       </svg>
    </motion.div>
  );
}
