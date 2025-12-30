import TestimonialNetwork from "@/components/testimonial-network";
import UsaMap from "@/components/usa-map";

export default function Home() {
  return (
    <main className="flex h-screen w-screen bg-background font-body overflow-hidden">
      {/* Left Column: Map */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <UsaMap />
        </div>
        <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_20%,hsl(var(--background)))]"></div>
      </div>

      {/* Right Column: Testimonials */}
      <div className="relative flex-1 flex items-center justify-center">
        <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_60%,hsl(var(--background)))]"></div>
        <div className="z-20">
          <TestimonialNetwork />
        </div>
      </div>
    </main>
  );
}
