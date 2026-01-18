'use client';

import { motion, useInView } from 'framer-motion';
import React, { useMemo, useRef } from 'react';

const SMALL_CIRCLE_RADIUS = 50;
const BIG_CIRCLE_RADIUS = 92.5;
const SPACING = 0; // Circles will touch
const COLS = 7;
const ROWS_TOP = 3;
const ROWS_BOTTOM = 2;

const SMALL_BOX_SIZE = SMALL_CIRCLE_RADIUS * 2 + SPACING;

// Calculate total width and height for the viewBox
const TOTAL_WIDTH = COLS * SMALL_BOX_SIZE - SPACING;
const TOTAL_HEIGHT = (ROWS_TOP + ROWS_BOTTOM) * SMALL_BOX_SIZE + BIG_CIRCLE_RADIUS * 2 + SPACING * 2 - SPACING;

const generateCircles = (rows: number, cols: number, yOffset: number, idPrefix: string) => {
    return Array.from({ length: rows * cols }).map((_, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;
        return {
            id: `${idPrefix}-${i}`,
            cx: col * SMALL_BOX_SIZE + SMALL_CIRCLE_RADIUS,
            cy: yOffset + row * SMALL_BOX_SIZE + SMALL_CIRCLE_RADIUS,
        };
    });
};

const topCircles = generateCircles(ROWS_TOP, COLS, 0, 'top');

const bigCircle = {
    id: 'big-center',
    cx: TOTAL_WIDTH / 2,
    cy: ROWS_TOP * SMALL_BOX_SIZE + SPACING + BIG_CIRCLE_RADIUS,
};

const bottomCirclesYOffset = ROWS_TOP * SMALL_BOX_SIZE + BIG_CIRCLE_RADIUS * 2 + SPACING * 2;
const bottomCircles = generateCircles(ROWS_BOTTOM, COLS, bottomCirclesYOffset, 'bottom');

const allSmallCircles = [...topCircles, ...bottomCircles];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
        scale: 1,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 120,
            damping: 18,
            delay: i * 0.03,
        },
    }),
};

const bigCircleVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            delay: topCircles.length * 0.03,
            duration: 1,
            ease: [0.16, 1, 0.3, 1]
        },
    },
};

export default function AnimatedCircles() {
    const inViewRef = useRef(null);
    const isInView = useInView(inViewRef, { once: true, amount: 0.5 });

    return (
        <div ref={inViewRef} className="w-full h-full flex items-center justify-center">
            <motion.svg 
                viewBox={`0 0 ${TOTAL_WIDTH} ${TOTAL_HEIGHT}`} 
                className="w-full h-auto max-w-lg"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={containerVariants}
            >
                <defs>
                    <filter id="glow-filter" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>

                {/* Small circles */}
                {allSmallCircles.map((circle, i) => (
                    <motion.circle
                        key={circle.id}
                        cx={circle.cx}
                        cy={circle.cy}
                        r={SMALL_CIRCLE_RADIUS}
                        fill="none"
                        stroke="#abe9ef"
                        strokeWidth="2"
                        custom={i}
                        variants={circleVariants}
                    />
                ))}

                {/* Big central circle */}
                <motion.circle
                    key={bigCircle.id}
                    cx={bigCircle.cx}
                    cy={bigCircle.cy}
                    r={BIG_CIRCLE_RADIUS}
                    fill="#00BCD4"
                    stroke="none"
                    variants={bigCircleVariants}
                    filter="url(#glow-filter)"
                />
            </motion.svg>
        </div>
    );
}
