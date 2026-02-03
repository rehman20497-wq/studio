'use client';

import { motion, useAnimate } from 'framer-motion';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import Image from 'next/image';

const CIRCLE_RADIUS = 27.5; // 55x55 circle
const STROKE_WIDTH = 6;    // same as requested
const SPACING = 0;



const DRAW_DURATION = 2;
const DRAW_HOLD_DELAY = 800;
const ERASE_DURATION = 2;
const ERASE_HOLD_DELAY = 600;
const NEXT_PAIR_DELAY = 1200;

const BOX_SIZE = CIRCLE_RADIUS * 2 + SPACING;
const CIRCUMFERENCE = 2 * Math.PI * (CIRCLE_RADIUS - STROKE_WIDTH / 2);
const PROFILE_RADIUS = CIRCLE_RADIUS - STROKE_WIDTH;

const GRID_LAYOUT_CONFIG = [
    { row: 0, count: 3, offset: 1 },
    { row: 1, count: 4, offset: 0.5 },
    { row: 2, count: 5, offset: 0 },
    { row: 3, count: 4, offset: 0.5 },
    { row: 4, count: 3, offset: 1 },
];

const profileImages = [
    '/profiles/8x8 icon.png',
    '/profiles/AT&T Logo.png',
    '/profiles/cloud icon.png',
    '/profiles/cloudflare icon.png',
    '/profiles/genesys icon.png',
    '/profiles/meeter icon.jpeg',
    '/profiles/ooma. icon.png',
    '/profiles/Ringcentral Icon.png',
    '/profiles/vonage icon.png',
    '/profiles/zoom icon.AVIF',
  ];
  

const getCircleId = (row: number, col: number) => `circle-${row}-${col}`;

const generateInitialLayout = () => {
    let circleCounter = 0;
    return GRID_LAYOUT_CONFIG.map(({ row, count, offset }) =>
        Array.from({ length: count }).map((_, colIndex) => ({
            id: getCircleId(row, colIndex),
            row: row,
            col: colIndex,
            cx: (colIndex + offset) * BOX_SIZE + (BOX_SIZE / 2),
            cy: row * BOX_SIZE + (BOX_SIZE / 2),
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
                r={CIRCLE_RADIUS}
                fill="none"
                stroke="#f9f4e6"
                strokeWidth={STROKE_WIDTH}
            />
            <motion.circle
                className="stroke-circle"
                cx={cx}
                cy={cy}
                r={CIRCLE_RADIUS}
                fill="none"
                stroke="#f9f4e6"
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

export default function AbstractCircles() {
    const [scope, animate] = useAnimate();
    const [layout] = useState(generateInitialLayout);
    const allCirclesFlat = useMemo(() => layout.flat(), [layout]);

    const shuffle = useCallback((array: any[]) => {
        return [...array].sort(() => 0.5 - Math.random());
    }, []);

    useEffect(() => {
        const colors = ["#ff9172", "#f6c841", "#61d7e2", "#b787e7", "#F5D34A"];
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
                    stroke: '#f9f4e6',
                },
                { duration: ERASE_DURATION, ease: "easeIn" }
            );

            await sleep(ERASE_HOLD_DELAY);
        };

        const runCycle = async () => {
            while (!isCancelled) {
                // Change color every 8 circles
                if (animationIndex > 0 && animationIndex % 8 === 0) {
                    colorIndex++;
                }
                const currentColor = colors[colorIndex % colors.length];

                // ✅ Update all currently active circle strokes to new color
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

                await animatePair(circle1, circle2, currentColor, [showProfile1, showProfile2]);

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

    const viewBoxWidth = BOX_SIZE * 5;
    const viewBoxHeight = BOX_SIZE * 5;

    return (
        <div className="w-full h-full flex items-center justify-center">
           <svg 
  ref={scope}
  viewBox={`-40 0 ${viewBoxWidth + 80} ${viewBoxHeight}`}
  preserveAspectRatio="xMidYMid meet"
  className="w-full h-full max-w-none"
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
