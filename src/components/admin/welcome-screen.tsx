'use client';

import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.5,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -90, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 200,
    },
  },
};

export default function WelcomeScreen({ name }: { name: string }) {
  const welcomeText = `Welcome, ${name}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-yellow-200 via-amber-400 to-orange-500"
        initial={{ backgroundSize: '200% 200%', backgroundPosition: '0% 50%' }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 8,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>
      <motion.h1
        className="text-5xl md:text-7xl font-bold text-white text-center font-headline"
        style={{
          textShadow: '0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.5), 0 0 30px rgba(255,165,0,0.7)',
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {welcomeText.split('').map((char, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            className="inline-block"
            style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
}
