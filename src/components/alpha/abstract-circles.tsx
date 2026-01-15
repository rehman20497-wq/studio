
'use client';

import { motion, useAnimate } from 'framer-motion';
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
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

    const horizontalPairs = useMemo(() => {
        return layout.flatMap(rowCircles => {
            const pairs = [];
            for (let i = 0; i < rowCircles.length - 1; i++) {
                pairs.push([rowCircles[i], rowCircles[i + 1]]);
            }
            return pairs;
        });
    }, [layout]);

    const pickFourNonOverlappingPairs = useCallback(() => {
        const shuffledPairs = [...horizontalPairs].sort(() => 0.5 - Math.random());
        const selectedPairs = [];
        const usedRows = new Set();
        
        for (const pair of shuffledPairs) {
            if (selectedPairs.length >= 4) break;
            const rowIndex = pair[0].row;
            if (!usedRows.has(rowIndex)) {
                selectedPairs.push(pair);
                usedRows.add(rowIndex);
            }
        }
        return selectedPairs;
    }, [horizontalPairs]);

    useEffect(() => {
        const colors = ["#00E5FF", "#7C4DFF", "#00FF9C", "#FF9100"];
        let colorIndex = 0;

        const animateCircle = async (id: string, color: string, rotation: number, fillPercentage: number) => {
            const {cx, cy} = layout.flat().find(c => c.id === id)!;
            const circleElement = document.querySelector(`#${id} .stroke-circle`);
            if(circleElement) {
                circleElement.setAttribute('transform', `rotate(${rotation} ${cx} ${cy})`);
            }
            
            await animate(
                `#${id} .stroke-circle`,
                { strokeDashoffset: CIRCUMFERENCE * fillPercentage, stroke: color },
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
        
        const animatePair = async (pair: any[], color: string) => {
            const [c1, c2] = Math.random() > 0.5 ? pair : [...pair].reverse();
            
            const angle = Math.atan2(c2.cy - c1.cy, c2.cx - c1.cx) * (180 / Math.PI);

            // For c1 (75% fill), the gap is 25%. The middle of the gap is at 87.5% of the circumference (315 degrees).
            // To make this gap face c2, we rotate it by (angle - 315).
            const rotation1 = angle - 315;

            // For c2 (50% fill), the gap is 50%. The middle of the gap is at 75% of the circumference (270 degrees).
            // To make this gap face c1, the angle from c2 to c1 is (angle + 180). We rotate it by (angle + 180 - 270).
            const rotation2 = angle + 180 - 270;

            await animateCircle(c1.id, color, rotation1, 0.25); // 75% fill
            await animateCircle(c2.id, color, rotation2, 0.5); // 50% fill
        };


        const runAnimationCycle = async () => {
            if (isAnimatingRef.current) return;
            isAnimatingRef.current = true;
    
            const pairsToAnimate = pickFourNonOverlappingPairs();
            const currentColor = colors[colorIndex % colors.length];
    
            // Animate all pairs sequentially
            for (const pair of pairsToAnimate) {
                await animatePair(pair, currentColor);
            }
    
            // Pause with all circles visible
            await new Promise(resolve => setTimeout(resolve, 1500));
    
            const allAnimatedCircles = pairsToAnimate.flat();
            // Un-animate all circles in reverse sequence
            for (let i = allAnimatedCircles.length - 1; i >= 0; i--) {
                await unAnimateCircle(allAnimatedCircles[i].id);
            }
    
            colorIndex++;
            isAnimatingRef.current = false;
        };
        
        const interval = setInterval(runAnimationCycle, 1000);
        
        return () => clearInterval(interval);

    }, [pickFourNonOverlappingPairs, animate, layout, horizontalPairs]);


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
    
