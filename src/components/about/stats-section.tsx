
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  {
    value: '4,500+',
    label: 'Employees Worldwide & 250K vetted Professionals in our HugoSphere (SM)',
    color: 'text-cyan-500',
    borderColor: 'border-cyan-200',
  },
  {
    value: '98%',
    label: 'Retention Rate',
    color: 'text-green-500',
    borderColor: 'border-green-200',
  },
  {
    value: '65%',
    label: 'Female Workforce',
    color: 'text-purple-500',
    borderColor: 'border-purple-200',
  },
  {
    value: '30%',
    label: 'More cost-effective than outsourcing in India & Philippines',
    color: 'text-red-500',
    borderColor: 'border-red-200',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.5, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="bg-[#FCFBF8] py-24 px-4 sm:px-8">
      <motion.div
        className="max-w-none mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className={`bg-white p-8 rounded-2xl shadow-sm border ${stat.borderColor}`}
            variants={cardVariants}
          >
            <p className={`text-6xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="mt-4 text-zinc-600 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
