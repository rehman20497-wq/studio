import TestimonialNetwork from "@/components/testimonial-network";

export default function Home() {
  return (
    <main className="relative flex h-screen w-screen items-center justify-center bg-background font-body overflow-hidden">
      <div className="absolute inset-0 z-0 bg-background">
        <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_20%,hsl(var(--background)))]"></div>
      </div>
      <div className="z-10">
        <TestimonialNetwork />
      </div>
    </main>
  );
}
