"use client";

import MagneticButton from "@/components/magnetic-button";
import TestimonialCarousel from "@/components/testimonial-carousel";

export default function RightColumn() {
  return (
    <div className="flex flex-col h-full justify-center py-[7%] px-4 md:px-0">
      <div className="animate-fade-in-up">
        <h2 className="text-[23px] font-medium">
          <span className="underline-draw">Outsourcing+</span>
        </h2>
        <h1 className="text-[72px] font-normal mt-4 leading-[72.5px] text-black">
          Built to make
          <br />
          you better.
        </h1>
        <p className="mt-6 text-[20px] max-w-md text-black leading-[28.7px]">
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
