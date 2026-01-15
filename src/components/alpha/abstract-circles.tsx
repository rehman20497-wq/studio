
'use client';

import { motion, useAnimate, stagger } from 'framer-motion';
import React, { useRef, useEffect, useState } from 'react';

const CIRCLE_RADIUS = 45;
const STROKE_WIDTH = 12;
const SPACING = 0;

const BOX_SIZE = CIRCLE_RADIUS * 2 + SPACING;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;
const FILLED_STROKE = CIRCUMFERENCE * 0.75;
const EMPTY_STROKE = CIRCUMFERENCE * 0.25;

const PROFILE_RADIUS = CIRCLE_RADIUS - STROKE_WIDTH;

const GRID_LAYOUT = [
    { row: 0, count: 3, offset: 1 },
    { row: 1, count: 4, offset: 0.5 },
    { row: 2, count: 5, offset: 0 },
    { row: 3, count: 4, offset: 0.5 },
    { row: 4, count: 3, offset: 1 },
];

const getCircleId = (row: number, col: number) => `circle-${row}-${col}`;

const allCircles = GRID_LAYOUT.flatMap(({ row, count, offset }) =>
  Array.from({ length: count }).map((_, colIndex) => ({
    id: getCircleId(row, colIndex),
    row: row,
    col: colIndex,
    cx: (colIndex + offset) * BOX_SIZE + (BOX_SIZE / 2),
    cy: row * BOX_SIZE + (BOX_SIZE / 2),
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


const AnimatedCircle = ({ cx, cy, id, color }: { cx: number; cy: number; id: string; color: string; }) => {
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
                stroke={color}
                strokeWidth={STROKE_WIDTH}
                strokeDasharray={`${FILLED_STROKE} ${EMPTY_STROKE}`}
                strokeLinecap="round"
                transform={`rotate(-45 ${cx} ${cy})`}
                initial={{ strokeDashoffset: FILLED_STROKE }}
            />
             {/* Profile Circle */}
            <motion.circle
                className="profile-circle"
                cx={cx}
                cy={cy}
                r={PROFILE_RADIUS}
                fill={color}
                initial={{ scale: 0, opacity: 0 }}
            />
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
                    { strokeDashoffset: 0, stroke: color },
                    { duration: 0.6, ease: "easeOut" }
                );
                // 2. Reveal Profile
                await animate(
                    `#${circleId} .profile-circle`,
                    { scale: 1, opacity: 1, fill: color },
                    { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }
                );
            }
            
            // Pause before reversing
            await new Promise(resolve => setTimeout(resolve, 1500));

            // --- REVERSE ANIMATION ---
            const reversedOrder = [...order].reverse();
            for (const circleId of reversedOrder) {
                // 1. Hide Profile
                await animate(
                    `#${circleId} .profile-circle`,
                    { scale: 0, opacity: 0 },
                    { duration: 0.4, ease: "easeIn" }
                );
                // 2. Undraw Stroke
                await animate(
                    `#${circleId} .stroke-circle`,
                    { strokeDashoffset: FILLED_STROKE },
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
                {allCircles.map(({ id, cx, cy }) => 
                    <AnimatedCircle 
                        key={id} 
                        id={id} 
                        cx={cx} 
                        cy={cy}
                        color={rounds[currentRoundIndex].color}
                    />
                )}
            </svg>
        </div>
    );
}

