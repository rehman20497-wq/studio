
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const slides = [
  {
    image: {
      src: 'https://picsum.photos/seed/barclays-office/800/500',
      hint: 'corporate building night',
    },
    logo: {
      src: '/Barclays.svg',
      alt: 'Barclays Logo',
    },
  },
  {
    image: {
      src: 'https://picsum.photos/seed/kpmg-office/800/500',
      hint: 'modern office boardroom',
    },
    logo: {
      src: '/KPMG.svg',
      alt: 'KPMG Logo',
    },
  },
  {
    image: {
      src: 'https://picsum.photos/seed/deloitte-office/800/500',
      hint: 'city skyline architecture',
    },
    logo: {
      src: '/Deloitte.svg',
      alt: 'Deloitte Logo',
    },
  },
];

const slideVariants = {
  hidden: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.9,
  }),
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 100,
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.9,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 100,
    },
  }),
};

const ArrowButton = ({
  direction,
  onClick,
}: {
  direction: 'left' | 'right';
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 -translate-y-1/2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-black z-20 hover:bg-yellow-500 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-300"
    style={direction === 'left' ? { left: 'calc(50% - 400px - 4rem)' } : { right: 'calc(50% - 400px - 4rem)' }}
  >
    {direction === 'left' ? <ArrowLeft /> : <ArrowRight />}
  </button>
);

export default function AlumniCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, skipSnaps: true });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const scrollPrev = useCallback(() => {
    setDirection(-1);
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    setDirection(1);
    emblaApi?.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on('select', onSelect);
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi]);

  return (
    <div className="relative w-full flex items-center justify-center">
      <ArrowButton direction="left" onClick={scrollPrev} />

      <div className="overflow-hidden w-[800px]" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div
              className="flex-[0_0_100%] min-w-0 relative"
              key={index}
            >
                <AnimatePresence initial={false} custom={direction}>
                    {index === currentIndex && (
                        <motion.div
                            custom={direction}
                            variants={slideVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="w-[800px] h-[500px] bg-black rounded-2xl overflow-hidden relative shadow-2xl"
                        >
                            <Image
                                src={slide.image.src}
                                alt={slide.image.hint}
                                fill
                                className="object-cover opacity-80"
                                data-ai-hint={slide.image.hint}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Image 
                                    src={slide.logo.src}
                                    alt={slide.logo.alt}
                                    width={200}
                                    height={50}
                                    className="object-contain"
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      <ArrowButton direction="right" onClick={scrollNext} />
    </div>
  );
}
