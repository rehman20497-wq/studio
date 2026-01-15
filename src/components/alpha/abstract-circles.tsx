'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import React, { useRef, useState, useEffect } from 'react';

const circleRadius = 25;
const strokeWidth = 8;
const spacing = 0; // No gap

const totalRadius = circleRadius + strokeWidth / 2;
const boxSize = totalRadius * 2 + spacing;
const circumference = 2 * Math.PI * circleRadius;

const gridLayout = [
    { row: 0, count: 3, offset: 2 }, // Top right
    { row: 1, count: 4, offset: 0 }, // Second row (left)
    { row: 2, count: 5, offset: 0 }, // Middle row
    { row: 3, count: 4, offset: 1 }, // Fourth row (right)
    { row: 4, count: 5, offset: 0 }, // Fifth row
    { row: 5, count: 3, offset: 0 }, // Bottom left
];

let circleCounter = 0;
const allCircles = gridLayout.flatMap(({ row, count, offset }) => {
    return Array.from({ length: count }).map((_, colIndex) => ({
        id: circleCounter++,
        cx: (colIndex + offset) * boxSize + boxSize / 2,
        cy: row * boxSize + boxSize / 2,
    }));
});

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

const initialCircleVariants = {
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

const AnimatedCircle = ({ cx, cy, fillPercentage }: { cx: number; cy: number; fillPercentage: number; }) => {
    const strokeDashoffset = circumference * (1 - fillPercentage / 100);

    return (
        <g>
            <circle
                cx={cx}
                cy={cy}
                r={circleRadius}
                fill="none"
                stroke="#f9f4e6"
                strokeWidth={strokeWidth}
            />
            <motion.circle
                cx={cx}
                cy={cy}
                r={circleRadius}
                fill="none"
                stroke="#F5D34A"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                transform={`rotate(-90 ${cx} ${cy})`}
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: strokeDashoffset }}
                exit={{ strokeDashoffset: circumference }}
                transition={{ duration: 1.5, ease: "circOut" }}
            />
        </g>
    );
};

export default function AbstractCircles() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const [animatedCircles, setAnimatedCircles] = useState<Array<{ id: number; percentage: number }>>([]);

    useEffect(() => {
        if (isInView) {
            const interval = setInterval(() => {
                const activeIds = new Set(animatedCircles.map(c => c.id));
                const availableCircles = allCircles.filter(c => !activeIds.has(c.id));

                if (availableCircles.length < 2) return;

                // Select 2 to 4 new circles to animate
                const numToAnimate = Math.floor(Math.random() * 3) + 2;
                const shuffled = availableCircles.sort(() => 0.5 - Math.random());
                const newAnimations = [];

                for (let i = 0; i < numToAnimate && i < shuffled.length; i++) {
                    newAnimations.push({
                        id: shuffled[i].id,
                        percentage: Math.floor(Math.random() * 36) + 60, // 60% to 95%
                    });
                }
                
                setAnimatedCircles(prev => [...prev, ...newAnimations]);
                
                // Set a timeout to remove these circles from the animation queue
                setTimeout(() => {
                    const idsToRemove = newAnimations.map(a => a.id);
                    setAnimatedCircles(prev => prev.filter(c => !idsToRemove.includes(c.id)));
                }, 3000); // Animation duration (1.5s) + visible time (1.5s)

            }, 800); // New animations every 800ms

            return () => clearInterval(interval);
        }
    }, [isInView, animatedCircles]);


  return (
    <motion.div
      ref={ref}
      className="w-full h-full flex items-center justify-center"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <svg viewBox={`0 0 ${boxSize * 5} ${boxSize * 6}`} className="w-full max-w-2xl aspect-square">
        <AnimatePresence>
            {allCircles.map((circle) => {
                const animationInfo = animatedCircles.find(c => c.id === circle.id);
                return (
                    <motion.g key={circle.id} variants={initialCircleVariants}>
                       {animationInfo ? (
                           <AnimatedCircle
                                cx={circle.cx}
                                cy={circle.cy}
                                fillPercentage={animationInfo.percentage}
                           />
                       ) : (
                        <circle
                            cx={circle.cx}
                            cy={circle.cy}
                            r={circleRadius}
                            fill="none"
                            stroke="#f9f4e6"
                            strokeWidth={strokeWidth}
                        />
                       )}
                    </motion.g>
                )
            })}
        </AnimatePresence>
      </svg>
    </motion.div>
  );
}