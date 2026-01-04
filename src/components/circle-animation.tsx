
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const GRID_WIDTH = 6;
const GRID_HEIGHT = 6;
const CIRCLE_RADIUS = 28;
const PADDING = 12;
const TOTAL_WIDTH = GRID_WIDTH * (CIRCLE_RADIUS * 2 + PADDING) - PADDING;
const TOTAL_HEIGHT = GRID_HEIGHT * (CIRCLE_RADIUS * 2 + PADDING) - PADDING;

const numberOneCoords = [
  { x: 2, y: 0 },
  { x: 1, y: 1 },
  { x: 2, y: 1 },
  { x: 2, y: 2 },
  { x: 2, y: 3 },
  { x: 2, y: 4 },
  { x: 1, y: 5 },
  { x: 2, y: 5 },
  { x: 3, y: 5 },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.4,
      delayChildren: 0.5,
    },
  },
};

const circleVariants = {
  hidden: { stroke: "#ffea97", opacity: 0.3 },
  visible: {
    stroke: "#ffce07",
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function CircleAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div
      ref={ref}
      className="relative flex items-center justify-center bg-[#FEF9F2] p-8 rounded-xl h-full"
    >
      <motion.svg
        viewBox={`0 0 ${TOTAL_WIDTH} ${TOTAL_HEIGHT}`}
        width="100%"
        height="100%"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        preserveAspectRatio="xMidYMid meet"
      >
        {Array.from({ length: GRID_HEIGHT }).map((_, y) =>
          Array.from({ length: GRID_WIDTH }).map((_, x) => {
            const cx = x * (CIRCLE_RADIUS * 2 + PADDING) + CIRCLE_RADIUS;
            const cy = y * (CIRCLE_RADIUS * 2 + PADDING) + CIRCLE_RADIUS;
            const isPartOfNumber = numberOneCoords.some(
              (coord) => coord.x === x && coord.y === y
            );

            if (isPartOfNumber) {
              return (
                <motion.circle
                  key={`${x}-${y}`}
                  cx={cx}
                  cy={cy}
                  r={CIRCLE_RADIUS}
                  strokeWidth="3"
                  fill="transparent"
                  variants={circleVariants}
                />
              );
            }

            return (
              <circle
                key={`${x}-${y}`}
                cx={cx}
                cy={cy}
                r={CIRCLE_RADIUS}
                stroke="#ffea97"
                strokeWidth="3"
                fill="transparent"
                opacity={0.3}
              />
            );
          })
        )}
      </motion.svg>
    </div>
  );
}
