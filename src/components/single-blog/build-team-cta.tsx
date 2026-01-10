'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import MagneticButton from '../magnetic-button';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1, 
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
        } 
    },
};

const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', damping: 15, stiffness: 100 } },
}


export default function BuildTeamCta() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    
    return (
        <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="relative text-center p-12 rounded-2xl overflow-hidden mt-16"
        >
            <div className="absolute inset-0 border-2 rounded-2xl border-transparent border-glow" />
            <motion.h2 
                className="text-4xl font-bold font-headline text-zinc-900"
                variants={textVariants}
            >
                Build your Dream Team
            </motion.h2>
            <motion.p 
                className="mt-4 text-zinc-600 max-w-md mx-auto"
                variants={textVariants}
            >
                We're not traditional outsourcers. We build world-class teams helping you scale faster and smarter.
            </motion.p>
            <motion.div 
                className="mt-8"
                variants={buttonVariants}
            >
                <MagneticButton>
                    <span className="text-base font-medium px-4">Get Started</span>
                </MagneticButton>
            </motion.div>
        </motion.div>
    );
}