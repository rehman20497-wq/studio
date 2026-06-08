'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import 'react-quill/dist/quill.snow.css';
import QuoteSection from './quote-section';
import BuildTeamCta from './build-team-cta';
import Sidebar from './sidebar';
import MobileSidebar from './mobile-sidebar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FAQItem = {
  question: string;
  answer: string;
};

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  category: string;
  content: string;
  quote?: string;
  faqs?: FAQItem[];
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
  className="prose text-bodyySm
  sm:text-bodyyMd
  lg:text-bodyylg max-w-full text-zinc-700 ql-editor break-words"
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
                <Sidebar currentPostId={post.id} slug={post.slug} category={post.category} />
            </div>
            <div className="w-full md:col-span-8 space-y-8">
                <ContentBlock htmlContent={contentPart1} />

                {hasQuote && <QuoteSection quote={post.quote!} />}

                {hasQuote && (
                    <ContentBlock htmlContent={contentPart2} />
                )}

                {post.faqs && post.faqs.length > 0 && (
                    <motion.div 
                        className="mt-16 pt-12 border-t border-zinc-200"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold font-headline text-zinc-900 mb-8">Frequently Asked Questions</h2>
                        <Accordion type="single" collapsible className="w-full">
                            {post.faqs.map((faq, index) => (
                                <AccordionItem key={index} value={`faq-${index}`} className="border-b border-zinc-200 py-2">
                                    <AccordionTrigger className="text-xl font-bold text-left hover:no-underline hover:text-yellow-600 transition-colors">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-lg text-zinc-600 leading-relaxed pt-2">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </motion.div>
                )}

                <BuildTeamCta />
            </div>
        </div>

        {/* Mobile Sidebar Trigger */}
        <div className="md:hidden">
            <MobileSidebar currentPostId={post.id} slug={post.slug} category={post.category} />
        </div>
    </motion.div>
  );
}
