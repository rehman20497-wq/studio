'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import MagneticButton from '@/components/magnetic-button';
import Link from "next/link";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const contentContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5,
    }
  }
}

const textItemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1]
    }
  }
}

const imageContainerVariants = {
  hidden: { opacity: 0, x: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.25, 1, 0.5, 1],
      delay: 0.8
    }
  }
}

/* ------------------ FIXED CIRCLE PATTERN ------------------ */
const CirclePattern = () => {
  return (
    <div className="absolute inset-0 z-0">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="circlePatternComms"
            patternUnits="userSpaceOnUse"
            width="75"
            height="75"
          >
            <circle 
              cx="37.5" 
              cy="37.5" 
              r="37.5" 
              fill="none" 
              stroke="#c597fe" 
              strokeWidth="8"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circlePatternComms)" />
      </svg>
    </div>
  )
}

export default function FeaturedGuideSections() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.section 
      ref={ref}
      className="
        relative bg-[#c597fe] 
        py-[7%] md:py-[15%] 
        px-[4%]
      "
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >

      {/* ================= DESKTOP ONLY CURVES ================= */}
      
      {/* Top Curve (md and up only) */}
      <div className="hidden md:block absolute top-0 left-0 w-full h-[150px] text-white pointer-events-none z-10">
        <svg viewBox="0 0 1440 150" preserveAspectRatio="none" className="w-full h-full">
          <motion.path 
            d="M0,150 C240,60 480,0 720,0 C960,0 1200,60 1440,150 L1440,0 L0,0 Z" 
            fill="currentColor"
            initial={{ y: -150 }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </svg>
      </div>

      {/* Bottom Curve (md and up only) */}
      <div className="hidden md:block absolute bottom-0 left-0 w-full h-[190px] text-white pointer-events-none z-10">
        <svg viewBox="0 0 1440 140" preserveAspectRatio="none" className="w-full h-full">
          <motion.path 
            d="M0,100 C480,20 960,20 1440,100 L1440,150 L0,150 Z"
            fill="#f7edcf"
            initial={{ y: 150 }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </svg>
      </div>

      {/* ================= CONTENT ================= */}

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center"
        variants={contentContainerVariants}
      >
        {/* Left Content */}
        <div className="text-black">
          <motion.h3 className="text-eyebrowSm
  sm:text-eyebrowMd
  lg:text-eyebrow font-normal relative inline-block pb-1" variants={textItemVariants}>
            Featured Guide
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />
          </motion.h3>

          <motion.h2 className="text-herooSm
  sm:text-herooMd
  lg:text-heroo font-headline font-normal text-black mt-4" variants={textItemVariants}>
            Mastering Digital Transformation for Peak Business Performance
          </motion.h2>

          <motion.p className="mt-6 text-bodyySm
  sm:text-bodyyMd
  lg:text-bodyylg" variants={textItemVariants}>
            Uncover how to elevate business performance through digital transformation, integrating technology with strategy, enhancing collaboration, and driving innovation for a competitive advantage.
          </motion.p>

          <motion.div className="mt-8" variants={textItemVariants}>
          <Link href="/contact">
            <MagneticButton>
              <span className="text-button font-bold">Read Guide Here</span>
            </MagneticButton>
            </Link>
          </motion.div>
        </div>

        {/* Right Content */}
        <motion.div
  className="
    relative
    w-full
    min-h-[260px]
    aspect-[4/3]
    md:aspect-[5/4]
    lg:aspect-[16/10]
  "
  variants={imageContainerVariants}
>
          
          {/* 🔥 ROTATED GREEN BACKGROUND */}
          <div
            className="absolute -top-24 -right-2 rounded-2xl overflow-hidden bg-[#9a4afc]"
            style={{
              width: '90%',
              height: '95%',
              transform: 'rotate(10deg)',
              transformOrigin: 'top left'
            }}
          >
            <CirclePattern />
          </div>

          {/* IMAGE CARD */}
          <div className="relative w-full h-full rounded-2xl border-8 border-[#ff8f82] p-4 bg-white/10 backdrop-blur-sm shadow-2xl">
            <Image 
              src="https://picsum.photos/seed/digital-transformation/800/600"
              alt="Digital transformation in an office"
              fill
              className="object-cover rounded-lg"
              data-ai-hint="digital transformation office"
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
