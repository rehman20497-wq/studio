"use client";

import React from "react";
import Image from "next/image";

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

const LogoMarquee: React.FC = () => {
  return (
    <div className="py-12">
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
        </div>
      </div>
    </div>
  );
};

export default LogoMarquee;
