
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { CheckIcon } from '../icons/baseline/check-icon';
import { HeartIcon } from '../icons/baseline/heart-icon';
import { CommitmentIcon } from '../icons/baseline/commitment-icon';
import { MagnifyingGlassIcon } from '../icons/baseline/magnifying-glass-icon';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const textVariants = {
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

const cardContainerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.3,
            delayChildren: 0.5,
        }
    }
}

const cardVariants = {
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

const pathVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: {
        duration: 1,
        ease: 'easeInOut',
      },
    },
  };

const cards = [
  {
    icon: <CheckIcon />,
    text: 'We get things done. We iterate & move faster than everyone else.',
    borderColor: 'border-cyan-400/50',
  },
  {
    icon: <HeartIcon />,
    text: "We put empathy into action at work—we invest in each individual's growth and meet them with compassion.",
    borderColor: 'border-green-400/50',
  },
  {
    icon: <CommitmentIcon />,
    text: 'We hold an unwavering commitment to delivering world-class quality and continuous improvement.',
    borderColor: 'border-purple-400/50',
  },
  {
    icon: <MagnifyingGlassIcon />,
    text: "Doing things the right way guides our decisions, even when it's the harder path.",
    borderColor: 'border-red-400/50',
  },
];

const DashedLine = ({ d, delay = 0 }: { d: string; delay?: number }) => (
    <motion.path
      d={d}
      fill="none"
      stroke="black"
      strokeWidth="2"
      strokeDasharray="5, 10"
      strokeLinecap="round"
      variants={pathVariants}
      custom={delay}
      transition={{ ...pathVariants.visible.transition, delay }}
    />
);

export default function BaselineSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="bg-[#FCFBF8] py-24 px-4">
      <motion.div
        className="max-w-5xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.h2
          className="text-5xl font-headline font-medium text-zinc-900"
          variants={textVariants}
        >
          Better is our baseline.
        </motion.h2>
        <motion.p
          className="mt-6 text-lg text-zinc-600 max-w-3xl mx-auto"
          variants={textVariants}
        >
          We are not just providing a better way to outsource, we're building a
          transformative workplace—one where 'better' drives our pursuit of
          excellence. We operate transparently, treat each other with
          compassion, and constantly streamline how we produce world-class
          work.
        </motion.p>
      </motion.div>

      <motion.div 
        className="relative max-w-7xl mx-auto mt-20"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <div className="absolute top-[-3rem] left-0 right-0 h-20">
            <svg width="100%" height="100%" viewBox="0 0 1100 80" preserveAspectRatio='none'>
                <motion.g initial="hidden" animate={isInView ? "visible" : "hidden"} variants={cardContainerVariants}>
                    <DashedLine d="M 120 70 C 180 10, 280 10, 340 70" delay={0.5} />
                    <DashedLine d="M 680 70 C 740 10, 840 10, 900 70" delay={1.1} />
                </motion.g>
            </svg>
        </div>

        <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-20"
            variants={cardContainerVariants}
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className={`bg-white rounded-2xl p-6 text-center flex flex-col items-center border-2 ${card.borderColor}`}
              variants={cardVariants}
            >
              <div className="w-24 h-24 mb-4 flex items-center justify-center">
                {card.icon}
              </div>
              <p className="text-zinc-700 text-sm leading-relaxed">
                {card.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

         <div className="absolute bottom-[-3rem] left-0 right-0 h-20">
            <svg width="100%" height="100%" viewBox="0 0 1100 80" preserveAspectRatio='none'>
                <motion.g initial="hidden" animate={isInView ? "visible" : "hidden"} variants={cardContainerVariants}>
                    <DashedLine d="M 400 10 C 460 70, 560 70, 620 10" delay={0.95} />
                </motion.g>
            </svg>
        </div>
      </motion.div>
    </section>
  );
}
