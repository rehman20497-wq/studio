'use client';

import { motion } from 'framer-motion';

const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const letter = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const text = 'TELSYS';

export default function PageTransition() {
  return (
    <motion.div
      className="fixed inset-0 bg-zinc-900 origin-bottom z-[80] flex flex-col items-center justify-center"
      initial={{ scaleY: 1 }}
      animate={{ scaleY: 0 }}
      transition={{
        delay: 2.4,
        duration: 1.5,
        ease: [0.85, 0, 0.15, 1],
      }}
    >
      <motion.h1
        className="font-headline text-8xl md:text-9xl font-bold text-white flex overflow-hidden tracking-[0.2em]"
        variants={sentence}
        initial="hidden"
        animate="visible"
      >
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            variants={letter}
            className="inline-block"
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>
    </motion.div>
  );
}
