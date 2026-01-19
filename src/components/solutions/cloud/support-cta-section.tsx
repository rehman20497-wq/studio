'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import MagneticButton from '@/components/magnetic-button';

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1],
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
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
      <div className="text-center space-y-8">
        <motion.h2
          className="text-[46px] font-normal font-headline text-black"
          variants={itemVariants}
        >
          Support You're Looking For
        </motion.h2>
        <motion.p
          className="text-[16px] text-zinc-700 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Check out our tailored plans and pick the one that works best for you.
        </motion.p>
        <motion.div variants={itemVariants}>
          <MagneticButton>
            <span className="text-[15px] font-bold px-4">Connect with us</span>
          </MagneticButton>
        </motion.div>
      </div>
    </motion.section>
  );
}
