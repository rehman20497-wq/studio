
"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const logos = [
  { src: "/logos/Upwork.svg", alt: "Upwork" },
  { src: "/logos/Frame-1000003777.png", alt: "GiftHealth" },
  { src: "/logos/ByteDance_logo_English-2.png", alt: "ByteDance" },
  { src: "/logos/Attentive.svg", alt: "Attentive" },
  { src: "/logos/Aurora.svg", alt: "Aurora" },
  { src: "/logos/Faire.svg", alt: "Faire" },
  { src: "/logos/Google.svg", alt: "Google" },
  { src: "/logos/Meta.svg", alt: "Meta" },
  { src: "/logos/Topicals.svg", alt: "Topicals" },
  { src: "/logos/Outschool.svg", alt: "Outschool" },
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

const LogoMarquee: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="py-12"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="relative w-full overflow-hidden">
        <div className="animate-marquee flex items-center whitespace-nowrap h-16">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="mx-10 flex items-center flex-shrink-0"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={40}
                className="object-contain"
              />
            </div>
          ))}
           {logos.map((logo, index) => (
            <div
              key={`duplicate-${index}`}
              className="mx-10 flex items-center flex-shrink-0"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={40}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LogoMarquee;
