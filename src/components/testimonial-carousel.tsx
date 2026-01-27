"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    name: "Paula Weeks, FIFA '26 Hospitality Director",
    title: 'on Customer Success',
    review:
      "Paula's collaborative approach has been instrumental in the success of one of soccer's largest global events.",
    image: 'https://picsum.photos/seed/paula/86/86',
  },
  {
    name: 'John Doe, Acme Corp',
    title: 'on Product Innovation',
    review:
      'John consistently delivers products that redefine the market, exceeding all customer expectations every time.',
    image: 'https://picsum.photos/seed/john/86/86',
  },
  {
    name: 'Jane Smith, Tech Solutions',
    title: 'on Engineering Excellence',
    review:
      'Jane’s leadership in engineering has led to stability and high performance in our entire infrastructure.',
    image: 'https://picsum.photos/seed/jane/86/86',
  },
];

const DURATION = 8000;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  image: {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 0.8, 
        ease: [0.34, 1.56, 0.64, 1]
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.5, 
      transition: { 
        duration: 0.4, 
        ease: 'easeIn' 
      } 
    },
  },
  details: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: 'easeIn' } },
  },
  review: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.4, ease: 'easeIn' } },
  },
  progress: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  }
};

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, DURATION);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setProgress(0);
    let startTime = performance.now();
    let frameId: number;
    
    function animateProgress(currentTime: number) {
      const elapsedTime = currentTime - startTime;
      const newProgress = Math.min((elapsedTime / DURATION) * 100, 100);
      setProgress(newProgress);
      if (elapsedTime < DURATION) {
        frameId = requestAnimationFrame(animateProgress);
      }
    }

    frameId = requestAnimationFrame(animateProgress);

    return () => cancelAnimationFrame(frameId);
  }, [index]);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    const newIndex = Math.floor(percentage * testimonials.length);
    if (newIndex !== index) {
      setIndex(newIndex);
    }
  };
  
  const currentTestimonial = testimonials[index];
  const barWidth = ((index / testimonials.length) * 100) + (progress / testimonials.length);

  return (
    <motion.div 
      className="bg-[#E0F5F5] rounded-xl p-8 w-full max-w-lg"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex items-center gap-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={index + '-image'}
            variants={itemVariants.image}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-24 h-24 relative flex-shrink-0"
          >
            <Image
              src={currentTestimonial.image}
              alt={currentTestimonial.name}
              width={86}
              height={86}
              className="rounded-full object-cover"
              data-ai-hint="person portrait"
            />
          </motion.div>
        </AnimatePresence>
        <div className="flex-grow overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index + '-text'}
              className="relative"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
                exit: { transition: { staggerChildren: 0.1, staggerDirection: -1 } }
              }}
            >
              <motion.p 
                className="font-bold text-zinc-900 text-sm"
                variants={itemVariants.details}
              >
                {currentTestimonial.name}
              </motion.p>
              <motion.p 
                className="text-sm font-medium text-zinc-700"
                variants={itemVariants.details}
              >
                {currentTestimonial.title}
              </motion.p>
              <div className="h-[72px] mt-2">
                 <motion.p 
                  className="text-sm font-light text-zinc-600"
                  variants={itemVariants.review}
                >
                  {currentTestimonial.review}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <motion.div className="mt-6" variants={itemVariants.progress}>
        <div className="relative h-2 w-full bg-[#0badbf] rounded-full cursor-pointer" onClick={handleProgressClick}>
          <motion.div 
            className="absolute top-0 left-0 h-full bg-black rounded-full" 
            style={{ width: `${barWidth}%` }}
            transition={{ duration: DURATION / 1000, ease: 'linear' }}
          />
           {testimonials.map((_, i) => {
             if (i === 0) return null;
            const pos = (i / testimonials.length) * 100;
            return (
              <div
                key={i}
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border border-black/20"
                style={{ left: `${pos}%`, transform: 'translate(-50%, -50%)' }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (i !== index) {
                    setIndex(i);
                  }
                }}
              ></div>
            )
           })}
        </div>
      </motion.div>
    </motion.div>
  );
}
