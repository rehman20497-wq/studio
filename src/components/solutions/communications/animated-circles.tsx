'use client';

import { motion, useAnimate } from 'framer-motion';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import Image from 'next/image';

const SMALL_CIRCLE_RADIUS = 50;
const STROKE_WIDTH = 8;
const SPACING = 0;

// Animation timings in ms
const DRAW_DURATION = 1200;
const UNDRAW_DURATION = 1200;
const PROFILE_UNDRAW_DURATION = 2000;
const PROFILE_HOLD_DURATION = 5000;
const NORMAL_HOLD_DURATION = 2500;
const CYCLE_DELAY = 600; // Delay between one cycle (draw/undraw) finishing and the next starting

const SMALL_BOX_SIZE = SMALL_CIRCLE_RADIUS * 2 + SPACING;
const CIRCUMFERENCE = 2 * Math.PI * (SMALL_CIRCLE_RADIUS - STROKE_WIDTH / 2);
const PROFILE_RADIUS = SMALL_CIRCLE_RADIUS - STROKE_WIDTH;

// Grid layout configuration based on the image provided
const GRID_LAYOUT_CONFIG = [
    { row: 0, count: 2, offset: 4 },
    { row: 1, count: 2, offset: 4 },
    { row: 2, count: 4, offset: 2 },
    { row: 3, count: 6, offset: 0 },
    { row: 4, count: 6, offset: 0 },
];
const COLS_COUNT = 6;


const profileImages = Array.from({ length: 19 }, (_, i) => `https://picsum.photos/seed/${i + 1}/150/150`);

const getCircleId = (row: number, col: number) => `circle-comm-${row}-${col}`;

const generateInitialLayout = () => {
    let circleCounter = 0;
    return GRID_LAYOUT_CONFIG.map(({ row, count, offset }) =>
        Array.from({ length: count }).map((_, colIndex) => ({
            id: getCircleId(row, colIndex + offset),
            row: row,
            col: colIndex + offset, // Use absolute column index
            cx: (colIndex + offset) * SMALL_BOX_SIZE + SMALL_CIRCLE_RADIUS,
            cy: row * SMALL_BOX_SIZE + SMALL_CIRCLE_RADIUS,
            image: profileImages[circleCounter % profileImages.length],
            key: circleCounter++,
        }))
    );
};

