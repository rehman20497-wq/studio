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
    const circleRadius = 25;
    const strokeWidth = 8;
    const spacing = 0; // No gap

    const totalRadius = circleRadius + strokeWidth / 2;
    const boxSize = totalRadius * 2 + spacing;
    
    const circles = [];

    // Row 0: 3 circles on the right
    for (let i = 0; i < 3; i++) {
        circles.push({
            x: (i + 2) * boxSize + boxSize / 2,
            y: 0 * boxSize + boxSize / 2,
        });
    }

    // Row 1: 4 circles on the left
    for (let i = 0; i < 4; i++) {
        circles.push({
            x: i * boxSize + boxSize / 2,
            y: 1 * boxSize + boxSize / 2,
        });
    }

    // Row 2: 5 circles (full row)
    for (let i = 0; i < 5; i++) {
        circles.push({
            x: i * boxSize + boxSize / 2,
            y: 2 * boxSize + boxSize / 2,
        });
    }

    // Row 3: 4 circles on the right
    for (let i = 0; i < 4; i++) {
        circles.push({
            x: (i + 1) * boxSize + boxSize / 2,
            y: 3 * boxSize + boxSize / 2,
        });
    }

    // Row 4: 5 circles (full row)
    for (let i = 0; i < 5; i++) {
        circles.push({
            x: i * boxSize + boxSize / 2,
            y: 4 * boxSize + boxSize / 2,
        });
    }

    // Row 5: 3 circles on the left
    for (let i = 0; i < 3; i++) {
        circles.push({
            x: i * boxSize + boxSize / 2,
            y: 5 * boxSize + boxSize / 2,
        });
    }


  return (
    <motion.div
      ref={ref}
      className="w-full h-full flex items-center justify-center"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <svg viewBox={`0 0 ${boxSize * 5} ${boxSize * 6}`} className="w-full max-w-2xl aspect-square">
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
