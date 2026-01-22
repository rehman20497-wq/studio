'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import MagneticButton from '@/components/magnetic-button';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const buttonContainerVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: 'spring',
            damping: 15,
            stiffness: 80,
            delay: 0.5,
        }
    }
}

export default function GetStartedCta() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      ref={ref}
      className="relative mx-[4%] h-56 bg-gradient-to-b from-[#d9f5cb] to-[#cdf0bd] rounded-b-3xl overflow-hidden flex items-center justify-center"
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="stretch" className="w-full h-full">
            <path d="M0,100 C240,10 480,0 720,0 S1200,10 1440,100 V100 H0 Z" fill="#FCFBF8" />
        </svg>
      </div>

      <div className="relative z-10">
        <motion.div variants={buttonContainerVariants}>
            <MagneticButton>
                <span className="text-[15px] font-bold px-5">Get Started</span>
            </MagneticButton>
        </motion.div>
      </div>
    </motion.section>
  );
}
