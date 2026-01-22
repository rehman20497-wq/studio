'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const cardData = [
  {
    icon: '/exp.svg',
    title: 'Expertise from Experience',
    description: 'With over 10 million hours in outsourced digital operations, Hugo has helped leading brands scale platforms with confidence. Trust us to get you there. Our clients already do.',
  },
  {
    icon: '/proc.svg',
    title: 'Process Rigor',
    description: 'You have systems in place for a reason. From day 1, we obsessively adhere to your processes, refine and streamline them, or help construct new ways of doing things.',
  },
  {
    icon: '/smoo.svg',
    title: 'Smooth Operations',
    description: "We integrate with your tech stack, drive efficiency across your workflows, and implement a rigorous, multilevel QA process that doesn't sacrifice speed for accuracy.",
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
      className="py-24 px-[4%] bg-[#cdf0bd]"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.div className="inline-block relative mb-4" variants={textVariants}>
            <h3 className="text-lg font-normal text-zinc-800">
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

        <motion.h2 className="text-5xl font-normal text-black mb-6 font-headline" variants={textVariants}>
          Meticulous & Process-Driven
        </motion.h2>
        <motion.p className="text-lg text-zinc-700 max-w-3xl mx-auto mb-8" variants={textVariants}>
          Hugo's outsourcing solutions cover everything from Shopify back-end management and supply chain support to identity verification, claims processing, and sales support. We bring precision and consistency to the processes that keep your business moving.
        </motion.p>

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
              <h3 className="text-2xl font-bold text-black mb-4">{card.title}</h3>
              <p className="text-zinc-600 leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
