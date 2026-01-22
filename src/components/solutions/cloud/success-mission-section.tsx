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
    '100% college graduate workforce with 3+ years of professional experience and industry specific training.',
    'Omnichannel coverage across chat, email, and voice with 24/7 availability.',
    'Over 60 languages. We speak all major languages to cover the global markets.',
    'Flexible scaling with surge and buffer staffing to support seasonal peaks.',
    'Teams are 100% dedicated to your company only, never shared with other clients.',
    'Proven KPIs: phone pickup in under 4 seconds, first response in chat within 2–5 minutes, and email under 10 minutes.',
    'Secure operations with clean room options, disaster recovery protocols, and layered redundancies.',
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
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-headline text-black leading-tight">
            Your Success is Our Mission
          </h2>

          <div className="mt-6 space-y-6 text-black text-base sm:text-lg lg:text-[20px] leading-relaxed">
            <p>
              You deserve better outcomes, insights, and conversations. You
              deserve proactive teams that embrace complexity, adapt to
              ambiguity, and flex to your needs with just 24 hours notice.
            </p>
            <p>
              Whether you’re a disruptive startup or an iconic brand, with Hugo
              you get more than outsourcing – you get what you deserve.
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-black font-bold text-lg mb-4">
              Why Choose Hugo?
            </h3>
            <ul className="space-y-3">
              {listItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start text-black text-sm sm:text-base"
                >
                  <span className="mr-3 mt-1 text-lg">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-8 text-black text-base sm:text-lg leading-relaxed">
            As your dedicated partner, Hugo manages the full spectrum of
            customer care so you can scale with confidence.
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
