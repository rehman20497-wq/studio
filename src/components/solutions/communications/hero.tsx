
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import MagneticButton from '@/components/magnetic-button';
import { Infinity } from 'lucide-react';
import AnimatedCircles from './animated-circles';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 1,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const contentContainerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
            delayChildren: 1,
        }
    }
}

const itemVariants = {
  hidden: (direction: 'top' | 'left' | 'bottom' | 'right') => {
    if (direction === 'top') return { opacity: 0, y: -50 };
    if (direction === 'left') return { opacity: 0, x: -50 };
    if (direction === 'bottom') return { opacity: 0, y: 50 };
    if (direction === 'right') return { opacity: 0, x: 50 };
    return { opacity: 0 };
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 1,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.section
      ref={ref}
      className="relative min-h-screen flex items-center bg-[#cdf0bd] rounded-t-3xl mx-[4%] mt-4 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="container mx-auto 2xl:max-w-[90%] px-[6%] py-12 grid md:grid-cols-2 gap-8 items-center">
        <motion.div
            variants={contentContainerVariants}
        >
          <motion.div custom="right" variants={itemVariants}>
            <Infinity className="w-10 h-10 text-black" />
          </motion.div>
          <motion.h1
            custom="top"
            variants={itemVariants}
            className="text-heroSm
  sm:text-heroMd
  lg:text-hero font-normal text-black mt-4"
          >
            Communications
          </motion.h1>
          <motion.p
            custom="left"
            variants={itemVariants}
            className="mt-6 text-bodySm
  sm:text-bodyMd
  lg:text-bodylg text-black max-w-lg leading-[24.5px]"
          >
Stay connected, efficient, and ahead of the competition with Telsys Communication Solutions. We provide secure, scalable, and reliable platforms for voice, video, chat, and collaboration—designed to keep your teams, customers, and partners seamlessly connected.          </motion.p>
          <motion.div
            custom="bottom"
            variants={itemVariants}
            className="mt-8"
          >
            <MagneticButton>
              <span className="text-button font-bold px-4">Talk to an Expert</span>
            </MagneticButton>
          </motion.div>
        </motion.div>
        <div className="relative h-[500px] w-full">
            <AnimatedCircles />
        </div>
      </div>
    </motion.section>
  );
}
