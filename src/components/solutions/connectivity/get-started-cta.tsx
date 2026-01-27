
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import MagneticButton from '@/components/magnetic-button';

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const buttonContainerVariants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 14,
      stiffness: 120,
      delay: 0.4,
    },
  },
};

export default function GetStartedCta() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.section
      ref={ref}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="relative mx-[4%] h-[260px] overflow-hidden rounded-b-[60px] flex items-start justify-center
      bg-gradient-to-b from-[#fed9d2] via-[#fed9d2] to-[#fbc4ba]"
    >
      {/* Curved bottom shape */}
      <div className="absolute bottom-0 left-0 w-full h-[160px] pointer-events-none">
        <svg
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M0,200 
               C240,60 480,20 720,20 
               C960,20 1200,60 1440,200 
               L1440,220 L0,220 Z"
            fill="#FCFBF8"
          />
        </svg>
      </div>

      {/* Button */}
      <div className="relative z-10 mt-10">
        <motion.div variants={buttonContainerVariants}>
          <MagneticButton>
            <span className="text-[14px] font-semibold px-6 py-2">
            Talk to an Expert
            </span>
          </MagneticButton>
        </motion.div>
      </div>
    </motion.section>
  );
}
