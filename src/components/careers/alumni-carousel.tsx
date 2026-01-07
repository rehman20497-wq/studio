'use client';

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel, { type EmblaCarouselType } from 'embla-carousel-react';
import Image from 'next/image';
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
  {
    image: {
      src: 'https://picsum.photos/seed/google-office/800/500',
      hint: 'modern campus building',
    },
    logo: {
      src: '/Google.svg',
      alt: 'Google Logo',
    },
  },
    {
    image: {
      src: 'https://picsum.photos/seed/meta-office/800/500',
      hint: 'futuristic office lobby',
    },
    logo: {
      src: '/Meta.svg',
      alt: 'Meta Logo',
    },
  },
];


const ArrowButton = ({
  direction,
  onClick,
  disabled,
}: {
  direction: 'left' | 'right';
  onClick: () => void;
  disabled: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="absolute top-1/2 -translate-y-1/2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-black z-20 hover:bg-yellow-500 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed"
    style={direction === 'left' ? { left: '1rem' } : { right: '1rem' }}
  >
    {direction === 'left' ? <ArrowLeft /> : <ArrowRight />}
  </button>
);

export default function AlumniCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center', slidesToScroll: 1 });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4">
          {slides.map((slide, index) => (
            <div
              className="flex-[0_0_80%] min-w-0 pl-4"
              key={index}
            >
              <div
                className={cn(
                  'relative w-full h-[500px] bg-black rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ease-in-out',
                   index === selectedIndex ? 'opacity-100 scale-100' : 'opacity-50 scale-90 blur-sm'
                )}
              >
                <Image
                  src={slide.image.src}
                  alt={slide.image.hint}
                  fill
                  className="object-cover"
                  data-ai-hint={slide.image.hint}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <Image
                    src={slide.logo.src}
                    alt={slide.logo.alt}
                    width={200}
                    height={80}
                    className="object-contain drop-shadow-lg"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <ArrowButton direction="left" onClick={scrollPrev} disabled={!canScrollPrev} />
      <ArrowButton direction="right" onClick={scrollNext} disabled={!canScrollNext} />
    </div>
  );
}
