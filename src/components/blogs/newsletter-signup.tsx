
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

export default function NewsletterSignup() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.section
      ref={ref}
      className="py-12 px-[3%]"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="max-w-3xl mx-auto bg-yellow-100/50 rounded-2xl p-6 border border-yellow-200 flex items-center justify-between">
        <p className="text-lg text-zinc-800 font-medium">
          Sign up to our newsletter and stay hip.
        </p>
        <div className="flex items-center gap-2 bg-white rounded-full p-1 border border-zinc-200 w-64">
          <Input
            type="email"
            placeholder="Enter Email"
            className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-sm flex-grow"
          />
          <Button
            type="submit"
            size="icon"
            className="rounded-full bg-cyan-200 hover:bg-cyan-300 text-black flex-shrink-0"
          >
            <Send className="w-4 h-4 -rotate-45 -translate-x-px" />
          </Button>
        </div>
      </div>
    </motion.section>
  );
}
