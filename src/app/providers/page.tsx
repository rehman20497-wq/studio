
import type { Metadata } from 'next';
import { Suspense } from 'react';
import Header from "@/components/layout/header";
import ProvidersGrid from "@/components/providers/providers-grid";
import Heroa from "@/components/solutions/communications/heroa";

export const metadata: Metadata = {
  title: 'Our Technology & Service Providers',
  description: 'Explore the network of expert providers that partner with Telsys Inc. to deliver best-in-class cloud, AI, communications, and connectivity solutions.',
};

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
