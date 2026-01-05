'use client';

import { motion, useInView, useAnimation } from 'framer-motion';
import { useRef, useEffect } from 'react';
import BlogCard, { type BlogCardProps } from './blog-card';
import { blogImages } from '@/lib/blog-images';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const blogPosts: BlogCardProps[] = [
  {
    type: 'interview',
    date: 'NOVEMBER 15, 2024',
    categories: ['Interview', 'Data & AI'],
    title: 'Michael Connor on the Impact of Generative AI in Consumer Goods',
    backgroundImage: blogImages.interview,
    companyLogo: blogImages.amazon,
  },
  {
    type: 'case-study',
    date: 'DECEMBER 9, 2024',
    categories: ['Industry Case Study', 'Customer Support'],
    title: 'Transforming Customer Service in the Home Furnishings Industry',
    backgroundImage: blogImages.caseStudy,
  },
  {
    type: 'article',
    date: 'JANUARY 2, 2025',
    categories: ['Future of Work', 'Automation'],
    title: 'The Rise of AI Agents in Modern Call Centers',
    backgroundImage: blogImages.article1,
  },
  {
    type: 'guide',
    date: 'JANUARY 18, 2025',
    categories: ['CX Strategy', 'eCommerce'],
    title: 'A Step-by-Step Guide to Reducing Customer Churn',
    backgroundImage: blogImages.article2,
  },
];

const duplicatedPosts = [...blogPosts, ...blogPosts];

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
        duration: 30,
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
      marqueeRef.current.scrollLeft += scrollOffset;
    }
  };

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
            onClick={() => scroll(-300)}
            className="group/arrow w-10 h-10 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-md transition-all duration-300 hover:shadow-lg bg-[length:200%_auto] animate-gradient-flow"
          >
            <motion.div variants={arrowVariants} custom="left" animate="animate">
              <ChevronLeft className="w-6 h-6 text-white transition-colors" />
            </motion.div>
          </button>
          <button
            onClick={() => scroll(300)}
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
        <div ref={marqueeRef} className="max-w-[100vw] overflow-x-auto no-scrollbar">
          <motion.div
            className="flex"
            variants={marqueeVariants}
            animate={controls}
          >
            <div className="flex gap-8 pb-8 flex-shrink-0">
              {duplicatedPosts.map((post, index) => (
                <BlogCard key={`first-${index}`} {...post} />
              ))}
            </div>
            <div className="flex gap-8 pb-8 flex-shrink-0">
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
