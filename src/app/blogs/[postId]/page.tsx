'use client';

import { useParams } from 'next/navigation';
import Header from '@/components/layout/header';
import { useDoc, useFirestore, useMemoFirebase, updateDocumentNonBlocking } from '@/firebase';
import { doc, increment } from 'firebase/firestore';
import ClientOnly from '@/components/client-only';
import Hero from '@/components/single-blog/hero';
import { Skeleton } from '@/components/ui/skeleton';
import BlogContent from '@/components/single-blog/blog-content';
import { useEffect } from 'react';

type BlogPost = {
  id: string;
  title: string;
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

export default function SingleBlogPage() {
  const params = useParams();
  const postId = params.postId as string;
  const firestore = useFirestore();

  const postRef = useMemoFirebase(
    () => (firestore && postId ? doc(firestore, 'blog_posts', postId) : null),
    [firestore, postId]
  );

  const { data: post, isLoading, error } = useDoc<BlogPost>(postRef);
  
  // Track view
  useEffect(() => {
    if (firestore && postId) {
      const docRef = doc(firestore, 'blog_posts', postId);
      updateDocumentNonBlocking(docRef, {
        views: increment(1)
      });
    }
  }, [firestore, postId]);


  if (isLoading) {
    return (
      <div className="bg-[#FCFBF8] min-h-screen">
        <ClientOnly>
          <Header />
        </ClientOnly>
        <main className="py-8 px-[3%]">
          <Skeleton className="w-full h-[480px] rounded-2xl" />
          <div className="mt-12 grid grid-cols-12 gap-8">
            <div className="col-span-4">
              <Skeleton className="w-full h-96 rounded-xl" />
            </div>
            <div className="col-span-8">
              <Skeleton className="w-full h-16 mb-4" />
              <Skeleton className="w-full h-96" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="bg-[#FCFBF8] min-h-screen">
        <ClientOnly>
          <Header />
        </ClientOnly>
        <main className="flex items-center justify-center h-[50vh]">
          <p className="text-red-500 text-lg">
            {error ? 'Error loading post.' : 'Loading Blog Post.'}
          </p>
        </main>
      </div>
    );
  }

  // Article Schema
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
    "description": post.content.replace(/<[^>]*>?/gm, '').substring(0, 160)
  };

  return (
    <div className="bg-[#FCFBF8]">
      <ClientOnly>
        <Header />
      </ClientOnly>
      <head>
        <title>{`${post.title} | Telsys Inc. Blog`}</title>
        <meta name="description" content={post.content.replace(/<[^>]*>?/gm, '').substring(0, 160)} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      </head>
      <main className="relative overflow-visible">
        <Hero post={post} />
        <div className="relative overflow-visible">
            <BlogContent post={post} />
        </div>
      </main>
    </div>
  );
}
