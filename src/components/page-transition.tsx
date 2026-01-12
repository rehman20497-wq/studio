'use client';

import { motion } from 'framer-motion';

export default function PageTransition() {
    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-full h-full bg-[#FCFBF8] origin-bottom z-[60]"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div 
                className="fixed top-0 left-0 w-full h-full bg-[#F5D34A] origin-bottom z-[70]"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
        </>
    )
}
