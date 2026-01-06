
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
    },
  },
};

const imageContainerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 2.5,
            ease: [0.25, 1, 0.5, 1],
            delay: 1.5, 
        }
    }
}

const BrushStroke = ({ d, color, delay, y, from }: { d: string, color: string; delay: number, y: number, from: 'left' | 'right' }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const pathVariants = {
      hidden: { pathLength: 0, pathOffset: from === 'right' ? 1 : 0 },
      visible: { 
        pathLength: 1,
        pathOffset: 0,
        transition: { duration: 2, ease: [0.42, 0, 0.58, 1], delay }
      }
    };
  
    return (
        <motion.svg
            ref={ref}
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            className="absolute w-full h-auto left-0"
            style={{ top: y, height: '80px' }}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            <motion.path
                d={d}
                stroke={color}
                strokeWidth="140"
                strokeLinecap="round"
                variants={pathVariants}
            />
        </motion.svg>
    );
};

const PlayButton = () => (
    <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-40 h-40">
            <motion.div 
                className="absolute inset-0 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg"
                initial={{scale: 0}}
                animate={{scale: 1}}
                transition={{duration: 0.8, ease: "backOut", delay: 2.5}}
            >
                <Play className="w-12 h-12 text-black fill-black" />
            </motion.div>
            <div className="absolute w-full h-full animate-spin-slow">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-transparent">
                    <path
                        id="text-path-play"
                        d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                    />
                    <text>
                        <textPath
                            href="#text-path-play"
                            startOffset="0%"
                            className="font-bold text-sm uppercase"
                            fill="black"
                        >
                            MAKE YOU BETTER - BUILT TO
                        </textPath>
                    </text>
                </svg>
            </div>
        </div>
    </div>
)

const strokes = [
    { d: "M-20 50 C 320 20, 1120 80, 1460 50", color: '#fef08a', delay: 0.2, y: 0, from: 'left' },
    { d: "M1460 50 C 1020 80, 320 20, -20 50", color: '#bbf7d0', delay: 0.4, y: 160, from: 'right' },
    { d: "M-20 50 C 320 30, 1120 70, 1460 50", color: '#a5f3fc', delay: 0.6, y: 320, from: 'left' },
    { d: "M1460 50 C 1020 70, 320 30, -20 50", color: '#fecaca', delay: 0.8, y: 480, from: 'right' },
]
  
export default function OurValuesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="bg-[#fff9e6] pt-20 pb-32 relative overflow-hidden flex items-center justify-center min-h-[900px]">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[640px]">
            {strokes.map((s, i) => (
                <BrushStroke key={i} {...s} />
            ))}
        </div>

        <motion.div
            className="relative z-10 w-[1100px] h-[650px]"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
        >
            <motion.div 
                className="w-full h-full"
                variants={imageContainerVariants}
            >
                <Image 
                    src="https://picsum.photos/seed/meeting/1100/650"
                    alt="Our core values"
                    fill
                    className="rounded-2xl object-cover shadow-2xl [filter:drop-shadow(0_10px_8px_rgba(0,0,0,0.24))]"
                    data-ai-hint="team meeting"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <PlayButton />
            </motion.div>
        </motion.div>
    </section>
  );
}
