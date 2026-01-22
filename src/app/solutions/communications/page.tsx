
import Header from "@/components/layout/header";
import Hero from "@/components/solutions/communications/hero";
import OurApproachSection from "@/components/solutions/communications/our-approach";
import GetStartedCta from "@/components/solutions/communications/get-started-cta";
import CustomerSupportSection from "@/components/solutions/communications/customer-support-section";
import ServicesFrameworkSection from "@/components/solutions/communications/services-framework-section";
import StatsSection from "@/components/solutions/communications/stats-section";

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
      </main>
    </div>
  );
}
