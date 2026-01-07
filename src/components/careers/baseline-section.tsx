'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

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

const cards = [
  {
    icon: '/check.svg',
    text: 'We get things done. We iterate & move faster than everyone else.',
    borderColor: 'border-cyan-400/50',
  },
  {
    icon: '/heart.svg',
    text: "We put empathy into action at work—we invest in each individual's growth and meet them with compassion.",
    borderColor: 'border-green-400/50',
  },
  {
    icon: '/doc.svg',
    text: 'We hold an unwavering commitment to delivering world-class quality and continuous improvement.',
    borderColor: 'border-purple-400/50',
  },
  {
    icon: '/search.svg',
    text: "Doing things the right way guides our decisions, even when it's the harder path.",
    borderColor: 'border-red-400/50',
  },
];

const DashedLine = ({ d, animate, reverse }: { d: string, animate: boolean, reverse?: boolean }) => (
    <motion.path
      d={d}
      fill="none"
      stroke="black"
      strokeWidth="2"
      strokeDasharray="5 10"
      strokeLinecap="round"
      className={animate ? 'marching-ants' : ''}
      style={{ animationDirection: reverse ? 'reverse' : 'normal' }}
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
        <div className="absolute -z-10 top-0 left-0 w-full h-full">
            <svg width="100%" height="100%" viewBox="0 0 1100 350" preserveAspectRatio='none'>
                <DashedLine d="M 130 130 C 200 -20, 380 -20, 450 130" animate={isInView} />
                <DashedLine d="M 450 220 C 520 370, 700 370, 770 220" animate={isInView} reverse />
                <DashedLine d="M 770 130 C 840 -20, 1020 -20, 1090 130" animate={isInView} />
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
                <Image src={card.icon} alt="" width={80} height={80} />
              </div>
              <p className="text-zinc-700 text-sm leading-relaxed">
                {card.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
