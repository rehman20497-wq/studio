'use client';

import { motion } from 'framer-motion';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700'],
});

const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.18,
    },
  },
};

const letter = {
  hidden: { opacity: 0, y: 80 },
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
      className="fixed inset-0 bg-[#F5D34A] origin-top z-[80] flex flex-col items-center justify-center"
      initial={{ scaleY: 1, y: 0 }}
      animate={{ scaleY: 0, y: -40 }} // ⬅ continuous roll
      transition={{
        delay: 2.4,
        duration: 3,
        ease: [0.45, 0, 0.15, 1], // smooth heavy gravity curve
      }}
    >
      {/* Copyright */}
      <div className="mb-6 text-black/70 text-sm tracking-widest">
        © {new Date().getFullYear()} TELSYS
      </div>

      {/* Brand Text */}
      <motion.h1
        className={`${playfair.className} text-8xl md:text-9xl font-bold text-black flex overflow-hidden tracking-[0.15em]`}
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
