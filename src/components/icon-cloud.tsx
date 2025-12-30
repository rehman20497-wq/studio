"use client";

import { Award, Cog, Heart, Shield, Star } from 'lucide-react';

const icons = [
  { icon: Shield, props: { x: "10%", y: "20%", className: "animate-float-1" } },
  { icon: Cog, props: { x: "80%", y: "30%", className: "animate-float-2" } },
  { icon: Heart, props: { x: "25%", y: "70%", className: "animate-float-3" } },
  { icon: Award, props: { x: "70%", y: "80%", className: "animate-float-4" } },
  { icon: Star, props: { x: "50%", y: "10%", className: "animate-float-1" } },
  { icon: Shield, props: { x: "90%", y: "60%", className: "animate-float-2" } },
  { icon: Cog, props: { x: "5%", y: "50%", className: "animate-float-3" } },
  { icon: Heart, props: { x: "45%", y: "90%", className: "animate-float-4" } },
];

export default function IconCloud() {
  return (
    <svg
      width="100%"
      height="100%"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {icons.map((item, index) => {
        const Icon = item.icon;
        return (
          <Icon
            key={index}
            size={48}
            strokeWidth={1}
            filter="url(#soft-glow)"
            className={`absolute text-primary/30 ${item.props.className}`}
            style={{ left: item.props.x, top: item.props.y }}
          />
        );
      })}
    </svg>
  );
}
