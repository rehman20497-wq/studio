
"use client";

import React from 'react';
import { 
    MondayLogo, 
    PaypalLogo, 
    ShopifyLogo, 
    SlackLogo, 
    StripeLogo, 
    TrelloLogo, 
    ZendeskLogo, 
    IntercomLogo 
} from './partner-logos';

const logos = [
  { component: MondayLogo, alt: 'Monday.com' },
  { component: PaypalLogo, alt: 'PayPal' },
  { component: ShopifyLogo, alt: 'Shopify' },
  { component: SlackLogo, alt: 'Slack' },
  { component: StripeLogo, alt: 'Stripe' },
  { component: TrelloLogo, alt: 'Trello' },
  { component: ZendeskLogo, alt: 'Zendesk' },
  { component: IntercomLogo, alt: 'Intercom' },
];

const PartnerMarquee: React.FC = () => {
    // Duplicate logos for seamless looping
    const extendedLogos = [...logos, ...logos];

    return (
        <div className="bg-[#FEF9F2] py-12">
            <div className="relative w-full overflow-hidden">
                <div className="animate-marquee-partner whitespace-nowrap flex">
                    {extendedLogos.map((logo, index) => {
                        const LogoComponent = logo.component;
                        return (
                            <div key={index} className="mx-10 flex-shrink-0 flex items-center justify-center h-12">
                                <LogoComponent className="h-auto" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default PartnerMarquee;
