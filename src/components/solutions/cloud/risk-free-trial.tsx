'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import MagneticButton from '@/components/magnetic-button';
import Image from 'next/image';
import Link from "next/link";

/* ------------------ Animations ------------------ */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.25, 1, 0.5, 1] },
  },
};

// Continuous rotation
const rotateContinuous = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// Smooth draw / float
const smoothDraw = {
  animate: {
    scale: [1, 1.15, 1],
    rotate: [0, 5, -5, 0],
    y: [0, -6, 0, 6, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Float only
const floatOnly = {
  animate: {
    y: [0, -8, 0, 8, 0],
    rotate: [0, 2, -2, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/* ------------------ Section ------------------ */

export default function RiskFreeTrial() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.section
      ref={ref}
      className="relative bg-[#a2edf4] py-28 px-4 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {/* Background Stripes */}
      <div className="absolute inset-0 flex">
        <div className="flex-1 bg-[#a2edf4]" />
        <div className="flex-1 bg-[#baf2f7]" />
        <div className="flex-1 bg-[#c9f5fa]" />
        <div className="flex-1 bg-[#daf9fd]" />
        <div className="flex-1 bg-[#ecfdff]" />
      </div>

      {/* Top Wave */}
      <div className="absolute top-0 left-0 w-full h-24 pointer-events-none">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M0,80 C120,60 240,100 360,90 480,80 600,40 720,50 840,60 960,110 1080,100 1200,90 1320,60 1440,70 L1440,0 L0,0 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full h-24 pointer-events-none">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M0,40 C120,60 240,20 360,30 480,40 600,80 720,70 840,60 960,10 1080,20 1200,30 1320,60 1440,50 L1440,120 L0,120 Z"
            fill="#FCFBF8"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.h2 className="text-black leading-[0.95]" variants={itemVariants}>
          <span className="block text-heroSm sm:text-heroMd lg:text-hero font-normal mb-[1%]">
            30 days
          </span>

          <span className="relative inline-block text-heroSm sm:text-heroMd lg:text-hero font-bold">
            Risk - Free
            <motion.svg
              className="absolute -bottom-2 left-0 w-full"
              height="10"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1, transition: { delay: 1, duration: 0.8 } }}
            >
              <path
                d="M2 5 C 20 2, 80 2, 98 5"
                stroke="black"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
            </motion.svg>
          </span>
        </motion.h2>

        <motion.p
          className="mt-8 text-bodySm sm:text-bodyMd lg:text-bodylg text-black"
          variants={itemVariants}
        >
          We're so confident you'll love working with Telsys, we offer a no commitment 30 day trial.
        </motion.p>

        {/* Button + Icons */}
        <motion.div
          className="mt-12 relative mx-auto flex justify-center items-center"
          variants={itemVariants}
        >
          {/* Stable icon anchor wrapper */}
          <div className="relative w-[360px] h-[140px] flex justify-center items-center">

            {/* Auto-sized button */}
            <Link href="/contact">
          <MagneticButton>
            <span className="text-button font-medium">
              Talk With Experts
            </span>
          </MagneticButton>
        </Link>

            {/* x.png */}
            <motion.div
              variants={rotateContinuous}
              initial="initial"
              animate="animate"
              className="absolute -top-0 -left-6"
            >
              <Image src="/x.png" alt="x" width={40} height={40} />
            </motion.div>

            {/* d.png */}
            <motion.div
              initial={{ scaleX: -1, rotateZ: 45 }}
              animate={smoothDraw.animate}
              className="absolute -top-0 -right-6"
            >
              <Image src="/d.png" alt="d" width={40} height={40} />
            </motion.div>

            {/* g.png */}
            <motion.div
              animate={smoothDraw.animate}
              className="absolute -bottom-3 -left-2"
            >
              <Image src="/g.png" alt="g" width={40} height={40} />
            </motion.div>

            {/* c.png */}
            <motion.div
              variants={rotateContinuous}
              initial="initial"
              animate="animate"
              className="absolute -bottom-8 -right-6"
            >
              <Image src="/c.png" alt="c" width={40} height={40} />
            </motion.div>

          </div>
        </motion.div>
      </div>

      {/* Floating GIFs */}
      <motion.div variants={floatOnly} animate="animate" className="absolute top-[25%] left-[10%] hidden md:block">
        <Image src="/sm.gif" alt="Smiley" width={80} height={80} />
      </motion.div>

      <motion.div variants={floatOnly} animate="animate" className="absolute top-[30%] right-[12%] hidden md:block">
        <Image src="/s1.gif" alt="Smiley" width={80} height={80} />
      </motion.div>
    </motion.section>
  );
}
