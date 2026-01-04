
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CustomAccordion from "./custom-accordion";
import CircleAnimation from "./circle-animation";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

export default function FaqSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="bg-white py-24 px-[5%]">
      <motion.div
        className="container mx-auto grid md:grid-cols-2 gap-16 items-stretch"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants}>
          <CustomAccordion />
        </motion.div>
        <motion.div variants={itemVariants} className="flex">
          <CircleAnimation />
        </motion.div>
      </motion.div>
    </section>
  );
}
