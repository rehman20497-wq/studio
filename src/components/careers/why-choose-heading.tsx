'use client';

import { motion } from 'framer-motion';

export default function WhyChooseHeading({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      className="relative flex justify-center py-8"
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
    >
      <svg
        className="w-full max-w-4xl"
        viewBox="0 0 1200 40"
        preserveAspectRatio="xMidYMid meet"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Safe upward curve */}
          <path
            id="curve"
            d="M 200 160 C 450 40, 750 40, 1000 160"
          />
        </defs>

        <text
          fill="currentColor"
          className="font-raleway font-normal tracking-tight text-zinc-900"
          style={{ fontSize: '84px' }}
        >
          <textPath
            href="#curve"
            startOffset="50%"
            textAnchor="middle"
          >
            Why Choose Telesys
          </textPath>
        </text>
      </svg>
    </motion.div>
  );
}
