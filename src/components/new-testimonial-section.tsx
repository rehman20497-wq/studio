
"use client";

import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
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
        <div className="relative w-1/3 flex items-center justify-center">
          <div className="relative w-[340px] h-[340px]">
            <motion.svg
              viewBox="0 0 340 340"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 w-full h-full"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={ isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
            >
              <path
                d="M280.5 170.5C280.5 109.914 231.086 60.5 170.5 60.5C109.914 60.5 60.5 109.914 60.5 170.5C60.5 231.086 109.914 280.5 170.5 280.5C203.499 280.5 233.153 267.433 253.281 246.335C259.083 240.232 265.418 234.341 272.5 229.5C272.5 240.851 263.351 250 252 250C240.649 250 231.5 240.851 231.5 229.5C231.5 218.149 240.649 209 252 209C259.489 209 266.015 213.729 269.458 219.789"
                stroke="#F5D34A"
                strokeWidth="20"
              />
            </motion.svg>

            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[240px] h-[240px] rounded-full bg-[#c0f5fa] p-4">
                     <AnimatePresence mode="wait">
                        <motion.div
                            key={index + '-image'}
                            className="w-full h-full"
                            variants={imageVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <div className="relative w-full h-full rounded-full overflow-hidden">
                                <Image
                                    src={currentTestimonial.image}
                                    alt={currentTestimonial.author}
                                    fill
                                    className="object-cover"
                                    data-ai-hint={currentTestimonial.imageHint}
                                    sizes="210px"
                                />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
          </div>
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
