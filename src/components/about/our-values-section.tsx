'use client';

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';

/* ------------------ Brush Stroke ------------------ */

const BrushStroke = ({
  d,
  color,
  delay,
  y,
  isActive,
}: {
  d: string;
  color: string;
  delay: number;
  y: number;
  isActive: boolean;
}) => {
  return (
    <motion.svg
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      className="absolute w-full left-0"
      style={{ top: y, height: '80px' }}
      fill="none"
      initial={{ opacity: 0 }}
      animate={isActive ? { opacity: 1 } : {}}
    >
      <motion.path
        d={d}
        stroke={color}
        strokeWidth="140"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={isActive ? { pathLength: 1 } : {}}
        transition={{
          duration: 2,
          ease: [0.42, 0, 0.58, 1],
          delay,
        }}
      />
    </motion.svg>
  );
};

/* ------------------ Play Button ------------------ */

const PlayButton = () => {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 500, damping: 30 });
  const springY = useSpring(y, { stiffness: 500, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);

    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxRadius = 28;

    const angle = Math.atan2(dy, dx);
    const strength = Math.min(distance / 120, 1);

    x.set(Math.cos(angle) * maxRadius * strength);
    y.set(Math.sin(angle) * maxRadius * strength);
  };

  const resetPosition = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <>
      <div
        ref={constraintsRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        <motion.div
          ref={buttonRef}
          role="button"
          aria-label="Play video"
          tabIndex={0}
          drag
          dragConstraints={constraintsRef}
          dragElastic={0.35}
          onDragEnd={resetPosition}
          onMouseMove={handleMouseMove}
          onMouseLeave={resetPosition}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          onClick={() => setOpen(true)}
          style={{ x: springX, y: springY }}
          whileTap={{ scale: 0.94 }}
          className="relative w-40 h-40 cursor-grab rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-300"
        >
          <motion.div
            className="relative w-full h-full rounded-full bg-yellow-400 shadow-lg overflow-hidden flex items-center justify-center"
            animate={{ scale: hovered ? 1.04 : 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 18 }}
          >
            <motion.svg
              viewBox="0 0 200 200"
              className="absolute inset-3"
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: hovered ? 6 : 14,
                ease: 'linear',
              }}
            >
              <defs>
                <linearGradient id="textGradient">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>

                <path
                  id="circlePath"
                  d="M 100,100
                     m -70,0
                     a 70,70 0 1,1 140,0
                     a 70,70 0 1,1 -140,0"
                />
              </defs>

              <text
                fontSize="15"
                fontWeight="600"
                letterSpacing="2"
                fill="none"
                stroke="url(#textGradient)"
                strokeWidth="1.3"
              >
                <textPath
                  href="#circlePath"
                  startOffset="50%"
                  textAnchor="middle"
                >
                  BUILT TO MAKE YOU BETTER • BUILT TO MAKE YOU BETTER •
                </textPath>
              </text>
            </motion.svg>

            <motion.div
              className="relative z-10"
              animate={{ scale: hovered ? 1.1 : 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <Image src="/play.svg" alt="" width={44} height={44} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="relative w-[90vw] max-w-4xl aspect-video bg-black rounded-xl overflow-hidden"
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Video"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ------------------ Section ------------------ */

const strokes = [
  { d: 'M-20 50 C 360 -60, 1080 160, 1460 50', color: '#fef08a', delay: 0.2, y: 0 },
  { d: 'M1460 50 C 1080 160, 360 -60, -20 50', color: '#bbf7d0', delay: 0.5, y: 140 },
  { d: 'M-20 50 C 360 -90, 1080 200, 1460 50', color: '#a5f3fc', delay: 0.7, y: 280 },
  { d: 'M1460 50 C 1080 200, 360 -90, -20 50', color: '#fecaca', delay: 0.9, y: 420 },
];

export default function OurValuesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <section
      ref={ref}
      className="bg-[#fffef9] pt-[clamp(1rem,2vw,2.5rem)]
 pb-[clamp(1rem,2vw,2.5rem)] relative overflow-hidden flex items-center justify-center min-h-[900px]"
    >
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[640px]">
        {strokes.map((s, i) => (
          <BrushStroke key={i} {...s} isActive={isInView} />
        ))}
      </div>

      <motion.div
       className="
       relative z-10
       min-w-[900px] min-h-[550px]
       w-[70vw] h-[80vh]
       max-w-[70vw] max-h-[80vh]
       aspect-[9000/550]
     "
     
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{
          delay: 2,
          duration: 1.6,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Image
          src="https://picsum.photos/seed/meeting/1100/650"
          alt="Our core values"
          fill
          className="rounded-2xl object-cover shadow-2xl"
        />
        <PlayButton />
      </motion.div>
    </section>
  );
}
