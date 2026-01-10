
'use client';

import { motion, useInView, useAnimation } from 'framer-motion';
import { useRef, useEffect, useMemo } from 'react';
import BlogCard, { type BlogCardProps } from './blog-card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where, limit } from 'firebase/firestore';
import { format } from 'date-fns';

type BlogPost = {
  id: string;
  title: string;
  category: string;
  createdAt: { seconds: number; nanoseconds: number };
  featuredImageUrl: string;
  published?: boolean;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const marqueeVariants = {
  animate: {
    x: ['0%', '-100%'],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 40, 
        ease: 'linear',
      },
    },
  },
};

const arrowContainerVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.8,
      duration: 0.5,
    },
  },
};

const arrowVariants = {
  animate: (direction: 'left' | 'right') => ({
    x: direction === 'left' ? [0, -5, 0] : [0, 5, 0],
    transition: {
      duration: 1.5,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  }),
};

export default function BlogSection() {
  const sectionRef = useRef(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

  const firestore = useFirestore();
  const blogQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'blog_posts'),
      where('published', '==', true),
      limit(4)
    );
  }, [firestore]);

  const { data: posts, isLoading, error } = useCollection<BlogPost>(blogQuery);

  const blogPosts: BlogCardProps[] = useMemo(() => {
    if (!posts) return [];
    
    // Client-side sort as a fallback since we removed orderBy from the query
    const sortedPosts = [...posts].sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);

    return sortedPosts.map(post => ({
        type: 'article', // You might want to make this dynamic if your data supports it
        date: format(new Date(post.createdAt.seconds * 1000), 'MMMM d, yyyy').toUpperCase(),
        categories: [post.category],
        title: post.title,
        backgroundImage: { src: post.featuredImageUrl, hint: 'blog post image' },
    }));
  }, [posts]);

  useEffect(() => {
    if (isInView) {
      controls.start('animate');
    }
  }, [isInView, controls]);

  const handleMouseEnter = () => {
    controls.stop();
  };

  const handleMouseLeave = () => {
    controls.start('animate');
  };

  const scroll = (scrollOffset: number) => {
    if (marqueeRef.current) {
      marqueeRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };
  
  if (isLoading) return null;
  if (error) {
    // We'll just hide the section on error to avoid crashing the page.
    console.error("Error loading blog posts:", error);
    return null;
  }
  if (!posts || posts.length === 0) return null;

  const duplicatedPosts = [...blogPosts, ...blogPosts];

  return (
    <motion.section
      ref={sectionRef}
      className="bg-[#FEF9F2] py-24 overflow-hidden"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 relative">
        <div className="text-center">
          <motion.h2
            className="text-5xl font-bold font-headline text-zinc-900"
            variants={slideInRight}
          >
            See what's new and what's next.
          </motion.h2>
          <motion.p
            className="mt-4 text-lg text-zinc-600"
            variants={slideInLeft}
          >
            Thought leadership and actionable insights to help you grow faster.
          </motion.p>
        </div>

        <motion.div
          className="absolute top-0 right-4 flex gap-2 mt-20"
          variants={arrowContainerVariants}
        >
          <button
            onClick={() => scroll(-480)}
            className="group/arrow w-10 h-10 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-md transition-all duration-300 hover:shadow-lg bg-[length:200%_auto] animate-gradient-flow"
          >
            <motion.div variants={arrowVariants} custom="left" animate="animate">
              <ChevronLeft className="w-6 h-6 text-white transition-colors" />
            </motion.div>
          </button>
          <button
            onClick={() => scroll(480)}
            className="group/arrow w-10 h-10 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-md transition-all duration-300 hover:shadow-lg bg-[length:200%_auto] animate-gradient-flow"
          >
            <motion.div variants={arrowVariants} custom="right" animate="animate">
              <ChevronRight className="w-6 h-6 text-white transition-colors" />
            </motion.div>
          </button>
        </motion.div>
      </div>

      <div
        className="mt-16 relative w-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={marqueeRef} className="max-w-full overflow-x-auto no-scrollbar" style={{ scrollBehavior: 'smooth' }}>
          <motion.div
            className="flex"
            variants={marqueeVariants}
            animate={controls}
          >
            <div className="flex gap-8 pb-8 flex-shrink-0 pl-8">
              {duplicatedPosts.map((post, index) => (
                <BlogCard key={`first-${index}`} {...post} />
              ))}
            </div>
             <div className="flex gap-8 pb-8 flex-shrink-0 pr-8">
              {duplicatedPosts.map((post, index) => (
                <BlogCard key={`second-${index}`} {...post} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
