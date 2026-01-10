
'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { Skeleton } from '../ui/skeleton';

type BlogPost = {
  id: string;
  title: string;
  category: string;
  createdAt: { seconds: number; nanoseconds: number; };
  featuredImageUrl: string;
  published?: boolean;
};

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const FeaturedPostSkeleton = () => (
    <div className="relative p-6 border-2 border-yellow-300/50 bg-white/50 rounded-2xl flex flex-col md:flex-row gap-8 items-start">
        <Skeleton className="w-full md:w-1/2 h-[450px] rounded-lg" />
        <div className="w-full md:w-1/2 space-y-4">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-3/4" />
        </div>
    </div>
);

export default function FeaturedBlogPost() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const firestore = useFirestore();
  const [randomPost, setRandomPost] = useState<BlogPost | null>(null);

  const blogQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'blog_posts'),
      where('published', '==', true)
    );
  }, [firestore]);

  const { data: posts, isLoading } = useCollection<BlogPost>(blogQuery);

  useEffect(() => {
    if (posts && posts.length > 0) {
      const randomIndex = Math.floor(Math.random() * posts.length);
      setRandomPost(posts[randomIndex]);
    }
  }, [posts]);

  if (isLoading || !randomPost) {
    return (
      <section className="bg-[#FCFBF8] px-[3%]">
        <FeaturedPostSkeleton />
      </section>
    );
  }

  return (
    <motion.section
      ref={ref}
      className="bg-[#FCFBF8] px-[3%]"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <Link href={`/blogs/${randomPost.id}`} className="block group">
        <div className="relative p-6 border-2 border-yellow-300/50 bg-white/50 rounded-2xl flex flex-col md:flex-row gap-8 items-start transition-shadow duration-300 group-hover:shadow-xl">
          {/* Image on the left */}
          <div className="w-full md:w-1/2 h-[450px] relative rounded-lg overflow-hidden">
            <Image
              src={randomPost.featuredImageUrl}
              alt={randomPost.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          
          {/* Content on the right */}
          <div className="w-full md:w-1/2">
            <p className="text-sm text-zinc-500 font-medium mb-2">
              {format(new Date(randomPost.createdAt.seconds * 1000), 'MMMM d, yyyy').toUpperCase()}
            </p>
            <div className="flex gap-4 mb-4">
                <span className="text-sm text-zinc-700 underline underline-offset-2">{randomPost.category}</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-headline font-medium text-zinc-900">
              <span className="underline-draw">
                {randomPost.title}
              </span>
            </h2>
          </div>
        </div>
      </Link>
    </motion.section>
  );
}
