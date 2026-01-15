
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const radius = 15;
const spacing = 0; // Circles will touch corner to corner
const strokeWidth = 3;
const boxSize = radius * 2 + spacing;
const circumference = 2 * Math.PI * radius;

const gridLayout = [
    { row: 0, count: 3, offset: 1 }, // Top row
    { row: 1, count: 5, offset: 0 }, // Second row
    { row: 2, count: 5, offset: 0 }, // Middle rows
    { row: 3, count: 5, offset: 0 },
    { row: 4, count: 5, offset: 0 },
    { row: 5, count: 3, offset: 1 }, // Second to last row
    { row: 6, count: 2, offset: 1.5 }, // last row
];

let circleCounter = 0;
const allCircles = gridLayout.flatMap(({ row, count, offset }) => {
    return Array.from({ length: count }).map((_, colIndex) => ({
        id: circleCounter++,
        cx: (colIndex + offset) * boxSize + radius,
        cy: row * boxSize + radius,
    }));
});

// Define the path for the letter 'T' by the circle IDs
const tPathIds = [
    // Top bar of 'T' (full second row)
    3, 4, 5, 6, 7,
    // Vertical stem of 'T'
    10, // from third row (center)
    15, // from fourth row (center)
    20, // from fifth row (center)
    24, // from sixth row (center)
];


const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15, // Stagger the animation of each circle
        },
    },
};

const circleVariants = {
    hidden: (isTPath: boolean) => ({
        stroke: "#f7edcf",
        opacity: 0.3,
        strokeDashoffset: isTPath ? circumference : 0,
    }),
    visible: (isTPath: boolean) => ({
        stroke: isTPath ? "#F5D34A" : "#f7edcf",
        opacity: isTPath ? 1 : 0.3,
        strokeDashoffset: 0,
        transition: {
            strokeDashoffset: { duration: 0.8, ease: "easeOut" },
            stroke: { duration: 0.1 },
            opacity: { duration: 0.1 },
        },
    }),
};

export default function AnimatedT() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    const viewBoxWidth = boxSize * 5;
    const viewBoxHeight = boxSize * 7;

    return (
        <div ref={ref} className="w-full h-full flex items-center justify-center">
            <motion.svg 
                viewBox={`-10 0 ${viewBoxWidth + 20} ${viewBoxHeight}`} 
                className="w-full max-w-lg h-auto" 
                preserveAspectRatio="xMidYMid meet"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {allCircles.map(circle => {
                    const isTPath = tPathIds.includes(circle.id);
                    return (
                        <motion.circle
                            key={circle.id}
                            cx={circle.cx}
                            cy={circle.cy}
                            r={radius}
                            fill="none"
                            strokeWidth={strokeWidth}
                            strokeDasharray={circumference}
                            custom={isTPath}
                            variants={circleVariants}
                        />
                    );
                })}
            </motion.svg>
        </div>
    );
}

