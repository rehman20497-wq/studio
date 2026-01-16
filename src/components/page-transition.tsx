'use client';

import { motion } from 'framer-motion';

export default function PageTransition() {
  return (
    <motion.div
      className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[80] flex items-center justify-center pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{
        delay: 1.5,
        duration: 0.5,
        ease: "easeOut",
      }}
    >
      <motion.div
        className="w-16 h-16 border-4 border-white border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          ease: 'linear',
          repeat: Infinity,
        }}
      />
    </motion.div>
  );
}
