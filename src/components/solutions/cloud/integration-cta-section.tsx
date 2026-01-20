
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Main container for the section, just to trigger animation on view
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.1, // Just to fade in the container
    },
  },
};

// Variants for the H2 to stagger its children (the lines of text)
const headingContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.4, // Slower stagger
      delayChildren: 0.5, // Small delay after section is in view
    },
  },
};

// Variants for each line of the heading
const textLineVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2, // Slower duration
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Variants for the paragraph
const paragraphVariants = {
  hidden: { opacity: 0, y: 30 }, // Start a bit lower
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2, // Slower duration
      delay: 2.6, // Delay to start after heading animation is underway
      ease: [0.22, 1, 0.36, 1], // Smoother ease
    },
  },
};

export default function IntegrationCtaSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section ref={ref} className="bg-white py-24 px-4">
      <motion.div
        className="max-w-5xl mx-auto text-center"
        variants={sectionVariants} // Use simple variants for the main container
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.h2
          className="text-[72px] text-black leading-[72.5px] font-headline font-normal"
          variants={headingContainerVariants} // This will stagger the spans
        >
          <motion.span className="block" variants={textLineVariants}>
            We integrate seamlessly with
          </motion.span>
          <motion.span className="block" variants={textLineVariants}>
            technology built for scale &
          </motion.span>
          <motion.span className="block" variants={textLineVariants}>
            customer excellence.
          </motion.span>
        </motion.h2>
        <motion.p
          className="mt-8 text-[16px] leading-[24.5px] text-black max-w-3xl mx-auto"
          variants={paragraphVariants}
        >
          From day 1 we integrate into your existing CRMs, operational tools
          and customer systems so our teams deliver results without disrupting
          how you work.
        </motion.p>
      </motion.div>
    </section>
  );
}
