
import type { Metadata } from 'next';
import Header from "@/components/layout/header";
import Hero from "@/components/terms/hero";
import TermsContent from "@/components/terms/terms-content";

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Read the Terms and Conditions for using the Telsys Inc. website and services. Your use of our services is subject to these terms.',
};

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
