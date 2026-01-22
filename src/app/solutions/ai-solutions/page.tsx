'use client';

import Header from "@/components/layout/header";
import Hero from "@/components/solutions/ai/hero";
import OurApproachSection from "@/components/solutions/ai/our-approach";
import GetStartedCta from "@/components/solutions/ai/get-started-cta";
import TrustAndSafetySection from "@/components/solutions/ai/trust-and-safety-section";

export default function AiSolutionsPage() {
  return (
    <div className="bg-[#FCFBF8]">
      <Header />
      <main>
        <Hero />
        <OurApproachSection />
        <GetStartedCta />
        <TrustAndSafetySection />
      </main>
    </div>
  );
}
