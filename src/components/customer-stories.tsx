'use client';

import { useRef, useCallback, useEffect, useMemo } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    title: "Best BPO We've worked with",
    content:
      "With TelSys's assistance, we've been able to 3X our content output with almost 100% audio and video accuracy. TelSys ensures the content is up to standards, and we've been impressed with the ease of collaborating with the team.",
    companySize: '10,000+',
    designation: 'Head of Video Production',
    industry: 'Media',
  },
  {
    title: 'TelSys: Consistently Delivering Excellent Outcomes',
    content:
      "Thanks to TelSys, we've scaled our affiliate program to more than 800 global ambassadors. The team's work also helped reduce customer support tickets by 50% per month and response times to less than an hour. Overall, they stand out for their proactive approach, flexibility, and professionalism.",
    companySize: '11-50',
    designation: 'VP of Growth',
    industry: 'Gaming',
  },
  {
    title: 'A Partner with Exceptional Understanding of Our Culture',
    content:
      "TelSys has provided strategies and solutions to significantly reduce ticket response times. The team's ability to cater to customers from diverse linguistic backgrounds makes the workflow seamless. Above all, we appreciate their flexibility, adaptability, and punctuality in meetings.",
    companySize: '51-200',
    designation: 'Customer Support Manager',
    industry: 'Food & Beverage',
  },
  {
    title: 'Unmatched Quality and Professionalism',
    content:
      'The quality of work and the professionalism of the TelSys team are unmatched. They have become an indispensable part of our operations, delivering excellence at every turn. Highly recommended for any company looking to scale effectively.',
    companySize: '1-10',
    designation: 'Founder & CEO',
    industry: 'eCommerce',
  },
  {
    title: 'Seamless Integration and Proactive Support',
    content:
      'Integrating with TelSys was seamless. Their team is not just reactive but proactive, always suggesting improvements and anticipating our needs. This has freed up our core team to focus on innovation.',
    companySize: '201-500',
    designation: 'COO',
    industry: 'SaaS',
  },
  {
    title: 'A True Extension of Our Team',
    content:
      'TelSys feels less like a vendor and more like a true extension of our team. Their dedication to our success is evident in their work, and the results speak for themselves. Our customer satisfaction has never been higher.',
    companySize: '1,001-5,000',
    designation: 'Director of Operations',
    industry: 'Fintech',
  },
];

const TestimonialCard = ({ testimonial }: { testimonial: (typeof testimonials)[0] }) => (
  <div className="h-full rounded-2xl p-8 flex flex-col font-poppins transition-colors duration-300 bg-[#abe9ef]/50 hover:bg-cyan-200">
    <div className="flex justify-between items-start">
      <div className="flex gap-1 text-black">
        {[...Array(5)].map((_, i) => (
          <Star key={i} fill="black" strokeWidth={0} className="w-5 h-5" />
        ))}
      </div>
      <Image src="/sound.png" alt="Sound wave icon" width={24} height={24} />
    </div>

    <div className="flex-grow mt-5">
      <h3 className="text-xl font-normal font-headline text-black">{testimonial.title}</h3>
      <p className="mt-4 text-[13px] text-zinc-700 leading-6">{testimonial.content}</p>
    </div>

    <div>
      <p className="text-sm text-zinc-600 mt-4">
        Company Size: {testimonial.companySize}
      </p>
      <div className="border-t border-zinc-300 my-4" />
      <p className="font-bold text-sm text-black">{testimonial.designation}</p>
      <p className="text-sm text-zinc-600">Industry: {testimonial.industry}</p>
    </div>
  </div>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 0.3 },
  },
};

const arrowsVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5,
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const marqueeVariants = {
  animate: {
    x: ['0%', '-50%'],
    transition: {
      repeat: Infinity,
      repeatType: 'loop',
      duration: 35,
      ease: 'linear',
    },
  },
};

export default function CustomerStories() {
  const sectionRef = useRef(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const infiniteTestimonials = useMemo(
    () => [...testimonials, ...testimonials],
    []
  );

  useEffect(() => {
    controls.start('animate');
  }, [controls]);

  const scrollPrev = useCallback(() => {
    marqueeRef.current?.scrollBy({ left: -420, behavior: 'smooth' });
  }, []);

  const scrollNext = useCallback(() => {
    marqueeRef.current?.scrollBy({ left: 420, behavior: 'smooth' });
  }, []);

  return (
    <section ref={sectionRef} className="bg-white pb-12 md:pb-[4%] overflow-hidden relative">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <div
          ref={marqueeRef}
          className="overflow-x-hidden"
          onMouseEnter={() => controls.stop()}
          onMouseLeave={() => controls.start('animate')}
        >
          <motion.div
            className="flex -ml-8"
            variants={marqueeVariants}
            animate={controls}
          >
            {infiniteTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-[0_0_90%] sm:flex-[0_0_420px] pl-8"
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div 
        className="absolute bottom-[16px] right-4 md:bottom-[28px] md:right-8 flex gap-2 z-10"
        variants={arrowsVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <Button
          size="icon"
          onClick={scrollPrev}
          className="bg-cyan-300/80 hover:bg-cyan-400 text-black rounded-full shadow-lg h-12 w-12"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>

        <Button
          size="icon"
          onClick={scrollNext}
          className="bg-cyan-300/80 hover:bg-cyan-400 text-black rounded-full shadow-lg h-12 w-12"
        >
          <ArrowRight className="w-6 h-6" />
        </Button>
      </motion.div>
    </section>
  );
}
