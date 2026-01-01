
"use client";

import React from 'react';
import Image from 'next/image';

const logos = [
    { src: '/logos/upwork.svg', alt: 'Upwork' },
    { src: '/logos/gifthealth.svg', alt: 'GiftHealth' },
    { src: '/logos/bytedance.svg', alt: 'ByteDance' },
    { src: '/logos/attentive.svg', alt: 'Attentive' },
    { src: '/logos/aurora.svg', alt: 'Aurora' },
    { src: '/logos/faire.svg', alt: 'Faire' },
    { src: '/logos/google.svg', alt: 'Google' },
    { src: '/logos/upwork.svg', alt: 'Upwork' },
    { src: '/logos/gifthealth.svg', alt: 'GiftHealth' },
    { src: '/logos/bytedance.svg', alt: 'ByteDance' },
    { src: '/logos/attentive.svg', alt: 'Attentive' },
    { src: '/logos/aurora.svg', alt: 'Aurora' },
    { src: '/logos/faire.svg', alt: 'Faire' },
    { src: '/logos/google.svg', alt: 'Google' },
];

const LogoMarquee: React.FC = () => {
    return (
        <div className="py-12">
            <div className="relative w-full overflow-hidden">
                <div className="animate-marquee whitespace-nowrap flex">
                    {logos.map((logo, index) => (
                        <div key={index} className="mx-10 flex-shrink-0">
                            <Image src={logo.src} alt={logo.alt} width={120} height={40} className="object-contain" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LogoMarquee;
