
'use client';

import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.5,
        },
    },
};

const textVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] },
    },
};

const GridParticle = () => {
    const randomDelay = Math.random() * 5;
    const randomDuration = Math.random() * 5 + 5;

    return (
        <motion.div 
            className="w-full h-full bg-cyan-300/30"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: 1 }}
            transition={{
                delay: randomDelay,
                duration: randomDuration,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeInOut'
            }}
        />
    )
}

export default function Hero() {
  return (
    <section className="relative bg-zinc-900 text-white text-center py-40 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0 grid grid-cols-20 grid-rows-10">
            {Array.from({ length: 200 }).map((_, i) => (
                <GridParticle key={i} />
            ))}
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/70 to-transparent z-10" />

        <motion.div
            className="relative z-20 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
        >
            <motion.h1
                className="text-8xl font-bold font-headline tracking-tighter"
                style={{ textShadow: '0 0 30px rgba(34, 211, 238, 0.4)' }}
                variants={textVariants}
            >
                Terms & Conditions
            </motion.h1>
            <motion.p
                className="mt-6 text-lg text-zinc-300 max-w-2xl mx-auto"
                variants={textVariants}
            >
                Please read these terms carefully before using our services. By accessing or using our website, you agree to be bound by these terms.
            </motion.p>
        </motion.div>
    </section>
  );
}
