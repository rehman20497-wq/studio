'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import MagneticButton from './magnetic-button';

const buttonVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.5,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

export default function ResourcesButtonSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section ref={ref} className="bg-[#FEF9F2] pt-0 pb-12">
      <div className="container mx-auto flex justify-center">
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <MagneticButton>
            <span className="text-[15px] font-medium px-6">
              Check out All of Our Resources!
            </span>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
