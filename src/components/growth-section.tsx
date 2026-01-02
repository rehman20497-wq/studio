
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
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const Underline = ({ children, delay }: { children: React.ReactNode; delay: number }) => (
  <span className="relative inline-block">
    {children}
    <svg
      className="absolute -bottom-1.5 left-0 w-full h-2.5 overflow-visible"
      viewBox="0 0 100 10"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M 1,6 C 20,2 80,2 99,6"
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
    <section ref={ref} className="bg-[#FEF9F2] py-24 overflow-hidden">
      <motion.div
        className="container mx-auto px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.h2
          className="text-5xl font-bold font-headline text-zinc-900"
          variants={itemVariants}
        >
          + More Growth, Less Risk
        </motion.h2>
        <motion.p
          className="mt-6 text-lg text-zinc-600 max-w-3xl mx-auto font-body"
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
