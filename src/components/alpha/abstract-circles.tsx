
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
    { row: 1, count: 4, offset: 0 },
    { row: 2, count: 5, offset: 0 },
    { row: 3, count: 4, offset: 1 },
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

const AnimatedCircle = ({ cx, cy, fillPercentage, imageUrl }: { cx: number; cy: number; fillPercentage: number; imageUrl: string; }) => {
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
                stroke="#F5D34A"
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
            <foreignObject x={cx - CIRCLE_RADIUS} y={cy - CIRCLE_RADIUS} width={CIRCLE_RADIUS * 2} height={CIRCLE_RADIUS * 2}>
                 <AnimatePresence>
                    {showImage && (
                        <motion.div
                            className="w-full h-full rounded-full overflow-hidden"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }}
                            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.4, ease: 'easeIn' } }}
                        >
                            <Image src={imageUrl} alt="Profile" width={50} height={50} className="w-full h-full object-cover" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </foreignObject>
        </g>
    );
};

export default function AbstractCircles() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const [animatedCircles, setAnimatedCircles] = useState<Array<{ id: number; percentage: number; imageUrl: string }>>([]);

    useEffect(() => {
        if (isInView) {
            const interval = setInterval(() => {
                const activeIds = new Set(animatedCircles.map(c => c.id));
                const availableCircles = ALL_CIRCLES.filter(c => !activeIds.has(c.id));

                if (availableCircles.length < 2) return;

                const numToAnimate = Math.floor(Math.random() * 2) + 2; // 2 to 3 circles
                const shuffled = availableCircles.sort(() => 0.5 - Math.random());
                const newAnimations = [];

                for (let i = 0; i < numToAnimate && i < shuffled.length; i++) {
                    newAnimations.push({
                        id: shuffled[i].id,
                        percentage: Math.floor(Math.random() * 36) + 60, // 60% to 95%
                        imageUrl: PROFILE_IMAGES[Math.floor(Math.random() * PROFILE_IMAGES.length)],
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
    }, [isInView, animatedCircles]);

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
