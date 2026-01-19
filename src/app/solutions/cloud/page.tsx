
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

export default function CloudSolutionsPage() {
  return (
    <div className="bg-[#FCFBF8]">
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
      </main>
    </div>
  );
}
