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
  slug: string;
  solutions: string[];
  description: string;
  bannerImageUrl?: string;
  logoUrl: string;
  published: boolean;
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Fetches a technology provider by its SEO slug using the Firebase Admin SDK.
 */
async function getProviderBySlug(slug: string): Promise<ProviderData | null> {
  const { firestore } = initializeFirebase();
  if (!firestore) return null;

  try {
    // Strictly query by slug field. No ID fallback.
    const snapshot = await firestore.collection('providers')
      .where('slug', '==', slug)
      .limit(1)
      .get();
    
    if (snapshot.empty) {
      return null;
    }
    
    const doc = snapshot.docs[0];
    return {
      ...doc.data(),
      id: doc.id,
    } as ProviderData;
  } catch (error) {
    console.error("Error fetching provider by slug:", error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const provider = await getProviderBySlug(slug);

    if (!provider) {
      return { 
        title: 'Provider Not Found | Telsys Inc.',
        description: 'The requested technology provider could not be found.'
      };
    }

    const description = provider.description.replace(/<[^>]*>?/gm, '').substring(0, 160);

    return {
      title: `${provider.name} | Technology Partners | Telsys Inc.`,
      description,
      alternates: {
        canonical: `https://telsysinc.com/providers/${provider.slug}`,
      },
      openGraph: {
        title: `${provider.name} Solutions`,
        description,
        url: `https://telsysinc.com/providers/${provider.slug}`,
        siteName: 'Telsys Inc.',
        images: [{ url: provider.logoUrl, width: 800, height: 600, alt: provider.name }],
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
  } catch (error) {
    console.error("Metadata generation error for provider:", error);
    return { title: 'Technology Partners | Telsys Inc.' };
  }
}

export default async function SingleProviderPage({ params }: PageProps) {
  const { slug } = await params;
  const providerData = await getProviderBySlug(slug);

  // Handle missing provider or unpublished status in production
  if (!providerData || (process.env.NODE_ENV === 'production' && providerData.published === false)) {
    notFound();
  }

  // Determine a primary solution for layout mapping
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
      "@id": `https://telsysinc.com/providers/${providerData.slug}`
    }
  };

  return (
    <div className="bg-[#FCFBF8] pb-[2%]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      
      {/* Non-blocking interaction tracker using internal ID */}
      <ImpressionTracker providerId={providerData.id} />
      
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
