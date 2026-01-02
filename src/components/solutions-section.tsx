
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
        'relative bg-white rounded-2xl p-8 h-full flex flex-col text-center items-center shadow-lg border-2 border-opacity-60 min-h-[420px]',
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

const DashedLine = ({ className, delay = 0 }: { className: string; delay?: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const [isDrawn, setIsDrawn] = useState(false);

    useEffect(() => {
        if (isInView) {
            const timer = setTimeout(() => setIsDrawn(true), (delay + 1) * 1000); // Wait for draw-in animation
            return () => clearTimeout(timer);
        }
    }, [isInView, delay]);

    return (
        <svg ref={ref} className={cn("absolute -top-10 w-48 h-20 text-black/50", className)} viewBox="0 0 200 80">
            <motion.path
                d="M 10,70 C 50,10 150,10 190,70"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray="10 10"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 1, ease: 'easeInOut', delay }}
            />
            {isDrawn && (
                 <path
                    d="M 10,70 C 50,10 150,10 190,70"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeDasharray="10 10"
                    strokeLinecap="round"
                    className="animate-marching-ants"
                />
            )}
        </svg>
    )
}

export default function SolutionsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="bg-cream py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <DashedLine className="left-1/4 -translate-x-1/2 hidden lg:block" delay={0} />
          <DashedLine className="left-1/2 -translate-x-1/2 hidden lg:block" delay={0.2} />
          <DashedLine className="left-3/4 -translate-x-1/2 hidden lg:block" delay={0.4} />
           <DashedLine className="bottom-[-6.5rem] left-[37.5%] -translate-x-1/2 hidden lg:block rotate-180" delay={0.6} />
          <DashedLine className="bottom-[-6.5rem] left-[62.5%] -translate-x-1/2 hidden lg:block rotate-180" delay={0.8} />
          
          {solutions.map((solution) => (
            <SolutionCard key={solution.title} {...solution} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
