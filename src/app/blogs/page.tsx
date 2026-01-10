
import Header from "@/components/layout/header";
import Hero from "@/components/blogs/hero";
import BlogsGrid from "@/components/blogs/blogs-grid";

export default function BlogsPage() {
  return (
    <div className="bg-[#FCFBF8]">
      <Header />
      <main>
        <Hero />
        <BlogsGrid />
      </main>
    </div>
  );
}
