"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { MessageSquare, Search } from "lucide-react";

export type BlogCardProps = {
  type: "interview" | "case-study" | "article" | "guide";
  date: string;
  categories: string[];
  title: string;
  backgroundImage: { src: string; hint: string };
  authorImage?: { src: string; hint: string };
  authorName?: string;
  companyLogo?: { src: string; hint: string };
};

const Badge = ({ type }: { type: BlogCardProps["type"] }) => {
  const isInterview = type === "interview";
  const content = isInterview ? "INTERVIEW" : "CASE STUDY";
  const Icon = isInterview ? MessageSquare : Search;

  if (type !== "interview" && type !== "case-study") return null;

  return (
    <div
      className={cn(
        "absolute top-4 right-4 w-20 h-20 rounded-full flex items-center justify-center font-bold text-xs uppercase text-white",
        isInterview ? "bg-orange-500" : "bg-cyan-500"
      )}
    >
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <Icon className="w-5 h-5" />
      </span>
      <div className="relative w-full h-full animate-spin-slow">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-transparent">
          <path
            id={`text-path-${type}`}
            d="M 10,50 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
          />
          <text>
            <textPath
              href={`#text-path-${type}`}
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
  authorImage,
  authorName,
  companyLogo,
}: BlogCardProps) {
  return (
    <div className="flex-shrink-0 w-[480px] h-[520px] bg-white rounded-2xl shadow-lg overflow-hidden group">
      <div className="relative h-3/5">
        {type === "interview" && authorImage && authorName ? (
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={backgroundImage.src}
              alt="Background"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              data-ai-hint={backgroundImage.hint}
            />
            {companyLogo && (
                <div className="absolute top-1/2 left-16 -translate-y-1/2">
                    <Image src={companyLogo.src} alt="Company Logo" width={80} height={20} data-ai-hint={companyLogo.hint} />
                </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <Image
                  src={authorImage.src}
                  alt={authorName}
                  fill
                  className="object-cover"
                  data-ai-hint={authorImage.hint}
                />
              </div>
              <div className="absolute bottom-12 bg-red-400 text-white px-4 py-1 rounded-full text-lg font-medium">
                {authorName}
              </div>
            </div>
          </div>
        ) : (
          <Image
            src={backgroundImage.src}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            data-ai-hint={backgroundImage.hint}
          />
        )}
        <Badge type={type} />
      </div>
      <div className="p-6 h-2/5 flex flex-col">
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
          {title}
        </h3>
      </div>
    </div>
  );
}
