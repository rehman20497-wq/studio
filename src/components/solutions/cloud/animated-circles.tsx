'use client';

import { motion, useAnimate } from 'framer-motion';
import React, { useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { Cloud, Cpu, Wifi, Zap } from 'lucide-react';

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

const ICONS = [Cloud, Cpu, Wifi, Zap];

const profileImages = Array.from({ length: 15 }, (_, i) => ({
    type: 'image',
    src: `https://picsum.photos/seed/cloud-${i + 1}/100/100`
}));

const icons = ICONS.map(Icon => ({ type: 'icon', Component: Icon }));
const contentItems = [...profileImages, ...icons];

const generateCircles = (rows: number, cols: number, yOffset: number, idPrefix: string) => {
    return Array.from({ length: rows * cols }).map((_, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;
        return {
            id: `${idPrefix}-${i}`,
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
const SMALL_CIRCUMFERENCE = 2 * Math.PI * (SMALL_CIRCLE_RADIUS - STROKE_WIDTH / 2);


export default function AnimatedCircles() {
    const [scope, animate] = useAnimate();
    const inViewRef = useRef(null);
    const isInView = useAnimate(inViewRef, { once: true, amount: 0.5 });
    
    const shuffle = useCallback((array: any[]) => {
        return [...array].sort(() => 0.5 - Math.random());
    }, []);

    useEffect(() => {
        let isCancelled = false;

        const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

        const runAnimation = async () => {
            if (!scope.current) return;

            const colors = ['#00BCD4', '#00E5FF', '#7C4DFF', '#00FF9C'];
            let contentIndex = 0;

            const animateCircleOn = async (circle: any) => {
                const color = colors[Math.floor(Math.random() * colors.length)];
                const content = contentItems[contentIndex % contentItems.length];
                contentIndex++;

                // Animate stroke
                animate(
                    `#${circle.id}-stroke`,
                    { strokeDashoffset: 0, stroke: color },
                    { duration: 1, ease: 'circOut' }
                );

                // Animate content
                const clipPathSelector = `#clip-${circle.id} > circle`;
                const imageSelector = `image[data-circle-id='${circle.id}']`;
                const iconSelector = `g[data-circle-id='${circle.id}']`;

                if (content.type === 'image') {
                    const imageElement = scope.current.querySelector(imageSelector);
                    if (imageElement) {
                        imageElement.setAttributeNS('http://www.w3.org/1999/xlink', 'href', content.src);
                    }
                    animate(iconSelector, { opacity: 0 }, { duration: 0 });
                    animate(imageSelector, { opacity: 1 }, { duration: 0 });
                } else {
                    const iconContainer = scope.current.querySelector(iconSelector);
                    // This part is tricky without dynamic component rendering in the animation loop.
                    // We will just show/hide a pre-rendered icon for simplicity.
                    // For a real app, you'd want a more robust way to render the correct icon.
                    animate(imageSelector, { opacity: 0 }, { duration: 0 });
                    animate(iconSelector, { opacity: 1 }, { duration: 0 });
                }
                
                animate(clipPathSelector, { scale: 1 }, { duration: 0.8, ease: 'easeOut', delay: 0.2 });
            };

            const animateCircleOff = async (circle: any) => {
                animate(
                    `#${circle.id}-stroke`,
                    { strokeDashoffset: SMALL_CIRCUMFERENCE },
                    { duration: 1, ease: 'circIn', delay: 0.3 }
                );
                
                const clipPathSelector = `#clip-${circle.id} > circle`;
                animate(clipPathSelector, { scale: 0 }, { duration: 0.5, ease: 'easeIn' });
            };
            
            // Initial animation for the big circle
            animate(
                '#big-circle-icon',
                { opacity: [0, 1, 1, 0, 0], scale: [0.5, 1, 1, 0.5, 0.5] },
                { duration: 5, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }
            );

            await sleep(500); // Initial delay

            while (!isCancelled) {
                const shuffled = shuffle(allSmallCircles);
                const activeCount = Math.floor(Math.random() * 3) + 3; // 3 to 5 active circles
                const activeCircles = shuffled.slice(0, activeCount);
                
                await Promise.all(activeCircles.map(c => animateCircleOn(c)));
                
                await sleep(3000 + Math.random() * 2000);
                
                if (isCancelled) break;

                await Promise.all(activeCircles.map(c => animateCircleOff(c)));

                await sleep(1000);
            }
        };

        runAnimation();

        return () => {
            isCancelled = true;
        };
    }, [scope, animate, shuffle]);

    return (
        <div ref={inViewRef} className="w-full h-full flex items-center justify-center">
            <svg ref={scope} viewBox={`-10 -10 ${TOTAL_WIDTH + 20} ${TOTAL_HEIGHT + 20}`} className="w-full h-auto max-w-lg">
                <defs>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                    {allSmallCircles.map(circle => (
                        <clipPath key={`clip-def-${circle.id}`} id={`clip-${circle.id}`}>
                            <motion.circle
                                cx={circle.cx}
                                cy={circle.cy}
                                r={SMALL_CIRCLE_RADIUS - STROKE_WIDTH}
                                initial={{ scale: 0 }}
                            />
                        </clipPath>
                    ))}
                </defs>

                {/* Small Circles */}
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
                            stroke="#abe9ef"
                            strokeWidth={STROKE_WIDTH}
                            strokeDasharray={SMALL_CIRCUMFERENCE}
                            initial={{ strokeDashoffset: SMALL_CIRCUMFERENCE }}
                            transform={`rotate(-90 ${circle.cx} ${circle.cy})`}
                        />
                         <g clipPath={`url(#clip-${circle.id})`}>
                            <motion.image
                                data-circle-id={circle.id}
                                x={circle.cx - SMALL_CIRCLE_RADIUS}
                                y={circle.cy - SMALL_CIRCLE_RADIUS}
                                width={SMALL_CIRCLE_RADIUS * 2}
                                height={SMALL_CIRCLE_RADIUS * 2}
                                initial={{ opacity: 0 }}
                            />
                             <motion.g
                                data-circle-id={circle.id}
                                initial={{ opacity: 0 }}
                                transform={`translate(${circle.cx - 20}, ${circle.cy - 20})`}
                            >
                                <Cloud className="w-10 h-10 text-white" />
                             </motion.g>
                        </g>
                    </g>
                ))}

                {/* Big Circle */}
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
                    <motion.g
                        id="big-circle-icon"
                        initial={{ opacity: 0 }}
                    >
                        <Cloud
                            x={bigCircle.cx - 50}
                            y={bigCircle.cy - 50}
                            width={100}
                            height={100}
                            className="text-white"
                            strokeWidth={1}
                        />
                    </motion.g>
                </g>
            </svg>
        </div>
    );
}
