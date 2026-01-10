
import Header from "@/components/layout/header";
import Hero from "@/components/blogs/hero";
import BlogsGrid from "@/components/blogs/blogs-grid";
import FeaturedBlogPost from "@/components/blogs/featured-blog-post";
import BlogFilter from "@/components/blogs/blog-filter";
import NewsletterSignup from "@/components/blogs/newsletter-signup";

export default function BlogsPage() {
  return (
    <div className="bg-[#FCFBF8]">
      <Header />
      <main>
        <Hero />
        <div className="px-[3%]">
          <BlogFilter />
        </div>
        <FeaturedBlogPost />
        <NewsletterSignup />
        <BlogsGrid />
      </main>
    </div>
  );
}
