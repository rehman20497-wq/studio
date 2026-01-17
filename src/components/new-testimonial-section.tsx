"use client";

import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { QuoteIcon } from './quote-icon';
import TestimonialProgressBar from './testimonial-progress-bar';

const testimonials = [
  {
    logo: <Image src="/meta.png" alt="Meta Logo" width={100} height={30} className="object-contain" />,
    text: "We're constantly trying to bring the best the market has to offer to support our global business operations by identifying suppliers with the exact solution we need to solve our problem. In this case, we found an incredible partner in TelSys.",
    author: 'Sarah L.',
    title: 'Director, Global Supplier Diversity',
    image: '/logos/Sarah.jpg',
    imageHint: 'woman smiling',
  },
  {
    logo: <Image src="/consensys.png" alt="Consensys Logo" width={100} height={30} className="object-contain" />,
    text: "TelSys's team is top-notch. Their proactive approach and deep understanding of our needs have been a game changer for our operations. We couldn't be happier with the results.",
    author: 'Chris B.',
    title: 'COO, Consensys',
    image: '/logos/chris.jpg',
    imageHint: 'man portrait',
  },
    {
    logo: <Image src="/sakara.png" alt="Sakara Logo" width={100} height={30} className="object-contain" />,
    text: "The level of detail and commitment from TelSys is outstanding. They feel like a true extension of our own team, and their impact on our customer satisfaction is undeniable.",
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
    <div ref={ref} className="bg-[#ffffff] pt-12 pb-20 px-[9%] overflow-hidden">
      <motion.div
className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16
"
variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Left Side: Image */}
        <div className="relative w-full md:w-1/3 flex items-center justify-center">
          <div className="relative w-[340px] h-[340px] flex items-center justify-center">

            <div className="absolute -inset-8">
                 <motion.svg 
                    viewBox="0 0 400 400" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={ isInView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                >
                    <circle cx="200" cy="200" r="110" fill="white" stroke="#F5D34A" strokeWidth="20"/>
                    <circle cx="335" cy="269" r="35" fill="none" stroke="#F5D34A" strokeWidth="17"/>
                </motion.svg>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={index + '-image'}
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                
                <div className="relative w-[180px] h-[180px] rounded-full overflow-hidden">
                  <Image
                      src={currentTestimonial.image}
                      alt={currentTestimonial.author}
                      fill
                      className="object-cover"
                      data-ai-hint={currentTestimonial.imageHint}
                      sizes="180px"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Testimonial Content */}
        <div className="w-full md:w-[60%] md:mr-[5%] h-64 flex flex-col justify-center text-center md:text-left">
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
                    <motion.div variants={itemVariants} className="flex justify-center md:justify-start">
                        {currentTestimonial.logo}
                    </motion.div>

                    <motion.div className="relative mt-8" variants={itemVariants}>
                        <div className="absolute -left-8 -top-4 hidden md:block">
                        <QuoteIcon />
                        </div>
                        <p className="text-base text-black leading-relaxed">
                          {currentTestimonial.text}
                        </p>
                        
                        <div className="absolute -right-8 -bottom-4 transform scale-y-[-1] scale-x-[-1] hidden md:block">
                        <QuoteIcon />
                        </div>
                    </motion.div>

                    <motion.div className="mt-8" variants={itemVariants}>
                        <p className="font-bold text-[13px] text-black">
                          {currentTestimonial.author}
                        </p>
                        <p className="text-[13px] text-zinc-600">{currentTestimonial.title}</p>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </div>
      </motion.div>
      <motion.div
className="max-w-2xl mx-auto mt-12 md:mt-4"
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
