
import type { Metadata } from 'next';
import Header from "@/components/layout/header";
import Hero from "@/components/about/hero";
import StatsSection from "@/components/about/stats-section";
import TeamSection from "@/components/about/team-section";
import YellowBrushStroke from "@/components/about/yellow-brush-stroke";
import TeamBSection from "@/components/about/team-b-section";
import TeamCSection from "@/components/about/team-c-section";
import OurValuesSection from "@/components/about/our-values-section";

export const metadata: Metadata = {
  title: 'About Telsys Inc.',
  description: "Learn about Telsys Inc.'s mission to deliver better outcomes and the team of experts driving innovation in cloud, AI, and communications in the USA.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#FCFBF8]">
      <Header />
      <main>
        <Hero />
        <StatsSection />
        <YellowBrushStroke />
        <TeamSection />
        <TeamBSection />
        <TeamCSection />
        <OurValuesSection />
      </main>
    </div>
  );
}
