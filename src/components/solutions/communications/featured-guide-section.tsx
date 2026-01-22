'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import MagneticButton from '@/components/magnetic-button';

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const contentContainerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.5,
        }
    }
}

const textItemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: [0.25, 1, 0.5, 1]
        }
    }
}

const imageContainerVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.9 },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            duration: 1,
            ease: [0.25, 1, 0.5, 1],
            delay: 0.8
        }
    }
}

const CirclePattern = () => {
    return (
        <div className="absolute inset-0 z-0 opacity-50">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="circlePatternComms" patternUnits="userSpaceOnUse" width="80" height="80" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="35" fill="none" stroke="#8ee167" strokeWidth="8"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#circlePatternComms)" />
            </svg>
        </div>
    )
}

export default function FeaturedGuideSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <motion.section 
            ref={ref}
            className="relative bg-[#a4e687] py-[7%] px-[4%]"
            variants={sectionVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
        >
            {/* Top Curve */}
            <div className="absolute top-0 left-0 w-full h-[150px] text-white pointer-events-none z-10">
                <svg viewBox="0 0 1440 150" preserveAspectRatio="none" className="w-full h-full">
                    <motion.path 
                        d="M0,150 C240,60 480,0 720,0 C960,0 1200,60 1440,150 L1440,0 L0,0 Z" 
                        fill="currentColor"
                        initial={{ y: -150 }}
                        animate={isInView ? { y: 0 } : {}}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                </svg>
            </div>

            {/* Bottom Curve */}
             <div className="absolute bottom-0 left-0 w-full h-[150px] text-white pointer-events-none z-10">
                <svg viewBox="0 0 1440 150" preserveAspectRatio="none" className="w-full h-full">
                    <motion.path 
                        d="M0,100 C480,50 960,50 1440,100 L1440,150 L0,150 Z"
                        fill="currentColor"
                        initial={{ y: 150 }}
                        animate={isInView ? { y: 0 } : {}}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                </svg>
            </div>


            <motion.div 
                className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center"
                variants={contentContainerVariants}
            >
                {/* Left Content */}
                <div className="text-black">
                    <motion.h3 className="text-lg font-semibold relative inline-block pb-1" variants={textItemVariants}>
                        Featured Guide
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />
                    </motion.h3>
                    <motion.h2 className="text-5xl font-normal mt-4" variants={textItemVariants}>
                        Mastering Digital Transformation for Peak Business Performance
                    </motion.h2>
                    <motion.p className="mt-6 text-lg" variants={textItemVariants}>
                        Uncover how to elevate business performance through digital transformation, integrating technology with strategy, enhancing collaboration, and driving innovation for a competitive advantage.
                    </motion.p>
                    <motion.div className="mt-8" variants={textItemVariants}>
                        <MagneticButton>
                            <span className="text-base font-bold">Read Guide Here</span>
                        </MagneticButton>
                    </motion.div>
                </div>

                {/* Right Content */}
                <motion.div className="relative h-[350px]" variants={imageContainerVariants}>
                    <div className="absolute -top-4 -right-4 w-full h-full rounded-2xl overflow-hidden bg-[#4ab01b]">
                         <CirclePattern />
                    </div>
                    <div className="relative w-full h-full rounded-2xl border-4 border-[#ff8f82] p-4 bg-white/10 backdrop-blur-sm shadow-2xl">
                         <Image 
                            src="https://picsum.photos/seed/digital-transformation/800/600"
                            alt="Digital transformation in an office"
                            fill
                            className="object-cover rounded-lg"
                            data-ai-hint="digital transformation office"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </motion.section>
    );
}
