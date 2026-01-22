
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const cardData = [
  {
    icon: '/chec.svg',
    title: 'Six Sigma Certified',
    description: "We leverage best practices and robust feedback loops to drive operational excellence—unlocking your platform's full potential to captivate and convert.",
  },
  {
    icon: '/ver.svg',
    title: 'Platform Integrity',
    description: "We safeguard your platform's integrity through comprehensive controls, monitoring, and proactive risk mitigation.",
  },
  {
    icon: '/dat.svg',
    title: 'Data Security',
    description: 'PCI-, SOC II-, ISO-certified, PII, HIPAA compliance, LDAP/SSO access. We provide enterprise-level security options for all your data or compliance needs.',
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

const FeatureCard = ({ icon, title, description }: (typeof cardData)[0]) => (
    <motion.div variants={itemVariants} className="text-center flex flex-col items-center">
        <div className="relative mb-6 w-24 h-24 flex justify-center items-center">
            <Image src={icon} alt={`${title} icon`} width={80} height={80} />
        </div>
        <h3 className="text-xl font-bold text-black mb-2">{title}</h3>
        <p className="text-zinc-600 leading-relaxed max-w-xs">{description}</p>
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
        <motion.div variants={itemVariants} className="flex justify-center items-center gap-4 mb-4">
            <h2 className="text-5xl font-normal text-black font-headline">
                Optimize Performance, Even At Scale
            </h2>
            <Image src="/arr.png" alt="decorative arrow" width={40} height={40} className="hidden md:block"/>
        </motion.div>

        <motion.p variants={itemVariants} className="text-lg text-zinc-700 max-w-3xl mx-auto mb-16">
          Every operations engine needs a pit crew. With Hugo, you can onboard and execute faster, and with more precision than the competition.
        </motion.p>
        
        <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={cardsContainerVariants}
        >
            {cardData.map((card, index) => (
                <FeatureCard key={index} {...card} />
            ))}
        </motion.div>

        <motion.div variants={awardsVariants} className="mt-16 flex justify-center items-center gap-12">
            <Image src="/global.webp" alt="Global Award" width={120} height={150} className="object-contain h-auto max-h-[150px] max-w-[120px]" />
            <Image src="/clutch.png" alt="Clutch Award" width={120} height={150} className="object-contain h-auto max-h-[150px] max-w-[120px]" />
        </motion.div>

      </motion.div>
    </section>
  );
}
