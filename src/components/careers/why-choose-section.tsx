
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

// Icons as separate components for clarity
const HealthcareIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SalaryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 1v22m-4-8h8m-8-4h8m4-4h-8a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TimeOffIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="16" y1="2" x2="16" y2="6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="8" y1="2" x2="8" y2="6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="3" y1="10" x2="21" y2="10" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const StipendsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const LearningIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="14 2 14 8 20 8" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="16" y1="13" x2="8" y2="13" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="16" y1="17" x2="8" y2="17" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="10 9 9 9 8 9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const EmployeeCareIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="9" y1="9" x2="9.01" y2="9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="15" y1="9" x2="15.01" y2="9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const benefits = [
  {
    icon: <HealthcareIcon />,
    title: 'Healthcare and retirement',
    description: 'Our comprehensive health plans and retirement savings options support your life in and outside work.',
  },
  {
    icon: <SalaryIcon />,
    title: 'Competitive salary & bonus',
    description: 'We offer generous, equitable compensation and value top performers through annual bonuses.',
  },
  {
    icon: <TimeOffIcon />,
    title: 'Paid time off',
    description: 'Recharge through generous vacation, sick days, holidays, and parental leave each year.',
  },
  {
    icon: <StipendsIcon />,
    title: 'Stipends & reimbursements',
    description: 'We offer monthly stipends and reimbursements to cover all the tools needed for remote work and effective collaboration.',
  },
  {
    icon: <LearningIcon />,
    title: 'Learning & development',
    description: 'Invest in yourself through unlimited access to world-class coaches, and specialized courses offered through Hugo Academy.',
  },
  {
    icon: <EmployeeCareIcon />,
    title: 'Integrated employee care',
    description: 'Our robust employee assistance program provides resources focused on mental health and wellbeing.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const headingVariants = {
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

const imageVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.5 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 0.3,
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

const boxContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.5,
    },
  },
};

const boxVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
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

export default function WhyChooseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="bg-[#FCFBF8] py-24 px-4">
      <motion.div
        className="max-w-6xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.div variants={imageVariants} className="relative w-16 h-16 mx-auto mb-2">
            <Image src="/arrow-down.gif" alt="arrow down" fill unoptimized />
        </motion.div>
        
        <motion.h2
          className="text-5xl font-headline font-medium text-zinc-900 relative inline-block"
          variants={headingVariants}
        >
          Why Choose Telesys
          <motion.svg
            className="absolute -bottom-1 left-0 w-full"
            height="8"
            viewBox="0 0 100 8"
            preserveAspectRatio="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.5, ease: 'easeOut' }}
          >
            <path d="M1 5C20 8, 80,8, 99 5" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round" />
          </motion.svg>
        </motion.h2>

        <motion.p
          className="mt-6 text-lg text-zinc-600"
          variants={headingVariants}
        >
          Better starts here.
        </motion.p>
      </motion.div>

      <motion.div
        className="max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
        variants={boxContainerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            className="text-center flex flex-col items-center"
            variants={boxVariants}
          >
            <div className="w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center mb-4">
              {benefit.icon}
            </div>
            <h3 className="text-xl font-semibold text-zinc-900 mb-2">{benefit.title}</h3>
            <p className="text-zinc-600 leading-relaxed">{benefit.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
