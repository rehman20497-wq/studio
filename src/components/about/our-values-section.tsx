
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
      delayChildren: 0.3,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 2.5,
      ease: [0.25, 1, 0.5, 1],
      delay: 2.5, // Delay until after waves animate
    },
  },
};

const Wave = ({ d, color, from, duration = 2, delay = 0 }: { d: string; color: string; from: "left" | "right", duration?: number, delay?: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const pathVariants = {
      hidden: { pathLength: 0, pathOffset: from === "left" ? 0 : 1 },
      visible: { 
        pathLength: 1, 
        pathOffset: from === "left" ? 0 : 0,
        transition: { duration, ease: [0.42, 0, 0.58, 1], delay }
      }
    };
  
    return (
      <svg
        ref={ref}
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="w-full h-auto absolute inset-x-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ top: `${delay * 20}px`}}
      >
        <motion.path
          d={d}
          stroke={color}
          strokeWidth="100"
          strokeLinecap="round"
          variants={pathVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        />
      </svg>
    );
  };
  

export default function OurValuesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section ref={ref} className="bg-[#fff9e6] py-32 relative overflow-hidden h-[500px] flex items-center justify-center">
        <div className="absolute inset-0">
            <Wave 
                d="M-20 50 C 320 20, 1120 80, 1460 50"
                color="#D4EDCC"
                from="left"
                delay={0}
                duration={1.5}
            />
             <Wave 
                d="M-20 50 C 320 80, 1120 20, 1460 50"
                color="#C0E7F9"
                from="right"
                delay={0.4}
                duration={1.5}
            />
             <Wave 
                d="M-20 50 C 420 30, 1020 70, 1460 50"
                color="#FDE68A"
                from="left"
                delay={0.8}
                duration={1.5}
            />
             <Wave 
                d="M-20 50 C 220 70, 1220 30, 1460 50"
                color="#FED7D7"
                from="right"
                delay={1.2}
                duration={1.5}
            />
        </div>

        <motion.div
            className="relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
        >
            <motion.div variants={imageVariants}>
                <Image 
                    src="https://picsum.photos/seed/values/400/400"
                    alt="Our core values"
                    width={400}
                    height={400}
                    className="rounded-full object-cover shadow-2xl"
                    data-ai-hint="team values"
                />
            </motion.div>
        </motion.div>
    </section>
  );
}
