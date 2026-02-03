
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import MagneticButton from '@/components/magnetic-button';
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const headingVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };
  
  const paragraphVariants = {
      hidden: { opacity: 0, x: 50 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.8,
          ease: [0.25, 1, 0.5, 1],
        },
      },
    };
  
  const buttonVariants = {
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          ease: [0.25, 1, 0.5, 1],
        },
      },
    };

export default function SupportCtaSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.section
      ref={ref}
      className="bg-[#fff9e6] pt-[2%] pb-[3%] w-full"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="text-center space-y-4">
        <motion.h2
          className=" text-herooSm
  sm:text-herooMd
  lg:text-heroo font-normal font-headline text-black "
          variants={headingVariants}
        >
          Support You're Looking For
        </motion.h2>
        <motion.p
          className="text-bodyySm
  sm:text-bodyyMd
  lg:text-bodyylg text-black max-w-2xl mx-auto"
          variants={paragraphVariants}
        >
          Check out our tailored plans and pick the one that works best for you.
        </motion.p>
        <motion.div variants={buttonVariants}>
        <Link href="/contact">
          <MagneticButton>
            <span className="text-button font-medium">
              Talk With Experts
            </span>
          </MagneticButton>
        </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
