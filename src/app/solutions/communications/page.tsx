'use client';

import Header from "@/components/layout/header";
import Hero from "@/components/solutions/communications/hero";
import OurApproachSection from "@/components/solutions/communications/our-approach";
import GetStartedCta from "@/components/solutions/communications/get-started-cta";
import CustomerSupportSection from "@/components/solutions/communications/customer-support-section";
import ServicesFrameworkSection from "@/components/solutions/communications/services-framework-section";
import StatsSection from "@/components/solutions/communications/stats-section";
import OptimizePerformanceSection from "@/components/solutions/communications/optimize-performance-section";
import NewTestimonialSections from "@/components/new-testimonial-sections";
import SurgeProtectSection1 from "@/components/surge-protect-section1";
import YellowBrushStrokess from "@/components/about/green-brush-stroke";
import ClientOnly from '@/components/client-only';
import FaqSection from "@/components/faq-section";
import ClosingBrushStrokess from "@/components/solutions/cloud/closing-brush-strokess";
import IntegrationCtaSections from "@/components/solutions/cloud/integration-cta-sections";
import PartnerMarquee from "@/components/partner-marquee";
import RiskFreeTrials from "@/components/solutions/cloud/risk-free-trials";
import CloudFaqSection from "@/components/solutions/cloud/faq-section";
import FeaturedGuideSection from "@/components/solutions/communications/featured-guide-section";
import CloudFaqSections from "@/components/solutions/cloud/faq-sections";
export default function CommunicationsSolutionsPage() {
  return (
    <div className="bg-[#FCFBF8]">
      <Header />
      <main>
        <Hero />
        <OurApproachSection />
        <GetStartedCta />
        <CustomerSupportSection />
        <ServicesFrameworkSection />
        <StatsSection />
        <OptimizePerformanceSection />
        <NewTestimonialSections />
        <SurgeProtectSection1 />
        <YellowBrushStrokess />
         <ClientOnly>
                  <FaqSection />
                </ClientOnly>
                <ClosingBrushStrokess />
                 <IntegrationCtaSections />
                 <PartnerMarquee />
                 <RiskFreeTrials />
        <CloudFaqSection />
        <FeaturedGuideSection />
        <CloudFaqSections />
      </main>
    </div>
  );
}
