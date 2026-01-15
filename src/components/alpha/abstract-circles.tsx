'use client';

import { motion, useInView } from 'framer-motion';
import React, { useRef, useMemo } from 'react';

const CIRCLE_RADIUS = 25;
const STROKE_WIDTH = 8;
const SPACING = 0; // Circles will touch

const TOTAL_RADIUS = CIRCLE_RADIUS + STROKE_WIDTH / 2;
const BOX_SIZE = TOTAL_RADIUS * 2 + SPACING;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

// The grid is defined row by row.
const GRID_LAYOUT = [
    { row: 0, count: 3, offset: 2 },
    { row: 1, count: 4, offset: 1 },
    { row: 2, count: 5, offset: 0 },
    { row: 3, count: 4, offset: 1 },
    { row: 4, count: 5, offset: 0 },
    { row: 5, count: 3, offset: 2 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.8, // Delay between each row's animation
    },
  },
};

const pathVariants = {
    hidden: (pathLength: number) => ({
      strokeDashoffset: pathLength,
    }),
    visible: (pathLength: number) => ({
      strokeDashoffset: 0,
      transition: {
        strokeDashoffset: { 
          duration: 3, 
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 1,
        },
      },
    }),
};

// This component generates and animates a single continuous path for a row of circles.
const AnimatedRow = ({ row, count, offset }: { row: number, count: number, offset: number }) => {
    const { pathData, totalLength } = useMemo(() => {
        let path = "";
        let length = 0;

        for (let i = 0; i < count; i++) {
            const cx = (i + offset) * BOX_SIZE + BOX_SIZE / 2;
            const cy = row * BOX_SIZE + BOX_SIZE / 2;
            
            // If this isn't the first circle, move to its starting point.
            if (i > 0) {
                 const prev_cx = (i - 1 + offset) * BOX_SIZE + BOX_SIZE / 2;
                 const prev_cy = row * BOX_SIZE + BOX_SIZE / 2;
                 // A simple line to connect circles. For a curved path, a 'Q' or 'C' command would be used.
                 path += ` M${prev_cx},${prev_cy + CIRCLE_RADIUS}`;
                 path += ` L${cx},${cy - CIRCLE_RADIUS}`;
                 length += Math.sqrt(Math.pow(cx - prev_cx, 2) + Math.pow((cy - CIRCLE_RADIUS) - (prev_cy + CIRCLE_RADIUS), 2));
            }

            // Arc command to draw the circle.
            // M = moveto, A = arc
            path += ` M${cx},${cy - CIRCLE_RADIUS}`; // Move to top of the circle
            path += ` A${CIRCLE_RADIUS},${CIRCLE_RADIUS} 0 1,1 ${cx - 0.01},${cy - CIRCLE_RADIUS}`; // Draw a full circle
            length += CIRCUMFERENCE;
        }

        return { pathData: path, totalLength: length };
    }, [count, offset, row]);

    return (
        <motion.path
            d={pathData}
            fill="none"
            stroke="#F5D34A"
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeDasharray={totalLength}
            custom={totalLength}
            variants={pathVariants}
        />
    );
};

export default function AbstractCircles() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    const viewBoxWidth = BOX_SIZE * 7;
    const viewBoxHeight = BOX_SIZE * 6;

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
                {/* Static Background Grid */}
                <g>
                    {GRID_LAYOUT.flatMap(({ row, count, offset }) => 
                        Array.from({ length: count }).map((_, colIndex) => (
                            <circle
                                key={`${row}-${colIndex}`}
                                cx={(colIndex + offset) * BOX_SIZE + BOX_SIZE / 2}
                                cy={row * BOX_SIZE + BOX_SIZE / 2}
                                r={CIRCLE_RADIUS}
                                fill="none"
                                stroke="#f9f4e6"
                                strokeWidth={STROKE_WIDTH}
                            />
                        ))
                    )}
                </g>

                {/* Animated Foreground Paths */}
                <g>
                    {GRID_LAYOUT.map((layout, index) => (
                        <AnimatedRow key={index} {...layout} />
                    ))}
                </g>
            </motion.svg>
        </motion.div>
    );
}
