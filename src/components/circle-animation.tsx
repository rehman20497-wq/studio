
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const GRID_WIDTH = 6;
const GRID_HEIGHT = 8;
const CIRCLE_RADIUS = 30;
const PADDING = 8;
const TOTAL_WIDTH = GRID_WIDTH * (CIRCLE_RADIUS * 2 + PADDING) - PADDING;
const TOTAL_HEIGHT = GRID_HEIGHT * (CIRCLE_RADIUS * 2 + PADDING) - PADDING;

const numberOneCoords = [
  { x: 2, y: 1 },
  { x: 1, y: 2 },
  { x: 2, y: 2 },
  { x: 2, y: 3 },
  { x: 2, y: 4 },
  { x: 2, y: 5 },
  { x: 1, y: 6 },
  { x: 2, y: 6 },
  { x: 3, y: 6 },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const circleVariants = {
  hidden: { fill: "transparent" },
  visible: {
    fill: "#F5D34A",
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

export default function CircleAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div
      ref={ref}
      className="relative flex items-center justify-center bg-[#FEF9F2] p-8 rounded-xl"
      style={{ aspectRatio: `${TOTAL_WIDTH} / ${TOTAL_HEIGHT}` }}
    >
      <motion.svg
        viewBox={`0 0 ${TOTAL_WIDTH} ${TOTAL_HEIGHT}`}
        width="100%"
        height="100%"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
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
                  stroke="#F5D34A"
                  strokeWidth="3"
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
                stroke="#F5D34A"
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
