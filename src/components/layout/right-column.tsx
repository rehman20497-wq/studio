"use client";

import MagneticButton from "@/components/magnetic-button";
import TestimonialCarousel from "@/components/testimonial-carousel";

export default function RightColumn() {
  return (
    <div className="flex flex-col h-full justify-center">
      <div className="animate-fade-in-up mt-[7%]">
        <h2 className="text-xl font-medium">
          <span className="underline-draw">Outsourcing+</span>
        </h2>
        <h1 className="text-7xl font-bold mt-4 leading-tight">
          Built to make
          <br />
          you better.
        </h1>
        <p className="mt-6 text-lg max-w-md text-zinc-600">
          We're not traditional outsourcers. We build world-class teams—from
          customer support to AI data solutions—helping you scale faster and
          smarter.
        </p>
      </div>

      <div className="mt-8">
        <MagneticButton>
          <span className="text-lg font-medium">Build your Dream Team</span>
        </MagneticButton>
      </div>

      <div className="mt-16 mb-[7%]">
        <TestimonialCarousel />
      </div>
    </div>
  );
}
