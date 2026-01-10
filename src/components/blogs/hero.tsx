
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.5,
    },
  },
};

const headingVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, ease: [0.25, 1, 0.5, 1] } },
};

const arrowVariants = {
    hidden: { opacity: 0, scale: 0.5, y: -50, rotate: -45 },
    visible: { 
        opacity: 1, 
        scale: 1, 
        y: 0,
        rotate: 0,
        transition: { type: 'spring', damping: 12, stiffness: 100, delay: 0.8 } 
    },
};

const textPathVariants = {
    hidden: { pathLength: 0 },
    visible: { 
        pathLength: 1, 
        transition: { duration: 1.5, ease: 'easeInOut', delay: 1.2 } 
    }
}

const paragraphVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.25, 1, 0.5, 1],
      delay: 1.5,
    },
  },
};

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section ref={ref} className="bg-[#FCFBF8] text-center py-20 px-4">
      <motion.div
        className="max-w-4xl mx-auto flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.div 
            className="relative mb-2"
            variants={headingVariants}
        >
            <motion.div 
                className="absolute -top-10 -left-12 w-16 h-16"
                variants={arrowVariants}
            >
                <Image src="/arro.gif" alt="arrow" width={64} height={64} unoptimized />
            </motion.div>

            <svg
                className="w-full h-auto max-w-2xl"
                viewBox="0 0 500 120"
            >
                <path id="curve" d="M20 90 C 100 20, 400 20, 480 90" fill="transparent" />
                <text className="text-6xl font-bold text-zinc-900 font-headline" fill="currentColor">
                    <textPath href="#curve" startOffset="50%" textAnchor="middle">
                        Telesys Resources
                    </textPath>
                </text>
                 <motion.path
                    d="M120 95 C 180 60, 320 60, 380 95"
                    stroke="black"
                    strokeWidth="3"
                    fill="transparent"
                    strokeLinecap="round"
                    variants={textPathVariants}
                />
            </svg>

        </motion.div>

        <motion.p
          className="mt-6 text-lg text-zinc-600 max-w-2xl mx-auto"
          variants={paragraphVariants}
        >
          We work with some of the world's most iconic brands. Gain access to
          guides, frameworks, exclusive interviews and practical examples of
          how companies use Telesys day to day.
        </motion.p>
      </motion.div>
    </section>
  );
}
