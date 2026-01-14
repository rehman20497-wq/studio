
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const numCircles = 18;
const radius = 35;
const spacing = 10;
const strokeWidth = 5;

const verticalHeight = numCircles * (radius * 2 + spacing);

// Coordinates for the letter 'T'
// 7 circles for the top bar, 11 for the vertical stem
const tCoords = [
    // Top bar (7 circles)
    { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 },
    // Vertical stem (11 circles)
    { x: 3, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 3 }, { x: 3, y: 4 }, { x: 3, y: 5 }, { x: 3, y: 6 },
    { x: 3, y: 7 }, { x: 3, y: 8 }, { x: 3, y: 9 }, { x: 3, y: 10 }, { x: 3, y: 11 },
];

export default function AnimatedT() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.4 });

    return (
        <div ref={ref} className="w-full h-full flex items-center justify-center">
            <svg viewBox={`0 0 500 ${verticalHeight}`} className="w-full max-w-lg h-auto" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(10, 10)">
                {Array.from({ length: numCircles }).map((_, i) => {
                    const initialY = i * (radius * 2 + spacing) + radius;

                    const targetCoord = tCoords[i];
                    const targetX = targetCoord ? targetCoord.x * (radius * 2 + spacing) + radius : radius;
                    const targetY = targetCoord ? targetCoord.y * (radius * 2 + spacing) + radius : initialY;

                    return (
                        <motion.circle
                            key={i}
                            r={radius}
                            fill="none"
                            stroke="#f9f4e6"
                            strokeWidth={strokeWidth}
                            initial={{ cx: radius, cy: initialY }}
                            animate={isInView ? { cx: targetX, cy: targetY } : {}}
                            transition={{
                                type: 'spring',
                                damping: 15,
                                stiffness: 40,
                                delay: i * 0.05
                            }}
                        />
                    );
                })}
                </g>
            </svg>
        </div>
    );
}
