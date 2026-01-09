
'use client';

import { useParams } from 'next/navigation';
import Header from "@/components/layout/header";
import Hero from "@/components/providers/hero";
import ProvidersGrid from "@/components/providers/providers-grid";

export default function FilteredProvidersPage() {
  const params = useParams();
  const solution = params.solution as string;

  return (
    <div className="bg-[#FCFBF8]">
      <Header />
      <main>
        <Hero />
        <ProvidersGrid initialSolution={solution} />
      </main>
    </div>
  );
}
