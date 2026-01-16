"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import MagneticButton from "@/components/magnetic-button";
import TestimonialCarousel from "@/components/testimonial-carousel";

export default function RightColumn() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className="flex flex-col h-full justify-center py-[7%] px-4 md:px-0">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h2 className="text-[23px] font-medium relative inline-block pb-2">
          Outsourcing+
          <motion.svg
            className="absolute bottom-0 left-0 w-full h-auto overflow-visible"
            height="8"
            viewBox="0 0 100 8"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M 2,4 C 20,1 80,1 98,4"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
            />
          </motion.svg>
        </h2>
        <h1 className="text-[72px] font-normal mt-4 leading-[72.5px] text-black">
          Built to make
          <br />
          you better.
        </h1>
        <p className="mt-6 text-[20px] max-w-md text-black leading-[28.7px]">
          We're not traditional outsourcers. We build world-class teams—from
          customer support to AI data solutions—helping you scale faster and
          smarter.
        </p>
      </motion.div>

      <div className="mt-8">
        <MagneticButton>
          <span className="text-[15px] font-medium">Build your Dream Team</span>
        </MagneticButton>
      </div>

      <div className="mt-8">
        <TestimonialCarousel />
      </div>
    </div>
  );
}
