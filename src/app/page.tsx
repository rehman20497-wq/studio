import Header from "@/components/layout/header";
import RightColumn from "@/components/layout/right-column";
import LogoMarquee from "@/components/logo-marquee";
import NewTestimonialSection from "@/components/new-testimonial-section";
import SuccessMission from "@/components/success-mission";
import TestimonialNetwork from "@/components/testimonial-network";
import UsaMap from "@/components/usa-map";
import GrowthSection from "@/components/growth-section";
import SolutionsSection from "@/components/solutions-section";

export default function Home() {
  return (
    <div className="bg-[#FEF9F2] text-zinc-900 font-body">
      <Header />
      <main className="flex h-screen w-screen bg-background font-body overflow-hidden">
        <div className="relative w-1/2 h-screen flex items-center justify-center">
          <div className="relative w-full h-full">
            <UsaMap />
            <div className="absolute inset-0 bg-background/50" />
            <div className="absolute inset-0">
              <TestimonialNetwork />
            </div>
          </div>
        </div>
        <div className="w-1/2 h-screen bg-[#FEF9F2] flex items-center justify-center">
          <RightColumn />
        </div>
      </main>
      <LogoMarquee />
      <SuccessMission />
      <NewTestimonialSection />
      <GrowthSection />
      <SolutionsSection />
    </div>
  );
}
