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
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8 },
  },
};

const LogoMarquee: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const renderLogoSet = (keyPrefix: string) => (
    logos.map((logo, index) => (
      <div
        key={`${keyPrefix}-${index}`}
        className="relative flex-shrink-0 flex items-center justify-center 
          /* Horizontal Spacing */
          mx-6 md:mx-10 lg:mx-12
          
          /* HEIGHT LOGIC */
          h-8           
          lg:h-9        
          xl:h-12       
          
          
          w-28 
          sm:w-32 
          lg:w-36       
          xl:w-48"
      >
        <Image
          src={logo.src}
          alt={logo.alt}
          fill
          sizes="(min-width: 1280px) 192px, (min-width: 1024px) 144px, 112px"
          className="object-contain"
          priority={index < 5}
        />
      </div>
    ))
  );

  return (
    <motion.div
      ref={ref}
      className="py-10 lg:py-14 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="relative w-full">
        {/* Edge Fades for smooth transitions */}
        <div className="absolute inset-y-0 left-0 w-12 md:w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-12 md:w-24 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="animate-marquee flex items-center whitespace-nowrap">
          {renderLogoSet("first")}
          {renderLogoSet("second")}
        </div>
      </div>
    </motion.div>
  );
};

export default LogoMarquee;