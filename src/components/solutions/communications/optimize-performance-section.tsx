'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const cardData = [
  {
    icon: '/chec.svg',
    title: 'Six Sigma Certified',
    description:
      "We leverage best practices and robust feedback loops to drive operational excellence—unlocking your platform's full potential to captivate and convert.",
  },
  {
    icon: '/ver.svg',
    title: 'Platform Integrity',
    description:
      "We safeguard your platform's integrity through comprehensive controls, monitoring, and proactive risk mitigation.",
  },
  {
    icon: '/dat.svg',
    title: 'Data Security',
    description:
      'PCI-, SOC II-, ISO-certified, PII, HIPAA compliance, LDAP/SSO access. We provide enterprise-level security options for all your data or compliance needs.',
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
        style={{ backgroundColor: '#8ee167', position: 'absolute', right: '35%' , bottom: '35%'
          }}
      />

      {/* Icon partially overlapping circle */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/4">
        <Image src={icon} alt={`${title} icon`} width={64} height={64} />
      </div>
    </div>

    <h3 className="font-bold mb-1 text-bodySm sm:text-bodyMd lg:text-bodylg text-black">
  {title}
</h3>


<p className="max-w-xs text-testimonialReview text-black">
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
          <h2 className="text-herooSm
  sm:text-herooMd
  lg:text-heroo font-headline font-normal text-black">
            Optimize Performance, Even At Scale
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
          className="text-bodyySm
  sm:text-bodyyMd
  lg:text-bodyylg font-normal text-black max-w-3xl mx-auto mb-6"
        >
          Every operations engine needs a pit crew. With Telsys, you can onboard and
          execute faster, and with more precision than the competition.
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
           className="
             object-contain h-auto
             max-h-[150px] max-w-[120px]
             3xl:max-h-[190px] 3xl:max-w-[150px]
             4xl:max-h-[220px] 4xl:max-w-[180px]
             5xl:max-h-[260px] 5xl:max-w-[210px]
           "
         />
         
         <Image
           src="/clutch.png"
           alt="Clutch Award"
           width={100}
           height={110}
           className="
             object-contain h-auto
             max-h-[150px] max-w-[120px]
             3xl:max-h-[550px] 3xl:max-w-[400px]
             4xl:max-h-[650px] 4xl:max-w-[500px]
             5xl:max-h-[750px] 5xl:max-w-[600px]
           "
         />
        </motion.div>
      </motion.div>
    </section>
  );
}
