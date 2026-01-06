
import Header from "@/components/layout/header";
import FinalFooter from "@/components/layout/final-footer";
import Hero from "@/components/about/hero";
import StatsSection from "@/components/about/stats-section";

export default function AboutPage() {
  return (
    <div className="bg-[#FCFBF8]">
      <Header />
      <main>
        <Hero />
        <StatsSection />
      </main>
      <FinalFooter />
    </div>
  );
}
