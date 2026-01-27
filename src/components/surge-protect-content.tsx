
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import MagneticButton from "./magnetic-button";

const listItems = [
  "Holiday Seasons",
  "Seasons of the year",
  "Tax Season",
  "Crisis Management",
  "Sporting Events",
  "Brand Campaigns",
  "Back to School",
  "Weather Events and more!",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 1.5, // Delay to start after background animation
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 100,
    },
  },
};

export default function SurgeProtectContent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      className="relative z-10 max-w-6xl mx-auto mt-16 grid md:grid-cols-5 gap-12 items-center px-4"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div variants={itemVariants} className="md:col-span-2">
        <p className="text-[20px] text-zinc-900 leading-[25.5px] max-w-md">
          From expected surges and urgent projects to unexpected demands, we've
          got your back. Access elite talent instantly, scale down seamlessly.
        </p>
        <div className="mt-8">
          <MagneticButton>
            <span className="text-[15px] font-bold">Talk to an Expert</span>
          </MagneticButton>
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-[5%] shadow-lg md:col-span-3"
      >
        <div className="absolute -inset-1 rounded-2xl border border-yellow-300/80 -z-10" />
        <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-zinc-900">
          {listItems.map((item, index) => (
            <motion.li
              key={index}
              className="flex items-center text-[20px] leading-[25.5px] group"
              custom={index}
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: (i) => ({
                  opacity: 1,
                  x: 0,
                  transition: {
                    delay: i * 0.1,
                    type: 'spring',
                    stiffness: 100
                  },
                }),
              }}
            >
              <span className="text-2xl mr-2 transform -translate-y-px transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900">&#8226;</span>
              <span className="transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900">
                {item}
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
