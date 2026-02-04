import { MetadataRoute } from 'next';
import { initializeFirebase } from '@/firebase/server-init';
import { collection, getDocs, query, where } from 'firebase/firestore';

type Provider = {
  id: string;
  updatedAt?: { seconds: number };
};

type BlogPost = {
  id: string;
  updatedAt?: { seconds: number };
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.telesys.com';

  try {
    const { firestore } = initializeFirebase();

    // Fetch dynamic routes
    const providersRef = collection(firestore, 'providers');
    const providersQuery = query(providersRef, where('published', '==', true));
    const providersSnapshot = await getDocs(providersQuery);
    const providerUrls = providersSnapshot.docs.map(doc => {
      const data = doc.data() as Provider;
      return {
        url: `${appUrl}/providers/${doc.id}`,
        lastModified: data.updatedAt ? new Date(data.updatedAt.seconds * 1000) : new Date(),
      };
    });
    
    const blogsRef = collection(firestore, 'blog_posts');
    const blogsQuery = query(blogsRef, where('published', '==', true));
    const blogsSnapshot = await getDocs(blogsQuery);
    const blogUrls = blogsSnapshot.docs.map(doc => {
      const data = doc.data() as BlogPost;
      return {
        url: `${appUrl}/blogs/${doc.id}`,
        lastModified: data.updatedAt ? new Date(data.updatedAt.seconds * 1000) : new Date(),
      };
    });

    const staticRoutes = [
      '/',
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
      priority: route === '/' ? 1.0 : 0.8
    }));

    return [...staticUrls, ...providerUrls, ...blogUrls];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Return a basic sitemap if Firestore fetch fails
    const staticRoutes = [
      '/',
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
    return staticRoutes.map(route => ({
      url: `${appUrl}${route}`,
      lastModified: new Date(),
    }));
  }
}
