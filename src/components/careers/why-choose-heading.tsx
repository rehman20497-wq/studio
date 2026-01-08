'use client';

import { motion } from 'framer-motion';

const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

export default function WhyChooseHeading({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      className="relative text-center"
      variants={headingVariants}
    >
      <svg
        viewBox="0 0 400 60"
        className="w-full max-w-lg mx-auto h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <path
            id="curve"
            d="M 20 50 C 100 0, 300 0, 380 50"
          />
        </defs>
        <text className="text-5xl font-headline font-medium text-zinc-900" fill="currentColor">
          <textPath href="#curve" startOffset="50%" textAnchor="middle">
            Why Choose Telesys
          </textPath>
        </text>
      </svg>
      <div className="absolute bottom-[2px] left-1/2 -translate-x-1/2 w-[160px]">
        <svg viewBox="0 0 160 10" className="w-full h-auto" preserveAspectRatio='none'>
          <motion.path
            d="M 5 5 C 40 10, 120 10, 155 5"
            stroke="black"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ delay: 1, duration: 0.8, ease: 'easeOut' }}
          />
        </svg>
      </div>
    </motion.div>
  );
}