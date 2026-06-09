
'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
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
import { Plus, Minus } from 'lucide-react';

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
      staggerChildren: 0.2,
    },
  },
};

const ContentBlock = ({ htmlContent }: { htmlContent: string }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full"
      >
        <div
          className="prose text-bodyySm sm:text-bodyyMd lg:text-bodyylg max-w-full text-zinc-700 ql-editor break-words"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </motion.div>
    );
};
  

export default function BlogContent({ post }: { post: BlogPost }) {
  const [openItem, setOpenIndex] = useState<string | undefined>("faq-0");
  const hasQuote = post.quote && post.quote.trim() !== '';

  return (
    <motion.div 
      className="px-4 sm:px-6 md:px-[6%] py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 items-start">
            <div className="hidden md:block md:col-span-4">
                <Sidebar currentPostId={post.id} slug={post.slug} category={post.category} />
            </div>
            <div className="w-full md:col-span-8 space-y-12">
                <ContentBlock htmlContent={post.content} />

                {hasQuote && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <QuoteSection quote={post.quote!} />
                  </motion.div>
                )}

                {post.faqs && post.faqs.length > 0 && (
                    <motion.div 
                        className="mt-16 pt-12 border-t border-zinc-200"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold font-headline text-zinc-900 mb-8">Frequently Asked Questions</h2>
                        <Accordion 
                            type="single" 
                            collapsible 
                            className="w-full"
                            value={openItem}
                            onValueChange={setOpenIndex}
                        >
                            {post.faqs.map((faq, index) => {
                                const value = `faq-${index}`;
                                const isOpen = openItem === value;
                                return (
                                    <AccordionItem key={index} value={value} className="border-b border-zinc-200 py-2">
                                        <AccordionTrigger className="text-xl font-bold text-left hover:no-underline hover:text-yellow-600 transition-colors [&>svg]:hidden">
                                            <div className="flex items-center justify-between w-full">
                                                <span>{faq.question}</span>
                                                <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-black flex-shrink-0 ml-4">
                                                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                                </div>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="text-lg text-zinc-600 leading-relaxed pt-2">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                );
                            })}
                        </Accordion>
                    </motion.div>
                )}

                <BuildTeamCta />
            </div>
        </div>

        <div className="md:hidden">
            <MobileSidebar currentPostId={post.id} slug={post.slug} category={post.category} />
        </div>
    </motion.div>
  );
}
