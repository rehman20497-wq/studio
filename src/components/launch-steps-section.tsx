"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import LaunchBrushStroke from "./launch-brush-stroke";

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
        <section className="bg-[#fff9e6] overflow-hidden">
            <LaunchBrushStroke />
            <motion.div
                ref={ref}
                className="container mx-auto px-4 py-[2%] text-center"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                <motion.div className="flex items-center justify-center gap-4" variants={itemVariants}>
                    <Image
                        src="/arrow-right.png"
                        alt="Arrow Icon"
                        width={40}
                        height={40}
                        className="object-contain"
                    />
                    <h2 className="text-[46px] leading-[57px] font-headline font-medium text-zinc-900">
                        Launch in 5 easy steps
                    </h2>
                </motion.div>
                <motion.p 
                    className="mt-6 text-xl text-zinc-900 max-w-md mx-auto"
                    variants={itemVariants}
                >
                  We source, train, and assemble your new team in as little as 2 weeks. Once you go live, we continuously work to ensure you hit KPIs.
                </motion.p>
            </motion.div>
        </section>
    )
}
