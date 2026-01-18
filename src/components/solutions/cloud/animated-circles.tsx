
'use client';

import { motion, useAnimate, useInView } from 'framer-motion';
import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import Image from 'next/image';
import { MessageSquare, Mail, Clock, CheckSquare, Heart } from 'lucide-react';

const CIRCLE_RADIUS = 40;
const STROKE_WIDTH = 10;
const SPACING = 15;
const BOX_SIZE = CIRCLE_RADIUS * 2 + SPACING;
const CIRCUMFERENCE = 2 * Math.PI * (CIRCLE_RADIUS - STROKE_WIDTH / 2);

const GRID_LAYOUT_CONFIG = [
    { row: 0, count: 5, offset: 0 },
    { row: 1, count: 5, offset: 0 },
    { row: 2, count: 5, offset: 0 },
    { row: 3, count: 5, offset: 0 },
];

const profileImages = [
    'https://picsum.photos/seed/prof1/80/80',
    'https://picsum.photos/seed/prof2/80/80',
    'https://picsum.photos/seed/prof3/80/80',
];

const getCircleId = (row: number, col: number) => `cloud-circle-${row}-${col}`;

const specialContentMap: { [key: string]: React.ReactNode | string } = {
    'cloud-circle-1-0': <MessageSquare className="w-6 h-6 text-black" />,
    'cloud-circle-1-2': <Mail className="w-6 h-6 text-black" />,
    'cloud-circle-1-4': <div className="text-black font-bold">3</div>,
    'cloud-circle-2-0': profileImages[0],
    'cloud-circle-2-2': profileImages[1],
    'cloud-circle-2-4': profileImages[2],
    'cloud-circle-3-1': <Clock className="w-6 h-6 text-black" />,
    'cloud-circle-3-3': <CheckSquare className="w-6 h-6 text-black" />,
    'cloud-circle-3-4': <Heart className="w-6 h-6 text-black" />,
};


const generateInitialLayout = () => {
    return GRID_LAYOUT_CONFIG.map(({ row, count, offset }) =>
        Array.from({ length: count }).map((_, colIndex) => ({
            id: getCircleId(row, colIndex),
            cx: (colIndex + offset) * BOX_SIZE + CIRCLE_RADIUS,
            cy: row * BOX_SIZE + CIRCLE_RADIUS,
            content: specialContentMap[getCircleId(row, colIndex)],
        }))
    );
};

const AnimatedCircle = ({ cx, cy, id, content }: { cx: number; cy: number; id: string; content?: React.ReactNode | string }) => {
    const isImage = typeof content === 'string' && content.startsWith('https://');
    return (
        <g id={id}>
            <circle cx={cx} cy={cy} r={CIRCLE_RADIUS} fill="white" fillOpacity="0.3" />
            <motion.circle
                className="stroke-circle"
                cx={cx}
                cy={cy}
                r={CIRCLE_RADIUS}
                fill="none"
                stroke="#00BCD4"
                strokeWidth={STROKE_WIDTH}
                strokeDasharray={`${CIRCUMFERENCE}`}
                strokeDashoffset={CIRCUMFERENCE}
                strokeLinecap="round"
            />
            {content && (
                <foreignObject
                    x={cx - CIRCLE_RADIUS}
                    y={cy - CIRCLE_RADIUS}
                    width={CIRCLE_RADIUS*2}
                    height={CIRCLE_RADIUS*2}
                >
                    <div className="w-full h-full flex items-center justify-center">
                        {isImage ? (
                             <div className="relative w-14 h-14 rounded-full overflow-hidden">
                                <Image src={content as string} alt="profile" fill className="object-cover" />
                             </div>
                        ) : (
                            <div className="flex items-center justify-center w-full h-full">
                                {content}
                            </div>
                        )}
                    </div>
                </foreignObject>
            )}
        </g>
    );
};

