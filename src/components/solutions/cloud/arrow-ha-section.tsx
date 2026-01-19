'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

export default function ArrowHaSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.section
      ref={ref}
      className="bg-[#fff9e6] w-full"
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="flex justify-center items-center">
        <Image
          src="/arrowha.png"
          alt="Arrow decorative graphic"
          width={1440}
          height={150}
          className="w-full h-auto object-contain"
        />
      </div>
    </motion.section>
  );
}
