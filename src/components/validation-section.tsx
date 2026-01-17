'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
      delayChildren: 0.2,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 100,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 100,
    },
  },
};

const Underline = ({
  color,
  delay = 0,
}: {
  color: string;
  delay?: number;
}) => (
  <svg
    className="absolute -bottom-2 left-0 w-full h-3 overflow-visible"
    viewBox="0 0 100 8"
    preserveAspectRatio="none"
  >
    <motion.path
      d="M 2,5 C 20,8 80,8 98,5"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      variants={{
        hidden: { pathLength: 0 },
        visible: {
          pathLength: 1,
          transition: {
            duration: 0.8,
            ease: 'easeInOut',
            delay: delay,
          },
        },
      }}
    />
  </svg>
);

export default function ValidationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section ref={ref} className="bg-white py-20 px-[6%]">
      <motion.div
        className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.div variants={imageVariants} className="order-1 md:order-1">
          <Image
            src="/global.webp"
            alt="Global Award"
            width={120}
            height={150}
            className="object-contain"
          />
        </motion.div>

        <motion.div variants={imageVariants} className="order-2 md:order-3">
          <Image
            src="/clutch.png"
            alt="Clutch Award"
            width={120}
            height={150}
            className="object-contain"
          />
        </motion.div>

        <motion.h2
          className="text-[32px] md:text-[46px] font-medium text-zinc-800 text-center leading-tight font-headline mx-0 md:mx-[4%] order-3 md:order-2"
          variants={textVariants}
        >
          Validated by{' '}
          <span className="relative inline-block">
            experts
            <Underline color="#C43B6A" delay={1.2} />
          </span>
          , valued by{' '}
          <span className="relative inline-block">
            customers
            <Underline color="#00A79D" delay={1.6} />
          </span>
        </motion.h2>
      </motion.div>
    </section>
  );
}
