
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

const subHeadingVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const underlineVariants = {
  hidden: { pathLength: 0 },
  visible: {
    pathLength: 1,
    transition: { duration: 0.8, ease: 'easeInOut', delay: 0.3 },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut', delay: 0.6 } },
};

const arrowVariants = {
  hidden: { opacity: 0, x: -20, rotate: -45 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { type: 'spring', damping: 15, stiffness: 100, delay: 0.9 },
  },
};

export default function AnalystsAgreeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.section
      ref={ref}
      className="bg-[#fff9e6] py-24 px-4"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="text-center">
        <motion.div className="inline-block relative" variants={subHeadingVariants}>
          <h3 className="text-[20px] text-black">
            Analysts and Users Agree
          </h3>
          <motion.svg
            className="absolute -bottom-1 left-0 w-full h-2"
            viewBox="0 0 200 8"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M 2,5 C 40,3 160,3 198,5"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              variants={underlineVariants}
            />
          </motion.svg>
        </motion.div>

        <motion.div
          className="flex justify-center items-center gap-4 mt-8"
          variants={headingVariants}
        >
          <h2 className="text-[46px] font-headline font-normal text-black">
            Telsys is the Leader
          </h2>
          <motion.div variants={arrowVariants}>
            <Image src="/arr.png" alt="arrow" width={40} height={40} />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
