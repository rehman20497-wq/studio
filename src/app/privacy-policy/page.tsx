
import Header from "@/components/layout/header";
import Hero from "@/components/privacy/hero";
import PolicyContent from "@/components/privacy/policy-content";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#FCFBF8]">
      <Header />
      <main>
        <Hero />
        <PolicyContent />
      </main>
    </div>
  );
}
