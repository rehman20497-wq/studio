
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
            duration: 1.5,
            ease: [0.25, 1, 0.5, 1],
            delay: 1, // Delay until after stripes animate
        }
    }
}

const Stripe = ({ color, delay }: { color: string; delay: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const stripeVariants = {
      hidden: { scaleX: 0 },
      visible: { 
        scaleX: 1,
        transition: { duration: 1, ease: [0.42, 0, 0.58, 1], delay }
      }
    };
  
    return (
        <motion.div
            ref={ref}
            className={`h-1/5 w-full ${color}`}
            variants={stripeVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ transformOrigin: 'left' }}
        />
    );
};

const PlayButton = () => (
    <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-40 h-40">
            <motion.div 
                className="absolute inset-0 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg"
                initial={{scale: 0}}
                animate={{scale: 1}}
                transition={{duration: 0.8, ease: "backOut", delay: 1.5}}
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

const stripes = [
    { color: 'bg-[#fff9e6]', delay: 0 },
    { color: 'bg-yellow-200', delay: 0.1 },
    { color: 'bg-green-200', delay: 0.2 },
    { color: 'bg-cyan-200', delay: 0.3 },
    { color: 'bg-red-200', delay: 0.4 },
]
  
export default function OurValuesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section ref={ref} className="bg-[#fff9e6] py-32 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 flex flex-col">
            {stripes.map((s, i) => (
                <Stripe key={i} color={s.color} delay={s.delay} />
            ))}
        </div>

        <motion.div
            className="relative z-10 w-[800px] h-[450px]"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
        >
            <motion.div 
                className="w-full h-full"
                variants={imageContainerVariants}
            >
                <Image 
                    src="https://picsum.photos/seed/meeting/800/450"
                    alt="Our core values"
                    fill
                    className="rounded-2xl object-cover shadow-2xl"
                    data-ai-hint="team meeting"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
                <PlayButton />
            </motion.div>
        </motion.div>
    </section>
  );
}
