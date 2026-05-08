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
  createdAt: { seconds: number; nanoseconds: number };
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getProviderBySlug(slug: string): Promise<ProviderData | null> {
  const { firestore } = initializeFirebase();
  if (!firestore) return null;

  try {
    const timeout = new Promise<null>((_, reject) => 
      setTimeout(() => reject(new Error('Firestore timeout')), 5000)
    );

    const fetchTask = firestore.collection('providers')
      .where('slug', '==', slug)
      .limit(1)
      .get();

    const snapshot = await Promise.race([fetchTask, timeout]) as any;
    
    if (!snapshot || snapshot.empty) return null;
    
    const doc = snapshot.docs[0];
    const data = doc.data();

    // Explicitly convert Timestamp objects to plain objects for Next.js serialization
    return {
      ...data,
      id: doc.id,
      createdAt: data.createdAt ? { 
        seconds: (data.createdAt._seconds ?? data.createdAt.seconds) || 0,
        nanoseconds: (data.createdAt._nanoseconds ?? data.createdAt.nanoseconds) || 0
      } : { seconds: 0, nanoseconds: 0 },
      updatedAt: data.updatedAt ? { 
        seconds: (data.updatedAt._seconds ?? data.updatedAt.seconds) || 0,
        nanoseconds: (data.updatedAt._nanoseconds ?? data.updatedAt.nanoseconds) || 0
      } : undefined
    } as ProviderData;
  } catch (error) {
    console.error("Error fetching provider:", error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const provider = await getProviderBySlug(slug);
    if (!provider) return { title: 'Provider Not Found' };

    return {
      title: `${provider.name} | Technology Partners`,
      description: provider.description.replace(/<[^>]*>?/gm, '').substring(0, 160),
      alternates: {
        canonical: `https://telsysinc.com/providers/${provider.slug}`,
      },
    };
  } catch (e) {
    return { title: 'Technology Partner | Telsys Inc.' };
  }
}

export default async function SingleProviderPage({ params }: PageProps) {
  const { slug } = await params;
  const providerData = await getProviderBySlug(slug);

  if (!providerData || providerData.published === false) {
    notFound();
  }

  const primarySolution = providerData.solutions?.[0]?.toLowerCase().includes('cloud') ? 'cloud'
                        : providerData.solutions?.[0]?.toLowerCase().includes('comm') ? 'communications'
                        : providerData.solutions?.[0]?.toLowerCase().includes('ai') ? 'ai'
                        : 'connectivity';

  return (
    <div className="bg-[#FCFBF8] pb-12">
      <ImpressionTracker providerId={providerData.id} />
      <ClientOnly>
        <Header />
      </ClientOnly>
      <main>
        <Hero solutionType={primarySolution as any} logoUrl={providerData.logoUrl} />
        <div className="bg-[#FCFBF8] px-[3%]">
            <ProviderFilter initialSolution={primarySolution} />
        </div>
        <Details
          providerId={providerData.id}
          solutions={providerData.solutions}
          description={providerData.description}
          bannerImage={providerData.bannerImageUrl || 'https://picsum.photos/seed/default/800/600'}
        />
      </main>
    </div>
  );
}
