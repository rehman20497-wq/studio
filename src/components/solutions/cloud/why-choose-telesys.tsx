
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const subHeadingVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };
  
const mainHeadingVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: [0.25, 1, 0.5, 1],
            delay: 0.2
        },
    },
};

const paragraphVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.25, 1, 0.5, 1],
            delay: 0.4
        },
    },
};

const underlineVariants = (delay: number) => ({
    hidden: { pathLength: 0 },
    visible: {
        pathLength: 1,
        transition: {
            duration: 0.8,
            ease: "easeInOut",
            delay: delay
        }
    }
});

const arrowVariants = {
    hidden: { opacity: 0, y: -20, rotate: -45 },
    visible: { 
        opacity: 1, y: 0, rotate: 0,
        transition: { type: 'spring', stiffness: 120, damping: 10, delay: 0.8 }
    }
};

export default function WhyChooseTelesys() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-24 px-4 bg-[#a2edf4]">
      <motion.div
        className="max-w-4xl mx-auto text-center relative"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.div
            className="absolute -top-12 left-1/2 -ml-40 w-16 h-16"
            variants={arrowVariants}
        >
            <Image src="/arrow.gif" alt="arrow" width={64} height={64} unoptimized/>
        </motion.div>
        
        <motion.div className="relative inline-block mb-6" variants={subHeadingVariants}>
            <h3 className="text-[23px] text-black">The Telsys Difference</h3>
            <svg
                className="absolute -bottom-1 left-0 w-full h-2 overflow-visible"
                viewBox="0 0 100 8"
                preserveAspectRatio="none"
            >
                <motion.path
                    d="M 1,5 C 20,2 80,2 99,5"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    variants={underlineVariants(1.0)}
                />
            </svg>
        </motion.div>

        <motion.h2 className="text-[49px] text-black font-normal" variants={mainHeadingVariants}>
          Why Choose <span className="relative inline-block">Telsys
                <svg
                    className="absolute -bottom-2 left-0 w-full h-3 overflow-visible"
                    viewBox="0 0 100 8"
                    preserveAspectRatio="none"
                    >
                    <motion.path
                        d="M 2,5 C 20,8 80,8 98,5"
                        fill="none"
                        stroke="black"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        variants={underlineVariants(1.4)}
                    />
                </svg>
            </span>
        </motion.h2>
        
        <motion.p className="mt-6 text-[20px] text-black max-w-3xl mx-auto" variants={paragraphVariants}>
            A fully managed, global support model built for scale, quality, and long-term partnership.
        </motion.p>
      </motion.div>
    </section>
  );
}

