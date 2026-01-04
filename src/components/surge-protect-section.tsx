"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export default function SurgeProtectSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="relative bg-white">
      {/* Top curve */}
      <div className="absolute top-0 left-0 w-full h-24 bg-white">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C50,100 50,100 100,0 Z" fill="white" />
        </svg>
      </div>

      <motion.div
        className={cn(
          "relative overflow-hidden p-16"
        )}
        style={{
          background:
            "linear-gradient(98deg, #D6F5FE 8.35%, #D8D6FE 25.43%, #FED6F1 49.33%, #FEFDD6 69.83%, #D6FEF0 91.43%)",
          backgroundSize: "200% 200%",
        }}
        initial={{ clipPath: "circle(0% at 50% 50%)" }}
        animate={{
            clipPath: isInView ? "circle(150% at 50% 50%)" : "circle(0% at 50% 50%)",
            backgroundPosition: isInView ? ['0% 50%', '100% 50%', '0% 50%'] : '0% 50%',
        }}
        transition={{ 
            clipPath: { duration: 2, ease: "easeInOut" },
            backgroundPosition: {
                duration: 15,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
            }
        }}
      >
        <div className="h-96" />
      </motion.div>
      
      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-white">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M0,100 C40,0 60,0 100,100 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
