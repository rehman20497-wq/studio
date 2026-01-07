
'use client';

import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const circleVariants = {
  hidden: { pathLength: 0 },
  visible: {
    pathLength: 1,
    transition: { duration: 0.8, ease: 'easeOut', delay: 0.2 },
  },
};

const handleVariants = {
  hidden: { pathLength: 0 },
  visible: {
    pathLength: 1,
    transition: { duration: 0.6, ease: 'easeOut', delay: 1 },
  },
};

const lineVariants = (delay: number) => ({
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.4, ease: [0.6, 0.01, -0.05, 0.95], delay },
  },
});

export const MagnifyingGlassIcon = () => (
  <motion.svg
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.8 }}
    variants={containerVariants}
    className="w-24 h-24"
  >
    <g transform="rotate(-30 40 40)">
      <motion.circle
        cx="34"
        cy="34"
        r="18"
        stroke="#F87171"
        strokeWidth="4"
        variants={circleVariants}
      />
      <motion.path
        d="M48 48 L64 64"
        stroke="#F87171"
        strokeWidth="4"
        strokeLinecap="round"
        variants={handleVariants}
      />
      <motion.g transform="translate(4, 4)">
        <motion.path
          d="M24 26 H 44"
          stroke="black"
          strokeWidth="3"
          strokeLinecap="round"
          variants={lineVariants(1.4)}
          style={{ transformOrigin: 'left' }}
        />
        <motion.path
          d="M24 34 H 44"
          stroke="black"
          strokeWidth="3"
          strokeLinecap="round"
          variants={lineVariants(1.6)}
          style={{ transformOrigin: 'left' }}
        />
        <motion.path
          d="M24 42 H 44"
          stroke="black"
          strokeWidth="3"
          strokeLinecap="round"
          variants={lineVariants(1.8)}
          style={{ transformOrigin: 'left' }}
        />
      </motion.g>
    </g>
  </motion.svg>
);
