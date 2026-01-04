
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const arrowVariants = {
  initial: { opacity: 0, scale: 0.5 },
  animate: {
    opacity: [0, 1, 1, 0],
    scale: 1,
    transition: {
      duration: 1.5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 1,
    },
  },
};

const lineVariants = {
  initial: { pathLength: 0 },
  animate: {
    pathLength: 1,
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

export default function AnimatedButton() {
  return (
    <div className="relative w-full h-48 flex items-center justify-center">
      <div className="relative">
        {/* Left Arrow */}
        <motion.div
          className="absolute -left-20 top-1/2 -translate-y-1/2"
          initial={{ x: 0, y: "-50%" }}
          animate={{ x: 40, transition: { ...arrowVariants.animate.transition } }}
          variants={arrowVariants}
        >
          <Image
            src="/arrow-right.png"
            alt="Arrow"
            width={24}
            height={24}
            className="transform scale-x-[-1]"
          />
        </motion.div>

        {/* Right Arrow */}
        <motion.div
          className="absolute -right-20 top-1/2 -translate-y-1/2"
          initial={{ x: 0, y: "-50%" }}
          animate={{ x: -40, transition: { ...arrowVariants.animate.transition, delay: 0.2 } }}
          variants={arrowVariants}
        >
          <Image src="/arrow-right.png" alt="Arrow" width={24} height={24} />
        </motion.div>

        {/* Top-left decorative elements */}
        <motion.div
          className="absolute -top-8 -left-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="6" cy="6" r="4" fill="black" />
            <motion.path d="M35 5 C 20 20, 20 20, 5 35" stroke="black" strokeWidth="2" fill="none"
              variants={lineVariants} initial="initial" animate="animate"
            />
          </svg>
        </motion.div>

        {/* Bottom-right decorative elements */}
        <motion.div
          className="absolute -bottom-8 -right-8"
           animate={{ rotate: 360 }}
           transition={{ duration: 10, ease: "linear", repeat: Infinity, delay: 1 }}
        >
           <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="34" cy="34" r="4" fill="black" />
            <motion.path d="M5 35 C 20 20, 20 20, 35 5" stroke="black" strokeWidth="2" fill="none"
              variants={lineVariants} initial="initial" animate="animate" transition={{...lineVariants.animate.transition, delay: 0.5}}
            />
          </svg>
        </motion.div>
        
        {/* Top-right decorative curve */}
        <div className="absolute -top-4 -right-12">
           <svg width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path d="M 5 25 Q 20 0, 35 15" stroke="black" strokeWidth="2" fill="none"
              variants={lineVariants} initial="initial" animate="animate" transition={{...lineVariants.animate.transition, delay: 0.3}}
            />
          </svg>
        </div>

        {/* Bottom-left decorative curve */}
         <div className="absolute -bottom-4 -left-12">
           <svg width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path d="M 35 5 Q 20 30, 5 15" stroke="black" strokeWidth="2" fill="none"
               variants={lineVariants} initial="initial" animate="animate" transition={{...lineVariants.animate.transition, delay: 0.8}}
            />
          </svg>
        </div>


        <button className="bg-black text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:bg-zinc-800 transition-colors">
          Book a Meeting
        </button>
      </div>
    </div>
  );
}
