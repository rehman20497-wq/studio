
'use client';
import type { Metadata } from 'next';
import Header from "@/components/layout/header";
import Hero from "@/components/solutions/communications/hero";
import OurApproachSection from "@/components/solutions/communications/our-approach";
import GetStartedCta from "@/components/solutions/communications/get-started-cta";
import CustomerSupportSection from "@/components/solutions/communications/customer-support-section";
import ServicesFrameworkSection from "@/components/solutions/communications/services-framework-section";
import StatsSection from "@/components/solutions/communications/stats-section";
import OptimizePerformanceSection from "@/components/solutions/communications/optimize-performance-section";
import NewTestimonialSections from "@/components/new-testimonial-sections";
import ClosingBrushStrokess from "@/components/solutions/cloud/closing-brush-strokess";
import IntegrationCtaSections from "@/components/solutions/cloud/integration-cta-sections";
import PartnerMarquee from "@/components/partner-marquee";
import RiskFreeTrials from "@/components/solutions/cloud/risk-free-trials";
import FeaturedGuideSection from "@/components/solutions/communications/featured-guide-section";
import CloudFaqSections from "@/components/solutions/cloud/faq-sections";

// This is a Client Component, so we cannot use the metadata export directly.
// For full SEO, this page could be refactored to move client logic to a child component.
// However, the root layout will provide default metadata.

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
                <ClosingBrushStrokess />
                 <IntegrationCtaSections />
                 <PartnerMarquee />
                 <RiskFreeTrials />
        <FeaturedGuideSection />
        <CloudFaqSections />
      </main>
    </div>
  );
}
