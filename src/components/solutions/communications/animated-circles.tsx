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
const PROFILE_UNDRAW_DURATION = 1500;
const PROFILE_HOLD_DURATION = 3500; // Time profile stays visible
const NORMAL_HOLD_DURATION = 1000;  // Time a non-profile circle stays visible
const CYCLE_DELAY = 200; // Delay between cycles

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
                .filter(Boolean);
        };
        
        const animateOn = (circle: any, { duration, rotation, fill }: { duration: number, rotation: number, fill: number}) => {
            animate(`#${circle.id} .stroke-circle`, 
                { strokeDasharray: `${CIRCUMFERENCE * fill} ${CIRCUMFERENCE * (1 - fill)}`, rotate: rotation, strokeDashoffset: 0 }, 
                { duration: duration / 1000, ease: "easeOut" }
            );
        }
        
        const animateOff = (circle: any, { duration }: { duration: number }) => {
             animate(`#${circle.id} .stroke-circle`, { strokeDashoffset: CIRCUMFERENCE }, { duration: duration / 1000, ease: "easeIn" });
        }
        
        const animateProfile = (circle: any, { direction }: { direction: 'on' | 'off' }) => {
            const duration = direction === 'on' ? 1000 : PROFILE_UNDRAW_DURATION;
            const ease = direction === 'on' ? 'easeOut' : 'easeIn';
            animate(`#${circle.id} .profile-clip`, { scale: direction === 'on' ? 1 : 0 }, { duration: duration / 1000, ease });
            animate(`#${circle.id} .profile-image-container`, { opacity: direction === 'on' ? 1 : 0 }, { at: '<', duration: duration / 1000, ease });
        }

        const runAnimation = async () => {
            let activeCircles = new Set<string>();
            let profilesInRows = new Set<number>();
            let circleA = shuffle(allCirclesFlat)[0];

            while (!isCancelled) {
                // Find neighbor B
                const neighbors = getNeighbors(circleA);
                const available = neighbors.filter(n => !activeCircles.has(n.id));
                let circleB = available.length > 0 ? shuffle(available)[0] : null;

                // Animate A on if it's not already on
                if (!activeCircles.has(circleA.id)) {
                    animateOn(circleA, { rotation: Math.random() * 360, fill: 0.75, duration: DRAW_DURATION });
                    activeCircles.add(circleA.id);
                    await sleep(NORMAL_HOLD_DURATION);
                }
                
                if (isCancelled) return;

                if (!circleB) {
                    // Dead end. Undraw A and find a new A to start over.
                    animateOff(circleA, { duration: UNDRAW_DURATION });
                    await sleep(UNDRAW_DURATION);
                    if (isCancelled) return;
                    activeCircles.delete(circleA.id);

                    const inactive = allCirclesFlat.filter(c => !activeCircles.has(c.id));
                    circleA = shuffle(inactive.length > 0 ? inactive : allCirclesFlat)[0];
                    await sleep(CYCLE_DELAY);
                    continue;
                }
                
                // We have a pair: A and B
                activeCircles.add(circleB.id);
                const willShowProfileB = !profilesInRows.has(circleB.row) && Math.random() < 0.25;

                // Animate B on and A off
                animateOn(circleB, { rotation: Math.random() * 360, fill: 0.85, duration: DRAW_DURATION });
                animateOff(circleA, { duration: UNDRAW_DURATION });

                if (willShowProfileB) {
                    profilesInRows.add(circleB.row);
                    await sleep(DRAW_DURATION * 0.4);
                    if (isCancelled) return;
                    animateProfile(circleB, { direction: 'on' });
                }

                activeCircles.delete(circleA.id);

                // Hold B
                await sleep(willShowProfileB ? PROFILE_HOLD_DURATION : NORMAL_HOLD_DURATION);
                if (isCancelled) return;
                
                // If B had a profile, undraw it before next cycle
                if (willShowProfileB) {
                    animateProfile(circleB, { direction: 'off' });
                    await sleep(PROFILE_UNDRAW_DURATION);
                    if (isCancelled) return;
                    profilesInRows.delete(circleB.row);
                }
                
                circleA = circleB; // B becomes the new A for the next loop
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
