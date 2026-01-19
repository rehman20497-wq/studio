'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import MagneticButton from '@/components/magnetic-button';
import { cn } from '@/lib/utils';


/* ---------------- MAIN ---------------- */

export default function CustomerSupportSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-[#FFF8E6]"
    >
      {/* Curved Top */}
      <div className="absolute top-0 left-0 w-full h-[120px]">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M0,0 H1440 V120 C1200,50 960,20 720,20 C480,20 240,50 0,120 Z"
            fill="#FCFBF8"
          />
        </svg>
      </div>

      <div className="relative pt-36 pb-32 text-center px-4">
        {/* Floating visuals */}
        <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
            className="absolute top-1/2 -translate-y-1/2 left-4 md:left-[10%] w-24 md:w-48 h-auto hidden md:block"
        >
            <Image src="/left.png" alt="Decorative element" width={200} height={400} />
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
            className="absolute top-1/2 -translate-y-1/2 right-4 md:right-[10%] w-24 md:w-48 h-auto hidden md:block"
        >
            <Image src="/right.png" alt="Decorative element" width={200} height={400} />
        </motion.div>


        {/* Content */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-[23px] font-normal mb-4"
        >
          What You Get
          <motion.svg
            className="w-40 h-2 mx-auto"
            viewBox="0 0 160 8"
          >
            <motion.path
                d="M 2,4 C 30,0 80,6 158,3"
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 2.5, ease: 'easeInOut', delay: 0.3 }}
            />
          </motion.svg>
        </motion.h3>

        <motion.div
          className="relative h-20 w-full max-w-lg mx-auto mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
        >
            <Image src="/customer.svg" alt="Customer Support" layout="fill" objectFit="contain" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="max-w-xl mx-auto text-[20px] text-zinc-700"
        >
          Your dedicated team is fully committed to delivering exceptional omnichannel customer support.
          That’s why 95% of our clients trust us within the first 3 months.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="mt-10"
        >
          <MagneticButton>
            <span className="px-6 font-semibold">Take Hugo for a spin</span>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
