import { MetadataRoute } from 'next';
import { initializeFirebase } from '@/firebase/server-init';

const appUrl = 'https://telsysinc.com';

type Provider = {
  id: string;
  updatedAt?: { seconds: number };
};

type BlogPost = {
  id: string;
  updatedAt?: { seconds: number };
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const { firestore } = initializeFirebase();

    // Fetch dynamic routes
    const providersRef = firestore.collection('providers');
    const providersQuery = providersRef.where('published', '==', true);
    const providersSnapshot = await providersQuery.get();
    const providerUrls = providersSnapshot.docs.map(doc => {
      const data = doc.data() as Provider;
      return {
        url: `${appUrl}/providers/${doc.id}`,
        lastModified: data.updatedAt ? new Date(data.updatedAt.seconds * 1000) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      };
    });
    
    const blogsRef = firestore.collection('blog_posts');
    const blogsQuery = blogsRef.where('published', '==', true);
    const blogsSnapshot = await blogsQuery.get();
    const blogUrls = blogsSnapshot.docs.map(doc => {
      const data = doc.data() as BlogPost;
      return {
        url: `${appUrl}/blogs/${doc.id}`,
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
    console.error("Error generating sitemap:", error);
    // Basic fallback
    const staticRoutes = ['', '/about', '/contact', '/blogs', '/providers', '/faq'];
    return staticRoutes.map(route => ({
      url: `${appUrl}${route}`,
      lastModified: new Date(),
    }));
  }
}
