
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CustomAccordion from "./custom-accordion";
import AnimatedT from "./alpha/animated-t";
import AnimatedButton from "./animated-button";

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
    <section ref={ref} className="bg-[#fff9e6] pt-8 pb-24 px-[8%]">
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
          <AnimatedT />
        </motion.div>
      </motion.div>
      <motion.div
        className="mt-24"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1 }}
      >
        <AnimatedButton />
      </motion.div>
    </section>
  );
}