// Component for a single circle with its animation elements
const AnimatedCircle = ({ cx, cy, id, image }: { cx: number; cy: number; id: string; image: string; }) => {
    return (
        <g id={id}>
            {/* Base unfilled circle */}
            <circle
                cx={cx}
                cy={cy}
                r={SMALL_CIRCLE_RADIUS}
                fill="none"
                stroke="#91e968" // Unfilled stroke color
                strokeOpacity={0.4}
                strokeWidth={STROKE_WIDTH}
            />
            {/* Animated stroke */}
            <motion.circle
                className="stroke-circle"
                cx={cx}
                cy={cy}
                r={SMALL_CIRCLE_RADIUS}
                fill="none"
                stroke="#50b720" // Filled stroke color
                strokeWidth={STROKE_WIDTH}
                strokeDasharray={`${CIRCUMFERENCE}`}
                strokeDashoffset={CIRCUMFERENCE}
                strokeLinecap="round"
            />
            {/* Clip path for the image reveal */}
            <clipPath id={`clip-${id}`}>
                <motion.circle
                    className="profile-clip"
                    cx={cx}
                    cy={cy}
                    r={PROFILE_RADIUS}
                    initial={{ scale: 0 }}
                />
            </clipPath>
            {/* The image itself */}
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


export default function AnimatedCircles() {
    const [scope, animate] = useAnimate();
    const [layout] = useState(generateInitialLayout);
    const allCirclesFlat = useMemo(() => layout.flat(), [layout]);

    const shuffle = useCallback(<T,>(array: T[]): T[] => {
        return [...array].sort(() => 0.5 - Math.random());
    }, []);

    useEffect(() => {
        let isCancelled = false;

        const sleep = (ms: number) => new Promise(res => {
            if (isCancelled) return;
            const timeoutId = setTimeout(res, ms);
            return () => clearTimeout(timeoutId);
        });

        // Create a map for quick circle lookup by row and col
        const circleMap = new Map<string, any>();
        allCirclesFlat.forEach(c => circleMap.set(`${c.row},${c.col}`, c));

        const getNeighbors = (circle: any) => {
            const { row, col } = circle;
            const potentialNeighbors = [
                { r: row - 1, c: col }, // top
                { r: row + 1, c: col }, // bottom
                { r: row, c: col - 1 }, // left
                { r: row, c: col + 1 }, // right
            ];
            return potentialNeighbors
                .map(p => circleMap.get(`${p.r},${p.c}`))
                .filter(Boolean); // Filter out undefined (out of bounds)
        };
        
        const runAnimation = async () => {
            const activeCircles = new Map<string, { removeAt: number, hasProfile: boolean }>();
            const profilesByRow = new Map<number, string>(); // row -> circleId with profile

            let lastCircle: any = shuffle(allCirclesFlat)[0];

            while (!isCancelled) {
                // 1. Prune expired circles
                const now = Date.now();
                for (const [id, { removeAt, hasProfile }] of activeCircles.entries()) {
                    if (now >= removeAt) {
                        activeCircles.delete(id);
                        if (hasProfile) {
                            profilesByRow.forEach((profileId, row) => {
                                if (profileId === id) {
                                    profilesByRow.delete(row);
                                }
                            });
                            animate(`#${id} .profile-image-container`, { opacity: 0 }, { duration: PROFILE_UNDRAW_DURATION / 1000, ease: 'easeIn' });
                            animate(`#${id} .profile-clip`, { scale: 0 }, { at: '<', duration: PROFILE_UNDRAW_DURATION / 1000, ease: 'easeIn' });
                        }
                        animate(`#${id} .stroke-circle`, { strokeDashoffset: CIRCUMFERENCE }, { duration: UNDRAW_DURATION / 1000, ease: "easeIn" });
                    }
                }
                
                // 2. Find next pair to animate
                const neighbors = getNeighbors(lastCircle);
                const availableNeighbors = neighbors.filter(n => !activeCircles.has(n.id));
                
                let firstCircle = lastCircle;
                let secondCircle: any;

                if (availableNeighbors.length > 0) {
                    secondCircle = shuffle(availableNeighbors)[0];
                } else {
                    // No neighbors, jump to a random non-active circle
                    const inactiveCircles = allCirclesFlat.filter(c => !activeCircles.has(c.id));
                    if (inactiveCircles.length > 1) {
                         firstCircle = shuffle(inactiveCircles)[0];
                         const newNeighbors = getNeighbors(firstCircle).filter(n => !activeCircles.has(n.id));
                         secondCircle = newNeighbors.length > 0 ? shuffle(newNeighbors)[0] : inactiveCircles[1];
                    } else {
                        // All circles active, just wait
                        await sleep(CYCLE_DELAY);
                        continue;
                    }
                }

                lastCircle = secondCircle; // The second circle becomes the start of the next pair

                // 3. Animate the pair
                const showProfile = !profilesByRow.has(secondCircle.row) && Math.random() < 0.25;

                // Animate first circle
                const firstRotation = Math.random() * 360;
                const firstFill = 0.75 + Math.random() * 0.05; // 75-80%
                animate(`#${firstCircle.id} .stroke-circle`, 
                    { strokeDasharray: `${CIRCUMFERENCE * firstFill} ${CIRCUMFERENCE * (1 - firstFill)}`, rotate: firstRotation, strokeDashoffset: 0 }, 
                    { duration: DRAW_DURATION / 1000, ease: "easeOut" }
                );
                activeCircles.set(firstCircle.id, { removeAt: Date.now() + NORMAL_HOLD_DURATION, hasProfile: false });

                await sleep(DRAW_DURATION / 2); // Stagger the second circle

                // Animate second circle
                const secondRotation = firstRotation + 180 + (Math.random() * 60 - 30); // roughly opposite
                const secondFill = 0.85;
                animate(`#${secondCircle.id} .stroke-circle`, 
                    { strokeDasharray: `${CIRCUMFERENCE * secondFill} ${CIRCUMFERENCE * (1 - secondFill)}`, rotate: secondRotation, strokeDashoffset: 0 }, 
                    { duration: DRAW_DURATION / 1000, ease: "easeOut" }
                );
                
                if (showProfile) {
                    profilesByRow.set(secondCircle.row, secondCircle.id);
                    activeCircles.set(secondCircle.id, { removeAt: Date.now() + PROFILE_HOLD_DURATION, hasProfile: true });
                    await sleep(DRAW_DURATION / 2); // Wait for stroke to mostly finish
                    animate(`#${secondCircle.id} .profile-clip`, { scale: 1 }, { duration: 1, ease: 'easeOut' });
                    animate(`#${secondCircle.id} .profile-image-container`, { opacity: 1 }, { at: '<', duration: 1 });
                } else {
                     activeCircles.set(secondCircle.id, { removeAt: Date.now() + NORMAL_HOLD_DURATION, hasProfile: false });
                }

                await sleep(CYCLE_DELAY);
            }
        };

        runAnimation();

        return () => { isCancelled = true; };
    }, [scope, animate, allCirclesFlat, shuffle]);

    const viewBoxWidth = SMALL_BOX_SIZE * COLS_COUNT;
    const viewBoxHeight = SMALL_BOX_SIZE * 5;

    return (
        <div className="w-full h-full flex items-center justify-center">
            <svg 
                ref={scope}
                viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} 
                className="w-full max-w-2xl aspect-[6/5]"
            >
                {allCirclesFlat.map(({ id, cx, cy, image, key }) => 
                    <AnimatedCircle 
                        key={key} 
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
