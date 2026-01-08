'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { format } from 'date-fns';

const headerVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15,
      duration: 0.8,
      delay: 0.5,
    },
  },
};

const itemVariants = {
    hidden: { y: -20, opacity: 0},
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' }}
}

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 1,
        }
    }
}

export default function AdminHeader({ userName }: { userName: string }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = format(currentTime, "MMMM d, yyyy");
  const formattedTime = format(currentTime, "h:mm:ss a");

  return (
    <motion.header
      className="bg-white/70 backdrop-blur-lg rounded-xl p-4 px-6 flex justify-between items-center shadow-md border border-zinc-200/80"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <motion.h1 className="text-2xl font-bold font-headline text-zinc-900" variants={itemVariants}>
          Welcome back, {userName}!
        </motion.h1>
        <motion.p className="text-sm text-zinc-500 mt-1" variants={itemVariants}>
          Dashboard Overview
        </motion.p>
      </motion.div>

      <motion.div 
        className="flex items-center gap-6 text-sm"
        variants={containerVariants} 
        initial="hidden" 
        animate="visible"
      >
        <motion.div className="flex items-center gap-3 text-zinc-600" variants={itemVariants}>
          <Sun className="w-5 h-5 text-yellow-500" />
          <span>{formattedDate}</span>
          <Moon className="w-5 h-5 text-blue-800" />
        </motion.div>
        <motion.div className="flex items-center gap-2 text-zinc-600 font-mono" variants={itemVariants}>
          <span>{formattedTime}</span>
        </motion.div>
      </motion.div>
    </motion.header>
  );
}
