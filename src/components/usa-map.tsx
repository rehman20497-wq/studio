"use client";

import Image from 'next/image';
import React from 'react';

const UsaMap = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Image
        src="/USA.jpg"
        alt="USA Map"
        layout="fill"
        objectFit="cover"
        className="opacity-20"
      />
    </div>
  );
};

export default UsaMap;
