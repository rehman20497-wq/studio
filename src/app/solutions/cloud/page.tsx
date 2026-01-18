
import Header from "@/components/layout/header";
import Hero from "@/components/solutions/cloud/hero";
import CloudLogoMarquee from "@/components/solutions/cloud/cloud-logo-marquee";

export default function CloudSolutionsPage() {
  return (
    <div className="bg-[#FCFBF8]">
      <Header />
      <main>
        <Hero />
        <CloudLogoMarquee />
      </main>
    </div>
  );
}
