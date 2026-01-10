
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqData } from '@/lib/faq-data';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};

export default function FaqAccordion() {
  const [activeTab, setActiveTab] = useState(faqData[0].category);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = faqData.find(section => section.category === activeTab)?.items || [];

  return (
    <section className="py-24 px-[6%] bg-[#FCFBF8]">
      <div className="max-w-5xl mx-auto">
        <motion.div 
            className="flex justify-center gap-4 mb-12 border-b-2 border-yellow-200 pb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
          {faqData.map(section => (
            <button
              key={section.category}
              onClick={() => {
                setActiveTab(section.category);
                setOpenIndex(0); // Reset to first item when tab changes
              }}
              className={cn(
                "px-6 py-2 rounded-full text-lg font-medium transition-all duration-300",
                activeTab === section.category
                  ? "bg-zinc-900 text-white shadow-lg"
                  : "bg-transparent text-zinc-600 hover:bg-yellow-100/50"
              )}
            >
              {section.category}
            </button>
          ))}
        </motion.div>

        <motion.div
          key={activeTab}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div key={index} variants={itemVariants}>
                <div
                  className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden cursor-pointer"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <div className="p-6 flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-zinc-800">{faq.question}</h3>
                    <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-black flex-shrink-0">
                      {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </div>
                  </div>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1, transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } }}
                        exit={{ height: 0, opacity: 0, transition: { duration: 0.3, ease: 'easeOut' } }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-zinc-600 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
