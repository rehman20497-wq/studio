
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/header';
import { initializeFirebase } from '@/firebase/server-init';
import ClientOnly from '@/components/client-only';
import Hero from '@/components/single-blog/hero';
import BlogContent from '@/components/single-blog/blog-content';
import ViewTracker from '@/components/single-blog/view-tracker';

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  category: string;
  featuredImageUrl: string;
  content: string;
  quote?: string;
  authorName: string;
  authorImageUrl: string;
  createdAt: { seconds: number };
  published: boolean;
  views: number;
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const { firestore } = initializeFirebase();
    // Query by slug instead of ID
    const snapshot = await firestore.collection('blog_posts')
      .where('slug', '==', slug)
      .limit(1)
      .get();
    
    if (snapshot.empty) {
      // Fallback: Check if the slug is actually an ID (for legacy links)
      const doc = await firestore.collection('blog_posts').doc(slug).get();
      if (doc.exists) {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          createdAt: { seconds: data?.createdAt?._seconds || data?.createdAt?.seconds || 0 }
        } as any;
      }
      return null;
    }
    
    const doc = snapshot.docs[0];
    const data = doc.data();
    return {
      ...data,
      id: doc.id,
      createdAt: { seconds: data?.createdAt?._seconds || data?.createdAt?.seconds || 0 }
    } as any;
  } catch (error) {
    console.error("Error fetching post on server:", error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return { title: 'Post Not Found' };

  const description = post.content.replace(/<[^>]*>?/gm, '').substring(0, 160);

  return {
    title: `${post.title} | Telsys Inc. Blog`,
    description,
    alternates: {
      canonical: `https://telsysinc.com/blogs/${post.slug || post.id}`,
    },
    openGraph: {
      title: post.title,
      description,
      url: `https://telsysinc.com/blogs/${post.slug || post.id}`,
      siteName: 'Telsys Inc.',
      images: [
        {
          url: post.featuredImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: new Date(post.createdAt.seconds * 1000).toISOString(),
      authors: [post.authorName],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [post.featuredImageUrl],
    },
  };
}

export default async function SingleBlogPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post || (process.env.NODE_ENV === 'production' && post.published === false)) {
    notFound();
  }

  // Article Schema for Rich Results
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.featuredImageUrl,
    "author": {
      "@type": "Person",
      "name": post.authorName,
      "image": post.authorImageUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "Telsys Inc.",
      "logo": {
        "@type": "ImageObject",
        "url": "https://telsysinc.com/tele.png"
      }
    },
    "datePublished": new Date(post.createdAt.seconds * 1000).toISOString(),
    "description": post.content.replace(/<[^>]*>?/gm, '').substring(0, 160),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://telsysinc.com/blogs/${post.slug || post.id}`
    }
  };

  return (
    <div className="bg-[#FCFBF8]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/* ViewTracker handles the side effect of incrementing views on the client using the internal ID */}
      <ViewTracker postId={post.id} />
      
      <ClientOnly>
        <Header />
      </ClientOnly>
      
      <main className="relative overflow-visible">
        <Hero post={post} />
        <div className="relative overflow-visible">
          <BlogContent post={post} />
        </div>
      </main>
    </div>
  );
}
