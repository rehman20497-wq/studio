
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const logos = [
  { src: '/gar.png', alt: 'Gartner' },
  { src: '/for.png', alt: 'Forrester' },
  { src: '/cl.png', alt: 'Clutch' },
  { src: '/go.png', alt: 'GoodFirms' },
];

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

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

export default function FeaturedBySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.section
      ref={ref}
      className="bg-[#fff9e6] pt-[2%] pb-[5%] px-4"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      <div className="container mx-auto">
        <motion.div
          className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 md:gap-x-16"
          variants={containerVariants}
        >
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={150}
                height={50}
                className="object-contain h-10 w-auto"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
