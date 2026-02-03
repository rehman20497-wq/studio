
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import MagneticButton from '@/components/magnetic-button';
import Link from "next/link";
import Image from 'next/image';

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

export default function RiskFreeTrialss() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.section
      ref={ref}
      className="relative py-36 px-4 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {/* ================= GREEN WAVY BACKGROUND ================= */}

     {/* Vertical Purple Layers */}
<div className="absolute inset-0 flex">
  <div className="flex-[1] bg-[#e9ddff]" />
  <div className="flex-[1.3] bg-[#d8bfff]" />
  <div className="flex-[2.5] bg-[#c597fe]" />   {/* main brand color */}
  <div className="flex-[1.5] bg-[#d2b4ff]" />
  <div className="flex-[1] bg-[#efe6ff]" />
</div>



      {/* Top Organic Wave */}
      <div className="absolute top-0 left-0 w-full h-32 pointer-events-none z-10">
        <svg viewBox="0 0 1440 140" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M0,80 C120,40 240,120 360,100 480,80 600,40 720,60 840,80 960,120 1080,100 1200,80 1320,40 1440,60 L1440,0 L0,0 Z"
            fill="#FCFBF8"
          />
        </svg>
      </div>

      {/* Bottom Organic Wave */}
      <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none z-10">
        <svg viewBox="0 0 1440 140" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M0,40 C120,80 240,20 360,40 480,60 600,100 720,80 840,60 960,20 1080,40 1200,60 1320,100 1440,80 L1440,140 L0,140 Z"
            fill="#FCFBF8"
          />
        </svg>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-20 max-w-2xl mx-auto text-center">
        <motion.h2 className="text-black leading-[0.95]" variants={itemVariants}>
          <span className="block text-heroSm
  sm:text-heroMd
  lg:text-hero font-normal mb-[1%]">
            30 days
          </span>

          <span className="relative inline-block text-heroSm
  sm:text-heroMd
  lg:text-hero font-bold">
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

        <motion.p className="mt-8 text-bodySm
  sm:text-bodyMd
  lg:text-bodylg  text-black" variants={itemVariants}>
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
       
      {/* Floating Gifs */}
      <motion.div variants={floatOnly} animate="animate" className="absolute top-[28%] left-[8%] hidden md:block z-20">
        <Image src="/sm.gif" alt="Smiley" width={80} height={80} />
      </motion.div>

      <motion.div variants={floatOnly} animate="animate" className="absolute top-[30%] right-[10%] hidden md:block z-20">
        <Image src="/s1.gif" alt="Smiley" width={80} height={80} />
      </motion.div>
    </motion.section>
  );
}
