import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from "@/components/layout/header";
import Hero from "@/components/single-provider/hero";
import Details from "@/components/single-provider/details";
import ProviderFilter from '@/components/providers/provider-filter';
import ClientOnly from '@/components/client-only';
import { initializeFirebase } from '@/firebase/server-init';
import ImpressionTracker from '@/components/single-provider/impression-tracker';

type ProviderData = {
  id: string;
  name: string;
  solutions: string[];
  description: string;
  bannerImageUrl?: string;
  logoUrl: string;
  slug?: string;
  impressions?: number;
  clicks?: number;
};

interface PageProps {
  params: Promise<{ providerId: string }>;
}

async function getProvider(providerId: string): Promise<ProviderData | null> {
  try {
    const { firestore } = initializeFirebase();
    const doc = await firestore.collection('providers').doc(providerId).get();
    
    if (!doc.exists) return null;
    
    return {
      ...doc.data(),
      id: doc.id,
    } as ProviderData;
  } catch (error) {
    console.error("Error fetching provider on server:", error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { providerId } = await params;
  const provider = await getProvider(providerId);

  if (!provider) return { title: 'Provider Not Found' };

  const description = provider.description.replace(/<[^>]*>?/gm, '').substring(0, 160);

  return {
    title: `${provider.name} | Technology Partners | Telsys Inc.`,
    description,
    alternates: {
      canonical: `https://telsysinc.com/providers/${providerId}`,
    },
    openGraph: {
      title: `${provider.name} Solutions`,
      description,
      url: `https://telsysinc.com/providers/${providerId}`,
      siteName: 'Telsys Inc.',
      images: [
        {
          url: provider.logoUrl,
          width: 800,
          height: 600,
          alt: provider.name,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: provider.name,
      description,
      images: [provider.logoUrl],
    },
  };
}

export default async function SingleProviderPage({ params }: PageProps) {
  const { providerId } = await params;
  const providerData = await getProvider(providerId);

  if (!providerData) {
    notFound();
  }

  // Determine a primary solution for the hero/testimonial sections
  const primarySolution = providerData.solutions?.[0]?.toLowerCase().includes('cloud') ? 'cloud'
                        : providerData.solutions?.[0]?.toLowerCase().includes('comm') ? 'communications'
                        : providerData.solutions?.[0]?.toLowerCase().includes('ai') ? 'ai'
                        : providerData.solutions?.[0]?.toLowerCase().includes('connect') ? 'connectivity'
                        : 'cloud';

  // Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": providerData.name,
    "provider": {
      "@type": "Organization",
      "name": "Telsys Inc.",
      "url": "https://telsysinc.com"
    },
    "description": providerData.description.replace(/<[^>]*>?/gm, '').substring(0, 160),
    "category": providerData.solutions.join(', '),
    "image": providerData.logoUrl,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://telsysinc.com/providers/${providerId}`
    }
  };

  return (
    <div className="bg-[#FCFBF8] pb-[2%]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      
      <ImpressionTracker providerId={providerId} />
      
      <ClientOnly>
        <Header />
      </ClientOnly>

      <main>
        <Hero 
          solutionType={primarySolution as any}
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
