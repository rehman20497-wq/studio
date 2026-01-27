
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import useEmblaCarousel, { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
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

const OPTIONS: EmblaOptionsType = { loop: true };

const getDistance = (index: number, active: number, total: number) => {
  let diff = index - active;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
};

const CustomerStoriesCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [
    Autoplay({ playOnInit: true, delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const slideCount = slideData.length;

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full py-16">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slideData.map((slide, index) => (
            <div className="flex-[0_0_90%] sm:flex-[0_0_60%] md:flex-[0_0_50%] lg:flex-[0_0_40%] min-w-0 px-4" key={index}>
              <div
                className={cn(
                  "bg-white rounded-3xl p-6 transition-all duration-500 w-full h-full",
                  index === selectedIndex ? "border-4 border-black" : "border-4 border-yellow-400"
                )}
              >
                <div className="relative w-full h-[370px] rounded-2xl overflow-hidden">
                  <Image
                    src={slide.image.src}
                    alt={slide.image.hint}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 80vw, 420px"
                  />
                  <div
                    className={cn(
                      "absolute -bottom-1 left-1/2 -translate-x-1/2 w-[85%] p-4 rounded-xl text-center font-semibold text-black",
                      slide.banner.color
                    )}
                    style={{ fontSize: '20px' }}
                  >
                    {slide.banner.text}
                  </div>
                </div>

                <div className="pt-12 pb-4 text-center min-h-[280px] flex flex-col">
                  <div className="relative flex-grow px-6">
                    <div className="absolute -top-6 -left-4 w-8 h-8">
                      <Image src="/icol.png" alt="Opening quote" width={32} height={32} />
                    </div>
                    <p className="text-black text-[17px] text-justify pl-2 pr-2">
                      {slide.quote}
                    </p>
                    <div className="absolute -bottom-6 -right-4 w-8 h-8">
                      <Image src="/icol.png" alt="Closing quote" width={32} height={32} style={{ transform: "scaleX(-1)" }} />
                    </div>
                  </div>

                  <div className="mt-6 text-left px-8">
                    <p className="font-bold text-[16px] text-black">{slide.author}</p>
                    <p className="text-[16px] text-black">{slide.title}</p>
                  </div>

                  <div className="mt-6 flex justify-center">
                    <MagneticButton>
                      <span className="text-sm font-semibold">Talk to an Expert</span>
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 right-4 flex items-center justify-center gap-6 mt-10">
        <button
          onClick={scrollPrev}
          className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center hover:bg-yellow-500 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-black" />
        </button>
        <button
          onClick={scrollNext}
          className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center hover:bg-yellow-500 transition-colors"
        >
          <ArrowRight className="w-5 h-5 text-black" />
        </button>
      </div>
    </div>
  );
};

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
  },
};

export default function CustomerStories() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      ref={ref}
      className="bg-white pb-20 px-[5%]"
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <CustomerStoriesCarousel />
    </motion.section>
  );
}
