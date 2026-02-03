"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const logos = [
  { src: "/logo/8x8 black.png", alt: "Upwork" },
  { src: "/logo/11.png", alt: "GiftHealth" },
  { src: "/logo/air.png", alt: "ByteDance" },
  { src: "/logo/AtT.png", alt: "Attentive" },
  { src: "/logo/dial.svg", alt: "Aurora" },
  { src: "/logo/Lumen.png", alt: "Faire" },
  { src: "/logo/meterss.png", alt: "Google" },
  { src: "/logo/ooma.png", alt: "Meta" },
  { src: "/logo/ringss.png", alt: "Topicals" },
  { src: "/logo/vono.png", alt: "Outschool" },
  { src: "/logo/zoom.svg", alt: "Outschool" },
];
const CloudLogoMarquee: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Duplicate logos for seamless loop
  const extendedLogos = [...logos, ...logos];

  return (
    <motion.div
      ref={ref}
      className="relative mx-[4%] overflow-hidden rounded-b-[40px]"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        background: "linear-gradient(to bottom, #DDF9FF 0%, #9FD4FF 100%)",
      }}
    >
      {/* Logo Marquee */}
      <div className="relative w-full overflow-hidden pt-10 pb-48 z-10">
        <motion.div
          className="flex items-center whitespace-nowrap h-24"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 25,
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

      {/* Bottom Cream Curve */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-[250px] z-20 pointer-events-none"
        initial={{ y: 80, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 250"
          preserveAspectRatio="none"
        >
          <path
            d="
              M0,250
              C240,95 480,40 720,40
              C960,40 1200,95 1440,250
              L1440,250
              L0,250
              Z
            "
            fill="#FCFBF8"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default CloudLogoMarquee;
