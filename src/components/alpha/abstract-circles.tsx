
'use client';

import { motion, useInView } from 'framer-motion';
import React, { useRef } from 'react';

const CIRCLE_RADIUS = 25;
const STROKE_WIDTH = 8;
const SPACING = 0;

const TOTAL_RADIUS = CIRCLE_RADIUS + STROKE_WIDTH / 2;
const BOX_SIZE = TOTAL_RADIUS * 2 + SPACING;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;
const FILL_PERCENTAGE = 75;

const GRID_LAYOUT = [
    { row: 0, count: 3, offset: 2 },
    { row: 1, count: 4, offset: 1 },
    { row: 2, count: 5, offset: 0 },
    { row: 3, count: 4, offset: 1 },
    { row: 4, count: 5, offset: 0 },
    { row: 5, count: 3, offset: 2 },
];

let circleCounter = 0;
const ALL_CIRCLES = GRID_LAYOUT.flatMap(({ row, count, offset }) => 
    Array.from({ length: count }).map((_, colIndex) => ({
        id: circleCounter++,
        cx: (colIndex + offset) * BOX_SIZE + BOX_SIZE / 2,
        cy: row * BOX_SIZE + BOX_SIZE / 2,
    }))
);

// Define which circles to animate
const animatedCircleIds = [5, 10]; 

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 1.5, // Delay between the two circles animating
    },
  },
};

const circleStrokeVariants = {
    hidden: { strokeDashoffset: CIRCUMFERENCE },
    visible: { 
        strokeDashoffset: CIRCUMFERENCE * (1 - FILL_PERCENTAGE / 100),
        transition: {
            duration: 1.5, // Slow and smooth duration
            ease: "easeInOut"
        }
    },
};

const AnimatedCircle = ({ cx, cy }: { cx: number; cy: number; }) => {
    return (
        <g>
            <circle
                cx={cx}
                cy={cy}
                r={CIRCLE_RADIUS}
                fill="none"
                stroke="#f9f4e6"
                strokeWidth={STROKE_WIDTH}
            />
            <motion.circle
                cx={cx}
                cy={cy}
                r={CIRCLE_RADIUS}
                fill="none"
                stroke="#F5D34A"
                strokeWidth={STROKE_WIDTH}
                strokeLinecap="round"
                transform={`rotate(-90 ${cx} ${cy})`}
                strokeDasharray={CIRCUMFERENCE}
                variants={circleStrokeVariants}
            />
        </g>
    );
};

export default function AbstractCircles() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="w-full h-full flex items-center justify-center"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <svg viewBox={`0 0 ${BOX_SIZE * 6} ${BOX_SIZE * 6}`} className="w-full max-w-2xl aspect-square">
            {ALL_CIRCLES.map((circle) => {
                const isAnimated = animatedCircleIds.includes(circle.id);
                
                if (isAnimated) {
                    return (
                        <AnimatedCircle
                            key={circle.id}
                            cx={circle.cx}
                            cy={circle.cy}
                        />
                    );
                }
                
                return (
                    <circle
                        key={circle.id}
                        cx={circle.cx}
                        cy={circle.cy}
                        r={CIRCLE_RADIUS}
                        fill="none"
                        stroke="#f9f4e6"
                        strokeWidth={STROKE_WIDTH}
                    />
                );
            })}
      </svg>
    </motion.div>
  );
}
