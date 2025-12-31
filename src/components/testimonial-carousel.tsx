"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    name: "Paula Weeks, FIFA '26 Hospitality Director",
    title: 'on Customer Success',
    review:
      "With over 20 years of building innovative customer programs, Paula Weeks, Senior Director of FIFA World Cup 2026 Hospitality, brings this collaborative approach to one of soccer's largest events.",
    image: 'https://picsum.photos/seed/paula/86/86',
  },
  {
    name: 'John Doe, Acme Corp',
    title: 'on Product Innovation',
    review:
      'Leveraging cutting-edge technology, John has consistently delivered products that redefine the market and exceed customer expectations.',
    image: 'https://picsum.photos/seed/john/86/86',
  },
  {
    name: 'Jane Smith, Tech Solutions',
    title: 'on Engineering Excellence',
    review:
      'Jane’s leadership in the engineering department has led to unprecedented levels of stability and performance in our infrastructure.',
    image: 'https://picsum.photos/seed/jane/86/86',
  },
];

const DURATION = 8000;

const variants = {
  enter: (direction: number) => ({
    y: direction > 0 ? 20 : -20,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    y: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    y: direction < 0 ? 20 : -20,
    opacity: 0,
    scale: 0.9,
  }),
};

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [[direction], setDirection] = useState([0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection([1]);
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, DURATION);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let frameId: number;
    let startTime = performance.now();

    const animateProgress = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const newProgress = Math.min((elapsedTime / DURATION) * 100, 100);
      setProgress(newProgress);
      if (elapsedTime < DURATION) {
        frameId = requestAnimationFrame(animateProgress);
      }
    };

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
      setDirection([newIndex > index ? 1 : -1]);
      setIndex(newIndex);
    }
  };
  
  const currentTestimonial = testimonials[index];

  const barWidth = ((index / testimonials.length) * 100) + (progress / testimonials.length);

  return (
    <div className="bg-[#E0F5F5] rounded-xl p-8 w-full max-w-lg">
      <div className="flex items-center gap-6 overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index + '-image'}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              y: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.3 }
            }}
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
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={index + '-text'}
              custom={direction}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.4, ease: 'easeOut' } }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.4, ease: 'easeIn' } }}
            >
              <motion.p 
                className="font-bold text-zinc-900"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.4 } }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
              >
                {currentTestimonial.name}
              </motion.p>
              <motion.p 
                className="text-sm font-medium text-zinc-700"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.4 } }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
              >
                {currentTestimonial.title}
              </motion.p>
              <motion.p 
                className="mt-2 text-sm text-zinc-600"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.4 } }}
                exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
              >
                {currentTestimonial.review}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="mt-6">
        <div className="relative h-2 w-full bg-[#0badbf] rounded-full cursor-pointer" onClick={handleProgressClick}>
          <motion.div 
            className="absolute top-0 left-0 h-full bg-black rounded-full" 
            style={{ width: `${barWidth}%` }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
           {testimonials.map((_, i) => {
             if (i === 0) return null;
            const pos = (i / testimonials.length) * 100;
            return (
              <div
                key={i}
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border border-black/20"
                style={{ left: `${pos}%` }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (i !== index) {
                    setDirection([i > index ? 1 : -1]);
                    setIndex(i);
                  }
                }}
              ></div>
            )
           })}
        </div>
      </div>
    </div>
  );
}
