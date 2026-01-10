
import Header from "@/components/layout/header";
import Hero from "@/components/terms/hero";
import TermsContent from "@/components/terms/terms-content";

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-[#FCFBF8]">
      <Header />
      <main>
        <Hero />
        <TermsContent />
      </main>
    </div>
  );
}
