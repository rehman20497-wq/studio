
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

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function IntegrationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section ref={ref} className="bg-[#FEF9F2] py-32">
      <motion.div
        className="container mx-auto px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.h2
          className="text-5xl md:text-6xl font-headline font-medium text-zinc-900 max-w-4xl mx-auto leading-tight"
          variants={itemVariants}
        >
          We integrate seamlessly with technology built for scale & customer
          excellence.
        </motion.h2>
        <motion.div className="mt-12" variants={itemVariants}>
          <MagneticButton>
            <span className="text-[15px] font-medium">Build your Team</span>
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
