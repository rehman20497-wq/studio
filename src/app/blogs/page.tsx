
import { Suspense } from 'react';
import Header from "@/components/layout/header";
import Hero from "@/components/blogs/hero";
import BlogPageClient from './blog-page-client';

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
