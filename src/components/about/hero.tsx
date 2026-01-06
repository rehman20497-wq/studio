
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import MagneticButton from '@/components/magnetic-button';

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

const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const buttonContainerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.8
        }
    }
}

const slideInLeft = {
  hidden: { x: '-100%', opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 80,
      mass: 1,
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
        damping: 20,
        stiffness: 80,
        mass: 1,
    }
  },
};


export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="bg-[#FCFBF8] text-center py-40 px-4">
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.h1
          className="text-7xl font-bold text-zinc-900 font-headline"
          variants={textVariants}
        >
          We've Decoded the <br /> Science of Excellence.
        </motion.h1>
        <motion.p
          className="mt-6 text-lg text-zinc-600 max-w-2xl mx-auto"
          variants={textVariants}
        >
          Qp x Qs → MPO. It's an equation we've consistently harnessed to deliver
          exceptional results and why 95% of our clients expand our scope
          within the first 3 months.
        </motion.p>
      </motion.div>

      <motion.div
        className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        variants={buttonContainerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.div variants={slideInLeft}>
            <MagneticButton>
                <span className="text-[15px] font-medium px-4">See Open Roles</span>
            </MagneticButton>
        </motion.div>
        <motion.div variants={slideInRight}>
            <MagneticButton>
                <span className="text-[15px] font-medium px-4">Build Your Team</span>
            </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
