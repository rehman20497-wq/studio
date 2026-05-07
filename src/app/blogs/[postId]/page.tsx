import { notFound, redirect } from 'next/navigation';
import { initializeFirebase } from '@/firebase/server-init';

interface PageProps {
  params: Promise<{ postId: string }>;
}

/**
 * Legacy route handler for ID-based blog URLs.
 * Redirects to the SEO-friendly slug route if possible, or returns 404.
 */
export default async function LegacyBlogPage({ params }: PageProps) {
  const { postId } = await params;
  const { firestore } = initializeFirebase();
  
  if (!firestore) return notFound();

  try {
    const doc = await firestore.collection('blog_posts').doc(postId).get();
    
    if (doc.exists) {
      const data = doc.data();
      if (data?.slug) {
        // Permanent redirect to the SEO-friendly URL
        redirect(`/blogs/${data.slug}`);
      }
    }
  } catch (error) {
    console.error("Legacy blog redirect error:", error);
  }

  // Fallback to 404 if no slug is found or error occurs
  notFound();
}
