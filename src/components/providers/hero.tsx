'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

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

const iconBoxVariants = {
    hidden: { opacity: 0, x: 50, y: -50, scale: 0.8 },
    visible: {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        transition: {
            type: 'spring',
            damping: 15,
            stiffness: 80,
            delay: 1.5,
        }
    }
}


export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section ref={ref} className="relative bg-black min-h-[90vh] flex items-center justify-center p-8 overflow-hidden m-[4%] rounded-2xl">
      <motion.div
        className="absolute inset-0"
        variants={bgVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <Image
          src="https://picsum.photos/seed/provider/1600/900"
          alt="Cloud solutions and connectivity"
          fill
          className="object-cover opacity-40"
          data-ai-hint="cloud solutions connectivity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </motion.div>

      <motion.div
        className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-6xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Main Card */}
        <motion.div
          className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-2xl relative"
          variants={mainCardVariants}
        >
          <motion.div variants={textContentVariants}>
            <div className="flex justify-between items-start">
              <motion.div variants={textItemVariants} className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Image src="/arrow-down.gif" alt="icon" width={40} height={40} unoptimized />
              </motion.div>
              <motion.div variants={textItemVariants}>
                <ArrowUpRight className="w-8 h-8 text-zinc-500" />
              </motion.div>
            </div>
            
            <motion.h1 className="text-5xl font-bold text-zinc-900 mt-4" variants={textItemVariants}>
              Providers
            </motion.h1>

            <motion.p className="mt-4 text-zinc-700" variants={textItemVariants}>
              Scale your operations with expert outsourcing support.
            </motion.p>

            <motion.p className="mt-4 text-zinc-600 text-sm leading-6" variants={textItemVariants}>
                We specialize in outsourced customer support solutions for provider companies, helping brands deliver exceptional customer experiences at scale.
            </motion.p>
            
            <motion.div className="mt-8" variants={textItemVariants}>
              <Button className="bg-black text-white rounded-full px-6 hover:bg-zinc-800">
                Book a Meeting
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Icon Box */}
        <motion.div 
            className="relative self-start mt-8 md:mt-0"
            variants={iconBoxVariants}
        >
            <div className="relative bg-yellow-100/90 backdrop-blur-sm p-6 rounded-2xl">
                 <p className="text-zinc-800 leading-relaxed">
                    Outsourced talent helping provider companies exceed user expectations, strengthen retention, and accelerate growth.
                </p>

                <div className="absolute -bottom-2 -right-2 w-2/5 h-1/3 border-b-4 border-r-4 border-yellow-400 rounded-br-2xl" />
            </div>

            <div 
                className={cn(
                    'absolute -inset-2 -z-10 bg-yellow-400 rounded-2xl transition-transform duration-500 ease-in-out',
                    isInView ? 'translate-x-3 translate-y-3' : 'translate-x-0 translate-y-0'
                )}
            />
        </motion.div>

      </motion.div>
    </section>
  );
}
