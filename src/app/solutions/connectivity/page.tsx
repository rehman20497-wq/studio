'use client';

import Header from "@/components/layout/header";
import Hero from "@/components/solutions/connectivity/hero";
import OurApproachSection from "@/components/solutions/connectivity/our-approach";
import GetStartedCta from "@/components/solutions/connectivity/get-started-cta";
import CustomerSupportSection from "@/components/solutions/connectivity/customer-support-section";
import ServicesFrameworkSection from "@/components/solutions/connectivity/services-framework-section";
import StatsSection from "@/components/solutions/connectivity/stats-section";
import OptimizePerformanceSection from "@/components/solutions/connectivity/optimize-performance-section";
import NewTestimonialSections from "@/components/new-testimonial-sections";
import SurgeProtectSection1 from "@/components/surge-protect-section1";
import YellowBrushStrokesss from "@/components/about/pink-brush-stroke";
import ClientOnly from '@/components/client-only';
import FaqSection from "@/components/faq-section";
import ClosingBrushStrokessss from "@/components/solutions/cloud/closing-brush-strokessss";
import IntegrationCtaSections from "@/components/solutions/cloud/integration-cta-sections";
import PartnerMarquee from "@/components/partner-marquee";
import RiskFreeTrialsss from "@/components/solutions/cloud/risk-free-trialsss";
import CloudFaqSection from "@/components/solutions/cloud/faq-section";
import FeaturedGuideSectionss from "@/components/solutions/communications/featured-guide-sectionss";
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
        <SurgeProtectSection1 />
        <YellowBrushStrokesss />
        <ClientOnly>
                          <FaqSection />
                        </ClientOnly>
                        <ClosingBrushStrokessss />
                         <IntegrationCtaSections />
                                         <PartnerMarquee />
                                         <RiskFreeTrialsss />
                                         <CloudFaqSection />
                                                 <FeaturedGuideSectionss />
      </main>
    </div>
  );
}
