'use client';

import { motion, useInView, animate } from 'framer-motion';
import { useRef, useEffect } from 'react';

const stats = [
  { value: 98.90, suffix: '%', label: 'Avg. Accuracy Score' },
  { value: +240, suffix: 'M', label: 'Large Language Model (LLM) prompts answered' },
  { value: +200, suffix: 'M', label: 'Images & videos annotated' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 80,
    },
  },
};

const StatValue = ({ from = 0, to, suffix }: { from?: number; to: number; suffix: string; }) => {
    const nodeRef = useRef<HTMLSpanElement>(null);
    const isInView = useInView(nodeRef, { once: true, amount: 0.5 });
  
    useEffect(() => {
      if (isInView && nodeRef.current) {
        const node = nodeRef.current;
        const controls = animate(from, to, {
          duration: 2,
          ease: 'easeOut',
          onUpdate(value) {
            node.textContent = Math.round(value).toLocaleString();
          },
        });
        return () => controls.stop();
      }
    }, [from, to, isInView]);
  
    return <span ref={nodeRef} />;
};


export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="bg-[#FFF9E6] px-4 pb-12 ">
      <motion.div
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {stats.map((stat, index) => (
          <motion.div key={index} variants={itemVariants}>
            <h2 className="text-[87px] leading-[87.5px] font-normal text-black">
                <StatValue to={stat.value} suffix={stat.suffix} />
                {stat.suffix}
            </h2>
            <p className="mt-2 text-[16px] font-normal text-black">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
