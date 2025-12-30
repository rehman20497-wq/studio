"use client";

import { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import { testimonials as allTestimonials, stateCoordinates } from '@/lib/testimonials';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type Coords = { x: number; y: number };

const PROFILE_SIZE = 80;
const CIRCLE_RADIUS = 44;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

type TestimonialData = (typeof allTestimonials)[0];
type Testimonial = TestimonialData & { coords: Coords, image: string };

type Line = {
  key: number;
  path: string;
};

const THEME_CLASSES = [
    'theme-blue',
    'theme-teal',
    'theme-purple',
    'theme-green',
    'theme-orange',
];

export default function TestimonialNetwork() {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [phase, setPhase] = useState<'IDLE' | 'FADEOUT' | 'LINE' | 'CIRCLE' | 'PROFILE' | 'POPOVER'>('IDLE');
  
  const [visibleProfiles, setVisibleProfiles] = useState<Testimonial[]>([]);
  const [activeProfile, setActiveProfile] = useState<Testimonial | null>(null);

  const [lines, setLines] = useState<Line[]>([]);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const lineKeyCounter = useRef(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 625 });
  const [themeClass, setThemeClass] = useState(THEME_CLASSES[0]);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        const aspectRatio = 1000 / 625;
        const containerHeight = width / aspectRatio;
        
        if (height > containerHeight) {
            setDimensions({ width, height: containerHeight });
        } else {
            const containerWidth = height * aspectRatio;
            setDimensions({ width: containerWidth, height });
        }
      }
    };
    
    window.addEventListener('resize', updateDimensions);
    updateDimensions();
    const timeoutId = setTimeout(updateDimensions, 100);

    return () => {
        window.removeEventListener('resize', updateDimensions);
        clearTimeout(timeoutId);
    }
  }, []);

  const testimonials = useMemo(() => {
    return allTestimonials.map(t => {
      const imagePlaceholder = PlaceHolderImages.find(p => p.id === t.imageId);
      const coords = stateCoordinates[t.state] || { x: 0.5, y: 0.5 };
      return {
        ...t,
        coords: {
          x: coords.x * dimensions.width,
          y: coords.y * dimensions.height,
        },
        image: imagePlaceholder?.imageUrl || `https://picsum.photos/seed/${t.id}/80/80`
      };
    });
  }, [dimensions.width, dimensions.height]);

  useEffect(() => {
    const startTimeout = setTimeout(() => setCurrentIndex(0), 500);
    return () => clearTimeout(startTimeout);
  }, []);

  useEffect(() => {
    if (currentIndex === -1 || testimonials.length === 0 || dimensions.width === 0) return;
  
    const isNewSet = currentIndex > 0 && currentIndex % 5 === 0;
  
    const runAnimation = async () => {
      let startingProfile = visibleProfiles.length > 0 ? visibleProfiles[visibleProfiles.length - 1] : null;
  
      if (isNewSet) {
        setThemeClass(THEME_CLASSES[(currentIndex / 5) % THEME_CLASSES.length]);
        setPhase('FADEOUT');
        await new Promise(r => setTimeout(r, 1000));
        
        if (startingProfile) {
             const newVisible = visibleProfiles.filter(p => p.id === startingProfile!.id);
             if (!newVisible.find(p => p.id === startingProfile!.id)) {
                setVisibleProfiles([startingProfile]);
             } else {
                setVisibleProfiles(newVisible);
             }
        } else {
            setVisibleProfiles([]);
        }
        setLines([]);
        pathRefs.current = [];
      }
  
      const currentProfile = testimonials[currentIndex];
      
      if (!startingProfile && currentIndex > 0) {
        const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        startingProfile = testimonials[prevIndex];
        if (!visibleProfiles.some(p => p.id === startingProfile!.id)) {
             setVisibleProfiles(prev => [...prev.filter(p => p.id !== startingProfile!.id), startingProfile!]);
        }
      }
  
      if (currentProfile && startingProfile) {
        const start = startingProfile.coords;
        const end = currentProfile.coords;
        const cx = (start.x + end.x) / 2 + (start.y - end.y) * 0.2;
        const cy = (start.y + end.y) / 2 + (end.x - start.x) * 0.2;
        const newLine = {
            key: lineKeyCounter.current++,
            path: `M${start.x},${start.y} Q${cx},${cy} ${end.x},${end.y}`,
        };
        
        setPhase('LINE');
        setLines(prev => [...prev, newLine]);
        
        await new Promise(r => setTimeout(r, 3000));
      }
  
      
      setActiveProfile(currentProfile);
      
      if (!visibleProfiles.some(p => p.id === currentProfile.id)) {
        setVisibleProfiles(prev => [...prev, currentProfile]);
      }
      setPhase('CIRCLE');
      
      await new Promise(r => setTimeout(r, 3000)); 
      
      setPhase('PROFILE');
      await new Promise(r => setTimeout(r, 1000));
  
      setPhase('POPOVER');
      await new Promise(r => setTimeout(r, 6000)); 
  
      setActiveProfile(null);
      setPhase('IDLE');
      
      const nextIndex = (currentIndex + 1) % testimonials.length;
      if (nextIndex === 0 && testimonials.length > 0) {
        setThemeClass(THEME_CLASSES[0]);
        setPhase('FADEOUT');
        await new Promise(r => setTimeout(r, 1000));
        const lastProfile = testimonials[testimonials.length - 1];
        setVisibleProfiles(lastProfile ? [lastProfile] : []);
        setLines([]);
        pathRefs.current = [];
      }
      await new Promise(r => setTimeout(r, 500));
      setCurrentIndex(nextIndex);
    };
  
    runAnimation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, testimonials, dimensions.width]);


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
    <div ref={containerRef} className={cn("relative w-full h-full flex items-center justify-center", themeClass)}>
     <div style={{ width: dimensions.width, height: dimensions.height }} className="relative">
      <svg className="absolute top-0 left-0 w-full h-full overflow-visible pointer-events-none" viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}>
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
            stroke="hsl(var(--theme-primary))"
            strokeWidth="2"
            className="line-draw"
            style={{ filter: 'url(#glow)' }}
          />
        ))}

        {visibleProfiles.map((p) => {
            if (!p) return null;
            const isNewlyActive = activeProfile?.id === p.id && phase === 'CIRCLE';
            
            return (
                <circle
                    key={`circle-${p.id}`}
                    cx={p.coords.x}
                    cy={p.coords.y}
                    r={CIRCLE_RADIUS}
                    fill="none"
                    stroke="hsl(var(--theme-primary))"
                    strokeWidth="3"
                    className={cn(
                        "transition-opacity duration-1000",
                        phase === 'FADEOUT' && visibleProfiles.length > 1 && p.id !== visibleProfiles[visibleProfiles.length - 1].id ? 'opacity-0' : 'opacity-100'
                    )}
                    style={{
                        strokeDasharray: CIRCLE_CIRCUMFERENCE,
                        strokeDashoffset: isNewlyActive ? CIRCLE_CIRCUMFERENCE : 0,
                        animation: isNewlyActive ? 'draw-circle 3s ease-out forwards' : 'none',
                        filter: 'url(#glow)'
                    }}
                />
            );
        })}
      </svg>
      
      <div className={cn("transition-opacity duration-1000", phase === 'FADEOUT' ? 'opacity-0' : 'opacity-100')}>
        {visibleProfiles.map((p) => {
          if (!p || !p.coords) return null;
          const isActive = activeProfile?.id === p.id;
          const isVisible = (isActive && (phase === 'PROFILE' || phase === 'POPOVER' || phase === 'IDLE')) || 
                            (!isActive && visibleProfiles.some(vp => vp.id === p.id));
          
          return (
            <div
              key={p.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: p.coords.x, top: p.coords.y }}
            >
              <div className={cn(
                  'relative transition-opacity duration-500',
                  isActive && phase === 'PROFILE' ? 'animate-zoom-in' : '',
                  isVisible ? 'opacity-100' : 'opacity-0'
              )}>
                <div className="relative rounded-full border-2 border-background overflow-hidden" style={{ width: PROFILE_SIZE, height: PROFILE_SIZE }}>
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes={`${PROFILE_SIZE}px`}
                    className="object-cover"
                    data-ai-hint="person portrait"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {activeProfile && phase === 'POPOVER' && (
        <div
          className="absolute z-50 w-64 animate-fade-scale-in border-shimmer-effect"
          style={{
            left: activeProfile.coords.x,
            top: activeProfile.coords.y - CIRCLE_RADIUS - 12,
            transform: 'translateX(-50%)',
            '--shimmer-angle': '0deg'
          } as React.CSSProperties}
        >
          <div className="p-4 rounded-lg bg-background/80 backdrop-blur-md">
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-inherit border-b border-r border-border rotate-45" />
            <p className="font-body text-sm text-foreground/80 italic">"{activeProfile.review}"</p>
            <div className="mt-3 text-right">
              <p className="font-headline font-semibold text-theme-primary">{activeProfile.name}</p>
              <p className="text-xs text-muted-foreground">{activeProfile.designation}</p>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
