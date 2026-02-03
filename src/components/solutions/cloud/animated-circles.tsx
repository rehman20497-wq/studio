'use client';

import { motion, useAnimate } from 'framer-motion';
import React, { useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';

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
const PROFILE_RADIUS = SMALL_CIRCLE_RADIUS - STROKE_WIDTH;

const profileImages = [
    '/cloud/365.png',
    '/cloud/aws.jpeg',
    '/cloud/cloud icon.png',
    '/cloud/micro.png',
    '/cloud/tpx.png',
  ];
  
let circleCounter = 0;

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
                image: profileImages[circleCounter % profileImages.length],
                key: circleCounter++,
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

const AnimatedCircle = ({ cx, cy, id, image }: { cx: number; cy: number; id: string; image: string; }) => {
    return (
        <g id={id}>
            <circle
                cx={cx}
                cy={cy}
                r={SMALL_CIRCLE_RADIUS}
                fill="none"
                stroke="#abe9ef"
                strokeOpacity={0.3}
                strokeWidth={STROKE_WIDTH}
            />
            <motion.circle
                id={`${id}-stroke`}
                className="stroke-circle"
                cx={cx}
                cy={cy}
                r={SMALL_CIRCLE_RADIUS}
                fill="none"
                stroke="transparent"
                strokeWidth={STROKE_WIDTH}
                initial={{ strokeDashoffset: SMALL_CIRCUMFERENCE }}
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

        const runTAnimation = async () => {
            const tPathH = scope.current.querySelector('#t-path-h') as SVGPathElement;
            const tPathV = scope.current.querySelector('#t-path-v') as SVGPathElement;
            if (tPathH && tPathV) {
                const tPathHLength = tPathH.getTotalLength();
                const tPathVLength = tPathV.getTotalLength();
    
                while (!isCancelled) {
                    // Set initial state (hidden)
                    await animate(tPathH, { strokeDasharray: tPathHLength, strokeDashoffset: tPathHLength }, { duration: 0 });
                    await animate(tPathV, { strokeDasharray: tPathVLength, strokeDashoffset: tPathVLength }, { duration: 0 });
    
                    await sleep(500);
    
                    // Draw animation
                    await animate(tPathH, { strokeDashoffset: 0 }, { duration: 0.5, ease: "easeInOut" });
                    await animate(tPathV, { strokeDashoffset: 0 }, { duration: 0.5, ease: "easeInOut" });
    
                    await sleep(2000); // Hold
    
                    // Undraw animation
                    await animate(tPathV, { strokeDashoffset: tPathVLength }, { duration: 0.5, ease: "easeInOut" });
                    await animate(tPathH, { strokeDashoffset: tPathHLength }, { duration: 0.5, ease: "easeInOut" });
    
                    await sleep(1000); // Wait before repeating
                }
            }
        };

        const runSmallCircleAnimation = async () => {
            await sleep(1000); 

            let activeCircleQueue: any[] = [];
            let profilesByRow: Record<number, number[]> = {};
            
            const NORMAL_LIFESPAN = 3200; // Lifespan for a circle without an image
            const PROFILE_LIFESPAN = 6000; // Lifespan for a circle with an image
            const ADD_INTERVAL = 400; // Interval to add a new circle

            let animationIndex = 0;
            let shuffledCircles = shuffle(allSmallCircles);

            const canShowProfile = (circle: any) => {
                const rowProfiles = profilesByRow[circle.row] || [];
                if (rowProfiles.length >= 2) return false;
                if (Math.random() > 0.3) return false;
                
                if (rowProfiles.length === 1) {
                    const existingCol = rowProfiles[0];
                    if (Math.abs(existingCol - circle.col) <= 1) return false;
                }
                return true;
            };

            const addProfile = (circle: any) => {
                if (!profilesByRow[circle.row]) profilesByRow[circle.row] = [];
                profilesByRow[circle.row].push(circle.col);
            };

            const removeProfile = (circle: any) => {
                if (profilesByRow[circle.row]) {
                    profilesByRow[circle.row] = profilesByRow[circle.row].filter(c => c !== circle.col);
                }
            };
            
            const animateOn = async (circle: any, showProfile: boolean) => {
                const randomRotation = Math.random() * 360;
                const randomStrokePercent = Math.random() * 0.25 + 0.65;
                const dashArray = `${SMALL_CIRCUMFERENCE * randomStrokePercent} ${SMALL_CIRCUMFERENCE * 2}`; 

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

                animate(
                    `#${circle.id}-stroke`,
                    { strokeDashoffset: 0 },
                    { duration: 1.5, ease: 'circOut' }
                );
                
                if (showProfile) {
                    animate(`#${circle.id} .profile-clip`, { scale: 1 }, { duration: 1.5, ease: 'circOut' });
                    animate(`#${circle.id} .profile-image-container`, { opacity: 1 }, { at: '<', duration: 1.5 });
                }
            };

            const animateOff = async (circle: any) => {
                if (circle.hasProfile) {
                    removeProfile(circle);
                    await Promise.all([
                        animate(`#${circle.id} .profile-clip`, { scale: 0 }, { duration: 1, ease: 'easeOut' }),
                        animate(`#${circle.id} .profile-image-container`, { opacity: 0 }, { duration: 1 })
                    ]);
                }

                await animate(
                    `#${circle.id}-stroke`,
                    { strokeDashoffset: -SMALL_CIRCUMFERENCE },
                    { duration: 1.5, ease: 'circIn' }
                );
                
                animate(`#${circle.id}-stroke`, { stroke: "transparent" }, { duration: 0 });
            };


            while (!isCancelled) {
                // --- Part 1: Remove old circles ---
                const now = Date.now();
                const circlesToRemove = activeCircleQueue.filter(c => now >= c.removeAt);
                if(circlesToRemove.length > 0) {
                    activeCircleQueue = activeCircleQueue.filter(c => now < c.removeAt);
                    for (const circle of circlesToRemove) {
                        animateOff(circle);
                    }
                }

                // --- Part 2: Add a new circle ---
                let circleOn;
                let isAlreadyActive;
                let attempts = 0;
                
                do {
                    circleOn = shuffledCircles[animationIndex % shuffledCircles.length];
                    isAlreadyActive = activeCircleQueue.some(c => c.id === circleOn.id);
                    animationIndex++;
                    if (animationIndex >= shuffledCircles.length) {
                        animationIndex = 0;
                        shuffledCircles = shuffle(allSmallCircles);
                    }
                    attempts++;
                } while (isAlreadyActive && attempts < shuffledCircles.length * 2);
                
                if (!isAlreadyActive) {
                    const showProfile = canShowProfile(circleOn);
                    if (showProfile) {
                        addProfile(circleOn);
                    }

                    const lifespan = showProfile ? PROFILE_LIFESPAN : NORMAL_LIFESPAN;
                    const activeCircle = { 
                        ...circleOn, 
                        hasProfile: showProfile,
                        removeAt: Date.now() + lifespan
                    };
                    activeCircleQueue.push(activeCircle);

                    animateOn(activeCircle, showProfile);
                }
                
                await sleep(ADD_INTERVAL);
            }
        };

        runTAnimation();
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
                   <AnimatedCircle
                        key={circle.key}
                        id={circle.id}
                        cx={circle.cx}
                        cy={circle.cy}
                        image={circle.image}
                   />
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
                    <g id="t-group">
                        <motion.path
                            id="t-path-h"
                            d={`M ${bigCircle.cx - 35},${bigCircle.cy - 35} H ${bigCircle.cx + 35}`}
                            stroke="white"
                            strokeWidth="10"
                            strokeLinecap="round"
                        />
                        <motion.path
                            id="t-path-v"
                            d={`M ${bigCircle.cx},${bigCircle.cy - 35} V ${bigCircle.cy + 40}`}
                            stroke="white"
                            strokeWidth="10"
                            strokeLinecap="round"
                        />
                    </g>
                </g>
            </svg>
        </div>
    );
}
