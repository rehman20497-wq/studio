
import Header from "@/components/layout/header";
import Hero from "@/components/contact/hero";
import ContactForm from "@/components/contact/contact-form";
import ContactDetails from "@/components/contact/contact-details";

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
