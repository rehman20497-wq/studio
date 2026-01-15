
'use client';

import { motion, useAnimate } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const CIRCLE_RADIUS = 45;
const STROKE_WIDTH = 12;
const SPACING = 0;

const BOX_SIZE = CIRCLE_RADIUS * 2 + SPACING;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

const PROFILE_RADIUS = CIRCLE_RADIUS - STROKE_WIDTH;

const GRID_LAYOUT = [
    { row: 0, count: 3, offset: 1 },
    { row: 1, count: 4, offset: 0.5 },
    { row: 2, count: 5, offset: 0 },
    { row: 3, count: 4, offset: 0.5 },
    { row: 4, count: 3, offset: 1 },
];

// Placeholder images for profiles
const profileImages = Array.from({ length: 19 }, (_, i) => `https://picsum.photos/seed/${i + 1}/150/150`);

const getCircleId = (row: number, col: number) => `circle-${row}-${col}`;

let circleCounter = 0;
const allCircles = GRID_LAYOUT.flatMap(({ row, count, offset }) =>
  Array.from({ length: count }).map((_, colIndex) => ({
    id: getCircleId(row, colIndex),
    row: row,
    col: colIndex,
    cx: (colIndex + offset) * BOX_SIZE + (BOX_SIZE / 2),
    cy: row * BOX_SIZE + (BOX_SIZE / 2),
    image: profileImages[circleCounter++ % profileImages.length],
  }))
);

// --- Animation Order Definitions ---
const topRightToCenterOrder = [
    getCircleId(0,2), getCircleId(4,0), // corners
    getCircleId(0,1), getCircleId(4,1),
    getCircleId(1,3), getCircleId(3,0),
    getCircleId(0,0), getCircleId(4,2),
    getCircleId(1,2), getCircleId(3,1),
    getCircleId(2,4), getCircleId(2,0),
    getCircleId(1,1), getCircleId(3,2),
    getCircleId(2,3), getCircleId(2,1),
    getCircleId(1,0), getCircleId(3,3),
    getCircleId(2,2) // center
];

const diagonalSweepOrder = [
    getCircleId(0,0), getCircleId(4,2),
    getCircleId(1,0), getCircleId(3,3),
    getCircleId(0,1), getCircleId(4,1),
    getCircleId(2,0), getCircleId(2,4),
    getCircleId(1,1), getCircleId(3,2),
    getCircleId(0,2), getCircleId(4,0),
    getCircleId(2,1), getCircleId(2,3),
    getCircleId(3,0), getCircleId(1,3),
    getCircleId(3,1), getCircleId(1,2),
    getCircleId(2,2)
];

const horizontalSweepOrder = allCircles.slice().sort((a, b) => a.cx - b.cx).map(c => c.id);

// --- Round Configuration ---
const rounds = [
  { order: topRightToCenterOrder, color: "#00E5FF" }, // Cyan
  { order: diagonalSweepOrder, color: "#7C4DFF" }, // Purple
  { order: horizontalSweepOrder, color: "#00FF9C" }, // Lime
  { order: [...allCircles.map(c=>c.id)].sort(() => Math.random() - 0.5), color: "#FF9100" }, // Orange (Random)
];


const AnimatedCircle = ({ cx, cy, id, image }: { cx: number; cy: number; id: string; image: string; }) => {
    return (
        <g id={id}>
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
                className="stroke-circle"
                cx={cx}
                cy={cy}
                r={CIRCLE_RADIUS}
                fill="none"
                stroke="#f9f4e6"
                strokeWidth={STROKE_WIDTH}
                strokeDasharray={`${CIRCUMFERENCE}`}
                strokeLinecap="round"
                transform={`rotate(-45 ${cx} ${cy})`}
                initial={{ strokeDashoffset: CIRCUMFERENCE }}
            />
            {/* Profile Picture */}
            <clipPath id={`clip-${id}`}>
                <motion.circle
                    className="profile-clip"
                    cx={cx}
                    cy={cy}
                    r={PROFILE_RADIUS}
                    initial={{ scale: 0 }}
                />
            </clipPath>
            <g clipPath={`url(#clip-${id})`}>
                <motion.foreignObject
                    className="profile-image-container"
                    x={cx - PROFILE_RADIUS}
                    y={cy - PROFILE_RADIUS}
                    width={PROFILE_RADIUS * 2}
                    height={PROFILE_RADIUS * 2}
                    initial={{ opacity: 0 }}
                >
                    <Image src={image} alt="Profile" width={PROFILE_RADIUS * 2} height={PROFILE_RADIUS * 2} />
                </motion.foreignObject>
            </g>
        </g>
    );
};

export default function AbstractCircles() {
    const [scope, animate] = useAnimate();
    const [currentRoundIndex, setCurrentRoundIndex] = useState(0);

    useEffect(() => {
        const runAnimationCycle = async () => {
            const currentRound = rounds[currentRoundIndex];
            const { order, color } = currentRound;

            // --- FORWARD ANIMATION ---
            for (const circleId of order) {
                // 1. Draw Stroke
                await animate(
                    `#${circleId} .stroke-circle`,
                    { strokeDashoffset: CIRCUMFERENCE * 0.25, stroke: color },
                    { duration: 0.6, ease: "easeOut" }
                );
                // 2. Reveal Profile
                await animate([
                    [
                        `#${circleId} .profile-clip`,
                        { scale: [0, 1.1, 1] },
                        { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
                    ],
                    [
                        `#${circleId} .profile-image-container`,
                        { opacity: 1 },
                        { at: '-0.4', duration: 0.4 },
                    ],
                ]);
            }
            
            // Pause before reversing
            await new Promise(resolve => setTimeout(resolve, 1500));

            // --- REVERSE ANIMATION ---
            const reversedOrder = [...order].reverse();
            for (const circleId of reversedOrder) {
                // 1. Hide Profile
                await animate([
                    [
                        `#${circleId} .profile-image-container`,
                        { opacity: 0 },
                        { duration: 0.3, ease: 'easeIn' },
                    ],
                    [
                        `#${circleId} .profile-clip`,
                        { scale: 0 },
                        { at: '-0.2', duration: 0.4, ease: 'easeIn' },
                    ],
                ]);
                // 2. Undraw Stroke
                await animate(
                    `#${circleId} .stroke-circle`,
                    { strokeDashoffset: CIRCUMFERENCE, stroke: '#f9f4e6' },
                    { duration: 0.6, ease: "easeIn" }
                );
            }

            // Pause before next round
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Move to the next round
            setCurrentRoundIndex((prev) => (prev + 1) % rounds.length);
        };

        runAnimationCycle();
    }, [currentRoundIndex, animate]);

    const viewBoxWidth = BOX_SIZE * 5 + 40;
    const viewBoxHeight = BOX_SIZE * 5;

    return (
        <div
            className="w-full h-full flex items-center justify-center"
        >
            <svg 
                ref={scope}
                viewBox={`-20 0 ${viewBoxWidth} ${viewBoxHeight}`} 
                className="w-full max-w-2xl aspect-square"
            >
                {allCircles.map(({ id, cx, cy, image }) => 
                    <AnimatedCircle 
                        key={id} 
                        id={id} 
                        cx={cx} 
                        cy={cy}
                        image={image}
                    />
                )}
            </svg>
        </div>
    );
}

