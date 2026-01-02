
"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CustomerSupportIcon } from './icons/customer-support-icon';
import { DataAiIcon } from './icons/data-ai-icon';
import { TrustSafetyIcon } from './icons/trust-safety-icon';
import { DigitalOperationsIcon } from './icons/digital-operations-icon';

const solutions = [
  {
    icon: <CustomerSupportIcon />,
    title: 'Customer Support',
    description: "Across time zones, languages, cultures, and channels, we'll leave your customers feeling great about your brand...even if it's a bad day.",
    color: 'border-cyan-400',
  },
  {
    icon: <DataAiIcon />,
    title: 'Data & AI',
    description: 'Process and build with better, less biased, more accurate training data. You know your end product depends on it; we do too.',
    color: 'border-red-400',
  },
  {
    icon: <TrustSafetyIcon />,
    title: 'Trust & Safety',
    description: "Better compliance, higher engagement, and safer spaces. We'll keep your users playing by your rules.",
    color: 'border-purple-400',
  },
  {
    icon: <DigitalOperationsIcon />,
    title: 'Digital Operations',
    description: "Crash costs cut friction, and boost efficiency. We'll help you scale your operations faster and more profitably... and put years back on your life.",
    color: 'border-green-400',
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

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotate: 5 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
};

const SolutionCard = ({ icon, title, description, color }: (typeof solutions)[0]) => {
  return (
    <motion.div
      variants={cardVariants}
      className={cn(
        'relative bg-white rounded-2xl p-8 h-full flex flex-col text-center items-center shadow-lg border-2 border-opacity-60 min-h-[420px] border-glow',
        color
      )}
    >
      <div className="h-16 w-16 mb-6 flex items-center justify-center">{icon}</div>
      <h3 className="text-xl font-bold text-zinc-900 mb-4">{title}</h3>
      <p className="text-zinc-600 text-sm mb-8 flex-grow">{description}</p>
      <button className="bg-black text-white font-semibold py-2 px-6 rounded-full w-fit hover:bg-zinc-800 transition-colors">
        Learn More
      </button>
    </motion.div>
  );
};

const DashedLine = ({ className, delay = 0, path, viewBox }: { className: string; delay?: number, path: string, viewBox: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    
    return (
        <svg ref={ref} className={cn("absolute w-full h-20 text-black/50", className)} viewBox={viewBox} preserveAspectRatio="none">
            <motion.path
                d={path}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="10 10"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isInView ? { 
                  pathLength: 1,
                  strokeDashoffset: [20, 0]
                } : {}}
                transition={{
                    pathLength: { duration: 3.5, ease: 'easeInOut', delay },
                    strokeDashoffset: {
                      delay: delay + 3.5,
                      duration: 1,
                      repeat: Infinity,
                      repeatType: 'loop',
                      ease: 'linear',
                    },
                }}
            />
        </svg>
    )
}

export default function SolutionsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="bg-cream py-24 px-[4%] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <DashedLine className="-top-10 left-[25%] -translate-x-1/2 w-1/4 hidden lg:block" delay={0} path="M 10,70 C 50,10 150,10 190,70" viewBox="0 0 200 80"/>
          <DashedLine className="-bottom-12 left-[50%] -translate-x-1/2 w-1/4 hidden lg:block" delay={0.5} path="M 10,10 C 50,70 150,70 190,10" viewBox="0 0 200 80"/>
          <DashedLine className="-top-10 left-[75%] -translate-x-1/2 w-1/4 hidden lg:block" delay={1} path="M 10,70 C 50,10 150,10 190,70" viewBox="0 0 200 80"/>
          
          {solutions.map((solution) => (
            <SolutionCard key={solution.title} {...solution} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
