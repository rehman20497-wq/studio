'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Dancing_Script } from 'next/font/google';

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.4,
    },
  },
};

const letterVariants = {
  hidden: {
    opacity: 0,
    y: 80,
    rotateX: -90,
    scale: 0.3,
    filter: 'blur(20px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      damping: 10,
      stiffness: 160,
    },
  },
};

export default function WelcomeScreen({ name }: { name: string }) {
  const welcomeText = `Welcome, ${name}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* 🌌 Animated Aurora Galaxy Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          background:
            'linear-gradient(120deg, #ff9a9e, #fad0c4, #fbc2eb, #a18cd1, #84fab0, #8fd3f4, #c471ed)',
          backgroundSize: '500% 500%',
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[6px]" />

      {/* ✨ Floating particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-white/80"
          initial={{
            x: Math.random() * 1400 - 700,
            y: Math.random() * 900 - 450,
            opacity: 0.1,
          }}
          animate={{
            y: [null, Math.random() * -600],
            opacity: [0.1, 0.8, 0.1],
          }}
          transition={{
            duration: 6 + Math.random() * 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            filter: 'blur(2px)',
          }}
        />
      ))}

      {/* 💫 Glassmorphism Panel */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0, rotateX: -30 }}
        animate={{ scale: 1, opacity: 1, rotateX: 0 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        className="relative px-12 py-14 rounded-[2.5rem] bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_0_120px_rgba(255,255,255,0.25)]"
      >
        {/* Outer Glow */}
        <div className="absolute -inset-2 rounded-[2.7rem] bg-gradient-to-r from-pink-500/40 via-purple-500/40 to-cyan-500/40 blur-3xl opacity-70" />

        {/* ✨ Welcome Text */}
        <motion.h1
          className={`relative text-6xl md:text-8xl lg:text-9xl text-center text-white ${dancingScript.className}`}
          style={{
            textShadow: `
              0 0 10px rgba(255,255,255,0.8),
              0 0 20px rgba(255,182,193,0.8),
              0 0 40px rgba(255,105,180,0.9),
              0 0 80px rgba(138,43,226,1)
            `,
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
      </motion.div>
    </div>
  );
}
