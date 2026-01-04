
"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

const logos = [
  { src: '/logos/Asset-43.svg', alt: 'Monday.com' },
  { src: '/logos/Asset-44.svg', alt: 'Intercom' },
  { src: '/logos/Asset-47.svg', alt: 'Zendesk' },
  { src: '/logos/Asset-48.svg', alt: 'Shopify' },
  { src: '/logos/Asset-49.svg', alt: 'PayPal' },
  { src: '/logos/Asset-50.svg', alt: 'Slack' },
  { src: '/logos/Asset-56.svg', alt: 'Trello' },
  { src: '/logos/Asset-62.svg', alt: 'Trello' },
];

const containerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const PartnerMarquee: React.FC = () => {
    // Duplicate logos for seamless looping
    const extendedLogos = [...logos, ...logos];
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <motion.div
            ref={ref}
            className="bg-white py-12"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            <div className="relative w-full overflow-hidden">
                <div className="animate-marquee-partner whitespace-nowrap flex">
                    {extendedLogos.map((logo, index) => (
                        <div key={index} className="mx-10 flex-shrink-0 flex items-center justify-center h-12">
                            <Image src={logo.src} alt={logo.alt} width={100} height={24} className="h-auto object-contain" />
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default PartnerMarquee;
