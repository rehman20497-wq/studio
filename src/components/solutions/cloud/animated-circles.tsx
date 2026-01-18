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

const generateCircles = (startRow: number, numRows: number, cols: number, yOffset: number, idPrefix: string) => {
    let circles = [];
    for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < cols; c++) {
            const globalRow = startRow + r;
            circles.push({
                id: `${idPrefix}-${globalRow}-${c}`,
                row: globalRow,
                col: c,
                cx: c * SMALL_BOX_SIZE + SMALL_CIRCLE_RADIUS,
                cy: yOffset + r * SMALL_BOX_SIZE + SMALL_CIRCLE_RADIUS,
            });
        }
    }
    return circles;
};

const topCircles = generateCircles(0, ROWS_TOP, COLS, 0, 'top');
const bigCircle = {
    id: 'big-center',
    cx: TOTAL_WIDTH / 2,
    cy: ROWS_TOP * SMALL_BOX_SIZE + SPACING + BIG_CIRCLE_RADIUS,
};
const bottomCirclesYOffset = ROWS_TOP * SMALL_BOX_SIZE + BIG_CIRCLE_RADIUS * 2 + SPACING * 2;
const bottomCircles = generateCircles(ROWS_TOP, ROWS_BOTTOM, COLS, bottomCirclesYOffset, 'bottom');

const allSmallCircles = [...topCircles, ...bottomCircles];

export default function AnimatedCircles() {
    const [scope, animate] = useAnimate();
    
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
            const tPathLength = (tPath as SVGPathElement).getTotalLength();
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

        const animateOn = async (circle: any) => {
            const randomRotation = Math.random() * 360;
            const randomStrokePercent = Math.random() * 0.25 + 0.65; // 65% to 90%
            // The large gap in the dash array is key to preventing the "leftover stroke" artifact
            const dashArray = `${SMALL_CIRCUMFERENCE * randomStrokePercent} ${SMALL_CIRCUMFERENCE * 2}`; 

            // Set initial properties for the animation
            animate(
                `#${circle.id}-stroke`,
                {
                    strokeDasharray: dashArray,
                    rotate: randomRotation,
                    strokeDashoffset: SMALL_CIRCUMFERENCE,
                    stroke: '#0badbf',
                },
                { duration: 0 }
            );

            // Animate the stroke into view
            await animate(
                `#${circle.id}-stroke`,
                { strokeDashoffset: 0 },
                { duration: 1.5, ease: 'circOut' }
            );
        };

        const animateOff = async (circle: any) => {
            // Animate the stroke out of view
            await animate(
                `#${circle.id}-stroke`,
                { strokeDashoffset: -SMALL_CIRCUMFERENCE },
                { duration: 1.5, ease: 'circIn' }
            );
        };

        const runSmallCircleAnimation = async () => {
            await sleep(1000); 

            const activeCircleQueue: any[] = [];
            const DISPLAY_WINDOW = 7; // How many circles are "on" at once
            let animationIndex = 0;
            let shuffledCircles = shuffle(allSmallCircles);

            while (!isCancelled) {
                const circleOn = shuffledCircles[animationIndex % shuffledCircles.length];
                activeCircleQueue.push(circleOn);

                // Animate the new circle ON
                animateOn(circleOn);
                
                // If the queue is full, animate the oldest circle OFF
                if (activeCircleQueue.length > DISPLAY_WINDOW) {
                    const circleOff = activeCircleQueue.shift();
                    if (circleOff) {
                       animateOff(circleOff);
                    }
                }

                animationIndex++;
                if (animationIndex >= shuffledCircles.length) {
                    animationIndex = 0;
                    shuffledCircles = shuffle(allSmallCircles);
                }

                await sleep(400); // Time between each new circle appearing
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
                            stroke="transparent"
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
                        fill="#0badbf"
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
