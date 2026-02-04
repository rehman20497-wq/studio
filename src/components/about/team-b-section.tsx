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

export default function TeamBSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section ref={ref} className="bg-[#fff9e6] py-12 px-4">
      <motion.div
        className="max-w-6xl mx-auto flex flex-col-reverse md:grid md:grid-cols-2 gap-8 md:gap-16 items-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
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
                src="https://picsum.photos/seed/quality/500/500"
                alt="Team focused on quality"
                fill
                className="object-cover"
                data-ai-hint="quality office"
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
                stroke="#0badbf"
                strokeWidth="4"
                strokeLinecap="round"
                variants={circleVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
              />
            </svg>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center md:text-left">
          <h2 className="text-herooSm
  sm:text-herooMd
  lg:text-heroo text-black font-headline font-normal">
            Our Commitment to Quality
          </h2>
          <p className="mt-6 text-bodyySm
  sm:text-bodyyMd
  lg:text-bodyylg text-black">
            Our commitment to quality is the bedrock of our operations. We have meticulously engineered our processes to guarantee excellence across every service we offer, from initial consultation to final implementation. Whether we are deploying sophisticated AI solutions, ensuring robust connectivity, unifying communications platforms, or architecting scalable Cloud infrastructure, our goal is not merely to meet industry standards, but to consistently redefine them. This relentless pursuit of quality ensures that our clients receive solutions that are not only innovative and reliable but also drive tangible business results.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
