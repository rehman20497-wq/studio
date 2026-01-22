
'use client';

import { motion, useAnimate } from 'framer-motion';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import Image from 'next/image';

const SMALL_CIRCLE_RADIUS = 50;
const STROKE_WIDTH = 8;
const SPACING = 0;

const DRAW_DURATION = 2;
const DRAW_HOLD_DELAY = 800;
const ERASE_DURATION = 2;
const ERASE_HOLD_DELAY = 600;
const NEXT_PAIR_DELAY = 1200;

const SMALL_BOX_SIZE = SMALL_CIRCLE_RADIUS * 2 + SPACING;
const CIRCUMFERENCE = 2 * Math.PI * (SMALL_CIRCLE_RADIUS - STROKE_WIDTH / 2);
const PROFILE_RADIUS = SMALL_CIRCLE_RADIUS - STROKE_WIDTH;

const GRID_LAYOUT_CONFIG = [
    { row: 0, count: 2, offset: 2 },
    { row: 1, count: 2, offset: 2 },
    { row: 2, count: 4, offset: 1 },
    { row: 3, count: 6, offset: 0 },
    { row: 4, count: 6, offset: 0 },
];

const profileImages = Array.from({ length: 19 }, (_, i) => `https://picsum.photos/seed/${i + 1}/150/150`);

const getCircleId = (row: number, col: number) => `circle-comm-${row}-${col}`;

const generateInitialLayout = () => {
    let circleCounter = 0;
    return GRID_LAYOUT_CONFIG.map(({ row, count, offset }) =>
        Array.from({ length: count }).map((_, colIndex) => ({
            id: getCircleId(row, colIndex),
            row: row,
            col: colIndex,
            cx: (colIndex + offset) * SMALL_BOX_SIZE + (SMALL_BOX_SIZE / 2),
            cy: row * SMALL_BOX_SIZE + (SMALL_BOX_SIZE / 2),
            image: profileImages[circleCounter % profileImages.length],
            key: circleCounter++,
        }))
    );
};

const AnimatedCircle = ({ cx, cy, id, image }: { cx: number; cy: number; id: string; image: string; }) => {
    return (
        <g id={id}>
            <circle
                cx={cx}
                cy={cy}
                r={SMALL_CIRCLE_RADIUS}
                fill="none"
                stroke="#91e968"
                strokeWidth={STROKE_WIDTH}
            />
            <motion.circle
                className="stroke-circle"
                cx={cx}
                cy={cy}
                r={SMALL_CIRCLE_RADIUS}
                fill="none"
                stroke="#91e968"
                strokeWidth={STROKE_WIDTH}
                strokeDasharray={`${CIRCUMFERENCE * 0.75} ${CIRCUMFERENCE * 0.25}`}
                strokeDashoffset={CIRCUMFERENCE}
                initial={{ strokeDashoffset: CIRCUMFERENCE, rotate: 0 }}
                strokeLinecap="round"
            />
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

export default function AnimatedCircles() {
    const [scope, animate] = useAnimate();
    const [layout] = useState(generateInitialLayout);
    const allCirclesFlat = useMemo(() => layout.flat(), [layout]);

    const shuffle = useCallback((array: any[]) => {
        return [...array].sort(() => 0.5 - Math.random());
    }, []);

    useEffect(() => {
        const colors = ["#50b720"];
        let animationIndex = 0;
        let colorIndex = 0;

        let activeCircleQueue: any[] = [];
        let isCancelled = false;
        let shuffledCircles = shuffle(allCirclesFlat);
        let profileIsPending = false;

        const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

        const animatePair = async (circle1: any, circle2: any, color: string, showProfiles: [boolean, boolean]) => {
            const rotateOptions = [0, 120, -85, 90, -90];
            const rotation = rotateOptions[Math.floor(Math.random() * rotateOptions.length)];

            [circle1, circle2].forEach((c, i) => {
                animate(
                    `#${c.id} .stroke-circle`,
                    {
                        strokeDashoffset: CIRCUMFERENCE * 0.25,
                        stroke: color,
                        rotate: rotation * (i === 0 ? 1 : -1),
                    },
                    { duration: DRAW_DURATION, ease: 'easeOut' }
                );

                if (showProfiles[i]) {
                    animate(`#${c.id} .profile-clip`, { scale: 1 }, { duration: DRAW_DURATION, ease: 'easeOut' });
                    animate(`#${c.id} .profile-image-container`, { opacity: 1 }, { at: '<', duration: DRAW_DURATION });
                }
            });

            await sleep(DRAW_HOLD_DELAY);
        };

        const animateOff = async (circle: any) => {
            if (circle.hasProfile) {
                animate(`#${circle.id} .profile-image-container`, { opacity: 0 }, { duration: ERASE_DURATION, ease: 'easeIn' });
                animate(`#${circle.id} .profile-clip`, { scale: 0 }, { at: '<', duration: ERASE_DURATION, ease: 'easeIn' });
            }
            animate(
                `#${circle.id} .stroke-circle`,
                {
                    strokeDashoffset: CIRCUMFERENCE,
                    stroke: '#91e968',
                },
                { duration: ERASE_DURATION, ease: "easeIn" }
            );

            await sleep(ERASE_HOLD_DELAY);
        };

        const runCycle = async () => {
            while (!isCancelled) {
                if (animationIndex > 0 && animationIndex % 8 === 0) {
                    colorIndex++;
                }
                const currentColor = colors[colorIndex % colors.length];

                for (const activeCircle of activeCircleQueue) {
                    animate(
                        `#${activeCircle.id} .stroke-circle`,
                        { stroke: currentColor },
                        { duration: 0.5, ease: 'easeOut' }
                    );
                }

                const circle1 = shuffledCircles[animationIndex % shuffledCircles.length];
                const circle2 = shuffledCircles[(animationIndex + 1) % shuffledCircles.length];

                let showProfile1 = (animationIndex % 2 === 0) || profileIsPending;
                let showProfile2 = !showProfile1;

                profileIsPending = false;

                activeCircleQueue.push({ ...circle1, hasProfile: showProfile1 });
                activeCircleQueue.push({ ...circle2, hasProfile: showProfile2 });

                await animatePair(circle1, circle2, currentColor, [showProfiles[0], showProfiles[1]]);

                const DISPLAY_WINDOW = 7;
                while (activeCircleQueue.length > DISPLAY_WINDOW) {
                    const circleOff = activeCircleQueue.shift();
                    if (circleOff) await animateOff(circleOff);
                }

                animationIndex += 2;

                if (animationIndex >= shuffledCircles.length) {
                    shuffledCircles = shuffle(allCirclesFlat);
                    animationIndex = 0;
                }

                await sleep(NEXT_PAIR_DELAY);
            }
        };

        runCycle();

        return () => { isCancelled = true; };
    }, [animate, allCirclesFlat, shuffle]);

    const viewBoxWidth = SMALL_BOX_SIZE * 6;
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
