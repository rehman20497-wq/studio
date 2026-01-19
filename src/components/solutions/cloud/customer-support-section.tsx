'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import MagneticButton from '@/components/magnetic-button';
import { cn } from '@/lib/utils';

// --- DATA ---
const profiles = [
  { id: 1, src: 'https://picsum.photos/seed/csp1/100/100', position: 'top-[22%] left-[12%] md:top-[25%] md:left-[15%]', animation: { y: [0, -10, 0] } },
  { id: 2, src: 'https://picsum.photos/seed/csp2/100/100', position: 'top-[62%] left-[8%] md:top-[65%] md:left-[20%]', animation: { y: [0, 8, 0] } },
  { id: 3, src: 'https://picsum.photos/seed/csp3/100/100', position: 'bottom-[12%] left-[18%] md:bottom-[15%] md:left-[14%]', animation: { y: [0, -12, 0] } },
  { id: 4, src: 'https://picsum.photos/seed/csp4/100/100', position: 'top-[20%] right-[10%] md:top-[20%] md:right-[12%]', animation: { y: [0, 10, 0] } },
  { id: 5, src: 'https://picsum.photos/seed/csp5/100/100', position: 'bottom-[8%] right-[12%] md:bottom-[10%] md:right-[15%]', animation: { y: [0, -8, 0] } },
];

const icons = [
  { id: 'env', src: '/env.svg', position: 'top-[15%] left-[25%] md:top-[12%] md:left-[22%]', size: 30, animation: { x: [0, 5, 0], y: [0, -5, 0] } },
  { id: 'slack', src: '/logos/Slack.svg', position: 'top-[45%] left-[5%] md:top-[48%] md:left-[10%]', size: 40, animation: { x: [0, -6, 0] } },
  { id: 'shopify', src: '/logos/shopify.svg', position: 'top-[38%] left-[32%] md:top-[40%] md:left-[30%]', size: 40, animation: { y: [0, 6, 0] } },
  { id: 'msg', src: '/msg.svg', position: 'bottom-[25%] left-[30%] md:bottom-[22%] md:left-[28%]', size: 30, animation: { y: [0, -7, 0] } },
  { id: 'phone', src: '/phone.svg', position: 'top-[10%] right-[20%] md:top-[8%] md:right-[22%]', size: 30, animation: { y: [0, 7, 0] } },
  { id: 'zendesk', src: '/logos/Zendesk.svg', position: 'top-[38%] right-[5%] md:top-[40%] md:right-[8%]', size: 40, animation: { x: [0, 6, 0] } },
  { id: 'intercom', src: '/logos/intercom.svg', position: 'bottom-[20%] right-[25%] md:bottom-[18%] md:right-[28%]', size: 40, animation: { y: [0, -6, 0] } },
  { id: 'wave', src: '/wave.svg', position: 'top-[58%] right-[8%] md:top-[60%] md:right-[10%]', size: 30, animation: { y: [0, 5, 0], x: [0, -5, 0] } },
];

// --- VARIANTS ---
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const contentContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.5 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } },
};

const floatingElementVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15, delay: 0.8 + i * 0.1 },
  }),
};

// --- SUB-COMPONENTS ---
const AnimatedUnderline = ({ delay = 0, className = '' }: { delay?: number; className?: string }) => (
  <svg
    className={cn('absolute -bottom-1 left-0 w-full h-2 overflow-visible', className)}
    viewBox="0 0 100 8"
    preserveAspectRatio="none"
  >
    <motion.path
      d="M 1,5 C 20,2 80,2 99,5"
      fill="none"
      stroke="black"
      strokeWidth="2.5"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
    />
  </svg>
);

const FloatingIcon = ({ icon, index }: { icon: typeof icons[0]; index: number }) => (
  <motion.div
    className={cn('absolute z-0', icon.position)}
    custom={index}
    variants={floatingElementVariants}
    animate={{ ...icon.animation }}
    transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
  >
    <div className="relative bg-yellow-200/80 rounded-full flex items-center justify-center p-2.5 shadow-sm" style={{ width: icon.size * 1.5, height: icon.size * 1.5 }}>
      <Image src={icon.src} alt="" width={icon.size} height={icon.size} />
    </div>
  </motion.div>
);

