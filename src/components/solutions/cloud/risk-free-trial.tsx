
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import MagneticButton from '@/components/magnetic-button';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const floatingVariants = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            delay,
            duration: 1.2,
            ease: "easeOut"
        }
    },
    float: {
        y: [0, -8, 0, 8, 0],
        x: [0, 5, -5, 0],
        rotate: [0, 2, -2, 0],
        transition: {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
});


const SmilyFace1 = ({ className }: { className?: string }) => (
    <motion.svg width="86" height="57" viewBox="0 0 86 57" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <motion.path d="M25.3203 14.9082C27.0254 13.4834 29.0805 12.5938 31.25 12.5938C35.9141 12.5938 39.75 16.4297 39.75 21.0938C39.75 25.7578 35.9141 29.5938 31.25 29.5938C26.5859 29.5938 22.75 25.7578 22.75 21.0938C22.75 18.6602 23.6875 16.5117 25.3203 14.9082Z" stroke="black" strokeWidth="4"/>
        <motion.path d="M54.75 2.25C59.4141 2.25 63.25 6.08594 63.25 10.75C63.25 15.4141 59.4141 19.25 54.75 19.25C50.0859 19.25 46.25 15.4141 46.25 10.75C46.25 6.08594 50.0859 2.25 54.75 2.25Z" stroke="black" strokeWidth="4"/>
        <motion.path d="M2.3125 54.5C18.5 -5.1875 62.1875 12.5 83.5 28.625" stroke="black" strokeWidth="4" strokeLinecap="round"/>
    </motion.svg>
);

const SmilyFace2 = ({ className }: { className?: string }) => (
    <motion.svg width="73" height="66" viewBox="0 0 73 66" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <motion.path d="M2.5 19.5C2.5 13.15 7.65 8 14 8C20.35 8 25.5 13.15 25.5 19.5C25.5 25.85 20.35 31 14 31C7.65 31 2.5 25.85 2.5 19.5Z" stroke="black" strokeWidth="4"/>
        <motion.path d="M20.5 2.5C23.5376 2.5 26 4.96243 26 8C26 11.0376 23.5376 13.5 20.5 13.5C17.4624 13.5 15 11.0376 15 8C15 4.96243 17.4624 2.5 20.5 2.5Z" stroke="black" strokeWidth="4"/>
        <motion.path d="M43.5 24.5C43.5 18.15 48.65 13 55 13C61.35 13 66.5 18.15 66.5 24.5C66.5 30.85 61.35 36 55 36C48.65 36 43.5 30.85 43.5 24.5Z" stroke="black" strokeWidth="4"/>
        <motion.path d="M25 63.5C39.5 45.3333 60.6 45.1 71 63.5" stroke="black" strokeWidth="4" strokeLinecap="round"/>
    </motion.svg>
);


const ButtonDecorations = () => (
    <>
        <motion.svg className="absolute top-1/2 left-1/2 w-48 h-48 -translate-x-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 200 200"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 1.2 } }}
        >
            {/* Arrows */}
            <motion.path d="M 60 40 L 40 50 L 60 60" stroke="black" strokeWidth="4" fill="none" strokeLinecap="round" initial={{pathLength: 0}} animate={{pathLength: 1, transition: {delay: 1.5, duration: 0.5, repeat: Infinity, repeatDelay: 3}}}/>
            <motion.path d="M 140 160 L 160 150 L 140 140" stroke="black" strokeWidth="4" fill="none" strokeLinecap="round" initial={{pathLength: 0}} animate={{pathLength: 1, transition: {delay: 1.7, duration: 0.5, repeat: Infinity, repeatDelay: 3}}}/>
            {/* Dots */}
            <motion.circle cx="150" cy="50" r="4" fill="black" initial={{scale:0}} animate={{scale:1, transition: {delay: 1.6, repeat: Infinity, repeatDelay: 2.4, duration: 0.4}}} />
            <motion.circle cx="50" cy="150" r="4" fill="black" initial={{scale:0}} animate={{scale:1, transition: {delay: 1.9, repeat: Infinity, repeatDelay: 2.4, duration: 0.4}}}/>
            {/* Squiggles */}
            <motion.path d="M 40 110 C 50 100, 60 110, 70 100" stroke="black" strokeWidth="4" fill="none" initial={{pathLength: 0}} animate={{pathLength: 1, transition: {delay: 2.1, duration: 0.5, repeat: Infinity, repeatDelay: 3.5, repeatType: "reverse"}}}/>
            <motion.path d="M 160 90 C 150 100, 140 90, 130 100" stroke="black" strokeWidth="4" fill="none" initial={{pathLength: 0}} animate={{pathLength: 1, transition: {delay: 2.3, duration: 0.5, repeat: Infinity, repeatDelay: 3.5, repeatType: "reverse"}}}/>
        </motion.svg>
    </>
)

export default function RiskFreeTrial() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.section
      ref={ref}
      className="relative bg-[#a2edf4] py-24 px-4 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
        {/* Background Stripes */}
        <div className="absolute inset-0 flex">
            <div className="flex-1 bg-[#a2edf4]"></div>
            <div className="flex-1 bg-[#b3f0f7]"></div>
            <div className="flex-1 bg-[#c5f4fa]"></div>
            <div className="flex-1 bg-[#d6f7fd]"></div>
            <div className="flex-1 bg-[#e8fbff]"></div>
        </div>

        {/* Wavy Borders */}
        <div className="absolute top-0 left-0 w-full h-16 pointer-events-none">
            <svg viewBox="0 0 1440 64" fill="#fff9e6" preserveAspectRatio="none"><path d="M0 64.0001C312 -21.3332 922 -21.3332 1440 64.0001V0H0V64.0001Z"></path></svg>
        </div>
         <div className="absolute bottom-0 left-0 w-full h-16 pointer-events-none">
            <svg viewBox="0 0 1440 64" fill="#FCFBF8" preserveAspectRatio="none"><path d="M1440 0C1128 85.3333 518 85.3333 0 0V64H1440V0Z"></path></svg>
        </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.h2
          className="text-6xl font-bold text-black font-headline"
          variants={itemVariants}
        >
          30 days <br />
          <span className="relative inline-block">
            Risk - Free
            <motion.svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 100 10" preserveAspectRatio="none"
              initial={{pathLength: 0}}
              animate={{pathLength: 1, transition: {delay: 1, duration: 0.8}}}
            >
                <path d="M2 5 C 20 2, 80 2, 98 5" stroke="black" strokeWidth="4" fill="none" strokeLinecap="round"/>
            </motion.svg>
          </span>
        </motion.h2>

        <motion.p
          className="mt-8 text-lg text-black"
          variants={itemVariants}
        >
          We're so confident you'll love working with Telsys, we offer a no commitment 30 day trial.
        </motion.p>
        
        <motion.div className="mt-12 relative w-48 h-16 mx-auto" variants={itemVariants}>
            <ButtonDecorations />
            <MagneticButton>
                <span className="text-base font-bold px-4">Start trial</span>
            </MagneticButton>
        </motion.div>
      </div>

       {/* Floating Smileys */}
        <motion.div
            variants={floatingVariants(1)}
            initial="initial"
            animate={isInView ? ["animate", "float"] : "initial"}
            className="absolute top-[25%] left-[10%] hidden md:block"
        >
            <SmilyFace2 />
        </motion.div>
         <motion.div
            variants={floatingVariants(1.5)}
            initial="initial"
            animate={isInView ? ["animate", "float"] : "initial"}
            className="absolute top-[30%] right-[12%] hidden md:block"
        >
            <SmilyFace1 />
        </motion.div>

    </motion.section>
  );
}
