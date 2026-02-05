
import type { Metadata } from 'next';
import Header from "@/components/layout/header";
import Hero from "@/components/privacy/hero";
import PolicyContent from "@/components/privacy/policy-content";

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Review the Telsys Inc. Privacy Policy to understand how we collect, use, and protect your personal information and data when you use our services.',
};

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
