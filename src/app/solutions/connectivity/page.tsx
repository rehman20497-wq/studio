
'use client';
import type { Metadata } from 'next';
import Header from "@/components/layout/header";
import Hero from "@/components/solutions/connectivity/hero";
import OurApproachSection from "@/components/solutions/connectivity/our-approach";
import GetStartedCta from "@/components/solutions/connectivity/get-started-cta";
import CustomerSupportSection from "@/components/solutions/connectivity/customer-support-section";
import ServicesFrameworkSection from "@/components/solutions/connectivity/services-framework-section";
import StatsSection from "@/components/solutions/connectivity/stats-section";
import OptimizePerformanceSection from "@/components/solutions/connectivity/optimize-performance-section";
import NewTestimonialSections from "@/components/new-testimonial-sections";
import ClosingBrushStrokessss from "@/components/solutions/cloud/closing-brush-strokessss";
import IntegrationCtaSections from "@/components/solutions/cloud/integration-cta-sections";
import PartnerMarquee from "@/components/partner-marquee";
import RiskFreeTrialsss from "@/components/solutions/cloud/risk-free-trialsss";
import CloudFaqSectionf from "@/components/solutions/cloud/faq-sectionf";
import FeaturedGuideSectionss from "@/components/solutions/communications/featured-guide-sectionss";

// This is a Client Component, so we cannot use the metadata export directly.
// For full SEO, this page could be refactored to move client logic to a child component.
// However, the root layout will provide default metadata.

export default function ConnectivitySolutionsPage() {
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
                        <ClosingBrushStrokessss />
                         <IntegrationCtaSections />
                                         <PartnerMarquee />
                                         <RiskFreeTrialsss />
                                         <CloudFaqSectionf />
                                                 <FeaturedGuideSectionss />
      </main>
    </div>
  );
}
