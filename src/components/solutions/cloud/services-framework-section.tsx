'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const cardData = [
  {
    icon: '/ic.svg',
    title: 'Client Services',
    items: [
      'Live Chat Support Outsourcing',
      'Call Center Outsourcing',
      'Ecommerce Support',
      'Technical Support',
      'App User & Platform Support',
      'Social Media Customer Service',
      'Onshore & Offshore Customer Service',
    ],
  },
  {
    icon: '/ic1.svg',
    title: 'Omnichannel Support',
    items: [
      'Email',
      'Chatbot',
      'Live Chat',
      'Phone',
      'SMS',
      'Social Media',
      'In-App Messaging',
    ],
  },
  {
    icon: '/ic2.svg',
    title: 'Services Framework',
    items: [
      'Month-to-Month Pricing',
      '365/24/7 coverage in 60+ languages',
      'AI-enabled helpdesk solutions',
      'Onboarding, Management, QA, Training, WFM included',
      'Team lead(s) included',
      'Seasonal & Holiday Support Included',
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const decorativeBgVariants = {
  hidden: { opacity: 0, scale: 0.9, rotate: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 4,
    transition: {
      delay: 0.5,
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const ServiceCard = ({ card }: { card: (typeof cardData)[0] }) => (
  <motion.div className="relative" variants={cardItemVariants}>
    {/* Decorative circle background, hidden on small devices */}
    <motion.div
      className="hidden md:block absolute bg-[#0badbf] rounded-2xl overflow-hidden"
      style={{
        width: '280px',
        height: '330px',
        top: '4%',
        left: '31%',
      }}
      variants={decorativeBgVariants}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="opacity-40">
        <defs>
          <pattern id="circle-pattern" patternUnits="userSpaceOnUse" width="100" height="100">
            <circle cx="50" cy="50" r="47" stroke="#abe9ef" strokeWidth="12" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circle-pattern)" />
      </svg>
    </motion.div>

    <div
  className="relative bg-white rounded-2xl p-8 h-full border-[6px]"
  style={{
    borderColor: '#f7edcf',
    boxShadow: 'none',
  }}
>

      <div className="flex items-center mb-2">
        <div className="w-12 h-12 bg-cyan-100 rounded-full flex-shrink-0" />
        <Image
          src={card.icon}
          alt={card.title}
          width={50}
          height={50}
          className="-ml-8"
          style={{ height: 'auto' }}
        />
      </div>
      <h3 className="text-[20px] font-bold text-zinc-900 mb-2">{card.title}</h3>
      <ul className="space-y-[0px] text-zinc-700 text-[13px]">
        {card.items.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="text-black mr-3 mt-1.5">&#8226;</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

export default function ServicesFrameworkSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="pt-[1%] pb-24 bg-[#FFF8E6] px-[3%]">
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-[1%] md:gap-16"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {cardData.map((card) => (
          <ServiceCard key={card.title} card={card} />
        ))}
      </motion.div>
    </section>
  );
}
