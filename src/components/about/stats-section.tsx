
'use client';

import { motion, useInView, animate } from 'framer-motion';
import { useRef, useEffect } from 'react';

const stats = [
  {
    value: 4500,
    suffix: '+',
    label: 'Clients Worldwide & 250K vetted Professionals',
    gradient: 'from-cyan-400 to-cyan-600',
    borderColor: 'border-cyan-200',
  },
  {
    value: 98,
    suffix: '%',
    label: 'Retention Rate',
    gradient: 'from-green-400 to-green-600',
    borderColor: 'border-green-200',
  },
  {
    value: 65,
    suffix: '%',
    label: 'Female Workforce',
    gradient: 'from-purple-400 to-purple-600',
    borderColor: 'border-purple-200',
  },
  {
    value: 30,
    suffix: '%',
    label: 'More cost-effective than Technology Solutions',
    gradient: 'from-red-400 to-red-600',
    borderColor: 'border-red-200',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
    hidden: { opacity: 0, y: 100, scale: 0.5 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 50,
        duration: 1.5,
      },
    },
};

const contentVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 1,
            ease: "easeOut",
            delay: 0.8,
        }
    }
}

const StatValue = ({ from = 0, to, suffix, gradient }: { from?: number; to: number; suffix: string; gradient: string; }) => {
    const nodeRef = useRef<HTMLParagraphElement>(null);
    const isInView = useInView(nodeRef, { once: true, amount: 0.5 });
  
    useEffect(() => {
      if (isInView && nodeRef.current) {
        const node = nodeRef.current;
        const controls = animate(from, to, {
          duration: 2.5,
          ease: 'easeOut',
          onUpdate(value) {
            node.textContent = Math.round(value).toLocaleString() + suffix;
          },
        });
        return () => controls.stop();
      }
    }, [from, to, isInView, suffix]);
  
    return <p ref={nodeRef} className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-flow`} />;
};

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="bg-[#FCFBF8] px-[3%]">
      <motion.div
        className="max-w-none mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className={`bg-white p-4 rounded-2xl shadow-sm border-2 ${stat.borderColor} flex flex-col items-center text-center`}
            variants={cardVariants}
          >
            <motion.div className="text-bghSm
  sm:text-bghMd
  lg:text-bgh font-bold" variants={contentVariants}>
                <StatValue from={0} to={stat.value} suffix={stat.suffix} gradient={stat.gradient} />
            </motion.div>
            <motion.p className=" text-bodyySm
  sm:text-bodyyMd
  lg:text-bodyylg font-normal text-black" variants={contentVariants}>
                {stat.label}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
