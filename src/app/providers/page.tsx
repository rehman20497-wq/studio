
import { Suspense } from 'react';
import Header from "@/components/layout/header";
import ProvidersGrid from "@/components/providers/providers-grid";
import Heroa from "@/components/solutions/communications/heroa";

export default function ProvidersPage() {
  return (
    <div className="bg-[#FCFBF8]">
      <Header />
      <main>
        <Heroa />
        <Suspense fallback={<div>Loading providers...</div>}>
          <ProvidersGrid />
        </Suspense>
      </main>
    </div>
  );
}
