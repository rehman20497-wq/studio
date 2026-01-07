
import Header from "@/components/layout/header";
import FinalFooter from "@/components/layout/final-footer";
import Hero from "@/components/careers/hero";
import TeamnSection from "@/components/careers/teamn";
import CareerTestimonial from "@/components/careers/career-testimonial";
import CareerBrushStroke from "@/components/careers/career-brush-stroke";
import AlumniSection from "@/components/careers/alumni-section";

export default function CareersPage() {
  return (
    <div className="bg-[#FCFBF8]">
      <Header />
      <main>
        <Hero />
        <TeamnSection />
        <CareerTestimonial />
        <CareerBrushStroke />
        <AlumniSection />
      </main>
      <FinalFooter />
    </div>
  );
}
