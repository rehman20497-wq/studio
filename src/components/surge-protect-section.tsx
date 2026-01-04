
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function SurgeProtectSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="relative bg-[#FEF9F2] py-12">
      <div
        ref={ref}
        className="relative container mx-auto rounded-3xl overflow-hidden p-16"
        style={{
          background:
            "linear-gradient(98deg, #D6F5FE 8.35%, #D8D6FE 25.43%, #FED6F1 49.33%, #FEFDD6 69.83%, #D6FEF0 91.43%)",
          backgroundSize: "200% 200%",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-24 bg-[#FEF9F2]">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path d="M0,100 C40,0 60,0 100,100 Z" fill="hsl(var(--background))" />
          </svg>
        </div>

        {/* Content will go here in the next step */}
        <div className="h-96">{/* Placeholder for content */}</div>
        
        <div className="absolute bottom-0 left-0 w-full h-24 bg-[#FEF9F2]">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path d="M0,0 C40,100 60,100 100,0 Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </div>
    </section>
  );
}
