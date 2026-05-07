import { notFound, redirect } from 'next/navigation';
    import { initializeFirebase } from '@/firebase/server-init';
    
    interface PageProps {
      params: Promise<{ providerId: string }>;
    }
    
    /**
     * Legacy route handler for ID-based provider URLs.
     * Redirects to the SEO-friendly slug route if possible, or returns 404.
     */
    export default async function LegacyProviderPage({ params }: PageProps) {
      const { providerId } = await params;
      const { firestore } = initializeFirebase();
      
      if (!firestore) return notFound();
    
      try {
        const doc = await firestore.collection('providers').doc(providerId).get();
        
        if (doc.exists) {
          const data = doc.data();
          if (data?.slug) {
            // Permanent redirect to the SEO-friendly URL
            redirect(`/providers/${data.slug}`);
          }
        }
      } catch (error) {
        console.error("Legacy provider redirect error:", error);
      }
    
      // Fallback to 404 if no slug is found or error occurs
      notFound();
    }
    