const AnimatedProfile = ({ profile, index }: { profile: typeof profiles[0]; index: number }) => (
  <motion.div
    className={cn('absolute z-20', profile.position)}
    custom={index}
    variants={floatingElementVariants}
    animate={{ ...profile.animation }}
    transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
  >
    <div className="relative w-28 h-28">
      <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 112 112">
        <circle cx="56" cy="56" r="52" fill="none" stroke="#abe9ef" strokeOpacity="0.5" strokeWidth="8" />
        <circle
          cx="56"
          cy="56"
          r="52"
          fill="none"
          stroke="#0badbf"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${2 * Math.PI * 52 * 0.75} ${2 * Math.PI * 52 * 0.25}`}
          transform="rotate(-90 56 56)"
        />
      </svg>
      <div className="absolute inset-0 m-auto w-[88px] h-[88px] rounded-full overflow-hidden border-4 border-white">
        <Image src={profile.src} alt={`Profile ${profile.id}`} fill className="object-cover" />
      </div>
    </div>
  </motion.div>
);

export default function CustomerSupportSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.section
      ref={ref}
      className="relative w-full overflow-hidden bg-[#fff9e6]"
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="absolute top-0 left-0 w-full h-[150px] z-0">
        <svg className="w-full h-full" viewBox="0 0 1440 150" preserveAspectRatio="none">
          <path d="M0,150 C240,50 480,0 720,0 C960,0 1200,50 1440,150 V0 H0 Z" fill="#DDF9FF" />
        </svg>
      </div>

      <div className="relative z-10 pt-48 pb-32 px-4">
        <motion.div
          className="relative max-w-2xl mx-auto text-center"
          variants={contentContainerVariants}
        >
          {/* Floating elements */}
          {profiles.map((p, i) => <AnimatedProfile key={p.id} profile={p} index={i} />)}
          {icons.map((ic, i) => <FloatingIcon key={ic.id} icon={ic} index={i + profiles.length} />)}

          {/* Text Content */}
          <div className="relative">
            <motion.div variants={itemVariants}>
              <h3 className="relative inline-block text-2xl font-medium text-zinc-900">
                What You Get
                <AnimatedUnderline delay={0.3} />
              </h3>
            </motion.div>

            <motion.div className="relative mt-12 mb-6" variants={itemVariants}>
                <Image src="/arrow-down.gif" alt="arrow" width={64} height={64} unoptimized className="mx-auto" />
            </motion.div>

            <motion.h2 className="relative inline-block text-6xl md:text-7xl font-medium text-zinc-900 font-headline" variants={itemVariants}>
              Customer Support
              <AnimatedUnderline delay={0.6} className="-bottom-2" />
            </motion.h2>

            <motion.p className="mt-8 text-xl text-zinc-700 max-w-xl mx-auto" variants={itemVariants}>
              Your dedicated team is fully committed to delivering exceptional omnichannel customer support. That's why 95% of our clients trust us to expand their services within the first 3 months.
            </motion.p>

            <motion.div className="mt-12" variants={itemVariants}>
              <MagneticButton>
                <span className="text-base font-bold px-4">Take Hugo for a spin</span>
              </MagneticButton>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Inline SVGs for icons not present in public folder
const SvgSlack = () => (
    <svg viewBox="0 0 122.8 122.8"><path fill="#e01e5a" d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9z"/><path fill="#e01e5a" d="M32.2 77.6c7.1 0 12.9-5.8 12.9-12.9s-5.8-12.9-12.9-12.9-12.9 5.8-12.9 12.9v25.8h12.9z"/><path fill="#36c5f0" d="M45.2 25.8c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v12.9H45.2V25.8z"/><path fill="#36c5f0" d="M45.2 32.2c0-7.1-5.8-12.9-12.9-12.9S19.4 25.1 19.4 32.2s5.8 12.9 12.9 12.9h25.8V32.2z"/><path fill="#2eb67d" d="M97 45.2c-7.1 0-12.9 5.8-12.9 12.9s5.8 12.9 12.9 12.9 12.9-5.8 12.9-12.9V45.2H97z"/><path fill="#2eb67d" d="M90.6 45.2c-7.1 0-12.9 5.8-12.9 12.9s5.8 12.9 12.9 12.9-12.9 5.8-12.9 12.9v-25.8H90.6z"/><path fill="#ecb22e" d="M77.6 97c7.1 0 12.9-5.8 12.9-12.9s-5.8-12.9-12.9-12.9-12.9 5.8-12.9 12.9h25.8z"/><path fill="#ecb22e" d="M77.6 90.6c7.1 0 12.9-5.8 12.9-12.9s-5.8-12.9-12.9-12.9-12.9 5.8-12.9 12.9v25.8h12.9z"/></svg>
)
