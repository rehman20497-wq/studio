
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

const Particle = ({ i }: { i: number }) => {
    const randomY = -(Math.random() * 50 + 25);
    const randomX = Math.random() * 80 + 10;
    const randomDuration = Math.random() * 4 + 6;
    const randomDelay = Math.random() * 6;

    return (
        <motion.div 
            className="absolute w-0.5 h-40 bg-gradient-to-b from-transparent via-yellow-300 to-transparent"
            style={{
                left: `${randomX}%`,
            }}
            initial={{ y: '110vh', opacity: 0 }}
            animate={{
                y: `${randomY}vh`,
                opacity: [0, 1, 0],
            }}
            transition={{
                duration: randomDuration,
                delay: randomDelay,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'linear'
            }}
        />
    )
}

export default function Hero() {
  return (
    <section className="relative bg-zinc-900 text-white text-center py-40 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
            {Array.from({ length: 50 }).map((_, i) => (
                <Particle key={i} i={i} />
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
                style={{ textShadow: '0 0 30px rgba(252, 211, 77, 0.4)' }}
                variants={textVariants}
            >
                Get In Touch
            </motion.h1>
            <motion.p
                className="mt-6 text-lg text-zinc-300 max-w-2xl mx-auto"
                variants={textVariants}
            >
                Have a question, a project, or just want to say hello? We'd love to hear from you. Fill out the form below or use our contact details.
            </motion.p>
        </motion.div>
    </section>
  );
}
