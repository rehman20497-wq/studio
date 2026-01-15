
'use client';

import { motion, useInView } from 'framer-motion';
import React, { useRef } from 'react';

const CIRCLE_RADIUS = 55;
const STROKE_WIDTH = 12;
const SPACING = 0;

const BOX_SIZE = CIRCLE_RADIUS * 2 + SPACING;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;
const FILLED_STROKE = CIRCUMFERENCE * 0.75;
const EMPTY_STROKE = CIRCUMFERENCE * 0.25;

const GRID_LAYOUT = [
    { row: 0, count: 3, offset: 1 },
    { row: 1, count: 4, offset: 0.5 },
    { row: 2, count: 5, offset: 0 },
    { row: 3, count: 4, offset: 0.5 },
    { row: 4, count: 3, offset: 1 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const circleVariants = {
    hidden: {
        strokeDashoffset: FILLED_STROKE,
    },
    visible: {
        strokeDashoffset: 0,
        transition: {
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
        },
    },
};

const AnimatedCircle = ({ cx, cy }: { cx: number; cy: number }) => {
    return (
        <g>
            {/* Background static circle */}
            <circle
                cx={cx}
                cy={cy}
                r={CIRCLE_RADIUS}
                fill="none"
                stroke="#f9f4e6"
                strokeWidth={STROKE_WIDTH}
            />
            {/* Animated 75% stroke circle */}
            <motion.circle
                cx={cx}
                cy={cy}
                r={CIRCLE_RADIUS}
                fill="none"
                stroke="#F5D34A"
                strokeWidth={STROKE_WIDTH}
                strokeDasharray={`${FILLED_STROKE} ${EMPTY_STROKE}`}
                strokeLinecap="round"
                transform={`rotate(-45 ${cx} ${cy})`}
                variants={circleVariants}
            />
        </g>
    );
};

export default function AbstractCircles() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    const viewBoxWidth = BOX_SIZE * 5;
    const viewBoxHeight = BOX_SIZE * 5;

    return (
        <motion.div
            ref={ref}
            className="w-full h-full flex items-center justify-center"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            <motion.svg 
                viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} 
                className="w-full max-w-2xl aspect-square"
                variants={containerVariants}
            >
                {GRID_LAYOUT.flatMap(({ row, count, offset }) => 
                    Array.from({ length: count }).map((_, colIndex) => {
                        const cx = (colIndex + offset) * BOX_SIZE + (BOX_SIZE / 2);
                        const cy = row * BOX_SIZE + (BOX_SIZE / 2);
                        return <AnimatedCircle key={`${row}-${colIndex}`} cx={cx} cy={cy} />;
                    })
                )}
            </motion.svg>
        </motion.div>
    );
}
