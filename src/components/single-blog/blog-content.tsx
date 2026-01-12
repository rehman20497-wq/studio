'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import 'react-quill/dist/quill.snow.css';
import QuoteSection from './quote-section';
import BuildTeamCta from './build-team-cta';
import Sidebar from './sidebar';
import MobileSidebar from './mobile-sidebar';

type BlogPost = {
  id: string;
  title: string;
  category: string;
  content: string;
  quote?: string;
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

const ContentBlock = ({ htmlContent }: { htmlContent: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
  
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div
          className="prose prose-lg max-w-none text-zinc-700 ql-editor break-words"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </motion.div>
    );
};
  

export default function BlogContent({ post }: { post: BlogPost }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const hasQuote = post.quote && post.quote.trim() !== '';
  let contentPart1 = post.content;
  let contentPart2 = '';

  if (hasQuote) {
    const paragraphs = post.content.split('</p>');
    const splitIndex = Math.floor(paragraphs.length / 2);
    if (paragraphs.length > 1) {
        contentPart1 = paragraphs.slice(0, splitIndex).join('</p>') + (paragraphs.length > 1 ? '</p>' : '');
        contentPart2 = paragraphs.slice(splitIndex).join('</p>');
    }
  }


  return (
    <motion.div 
      ref={ref}
      className="px-4 sm:px-6 md:px-[6%] py-12"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 items-start">
            <div className="hidden md:block md:col-span-4">
                <Sidebar currentPostId={post.id} category={post.category} />
            </div>
            <div className="col-span-12 md:col-span-8 space-y-8">
                <ContentBlock htmlContent={contentPart1} />

                {hasQuote && <QuoteSection quote={post.quote!} />}

                {hasQuote && (
                    <ContentBlock htmlContent={contentPart2} />
                )}
                 <BuildTeamCta />
            </div>
        </div>

        {/* Mobile Sidebar Trigger */}
        <div className="md:hidden">
            <MobileSidebar currentPostId={post.id} category={post.category} />
        </div>
    </motion.div>
  );
}
