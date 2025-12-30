import TestimonialNetwork from "@/components/testimonial-network";
import UsaMap from "@/components/usa-map";

export default function Home() {
  return (
    <main className="relative flex h-screen w-screen items-center justify-center bg-background font-body overflow-hidden">
      <UsaMap />
      <TestimonialNetwork />
    </main>
  );
}
