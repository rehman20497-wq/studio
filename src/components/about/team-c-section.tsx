'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 2.5,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const circleVariants = {
  hidden: { pathLength: 0 },
  visible: {
    pathLength: 1,
    transition: {
      duration: 3.5,
      ease: 'easeInOut',
      delay: 0.5,
    },
  },
};

export default function TeamCSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section ref={ref} className="bg-[#fff9e6] py-24 px-4">
      <motion.div
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-16 items-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.div variants={itemVariants} className="md:pr-8">
          <h2 className="text-[49px] leading-[52px] text-black font-headline font-normal">
            Driving Innovation Together
          </h2>
          <p className="mt-6 text-base text-black">
            Innovation is at the heart of everything we do. We collaborate closely with our clients to push boundaries, explore new ideas, and create solutions that drive meaningful change and deliver a competitive edge.
          </p>
        </motion.div>

        <motion.div
          className="relative flex items-center justify-center"
          variants={itemVariants}
        >
          <div className="relative mx-auto h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]">
            <motion.div 
                className="relative w-full h-full rounded-full overflow-hidden"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1, transition: { duration: 2.2, ease: [0.25, 1, 0.5, 1], delay: 1.5 } } : {}}
            >
              <Image
                src="https://picsum.photos/seed/innovation/500/500"
                alt="Team brainstorming innovation"
                fill
                className="object-cover"
                data-ai-hint="innovation future"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </motion.div>
            <svg
              className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)]"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.circle
                cx="50"
                cy="50"
                r="48"
                stroke="#4ab01b"
                strokeWidth="4"
                strokeLinecap="round"
                variants={circleVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
              />
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
