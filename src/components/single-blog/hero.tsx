'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

type BlogPost = {
  id: string;
  title: string;
  category: string;
  featuredImageUrl: string;
  authorName: string;
  createdAt: { seconds: number };
};

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

const contentContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.4,
    },
  },
};

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

export default function Hero({ post }: { post: BlogPost }) {
  return (
    <motion.section
      className="bg-[#FCFBF8] px-[3%] py-8"
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <Link href={`/blogs/${post.id}`} className="block group">
        <motion.div
          className="relative p-6 border-2 border-yellow-300/50 bg-white/50 rounded-2xl flex flex-col md:flex-row gap-8 items-start transition-shadow duration-300 group-hover:shadow-xl"
          variants={contentContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="w-full md:w-1/2 h-[450px] relative rounded-lg overflow-hidden"
            variants={imageReveal}
          >
            <Image
              src={post.featuredImageUrl}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          <div className="w-full md:w-1/2">
            <motion.p
              className="text-sm text-zinc-500 font-medium mb-2"
              variants={contentItem}
            >
              {format(
                new Date(post.createdAt.seconds * 1000),
                'MMMM d, yyyy'
              ).toUpperCase()}
            </motion.p>

            <motion.div
              className="flex gap-4 mb-4"
              variants={contentItem}
            >
              <span className="text-sm text-zinc-700 underline underline-offset-2">
                {post.category}
              </span>
            </motion.div>

            <motion.h2
              className="text-3xl lg:text-4xl font-headline font-medium text-zinc-900"
              variants={contentItem}
            >
              <span className="underline-draw">
                {post.title}
              </span>
            </motion.h2>

            <motion.p 
              className="text-md text-zinc-800 font-semibold mt-4"
              variants={contentItem}
            >
              By {post.authorName}
            </motion.p>
          </div>
        </motion.div>
      </Link>
    </motion.section>
  );
}
