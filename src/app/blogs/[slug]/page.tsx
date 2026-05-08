
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
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { firestore } = initializeFirebase();
  if (!firestore) return null;

  try {
    const snapshot = await firestore.collection('blog_posts')
      .where('slug', '==', slug)
      .limit(1)
      .get();
    
    if (snapshot.empty) return null;
    
    const doc = snapshot.docs[0];
    const data = doc.data();
    
    return {
      ...data,
      id: doc.id,
      createdAt: { seconds: data?.createdAt?._seconds || data?.createdAt?.seconds || 0 }
    } as any;
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.title} | Telsys Inc. Blog`,
    description: post.content.replace(/<[^>]*>?/gm, '').substring(0, 160),
    alternates: {
      canonical: `https://telsysinc.com/blogs/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      url: `https://telsysinc.com/blogs/${post.slug}`,
      images: [{ url: post.featuredImageUrl }],
      type: 'article',
    },
  };
}

export default async function SingleBlogPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || post.published === false) {
    notFound();
  }

  return (
    <div className="bg-[#FCFBF8]">
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
