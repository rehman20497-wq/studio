"use client";

import { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import { testimonials as allTestimonials, stateCoordinates } from '@/lib/testimonials';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type Coords = { x: number; y: number };

const PROFILE_SIZE = 48;
const CIRCLE_RADIUS = 28;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

type TestimonialData = (typeof allTestimonials)[0];
type Testimonial = TestimonialData & { coords: Coords, image: string };

type Line = {
  key: number;
  path: string;
};

export default function TestimonialNetwork() {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [phase, setPhase] = useState<'IDLE' | 'FADEOUT' | 'LINE' | 'PROFILE' | 'POPOVER'>('IDLE');
  
  const [visibleProfiles, setVisibleProfiles] = useState<Testimonial[]>([]);
  const [activeProfile, setActiveProfile] = useState<Testimonial | null>(null);

  const [lines, setLines] = useState<Line[]>([]);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

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
      let startingProfile = visibleProfiles.length > 0 ? visibleProfiles[visibleProfiles.length - 1] : null;
  
      if (isNewSet) {
        setPhase('FADEOUT');
        await new Promise(r => setTimeout(r, 1000));
        
        // Keep the last profile of the previous set
        if (startingProfile) {
          setVisibleProfiles([startingProfile]);
        }
        setLines([]);
        pathRefs.current = [];
      }
  
      const currentProfile = testimonials[currentIndex];
      
      if (!startingProfile) {
        startingProfile = testimonials[(currentIndex - 1 + testimonials.length) % testimonials.length];
      }
  
      if (currentProfile && startingProfile) {
        const start = startingProfile.coords;
        const end = currentProfile.coords;
        const cx = (start.x + end.x) / 2 + (start.y - end.y) * 0.2;
        const cy = (start.y + end.y) / 2 + (end.x - start.x) * 0.2;
        const newLine = {
            key: currentIndex,
            path: `M${start.x},${start.y} Q${cx},${cy} ${end.x},${end.y}`,
        };
        
        setPhase('LINE');
        setLines(prev => [...prev, newLine]);
        await new Promise(r => setTimeout(r, 1500));
      }
  
      setPhase('PROFILE');
      setVisibleProfiles(prev => [...prev, currentProfile]);
      setActiveProfile(currentProfile);
      await new Promise(r => setTimeout(r, 1000));
  
      setPhase('POPOVER');
      await new Promise(r => setTimeout(r, 4000)); // Shortened for better flow
  
      setActiveProfile(null);
      setPhase('IDLE');
      await new Promise(r => setTimeout(r, 500));
  
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    };
  
    runAnimation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, testimonials]);


  useEffect(() => {
    const latestLineIndex = lines.length - 1;
    if (latestLineIndex >= 0 && pathRefs.current[latestLineIndex]) {
        const path = pathRefs.current[latestLineIndex];
        if(path) {
            path.classList.remove('line-draw');
            void path.offsetWidth; 
            path.classList.add('line-draw');
        }
    }
  }, [lines]);


  return (
    <div className="relative w-[1000px] h-[625px] scale-[0.5] sm:scale-[0.7] md:scale-[0.8] lg:scale-100">
      <svg className="absolute top-0 left-0 w-full h-full overflow-visible pointer-events-none" viewBox="0 0 1000 625">
        <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        {lines.map((line, index) => (
          <path
            key={line.key}
            ref={el => pathRefs.current[index] = el}
            d={line.path}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            className="line-draw"
            style={{ filter: 'url(#glow)' }}
          />
        ))}
      </svg>
      
      <div className={cn("transition-opacity duration-1000", phase === 'FADEOUT' ? 'opacity-0' : 'opacity-100')}>
        {visibleProfiles.map((p) => {
          const isProfileActive = activeProfile?.id === p.id && phase === 'PROFILE';
          
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
                    className={cn("animate-draw-circle", "stroke-primary")}
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
            className="absolute -translate-x-1/2 -translate-y-[calc(100%+24px)] w-64 p-4 rounded-lg animate-fade-scale-in
            bg-background/80 backdrop-blur-md border border-border shadow-2xl shadow-primary/10
            "
            style={{ left: activeProfile.coords.x, top: activeProfile.coords.y }}
        >
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-inherit border-b border-r border-border transform rotate-45"></div>
            <p className="font-body text-sm text-foreground/80 italic">"{activeProfile.review}"</p>
            <div className="mt-3 text-right">
                <p className="font-headline font-semibold text-primary">{activeProfile.name}</p>
                <p className="text-xs text-muted-foreground">{activeProfile.state}</p>
            </div>
        </div>
      )}
    </div>
  );
}
