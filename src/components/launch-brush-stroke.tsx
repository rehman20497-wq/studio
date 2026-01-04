"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function LaunchBrushStroke() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <div className="relative w-full overflow-hidden bg-white">
      <svg
        ref={ref}
        viewBox="0 0 100 160"
        preserveAspectRatio="none"
        className="w-full h-[110px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="
            M -300 80
            C 200 30,
              600 120,
              900 90,
              1200 40,
              1740 80
          "
          stroke="#FAD7CF"
          strokeWidth="140"
          strokeLinecap="round"
          initial={{
            pathLength: 0,
            opacity: 0,
          }}
          animate={
            isInView
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{
            pathLength: {
              duration: 3.2,               // 👈 slower
              ease: "easeInOut",            // 👈 smoother
            },
            opacity: {
              duration: 0.6,
              ease: "easeOut",
            },
          }}
        />
      </svg>
    </div>
  );
}
