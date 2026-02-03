'use client';

import { motion, useAnimate } from 'framer-motion';
import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';

/* ------------------ DESIGN CONFIG ------------------ */
const SMALL_CIRCLE_RADIUS = 48;
const STROKE_WIDTH = 12;
const SPACING = 6;

// Right aligned pyramid
const ROW_PATTERN = [2, 2, 4, 4, 6, 6];

const SMALL_BOX_SIZE = SMALL_CIRCLE_RADIUS * 2 + SPACING;
const TOTAL_WIDTH = 6 * SMALL_BOX_SIZE;
const TOTAL_HEIGHT = ROW_PATTERN.length * SMALL_BOX_SIZE;

const SMALL_CIRCUMFERENCE = 2 * Math.PI * (SMALL_CIRCLE_RADIUS - STROKE_WIDTH / 2);
const PROFILE_RADIUS = SMALL_CIRCLE_RADIUS - STROKE_WIDTH;

const profileImages = [
  '/com/8x8.png',
  '/com/ooma.jpeg',
  '/com/Ring.png',
  '/com/vonoage.png',
  '/com/zoom.png',
];
let circleCounter = 0;

/* ------------------ RIGHT ALIGNED GENERATOR ------------------ */
const generateRightAlignedCircles = () => {
  let circles: any[] = [];
  let y = 0;

  ROW_PATTERN.forEach((cols, rowIndex) => {
    const rowWidth = cols * SMALL_BOX_SIZE;
    const startX = TOTAL_WIDTH - rowWidth; // right align

    for (let c = 0; c < cols; c++) {
      circles.push({
        id: `row-${rowIndex}-col-${c}`,
        row: rowIndex,
        col: c,
        cx: startX + c * SMALL_BOX_SIZE + SMALL_CIRCLE_RADIUS,
        cy: y + SMALL_CIRCLE_RADIUS,
        image: profileImages[circleCounter % profileImages.length],
        key: circleCounter++,
      });
    }
    y += SMALL_BOX_SIZE;
  });

  return circles;
};

const allSmallCircles = generateRightAlignedCircles();

/* ------------------ COMPONENTS ------------------ */
const AnimatedCircle = ({ cx, cy, id, image }: { cx: number; cy: number; id: string; image: string }) => {
  return (
    <g id={id}>
      {/* Normal static stroke */}
      <circle
        cx={cx}
        cy={cy}
        r={SMALL_CIRCLE_RADIUS}
        fill="none"
        stroke="#91e968"
        strokeOpacity={0.5}
        strokeWidth={STROKE_WIDTH}
      />

      {/* Animated stroke */}
      <motion.circle
        id={`${id}-stroke`}
        cx={cx}
        cy={cy}
        r={SMALL_CIRCLE_RADIUS}
        fill="none"
        stroke="transparent"
        strokeWidth={STROKE_WIDTH}
        initial={{ strokeDashoffset: SMALL_CIRCUMFERENCE }}
        strokeLinecap="round"
      />

      {/* Clip for image */}
      <clipPath id={`clip-${id}`}>
        <motion.circle
          cx={cx}
          cy={cy}
          r={PROFILE_RADIUS}
          initial={{ scale: 0 }}
        />
      </clipPath>

      <g clipPath={`url(#clip-${id})`}>
        <motion.foreignObject
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

/* ------------------ MAIN ------------------ */
export default function AnimatedCircles() {
  const [scope, animate] = useAnimate();

  const shuffle = useCallback((array: any[]) => {
    return [...array].sort(() => 0.5 - Math.random());
  }, []);

  useEffect(() => {
    let isCancelled = false;
    if (!scope.current) return;

    const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

    /* -------- SMALL CIRCLE ANIMATION -------- */
    const runSmallCircleAnimation = async () => {
      await sleep(800);

      let activeCircleQueue: any[] = [];
      let profilesByRow: Record<number, number[]> = {};

      const NORMAL_LIFESPAN = 3200;
      const PROFILE_LIFESPAN = 6000;
      const ADD_INTERVAL = 400;

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

        animate(`#${circle.id}-stroke`, {
          strokeDasharray: dashArray,
          rotate: randomRotation,
          strokeDashoffset: SMALL_CIRCUMFERENCE,
          stroke: '#50b720',
        }, { duration: 0 });

        animate(`#${circle.id}-stroke`, { strokeDashoffset: 0 }, { duration: 1.5, ease: 'circOut' });

        if (showProfile) {
          animate(`#${circle.id} circle`, { scale: 1 }, { duration: 1.5, ease: 'circOut' });
          animate(`#${circle.id} foreignObject`, { opacity: 1 }, { at: '<', duration: 1.5 });
        }
      };

      const animateOff = async (circle: any) => {
        if (circle.hasProfile) {
          removeProfile(circle);
          await Promise.all([
            animate(`#${circle.id} circle`, { scale: 0 }, { duration: 1, ease: 'easeOut' }),
            animate(`#${circle.id} foreignObject`, { opacity: 0 }, { duration: 1 })
          ]);
        }

        await animate(`#${circle.id}-stroke`, { strokeDashoffset: -SMALL_CIRCUMFERENCE }, { duration: 1.5, ease: 'circIn' });
        animate(`#${circle.id}-stroke`, { stroke: 'transparent' }, { duration: 0 });
      };

      while (!isCancelled) {
        const now = Date.now();
        const circlesToRemove = activeCircleQueue.filter(c => now >= c.removeAt);
        if (circlesToRemove.length > 0) {
          activeCircleQueue = activeCircleQueue.filter(c => now < c.removeAt);
          for (const circle of circlesToRemove) animateOff(circle);
        }

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
          if (showProfile) addProfile(circleOn);

          const lifespan = showProfile ? PROFILE_LIFESPAN : NORMAL_LIFESPAN;
          const activeCircle = { ...circleOn, hasProfile: showProfile, removeAt: Date.now() + lifespan };
          activeCircleQueue.push(activeCircle);

          animateOn(activeCircle, showProfile);
        }

        await sleep(ADD_INTERVAL);
      }
    };

    runSmallCircleAnimation();

    return () => { isCancelled = true; };
  }, [scope, animate, shuffle]);

  return (
    <div className="w-full h-full flex items-center justify-end">
      <svg ref={scope} viewBox={`-10 -10 ${TOTAL_WIDTH + 20} ${TOTAL_HEIGHT + 20}`} className="w-full h-auto max-w-lg">
        {allSmallCircles.map(circle => (
          <AnimatedCircle
            key={circle.key}
            id={circle.id}
            cx={circle.cx}
            cy={circle.cy}
            image={circle.image}
          />
        ))}
      </svg>
    </div>
  );
}
