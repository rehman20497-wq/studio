
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import SurgeProtectContent from "./surge-protect-content";

export default function SurgeProtectSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="relative bg-[#fff9e6] py-16">
      <motion.div
        className={cn(
          "relative overflow-hidden"
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
        <svg
          className="absolute top-0 left-0 w-full h-24"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C50,100 50,100 100,0 Z" fill="#fff9e6" />
        </svg>
        
        <div className="py-[10%] pt-[20%] md:py-[10%]">
        <Image
  src="/surge.png"
  alt="Surge Protect Scale"
  width={800}
  height={80}
  className="
  mx-auto 
  h-[75px] 
  mt-6 
  md:mt-0 
  md:h-[130px] 
  w-auto
"

/>


            <SurgeProtectContent />
        </div>
        
        <svg
          className="absolute bottom-0 left-0 w-full h-24"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M0,100 C40,0 60,0 100,100 Z" fill="#fff9e6" />
        </svg>
      </motion.div>
    </section>
  );
}
