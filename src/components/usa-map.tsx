"use client";

import Image from 'next/image';
import React from 'react';

const UsaMap = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <Image
        src="https://storage.googleapis.com/stabl-media/usa-map-outline-v2.png"
        alt="USA Map"
        width={1000}
        height={625}
        className="w-full h-full object-contain opacity-20"
      />
    </div>
  );
};

export default UsaMap;
