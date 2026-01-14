
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
        scale: 1, 
        opacity: 1,
        transition: {
            type: 'spring',
            damping: 15,
            stiffness: 100
        }
    },
};

export default function AbstractCircles() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const circleRadius = 70;
    const strokeWidth = 5;
    const spacing = 10;
    const gridSize = 5;

    const totalRadius = circleRadius + strokeWidth / 2;
    const boxSize = totalRadius * 2 + spacing;
    
    const circles = Array.from({ length: 25 }).map((_, i) => {
        const row = Math.floor(i / gridSize);
        const col = i % gridSize;
        const x = col * boxSize + boxSize / 2 + (Math.random() - 0.5) * 20;
        const y = row * boxSize + boxSize / 2 + (Math.random() - 0.5) * 20;
        return { x, y };
    });

  return (
    <motion.div
      ref={ref}
      className="w-full h-full flex items-center justify-center"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <svg viewBox={`0 0 ${boxSize * gridSize} ${boxSize * gridSize}`} className="w-full max-w-2xl aspect-square">
        {circles.map((circle, i) => (
          <motion.circle
            key={i}
            cx={circle.x}
            cy={circle.y}
            r={circleRadius}
            fill="none"
            stroke="#f9f4e6"
            strokeWidth={strokeWidth}
            variants={circleVariants}
          />
        ))}
      </svg>
    </motion.div>
  );
}
