
'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const awards = [
  { src: 'https://picsum.photos/seed/award1/150/100', alt: 'Clutch Top Company Award' },
  { src: 'https://picsum.photos/seed/award2/150/100', alt: 'Global Customer Service Training Company Award' },
  { src: 'https://picsum.photos/seed/award3/150/100', alt: 'Top BPO Company Award' },
  { src: 'https://picsum.photos/seed/award4/150/100', alt: 'Clutch Top Chat Support Services Company Award' },
  { src: 'https://picsum.photos/seed/award5/150/100', alt: 'Best in Industry Top Firm Award' },
  { src: 'https://picsum.photos/seed/award6/150/100', alt: 'Top BPO Company GoodFirms Award' },
  { src: 'https://picsum.photos/seed/award7/150/100', alt: 'Forrester Wave Leader Award' },
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
        <div className="bg-white p-4 rounded-xl border-[3px] border-yellow-400 w-48 h-36 flex items-center justify-center">
             <Image src={src} alt={alt} width={150} height={100} className="object-contain max-h-full" />
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
        className="bg-white py-16 overflow-hidden"
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
