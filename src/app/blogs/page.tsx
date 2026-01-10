
import Header from "@/components/layout/header";
import Hero from "@/components/blogs/hero";
import BlogsGrid from "@/components/blogs/blogs-grid";
import FeaturedBlogPost from "@/components/blogs/featured-blog-post";

export default function BlogsPage() {
  return (
    <div className="bg-[#FCFBF8]">
      <Header />
      <main>
        <Hero />
        <FeaturedBlogPost />
        <BlogsGrid />
      </main>
    </div>
  );
}
