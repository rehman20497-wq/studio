'use client';

import Image from 'next/image';

export default function ArrowHaSection() {
  return (
    <section className="bg-[#fff9e6] w-full">
      <div className="flex justify-center items-center">
        <Image
          src="/arrowha.png"
          alt="Arrow decorative graphic"
          width={1440}
          height={150}
          className="w-full h-auto object-contain"
        />
      </div>
    </section>
  );
}
