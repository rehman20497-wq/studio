import TestimonialNetwork from "@/components/testimonial-network";
import UsaMap from "@/components/usa-map";

export default function Home() {
  return (
    <main className="flex h-screen w-screen bg-background font-body overflow-hidden">
      <div className="relative w-1/2 h-screen flex items-center justify-center">
        <div className="relative w-full h-full">
          <UsaMap />
          <div className="absolute inset-0 bg-background/50" />
          <div className="absolute inset-0">
            <TestimonialNetwork />
          </div>
        </div>
      </div>
      <div className="w-1/2 h-screen">
        {/* Right column content goes here */}
      </div>
    </main>
  );
}
