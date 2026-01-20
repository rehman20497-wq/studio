'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const complianceData = [
  {
    icon: '/iso.png',
    line1: '27001:2013',
    line2: 'Certified Information',
    line3: 'Security Management',
  },
  {
    icon: '/io.png',
    line1: 'HIPAA Compliant',
    line2: 'Patient Rights Under',
    line3: 'HIPAA are Protected',
  },
  {
    icon: '/AIp.png',
    line1: 'AICPA',
    line2: 'SOC2 Fully Compliant',
    line3: '',
  },
  {
    icon: '/ccp.png',
    line1: 'California Consumer',
    line2: 'Privacy',
    line3: 'Fully Compliant',
  },
  {
    icon: '/gdpr.png',
    line1: 'GDPR',
    line2: '2018 General Data',
    line3: 'Protection Regulation',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const gridContainerVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 1, 0.5, 1],
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      },
    },
  };

const ComplianceItem = ({ item }: { item: (typeof complianceData)[0] }) => (
  <motion.div className="flex items-center gap-4" variants={itemVariants}>
    <Image src={item.icon} alt={item.line1} width={80} height={80} className="h-auto object-contain flex-shrink-0" />
    <div>
      <h3 className="text-base font-bold text-black">{item.line1}</h3>
      <p className="text-base font-normal text-black">{item.line2}</p>
      {item.line3 && <p className="text-base font-normal text-black">{item.line3}</p>}
    </div>
  </motion.div>
);

export default function ComplianceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      ref={ref}
      className="bg-white py-20 px-4"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="container mx-auto">
        <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-8 justify-items-center"
            variants={gridContainerVariants}
        >
          {complianceData.map((item, index) => (
            <ComplianceItem key={index} item={item} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
