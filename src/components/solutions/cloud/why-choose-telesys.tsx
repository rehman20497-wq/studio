'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const brushDraw = {
  hidden: { pathLength: 0 },
  visible: {
    pathLength: 1,
    transition: {
      duration: 1.6, // slow hand-drawn
      ease: 'easeInOut',
      delay: 0.4,
    },
  },
};

const jitter = {
  animate: {
    x: [0, -0.6, 0.6, -0.4, 0],
    y: [0, 0.5, -0.5, 0.3, 0],
    transition: {
      duration: 1.8,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export default function WhyChooseTelesys() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="pt-24 pb-12 px-4 bg-[#a2edf4]">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Sub Heading */}
        <motion.div className="inline-block mb-6" variants={fadeUp}>
          <h3 className="text-[23px] text-black font-normal">
            The Telsys Difference
          </h3>

          {/* Messy full underline */}
          <motion.svg
            className="w-full h-3 mt-[2px]"
            viewBox="0 0 300 20"
            preserveAspectRatio="none"
            {...jitter}
          >
            <motion.path
              d="M4 13
                 Q25 9 45 14
                 T85 12
                 T120 15
                 T160 11
                 T200 14
                 T240 10
                 T295 13"
              fill="none"
              stroke="black"
              strokeWidth="3"
              strokeLinecap="round"
              variants={brushDraw}
            />
          </motion.svg>
        </motion.div>

        {/* Main Heading */}
        <motion.h2
          className="text-[72px] text-black font-normal leading-tight"
          variants={fadeUp}
        >
          Why Choose{' '}
          <span className="relative inline-block">
            Telsys

            {/* Messy underline ONLY under Telsys */}
            <motion.svg
              className="absolute left-0 -bottom-[2px] w-full h-4"
              viewBox="0 0 200 22"
              preserveAspectRatio="none"
              {...jitter}
            >
              <motion.path
                d="M3 15
                   Q20 10 38 14
                   T70 16
                   T105 12
                   T135 17
                   T165 13
                   T196 15"
                fill="none"
                stroke="black"
                strokeWidth="3"
                strokeLinecap="round"
                variants={brushDraw}
              />
            </motion.svg>
          </span>
        </motion.h2>

        {/* Paragraph */}
        <motion.p
          className="mt-10 text-[20px] text-black max-w-3xl mx-auto font-normal"
          variants={fadeUp}
        >
          A fully managed, global support model built for scale, quality, and long-term partnership.
        </motion.p>
      </motion.div>
    </section>
  );
}
