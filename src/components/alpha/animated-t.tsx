'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const radius = 15;
const spacing = 0; // Circles will touch corner to corner
const strokeWidth = 3;
const boxSize = radius * 2 + spacing;

const gridLayout = [
    { row: 0, count: 3, offset: 1 }, // Top row
    { row: 1, count: 5, offset: 0 }, // Second row
    { row: 2, count: 5, offset: 0 }, // Middle rows
    { row: 3, count: 5, offset: 0 },
    { row: 4, count: 5, offset: 0 },
    { row: 5, count: 5, offset: 0 }, // Second-to-last row of 5
    { row: 6, count: 3, offset: 1 }, // Last row
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
    25, // from sixth row (center) - ending on second last row of 5
];


const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.05,
        },
    },
};

const circleVariants = {
    hidden: { stroke: "#f7edcf", opacity: 0.3 },
    visible: (i: number) => ({
        stroke: tPathIds.includes(i) ? "#F5D34A" : "#f7edcf",
        opacity: tPathIds.includes(i) ? 1 : 0.3,
        transition: {
            delay: tPathIds.includes(i) ? tPathIds.indexOf(i) * 0.15 : 0,
            duration: 0.5,
            ease: "easeOut",
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
                viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} 
                className="w-full max-w-lg h-auto" 
                preserveAspectRatio="xMidYMid meet"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {allCircles.map(circle => (
                    <motion.circle
                        key={circle.id}
                        cx={circle.cx}
                        cy={circle.cy}
                        r={radius}
                        fill="none"
                        strokeWidth={strokeWidth}
                        custom={circle.id}
                        variants={circleVariants}
                    />
                ))}
            </motion.svg>
        </div>
    );
}
