'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { Cloud, Cpu, Wifi, Zap } from 'lucide-react';
import MagneticButton from '../magnetic-button';
import { useFirestore, updateDocumentNonBlocking } from '@/firebase';
import { doc, increment } from 'firebase/firestore';
import { cn } from '@/lib/utils';


const solutionMap = {
  'Cloud Solutions': { name: 'Cloud Solutions', icon: Cloud, color: 'bg-blue-100 text-blue-800' },
  'Communications': { name: 'Communications', icon: Wifi, color: 'bg-green-100 text-green-800' },
  'AI Solutions': { name: 'AI Solutions', icon: Cpu, color: 'bg-purple-100 text-purple-800' },
  'Connectivity': { name: 'Connectivity', icon: Zap, color: 'bg-orange-100 text-orange-800' },
};

type SolutionKey = keyof typeof solutionMap;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const tagsVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.5,
        }
    }
}

const tagVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
};


const bannerVariants = {
  hidden: { opacity: 0, x: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

interface DetailsProps {
  providerId: string;
  solutions: string[];
  description: string;
  bannerImage: string;
}

export default function Details({ providerId, solutions, description, bannerImage }: DetailsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const firestore = useFirestore();

  const handleLearnMoreClick = () => {
    if (firestore && providerId) {
      const docRef = doc(firestore, 'providers', providerId);
      updateDocumentNonBlocking(docRef, {
        clicks: increment(1)
      });
      // Optionally, navigate to an external link if one exists for the provider
    }
  };

  return (
    <section ref={ref} className="bg-[#FCFBF8] py-0 px-[3%]">
      <motion.div
        className="grid md:grid-cols-12 gap-16 items-start"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.div className="md:col-span-8" variants={textVariants}>
          <motion.div className="flex flex-wrap gap-3 mb-6" variants={tagsVariants}>
            {solutions.map((sol) => {
              const solutionInfo = solutionMap[sol as SolutionKey];
              if (!solutionInfo) return null;
              const Icon = solutionInfo.icon;
              return (
                <motion.div
                  key={sol}
                  variants={tagVariants}
                  className={`flex items-center gap-2 py-2 px-4 rounded-full text-sm font-semibold ${solutionInfo.color}`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{solutionInfo.name}</span>
                </motion.div>
              );
            })}
          </motion.div>
          <div
            className="prose max-w-none text-lg text-zinc-600 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0, transition: { delay: 1, duration: 0.8 } } : {}}
            onClick={handleLearnMoreClick}
          >
            <MagneticButton>
              <span className="text-[15px] font-medium px-4">Learn More</span>
            </MagneticButton>
          </motion.div>
        </motion.div>
        
        <motion.div className="relative h-96 md:col-span-4" variants={bannerVariants}>
          <Image
            src={bannerImage}
            alt="Provider details banner"
            fill
            className="object-cover rounded-2xl shadow-xl"
            data-ai-hint="corporate office"
            sizes="(max-width: 768px) 100vw, 35vw"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
