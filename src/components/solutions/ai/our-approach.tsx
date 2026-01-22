'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const cardData = [
  {
    icon: '/cont.svg',
    title: 'Contextual Fluency',
    description: 'Our teams possess deep domain knowledge, understanding the nuances of your industry to provide accurate and context-aware support.',
  },
  {
    icon: '/sys.svg',
    title: 'Systems Thinking',
    description: 'We analyze the bigger picture, identifying patterns and systemic issues to recommend process improvements that prevent future problems.',
  },
  {
    icon: '/man.svg',
    title: '‘Man + Machine’',
    description: "We combine human expertise with AI-powered tools to enhance efficiency, accuracy, and scalability, delivering a superior service.",
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
      className="py-6 px-[4%] mx-[4%] bg-[#ebdaff]"
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

        <motion.h2 className="text-5xl font-normal text-black mb-6 font-headline" variants={textVariants}>
          Proactive & Responsive
        </motion.h2>
        <motion.p className="text-lg text-zinc-700 max-w-3xl mx-auto mb-8" variants={textVariants}>
          From fraud detection, financial crimes prevention, and trust & safety operations to content moderation and community management, Hugo delivers scalable virtual call center expertise designed to safeguard every customer touchpoint. We lead in early detection, risk mitigation, and system-wide remediation for industries including Fintech, EdTech, SaaS, and Gaming.
        </motion.p>

        <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={cardContainerVariants}
        >
          {cardData.map((card, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-2xl border-4 border-purple-200 text-center"
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