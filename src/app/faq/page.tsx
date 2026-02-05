
import type { Metadata } from 'next';
import Header from "@/components/layout/header";
import FaqHero from "@/components/faq/hero";
import FaqAccordion from "@/components/faq/faq-accordion";

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions about Telsys Inc. services, including our Outsourcing+ model, quality assurance, and how we support our partners.',
};

export default function FaqPage() {
  return (
    <div className="bg-[#FCFBF8]">
      <Header />
      <main>
        <FaqHero />
        <FaqAccordion />
      </main>
    </div>
  );
}
