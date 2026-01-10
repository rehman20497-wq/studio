'use client';

import { useParams } from 'next/navigation';
import Header from '@/components/layout/header';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import ClientOnly from '@/components/client-only';
import Hero from '@/components/single-blog/hero';
import { Skeleton } from '@/components/ui/skeleton';
import BlogContent from '@/components/single-blog/blog-content';

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
            {error ? 'Error loading post.' : 'This blog post could not be found.'}
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-[#FCFBF8]">
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
