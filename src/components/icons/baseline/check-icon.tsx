
'use client';

import { motion } from 'framer-motion';

const circleVariants = {
  hidden: { pathLength: 0 },
  visible: {
    pathLength: 1,
    transition: { duration: 0.8, ease: 'easeOut', delay: 0.2 },
  },
};

const checkVariants = {
  hidden: { pathLength: 0 },
  visible: {
    pathLength: 1,
    transition: { duration: 0.5, ease: 'easeOut', delay: 1 },
  },
};

const lineVariants = (delay: number) => ({
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.4, ease: [0.6, 0.01, -0.05, 0.95], delay },
  },
});

export const CheckIcon = () => (
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
    <motion.g>
      <motion.path
        d="M 25 32 L 65 32"
        stroke="black"
        strokeWidth="4"
        strokeLinecap="round"
        variants={lineVariants(1.5)}
        style={{ transformOrigin: 'center' }}
      />
      <motion.path
        d="M 15 48 L 55 48"
        stroke="black"
        strokeWidth="4"
        strokeLinecap="round"
        variants={lineVariants(1.7)}
        style={{ transformOrigin: 'center' }}
      />
      <motion.circle
        cx="40"
        cy="40"
        r="28"
        stroke="black"
        strokeWidth="4"
        variants={circleVariants}
      />
      <motion.path
        d="M30 40 L38 48 L52 34"
        stroke="#34D399"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={checkVariants}
      />
    </motion.g>
  </motion.svg>
);
