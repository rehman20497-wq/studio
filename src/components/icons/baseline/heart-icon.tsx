
'use client';

import { motion } from 'framer-motion';

const heartVariants = (delay: number, y: number) => ({
  hidden: { pathLength: 0, opacity: 0, y: y },
  visible: {
    pathLength: 1,
    opacity: 1,
    y: 0,
    transition: {
      pathLength: { duration: 1, ease: 'easeOut', delay },
      opacity: { duration: 0.1, delay },
      y: { type: 'spring', damping: 10, stiffness: 100, delay },
    },
  },
});

export const HeartIcon = () => (
  <motion.svg
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.8 }}
    className="w-24 h-24"
  >
    <g>
      <motion.path
        d="M48 30C54.6274 30 60 35.3726 60 42C60 51.3333 48 58 48 58C48 58 36 51.3333 36 42C36 35.3726 41.3726 30 48 30Z"
        stroke="black"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={heartVariants(0.2, 10)}
      />
      <motion.path
        d="M32 40C38.6274 40 44 45.3726 44 52C44 61.3333 32 68 32 68C32 68 20 61.3333 20 52C20 45.3726 25.3726 40 32 40Z"
        stroke="#4ADE80"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={heartVariants(0.5, 20)}
      />
    </g>
  </motion.svg>
);
