
import Header from "@/components/layout/header";
import FaqHero from "@/components/faq/hero";
import FaqAccordion from "@/components/faq/faq-accordion";

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
