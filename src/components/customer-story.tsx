'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    title: "Best BPO We've worked with",
    content:
      "With Telsys's assistance, we've been able to 3X our content output with almost 100% audio and video accuracy. TelSys ensures the content is up to standards, and we've been impressed with the ease of collaborating with the team.",
    companySize: '10,000+',
    designation: 'Head of Video Production',
    industry: 'Media',
  },
  {
    title: 'Telsys: Consistently Delivering Excellent Outcomes',
    content:
      "Thanks to Telsys, we've scaled our affiliate program to more than 800 global ambassadors. The team's work also helped reduce customer support tickets by 50% per month and response times to less than an hour. Overall, they stand out for their proactive approach, flexibility, and professionalism.",
    companySize: '11-50',
    designation: 'VP of Growth',
    industry: 'Gaming',
    featured: true,
  },
  {
    title: 'A Partner with Exceptional Understanding of Our Culture',
    content:
      "Telsys has provided strategies and solutions to significantly reduce ticket response times. The team's ability to cater to customers from diverse linguistic backgrounds makes the workflow seamless. Above all, we appreciate their flexibility, adaptability, and punctuality in meetings.",
    companySize: '51-200',
    designation: 'Customer Support Manager',
    industry: 'Food & Beverage',
  },
  {
    title: 'Unmatched Quality and Professionalism',
    content:
      'The quality of work and the professionalism of the Telsys team are unmatched. They have become an indispensable part of our operations, delivering excellence at every turn. Highly recommended for any company looking to scale effectively.',
    companySize: '1-10',
    designation: 'Founder & CEO',
    industry: 'eCommerce',
  },
  {
    title: 'Seamless Integration and Proactive Support',
    content:
      'Integrating with Telsys was seamless. Their team is not just reactive but proactive, always suggesting improvements and anticipating our needs. This has freed up our core team to focus on innovation.',
    companySize: '201-500',
    designation: 'COO',
    industry: 'SaaS',
  },
  {
    title: 'A True Extension of Our Team',
    content:
      'Telsys feels less like a vendor and more like a true extension of our team. Their dedication to our success is evident in their work, and the results speak for themselves. Our customer satisfaction has never been higher.',
    companySize: '1,001-5,000',
    designation: 'Director of Operations',
    industry: 'Fintech',
  },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1]
    }
  }
};

const TestimonialCard = ({ testimonial, featured = false }: { testimonial: (typeof testimonials)[0], featured?: boolean }) => (
  <motion.div
    variants={cardVariants}
    className={cn(
      'w-full h-full rounded-2xl p-8 flex flex-col font-poppins transition-colors duration-300 bg-[#abe9ef]/50 hover:bg-cyan-200'
    )}
  >
    <div className="flex justify-between items-start">
      <div className="flex gap-1 text-black">
        {[...Array(5)].map((_, i) => (
          <Star key={i} fill="black" strokeWidth={0} className="w-5 h-5" />
        ))}
      </div>
      <Image src="/sound.png" alt="Sound wave icon" width={24} height={24} />
    </div>
    <div className="flex-grow mt-5 flex flex-col">
      <h3 className="text-bodySm
  sm:text-bodyMd
  lg:text-bodylg font-normal font-headline text-black">{testimonial.title}</h3>
      <p className="mt-4 text-testimonialReview text-black leading-6 flex-grow">
        {testimonial.content}
      </p>
    </div>
    <div>
      <p className="text-testimonialReview text-black mt-4">
        Company Size: {testimonial.companySize}
      </p>
      <div className="border-t border-zinc-300 my-4"></div>
      <p className="font-bold text-testimonialReview text-black">{testimonial.designation}</p>
      <p className="text-testimonialReview text-black">Industry: {testimonial.industry}</p>
    </div>
  </motion.div>
);

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        }
    }
};

export default function CustomerStory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
      Autoplay({ playOnInit: true, delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
  ]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  return (
    <section ref={ref} className="bg-white pb-16 px-4 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative"
      >
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="pl-4 flex-[0_0_90%] sm:flex-[0_0_50%] md:flex-[0_0_40%] lg:flex-[0_0_33.33%]">
                <TestimonialCard testimonial={testimonial} featured={testimonial.featured} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end items-center gap-4 mt-8 pr-4">
            <button onClick={scrollPrev} className="bg-black text-white rounded-full p-3 hover:bg-zinc-800 transition-colors">
                <ArrowLeft className="w-5 h-5" />
            </button>
            <button onClick={scrollNext} className="bg-black text-white rounded-full p-3 hover:bg-zinc-800 transition-colors">
                <ArrowRight className="w-5 h-5" />
            </button>
        </div>
      </motion.div>
    </section>
  );
}
