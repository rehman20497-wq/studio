
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export default function SurgeProtectSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="relative">
      {/* Top curve */}
      <div className="absolute top-0 left-0 w-full h-24 bg-white">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M0,100 C40,0 60,0 100,100 Z" fill="white" />
        </svg>
      </div>

      <div
        className={cn(
          "relative rounded-3xl overflow-hidden p-16 animate-gradient-pan"
        )}
        style={{
          background:
            "linear-gradient(98deg, #D6F5FE 8.35%, #D8D6FE 25.43%, #FED6F1 49.33%, #FEFDD6 69.83%, #D6FEF0 91.43%)",
          backgroundSize: "200% 200%",
        }}
      >
        <div className="h-96" />
      </div>
      
      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-white">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C40,100 60,100 100,0 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
