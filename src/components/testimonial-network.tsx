"use client";

import { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import { testimonials as allTestimonials, stateCoordinates } from '@/lib/testimonials';
import UsaMap from './usa-map';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type Coords = { x: number; y: number };

const PROFILE_SIZE = 48;
const CIRCLE_RADIUS = 28;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

type TestimonialData = (typeof allTestimonials)[0];
type Testimonial = TestimonialData & { coords: Coords, image: string };

export default function TestimonialNetwork() {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [phase, setPhase] = useState<'IDLE' | 'FADEOUT' | 'LINE' | 'PROFILE' | 'POPOVER'>('IDLE');
  
  const [visibleProfiles, setVisibleProfiles] = useState<Testimonial[]>([]);
  const [activeProfile, setActiveProfile] = useState<Testimonial | null>(null);

  const [line, setLine] = useState<{ key: number; path: string } | null>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const testimonials = useMemo(() => {
    return allTestimonials.map(t => {
      const imagePlaceholder = PlaceHolderImages.find(p => p.id === t.imageId);
      return {
        ...t,
        coords: stateCoordinates[t.state],
        image: imagePlaceholder?.imageUrl || `https://picsum.photos/seed/${t.id}/48/48`
      };
    });
  }, []);

  useEffect(() => {
    const startTimeout = setTimeout(() => setCurrentIndex(0), 500);
    return () => clearTimeout(startTimeout);
  }, []);

  useEffect(() => {
    if (currentIndex === -1 || testimonials.length === 0) return;

    const isNewSet = currentIndex > 0 && currentIndex % 5 === 0;

    const runAnimation = async () => {
      if (isNewSet) {
        setPhase('FADEOUT');
        await new Promise(r => setTimeout(r, 1000));
        setVisibleProfiles([]);
        setLine(null);
      }

      const currentProfile = testimonials[currentIndex];
      const prevProfile = testimonials[currentIndex - 1] || testimonials[testimonials.length - 1];

      if (currentProfile && prevProfile) {
        const start = isNewSet ? testimonials[(currentIndex - 1 + testimonials.length) % testimonials.length].coords : prevProfile.coords;
        const end = currentProfile.coords;
        const cx = (start.x + end.x) / 2 + (start.y - end.y) * 0.2;
        const cy = (start.y + end.y) / 2 + (end.x - start.x) * 0.2;
        setLine({
            key: currentIndex,
            path: `M${start.x},${start.y} Q${cx},${cy} ${end.x},${end.y}`,
        });
        setPhase('LINE');
        await new Promise(r => setTimeout(r, 1500));
      }

      setPhase('PROFILE');
      setVisibleProfiles(prev => isNewSet ? [currentProfile] : [...prev, currentProfile]);
      setActiveProfile(currentProfile);
      await new Promise(r => setTimeout(r, 1000));

      setPhase('POPOVER');
      await new Promise(r => setTimeout(r, 5000));

      setActiveProfile(null);
      setPhase('IDLE');
      await new Promise(r => setTimeout(r, 500));

      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    };

    runAnimation();
  }, [currentIndex, testimonials]);

  useEffect(() => {
    if (line && pathRef.current) {
      const length = pathRef.current.getTotalLength();
      pathRef.current.style.strokeDasharray = `${length}`;
      pathRef.current.style.strokeDashoffset = `${length}`;
      pathRef.current.classList.add('line-draw');
    }
  }, [line]);

  return (
    <div className="relative w-[1000px] h-[625px] scale-[0.5] sm:scale-[0.7] md:scale-[0.8] lg:scale-100">
      <UsaMap stateCoords={Object.values(stateCoordinates)} />

      <svg className="absolute top-0 left-0 w-full h-full overflow-visible pointer-events-none" viewBox="0 0 1000 625">
        {line && (
          <path
            key={line.key}
            ref={pathRef}
            d={line.path}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            className="drop-shadow-[0_0_4px_hsl(var(--primary))]"
          />
        )}
      </svg>
      
      <div className={cn("transition-opacity duration-1000", phase === 'FADEOUT' ? 'opacity-0' : 'opacity-100')}>
        {visibleProfiles.map((p, idx) => {
          const isProfileActive = activeProfile?.id === p.id && phase === 'PROFILE';
          const randomColorClass = ['stroke-blue-400', 'stroke-pink-400', 'stroke-green-400', 'stroke-yellow-400', 'stroke-purple-400'][p.id % 5];
          
          return (
          <div
            key={p.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: p.coords.x, top: p.coords.y }}
          >
            <div className={cn('relative animate-zoom-in', isProfileActive ? 'z-10' : 'z-0')}>
              <Image
                src={p.image}
                alt={p.name}
                width={PROFILE_SIZE}
                height={PROFILE_SIZE}
                className="rounded-full border-2 border-background object-cover"
                data-ai-hint="person portrait"
              />
              {isProfileActive && (
                <svg
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-14 w-14 -rotate-90 overflow-visible"
                  viewBox="0 0 60 60"
                >
                  <circle
                    cx="30"
                    cy="30"
                    r={CIRCLE_RADIUS}
                    fill="none"
                    strokeWidth="3"
                    className={cn("animate-draw-circle", randomColorClass)}
                    style={{
                      strokeDasharray: CIRCLE_CIRCUMFERENCE,
                      strokeDashoffset: CIRCLE_CIRCUMFERENCE,
                    }}
                  />
                </svg>
              )}
            </div>
          </div>
        )})}
      </div>
      
      {activeProfile && phase === 'POPOVER' && (
        <div
            className="absolute -translate-x-1/2 -translate-y-[calc(100%+20px)] w-64 p-4 rounded-lg animate-fade-scale-in
            bg-primary/10 backdrop-blur-md border border-primary/30 shadow-2xl shadow-primary/20
            "
            style={{ left: activeProfile.coords.x, top: activeProfile.coords.y }}
        >
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-inherit border-b border-r border-primary/30 transform rotate-45"></div>
            <p className="font-body text-sm text-foreground/80 italic">"{activeProfile.review}"</p>
            <div className="mt-3 text-right">
                <p className="font-headline font-semibold text-primary-foreground">{activeProfile.name}</p>
                <p className="text-xs text-primary-foreground/70">{activeProfile.state}</p>
            </div>
        </div>
      )}
    </div>
  );
}
