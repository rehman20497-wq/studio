'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { QuoteIcon } from '../quote-icon';

const testimonials = {
    cloud: {
      text: "Their cloud platform is robust and has scaled with us every step of the way. Downtime is a thing of the past. The support team is world-class, providing expert guidance whenever we need it.",
      author: 'Julia Frank',
      title: 'CTO, ScaleUp Inc.',
      image: 'https://picsum.photos/seed/julia/180/180',
      imageHint: 'woman professional',
    },
    communications: {
      text: "Integrating their communication APIs was a breeze. We've seen a 50% increase in customer engagement since we switched. It's reliable, clear, and just works.",
      author: 'Alex Rodriguez',
      title: 'Head of Product, ConnectMe',
      image: 'https://picsum.photos/seed/alex/180/180',
      imageHint: 'man tech office',
    },
    ai: {
      text: "The AI-powered analytics have given us insights we never thought possible. It's like having a data scientist on our team 24/7. This has been a true competitive advantage for us.",
      author: 'Samantha Carter',
      title: 'Director of Insights, DataDrive',
      image: 'https://picsum.photos/seed/samantha/180/180',
      imageHint: 'woman data scientist',
    },
    connectivity: {
        text: "We rely on their network for our mission-critical operations. The speed and stability are unmatched in the industry. It's the backbone of our business.",
        author: 'Ben Collins',
        title: 'IT Director, Global Logistics',
        image: 'https://picsum.photos/seed/ben/180/180',
        imageHint: 'man network engineer',
    }
};

type SolutionType = keyof typeof testimonials;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15,
    },
  },
};

const imageVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      delay: 0.4,
    },
  },
};

export default function Testimonial({ solutionType }: { solutionType: SolutionType }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const testimonial = testimonials[solutionType] || testimonials.cloud;

  return (
    <div ref={ref} className="bg-[#FEF9F2] py-24 px-[9%] overflow-hidden">
      <motion.div
        className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.div className="relative w-1/3 flex items-center justify-center" variants={imageVariants}>
          <div className="relative w-[340px] h-[340px] flex items-center justify-center">
            <div className="absolute -inset-8">
                 <motion.svg 
                    viewBox="0 0 400 400" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={ isInView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                >
                    <circle cx="200" cy="200" r="110" fill="white" stroke="#F5D34A" strokeWidth="20"/>
                    <circle cx="335" cy="269" r="35" fill="none" stroke="#F5D34A" strokeWidth="17"/>
                </motion.svg>
            </div>
            
            <div className="relative w-[180px] h-[180px] rounded-full overflow-hidden">
              <Image
                  src={testimonial.image}
                  alt={testimonial.author}
                  fill
                  className="object-cover"
                  data-ai-hint={testimonial.imageHint}
                  sizes="180px"
              />
            </div>
          </div>
        </motion.div>

        <motion.div className="w-full md:w-[60%] md:mr-[5%] flex flex-col justify-center" variants={itemVariants}>
            <div className="relative">
                <div className="absolute -left-8 -top-4">
                    <QuoteIcon />
                </div>
                <p className="text-xl text-zinc-800 leading-relaxed">
                    {testimonial.text}
                </p>
                <div className="absolute -right-8 -bottom-4 transform scale-y-[-1] scale-x-[-1]">
                    <QuoteIcon />
                </div>
            </div>

            <div className="mt-8">
                <p className="font-bold text-lg text-zinc-900">
                    {testimonial.author}
                </p>
                <p className="text-zinc-600">{testimonial.title}</p>
            </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
