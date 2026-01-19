'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import useEmblaCarousel, { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel-react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import MagneticButton from './magnetic-button';

const slideData = [
  {
    image: { src: 'https://picsum.photos/seed/carousel1/800/600', hint: 'office meeting' },
    banner: { text: 'Driving Retention & Growth Subscription', color: 'bg-purple-200' },
    quote: "Hugo understood our business and helped us translate feedback into meaningful improvements across the entire subscription experience.",
    author: 'Jeremy D.',
    title: 'Customer Experience',
  },
  {
    image: { src: 'https://picsum.photos/seed/carousel2/800/600', hint: 'woman beauty app' },
    banner: { text: 'Supporting 10,000+ Inquiries for a Beauty Brand', color: 'bg-yellow-300' },
    quote: "Hugo's team brought deep expertise and flexibility to our operation. They helped us improve response times and satisfaction.",
    author: 'Anna G.',
    title: 'Customer Experience Lead',
  },
  {
    image: { src: 'https://picsum.photos/seed/carousel3/800/600', hint: 'man gaming neon' },
    banner: { text: 'Eliminated a 5,000-Ticket Backlog in 14 Days', color: 'bg-cyan-200' },
    quote: "Hugo didn't just add agents. They rebuilt our workflows, improved quality, and delivered measurable results when our support operation was at a breaking point.",
    author: 'Robert M.',
    title: 'Head of Player Experience',
  },
  {
    image: { src: 'https://picsum.photos/seed/carousel4/800/600', hint: 'person using phone app' },
    banner: { text: '100K+ Personalized Messages at Scale', color: 'bg-green-200' },
    quote: "We're built on real-time, 1:1 conversations, and Hugo got that immediately. They delivered what we needed, while keeping interactions thoughtful and empathetic at high volumes.",
    author: 'Michael B.',
    title: 'Product Manager',
  },
  {
    image: { src: 'https://picsum.photos/seed/carousel5/800/600', hint: 'customer support office' },
    banner: { text: 'Support Through a New Parents Support Model', color: 'bg-pink-200' },
    quote: "They understood our users' unique needs and trust we built. They're not only a measure of satisfaction, but a measure of connection with our community.",
    author: 'Linda S.',
    title: 'Community Manager',
  },
];

const OPTIONS: EmblaOptionsType = { loop: true, align: 'center' };

const CustomerStoriesCarousel = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const slideCount = slideData.length;
  
    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
    const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);
  
    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    }, []);
  
    useEffect(() => {
      if (!emblaApi) return;
      onSelect(emblaApi);
      emblaApi.on('select', onSelect);
      emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);
  
    return (
      <div className="relative w-full py-12">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4" style={{ backfaceVisibility: 'hidden' }}>
            {slideData.map((slide, index) => {
               const isActive = index === selectedIndex;
               const isNext = index === (selectedIndex + 1) % slideCount;
               const isPrev = index === (selectedIndex - 1 + slideCount) % slideCount;
               const isNextNext = index === (selectedIndex + 2) % slideCount;
               const isPrevPrev = index === (selectedIndex - 2 + slideCount) % slideCount;
 
               let style = {};
               if (isActive) {
                 style = { transform: 'scale(1)', zIndex: 50, opacity: 1 };
               } else if (isNext) {
                 style = { transform: 'translateX(-55%) scale(0.85)', zIndex: 40, opacity: 1 };
               } else if (isPrev) {
                 style = { transform: 'translateX(55%) scale(0.85)', zIndex: 40, opacity: 1 };
               } else if (isNextNext) {
                 style = { transform: 'translateX(-95%) scale(0.7)', zIndex: 30, opacity: 1 };
               } else if (isPrevPrev) {
                 style = { transform: 'translateX(95%) scale(0.7)', zIndex: 30, opacity: 1 };
               } else {
                 style = { transform: 'scale(0.6)', zIndex: 20, opacity: 0 };
               }

              return (
              <div className="flex-shrink-0 flex-grow-0 basis-[85%] sm:basis-1/2 md:basis-[45%] lg:basis-1/3 pl-4" key={index}>
                  <div 
                      className="relative transition-[transform,opacity] duration-500 ease-in-out"
                      style={style}
                  >
                      <div className={cn(
                          "bg-white rounded-3xl p-4 transition-all duration-500",
                          isActive ? "border-2 border-black" : "border-4 border-yellow-400"
                      )}>
                          <div className="relative w-full h-[500px] rounded-2xl overflow-hidden">
                              <Image src={slide.image.src} alt={slide.image.hint} fill className="object-cover" data-ai-hint={slide.image.hint} sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 33vw"/>
                              <div className={cn("absolute -bottom-1 left-1/2 -translate-x-1/2 w-[85%] p-4 rounded-xl text-center font-semibold text-zinc-800", slide.banner.color)}>
                                  {slide.banner.text}
                              </div>
                          </div>
                          <div className="pt-12 pb-4 text-center min-h-[280px] flex flex-col">
                              <p className="text-zinc-700 relative text-base text-justify flex-grow">
                                  {slide.quote}
                              </p>
                              <div className="mt-6">
                                <p className="font-bold text-zinc-900">{slide.author}</p>
                                <p className="text-sm text-zinc-600">{slide.title}</p>
                              </div>
                                <div className="mt-6 flex justify-center">
                                    <MagneticButton>
                                        <span className="text-sm font-semibold">
                                            Read the Full Story
                                        </span>
                                    </MagneticButton>
                                </div>
                          </div>
                      </div>
                  </div>
              </div>
            )})}
          </div>
        </div>
        <div className="flex items-center justify-center gap-6 mt-8">
          <button onClick={scrollPrev} className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center hover:bg-yellow-500 transition-colors">
            <ArrowLeft className="w-5 h-5 text-black" />
          </button>
          <div className="flex items-center justify-center gap-2">
              {slideData.map((_, index) => (
                  <button
                      key={index}
                      onClick={() => scrollTo(index)}
                      className={cn(
                          "w-3 h-3 rounded-full transition-all",
                          index === selectedIndex ? "bg-black scale-125" : "bg-gray-300 hover:bg-gray-400"
                      )}
                  />
              ))}
          </div>
          <button onClick={scrollNext} className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center hover:bg-yellow-500 transition-colors">
            <ArrowRight className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>
    );
};


const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } }
};

export default function CustomerStories() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <motion.section 
            ref={ref}
            className="bg-white py-20 px-[5%]"
            variants={sectionVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
        >
            <CustomerStoriesCarousel />
        </motion.section>
    )
}
