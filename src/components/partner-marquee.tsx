"use client";

import React from 'react';
import Image from 'next/image';

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

const PartnerMarquee: React.FC = () => {
    // Duplicate logos for seamless looping
    const extendedLogos = [...logos, ...logos];

    return (
        <div className="bg-[#FEF9F2] py-12">
            <div className="relative w-full overflow-hidden">
                <div className="animate-marquee-partner whitespace-nowrap flex">
                    {extendedLogos.map((logo, index) => (
                        <div key={index} className="mx-10 flex-shrink-0 flex items-center justify-center h-12">
                            <Image src={logo.src} alt={logo.alt} width={100} height={24} className="h-auto object-contain" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PartnerMarquee;
