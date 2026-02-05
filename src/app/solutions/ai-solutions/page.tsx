
'use client';
import type { Metadata } from 'next';
import Header from "@/components/layout/header";
import Hero from "@/components/solutions/ai/hero";
import OurApproachSection from "@/components/solutions/ai/our-approach";
import GetStartedCta from "@/components/solutions/ai/get-started-cta";
import TrustAndSafetySection from "@/components/solutions/ai/trust-and-safety-section";
import ServicesFrameworkSection from "@/components/solutions/ai/services-framework-section";
import StatsSection from "@/components/solutions/ai/stats-section";
import OptimizePerformanceSection from "@/components/solutions/ai/optimize-performance-section";
import NewTestimonialSections from "@/components/new-testimonial-sections";
import ClosingBrushStrokesss from "@/components/solutions/cloud/closing-brush-strokesss";
import IntegrationCtaSections from "@/components/solutions/cloud/integration-cta-sections";
import PartnerMarquee from "@/components/partner-marquee";
import RiskFreeTrialss from "@/components/solutions/cloud/risk-free-trialss";
import CloudFaqSectionss from "@/components/solutions/cloud/faq-sectionss";
import FeaturedGuideSections from "@/components/solutions/communications/featured-guide-sections";

// This is a Client Component, so we cannot use the metadata export directly.
// For full SEO, this page could be refactored to move client logic to a child component.
// However, the root layout will provide default metadata.

export default function AiSolutionsPage() {
  return (
    <div className="bg-[#FCFBF8]">
      <Header />
      <main>
        <Hero />
        <OurApproachSection />
        <GetStartedCta />
        <TrustAndSafetySection />
        <ServicesFrameworkSection />
        <StatsSection />
        <OptimizePerformanceSection />
        <NewTestimonialSections />
                        <ClosingBrushStrokesss />
                        <IntegrationCtaSections />
                        <PartnerMarquee />
                        <RiskFreeTrialss />
                        <CloudFaqSectionss />
<FeaturedGuideSections />
      </main>
    </div>
  );
}
