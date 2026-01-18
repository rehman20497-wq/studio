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
    'cloud-circle-1-4': <div className="text-black font-bold text-2xl">3</div>,
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

const AnimatedCircle = ({ cx, cy, id, content, delay }: { cx: number; cy: number; id: string; content?: React.ReactNode | string, delay: number }) => {
    const isImage = typeof content === 'string' && content.startsWith('https://');

    const circleVariants = {
        hidden: { 
            scale: 0, 
            opacity: 0 
        },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
                delay: delay * 0.05
            }
        }
    };
    
    const pulseVariants = {
      animate: {
        scale: [1, 1.05, 1],
        transition: {
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
          delay: delay * 0.2
        },
      },
    };

    return (
        <motion.g id={id} variants={circleVariants}>
            <motion.circle 
              cx={cx} 
              cy={cy} 
              r={CIRCLE_RADIUS} 
              fill="white" 
              fillOpacity="0.5" 
              variants={pulseVariants}
              animate="animate"
            />
            <circle
                className="stroke-circle"
                cx={cx}
                cy={cy}
                r={CIRCLE_RADIUS}
                fill="none"
                stroke="#00BCD4"
                strokeOpacity="0.4"
                strokeWidth={STROKE_WIDTH / 2}
            />
            {content && (
                <foreignObject
                    x={cx - CIRCLE_RADIUS}
                    y={cy - CIRCLE_RADIUS}
                    width={CIRCLE_RADIUS * 2}
                    height={CIRCLE_RADIUS * 2}
                >
                    <div className="w-full h-full flex items-center justify-center">
                        {isImage ? (
                             <div className="relative w-14 h-14 rounded-full overflow-hidden shadow-inner">
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
        </motion.g>
    );
};

export default function AnimatedCircles() {
    const [layout] = useState(generateInitialLayout);
    const allCirclesFlat = useMemo(() => layout.flat(), [layout]);
    const inViewRef = useRef(null);
    const isInView = useInView(inViewRef, { once: true, amount: 0.5 });


    const viewBoxWidth = BOX_SIZE * 5;
    const viewBoxHeight = BOX_SIZE * 4;

    return (
        <div ref={inViewRef} className="w-full h-full flex items-center justify-center">
            <motion.svg 
                viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} 
                className="w-full h-auto max-w-md"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={{
                    visible: { transition: { staggerChildren: 0.05 } }
                }}
            >
                {allCirclesFlat.map(({ id, cx, cy, content }, index) => 
                    <AnimatedCircle 
                        key={id} 
                        id={id} 
                        cx={cx} 
                        cy={cy}
                        content={content}
                        delay={index}
                    />
                )}
            </motion.svg>
        </div>
    );
}
