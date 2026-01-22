'use client';

import { motion, useAnimate } from 'framer-motion';
import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';

/* ------------------ CONFIG ------------------ */

const SMALL_CIRCLE_RADIUS = 75;   // increased size
const STROKE_WIDTH = 22;          // thickness
const SPACING = 0;

const SMALL_BOX_SIZE = SMALL_CIRCLE_RADIUS * 2 + SPACING;

/* ------------------ LAYOUT ------------------ */

const layoutRows = [
  { count: 7 }, // row 1
  { count: 7 }, // row 2
  { count: 7 }, // row 3
  { count: 5 }, // row 4
  { count: 3 }, // row 5
  { count: 1 }, // row 6
];

const MAX_COLS = 7;
const TOTAL_WIDTH = MAX_COLS * SMALL_BOX_SIZE;
const TOTAL_HEIGHT = layoutRows.length * SMALL_BOX_SIZE;

/* ------------------ CALCS ------------------ */

const SMALL_CIRCUMFERENCE = 2 * Math.PI * (SMALL_CIRCLE_RADIUS - STROKE_WIDTH / 2);
const PROFILE_RADIUS = SMALL_CIRCLE_RADIUS - STROKE_WIDTH;

/* ------------------ DATA ------------------ */

const profileImages = Array.from({ length: 35 }, (_, i) => `https://picsum.photos/seed/${i + 1}/150/150`);

let circleCounter = 0;

/* ------------------ GENERATOR ------------------ */

const generateLayoutCircles = () => {
  let circles: any[] = [];
  let y = 0;

  layoutRows.forEach((row, rowIndex) => {
    const rowWidth = row.count * SMALL_BOX_SIZE;
    const startX = (TOTAL_WIDTH - rowWidth) / 2; // ✅ always center aligned

    for (let c = 0; c < row.count; c++) {
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

const allSmallCircles = generateLayoutCircles();

/* ------------------ COMPONENTS ------------------ */

const AnimatedCircle = ({ cx, cy, id, image }: { cx: number; cy: number; id: string; image: string; }) => {
  return (
    <g id={id}>
      <circle
        cx={cx}
        cy={cy}
        r={SMALL_CIRCLE_RADIUS}
        fill="none"
        stroke="#cda9f9"
        strokeOpacity={0.3}
        strokeWidth={STROKE_WIDTH}
      />

      <motion.circle
        id={`${id}-stroke`}
        className="stroke-circle"
        cx={cx}
        cy={cy}
        r={SMALL_CIRCLE_RADIUS}
        fill="none"
        stroke="transparent"
        strokeWidth={STROKE_WIDTH}
        initial={{ strokeDashoffset: SMALL_CIRCUMFERENCE }}
        strokeLinecap="round"
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

/* ------------------ MAIN ------------------ */

export default function AnimatedCircles() {
  const [scope, animate] = useAnimate();

  const shuffle = useCallback((array: any[]) => {
    return [...array].sort(() => 0.5 - Math.random());
  }, []);

  useEffect(() => {
    let isCancelled = false;
    if (!scope.current) return;

    const sleep = (ms: number) => new Promise(res => {
      if (isCancelled) return;
      setTimeout(res, ms);
    });

    const runSmallCircleAnimation = async () => {
      await sleep(1000);

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

        animate(
          `#${circle.id}-stroke`,
          {
            strokeDasharray: dashArray,
            rotate: randomRotation,
            strokeDashoffset: SMALL_CIRCUMFERENCE,
            stroke: '#9a4afc',
          },
          { duration: 0 }
        );

        animate(
          `#${circle.id}-stroke`,
          { strokeDashoffset: 0 },
          { duration: 1.5, ease: 'circOut' }
        );

        if (showProfile) {
          animate(`#${circle.id} .profile-clip`, { scale: 1 }, { duration: 1.5, ease: 'circOut' });
          animate(`#${circle.id} .profile-image-container`, { opacity: 1 }, { at: '<', duration: 1.5 });
        }
      };

      const animateOff = async (circle: any) => {
        if (circle.hasProfile) {
          removeProfile(circle);
          await Promise.all([
            animate(`#${circle.id} .profile-clip`, { scale: 0 }, { duration: 1, ease: 'easeOut' }),
            animate(`#${circle.id} .profile-image-container`, { opacity: 0 }, { duration: 1 })
          ]);
        }

        await animate(
          `#${circle.id}-stroke`,
          { strokeDashoffset: -SMALL_CIRCUMFERENCE },
          { duration: 1.5, ease: 'circIn' }
        );

        animate(`#${circle.id}-stroke`, { stroke: "transparent" }, { duration: 0 });
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
          const activeCircle = {
            ...circleOn,
            hasProfile: showProfile,
            removeAt: Date.now() + lifespan
          };

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
    <div className="w-full h-full flex items-center justify-center">
      <svg
        ref={scope}
        viewBox={`-10 -10 ${TOTAL_WIDTH + 20} ${TOTAL_HEIGHT + 20}`}
        className="w-full h-auto max-w-lg"
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

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
