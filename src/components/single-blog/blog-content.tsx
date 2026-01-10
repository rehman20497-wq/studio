'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where, limit } from 'firebase/firestore';
import Link from 'next/link';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Send, Facebook, Linkedin } from 'lucide-react';
import { XIcon } from 'lucide-react';
import MagneticButton from '../magnetic-button';
import 'react-quill/dist/quill.snow.css';


type BlogPost = {
  id: string;
  title: string;
  category: string;
  content: string;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        type: 'spring',
        stiffness: 80,
      },
    }),
  };

const SocialIcon = ({ href, icon: Icon }: { href: string; icon: React.ElementType }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-black hover:bg-yellow-500 transition-colors">
      <Icon className="w-5 h-5" />
    </a>
);

function Sidebar({ currentPostId, category }: { currentPostId: string; category: string; }) {
  const firestore = useFirestore();

  const relatedQuery = useMemoFirebase(
    () => {
      if (!firestore) return null;
      return query(
        collection(firestore, 'blog_posts'),
        where('published', '==', true),
        where('category', '==', category),
        limit(4) // Fetch a bit more to ensure we have 2 other posts
      );
    },
    [firestore, category]
  );
  
  const { data: relatedPosts, isLoading } = useCollection<BlogPost>(relatedQuery);

  const articles = relatedPosts?.filter(p => p.id !== currentPostId).slice(0, 2) || [];

  return (
    <div className="sticky top-28 space-y-8">
        <motion.div custom={0} variants={itemVariants} className="bg-yellow-100/50 rounded-2xl p-6 border border-yellow-200">
            <h3 className="font-bold text-zinc-800 mb-4">Related articles</h3>
            {isLoading ? (
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
            ) : articles.length > 0 ? (
                <ul className="space-y-4">
                {articles.map((post) => (
                    <li key={post.id} className="border-b border-yellow-300 pb-2 last:border-b-0">
                    <Link href={`/blogs/${post.id}`} className="text-zinc-700 hover:text-black hover:underline underline-offset-2 transition-colors">
                        {post.title}
                    </Link>
                    </li>
                ))}
                </ul>
            ) : <p className="text-sm text-zinc-500">No related articles found.</p>}
        </motion.div>

        <motion.div custom={1} variants={itemVariants} className="bg-yellow-100/50 rounded-2xl p-6 border border-yellow-200">
            <h3 className="text-xl text-zinc-800 font-medium">Sign up to our newsletter & stay hip</h3>
            <div className="flex items-center gap-2 bg-white rounded-full p-1 border border-zinc-200 mt-4">
                <Input
                    type="email"
                    placeholder="Enter Email"
                    className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-sm flex-grow"
                />
                <Button type="submit" size="icon" className="rounded-full bg-cyan-200 hover:bg-cyan-300 text-black flex-shrink-0">
                    <Send className="w-4 h-4 -rotate-45 -translate-x-px" />
                </Button>
            </div>
        </motion.div>
        
        <motion.div custom={2} variants={itemVariants} className="bg-white rounded-2xl p-8 border text-center moving-gradient-border">
            <h3 className="text-2xl font-semibold text-zinc-900">Start Hiring</h3>
            <div className="my-4">
                <MagneticButton>
                    <span className="text-[15px] font-medium px-4">Book a Meeting</span>
                </MagneticButton>
            </div>
            <div className="flex items-center justify-center gap-4">
                <span className="text-sm font-semibold">SHARE</span>
                <SocialIcon href="#" icon={XIcon} />
                <SocialIcon href="#" icon={Facebook} />
                <SocialIcon href="#" icon={Linkedin} />
            </div>
        </motion.div>
    </div>
  )
}

export default function BlogContent({ post }: { post: BlogPost }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div 
      ref={ref}
      className="px-[5%] py-12 grid grid-cols-12 gap-x-12 items-start"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="col-span-4">
        <Sidebar currentPostId={post.id} category={post.category} />
      </div>
      <motion.div custom={1} variants={itemVariants} className="col-span-8">
        <div
            className="prose prose-lg max-w-none text-zinc-700 ql-editor"
            dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </motion.div>
    </motion.div>
  );
}
