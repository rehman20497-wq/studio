
import Header from "@/components/layout/header";
import Hero from "@/components/about/hero";
import StatsSection from "@/components/about/stats-section";
import TeamSection from "@/components/about/team-section";
import YellowBrushStroke from "@/components/about/yellow-brush-stroke";
import TeamBSection from "@/components/about/team-b-section";
import TeamCSection from "@/components/about/team-c-section";
import OurValuesSection from "@/components/about/our-values-section";
import LeadershipSection from "@/components/about/leadership-section";
import BlogSection from "@/components/blog-section";

export default function AboutPage() {
  return (
    <div className="bg-[#FCFBF8]">
      <Header />
      <main>
        <Hero />
        <StatsSection />
        <div className="bg-[#fff9e6]">
          <YellowBrushStroke />
        </div>
        <TeamSection />
        <TeamBSection />
        <TeamCSection />
        <OurValuesSection />
        <LeadershipSection />
        <BlogSection />
      </main>
    </div>
  );
}
