
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import MagneticButton from './magnetic-button';

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

const textVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1],
    }
  },
};

const buttonVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1],
    }
  },
};

const balloonVariants = {
  hidden: { opacity: 0, y: 100, scale: 0.5 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 80,
      delay: i * 0.15,
    },
  }),
};

const smiles = [
  { src: '/smile1.gif', alt: 'smile', className: 'absolute top-[20%] left-[15%] w-24 h-24' },
  { src: '/smile.gif', alt: 'smile', className: 'absolute top-[25%] right-[30%] w-20 h-20' },
  { src: '/smile3.gif', alt: 'smile', className: 'absolute top-[45%] right-[12%] w-28 h-28' },
  { src: '/smile4.gif', alt: 'smile', className: 'absolute bottom-[10%] right-[22%] w-24 h-24' },
  { src: '/smile.gif', alt: 'smile', className: 'absolute bottom-[15%] left-[25%] w-20 h-20' },
];

export default function FooterCta() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="relative bg-[#F5D34A] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-24 text-[#FEF9F2]">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0 100C240 25 480 25 720 25S1200 25 1440 100V0H0V100Z" />
        </svg>
      </div>

      <motion.div
        className="container mx-auto px-4 py-48 text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.h2
          className="text-6xl font-bold font-headline text-zinc-900"
          variants={textVariants}
        >
          Outsourcing +<br />
          built to make you better.
        </motion.h2>
        
        <motion.div className="mt-10" variants={buttonVariants}>
          <MagneticButton>
            <span className="text-[15px] font-medium px-4">Get started</span>
          </MagneticButton>
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 z-0">
        {smiles.map((smile, i) => (
          <motion.div
            key={i}
            className={smile.className}
            custom={i}
            variants={balloonVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <Image src={smile.src} alt={smile.alt} width={112} height={112} unoptimized />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
