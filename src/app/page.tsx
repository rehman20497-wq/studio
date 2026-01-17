'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Header from "@/components/layout/header";
import RightColumn from "@/components/layout/right-column";
import LogoMarquee from "@/components/logo-marquee";
import NewTestimonialSection from "@/components/new-testimonial-section";
import SuccessMission from "@/components/success-mission";
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
import AbstractCircles from '@/components/alpha/abstract-circles';

export default function Home() {
  const footerRef = useRef(null);
  const isFooterInView = useInView(footerRef, { once: true, amount: 0.2 });

  return (
    <div className="bg-white text-zinc-900 font-body overflow-hidden">
      <ClientOnly>
        <Header />
      </ClientOnly>
      <main className="bg-background font-body">
        <div className="flex flex-col-reverse md:flex-row w-full">
          <div className="relative w-full md:w-1/2 h-[60vh] md:h-screen flex items-center justify-center bg-white">
            <div className="relative w-full h-full">
              <AbstractCircles />
            </div>
          </div>
          <div className="w-full md:w-1/2 h-auto md:h-screen bg-white flex items-center justify-center py-12 md:py-0">
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
        <ClientOnly>
          <FaqSection />
        </ClientOnly>
      </main>
      <SurgeProtectSection />
      <ValidationSection />
      <CustomerStories />
      <ActionButtonsSection />
    </div>
  );
}
