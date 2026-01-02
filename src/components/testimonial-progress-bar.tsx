
"use client";

import { motion } from 'framer-motion';

const TestimonialProgressBar = ({
    duration,
    totalItems,
    currentIndex,
    setIndex
}: {
    duration: number;
    totalItems: number;
    currentIndex: number;
    setIndex: (index: number) => void;
}) => {
    const segments = Array.from({ length: totalItems });

    return (
        <div className="w-full h-2 flex items-center rounded-full overflow-hidden">
            {segments.map((_, i) => (
                <div
                    key={i}
                    className="flex-1 h-full flex items-center cursor-pointer"
                    onClick={() => setIndex(i)}
                >
                    <div className="relative w-full h-full">
                        {i < currentIndex && (
                            <div className="w-full h-full bg-black" />
                        )}
                        {i === currentIndex && (
                            <div className="w-full h-full bg-black">
                                <motion.div
                                    className="h-full bg-[#F5D34A]"
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: duration / 1000, ease: 'linear' }}
                                />
                            </div>
                        )}
                        {i > currentIndex && (
                            <div className="w-full h-full bg-[#F5D34A]" />
                        )}
                    </div>
                    {i < totalItems - 1 && (
                        <div className="w-2 h-2 rounded-full bg-white z-10 -ml-1 -mr-1 shrink-0" />
                    )}
                </div>
            ))}
        </div>
    );
};

export default TestimonialProgressBar;
