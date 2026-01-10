
'use client';

import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        },
    },
};

const textVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(5px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 1, ease: [0.25, 1, 0.5, 1] },
    },
};

const Particle = ({ i }: { i: number }) => {
    const randomY = -(Math.random() * 50 + 25); // Start off-screen
    const randomX = Math.random() * 80 + 10;   // Spread across the width
    const randomDuration = Math.random() * 3 + 4;
    const randomDelay = Math.random() * 5;

    return (
        <motion.div
            className="absolute w-1 h-1 bg-yellow-300 rounded-full"
            style={{
                left: `${randomX}%`,
            }}
            initial={{ y: '100vh', opacity: 0 }}
            animate={{
                y: `${randomY}vh`,
                opacity: [0, 1, 0],
            }}
            transition={{
                duration: randomDuration,
                delay: randomDelay,
                repeat: Infinity,
                ease: "linear",
            }}
        />
    )
}

export default function FaqHero() {
  return (
    <section className="relative bg-zinc-900 text-white text-center py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
            {Array.from({ length: 50 }).map((_, i) => (
                <Particle key={i} i={i} />
            ))}
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent z-10" />

        <motion.div
            className="relative z-20 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
        >
            <motion.h1
                className="text-7xl font-bold font-headline"
                style={{ textShadow: '0 0 20px rgba(252, 211, 77, 0.3)' }}
                variants={textVariants}
            >
                Frequently Asked Questions
            </motion.h1>
            <motion.p
                className="mt-6 text-lg text-zinc-300 max-w-2xl mx-auto"
                variants={textVariants}
            >
                Have questions? We’ve got answers. Explore our FAQs to find the
                information you need about our services, processes, and how we can
                help you scale smarter.
            </motion.p>
        </motion.div>
    </section>
  );
}
