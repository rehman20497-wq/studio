
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { Skeleton } from '../ui/skeleton';
import BlogCard from '../blog-card';
import { format } from 'date-fns';

type BlogPost = {
  id: string;
  title: string;
  category: string;
  createdAt: { seconds: number; nanoseconds: number; };
  featuredImageUrl: string;
  published?: boolean;
};

const ITEMS_PER_PAGE = 11; // 2 (first row) + 3*3 (next three rows)

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 80,
    },
  },
};

const filterVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const BlogCardSkeleton = () => (
  <motion.div variants={cardVariants}>
    <div className="relative bg-white rounded-2xl p-4 h-96 shadow-md border border-zinc-100">
      <Skeleton className="w-full h-full" />
    </div>
  </motion.div>
);

export default function BlogsGrid({ searchTerm, categoryFilter }: { searchTerm: string; categoryFilter: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm, categoryFilter]);

  const firestore = useFirestore();

  const blogQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'blog_posts'),
      where('published', '==', true)
    );
  }, [firestore]);

  const { data: posts, isLoading } = useCollection<BlogPost>(blogQuery);

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    
    let filtered = posts;

    if (categoryFilter !== 'all') {
      const solutionKey = categoryFilter.replace(/-/g, ' ');
      filtered = filtered.filter(post => post.category.toLowerCase().replace(/ /g, '-') === solutionKey);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    
    return filtered.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);

  }, [posts, searchTerm, categoryFilter]);

  const pageCount = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const firstRowPosts = paginatedPosts.slice(0, 2);
  const remainingPosts = paginatedPosts.slice(2);

  return (
    <motion.section
      ref={ref}
      className="bg-[#FCFBF8] pt-12 pb-24 px-[3%]"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {Array.from({ length: 9 }).map((_, i) => <BlogCardSkeleton key={i} />)}
          </div>
      ) : paginatedPosts.length > 0 ? (
        <>
            {/* First row with 2 items */}
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8" variants={containerVariants}>
                {firstRowPosts.map(post => (
                    <motion.div key={post.id} variants={cardVariants} className="w-full">
                        <BlogCard 
                            type="article"
                            date={format(new Date(post.createdAt.seconds * 1000), 'MMMM d, yyyy').toUpperCase()}
                            categories={[post.category]}
                            title={post.title}
                            backgroundImage={{ src: post.featuredImageUrl, hint: 'blog post image' }}
                        />
                    </motion.div>
                ))}
            </motion.div>

            {/* Remaining rows with 3 items */}
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center" variants={containerVariants}>
                {remainingPosts.map(post => (
                    <motion.div key={post.id} variants={cardVariants} className="w-full max-w-[480px]">
                        <BlogCard 
                            type="article"
                            date={format(new Date(post.createdAt.seconds * 1000), 'MMMM d, yyyy').toUpperCase()}
                            categories={[post.category]}
                            title={post.title}
                            backgroundImage={{ src: post.featuredImageUrl, hint: 'blog post image' }}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </>
      ) : (
        <motion.div className="text-center py-20 col-span-full" variants={filterVariants}>
            <h3 className="text-xl font-semibold">No Posts Found</h3>
            <p className="text-zinc-500 mt-2">Try adjusting your search or filter criteria.</p>
        </motion.div>
      )}
      
      {pageCount > 1 && (
        <motion.div 
            className="flex justify-center items-center gap-4 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.5 } }}
        >
            <Button
                onClick={() => setCurrentPage(p => Math.max(p - 1, 0))}
                disabled={currentPage === 0}
            >
                Previous
            </Button>
            <span className="text-zinc-600">
                Page {currentPage + 1} of {pageCount}
            </span>
            <Button
                onClick={() => setCurrentPage(p => Math.min(p + 1, pageCount - 1))}
                disabled={currentPage === pageCount - 1}
            >
                Next
            </Button>
        </motion.div>
      )}
    </motion.section>
  );
}
