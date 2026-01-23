'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const cardData = [
  {
    icon: '/chec.svg',
    title: 'Adaptive Coverage',
    description:
      "We’re always on, and always responsive. Suggest an update today, it will be at play tomorrow.",
  },
  {
    icon: '/nb.svg',
    title: 'Nuanced Moderation',
    description:
      "We address both familiar threats and edge cases through intelligence, empathy, and experience.",
  },
  {
    icon: '/sr.svg',
    title: 'Wellness-First',
    description:
      'We champion mod well-being through a clinician-designed wellness program, fostering resilience and retention.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const awardsVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.8,
      duration: 1,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const cardsContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.5 },
  },
};

const FeatureCard = ({
  icon,
  title,
  description,
}: (typeof cardData)[0]) => (
  <motion.div
    variants={itemVariants}
    className="text-center flex flex-col items-center"
  >
    {/* Icon + Circle */}
    <div className="relative mb-0 w-24 h-24 flex justify-center items-center">
    {/* Green Circle moved right, smaller, new color */}
      <div
        className="w-12 h-12 rounded-full flex-shrink-0"
        style={{ backgroundColor: '#c597fe', position: 'absolute', right: '35%' , bottom: '35%'
          }}
      />

      {/* Icon partially overlapping circle */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/4">
        <Image src={icon} alt={`${title} icon`} width={64} height={64} />
      </div>
    </div>

    <h3
  className="font-bold mb-1"
  style={{ fontSize: '20px', lineHeight: '28.7px', color: '#000000' }}
>
  {title}
</h3>

<p
  className="max-w-xs"
  style={{ fontSize: '13px', lineHeight: '20.5px', color: '#52525b' }}
>
  {description}
</p>

  </motion.div>
);

export default function OptimizePerformanceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="bg-white py-24 px-4">
      <motion.div
        className="max-w-5xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Heading */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center items-center gap-4 mb-4"
        >
          <h2 className="text-5xl font-normal text-black font-headline">
          Quality & Flexibility
          </h2>
          <Image
            src="/arr.png"
            alt="decorative arrow"
            width={40}
            height={40}
            className="hidden md:block"
          />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg text-zinc-700 max-w-3xl mx-auto mb-6"
        >
          We combine custom call center operations with bespoke moderator training, ensuring scalable coverage across time zones, platforms, and seasonal surges.
        </motion.p>

        {/* Feature Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-16"
          variants={cardsContainerVariants}
        >
          {cardData.map((card, index) => (
            <FeatureCard key={index} {...card} />
          ))}
        </motion.div>

        {/* Awards */}
        <motion.div
          variants={awardsVariants}
          className="mt-6 flex justify-center items-center gap-12"
        >
          <Image
            src="/global.webp"
            alt="Global Award"
            width={90}
            height={120}
            className="object-contain h-auto max-h-[150px] max-w-[120px]"
          />
          <Image
            src="/clutch.png"
            alt="Clutch Award"
            width={100}
            height={110}
            className="object-contain h-auto max-h-[150px] max-w-[120px]"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
