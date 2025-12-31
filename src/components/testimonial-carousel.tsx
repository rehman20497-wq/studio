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
    image: 'https://picsum.photos/seed/paula/116/116',
  },
  {
    name: 'John Doe, Acme Corp',
    title: 'on Product Innovation',
    review:
      'Leveraging cutting-edge technology, John has consistently delivered products that redefine the market and exceed customer expectations.',
    image: 'https://picsum.photos/seed/john/116/116',
  },
  {
    name: 'Jane Smith, Tech Solutions',
    title: 'on Engineering Excellence',
    review:
      'Jane’s leadership in the engineering department has led to unprecedented levels of stability and performance in our infrastructure.',
    image: 'https://picsum.photos/seed/jane/116/116',
  },
];

const DURATION = 8000;

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
    setIndex(newIndex);
  };
  
  const currentTestimonial = testimonials[index];

  return (
    <div className="bg-[#E0F5F5] rounded-xl p-8 w-full max-w-lg">
      <div className="flex items-center gap-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={index + '-image'}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } }}
            exit={{ scale: 0, opacity: 0, transition: { duration: 0.4, ease: 'easeIn' } }}
            className="w-28 h-28 relative flex-shrink-0"
          >
            <Image
              src={currentTestimonial.image}
              alt={currentTestimonial.name}
              width={116}
              height={116}
              className="rounded-full object-cover"
              data-ai-hint="person portrait"
            />
          </motion.div>
        </AnimatePresence>
        <div className="flex-grow">
          <AnimatePresence mode="wait">
            <motion.div
              key={index + '-text'}
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.4, ease: 'easeOut' } }}
              exit={{ scale: 0.95, opacity: 0, y: -10, transition: { duration: 0.4, ease: 'easeIn' } }}
            >
              <p className="font-bold text-zinc-900">{currentTestimonial.name}</p>
              <p className="text-sm font-medium text-zinc-700">{currentTestimonial.title}</p>
              <p className="mt-2 text-sm text-zinc-600">{currentTestimonial.review}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="mt-6">
        <div className="relative h-2 w-full bg-[#0badbf] rounded-full cursor-pointer" onClick={handleProgressClick}>
          <motion.div 
            className="absolute top-0 left-0 h-full bg-black rounded-full" 
            style={{ width: `${progress}%` }}
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
                  setIndex(i);
                }}
              ></div>
            )
           })}
        </div>
      </div>
    </div>
  );
}
