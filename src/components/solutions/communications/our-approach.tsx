'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const cardData = [
  {
    icon: '/exp.svg',
    title: 'Unified Communication Platforms',
    description: 'We resell leading unified communication solutions that bring voice, video, messaging, and collaboration into a single platform, enabling seamless teamwork across locations and devices.',
  },
  {
    icon: '/proc.svg',
    title: 'Cloud Voice & Telephony',
    description: 'Enterprise-grade cloud calling and telephony solutions designed for flexibility, scalability, and reliability, helping businesses reduce costs while improving call quality and control.',
  },
  {
    icon: '/smoo.svg',
    title: 'Customer Engagement Solutions',
    description: "Advanced communication tools that enhance customer interactions through intelligent routing, analytics, and omnichannel support, improving responsiveness and overall customer experience.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const cardContainerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2, delayChildren: 0.5 },
    },
  };

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 80,
    },
  },
};

const underlineVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: { duration: 1.5, ease: 'easeInOut', delay: 0.5 },
    },
  };

export default function OurApproachSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      ref={ref}
      className="py-6 px-[4%] mx-[4%] bg-[#cdf0bd]"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.div className="inline-block relative mb-4" variants={textVariants}>
            <h3 className="text-eyebrowSm
  sm:text-eyebrowMd
  lg:text-eyebrow font-normal text-black">
                Our Approach
            </h3>
            <motion.svg
                className="absolute -bottom-1 left-0 w-full h-2"
                viewBox="0 0 100 8"
                preserveAspectRatio="none"
            >
                <motion.path
                d="M 2,5 Q 25,2 48,5 T 98,5"
                fill="none"
                stroke="black"
                strokeWidth="3"
                strokeLinecap="round"
                variants={underlineVariants}
                />
            </motion.svg>
        </motion.div>

        <motion.h2 className="text-herooSm
  sm:text-herooMd
  lg:text-heroo font-normal text-black mb-6 font-headline" variants={textVariants}>
          Meticulous & Process-Driven
        </motion.h2>
        <motion.p className="text-bodySm
  sm:text-bodyMd
  lg:text-bodylg  text-black  max-w-3xl mx-auto mb-8" variants={textVariants}>
Telsys communication solutions offers Clear, reliable communication solutions—from cloud voice to unified platforms—designed to keep your teams connected and your business moving.        </motion.p>

        <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={cardContainerVariants}
        >
          {cardData.map((card, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-2xl border-4 border-[#b9e9ac] text-center"
              variants={cardVariants}
            >
              <div className="flex justify-center mb-6">
                <Image src={card.icon} alt={`${card.title} icon`} width={64} height={64} />
              </div>
              <h3 className="text-bodySm
  sm:text-bodyMd
  lg:text-bodylg font-bold text-black mb-4">{card.title}</h3>
              <p className="text-testimonialReview text-black leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
