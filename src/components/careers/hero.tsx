
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { careersImages } from '@/lib/careers-images';
import MagneticButton from '@/components/magnetic-button';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.5,
    },
  },
};

const textContentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 1.5, 
      },
    },
  };

const headingVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const paragraphVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

const buttonContainerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.4
        }
    }
}

const slideInLeft = {
  hidden: { x: '-100%', opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 80,
      mass: 1,
    }
  },
};

const slideInRight = {
  hidden: { x: '100%', opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: {
        type: 'spring',
        damping: 20,
        stiffness: 80,
        mass: 1,
    }
  },
};

const waveVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: {
        duration: 2,
        ease: [0.42, 0, 0.58, 1],
      },
    },
  };

const imageVariants = {
    hidden: { opacity: 0, y: 50, rotate: 5 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 50,
        delay: 1 + i * 0.3,
      },
    }),
  };

const images = [
    { ...careersImages.years, rotation: -15, position: { top: '30%', left: '5%' }, size: { width: 220, height: 220 } },
    { ...careersImages.academy, rotation: 8, position: { top: '10%', left: '20%' }, size: { width: 240, height: 240 } },
    { ...careersImages.day1, rotation: -8, position: { top: '50%', left: '15%' }, size: { width: 250, height: 250 } },
    { ...careersImages.training, rotation: 12, position: { top: '50%', right: '15%' }, size: { width: 230, height: 230 } },
    { ...careersImages.iwd, rotation: -10, position: { top: '15%', right: '20%' }, size: { width: 280, height: 280 } },
    { ...careersImages.hugo, rotation: 5, position: { top: '30%', right: '5%' }, size: { width: 240, height: 240 } },
];
  
export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="bg-[#FCFBF8] text-center pt-20 pb-32 px-4 relative overflow-hidden h-[90vh]">
        <motion.div 
            className="absolute inset-0 w-full h-full flex items-center justify-center"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
        >
            <svg
                viewBox="0 0 1440 400"
                preserveAspectRatio="xMidYMid meet"
                className="w-full h-auto absolute top-1/2 -translate-y-1/2"
                fill="none"
            >
                <motion.path
                    d="M -40 200 C 250 100, 1190 300, 1480 200"
                    stroke="#F5D34A"
                    strokeWidth="200"
                    strokeLinecap='round'
                    variants={waveVariants}
                />
            </svg>
        </motion.div>
      
      <motion.div
        className="relative z-10 pt-16"
        variants={textContentVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.h1
          className="text-7xl font-bold text-zinc-900 font-headline"
          variants={headingVariants}
        >
          Where Better Begins.
        </motion.h1>
        <motion.p
          className="mt-6 text-lg text-zinc-600 max-w-2xl mx-auto"
          variants={paragraphVariants}
        >
          At Hugo, we're built to drive better outcomes, create better opportunities that break barriers, and enable better careers where you can thrive. Join our global community as we shape the future of work.
        </motion.p>
      
        <motion.div
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={buttonContainerVariants}
        >
            <motion.div variants={slideInLeft}>
                <MagneticButton>
                    <span className="text-[15px] font-medium px-4">Corporate roles</span>
                </MagneticButton>
            </motion.div>
            <motion.div variants={slideInRight}>
                <MagneticButton>
                    <span className="text-[15px] font-medium px-4">Agent roles</span>
                </MagneticButton>
            </motion.div>
        </motion.div>
      </motion.div>

        <motion.div 
            className="absolute inset-0 z-0"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
        >
            {images.map((image, i) => (
            <motion.div
                key={i}
                className="absolute bg-white p-2 pb-1 shadow-2xl rounded-xl flex flex-col"
                style={{ ...image.position, rotate: image.rotation, width: image.size.width }}
                custom={i}
                variants={imageVariants}
            >
                <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.size.width - 16}
                    height={image.size.height - 16}
                    className="object-cover rounded-md"
                    data-ai-hint={image.hint}
                />
                <p className="mt-2 text-center font-headline text-lg" style={{ fontFamily: "'Gochi Hand', cursive" }}>
                    {image.label}
                </p>
            </motion.div>
            ))}
      </motion.div>
    </section>
  );
}
