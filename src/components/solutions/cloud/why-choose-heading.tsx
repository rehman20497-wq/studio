'use client';

import { motion } from 'framer-motion';

const underlineVariants = {
    hidden: { pathLength: 0 },
    visible: {
        pathLength: 1,
        transition: {
            duration: 1.2,
            ease: "easeInOut",
            delay: 1.4
        }
    }
};

export default function WhyChooseHeading({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      className="relative flex justify-center py-8"
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
    >
      <h2 className="text-[72px] font-bold font-headline leading-[79px] text-zinc-900 text-center">
        Why Choose{' '}
        <span className="relative inline-block whitespace-nowrap">
            Telsys
            <motion.svg
                className="absolute -bottom-1 left-0 w-full h-auto overflow-visible"
                viewBox="0 0 250 20"
                preserveAspectRatio="none"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                <motion.path
                    d="M 5 10 C 50 2, 100 15, 150 10 S 245 5, 245 15"
                    fill="none"
                    stroke="black"
                    strokeWidth="4"
                    strokeLinecap="round"
                    variants={underlineVariants}
                />
            </motion.svg>
        </span>
      </h2>
    </motion.div>
  );
}
