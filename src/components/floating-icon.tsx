
"use client";

import { motion } from 'framer-motion';

const FloatingIcon = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      className="p-2 rounded-full bg-white/50 backdrop-blur-sm shadow-lg"
      animate={{ rotate: [0, 2, -2, 2, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingIcon;