export default function AnimatedCircles() {
    const [scope, animate] = useAnimate();
    const [layout] = useState(generateInitialLayout);
    const allCirclesFlat = useMemo(() => layout.flat(), [layout]);
    const inViewRef = useRef(null);
    const isInView = useInView(inViewRef, { once: false, amount: 0.5 });


    const shuffle = useCallback((array: any[]) => {
        return [...array].sort(() => 0.5 - Math.random());
    }, []);

    useEffect(() => {
        if (!isInView) return;

        const sequence = [
            // C shape
            [getCircleId(0, 2), getCircleId(0, 1), getCircleId(1, 1), getCircleId(2, 1), getCircleId(2, 2)],
            // S shape
            [getCircleId(1, 3), getCircleId(0, 3), getCircleId(0, 4), getCircleId(1, 4), getCircleId(2, 4), getCircleId(2, 3)],
            // Large C
            [getCircleId(0, 0), getCircleId(1, 0), getCircleId(2, 0), getCircleId(3,0), getCircleId(3,1), getCircleId(3,2), getCircleId(3,3), getCircleId(3,4)],
        ];

        let isCancelled = false;

        const animateSnake = async (path: string[], duration: number) => {
            const pathLength = path.length;
            const segmentDuration = duration / pathLength;
            
            for (let i = 0; i < pathLength; i++) {
                if (isCancelled) return;
                const circleId = path[i];
                animate(
                    `#${circleId} .stroke-circle`,
                    { strokeDashoffset: [CIRCUMFERENCE, 0] },
                    { duration: segmentDuration, at: `+${(i * segmentDuration) * 0.5}` }
                );
            }
             await new Promise(res => setTimeout(res, duration * 1000 * 1.2));
             if (isCancelled) return;
            for (let i = 0; i < pathLength; i++) {
                 if (isCancelled) return;
                const circleId = path[i];
                animate(
                    `#${circleId} .stroke-circle`,
                    { strokeDashoffset: CIRCUMFERENCE },
                    { duration: segmentDuration, at: `+${(i * segmentDuration) * 0.5}` }
                );
            }
        };

        const runAnimation = async () => {
            while(!isCancelled) {
                const shuffledSequence = shuffle(sequence);
                await animateSnake(shuffledSequence[0], 4);
                if (isCancelled) return;
                await new Promise(res => setTimeout(res, 500));
                 if (isCancelled) return;
                await animateSnake(shuffledSequence[1], 5);
                 if (isCancelled) return;
                await new Promise(res => setTimeout(res, 500));
                 if (isCancelled) return;
                await animateSnake(shuffledSequence[2], 7);
                 if (isCancelled) return;
                await new Promise(res => setTimeout(res, 1000));
            }
        }
        
        runAnimation();
        return () => { isCancelled = true; };

    }, [isInView, animate, shuffle]);

    const viewBoxWidth = BOX_SIZE * 5;
    const viewBoxHeight = BOX_SIZE * 4;

    return (
        <div ref={inViewRef} className="w-full h-full flex items-center justify-center">
            <motion.svg 
                ref={scope}
                viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} 
                className="w-full h-auto max-w-md aspect-square"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={{
                    visible: { transition: { staggerChildren: 0.05 } }
                }}
            >
                {allCirclesFlat.map(({ id, cx, cy, content }) => 
                    <motion.g key={id} variants={{hidden: {opacity: 0, scale: 0.8}, visible: {opacity: 1, scale: 1}}}>
                        <AnimatedCircle 
                            id={id} 
                            cx={cx} 
                            cy={cy}
                            content={content}
                        />
                    </motion.g>
                )}
                 <motion.g
                    initial={{opacity: 0, scale: 0.5}}
                    animate={isInView ? {opacity: 1, scale: 1, transition: {delay: 1.5, type: 'spring'}} : {}}
                 >
                    <circle cx={BOX_SIZE * 2.5} cy={BOX_SIZE * 2.5} r={CIRCLE_RADIUS * 1.5} fill="#00BCD4" />
                    <text x={BOX_SIZE * 2.5} y={BOX_SIZE * 2.5} textAnchor="middle" dy=".3em" fill="white" fontSize="40" className="font-bold">
                       3
                    </text>
                </motion.g>
            </svg>
        </div>
    );
}
