
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import MagneticButton from './magnetic-button';
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

const slideInLeft = {
  hidden: { x: '-100%', opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 30,
      stiffness: 50,
      duration: 2
    }
  },
};

const slideInRight = {
  hidden: { x: '100%', opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: {
        type: 'spring',
        damping: 30,
        stiffness: 50,
        duration: 2
    }
  },
};


export default function ActionButtonsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section ref={ref} className="bg-white pb-20 ">
      <motion.div
  className="container mx-auto flex flex-row items-center justify-center gap-8"
  variants={containerVariants}
  initial="hidden"
  animate={isInView ? 'visible' : 'hidden'}
>

        <motion.div variants={slideInLeft}>
        <Link href="/contact">
          <MagneticButton>
            <span className="text-button font-medium">
              Talk With Experts
            </span>
          </MagneticButton>
        </Link>
        </motion.div>

        <motion.div variants={slideInRight}>
        <Link href="/contact">
          <MagneticButton>
            <span className="text-button font-medium">
              Get Started
            </span>
          </MagneticButton>
        </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
