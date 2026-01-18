'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import AlumniCarousel from './alumni-carousel';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
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
      duration: 1,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const mapVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 1.5,
            ease: "easeOut",
        }
    }
}

export default function AlumniSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="bg-[#fff9e6] pt-[2%] pb-24 relative overflow-hidden">
        <motion.div 
            className="absolute inset-0"
            variants={mapVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
        >
            <Image 
                src="/map.png"
                alt="World map background"
                fill
                className="object-cover opacity-20"
            />
        </motion.div>

        <motion.div
            className="relative container mx-auto px-4 text-center"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
        >
            <motion.h2 className="text-[46px] font-headline font-normal text-black" variants={itemVariants}>
                Start here. Qualify anywhere!
            </motion.h2>
            <motion.p className="mt-4 text-[20px] text-black max-w-3xl mx-auto" variants={itemVariants}>
                Hugo alumni are thriving across the globe. Our talented community is pursuing higher education at top universities and making an impact at leading companies including Bloomberg, Barclays, and KPMG.
            </motion.p>
        </motion.div>

        <motion.div 
            className="relative mt-12 w-full pb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay: 0.8 }}
        >
            <AlumniCarousel />
        </motion.div>
    </section>
  );
}
