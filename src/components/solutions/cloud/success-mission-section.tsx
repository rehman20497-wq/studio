'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import MagneticButton from '@/components/magnetic-button';

const logos1 = [
  { src: '/logos/Upwork.svg', alt: 'Upwork' },
  { src: '/logos/Attentive.svg', alt: 'Attentive' },
  { src: '/logos/Faire.svg', alt: 'Faire' },
  { src: '/logos/Meta.svg', alt: 'Meta' },
];

const logos2 = [
  { src: '/logos/Google.svg', alt: 'Google' },
  { src: '/logos/Topicals.svg', alt: 'Topicals' },
  { src: '/logos/Outschool.svg', alt: 'Outschool' },
  { src: '/logos/ByteDance_logo_English-2.png', alt: 'ByteDance' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const LogoMarquee = ({
  logos,
  direction = 'left',
}: {
  logos: { src: string; alt: string }[];
  direction?: 'left' | 'right';
}) => {
  const extendedLogos = [...logos, ...logos, ...logos];

  return (
    <div className="w-full overflow-hidden">
      <motion.div
        className="flex items-center whitespace-nowrap"
        animate={{
          x: direction === 'left' ? ['0%', '-100%'] : ['-100%', '0%'],
        }}
        transition={{
          repeat: Infinity,
          duration: 35,
          ease: 'linear',
        }}
      >
        {extendedLogos.map((logo, index) => (
          <div
            key={index}
            className="mx-4 sm:mx-6 flex-shrink-0 h-6 sm:h-8 flex items-center"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={80}
              height={24}
              className="h-auto object-contain grayscale opacity-60"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function SuccessMissionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const listItems = [
    <>
      <strong>Expert Workforce</strong>: Skilled engineers and cloud specialists with industry-specific training and hands-on experience.
    </>,
    <>
      <strong>Omnichannel Solutions</strong>: Seamless integration across cloud, connectivity, and communication platforms.
    </>,
    <>
      <strong>Global Coverage</strong>: Multilingual support across regions to meet international business needs.
    </>,
    <>
      <strong>Flexible Scaling</strong>: Rapid resource adjustment to support seasonal peaks, product launches, or accelerated growth.
    </>,
    <>
      <strong>Dedicated Teams</strong>: Solutions and support teams assigned exclusively to your business—never shared.
    </>,
    <>
      <strong>Proven Performance</strong>: Optimized uptime, fast response times, and reliable system monitoring.
    </>,
    <>
      <strong>Secure & Compliant</strong>: Enterprise-grade security with disaster recovery protocols and layered redundancies.
    </>,
  ];
  

  return (
    <motion.section
      ref={ref}
      className="bg-white py-12 md:py-[3%] px-4"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-5 md:gap-16">
        {/* Left Column */}
        <motion.div className="md:col-span-3" variants={itemVariants}>
          <h2 className=" text-herooSm
  sm:text-herooMd
  lg:text-heroo font-headline text-black leading-tight">
            Your Success is Our Mission
          </h2>

          <div className="mt-6 space-y-6 text-black text-bodySm
  sm:text-bodyMd
  lg:text-bodylg leading-relaxed">
            <p>
            You deserve solutions that deliver performance, insights, and efficiency. You deserve
proactive teams that embrace complexity, adapt to change, and scale with your business on
demand.
            </p>
            <p>
            Whether you’re a fast-growing startup or an established enterprise, with <strong>Telsys</strong>, you get more than technology—you get what your business deserves.
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-black font-bold  text-herooSm
  sm:text-herooMd
  lg:text-heroo mb-4">
              Why Choose Telsys?
            </h3>
            <ul className="space-y-3">
              {listItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start text-black text-bodyySm
  sm:text-bodyyMd
  lg:text-bodyylg"
                >
                  <span className="mr-3 mt-1 text-lg">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-8 text-black text-bodySm
  sm:text-bodyMd
  lg:text-bodylg leading-relaxed">
            As your dedicated technology partner, Telsys manages the full spectrum of cloud,
communication, and connectivity services so you can innovate, scale, and operate with
confidence.
          </p>
        </motion.div>

        {/* Right Column */}
        <motion.div
          className="md:col-span-2 space-y-8"
          variants={itemVariants}
        >
          {/* Image Card */}
          <div className="relative h-[260px] sm:h-[320px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/girl.jpg"
              alt="Happy professional"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <MagneticButton>
                <span className="text-sm sm:text-base font-bold px-6 py-2">
                  Get a quote
                </span>
              </MagneticButton>
            </div>
          </div>

          {/* Logo Section */}
          <div className="bg-gradient-to-br from-cyan-200 to-blue-300 rounded-2xl py-10 text-center space-y-6">
            <h3 className="text-black text-base sm:text-lg px-6 sm:px-16">
              Top Companies Outsourcing Today
            </h3>

            <div className="space-y-4">
              <LogoMarquee logos={logos1} direction="left" />
              <LogoMarquee logos={logos2} direction="right" />
            </div>

            <MagneticButton>
              <span className="text-sm sm:text-base font-bold px-6 py-2">
                Get a quote
              </span>
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
