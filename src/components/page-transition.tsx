'use client';

import { motion } from 'framer-motion';

const sentence = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            delay: 0.3,
            staggerChildren: 0.15,
        },
    },
};

const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
        }
    },
};

const text = "TELSYS";

export default function PageTransition() {
    return (
        <>
            {/* Base Curtain (Off-white) - slower */}
            <motion.div
                className="fixed top-0 left-0 w-full h-full bg-[#FCFBF8] origin-top z-[60]"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 1 }}
                transition={{ duration: 1.5, ease: [0.83, 0, 0.17, 1] }}
            />

            {/* Top Curtain (Yellow) - faster */}
            <motion.div 
                className="fixed top-0 left-0 w-full h-full bg-[#F5D34A] origin-top z-[70] flex items-center justify-center"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 1 }}
                transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1] }}
            >
                <motion.h1
                    className="text-8xl md:text-9xl font-headline font-bold text-black overflow-hidden"
                    variants={sentence}
                    initial="hidden"
                    animate="visible"
                >
                    {text.split("").map((char, index) => (
                        <motion.span key={char + "-" + index} variants={letter}>
                            {char}
                        </motion.span>
                    ))}
                </motion.h1>
            </motion.div>
        </>
    )
}
