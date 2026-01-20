
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

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

const textLineVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1], // A nice ease-out cubic bezier
    },
  },
};

const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            delay: 0.6, // Delay after heading lines
            ease: "easeOut",
        }
    }
}

export default function IntegrationCtaSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section ref={ref} className="bg-white py-24 px-4">
      <motion.div
        className="max-w-5xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <h2 className="text-[72px] text-black leading-[72.5px] font-headline font-normal">
          <motion.span className="block" variants={textLineVariants}>We integrate seamlessly with</motion.span>
          <motion.span className="block" variants={textLineVariants}>technology built for scale &</motion.span>
          <motion.span className="block" variants={textLineVariants}>customer excellence.</motion.span>
        </h2>
        <motion.p
            className="mt-8 text-[16px] leading-[24.5px] text-black max-w-3xl mx-auto"
            variants={paragraphVariants}
        >
          From day 1 we integrate into your existing CRMs, operational tools and customer systems so our teams deliver results without disrupting how you work.
        </motion.p>
      </motion.div>
    </section>
  );
}
