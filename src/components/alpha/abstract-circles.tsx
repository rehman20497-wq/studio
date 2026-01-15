
'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

const CIRCLE_RADIUS = 25;
const STROKE_WIDTH = 8;
const SPACING = 0;

const TOTAL_RADIUS = CIRCLE_RADIUS + STROKE_WIDTH / 2;
const BOX_SIZE = TOTAL_RADIUS * 2 + SPACING;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

const GRID_LAYOUT = [
    { row: 0, count: 3, offset: 2 },
    { row: 1, count: 4, offset: 1 },
    { row: 2, count: 5, offset: 0 },
    { row: 3, count: 4, offset: 0 },
    { row: 4, count: 5, offset: 0 },
    { row: 5, count: 3, offset: 0 },
];

let circleCounter = 0;
const ALL_CIRCLES = GRID_LAYOUT.flatMap(({ row, count, offset }) => 
    Array.from({ length: count }).map((_, colIndex) => ({
        id: circleCounter++,
        cx: (colIndex + offset) * BOX_SIZE + BOX_SIZE / 2,
        cy: row * BOX_SIZE + BOX_SIZE / 2,
    }))
);

const PROFILE_IMAGES = [
    'https://picsum.photos/seed/prof1/80/80',
    'https://picsum.photos/seed/prof2/80/80',
    'https://picsum.photos/seed/prof3/80/80',
    'https://picsum.photos/seed/prof4/80/80',
    'https://picsum.photos/seed/prof5/80/80',
    'https://picsum.photos/seed/prof6/80/80',
];

const STROKE_COLORS = [
    '#F5D34A', // Yellow
    '#0badbf', // Cyan
    '#4ab01b', // Green
    '#ec4899', // Pink
    '#8b5cf6', // Purple
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

const initialCircleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
        scale: 1, 
        opacity: 1,
        transition: {
            type: 'spring',
            damping: 15,
            stiffness: 100
        }
    },
};

const AnimatedCircle = ({ cx, cy, fillPercentage, imageUrl, color }: { cx: number; cy: number; fillPercentage: number; imageUrl: string; color: string; }) => {
    const strokeDashoffset = CIRCUMFERENCE * (1 - fillPercentage / 100);
    const [showImage, setShowImage] = useState(false);

    useEffect(() => {
        const imageTimer = setTimeout(() => {
            setShowImage(true);
        }, 800); // Start image fade-in slightly before stroke finishes

        return () => clearTimeout(imageTimer);
    }, []);

    return (
        <g>
            {/* Background Circle */}
            <circle
                cx={cx}
                cy={cy}
                r={CIRCLE_RADIUS}
                fill="none"
                stroke="#f9f4e6"
                strokeWidth={STROKE_WIDTH}
            />
            {/* Animated Stroke */}
            <motion.circle
                cx={cx}
                cy={cy}
                r={CIRCLE_RADIUS}
                fill="none"
                stroke={color}
                strokeWidth={STROKE_WIDTH}
                strokeLinecap="round"
                transform={`rotate(-90 ${cx} ${cy})`}
                strokeDasharray={CIRCUMFERENCE}
                initial={{ strokeDashoffset: CIRCUMFERENCE }}
                animate={{ strokeDashoffset }}
                exit={{ strokeDashoffset: CIRCUMFERENCE }}
                transition={{ duration: 1.5, ease: "circOut" }}
            />
            {/* Animated Image */}
            <foreignObject x={cx - CIRCLE_RADIUS} y={cy - CIRCLE_RADIUS} width={CIRCLE_RADIUS * 2} height={CIRCLE_RADIUS * 2} style={{ overflow: 'visible' }}>
                 <div className="w-full h-full flex items-center justify-center">
                    <AnimatePresence>
                        {showImage && (
                            <motion.div
                                className="relative rounded-full overflow-hidden"
                                style={{
                                    width: (CIRCLE_RADIUS - 8) * 2,
                                    height: (CIRCLE_RADIUS - 8) * 2,
                                }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }}
                                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.4, ease: 'easeIn' } }}
                            >
                                <Image src={imageUrl} alt="Profile" fill className="object-cover" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </foreignObject>
        </g>
    );
};

export default function AbstractCircles() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const [animatedCircles, setAnimatedCircles] = useState<Array<{ id: number; percentage: number; imageUrl: string; color: string; }>>([]);
    const [colorIndex, setColorIndex] = useState(0);

    useEffect(() => {
        if (isInView) {
            const interval = setInterval(() => {
                const activeIds = new Set(animatedCircles.map(c => c.id));
                const availableCircles = ALL_CIRCLES.filter(c => !activeIds.has(c.id));

                if (availableCircles.length < 2) return;

                const numToAnimate = Math.floor(Math.random() * 2) + 2; // 2 to 3 circles
                const shuffled = availableCircles.sort(() => 0.5 - Math.random());
                const newAnimations = [];
                
                const currentColor = STROKE_COLORS[colorIndex];
                setColorIndex(prev => (prev + 1) % STROKE_COLORS.length);


                for (let i = 0; i < numToAnimate && i < shuffled.length; i++) {
                    newAnimations.push({
                        id: shuffled[i].id,
                        percentage: Math.floor(Math.random() * 36) + 60, // 60% to 95%
                        imageUrl: PROFILE_IMAGES[Math.floor(Math.random() * PROFILE_IMAGES.length)],
                        color: currentColor,
                    });
                }
                
                setAnimatedCircles(prev => [...prev, ...newAnimations]);
                
                setTimeout(() => {
                    const idsToRemove = newAnimations.map(a => a.id);
                    setAnimatedCircles(prev => prev.filter(c => !idsToRemove.includes(c.id)));
                }, 3000);

            }, 1200); 

            return () => clearInterval(interval);
        }
    }, [isInView, animatedCircles, colorIndex]);

  return (
    <motion.div
      ref={ref}
      className="w-full h-full flex items-center justify-center"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <svg viewBox={`0 0 ${BOX_SIZE * 5} ${BOX_SIZE * 6}`} className="w-full max-w-2xl aspect-square">
        <AnimatePresence>
            {ALL_CIRCLES.map((circle) => {
                const animationInfo = animatedCircles.find(c => c.id === circle.id);
                return (
                    <motion.g key={circle.id} variants={initialCircleVariants}>
                       {animationInfo ? (
                           <AnimatedCircle
                                cx={circle.cx}
                                cy={circle.cy}
                                fillPercentage={animationInfo.percentage}
                                imageUrl={animationInfo.imageUrl}
                                color={animationInfo.color}
                           />
                       ) : (
                        <circle
                            cx={circle.cx}
                            cy={circle.cy}
                            r={CIRCLE_RADIUS}
                            fill="none"
                            stroke="#f9f4e6"
                            strokeWidth={STROKE_WIDTH}
                        />
                       )}
                    </motion.g>
                )
            })}
        </AnimatePresence>
      </svg>
    </motion.div>
  );
}
