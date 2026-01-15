'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import React, { useRef, useState, useEffect } from 'react';

const circleRadius = 25;
const strokeWidth = 8;
const spacing = 0; // No gap

const totalRadius = circleRadius + strokeWidth / 2;
const boxSize = totalRadius * 2 + spacing;
const circumference = 2 * Math.PI * circleRadius;

const profileImages = [
    '/t.png',
    '/t1.png',
    '/t2.png',
    '/t3.png',
    '/1.jpg',
    '/2.jpg',
];

const gridLayout = [
    { row: 0, count: 3, offset: 2 }, // Top right
    { row: 1, count: 4, offset: 0 }, // Second row (left)
    { row: 2, count: 5, offset: 0 }, // Middle row
    { row: 3, count: 4, offset: 1 }, // Fourth row (right)
    { row: 4, count: 5, offset: 0 }, // Fifth row
    { row: 5, count: 3, offset: 0 }, // Bottom left
];

let circleCounter = 0;
const allCircles = gridLayout.flatMap(({ row, count, offset }) => {
    return Array.from({ length: count }).map((_, colIndex) => ({
        id: circleCounter++,
        cx: (colIndex + offset) * boxSize + boxSize / 2,
        cy: row * boxSize + boxSize / 2,
    }));
});

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

const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.5, ease: 'easeIn' },
    },
  };

const AnimatedCircle = ({ cx, cy, isAnimating, imageUrl }: { cx: number; cy: number; isAnimating: boolean; imageUrl: string | null }) => {
    const [showImage, setShowImage] = useState(false);
  
    useEffect(() => {
      let imageTimeout: NodeJS.Timeout;
      if (isAnimating) {
        // Start showing the image slightly before the stroke animation ends
        imageTimeout = setTimeout(() => {
          setShowImage(true);
        }, 1200); // 1.5s stroke duration - 0.3s
      }
  
      return () => clearTimeout(imageTimeout);
    }, [isAnimating]);

    useEffect(() => {
        let hideTimeout: NodeJS.Timeout;
        if(showImage) {
            // Hide the image after it has been visible for a while
            hideTimeout = setTimeout(() => {
                setShowImage(false);
            }, 2000); // Visible for 2 seconds
        }
        return () => clearTimeout(hideTimeout);
    }, [showImage]);

    return (
        <g>
            <circle
                cx={cx}
                cy={cy}
                r={circleRadius}
                fill="none"
                stroke="#f9f4e6"
                strokeWidth={strokeWidth}
            />
            <motion.circle
                cx={cx}
                cy={cy}
                r={circleRadius}
                fill="none"
                stroke="#F5D34A"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                transform={`rotate(-90 ${cx} ${cy})`}
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: isAnimating ? 0 : circumference }}
                transition={{ duration: 1.5, ease: "circOut" }}
            />
            <foreignObject x={cx - circleRadius} y={cy - circleRadius} width={circleRadius * 2} height={circleRadius * 2}>
                 <AnimatePresence>
                    {showImage && imageUrl && (
                        <motion.div
                            variants={imageVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="w-full h-full rounded-full overflow-hidden"
                        >
                            <Image src={imageUrl} alt="Profile" fill className="object-cover" />
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
    const [animatedCircles, setAnimatedCircles] = useState<Array<{ id: number; imageUrl: string }>>([]);

    useEffect(() => {
        if (isInView) {
            const interval = setInterval(() => {
                const animatedIds = animatedCircles.map(c => c.id);
                const availableCircles = allCircles.filter(c => !animatedIds.includes(c.id));
                
                if (availableCircles.length === 0) {
                    setAnimatedCircles([]);
                    return;
                }

                const newAnimated = [];
                const shuffled = [...availableCircles].sort(() => 0.5 - Math.random());
                const randomImage1 = profileImages[Math.floor(Math.random() * profileImages.length)];
                newAnimated.push({id: shuffled[0].id, imageUrl: randomImage1 });
                
                if (shuffled.length > 1) {
                    const randomImage2 = profileImages[Math.floor(Math.random() * profileImages.length)];
                    newAnimated.push({id: shuffled[1].id, imageUrl: randomImage2});
                }
                
                setAnimatedCircles(prev => [...prev, newAnimated[0]]);
                if (newAnimated.length > 1) {
                    setTimeout(() => {
                        setAnimatedCircles(prev => [...prev, newAnimated[1]]);
                    }, 800);
                }

                setTimeout(() => {
                    const idsToReset = newAnimated.map(c => c.id);
                    setAnimatedCircles(prev => prev.filter(c => !idsToReset.includes(c.id)));
                }, 4000);

            }, 2500);

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
      <svg viewBox={`0 0 ${boxSize * 5} ${boxSize * 6}`} className="w-full max-w-2xl aspect-square">
        {allCircles.map((circle) => {
            const animationInfo = animatedCircles.find(c => c.id === circle.id);
            return (
                <motion.g key={circle.id} variants={initialCircleVariants}>
                    <AnimatedCircle
                    cx={circle.cx}
                    cy={circle.cy}
                    isAnimating={!!animationInfo}
                    imageUrl={animationInfo?.imageUrl || null}
                    />
                </motion.g>
            )
        })}
      </svg>
    </motion.div>
  );
}
