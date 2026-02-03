
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
    <section ref={ref} className="bg-white py-[4%]">
      <motion.div
        className="container mx-auto px-[10%] text-center max-w-[4300px]"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.h2
  className="
    font-headline font-medium text-black w-full mx-auto
    text-heroSm
  sm:text-heroMd
  lg:text-hero
  "
  variants={itemVariants}
>
  We integrate seamlessly with technology built for scale & customer
  excellence.
</motion.h2>

        <motion.div className="mt-8" variants={itemVariants}>
        <Link href="/contact">
          <MagneticButton>
            <span className="text-button font-medium">
              Talk With Experts
            </span>
          </MagneticButton>
        </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
