"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import BlogCard, { type BlogCardProps } from "./blog-card";
import { blogImages } from "@/lib/blog-images";

const blogPosts: BlogCardProps[] = [
  {
    type: "interview",
    date: "NOVEMBER 15, 2024",
    categories: ["Interview", "Data & AI"],
    title: "Michael Connor on the Impact of Generative AI in Consumer Goods",
    authorImage: blogImages.author,
    authorName: "Michael Connor",
    companyLogo: blogImages.amazon,
    backgroundImage: blogImages.interview,
  },
  {
    type: "case-study",
    date: "DECEMBER 9, 2024",
    categories: ["Industry Case Study", "Customer Support"],
    title: "Transforming Customer Service in the Home Furnishings Industry",
    backgroundImage: blogImages.caseStudy,
  },
  {
    type: "article",
    date: "JANUARY 2, 2025",
    categories: ["Future of Work", "Automation"],
    title: "The Rise of AI Agents in Modern Call Centers",
    backgroundImage: blogImages.article1,
  },
  {
    type: "guide",
    date: "JANUARY 18, 2025",
    categories: ["CX Strategy", "eCommerce"],
    title: "A Step-by-Step Guide to Reducing Customer Churn",
    backgroundImage: blogImages.article2,
  },
];

const duplicatedPosts = [...blogPosts, ...blogPosts];

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const marqueeVariants = {
  animate: {
    x: ["0%", "-100%"],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 30,
        ease: "linear",
      },
    },
  },
};

export default function BlogSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      ref={ref}
      className="bg-[#FEF9F2] py-24 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-5xl font-bold font-headline text-zinc-900">
          See what's new and what's next.
        </h2>
        <p className="mt-4 text-lg text-zinc-600">
          Thought leadership and actionable insights to help you grow faster.
        </p>
      </div>

      <motion.div
        className="mt-16"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
      >
        <div className="relative w-full overflow-hidden">
          <div className="max-w-[1000px] mx-auto">
             <motion.div
              className="flex"
              variants={marqueeVariants}
              animate={isInView ? "animate" : {}}
            >
              <div className="flex gap-8">
                {duplicatedPosts.map((post, index) => (
                  <BlogCard key={`first-${index}`} {...post} />
                ))}
              </div>
               <div className="flex gap-8">
                {duplicatedPosts.map((post, index) => (
                  <BlogCard key={`second-${index}`} {...post} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
