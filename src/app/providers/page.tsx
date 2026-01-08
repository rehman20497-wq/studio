
import Header from "@/components/layout/header";
import Hero from "@/components/providers/hero";
import ProvidersGrid from "@/components/providers/providers-grid";

export default function ProvidersPage() {
  return (
    <div className="bg-[#FCFBF8]">
      <Header />
      <main>
        <Hero />
        <ProvidersGrid />
      </main>
    </div>
  );
}
