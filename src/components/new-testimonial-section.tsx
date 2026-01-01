"use client";

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MetaLogo } from './logos/meta-logo';
import { QuoteIcon } from './quote-icon';
import TestimonialProgressBar from './testimonial-progress-bar';

const testimonials = [
  {
    logo: <MetaLogo />,
    text: "We're constantly trying to bring the best the market has to offer to support our global business operations by identifying suppliers with the exact solution we need to solve our problem. In this case, we found an incredible partner in Hugo.",
    author: 'Jason T.',
    title: 'Director, Global Supplier Diversity',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxtYW4lMjBzbWlsaW5nfGVufDB8fHx8MTc2NzA0OTYyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'man smiling',
  },
  // Add other testimonials here
];

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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15,
    },
  },
};

const imageVariants = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      delay: 0.4,
    },
  },
};

export default function NewTestimonialSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const currentTestimonial = testimonials[0];

  return (
    <div ref={ref} className="bg-[#FEF9F2] py-24 px-8 overflow-hidden">
      <motion.div
        className="max-w-6xl mx-auto flex items-center gap-16"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Left Side: Image */}
        <motion.div className="relative w-1/3" variants={imageVariants}>
          <div className="absolute -inset-4">
            <svg
              width="280"
              height="240"
              viewBox="0 0 280 240"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <path
                d="M130.5 229C185.399 229 229.5 184.912 229.5 130C229.5 75.0883 185.399 31 130.5 31C75.6015 31 31.5 75.0883 31.5 130C31.5 184.912 75.6015 229 130.5 229Z"
                stroke="#F5D34A"
                strokeWidth="20"
              />
              <path
                d="M232.998 130C232.998 185.228 188.226 230 132.998 230C77.7701 230 32.998 185.228 32.998 130C32.998 74.7715 77.7701 30 132.998 30C188.226 30 232.998 74.7715 232.998 130Z"
                stroke="#F5D34A"
                strokeWidth="20"
              />
              <circle cx="216" cy="130" r="34" stroke="#F5D34A" strokeWidth="20" />
            </svg>
          </div>
          <div className="relative w-[210px] h-[210px] mx-auto rounded-full bg-[#9AFEFF] overflow-hidden flex items-center justify-center">
            <Image
              src={currentTestimonial.image}
              alt={currentTestimonial.author}
              width={180}
              height={180}
              className="rounded-full object-cover"
              data-ai-hint={currentTestimonial.imageHint}
            />
          </div>
        </motion.div>

        {/* Right Side: Testimonial Content */}
        <div className="w-2/3">
          <motion.div variants={itemVariants}>
            {currentTestimonial.logo}
          </motion.div>

          <motion.div className="relative mt-8" variants={itemVariants}>
            <div className="absolute -left-8 -top-4">
              <QuoteIcon />
            </div>
            <p className="text-xl text-zinc-800 leading-relaxed">
              {currentTestimonial.text}
            </p>
            <div className="absolute -right-8 -bottom-4 transform scale-y-[-1] scale-x-[-1]">
              <QuoteIcon />
            </div>
          </motion.div>

          <motion.div className="mt-8" variants={itemVariants}>
            <p className="font-bold text-lg text-zinc-900">
              {currentTestimonial.author}
            </p>
            <p className="text-zinc-600">{currentTestimonial.title}</p>
          </motion.div>
        </div>
      </motion.div>
      <motion.div
        className="max-w-2xl mx-auto mt-12"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <TestimonialProgressBar progress={33} />
      </motion.div>
    </div>
  );
}
