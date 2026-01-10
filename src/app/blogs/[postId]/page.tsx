'use client';

import { useParams } from 'next/navigation';
import Header from '@/components/layout/header';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import ClientOnly from '@/components/client-only';
import Hero from '@/components/single-blog/hero';
import { Skeleton } from '@/components/ui/skeleton';

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
      </main>
    </div>
  );
}
