
import type { Metadata } from 'next';
import { Suspense } from 'react';
import Header from "@/components/layout/header";
import Hero from "@/components/blogs/hero";
import BlogPageClient from './blog-page-client';

export const metadata: Metadata = {
  title: 'Resources & Insights',
  description: 'Explore thought leadership, guides, and actionable insights from Telsys Inc. to help your business grow faster with cloud, AI, and communication technologies.',
};

export default function BlogsPage() {
  return (
    <div className="bg-[#FCFBF8]">
      <Header />
      <main>
        <Hero />
        <Suspense fallback={<div>Loading...</div>}>
          <BlogPageClient />
        </Suspense>
      </main>
    </div>
  );
}
