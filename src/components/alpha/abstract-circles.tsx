'use client';

import { motion, useAnimate } from 'framer-motion';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import Image from 'next/image';

const CIRCLE_RADIUS = 76;
const STROKE_WIDTH = 16;
const SPACING = 0;

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

const profileImages = Array.from({ length: 19 }, (_, i) => `https://picsum.photos/seed/${i + 1}/150/150`);

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
        const colors = ["#00E5FF", "#7C4DFF", "#00FF9C", "#FF9100", "#F5D34A"];
        let animationIndex = 0;
        let colorIndex = 0;
        
        let activeCircleQueue: any[] = [];
        let isCancelled = false;

        let shuffledCircles = shuffle(allCirclesFlat);

        const animateOn = (circle: any, showProfile: boolean, color: string) => {
            const { id } = circle;
            
            const fillPercentages = [0.25, 0.35, 0.5, 0.15]; // Corresponds to 75%, 65%, 50%, 85% fills
            const randomFill = fillPercentages[Math.floor(Math.random() * fillPercentages.length)];
            const randomRotation = Math.random() * 360;

            animate(
                `#${id} .stroke-circle`,
                { 
                    strokeDashoffset: CIRCUMFERENCE * randomFill, 
                    stroke: color,
                    rotate: randomRotation
                },
                { duration: 1.2, ease: "easeOut" }
            );
            
            if (showProfile) {
                animate(`#${id} .profile-clip`, { scale: [0, 1.1, 1] }, { duration: 1, ease: [0.34, 1.56, 0.64, 1] });
                animate(`#${id} .profile-image-container`, { opacity: 1 }, { at: '<', duration: 0.8 });
            }
        };

        const animateOff = (circle: any) => {
            const { id } = circle;
            
            animate(`#${id} .profile-image-container`, { opacity: 0 }, { duration: 0.6, ease: 'easeIn' });
            animate(`#${id} .profile-clip`, { scale: 0 }, { at: '<', duration: 0.8, ease: 'easeIn' });
            animate(
                `#${id} .stroke-circle`,
                { 
                    strokeDashoffset: CIRCUMFERENCE, 
                    stroke: '#f9f4e6',
                    rotate: Math.random() * 360 // Animate to a new random rotation on exit for fluidity
                },
                { at: '-0.4', duration: 1.2, ease: "easeIn" }
            );
        };
        
        const runCycle = async () => {
            while (!isCancelled) {
                const circleOn = shuffledCircles[animationIndex % shuffledCircles.length];
                
                activeCircleQueue.push(circleOn);
                
                if (animationIndex > 0 && animationIndex % 9 === 0) {
                    colorIndex++;
                    const newColor = colors[colorIndex % colors.length];
                    // Animate all currently active circles to the new color
                    activeCircleQueue.forEach(c => {
                        if (c) { // Ensure circle object exists
                            animate(`#${c.id} .stroke-circle`, { stroke: newColor }, { duration: 0.5, ease: 'easeInOut' });
                        }
                    });
                }

                // Always use the latest color for the new circle
                const currentColor = colors[colorIndex % colors.length];
                animateOn(circleOn, animationIndex % 2 === 0, currentColor);

                const DISPLAY_WINDOW = 6; 
                if (activeCircleQueue.length > DISPLAY_WINDOW) {
                    const circleOff = activeCircleQueue.shift();
                    if (circleOff) {
                        animateOff(circleOff);
                    }
                }

                animationIndex++;

                if (animationIndex > 0 && animationIndex % shuffledCircles.length === 0) {
                   shuffledCircles = shuffle(allCirclesFlat);
                }
                
                await new Promise(resolve => setTimeout(resolve, 800));
            }
        };
        
        runCycle();

        return () => {
            isCancelled = true;
        };
    }, [animate, allCirclesFlat, shuffle]);


    const viewBoxWidth = BOX_SIZE * 5;
    const viewBoxHeight = BOX_SIZE * 5;

    const allCircles = layout.flat();

    return (
        <div className="w-full h-full flex items-center justify-center">
            <svg 
                ref={scope}
                viewBox={`-40 0 ${viewBoxWidth + 80} ${viewBoxHeight}`} 
                className="w-full max-w-2xl aspect-square"
            >
                {allCircles.map(({ id, cx, cy, image, key }) => 
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
