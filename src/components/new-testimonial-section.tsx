
"use client";

import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { MetaLogo } from './logos/meta-logo';
import { QuoteIcon } from './quote-icon';
import TestimonialProgressBar from './testimonial-progress-bar';

const testimonials = [
  {
    logo: <Image src="/meta.png" alt="Meta Logo" width={100} height={30} className="object-contain" />,
    text: "We're constantly trying to bring the best the market has to offer to support our global business operations by identifying suppliers with the exact solution we need to solve our problem. In this case, we found an incredible partner in Hugo.",
    author: 'Sarah L.',
    title: 'Director, Global Supplier Diversity',
    image: '/logos/Sarah.jpg',
    imageHint: 'woman smiling',
  },
  {
    logo: <Image src="/consensys.png" alt="Consensys Logo" width={100} height={30} className="object-contain" />,
    text: "Hugo's team is top-notch. Their proactive approach and deep understanding of our needs have been a game changer for our operations. We couldn't be happier with the results.",
    author: 'Chris B.',
    title: 'COO, Consensys',
    image: '/logos/chris.jpg',
    imageHint: 'man portrait',
  },
    {
    logo: <Image src="/sakara.png" alt="Sakara Logo" width={100} height={30} className="object-contain" />,
    text: "The level of detail and commitment from Hugo is outstanding. They feel like a true extension of our own team, and their impact on our customer satisfaction is undeniable.",
    author: 'Quo T.',
    title: 'Head of Support, Sakara',
    image: '/logos/quo.jpg',
    imageHint: 'woman portrait',
  },
];

const DURATION = 8000;

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
  exit: {
    opacity: 0,
    y: -30,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15,
    },
  }
};

const imageVariants = {
  hidden: { scale: 0.8, opacity: 0 },
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
  exit: {
    scale: 0.8,
    opacity: 0,
    transition: {
      duration: 0.4,
    }
  }
};

export default function NewTestimonialSection() {
  const [index, setIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % testimonials.length);
      }, DURATION);
      return () => clearInterval(interval);
    }
  }, [isInView]);

  const currentTestimonial = testimonials[index];

  return (
    <div ref={ref} className="bg-[#FEF9F2] py-24 px-[9%] overflow-hidden">
      <motion.div
        className="max-w-6xl mx-auto flex items-center gap-16"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Left Side: Image */}
        <div className="relative w-1/3">
          <div className="absolute -inset-4">
            <svg
              width="280"
              height="280"
              viewBox="0 0 280 280"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <motion.path
                d="M130.5 229C185.399 229 229.5 184.912 229.5 130C229.5 75.0883 185.399 31 130.5 31C75.6015 31 31.5 75.0883 31.5 130C31.5 184.912 75.6015 229 130.5 229Z"
                stroke="#F5D34A"
                strokeWidth="20"
                 initial={{ pathLength: 0, opacity: 0 }}
                 animate={ isInView ? { pathLength: 1, opacity: 1 } : {}}
                 transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              />
              <motion.path
                d="M232.998 130C232.998 185.228 188.226 230 132.998 230C77.7701 230 32.998 185.228 32.998 130C32.998 74.7715 77.7701 30 132.998 30C188.226 30 232.998 74.7715 232.998 130Z"
                stroke="#F5D34A"
                strokeWidth="20"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={ isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
              />
              <motion.circle cx="260" cy="205" r="34" stroke="#F5D34A" strokeWidth="20"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={ isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1.5, delay: 1.1, ease: "easeInOut" }}
              />
            </svg>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={index + '-image'}
              className="relative w-[210px] h-[210px] mx-auto rounded-full overflow-hidden"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Image
                  src={currentTestimonial.image}
                  alt={currentTestimonial.author}
                  fill
                  className="object-cover"
                  data-ai-hint={currentTestimonial.imageHint}
                  sizes="210px"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Testimonial Content */}
        <div className="w-[60%] mr-[5%] h-64 flex flex-col justify-center">
            <AnimatePresence mode="wait">
                 <motion.div
                    key={index}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={{
                        visible: { transition: { staggerChildren: 0.2 } }
                    }}
                 >
                    <motion.div variants={itemVariants}>
                        {currentTestimonial.logo}
                    </motion.div>

                    <motion.div className="relative mt-8" variants={itemVariants}>
                        <div className="absolute -left-8 -top-4">
                        <QuoteIcon />
                        </div>
                        <p className="text-xl text-zinc-800 leading-relaxed h-24">
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
                </motion.div>
            </AnimatePresence>
        </div>
      </motion.div>
      <motion.div
        className="max-w-2xl mx-auto mt-12"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <TestimonialProgressBar 
            key={index} 
            duration={DURATION} 
            totalItems={testimonials.length} 
            currentIndex={index}
            setIndex={setIndex}
        />
      </motion.div>
    </div>
  );
}

    

    