'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { Cloud, Cpu, Wifi, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import MagneticButton from '../magnetic-button';

const solutionData = {
  cloud: {
    title: 'Cloud Solutions',
    description: 'Empowering your business with scalable, secure, and reliable cloud infrastructure.',
    image: 'https://picsum.photos/seed/cloud-bg/1600/900',
    imageHint: 'data center servers',
    icon: Cloud,
  },
  communications: {
    title: 'Communications Solutions',
    description: 'Connecting your world with seamless, high-quality communication platforms.',
    image: 'https://picsum.photos/seed/comms-bg/1600/900',
    imageHint: 'communication network',
    icon: Wifi,
  },
  ai: {
    title: 'AI Solutions',
    description: 'Harnessing the power of Artificial Intelligence to drive innovation and efficiency.',
    image: 'https://picsum.photos/seed/ai-bg/1600/900',
    imageHint: 'abstract AI brain',
    icon: Cpu,
  },
  connectivity: {
    title: 'Connectivity Solutions',
    description: 'Delivering fast, stable, and secure connectivity to keep your business moving.',
    image: 'https://picsum.photos/seed/connect-bg/1600/900',
    imageHint: 'fiber optics',
    icon: Zap,
  },
};

type SolutionType = keyof typeof solutionData;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.5,
    },
  },
};

const bgVariants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const mainCardVariants = {
  hidden: { opacity: 0, y: 100, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.25, 1, 0.5, 1],
      delay: 0.4,
    },
  },
};

const textContentVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 1, // Delay children of the card
    },
  },
};

const textItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function Hero({ solutionType }: { solutionType: SolutionType }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const data = solutionData[solutionType] || solutionData.cloud;
  const Icon = data.icon;

  return (
    <section ref={ref} className="relative bg-black min-h-[90vh] flex items-center justify-center p-8 overflow-hidden mt-[1%] mx-[4%] mb-[4%] rounded-2xl">
      <motion.div
        className="absolute inset-0"
        variants={bgVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <Image
          src={data.image}
          alt={data.title}
          fill
          className="object-cover opacity-40"
          data-ai-hint={data.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </motion.div>

      <motion.div
        className="relative flex justify-center max-w-6xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.div
          className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-2xl relative max-w-2xl text-center"
          variants={mainCardVariants}
        >
          <motion.div variants={textContentVariants}>
            <motion.div variants={textItemVariants} className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Icon className="w-8 h-8 text-yellow-600" />
              </div>
            </motion.div>
            
            <motion.h1 className="text-5xl font-bold text-zinc-900 mt-4" variants={textItemVariants}>
              {data.title}
            </motion.h1>

            <motion.p className="mt-4 text-zinc-700" variants={textItemVariants}>
              {data.description}
            </motion.p>
            
            <motion.div className="mt-8" variants={textItemVariants}>
              <MagneticButton>
                  <span className="text-[15px] font-medium px-4">Get a Quote</span>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
