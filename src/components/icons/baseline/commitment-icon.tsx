
'use client';

import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const rectVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const circleVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut', delay: 0.4 },
  },
};

const lineVariants = (delay: number) => ({
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.4, ease: [0.6, 0.01, -0.05, 0.95], delay },
    },
});

export const CommitmentIcon = () => (
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
    <motion.rect
      x="12"
      y="24"
      width="44"
      height="40"
      rx="6"
      stroke="#A855F7"
      strokeWidth="4"
      variants={rectVariants}
    />
    <motion.circle
      cx="56"
      cy="32"
      r="12"
      fill="white"
      stroke="black"
      strokeWidth="4"
      variants={circleVariants}
    />
     <motion.g>
        <motion.path
            d="M 22 36 H 44"
            stroke="black"
            strokeWidth="3"
            strokeLinecap="round"
            variants={lineVariants(0.8)}
            style={{ transformOrigin: 'left' }}
        />
        <motion.path
            d="M 22 44 H 38"
            stroke="black"
            strokeWidth="3"
            strokeLinecap="round"
            variants={lineVariants(1)}
            style={{ transformOrigin: 'left' }}
        />
         <motion.path
            d="M 22 52 H 32"
            stroke="black"
            strokeWidth="3"
            strokeLinecap="round"
            variants={lineVariants(1.2)}
            style={{ transformOrigin: 'left' }}
        />
    </motion.g>
  </motion.svg>
);
