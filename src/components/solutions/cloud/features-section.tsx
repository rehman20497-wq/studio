
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import MagneticButton from '@/components/magnetic-button';

const cardData = [
  {
    icon: '/Real.svg',
    title: 'Scalable Infrastructure',
    description: 'Easily expand or reduce resources as your business grows, ensuring performance never slows down.',
  },
  {
    icon: '/Auto.svg',
    title: 'Secure Environment',
    description: 'Protect your critical data with enterprise-grade security, advanced encryption, and continuous monitoring.',
  },
  {
    icon: '/Data.svg',
    title: 'Cost-Optimized Cloud',
    description: 'Reduce IT expenses with efficient resource allocation and pay-asyou-grow models tailored to your needs.',
  },
  {
    icon: '/pport.svg',
    title: '24/7 Monitoring',
    description: 'Our team continuously monitors systems to prevent downtime and quickly address any issues.',
  },
  {
    icon: '/Medal.svg',
    title: 'Disaster Recovery',
    description: 'Reliable backup and fast recovery solutions keep your operations running smoothly even during unexpected events.',
  },
  {
    icon: '/Fraud.svg',
    title: 'Flexible Deployment',
    description: 'Choose public, private, or hybrid cloud architectures that align perfectly with your business strategy.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 80,
    },
  },
};

const FeatureCard = ({ card }: { card: (typeof cardData)[0] }) => (
  <motion.div 
    variants={itemVariants}
    className="bg-white p-8 rounded-2xl border-[4px] border-black flex flex-col h-full"
  >
    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${card.bgColor} mb-2`}>
      <Image src={card.icon} alt="" width={55} height={55} />
    </div>
    <h3 className="text-bodySm
  sm:text-bodyMd
  lg:text-bodylg font-bold text-black mb-2">{card.title}</h3>
    <p className="text-bodyySm
  sm:text-bodyyMd
  lg:text-bodyylg text-black leading-relaxed">{card.description}</p>
  </motion.div>
);


export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="relative pt-[0px] px-4 bg-[#a2edf4]">
      <motion.div
        className="max-w-7xl mx-auto pb-40"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cardData.map((card) => (
            <FeatureCard key={card.title} card={card} />
          ))}
        </div>
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0, transition: { delay: 1 } } : {}}
        >
          <MagneticButton>
            <span className="text-button font-bold px-5">Talk to an Expert</span>
          </MagneticButton>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full h-[160px] pointer-events-none">
  <svg className="w-full h-full" viewBox="0 0 1440 160" preserveAspectRatio="none">
    <path
      d="M0,150 C240,60 480,20 720,20 C960,20 1200,60 1440,150 L1440,160 L0,160 Z"
      fill="white"
    />
  </svg>
</div>

    </section>
  );
}
