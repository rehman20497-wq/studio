'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const timelineData = [
  {
    icon: '/is.svg',
    time: 'Now',
    title: '1. Define',
    description:
      "Share your goals and challenges, and we'll design a custom solution tailored to your business needs.",
  },
  {
    icon: '/is1.svg',
    time: '1 Week',
    title: '2. Test',
    description:
      'Start with a pilot program to validate the workflow, refine processes, and integrate your feedback before scaling.',
  },
  {
    icon: '/is2.svg',
    time: '1 Month',
    title: '3. Launch',
    description:
      'Go live with a fully trained Telsys team, supported by a dedicated project manager, ongoing coaching, QA, and our knowledge & insights team to ensure seamless execution.',
  },
  {
    icon: '/is3.svg',
    time: 'Weekly After 1 Month',
    title: '4. Manage & Scale',
    description:
      "We monitor performance, track growth metrics, and continuously optimize your team's output. As your needs evolve, we'll scale resources while maintaining quality and productivity.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
      delayChildren: 1.6,
    },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const paragraphVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: 'easeOut', delay: 0.2 },
  },
};

const arrowVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: 'easeOut', delay: 0.4 },
  },
};

const timelineLineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.2, ease: 'easeInOut' },
  },
};

const timelineItemVariants = {
  hidden: {
    opacity: 0,
    y: 80,
    scale: 0.85,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 14,
      stiffness: 90,
    },
  },
};

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="relative bg-[#fff9e6] py-24 px-4 overflow-hidden"
    >
      {/* Top Wave */}
      <div className="absolute top-0 left-0 w-full h-[150px] pointer-events-none z-0">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 150"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,150 C240,60 480,0 720,0 C960,0 1200,60 1440,150 L1440,0 L0,0 Z"
            fill="#ffffff"
            initial={{ y: -150, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </svg>
      </div>

      {/* Heading */}
      <motion.div
        className="relative max-w-7xl mx-auto text-center z-10"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        <div className="flex justify-center items-center gap-4 mb-6">
          <motion.h2
            className=" text-herooSm
  sm:text-herooMd
  lg:text-heroo font-headline font-normal text-black"
            variants={headingVariants}
          >
            How to Work With Telsys
          </motion.h2>
          <motion.div variants={arrowVariants}>
            <Image src="/arr.png" alt="arrow" width={40} height={40} />
          </motion.div>
        </div>

        <motion.p
          className="text-bodySm
  sm:text-bodyMd
  lg:text-bodylg text-black  max-w-4xl mx-auto"
          variants={paragraphVariants}
        >
          Our fully managed teams integrate seamlessly with your workflows and
          platforms, delivering fast, reliable support and smooth collaboration
          at every step.
        </motion.p>
      </motion.div>

      <div className="max-w-7xl mx-auto mt-16 relative">
        {/* ===================== */}
        {/* MOBILE & TABLET */}
        {/* ===================== */}
        <div className="relative lg:hidden">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-yellow-300" />

          <motion.div
            className="flex flex-col gap-16"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={containerVariants}
          >
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                className="relative flex gap-6 pl-12"
                variants={timelineItemVariants}
              >
                <div className="absolute left-0 top-0 w-12 h-12 flex items-center justify-center bg-[#fff9e6]">
                  <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Image src={item.icon} alt="" width={24} height={24} />
                  </div>
                </div>

                <div>
                  <div className="bg-yellow-500 inline-block px-3 py-1 rounded-full text-testimonialReview text-black shadow-md mb-3">
                    {item.time}
                  </div>
                  <h3 className="text-bodySm
  sm:text-bodyMd
  lg:text-bodylg font-bold text-black mb-2">
                    {item.title}
                  </h3>
                  <p className="text-testimonialReview text-black leading-snug">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ===================== */}
        {/* DESKTOP (UNCHANGED) */}
        {/* ===================== */}
        <div className="hidden lg:block">
          {/* Timeline Line */}
          <div className="absolute top-10 left-0 w-full h-0.5 bg-yellow-300">
            <motion.div
              className="h-full bg-yellow-500"
              style={{ originX: 0 }}
              variants={timelineLineVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            />
          </div>

          {/* Time Labels */}
          <div className="absolute top-7 left-0 w-full -translate-y-1/2 z-20">
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                className="absolute -translate-x-1/2 ml-[3%]"
                style={{ left: `${(index + 0.5) * 25}%` }}
                initial={{ opacity: 0, y: -10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.4 + index * 0.2 }}
              >
                <div className="bg-yellow-500 px-3 py-1 rounded-full text-testimonialReview text-black shadow-md whitespace-nowrap">
                  {item.time}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Timeline Items */}
          <motion.div
            className="relative grid grid-cols-4 gap-x-8 gap-y-16"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={containerVariants}
          >
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-start text-left"
                variants={timelineItemVariants}
              >
                <div className="mb-6">
                  <Image src={item.icon} alt="" width={50} height={50} />
                </div>

                <h3 className="text-bodySm
  sm:text-bodyMd
  lg:text-bodylg font-bold text-black mb-3">
                  {item.title}
                </h3>
                <p className="text-testimonialReview text-black leading-snug">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
