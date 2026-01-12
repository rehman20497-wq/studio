
'use client';

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import BlogsGrid from "@/components/blogs/blogs-grid";
import FeaturedBlogPost from "@/components/blogs/featured-blog-post";
import BlogFilter from "@/components/blogs/blog-filter";
import NewsletterSignup from "@/components/blogs/newsletter-signup";

export default function BlogPageClient() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get('category') || 'all');

  return (
    <>
      <div className="px-[3%]">
        <BlogFilter 
          initialCategory={categoryFilter}
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          onCategoryChange={setCategoryFilter}
        />
      </div>
      <FeaturedBlogPost />
      <NewsletterSignup />
      <BlogsGrid searchTerm={searchTerm} categoryFilter={categoryFilter} />
    </>
  );
}
