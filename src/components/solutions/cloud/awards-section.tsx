'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const awards = [
  { src: '/global.webp', alt: 'Global Award' },
  { src: '/clutch.png', alt: 'Clutch Award' },
  { src: '/logos/Google.svg', alt: 'Google logo' },
  { src: '/logos/Meta.svg', alt: 'Meta logo' },
  { src: '/logos/Upwork.svg', alt: 'Upwork logo' },
  { src: '/logos/Attentive.svg', alt: 'Attentive logo' },
  { src: '/logos/Faire.svg', alt: 'Faire logo' },
];

const marqueeVariants = {
  animate: {
    x: ['0%', '-50%'], // Moves left
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 40,
        ease: 'linear',
      },
    },
  },
};

const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.25, 1, 0.5, 1],
        }
    }
}

const AwardCard = ({ src, alt }: { src: string, alt: string }) => (
    <div className="flex-shrink-0 mx-4">
        <div className="bg-white p-4 rounded-xl border-[3px] border-yellow-400 w-[200px] h-[390px] flex items-center justify-center">
             <Image src={src} alt={alt} width={120} height={120} className="object-contain max-h-full" />
        </div>
    </div>
);

export default function AwardsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Duplicate for seamless loop
  const extendedAwards = [...awards, ...awards];

  return (
    <motion.section
        ref={ref}
        className="bg-[#fff9e6] pt-[2%] pb-16 overflow-hidden"
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
    >
        <div className="relative flex">
            <motion.div
                className="flex"
                variants={marqueeVariants}
                animate="animate"
            >
                {extendedAwards.map((award, index) => (
                    <AwardCard key={index} src={award.src} alt={award.alt} />
                ))}
            </motion.div>
        </div>
    </motion.section>
  );
}
