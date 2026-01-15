'use client';

import { motion, useAnimate } from 'framer-motion';
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import Image from 'next/image';

const CIRCLE_RADIUS = 45;
const STROKE_WIDTH = 12;
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
        rotation: [0, 90, 180, 270][Math.floor(Math.random() * 4)],
        key: circleCounter++,
      }))
    );
};

const AnimatedCircle = ({ cx, cy, id, image, rotation }: { cx: number; cy: number; id: string; image: string; rotation: number }) => {
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
                transform={`rotate(${rotation} ${cx} ${cy})`}
                initial={{ strokeDashoffset: CIRCUMFERENCE }}
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
    const [layout] = useState(generateInitialLayout());
    const isAnimatingRef = useRef(false);

    const zChains = useMemo(() => {
        const chains: any[][] = [];
        const circlesByRow = layout;

        for (let r = 0; r < circlesByRow.length - 1; r++) {
            const topRow = circlesByRow[r];
            const bottomRow = circlesByRow[r + 1];

            for (let i = 0; i < topRow.length - 1; i++) {
                const c1 = topRow[i];
                const c2 = topRow[i + 1];

                // Find potential C3 candidates in the bottom row that are "under" C2
                const potentialC3s = bottomRow.filter(c =>
                    Math.abs(c.cx - c2.cx) < BOX_SIZE
                );

                for (const c3 of potentialC3s) {
                    // Find a C4 candidate that is a direct neighbor of C3
                    const c4 = bottomRow.find(c => c.col === c3.col + 1);
                    if (c4) {
                        chains.push([c1, c2, c3, c4]);
                    }
                }
            }
        }
        return chains;
    }, [layout]);


    const animateChain = useCallback(async (chain: any[], color: string, direction: 'forward' | 'backward') => {
        isAnimatingRef.current = true;
        const orderedChain = direction === 'forward' ? chain : [...chain].reverse();

        const animateCircle = async (id: string) => {
            await animate(
                `#${id} .stroke-circle`,
                { strokeDashoffset: CIRCUMFERENCE * 0.25, stroke: color },
                { duration: 1.2, ease: "easeOut" }
            );
            await animate([
                [
                    `#${id} .profile-clip`,
                    { scale: [0, 1.1, 1] },
                    { duration: 1, ease: [0.34, 1.56, 0.64, 1] },
                ],
                [
                    `#${id} .profile-image-container`,
                    { opacity: 1 },
                    { at: '-0.8', duration: 0.8 },
                ],
            ]);
        };

        const unAnimateCircle = async (id: string) => {
             await animate([
                [
                    `#${id} .profile-image-container`,
                    { opacity: 0 },
                    { duration: 0.6, ease: 'easeIn' },
                ],
                [
                    `#${id} .profile-clip`,
                    { scale: 0 },
                    { at: '-0.4', duration: 0.8, ease: 'easeIn' },
                ],
            ]);
            await animate(
                `#${id} .stroke-circle`,
                { strokeDashoffset: CIRCUMFERENCE, stroke: '#f9f4e6' },
                { duration: 1.2, ease: "easeIn" }
            );
        };
        
        for (const circle of orderedChain) {
            await animateCircle(circle.id);
        }

        await new Promise(resolve => setTimeout(resolve, 1500));

        for (const circle of [...orderedChain].reverse()) {
            await unAnimateCircle(circle.id);
        }
        
        isAnimatingRef.current = false;
    }, [animate]);

    useEffect(() => {
        const colors = ["#00E5FF", "#7C4DFF", "#00FF9C", "#FF9100"];
        let colorIndex = 0;
        let chainIndex = 0;

        const runRandomAnimation = () => {
             if (isAnimatingRef.current || zChains.length === 0) return;

            const chainToAnimate = zChains[chainIndex % zChains.length];
            const currentColor = colors[colorIndex % colors.length];
            const direction = Math.random() > 0.5 ? 'forward' : 'backward';

            animateChain(chainToAnimate, currentColor, direction);

            chainIndex++;
            colorIndex++;
        };
        
        const interval = setInterval(runRandomAnimation, 7000);
        runRandomAnimation();
        
        return () => clearInterval(interval);

    }, [zChains, animateChain]);


    const viewBoxWidth = BOX_SIZE * 5;
    const viewBoxHeight = BOX_SIZE * 5;

    const allCircles = layout.flat();

    return (
        <div className="w-full h-full flex items-center justify-center">
            <svg 
                ref={scope}
                viewBox={`-20 0 ${viewBoxWidth} ${viewBoxHeight}`} 
                className="w-full max-w-2xl aspect-square"
            >
                {allCircles.map(({ id, cx, cy, image, rotation, key }) => 
                    <AnimatedCircle 
                        key={key} 
                        id={id} 
                        cx={cx} 
                        cy={cy}
                        image={image}
                        rotation={rotation}
                    />
                )}
            </svg>
        </div>
    );
}
