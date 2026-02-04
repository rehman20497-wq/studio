'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { HardDrive, Satellite, Search } from 'lucide-react';
import Header from '@/components/layout/header';
import MagneticButton from '@/components/magnetic-button';
import Image from 'next/image';

// Floating item animation
const floatVariant = {
  animate: (i: number) => ({
    y: [0, Math.sin(i) * 10, 0],
    x: [0, Math.cos(i) * 8, 0],
    transition: {
      duration: 4 + Math.random() * 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  }),
};

// Character animation
const robotVariants = {
  initial: { y: 20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 1,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

// Text animations
const textContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 1 },
  },
};

const textItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

export default function NotFound() {
  return (
    <div className="bg-[#FCFBF8] min-h-screen">
      <Header />
      <main className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden px-4">
        {/* Decorative floating elements */}
        <motion.div custom={1} variants={floatVariant} animate="animate" className="absolute top-[20%] left-[15%] text-zinc-300">
          <HardDrive size={48} />
        </motion.div>
        <motion.div custom={2} variants={floatVariant} animate="animate" className="absolute top-[50%] right-[10%] text-zinc-300">
          <Satellite size={64} />
        </motion.div>
        <motion.div custom={3} variants={floatVariant} animate="animate" className="absolute bottom-[15%] left-[25%] text-zinc-300">
          <Search size={32} />
        </motion.div>

        <motion.div
          className="relative z-10 text-center flex flex-col items-center"
          variants={textContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Animated Robot Character */}
          <motion.div
            variants={robotVariants}
            className="mb-8 p-4 bg-yellow-100/50 border-4 border-yellow-200 rounded-full"
          >
            <motion.div
              animate={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Image src="/robot.gif" alt="Lost Robot" width={120} height={120} unoptimized />
            </motion.div>
          </motion.div>

          <motion.h1 className="text-8xl font-bold font-headline text-black" variants={textItem}>
            404
          </motion.h1>

          <motion.h2 className="text-3xl font-semibold text-zinc-800 mt-2" variants={textItem}>
            Page Lost in Cyberspace
          </motion.h2>

          <motion.p className="max-w-md mt-4 text-zinc-600" variants={textItem}>
            It seems the page you are looking for has ventured into the unknown. Our little robot is on the case, but it might be a while.
          </motion.p>

          <motion.div className="mt-12" variants={textItem}>
            <Link href="/">
              <MagneticButton>
                <span className="text-button font-semibold px-4">Return to Home Base</span>
              </MagneticButton>
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
