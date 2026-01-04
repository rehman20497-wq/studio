
"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const BrushStroke = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const pathVariants = {
    hidden: { pathLength: 0 },
    visible: { 
      pathLength: 1, 
      transition: { duration: 1.5, ease: [0.42, 0, 0.58, 1] }
    }
  };

  return (
    <div ref={ref} className="w-full">
      <svg
        viewBox="0 0 1440 94"
        preserveAspectRatio="none"
        className="w-full h-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M1440 63.3218C1273.33 86.6551 936.4 117.155 0 2V94H1440V63.3218Z"
          fill="#FDECEC"
          variants={pathVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        />
        <motion.path
          d="M-4 61C194 85.8333 806.8 117.5 1444 2V61H-4Z"
          fill="#FFEAE3"
          variants={pathVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={1}
        />
      </svg>
    </div>
  );
};

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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function LaunchStepsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    return (
        <section className="bg-[#FFF9F0] overflow-hidden">
            <BrushStroke />
            <motion.div
                ref={ref}
                className="container mx-auto px-4 py-24 text-center"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                <motion.div className="flex items-center justify-center gap-4" variants={itemVariants}>
                    <Image
                        src="/arrow.png"
                        alt="Arrow Icon"
                        width={40}
                        height={40}
                        className="object-contain"
                    />
                    <h2 className="text-4xl md:text-5xl font-headline font-medium text-zinc-900">
                        Launch in 5 easy steps
                    </h2>
                </motion.div>
                <motion.p 
                    className="mt-6 text-lg text-zinc-600 max-w-md mx-auto"
                    variants={itemVariants}
                >
                    We source, train, and assemble your new team in as little as 2 weeks. Once you go live, we continuously work to ensure you hit KPIs.
                </motion.p>
            </motion.div>
        </section>
    )
}
