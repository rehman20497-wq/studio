
import Header from "@/components/layout/header";
import Hero from "@/components/solutions/communications/hero";
import OurApproachSection from "@/components/solutions/communications/our-approach";


export default function CommunicationsSolutionsPage() {
  return (
    <div className="bg-[#FCFBF8]">
      <Header />
      <main>
        <Hero />
        <OurApproachSection />
      </main>
    </div>
  );
}
