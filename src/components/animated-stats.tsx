
"use client";

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import React, { useRef } from 'react';
import FloatingIcon from './floating-icon';

const StatCard = ({
  title,
  value,
  percentage,
  progress,
  time,
  percentageColor,
  path,
}: {
  title: string;
  value: string;
  percentage: string;
  progress: number;
  time?: string;
  percentageColor: string;
  path: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div className="relative" ref={ref}>
      <div className="relative z-10 rounded-xl bg-white/60 p-4 backdrop-blur-sm border border-cyan-200/50 shadow-lg">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-zinc-800">{title}</h3>
          {time && <p className="font-mono text-sm text-zinc-600">{time}</p>}
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
      <div className="absolute top-1/2 -right-8 -translate-y-1/2 z-20">
        <div className={`relative w-16 h-16 rounded-full flex items-center justify-center font-bold text-black border-2 border-black/80 shadow-md ${percentageColor}`}>
          {percentage}
        </div>
      </div>
      <svg
        className="absolute -right-2 top-1/2 z-0"
        width="34"
        height="80"
        viewBox="0 0 34 80"
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
        <div className="relative mt-12 w-full max-w-md mx-auto">
            <div className="absolute -left-16 top-0 animate-float-1">
                <FloatingIcon>
                    <svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 0L17.1432 10.1329L27.4894 10.1329L19.1731 16.3942L22.3163 26.527L14 20.2658L5.68369 26.527L8.82689 16.3942L0.51059 10.1329L10.8568 10.1329L14 0Z" fill="black"/>
                    </svg>
                </FloatingIcon>
            </div>
            <div className="absolute -right-8 top-8 animate-float-2">
                <FloatingIcon>
                    <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M29.5 7.25C29.5 12.4875 25.125 21.25 15.25 23C5.375 21.25 1 12.4875 1 7.25C1 2.5 5.375 1 9.75 1C14.125 1 13 4.75 15.25 7.25C17.5 4.75 18.375 1 22.75 1C27.125 1 29.5 2.5 29.5 7.25Z" stroke="black" strokeWidth="2"/>
                    </svg>
                </FloatingIcon>
            </div>
             <div className="absolute -right-8 top-3/4 animate-float-3">
                 <FloatingIcon>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1C1 12.0457 9.95431 21 21 21H31V31" stroke="black" strokeWidth="2"/>
                    </svg>
                 </FloatingIcon>
            </div>

            <div className="relative w-40 h-40 mx-auto">
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#00B4C6] to-[#40E0D0] p-1.5">
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                        <Image
                            src="https://images.unsplash.com/photo-1594672830234-ba4cfe1202dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8bWFuJTIwcG9ydHJhaXR8ZW58MHx8fHwxNzY3MDEwODkzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                            alt="Agent Portrait"
                            layout="fill"
                            objectFit="cover"
                            data-ai-hint="man portrait"
                        />
                    </div>
                </div>
            </div>

            <div className="relative space-y-10 mt-6">
                <StatCard
                    title="Accuracy Score"
                    value="DATA 1"
                    percentage="+10%"
                    progress={75}
                    percentageColor="bg-[#9AFEFF]"
                    path="M1 0V40C1 56.5685 14.4315 70 31 70H33"
                />
                <StatCard
                    title="Ticket Response Time"
                    value="DATA 1"
                    percentage="-31%"
                    time="08 MIN 34 SEC"
                    progress={40}
                    percentageColor="bg-[#9AFEFF]"
                    path="M1 80V40C1 23.4315 14.4315 10 31 10H33"
                />
            </div>
        </div>
    );
}
