"use client";

import MagneticButton from "@/components/magnetic-button";
import TestimonialCarousel from "@/components/testimonial-carousel";

export default function RightColumn() {
  return (
    <div className="flex flex-col h-full justify-center py-[7%] px-4 md:px-0 md:pl-[8%]">
      <div className="animate-fade-in-up">
        <h2 className="text-xl font-medium">
          <span className="underline-draw">Outsourcing+</span>
        </h2>
        <h1 className="text-4xl md:text-[46px] font-bold mt-4 leading-tight text-black">
          Built to make
          <br />
          you better.
        </h1>
        <p className="mt-6 text-base max-w-md text-zinc-600">
          We're not traditional outsourcers. We build world-class teams—from
          customer support to AI data solutions—helping you scale faster and
          smarter.
        </p>
      </div>

      <div className="mt-8">
        <MagneticButton>
          <span className="text-[15px] font-medium">Build your Dream Team</span>
        </MagneticButton>
      </div>

      <div className="mt-8">
        <TestimonialCarousel />
      </div>
    </div>
  );
}
