
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import MagneticButton from './magnetic-button';

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
          <MagneticButton>
            <span className="text-xs md:text-[15px] font-bold px-4">Clutch Reviews</span>
          </MagneticButton>
        </motion.div>

        <motion.div variants={slideInRight}>
          <MagneticButton>
            <span className="text-xs md:text-[15px] font-bold px-4">Get in touch</span>
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
