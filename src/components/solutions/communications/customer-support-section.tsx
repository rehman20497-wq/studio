'use client';

import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import MagneticButton from '@/components/magnetic-button';

export default function CustomerSupportSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  /* Scroll-based parallax */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const leftParallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const rightParallaxY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-[#FFF8E6]"
    >
      {/* Curved Top */}
      <div className="absolute top-0 left-0 w-full h-[120px]">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M0,0 H1440 V120 C1200,50 960,20 720,20 C480,20 240,50 0,120 Z"
            fill="#FCFBF8"
          />
        </svg>
      </div>

      {/* ================= MOBILE TOP IMAGE ================= */}
      <motion.div
        style={{ y: leftParallaxY }}
        initial={{ opacity: 0, y: -40 }}
        animate={
          inView
            ? { opacity: 1, y: [0, -8, 0] }
            : {}
        }
        transition={{
          opacity: { duration: 1, delay: 0.3 },
          y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="md:hidden pt-28 flex justify-center pointer-events-none"
      >
        <Image
          src="/leftg.png"
          alt="Decorative element"
          width={260}
          height={0}
          className="w-[260px] h-auto"
        />
      </motion.div>

      <div className="relative pt-16 md:pt-36 pb-20 text-center px-4">
        {/* ================= DESKTOP LEFT IMAGE ================= */}
        <motion.div
          style={{ y: leftParallaxY }}
          initial={{ opacity: 0, x: -120 }}
          animate={
            inView
              ? { opacity: 1, x: 0, y: [0, -10, 0] }
              : {}
          }
          transition={{
            x: { duration: 1.1, ease: 'easeOut', delay: 0.4 },
            opacity: { duration: 1, delay: 0.4 },
            y: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="hidden md:block absolute top-36 left-[6%] w-[350px] pointer-events-none"
        >
          <Image
            src="/leftg.png"
            alt="Decorative element"
            width={350}
            height={0}
            className="w-full h-auto"
          />
        </motion.div>

        {/* ================= DESKTOP RIGHT IMAGE ================= */}
        <motion.div
          style={{ y: rightParallaxY }}
          initial={{ opacity: 0, x: 120 }}
          animate={
            inView
              ? { opacity: 1, x: 0, y: [0, 12, 0] }
              : {}
          }
          transition={{
            x: { duration: 1.1, ease: 'easeOut', delay: 0.4 },
            opacity: { duration: 1, delay: 0.4 },
            y: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="hidden md:block absolute top-36 right-[2%] w-[350px] pointer-events-none"
        >
          <Image
            src="/rightg.png"
            alt="Decorative element"
            width={350}
            height={0}
            className="w-full h-auto"
          />
        </motion.div>

        {/* ================= CONTENT ================= */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-[23px] font-normal mb-4"
        >
          What We Do
          <motion.svg
            className="w-40 h-2 mx-auto"
            viewBox="0 0 160 8"
          >
            <motion.path
              d="M 2,4 C 30,0 80,6 158,3"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{
                duration: 2.5,
                ease: 'easeInOut',
                delay: 0.3,
              }}
            />
          </motion.svg>
        </motion.h3>

        <motion.div
          className="relative h-28 w-full max-w-lg mx-auto mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <Image
            src="/Digital-Ops.svg"
            alt="Digital Ops"
            fill
            className="object-contain"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="max-w-xl mx-auto text-[20px] text-zinc-700"
        >
          From vendor onboarding to claims processing and sales support, Hugo boosts your efficiency, impact, and profitability.
        </motion.p>

        {/* ================= MOBILE BOTTOM IMAGE ================= */}
        <motion.div
          style={{ y: rightParallaxY }}
          initial={{ opacity: 0, y: 30 }}
          animate={
            inView
              ? { opacity: 1, y: [0, 10, 0] }
              : {}
          }
          transition={{
            opacity: { duration: 1, delay: 0.3 },
            y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="md:hidden mt-10 flex justify-center pointer-events-none"
        >
          <Image
            src="/rightg.png"
            alt="Decorative element"
            width={260}
            height={0}
            className="w-[260px] h-auto"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mt-10"
        >
          <MagneticButton>
            <span className="px-6 font-semibold">
              Take Hugo for a spin
            </span>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
