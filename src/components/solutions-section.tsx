

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

const AnimatedBorder = ({ radius = 24 }: { radius?: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.6, once: true });

    return (
        <>
          {isInView && (
            <svg
                className="absolute inset-0 pointer-events-none"
                width="100%"
                height="100%"
                ref={ref}
            >
                <rect
                    x="1"
                    y="1"
                    width="calc(100% - 2px)"
                    height="calc(100% - 2px)"
                    rx={radius}
                    ry={radius}
                    fill="none"
                    stroke="url(#borderGlow)"
                    strokeWidth="2"
                    strokeDasharray="1 200"
                >
                    <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="-201"
                    dur="2.5s"
                    repeatCount="indefinite"
                    />
                </rect>

                <defs>
                    <linearGradient id="borderGlow" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="50%" stopColor="white" />
                    <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                </defs>
            </svg>
          )}
        </>
    )
};


const SolutionCard = ({ icon, title, description, color }: (typeof solutions)[0]) => {
  return (
    <motion.div
      variants={cardVariants}
      className={cn(
        'relative bg-white rounded-2xl p-8 h-full flex flex-col text-center items-center shadow-lg border-2 border-opacity-60 overflow-hidden min-h-[450px] group',
        color
      )}
    >
      <AnimatedBorder radius={24} />
      <div className="mb-6 flex items-center justify-center">{icon}</div>
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
              strokeDashoffset={200}
              strokeLinecap="round"
              animate={
                isInView
                  ? {
                      strokeDashoffset: [200, 0, -20],
                    }
                  : {}
              }
              transition={{
                duration: 10,
                ease: 'linear',
                delay,
                repeat: Infinity,
                repeatType: 'loop',
              }}
            />
        </svg>
    )
}

export default function SolutionsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="bg-cream pt-[2%] pb-24 px-[4%] overflow-hidden">
      <div className="mx-auto">
        <motion.div
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <DashedLine className="absolute -top-10 left-[25%] -translate-x-1/2 w-1/4 hidden lg:block" path="M 10,70 C 50,10 150,10 190,70" viewBox="0 0 200 80"/>
          <DashedLine className="absolute -bottom-12 left-[50%] -translate-x-1/2 w-1/4 hidden lg:block" path="M 10,10 C 50,70 150,70 190,10" viewBox="0 0 200 80"/>
          <DashedLine className="absolute -top-10 left-[75%] -translate-x-1/2 w-1/4 hidden lg:block" path="M 10,70 C 50,10 150,10 190,70" viewBox="0 0 200 80"/>
          
          {solutions.map((solution) => (
            <SolutionCard key={solution.title} {...solution} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
