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

const CloudLogoMarquee: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Duplicate logos for seamless loop
  const extendedLogos = [...logos, ...logos];

  return (
    <motion.div
      ref={ref}
      className="relative mx-[4%] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        background: "#DDF9FF",
      }}
    >
      {/* Logo Marquee */}
      <div className="relative w-full overflow-hidden py-10 z-10">
        <motion.div
          className="flex items-center whitespace-nowrap h-24"
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            repeat: Infinity,
            duration: 40,
            ease: "linear",
          }}
        >
          {extendedLogos.map((logo, index) => (
            <div
              key={index}
              className="mx-14 flex items-center flex-shrink-0"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={40}
                className="object-contain"
                priority={index < logos.length}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CloudLogoMarquee;
