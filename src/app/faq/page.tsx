import type { Metadata } from 'next';
import Header from "@/components/layout/header";
import FaqHero from "@/components/faq/hero";
import FaqAccordion from "@/components/faq/faq-accordion";
import { faqData } from '@/lib/faq-data';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions about Telsys Inc. services, including Cloud, AI, Communications, and how we help businesses grow.',
};

export default function FaqPage() {
  // Extract all questions and answers for the schema
  const allFaqs = faqData.flatMap(category => category.items);
  
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer.replace(/<[^>]*>?/gm, '') // Strip HTML tags for clean text
      }
    }))
  };

  return (
    <div className="bg-[#FCFBF8]">
      <Header />
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <main>
        <FaqHero />
        <FaqAccordion />
      </main>
    </div>
  );
}
