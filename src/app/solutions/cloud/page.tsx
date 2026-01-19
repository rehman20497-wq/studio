
import Header from "@/components/layout/header";
import Hero from "@/components/solutions/cloud/hero";
import CloudLogoMarquee from "@/components/solutions/cloud/cloud-logo-marquee";
import CustomerSupportSection from "@/components/solutions/cloud/customer-support-section";

export default function CloudSolutionsPage() {
  return (
    <div className="bg-[#FCFBF8]">
      <Header />
      <main>
        <Hero />
        <CloudLogoMarquee />
        <CustomerSupportSection />
      </main>
    </div>
  );
}
