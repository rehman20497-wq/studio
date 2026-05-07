import { MetadataRoute } from 'next';
import { initializeFirebase } from '@/firebase/server-init';

const appUrl = 'https://telsysinc.com';

type Provider = {
  id: string;
  slug: string;
  updatedAt?: { seconds: number };
};

type BlogPost = {
  id: string;
  slug: string;
  updatedAt?: { seconds: number };
};

/**
 * Generates a dynamic sitemap for Telsys Inc.
 * Fetches all published providers and blogs to ensure comprehensive indexing.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { firestore } = initializeFirebase();

  // If Firebase Admin failed to initialize, return static routes only to prevent total sitemap failure
  if (!firestore) {
    const staticRoutes = ['', '/about', '/careers', '/contact', '/blogs', '/providers', '/faq'];
    return staticRoutes.map(route => ({
      url: `${appUrl}${route}`,
      lastModified: new Date(),
    }));
  }

  try {
    // Fetch dynamic Provider routes
    const providersRef = firestore.collection('providers');
    const providersSnapshot = await providersRef.where('published', '==', true).get();
    const providerUrls = providersSnapshot.docs.map(doc => {
      const data = doc.data() as Provider;
      return {
        url: `${appUrl}/providers/${data.slug}`,
        lastModified: data.updatedAt ? new Date(data.updatedAt.seconds * 1000) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      };
    });
    
    // Fetch dynamic Blog routes
    const blogsRef = firestore.collection('blog_posts');
    const blogsSnapshot = await blogsRef.where('published', '==', true).get();
    const blogUrls = blogsSnapshot.docs.map(doc => {
      const data = doc.data() as BlogPost;
      return {
        url: `${appUrl}/blogs/${data.slug}`,
        lastModified: data.updatedAt ? new Date(data.updatedAt.seconds * 1000) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      };
    });

    const staticRoutes = [
      '',
      '/about',
      '/careers',
      '/contact',
      '/blogs',
      '/providers',
      '/faq',
      '/privacy-policy',
      '/terms-and-conditions',
      '/solutions/cloud',
      '/solutions/communications',
      '/solutions/ai-solutions',
      '/solutions/connectivity',
    ];

    const staticUrls = staticRoutes.map(route => ({
      url: `${appUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1.0 : 0.8
    }));

    return [...staticUrls, ...providerUrls, ...blogUrls];
  } catch (error) {
    console.error("Error generating dynamic sitemap parts:", error);
    // Fallback to basic static routes on runtime errors
    const staticRoutes = ['', '/about', '/contact', '/blogs', '/providers'];
    return staticRoutes.map(route => ({
      url: `${appUrl}${route}`,
      lastModified: new Date(),
    }));
  }
}
