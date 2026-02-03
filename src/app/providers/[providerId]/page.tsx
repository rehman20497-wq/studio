'use client';

import { useParams } from 'next/navigation';
import Header from "@/components/layout/header";
import Hero from "@/components/single-provider/hero";
import Details from "@/components/single-provider/details";
import { useDoc, useFirestore, useMemoFirebase, updateDocumentNonBlocking } from '@/firebase';
import { doc, increment } from 'firebase/firestore';
import ProviderFilter from '@/components/providers/provider-filter';
import ClientOnly from '@/components/client-only';
import { useEffect } from 'react';


type ProviderData = {
  id: string;
  name: string;
  solutions: string[];
  description: string;
  bannerImageUrl?: string;
  logoUrl: string;
  impressions?: number;
  clicks?: number;
};

export default function SingleProviderPage() {
  const params = useParams();
  const providerId = params.providerId as string;
  const firestore = useFirestore();

  const providerRef = useMemoFirebase(
    () => (firestore && providerId ? doc(firestore, 'providers', providerId) : null),
    [firestore, providerId]
  );
  
  const { data: providerData, isLoading, error } = useDoc<ProviderData>(providerRef);

  // Track impression
  useEffect(() => {
    if (firestore && providerId) {
      const docRef = doc(firestore, 'providers', providerId);
      updateDocumentNonBlocking(docRef, {
        impressions: increment(1)
      });
    }
  }, [firestore, providerId]);

  if (isLoading) {
    return (
        <div className="bg-[#FCFBF8] min-h-screen">
          <ClientOnly>
            <Header />
          </ClientOnly>
            <main className="flex items-center justify-center h-[50vh]">
                <p>Loading provider details...</p>
            </main>
        </div>
    );
  }

  if (error || !providerData) {
     return (
        <div className="bg-[#FCFBF8] min-h-screen">
            <ClientOnly>
              <Header />
            </ClientOnly>
            <main className="flex items-center justify-center h-[50vh]">
                <p className="text-red-500">
                    {error ? "Error: Could not load provider. Please check the ID or try again later." : "Provider Loading....."}
                </p>
            </main>
        </div>
    );
  }

  // Determine a primary solution for the hero/testimonial sections
  const primarySolution = providerData?.solutions?.[0]?.toLowerCase().includes('cloud') ? 'cloud'
                        : providerData?.solutions?.[0]?.toLowerCase().includes('comm') ? 'communications'
                        : providerData?.solutions?.[0]?.toLowerCase().includes('ai') ? 'ai'
                        : providerData?.solutions?.[0]?.toLowerCase().includes('connect') ? 'connectivity'
                        : 'cloud'; // Default to cloud

  return (
    <div className="bg-[#FCFBF8] pb-[2%]">
      <ClientOnly>
        <Header />
      </ClientOnly>
      <main>
        <Hero 
          solutionType={primarySolution}
          logoUrl={providerData.logoUrl}
        />
        <div className="bg-[#FCFBF8] px-[3%]">
            <ProviderFilter initialSolution={primarySolution} />
        </div>
        <Details
          providerId={providerData.id}
          solutions={providerData.solutions}
          description={providerData.description}
          bannerImage={providerData.bannerImageUrl || 'https://picsum.photos/seed/default-banner/800/600'}
        />
        
       
      </main>
    </div>
  );
}
