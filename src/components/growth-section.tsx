'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const Underline = ({ children, delay }: { children: React.ReactNode; delay: number }) => (
  <span className="relative inline-block">
    {children}
    <svg
      className="absolute -bottom-1 left-0 w-full h-2 overflow-visible"
      viewBox="0 0 100 8"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M 1,5 C 20,2 80,2 99,5"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 'all' }}
        transition={{ duration: 0.5, ease: 'easeOut', delay }}
      />
    </svg>
  </span>
);

export default function GrowthSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="bg-white py-[2%]">
      <motion.div
        className="container mx-auto px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.h2
          className="text-[46px] font-normal font-headline text-black"
          variants={itemVariants}
        >
          + More Growth, Less Risk
        </motion.h2>
        <motion.p
          className="mt-6 text-[20px] text-black max-w-3xl mx-auto font-body"
          variants={itemVariants}
        >
          Focus on <Underline delay={0.5}>growth</Underline>, we'll take care of
          the many small <Underline delay={0.8}>tasks</Underline> that make the
          difference between <Underline delay={1.1}>awesome</Underline> and{' '}
          <Underline delay={1.4}>awful</Underline>.
        </motion.p>
      </motion.div>
    </section>
  );
}
