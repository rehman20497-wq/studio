
"use client";

import { motion } from 'framer-motion';

const TestimonialProgressBar = ({ 
    duration, 
    totalItems, 
    currentIndex, 
    setIndex 
}: { 
    duration: number; 
    totalItems: number;
    currentIndex: number;
    setIndex: (index: number) => void;
}) => {
  const segments = Array.from({ length: totalItems });
  const barWidth = ((currentIndex / totalItems) * 100);

  return (
    <div className="w-full">
      <div 
        className="relative h-2 w-full rounded-full bg-zinc-200 cursor-pointer flex"
        onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const newIndex = Math.floor((clickX / rect.width) * totalItems);
            setIndex(newIndex);
        }}
    >
        {segments.map((_, i) => (
            <div key={i} className="flex-1 relative h-full">
                {i < currentIndex && <div className="absolute inset-0 bg-black rounded-full" />}
                 {i > 0 && (
                    <div
                        className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full border-2 border-zinc-300 z-10"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIndex(i);
                        }}
                    >
                         {i <= currentIndex && <div className="w-full h-full bg-black rounded-full border-2 border-white"/>}
                    </div>
                )}
            </div>
        ))}
        <motion.div
            className="absolute top-0 left-0 h-full bg-black rounded-full"
            style={{ width: `${(1 / totalItems) * 100}%`, left: `${barWidth}%` }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1, originX: 0 }}
            transition={{ duration: duration / 1000, ease: 'linear' }}
        />
      </div>
    </div>
  );
};

export default TestimonialProgressBar;
