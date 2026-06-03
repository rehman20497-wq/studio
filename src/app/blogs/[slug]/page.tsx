
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
  createdAt: { seconds: number; nanoseconds: number };
  updatedAt?: { seconds: number; nanoseconds: number };
  published: boolean;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  tags?: string[];
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { firestore } = initializeFirebase();
  if (!firestore) return null;

  try {
    const timeout = new Promise<null>((_, reject) => 
      setTimeout(() => reject(new Error('Firestore timeout')), 5000)
    );

    const fetchTask = firestore.collection('blog_posts')
      .where('slug', '==', slug)
      .limit(1)
      .get();

    const snapshot = await Promise.race([fetchTask, timeout]) as any;
    
    if (!snapshot || snapshot.empty) return null;
    
    const doc = snapshot.docs[0];
    const data = doc.data();
    
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
    } as BlogPost;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://telsysinc.com';
  
  try {
    const post = await getPostBySlug(slug);
    if (!post) return { title: 'Post Not Found' };

    const title = post.metaTitle || `${post.title} | Telsys Inc. Blog`;
    const description = post.metaDescription || post.content.replace(/<[^>]*>?/gm, '').substring(0, 160);
    const pageUrl = `${baseUrl}/blogs/${post.slug}`;

    return {
      title,
      description,
      keywords: post.keywords?.join(', '),
      alternates: {
        canonical: pageUrl,
      },
      openGraph: {
        title,
        description,
        url: pageUrl,
        images: [{ url: post.featuredImageUrl }],
        type: 'article',
        publishedTime: new Date(post.createdAt.seconds * 1000).toISOString(),
        modifiedTime: post.updatedAt ? new Date(post.updatedAt.seconds * 1000).toISOString() : undefined,
        authors: [post.authorName],
        section: post.category,
        tags: post.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [post.featuredImageUrl],
      }
    };
  } catch (e) {
    return { title: 'Telsys Inc. Blog' };
  }
}

export default async function SingleBlogPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || post.published === false) {
    notFound();
  }

  const jsonLd = {
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
    "dateModified": post.updatedAt ? new Date(post.updatedAt.seconds * 1000).toISOString() : new Date(post.createdAt.seconds * 1000).toISOString(),
    "description": post.metaDescription || post.content.replace(/<[^>]*>?/gm, '').substring(0, 160),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://telsysinc.com/blogs/${post.slug}`
    }
  };

  return (
    <div className="bg-[#FCFBF8]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ViewTracker postId={post.id} />
      <ClientOnly>
        <Header />
      </ClientOnly>
      <main>
        <Hero post={post} />
        <BlogContent post={post} />
      </main>
    </div>
  );
}
