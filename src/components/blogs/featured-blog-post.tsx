'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { Skeleton } from '../ui/skeleton';

/* ---------------- Types ---------------- */

type BlogPost = {
  id: string;
  title: string;
  category: string;
  createdAt: { seconds: number; nanoseconds: number };
  featuredImageUrl: string;
  published?: boolean;
};

/* ---------------- Animations ---------------- */

/* Section + card reveal */
const sectionReveal = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: 60,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* Inner cascade container */
const contentContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.4,
    },
  },
};

/* Individual item */
const contentItem = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* Image reveal */
const imageReveal = {
  hidden: {
    opacity: 0,
    scale: 1.05,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* ---------------- Skeleton ---------------- */

const FeaturedPostSkeleton = () => (
  <section className="bg-[#FCFBF8] px-[3%] py-8">
    <div className="relative p-6 border-2 border-yellow-300/50 bg-white/50 rounded-2xl flex flex-col md:flex-row gap-8 items-start">
      <Skeleton className="w-full md:w-1/2 h-[450px] rounded-lg" />
      <div className="w-full md:w-1/2 space-y-4">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-3/4" />
      </div>
    </div>
  </section>
);

/* ---------------- Component ---------------- */

export default function FeaturedBlogPost() {
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
    return <FeaturedPostSkeleton />;
  }

  /* ---------------- JSX ---------------- */

  return (
    <motion.section
      className="bg-[#FCFBF8] px-[3%] py-8"
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <Link href={`/blogs/${randomPost.id}`} className="block group">
        <motion.div
          className="relative p-6 border-2 border-yellow-300/50 bg-white/50 rounded-2xl flex flex-col md:flex-row gap-8 items-start transition-shadow duration-300 group-hover:shadow-xl"
          variants={contentContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Image */}
          <motion.div
            className="w-full md:w-1/2 h-[400px] relative rounded-lg overflow-hidden"
            variants={imageReveal}
          >
            <Image
              src={randomPost.featuredImageUrl}
              alt={randomPost.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          {/* Content */}
          <div className="w-full md:w-1/2">
            <motion.p
              className="text-sm text-zinc-500 font-medium mb-2"
              variants={contentItem}
            >
              {format(
                new Date(randomPost.createdAt.seconds * 1000),
                'MMMM d, yyyy'
              ).toUpperCase()}
            </motion.p>

            <motion.div
              className="flex gap-4 mb-4"
              variants={contentItem}
            >
              <span className="text-sm text-zinc-700 underline underline-offset-2">
                {randomPost.category}
              </span>
            </motion.div>

            <motion.h2
              className="text-3xl lg:text-4xl font-headline font-medium text-zinc-900"
              variants={contentItem}
            >
              <span className="underline-draw">
                {randomPost.title}
              </span>
            </motion.h2>
          </div>
        </motion.div>
      </Link>
    </motion.section>
  );
}
