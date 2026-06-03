import { MetadataRoute } from 'next';
import { initializeFirebase } from '@/firebase/server-init';

const appUrl = 'https://telsysinc.com';

/**
 * Generates a dynamic sitemap for Telsys Inc.
 * This function fetches all published providers and blogs from Firestore
 * and maps them to a Google-compliant sitemap format using actual 
 * database timestamps.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { firestore } = initializeFirebase();

  // Fallback date for static pages (Site Launch)
  // We use a fixed date in the past rather than new Date() to avoid 
  // "Last Modified" churn on pages that haven't actually changed.
  const staticLaunchDate = new Date('2025-05-20');
  
  // 1. Define Static Routes
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
  ].map(route => ({
    url: `${appUrl}${route}`,
    lastModified: staticLaunchDate,
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // If Firebase Admin failed to initialize (e.g. missing ENV in build), 
  // return static routes only to prevent build failure.
  if (!firestore) {
    return staticRoutes;
  }

  try {
    const now = new Date();

    // 2. Fetch Dynamic Provider Routes
    const providersSnapshot = await firestore.collection('providers')
      .where('published', '==', true)
      .get();
      
    const providerEntries = providersSnapshot.docs.map(doc => {
      const data = doc.data();
      // Use updatedAt, fallback to createdAt
      const dbTimestamp = data.updatedAt || data.createdAt;
      let lastMod = staticLaunchDate;
      
      if (dbTimestamp) {
        // Handle Firestore Timestamp objects or Date strings
        const rawDate = typeof dbTimestamp.toDate === 'function' 
          ? dbTimestamp.toDate() 
          : new Date(dbTimestamp);
          
        // Issue Fix: Prevent Future Dates
        // If the DB date is in the future (skewed clock), clamp to 'now'
        lastMod = rawDate > now ? now : rawDate;
      }

      return {
        url: `${appUrl}/providers/${data.slug}`,
        lastModified: lastMod,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      };
    });
    
    // 3. Fetch Dynamic Blog Routes
    const blogsSnapshot = await firestore.collection('blog_posts')
      .where('published', '==', true)
      .get();
      
    const blogEntries = blogsSnapshot.docs.map(doc => {
      const data = doc.data();
      const dbTimestamp = data.updatedAt || data.createdAt;
      let lastMod = staticLaunchDate;
      
      if (dbTimestamp) {
        const rawDate = typeof dbTimestamp.toDate === 'function' 
          ? dbTimestamp.toDate() 
          : new Date(dbTimestamp);
          
        // Issue Fix: Prevent Future Dates
        lastMod = rawDate > now ? now : rawDate;
      }

      return {
        url: `${appUrl}/blogs/${data.slug}`,
        lastModified: lastMod,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      };
    });

    // Combine all routes into a single flattened sitemap
    return [...staticRoutes, ...providerEntries, ...blogEntries];
    
  } catch (error) {
    // Log the error but return static routes so the build doesn't crash
    console.error("Critical: Sitemap generation failed partially:", error);
    return staticRoutes;
  }
}
