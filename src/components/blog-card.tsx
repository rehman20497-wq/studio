
"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { MessageSquare, Search, FileText, BookOpen } from "lucide-react";
import Link from "next/link";

export type BlogCardProps = {
  type: "interview" | "case-study" | "article" | "guide";
  date: string;
  categories: string[];
  title: string;
  backgroundImage: { src: string; hint: string };
  companyLogo?: { src: string; hint: string };
};

const Badge = ({ category }: { category: string }) => {
    let Icon;
    const content = category.toUpperCase();
    let bgColor = "bg-blue-500"; // Default color

    // Simple logic to assign icon and color based on category name
    if (category.toLowerCase().includes('interview')) {
        Icon = MessageSquare;
        bgColor = "bg-orange-500";
    } else if (category.toLowerCase().includes('case study')) {
        Icon = Search;
        bgColor = "bg-cyan-500";
    } else if (category.toLowerCase().includes('guide')) {
        Icon = BookOpen;
        bgColor = "bg-green-500";
    } else {
        Icon = FileText;
        bgColor = "bg-blue-500";
    }

  return (
    <div
      className={cn(
        "absolute top-4 right-4 w-20 h-20 rounded-full flex items-center justify-center font-bold text-xs uppercase text-white",
        bgColor
      )}
    >
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <Icon className="w-5 h-5" />
      </span>
      <div className="relative w-full h-full animate-spin-slow">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-transparent">
          <path
            id={`text-path-${content}`}
            d="M 10,50 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
          />
          <text>
            <textPath
              href={`#text-path-${content}`}
              startOffset="50%"
              textAnchor="middle"
              className="font-bold text-xs uppercase"
              fill="white"
            >
              {content} • {content} •
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
};

export default function BlogCard({
  type,
  date,
  categories,
  title,
  backgroundImage,
  companyLogo,
}: BlogCardProps) {
  const primaryCategory = categories[0] || 'Article';
    
  return (
    <div className="block group w-full h-full">
      <div className="relative flex-shrink-0 w-full h-full min-h-[520px] bg-white rounded-2xl shadow-lg p-4 mb-0 transition-transform duration-300 ease-in-out group-hover:-translate-y-2">
         <svg
            className="absolute inset-0 pointer-events-none"
            width="100%"
            height="100%"
        >
            <rect
                x="1"
                y="1"
                width="calc(100% - 2px)"
                height="calc(100% - 2px)"
                rx="16"
                ry="16"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                className="animated-border"
            >
            </rect>
        </svg>
        <div className="w-full h-full flex flex-col">
          <div className="relative h-3/5 overflow-hidden rounded-xl">
            <Image
              src={backgroundImage.src}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              data-ai-hint={backgroundImage.hint}
            />
            {type === "interview" && companyLogo && (
              <div className="absolute top-1/2 left-16 -translate-y-1/2">
                <Image
                  src={companyLogo.src}
                  alt="Company Logo"
                  width={80}
                  height={20}
                  data-ai-hint={companyLogo.hint}
                />
              </div>
            )}
            <Badge category={primaryCategory} />
          </div>
          <div className="p-4 h-2/5 flex flex-col">
            <div className="text-xs text-zinc-500 font-medium">
              <span>{date}</span>
            </div>
            <div className="flex gap-2 mt-2">
              {categories.map((cat, i) => (
                <span
                  key={i}
                  className="text-sm text-zinc-700 underline underline-offset-2"
                >
                  {cat}
                </span>
              ))}
            </div>
            <h3 className="text-xl font-headline font-medium text-zinc-900 mt-4">
              <span className="relative underline-draw">
                {title}
              </span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
