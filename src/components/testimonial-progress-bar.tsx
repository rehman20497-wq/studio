"use client";

import { motion } from 'framer-motion';

const TestimonialProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="w-full">
      <div className="relative h-2 w-full rounded-full bg-[#F5D34A]">
        <motion.div
          className="absolute top-0 left-0 h-full bg-black rounded-full"
          style={{ width: `${progress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-black"
          style={{ left: `45%`, transform: 'translate(-50%, -50%)' }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-black"
          style={{ left: `75%`, transform: 'translate(-50%, -50%)' }}
        />
      </div>
    </div>
  );
};

export default TestimonialProgressBar;
