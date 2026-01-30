'use client';

import { motion, useAnimation } from 'framer-motion';
import { useRef, useEffect, useMemo } from 'react';
import BlogCard, { type BlogCardProps } from './blog-card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where, limit } from 'firebase/firestore';
import { format } from 'date-fns';
import Link from 'next/link';

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
  },
};

const marqueeVariants = {
  animate: {
    x: ['0%', '-50%'],
    transition: {
      repeat: Infinity,
      repeatType: 'loop',
      duration: 40,
      ease: 'linear',
    },
  },
};

const arrowBounce = {
  animate: (dir: 'left' | 'right') => ({
    x: dir === 'left' ? [0, -5, 0] : [0, 5, 0],
    transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
  }),
};

/* ---------------- Component ---------------- */

export default function BlogSection() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  /* ---------------- Firestore ---------------- */

  const firestore = useFirestore();

  const blogQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'blog_posts'),
      where('published', '==', true),
      limit(10)
    );
  }, [firestore]);

  const { data: posts, isLoading, error } = useCollection<BlogPost>(blogQuery);

  const blogPosts: BlogCardProps[] = useMemo(() => {
    if (!posts) return [];

    return [...posts]
      .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
      .map(post => ({
        id: post.id,
        type: 'article',
        date: format(
          new Date(post.createdAt.seconds * 1000),
          'MMMM d, yyyy'
        ).toUpperCase(),
        categories: [post.category],
        title: post.title,
        backgroundImage: {
          src: post.featuredImageUrl,
          hint: 'blog image',
        },
      }));
  }, [posts]);

  /* ---------------- Infinite Loop ---------------- */

  const infinitePosts = useMemo(() => {
    if (blogPosts.length === 0) return [];

    const MIN_ITEMS = 12;
    const repeat = Math.ceil(MIN_ITEMS / blogPosts.length);

    return Array.from({ length: repeat * 2 }, (_, i) =>
      blogPosts[i % blogPosts.length]
    );
  }, [blogPosts]);

  /* ---------------- Controls ---------------- */

  useEffect(() => {
    controls.start('animate');
  }, [controls]);

  const scroll = (offset: number) => {
    marqueeRef.current?.scrollBy({ left: offset, behavior: 'smooth' });
  };

  if (isLoading || error || !posts?.length) return null;

  /* ---------------- JSX ---------------- */

  return (
    <motion.section
      className="bg-[#f7edcf] py-12 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <div className="container mx-auto px-4 relative">
        {/* Heading */}
        <div className="text-center">
          <motion.h2
            className="text-herooSm
  sm:text-herooMd
  lg:text-heroo font-normal font-headline text-black"
            variants={slideInRight}
          >
            See what's new and what's next.
          </motion.h2>

          <motion.p
            className="mt-3 text-bodySm
  sm:text-bodyMd
  lg:text-bodylg text-black"
            variants={slideInLeft}
          >
            Thought leadership and actionable insights to help you grow faster.
          </motion.p>
        </div>

        {/* Arrows */}
        <div className="
  absolute 
  top-40        /* mobile */
  sm:top-40     /* small tablets */
  md:top-40     /* tablets */
  lg:top-20     /* desktop (same as now) */
  right-4 
  flex gap-2 z-20
">
          <button
            onClick={() => scroll(-420)}
            className="w-10 h-10 rounded-full bg-[#fdd200] flex items-center justify-center shadow-lg"
          >
            <motion.div custom="left" variants={arrowBounce} animate="animate">
              <ChevronLeft className="w-6 h-6 text-white" />
            </motion.div>
          </button>

          <button
            onClick={() => scroll(420)}
            className="w-10 h-10 rounded-full bg-[#fdd200]  flex items-center justify-center shadow-lg"
          >
            <motion.div custom="right" variants={arrowBounce} animate="animate">
              <ChevronRight className="w-6 h-6 text-white" />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Marquee */}
      <div className="mt-10 w-full">
        <div
          ref={marqueeRef}
          className="overflow-x-hidden"
          onMouseEnter={() => controls.stop()}
          onMouseLeave={() => controls.start('animate')}
        >
          <motion.div
            className="flex gap-8 px-8 py-8"
            variants={marqueeVariants}
            animate={controls}
          >
            {infinitePosts.map((post, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[80vw] sm:w-[45vw] lg:w-[30vw]"
              >
                <Link href={`/blogs/${post.id}`}>
                  <BlogCard {...post} />
                </Link>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
