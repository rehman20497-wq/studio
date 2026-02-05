
import type { Metadata } from 'next';
import Header from "@/components/layout/header";
import Hero from "@/components/contact/hero";
import ContactForm from "@/components/contact/contact-form";
import ContactDetails from "@/components/contact/contact-details";

export const metadata: Metadata = {
  title: 'Contact Telsys Inc.',
  description: 'Get in touch with our team of experts. Whether you have a question or a project, we are ready to help you with your cloud, AI, and connectivity needs.',
};

export default function ContactPage() {
  return (
    <div className="bg-[#FCFBF8]">
      <Header />
      <main>
        <Hero />
        <div className="py-24 px-[6%] space-y-24">
          <ContactForm />
          <ContactDetails />
        </div>
      </main>
    </div>
  );
}
