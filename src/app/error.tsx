'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import MagneticButton from '@/components/magnetic-button';
import Image from 'next/image';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.5 },
    },
};
  
const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const gearVariants = {
    animate: (i: number) => ({
        rotate: 360 * (i % 2 === 0 ? 1 : -1),
        transition: {
            duration: 10 + (i * 2),
            repeat: Infinity,
            ease: 'linear'
        }
    })
}

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-[#FCFBF8] min-h-[60vh] flex items-center justify-center text-center px-4 overflow-hidden">
        <motion.div 
            className="relative z-10 flex flex-col items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="relative w-48 h-48 mb-8">
                <motion.div 
                    custom={1}
                    variants={gearVariants}
                    animate="animate"
                    className="absolute top-0 left-0 w-24 h-24"
                >
                    <Image src="/tech.gif" alt="gear" width={96} height={96} unoptimized />
                </motion.div>
                <motion.div 
                    custom={2}
                    variants={gearVariants}
                    animate="animate"
                    className="absolute bottom-0 right-0 w-32 h-32"
                >
                        <Image src="/tech.gif" alt="gear" width={128} height={128} unoptimized />
                </motion.div>
            </div>
            
            <motion.h1 className="text-4xl md:text-5xl font-bold font-headline text-red-600" variants={itemVariants}>
                Oops! A Glitch in the Matrix.
            </motion.h1>

            <motion.p className="max-w-lg mt-4 text-zinc-600" variants={itemVariants}>
                Something went wrong while loading this part of the page. You can try again.
            </motion.p>
            
            <motion.div className="mt-12" variants={itemVariants}>
                <MagneticButton>
                    <button
                        onClick={() => reset()}
                        className="text-button font-semibold px-4"
                    >
                        Try Again
                    </button>
                </MagneticButton>
            </motion.div>
        </motion.div>
    </div>
  );
}
