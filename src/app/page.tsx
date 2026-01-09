
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Header from "@/components/layout/header";
import RightColumn from "@/components/layout/right-column";
import LogoMarquee from "@/components/logo-marquee";
import NewTestimonialSection from "@/components/new-testimonial-section";
import SuccessMission from "@/components/success-mission";
import TestimonialNetwork from "@/components/testimonial-network";
import UsaMap from "@/components/usa-map";
import GrowthSection from "@/components/growth-section";
import SolutionsSection from "@/components/solutions-section";
import BrushStrokes from "@/components/brush-strokes";
import IntegrationSection from "@/components/integration-section";
import PartnerMarquee from "@/components/partner-marquee";
import LaunchStepsSection from "@/components/launch-steps-section";
import FaqSection from "@/components/faq-section";
import SurgeProtectSection from "@/components/surge-protect-section";
import ValidationSection from "@/components/validation-section";
import CustomerStories from "@/components/customer-stories";
import ActionButtonsSection from "@/components/action-buttons-section";
import ClientOnly from '@/components/client-only';

export default function Home() {
  const footerRef = useRef(null);
  const isFooterInView = useInView(footerRef, { once: true, amount: 0.2 });

  return (
    <div className="bg-white text-zinc-900 font-body">
      <ClientOnly>
        <Header />
      </ClientOnly>
      <main className="bg-background font-body">
        <div className="flex w-full">
          <div className="relative w-1/2 h-screen flex items-center justify-center">
            <div className="relative w-full h-full">
              <UsaMap />
              <div className="absolute inset-0 bg-background/50" />
              <div className="absolute inset-0">
                <TestimonialNetwork />
              </div>
            </div>
          </div>
          <div className="w-1/2 h-screen bg-[#FEF9F2] flex items-center justify-center">
            <RightColumn />
          </div>
        </div>
        <LogoMarquee />
        <SuccessMission />
        <NewTestimonialSection />
        <GrowthSection />
        <SolutionsSection />
        <div className="bg-[#FEF9F2]">
          <BrushStrokes />
        </div>
        <IntegrationSection />
        <PartnerMarquee />
        <LaunchStepsSection />
        <FaqSection />
      </main>
      <SurgeProtectSection />
      <ValidationSection />
      <CustomerStories />
      <ActionButtonsSection />
    </div>
  );
}
