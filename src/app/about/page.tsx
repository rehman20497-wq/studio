
import Header from "@/components/layout/header";
import FinalFooter from "@/components/layout/final-footer";
import Hero from "@/components/about/hero";
import StatsSection from "@/components/about/stats-section";
import YellowBrushStroke from "@/components/about/yellow-brush-stroke";
import TeamSection from "@/components/about/team-section";

export default function AboutPage() {
  return (
    <div className="bg-[#FCFBF8]">
      <Header />
      <main>
        <Hero />
        <StatsSection />
        <YellowBrushStroke />
        <TeamSection />
      </main>
      <FinalFooter />
    </div>
  );
}
