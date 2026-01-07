'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { careersImages } from '@/lib/careers-images';
import MagneticButton from '@/components/magnetic-button';

/* ---------------- Variants ---------------- */

const textContentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.6,
    },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const paragraphVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 18,
      stiffness: 90,
    },
  },
};

const waveVariants = {
  hidden: { pathLength: 0 },
  visible: {
    pathLength: 1,
    transition: {
      duration: 1.8,
      ease: 'easeInOut',
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, y: 60, rotate: 6 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
  
    transition: {
      type: 'spring',
      damping: 14,
      stiffness: 55,
      delay: 0.8 + i * 0.25,
    },
  }),
};

/* ---------------- Images Layout (REFERENCE MATCHED) ---------------- */

const images = [
  {
    ...careersImages.years,
    rotation: -18,
    position: { top: '34%', left: '-5%' },
    size: 210,
  },
  {
    ...careersImages.academy,
    rotation: -18,
    position: { top: '14%', left: '7%' },
    size: 210,
  },
  {
    ...careersImages.day1,
    rotation: 10,
    position: { top: '60%', left: '15%' },
    size: 210,
  },
  {
    ...careersImages.training,
    rotation: -14,
    position: { top: '24%', right: '-6%' },
    size: 210,
  },
  {
    ...careersImages.iwd,
    rotation: -14,
    position: { top: '44%', right: '9.5%' },
    size: 210,
  },
  {
    ...careersImages.hugo,
    rotation: -10,
    position: { top: '60%', right: '18%' },
    size: 210,
  },
];

/* ---------------- Component ---------------- */

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section
  ref={ref}
  className="relative overflow-hidden min-h-screen px-4 bg-transparent"
>
{/* Background Split */}
<div className="absolute inset-0 z-0">
  {/* Top background */}
  <div className="absolute top-0 left-0 w-full h-[51%] bg-[#FCFBF8]" />

  {/* Bottom background */}
  <div className="absolute top-[51%] left-0 w-full h-[49%] bg-[#fff9e6]" />
</div>

      {/* Yellow Wave */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <svg
          viewBox="0 0 1440 300"
          className="absolute w-full top-[51%]"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M -100 150 C 300 50, 1100 250, 1600 150"
            stroke="#F5D34A"
            strokeWidth="80"
            strokeLinecap="round"
            fill="none"
            variants={waveVariants}
          />
        </svg>
      </motion.div>

      {/* Center Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto pt-28 text-center"
        variants={textContentVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.h1
          className="text-[64px] leading-tight font-bold text-zinc-900 font-headline"
          variants={headingVariants}
        >
          Where Better Begins.
        </motion.h1>

        <motion.p
          className="mt-6 text-lg text-zinc-600 max-w-2xl mx-auto"
          variants={paragraphVariants}
        >
          At Hugo, we're built to drive better outcomes, create better opportunities
          that break barriers, and enable better careers where you can thrive.
          Join our global community as we shape the future of work.
        </motion.p>

        <div className="mt-12 flex justify-center gap-4">
          <motion.div variants={buttonVariants}>
            <MagneticButton>
              <span className="text-[15px] font-medium px-5">
                Corporate roles
              </span>
            </MagneticButton>
          </motion.div>
          <motion.div variants={buttonVariants}>
            <MagneticButton>
              <span className="text-[15px] font-medium px-5">
                Agent roles
              </span>
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Images */}
      <div className="absolute inset-0 z-0">
        {images.map((image, i) => (
          <motion.div
            key={i}
            className="absolute bg-white p-2 pb-1 rounded-xl border-2 border-black shadow-[0_20px_40px_rgba(0,0,0,0.25)]"
            style={{
              ...image.position,
              rotate: image.rotation,
              width: image.size,
            }}
            custom={i}
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.size - 16}
              height={image.size - 16}
              className="rounded-md object-cover"
            />
            <p
              className="mt-2 text-center text-lg"
              style={{ fontFamily: "'Gochi Hand', cursive" }}
            >
              {image.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
