'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import MagneticButton from '@/components/magnetic-button';
 
const cardData = [
  {
    icon: '/e.svg',
    title: 'Top 1% of Talent',
    description: "Our connectivity specialists are industry-certified professionals with deep technical knowledge. This ensures that your networks—whether WAN, LAN, or cloud-integrated—are designed, deployed, and managed with precision.",
  },
  {
    icon: '/d.svg',
    title: 'Domain Expertise',
    description: "From enterprise-grade broadband to global MPLS networks, Telsys engineers bring specialized knowledge to every project. We prioritize context, reliability, and efficiency in every connection we deliver.",
  },
  {
    icon: '/q.svg',
    title: 'A Quality Fixation',
    description: "Every network—whether for connectivity, cloud integration, or unified communications—is planned, implemented, and monitored against strict SLAs and KPIs using advanced analytics dashboards to ensure optimal performance and uptime.",
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

const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut', delay: 1.0 },
    },
  };

export default function OurApproachSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      ref={ref}
      className="py-6 px-[4%] mx-[4%] bg-[#fed9d2]"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.div className="inline-block relative mb-4" variants={textVariants}>
            <h3 className="text-[23px] font-normal text-zinc-800">
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
          Adaptive Expertise
        </motion.h2>
        <motion.p className="text-bodySm
  sm:text-bodyMd
  lg:text-bodylg  text-black  max-w-3xl mx-auto mb-8" variants={textVariants}>
Reliable connectivity starts with the right expertise. At Telsys, we combine cutting-edge technology with skilled engineers to deliver seamless, high-performance connectivity solutions tailored to your business needs.        </motion.p>

        <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={cardContainerVariants}
        >
          {cardData.map((card, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-2xl border-4 border-[#ff8f82] text-center"
              variants={cardVariants}
            >
              <div className="flex justify-center mb-6 h-16">
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
