
"use client";

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import React, { useRef } from 'react';
import FloatingIcon from './floating-icon';
import { cn } from '@/lib/utils';

const StatCard = ({
  title,
  value,
  percentage,
  progress,
  time,
  percentageColor,
  path,
  className,
}: {
  title: string;
  value: string;
  percentage: string;
  progress: number;
  time?: string;
  percentageColor: string;
  path: string;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div className={cn("relative", className)} ref={ref}>
      <div className="relative z-10 rounded-xl bg-white/60 p-4 backdrop-blur-sm border border-cyan-200/50 shadow-lg w-full">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-zinc-800 text-sm">{title}</h3>
          {time && <p className="font-mono text-xs text-zinc-600">{time}</p>}
        </div>
        <div className="mt-3">
          <div className="h-2.5 w-full rounded-full bg-cyan-200/50">
            <motion.div
              className="h-2.5 rounded-full bg-[#00B4C6]"
              style={{ width: '0%' }}
              animate={{ width: isInView ? `${progress}%` : '0%' }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </div>
          <p className="mt-1 text-xs font-semibold text-zinc-500">{value}</p>
        </div>
      </div>
      <div className="absolute top-1/2 -right-6 -translate-y-1/2 z-20">
        <div className={`relative w-14 h-14 rounded-full flex items-center justify-center font-bold text-black border-2 border-black/80 shadow-md ${percentageColor}`}>
          {percentage}
        </div>
      </div>
      <svg
        className="absolute right-0 top-1/2 z-0 overflow-visible"
        width="26"
        height="80"
        viewBox="0 0 26 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d={path}
          stroke="#00B4C6"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isInView ? 1 : 0 }}
          transition={{ duration: 1, ease: 'easeInOut', delay: 0.5 }}
        />
      </svg>
    </div>
  );
};


export default function AnimatedStats() {
    return (
        <div className="relative mt-8 w-full">
            <div className="absolute -bottom-16 -left-16 w-80 h-80">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#E0F5F5" d="M 100, 200 a 100,100 0 0,1 -100,-100 V 200 Z" />
                </svg>
            </div>
            
            <div className="relative w-full mx-auto mt-12 grid grid-cols-10 items-center gap-[5%]">
                <div className="col-span-3">
                    <div className="relative w-48 h-48 mx-auto">
                        <div className="absolute -left-4 top-0 animate-float-1">
                            <FloatingIcon>
                                <svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 0L17.1432 10.1329L27.4894 10.1329L19.1731 16.3942L22.3163 26.527L14 20.2658L5.68369 26.527L8.82689 16.3942L0.51059 10.1329L10.8568 10.1329L14 0Z" fill="black"/>
                                </svg>
                            </FloatingIcon>
                        </div>
                        <div className="absolute right-0 top-8 animate-float-2">
                            <FloatingIcon>
                                <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M29.5 7.25C29.5 12.4875 25.125 21.25 15.25 23C5.375 21.25 1 12.4875 1 7.25C1 2.5 5.375 1 9.75 1C14.125 1 13 4.75 15.25 7.25C17.5 4.75 18.375 1 22.75 1C27.125 1 29.5 2.5 29.5 7.25Z" stroke="black" strokeWidth="2"/>
                                </svg>
                            </FloatingIcon>
                        </div>
                        <div className="absolute right-4 bottom-0 animate-float-3">
                            <FloatingIcon>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="black" strokeWidth="2"/>
                                </svg>
                            </FloatingIcon>
                        </div>

                        <div className="absolute inset-0 m-auto flex items-center justify-center">
                            <div className="relative rounded-full bg-gradient-to-b from-[#00B4C6] to-[#40E0D0] p-1">
                                <div className="bg-white rounded-full p-[10px]">
                                    <div className="relative w-[70px] h-[70px] rounded-full overflow-hidden">
                                        <Image
                                            src="https://images.unsplash.com/photo-1594672830234-ba4cfe1202dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8bWFuJTIwcG9ydHJhaXR8ZW58MHx8fHwxNzY3MDEwODkzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                                            alt="Agent Portrait"
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            className="object-cover"
                                            data-ai-hint="man portrait"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-7 mr-[10%]">
                    <StatCard
                        title="Accuracy Score"
                        value="DATA 1"
                        percentage="+10%"
                        progress={75}
                        percentageColor="bg-[#9AFEFF]"
                        path="M0,0 C15,0 15,30 25,30"
                        className="w-[300px]"
                    />
                </div>
            </div>
             <div className='relative w-fit mx-auto'>
                <StatCard
                    title="Ticket Response Time"
                    value="DATA 1"
                    percentage="-31%"
                    time="08 MIN 34 SEC"
                    progress={40}
                    percentageColor="bg-[#9AFEFF]"
                    path="M25,0 C15,0 15,30 0,30"
                    className="top-full mt-10 left-full -ml-8 w-[350px]"
                />
            </div>
        </div>
    );
}
