
import type { Metadata } from 'next';
import Header from "@/components/layout/header";
import Hero from "@/components/solutions/cloud/hero";
import CloudLogoMarquee from "@/components/solutions/cloud/cloud-logo-marquee";
import CustomerSupportSection from "@/components/solutions/cloud/customer-support-section";
import ServicesFrameworkSection from "@/components/solutions/cloud/services-framework-section";
import ArrowHaSection from "@/components/solutions/cloud/arrow-ha-section";
import SupportCtaSection from "@/components/solutions/cloud/support-cta-section";
import WhyChooseTelesys from "@/components/solutions/cloud/why-choose-telesys";
import CareerBrushStrokeWhite from "@/components/careers/career-brush-stroke-w";
import FeaturesSection from "@/components/solutions/cloud/features-section";
import CustomerShowcaseSection from "@/components/solutions/cloud/customer-showcase-section";
import CustomerStories from "@/components/customer-stories";
import ComplianceSection from "@/components/solutions/cloud/compliance-section";
import HowItWorks from "@/components/solutions/cloud/how-it-works";
import AnalystsAgreeSection from "@/components/solutions/cloud/analysts-agree-section";
import AwardsSection from "@/components/solutions/cloud/awards-section";
import FeaturedBySection from "@/components/solutions/cloud/featured-by-section";
import ClosingBrushStrokes from "@/components/solutions/cloud/closing-brush-strokes";
import IntegrationCtaSection from "@/components/solutions/cloud/integration-cta-section";
import PartnerMarquee from "@/components/partner-marquee";
import RiskFreeTrial from "@/components/solutions/cloud/risk-free-trial";
import SuccessMissionSection from "@/components/solutions/cloud/success-mission-section";
import CloudFaqSection from "@/components/solutions/cloud/faq-section";

export const metadata: Metadata = {
  title: 'Managed Cloud Solutions & Scalable Infrastructure | Telsys Inc.',
  description: 'Power your business with flexible, secure cloud solutions from Telsys Inc. Built for performance, security, and growth. ISO 27001 & SOC2 Compliant.',
  alternates: {
    canonical: 'https://telsysinc.com/solutions/cloud',
  },
  openGraph: {
    title: 'Managed Cloud Solutions & Scalable Infrastructure | Telsys Inc.',
    description: 'Expert-driven cloud solutions built for performance and growth. ISO 27001 & SOC2 Compliant.',
    url: 'https://telsysinc.com/solutions/cloud',
    type: 'website',
  }
};

export default function CloudSolutionsPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Cloud Solutions",
    "provider": {
      "@type": "Organization",
      "name": "Telsys Inc.",
      "url": "https://telsysinc.com"
    },
    "description": "Flexible, secure cloud solutions built for performance and growth, from seamless scalability to disaster recovery.",
    "areaServed": "US",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Cloud Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Data Backup" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Disaster Recovery" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Security Monitoring" } }
      ]
    }
  };

  return (
    <div className="bg-[#FCFBF8]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <CloudLogoMarquee />
        <CustomerSupportSection />
        <ServicesFrameworkSection />
        <ArrowHaSection />
        <SupportCtaSection />
        <CareerBrushStrokeWhite/>
        <WhyChooseTelesys />
        <FeaturesSection />
        <CustomerShowcaseSection />
        <CustomerStories />        
        <ComplianceSection />
        <HowItWorks />
        <AnalystsAgreeSection />
        <AwardsSection />
        <FeaturedBySection />
        <ClosingBrushStrokes />
        <IntegrationCtaSection />
        <PartnerMarquee />
        <RiskFreeTrial />
        <SuccessMissionSection />
        <CloudFaqSection />
      </main>
    </div>
  );
}
