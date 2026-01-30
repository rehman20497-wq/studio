"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import MagneticButton from "@/components/magnetic-button";
import TestimonialCarousel from "@/components/testimonial-carousel";

export default function RightColumn() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="flex flex-col h-full justify-center py-[7%] px-4 md:px-0">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
      >
        <h2 className="text-eyebrowSm
  sm:text-eyebrowMd
  lg:text-eyebrow
  font-medium relative inline-block pb-2 text-black">
          Technology+
          <motion.svg
            className="absolute bottom-0 left-0 w-full h-auto overflow-visible"
            height="8"
            viewBox="0 0 100 8"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M 2,4 C 20,1 80,1 98,4"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
            />
          </motion.svg>
        </h2>
        <motion.h1 
          className="mt-4
  font-normal
  text-herSm
  sm:text-herMd
  lg:text-her leading-tight text-black"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
        >
          Where Vision Meets
          <br />
          Modern Technology
        </motion.h1>
        <motion.p 
          className="mt-6
  max-w-md
  text-bodySm
  sm:text-bodyMd
  lg:text-bodylg  max-w-md text-black leading-relaxed"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.6 }}
        >
          We’re more than technology partners. We connect cloud,
security, communication, and AI expertise—helping
businesses innovate faster and grow smarter
        </motion.p>
      </motion.div>

      <motion.div 
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.8 }}
      >
        <MagneticButton>
          <span className="text-button font-medium ">Connect With Experts</span>
        </MagneticButton>
      </motion.div>

      <motion.div 
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut", delay: 1 }}
      >
        <TestimonialCarousel />
      </motion.div>
    </div>
  );
}
