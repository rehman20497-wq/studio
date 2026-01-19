'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import MagneticButton from '@/components/magnetic-button';
import { cn } from '@/lib/utils';

// --- DATA ---
const profiles = [
  { id: 1, src: 'https://picsum.photos/seed/csp1/100/100', position: 'top-[20%] left-[5%] md:top-[25%] md:left-[15%]', animation: { y: [0, -10, 0] } },
  { id: 2, src: 'https://picsum.photos/seed/csp2/100/100', position: 'bottom-[20%] left-[10%] md:bottom-[15%] md:left-[20%]', animation: { y: [0, 8, 0] } },
  { id: 3, src: 'https://picsum.photos/seed/csp3/100/100', position: 'top-[15%] right-[2%] md:top-[20%] md:right-[12%]', animation: { y: [0, -12, 0] } },
  { id: 4, src: 'https://picsum.photos/seed/csp4/100/100', position: 'bottom-[25%] right-[5%] md:bottom-[20%] md:right-[15%]', animation: { y: [0, 10, 0] } },
  { id: 5, src: 'https://picsum.photos/seed/csp5/100/100', position: 'top-[55%] right-[5%] md:top-[60%] md:right-[8%]', animation: { y: [0, -8, 0] } },
];

const icons = [
  { id: 'env', src: '/env.svg', position: 'top-[10%] left-[20%]', size: 30, animation: { x: [0, 5, 0], y: [0, -5, 0] } },
  { id: 'slack', src: '/logos/Slack.svg', position: 'top-[40%] left-[2%]', size: 40, animation: { x: [0, -6, 0] } },
  { id: 'shopify', src: '/logos/shopify.svg', position: 'bottom-[5%] left-[30%]', size: 40, animation: { y: [0, 6, 0] } },
  { id: 'msg', src: '/msg.svg', position: 'bottom-[40%] left-[8%]', size: 30, animation: { y: [0, -7, 0] } },
  { id: 'phone', src: '/phone.svg', position: 'top-[5%] right-[15%]', size: 30, animation: { y: [0, 7, 0] } },
  { id: 'zendesk', src: '/logos/Zendesk.svg', position: 'top-[35%] right-[2%]', size: 40, animation: { x: [0, 6, 0] } },
  { id: 'intercom', src: '/logos/intercom.svg', position: 'bottom-[5%] right-[25%]', size: 40, animation: { y: [0, -6, 0] } },
  { id: 'wave', src: '/wave.svg', position: 'bottom-[45%] right-[2%]', size: 30, animation: { y: [0, 5, 0], x: [0, -5, 0] } },
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
      animate={profile.animation}
      transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
    >
      <div className="relative w-20 h-20"> {/* 80px container */}
        <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="37" fill="none" stroke="#abe9ef" strokeOpacity="0.5" strokeWidth="6" />
          <circle
            cx="40"
            cy="40"
            r="37"
            fill="none"
            stroke="#0badbf"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 37 * 0.75} ${2 * Math.PI * 37 * 0.25}`}
            transform="rotate(-90 40 40)"
          />
        </svg>
        <div className="absolute inset-0 m-auto w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-white shadow-md">
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
          className="relative max-w-4xl mx-auto text-center"
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
                <Image src="/customer.png" alt="Customer Support" width={600} height={100} className="mx-auto h-auto" style={{width: 'min(100%, 600px)'}} />
            </motion.div>

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
    </motion.section>
  );
}
