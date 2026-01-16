'use client';

import { motion } from 'framer-motion';

const container = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.2,
        }
    }
}

const circle = {
    initial: {
        scale: 0,
        opacity: 0,
    },
    animate: {
        scale: [0, 1, 1.2],
        opacity: [0, 0.7, 0],
        transition: {
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 1,
        }
    }
}

export default function PageTransition() {
  return (
    <motion.div
      className="fixed inset-0 bg-[#0A0F1A] z-[80] flex items-center justify-center pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{
        delay: 2.0, // Total time loader is visible before fading
        duration: 0.5,
        ease: "easeOut",
      }}
    >
      <motion.div 
        className="relative w-48 h-48"
        variants={container}
        initial="initial"
        animate="animate"
      >
        {[...Array(4)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute inset-0 border-2 rounded-full"
                style={{
                    borderColor: 'hsl(var(--primary))',
                    boxShadow: '0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary))'
                }}
                variants={circle}
                transition={{
                    ...circle.animate.transition,
                    delay: i * 0.2,
                }}
            />
        ))}
      </motion.div>
    </motion.div>
  );
}
