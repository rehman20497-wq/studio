'use client';

import { motion, useInView } from 'framer-motion';
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

const AnimatedCircle = ({ cx, cy, id, isAnimating }: { cx: number; cy: number; id: number; isAnimating: boolean }) => {
    return (
        <g>
            {/* Background static circle */}
            <circle
                cx={cx}
                cy={cy}
                r={circleRadius}
                fill="none"
                stroke="#f9f4e6" // Dimmed color
                strokeWidth={strokeWidth}
            />
            {/* Animated foreground circle */}
            <motion.circle
                cx={cx}
                cy={cy}
                r={circleRadius}
                fill="none"
                stroke="#F5D34A" // Highlight color
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                transform={`rotate(-90 ${cx} ${cy})`}
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: isAnimating ? 0 : circumference }}
                transition={{ duration: 1.5, ease: "circOut" }}
            />
        </g>
    );
};

export default function AbstractCircles() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const [animatedCircles, setAnimatedCircles] = useState<number[]>([]);

    useEffect(() => {
        if (isInView) {
            const interval = setInterval(() => {
                const availableCircles = allCircles.filter(c => !animatedCircles.includes(c.id));
                
                if (availableCircles.length === 0) {
                    // Reset if all are animated
                    setAnimatedCircles([]);
                    return;
                }

                // Pick two random circles to animate
                const newAnimated = [];
                const shuffled = [...availableCircles].sort(() => 0.5 - Math.random());
                newAnimated.push(shuffled[0].id);
                if (shuffled.length > 1) {
                    newAnimated.push(shuffled[1].id);
                }

                // Animate the first one, then the second after a delay
                setAnimatedCircles(prev => [...prev, newAnimated[0]]);
                if (newAnimated.length > 1) {
                    setTimeout(() => {
                        setAnimatedCircles(prev => [...prev, newAnimated[1]]);
                    }, 800); // 800ms delay for the second circle
                }

                // After a while, reset the animated state of these circles so they can be picked again
                setTimeout(() => {
                    setAnimatedCircles(prev => prev.filter(id => !newAnimated.includes(id)));
                }, 4000); // Circle stays filled for 4 seconds


            }, 2500); // Every 2.5 seconds, pick new circles

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
        {allCircles.map((circle) => (
          <motion.g key={circle.id} variants={initialCircleVariants}>
            <AnimatedCircle
              cx={circle.cx}
              cy={circle.cy}
              id={circle.id}
              isAnimating={animatedCircles.includes(circle.id)}
            />
          </motion.g>
        ))}
      </svg>
    </motion.div>
  );
}
