
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import MagneticButton from '@/components/magnetic-button';

const cardData = [
  {
    icon: '/icon.svg',
    bgColor: 'bg-purple-200',
    title: '24/7/365 Coverage',
    description: 'Always-on global teams ensure your customers are supported around the clock without gaps or handoffs.',
  },
  {
    icon: '/icon1.svg',
    bgColor: 'bg-green-200',
    title: 'End-to-End Customer Journey',
    description: 'From onboarding to retention, we manage every touchpoint with training, QA, WFM, and performance baked in.',
  },
  {
    icon: '/icon2.svg',
    bgColor: 'bg-red-200',
    title: 'Every Channel, Seamlessly',
    description: 'Voice, chat, email, social, and in-app support delivered as one unified customer experience.',
  },
  {
    icon: '/icon3.svg',
    bgColor: 'bg-blue-200',
    title: '60+ Languages, Native Fluency',
    description: 'University-educated, multilingual agents provide culturally fluent support at global scale.',
  },
  {
    icon: '/icon4.svg',
    bgColor: 'bg-yellow-200',
    title: 'University-Educated Teams',
    description: 'Every Telesys teammate is a full-time university graduate with 3+ years of CX experience, selected for judgment, empathy, and culture fit.',
  },
  {
    icon: '/icon5.svg',
    bgColor: 'bg-green-200',
    title: 'Fully Managed Teams',
    description: 'Dedicated full-time teams plug directly into your tools, KPIs, and workflows with zero friction.',
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
    className="bg-white p-8 rounded-2xl border border-black flex flex-col h-full"
  >
    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${card.bgColor} mb-6`}>
      <Image src={card.icon} alt="" width={32} height={32} />
    </div>
    <h3 className="text-xl font-bold text-zinc-900 mb-2">{card.title}</h3>
    <p className="text-base text-zinc-700 leading-relaxed">{card.description}</p>
  </motion.div>
);

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-24 px-4 bg-[#a2edf4]">
      <motion.div
        className="max-w-7xl mx-auto"
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
            <span className="text-base font-bold px-5">Connect with us</span>
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
