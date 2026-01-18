
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

const CloudLogoMarquee: React.FC = () => {
  const extendedLogos = [...logos, ...logos];

  return (
    <div
      className="relative mx-[4%] mb-4"
      style={{
          background: "linear-gradient(98deg, #D6F5FE 8.35%, #D8D6FE 25.43%, #FED6F1 49.33%, #FEFDD6 69.83%, #D6FEF0 91.43%)",
      }}
    >
        <div className="relative w-full overflow-hidden py-12">
            <div className="animate-marquee-right flex items-center whitespace-nowrap h-16">
            {extendedLogos.map((logo, index) => (
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
        <div className="absolute bottom-0 left-0 w-full h-24">
            <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            >
            <path d="M0,0 C40,100 60,100 100,0 Z" fill="#FCFBF8" />
            </svg>
        </div>
    </div>
  );
};

export default CloudLogoMarquee;
