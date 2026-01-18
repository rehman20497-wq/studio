'use client';

import { motion, useAnimate } from 'framer-motion';
import React, { useEffect, useCallback, useRef } from 'react';

const SMALL_CIRCLE_RADIUS = 50;
const BIG_CIRCLE_RADIUS = 92.5;
const STROKE_WIDTH = 8;
const SPACING = 0;
const COLS = 7;
const ROWS_TOP = 3;
const ROWS_BOTTOM = 2;

const SMALL_BOX_SIZE = SMALL_CIRCLE_RADIUS * 2 + SPACING;
const TOTAL_WIDTH = COLS * SMALL_BOX_SIZE;
const TOTAL_HEIGHT = (ROWS_TOP + ROWS_BOTTOM) * SMALL_BOX_SIZE + BIG_CIRCLE_RADIUS * 2 + SPACING * 2;

const SMALL_CIRCUMFERENCE = 2 * Math.PI * (SMALL_CIRCLE_RADIUS - STROKE_WIDTH / 2);

const generateCircles = (rows: number, cols: number, yOffset: number, idPrefix: string) => {
    return Array.from({ length: rows * cols }).map((_, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;
        return {
            id: `${idPrefix}-${row}-${col}`,
            row,
            col,
            cx: col * SMALL_BOX_SIZE + SMALL_CIRCLE_RADIUS,
            cy: yOffset + row * SMALL_BOX_SIZE + SMALL_CIRCLE_RADIUS,
        };
    });
};

const topCircles = generateCircles(ROWS_TOP, COLS, 0, 'top');
const bigCircle = {
    id: 'big-center',
    cx: TOTAL_WIDTH / 2,
    cy: ROWS_TOP * SMALL_BOX_SIZE + SPACING + BIG_CIRCLE_RADIUS,
};
const bottomCirclesYOffset = ROWS_TOP * SMALL_BOX_SIZE + BIG_CIRCLE_RADIUS * 2 + SPACING * 2;
const bottomCircles = generateCircles(ROWS_BOTTOM, COLS, bottomCirclesYOffset, 'bottom');

const allSmallCircles = [...topCircles, ...bottomCircles];

const findNeighborPairs = () => {
    const pairs: [any, any][] = [];
    for (let i = 0; i < allSmallCircles.length; i++) {
        for (let j = i + 1; j < allSmallCircles.length; j++) {
            const c1 = allSmallCircles[i];
            const c2 = allSmallCircles[j];
            const dx = Math.abs(c1.cx - c2.cx);
            const dy = Math.abs(c1.cy - c2.cy);

            if ((dx < 1 && dy.toFixed(0) === SMALL_BOX_SIZE.toFixed(0)) || (dy < 1 && dx.toFixed(0) === SMALL_BOX_SIZE.toFixed(0))) {
                pairs.push([c1, c2]);
            }
        }
    }
    return pairs;
}

export default function AnimatedCircles() {
    const [scope, animate] = useAnimate();
    const neighborPairs = useRef<[any, any][]>([]);

    useEffect(() => {
        neighborPairs.current = findNeighborPairs();
    }, []);
    
    const shuffle = useCallback((array: any[]) => {
        return [...array].sort(() => 0.5 - Math.random());
    }, []);

    useEffect(() => {
        let isCancelled = false;
        if (!scope.current) return;

        const sleep = (ms: number) => new Promise(res => {
            if (isCancelled) return;
            setTimeout(res, ms);
        });

        // Big circle 'T' animation
        const tPath = scope.current.querySelector('#t-path');
        if (tPath) {
            const tPathLength = tPath.getTotalLength();
            animate(
                tPath, 
                { strokeDashoffset: [tPathLength, 0, 0, tPathLength, tPathLength] }, 
                { 
                    duration: 5, 
                    repeat: Infinity, 
                    repeatDelay: 1, 
                    ease: "easeInOut",
                    times: [0, 0.4, 0.6, 1, 1]
                }
            );
        }

        const runSmallCircleAnimation = async () => {
            await sleep(1000); // Initial delay
            while (!isCancelled) {
                const shuffledPairs = shuffle(neighborPairs.current);
                const pair = shuffledPairs[0];

                if (!pair) {
                    await sleep(1000);
                    continue;
                }

                const [circle1, circle2] = pair;
                
                const animateOn = async (circle: any, delay: number) => {
                    const randomRotation = Math.random() * 360;
                    const randomStrokePercent = Math.random() * 0.25 + 0.7; // 70% to 95%
                    const dashArray = `${SMALL_CIRCUMFERENCE * randomStrokePercent} ${SMALL_CIRCUMFERENCE}`;

                    animate(
                        `#${circle.id}-stroke`,
                        {
                            strokeDasharray: dashArray,
                            rotate: randomRotation,
                            strokeDashoffset: SMALL_CIRCUMFERENCE,
                        },
                        { duration: 0 }
                    );

                    await animate(
                        `#${circle.id}-stroke`,
                        { strokeDashoffset: 0 },
                        { duration: 1.5, ease: 'circOut', delay }
                    );
                }

                const animateOff = async (circle: any, delay: number) => {
                    await animate(
                        `#${circle.id}-stroke`,
                        { strokeDashoffset: -SMALL_CIRCUMFERENCE },
                        { duration: 1.5, ease: 'circIn', delay }
                    );
                }

                animateOn(circle1, 0);
                await animateOn(circle2, 0.2);

                await sleep(2500); 
                if (isCancelled) return;

                animateOff(circle1, 0);
                await animateOff(circle2, 0.2);

                await sleep(500);
            }
        };

        runSmallCircleAnimation();

        return () => { isCancelled = true; };
    }, [scope, animate, shuffle]);

    return (
        <div className="w-full h-full flex items-center justify-center">
            <svg ref={scope} viewBox={`-10 -10 ${TOTAL_WIDTH + 20} ${TOTAL_HEIGHT + 20}`} className="w-full h-auto max-w-lg">
                <defs>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>

                {allSmallCircles.map(circle => (
                    <g key={circle.id}>
                        <circle
                            cx={circle.cx}
                            cy={circle.cy}
                            r={SMALL_CIRCLE_RADIUS}
                            fill="none"
                            stroke="#abe9ef"
                            strokeOpacity={0.3}
                            strokeWidth={STROKE_WIDTH}
                        />
                        <motion.circle
                            id={`${circle.id}-stroke`}
                            cx={circle.cx}
                            cy={circle.cy}
                            r={SMALL_CIRCLE_RADIUS}
                            fill="none"
                            stroke="#00BCD4"
                            strokeWidth={STROKE_WIDTH}
                            initial={{ strokeDashoffset: SMALL_CIRCUMFERENCE }}
                            strokeLinecap="round"
                        />
                    </g>
                ))}

                <g>
                    <motion.circle
                        id="big-circle-bg"
                        cx={bigCircle.cx}
                        cy={bigCircle.cy}
                        r={BIG_CIRCLE_RADIUS}
                        fill="#00BCD4"
                        stroke="none"
                        filter="url(#glow)"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    />
                    <motion.path
                        id="t-path"
                        d={`M ${bigCircle.cx - 35},${bigCircle.cy - 35} H ${bigCircle.cx + 35} M ${bigCircle.cx},${bigCircle.cy - 35} V ${bigCircle.cy + 40}`}
                        stroke="white"
                        strokeWidth="10"
                        strokeLinecap="round"
                        style={{
                            strokeDasharray: 220,
                            strokeDashoffset: 220
                        }}
                    />
                </g>
            </svg>
        </div>
    );
}