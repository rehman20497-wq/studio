
'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    title: "Best BPO We've worked with",
    content:
      "With Hugo's assistance, we've been able to 3X our content output with almost 100% audio and video accuracy. Hugo ensures the content is up to standards, and we've been impressed with the ease of collaborating with the team.",
    companySize: '10,000+',
    designation: 'Head of Video Production',
    industry: 'Media',
  },
  {
    title: 'Hugo: Consistently Delivering Excellent Outcomes',
    content:
      "Thanks to Hugo, we've scaled our affiliate program to more than 800 global ambassadors. The team's work also helped reduce customer support tickets by 50% per month and response times to less than an hour. Overall, they stand out for their proactive approach, flexibility, and professionalism.",
    companySize: '11-50',
    designation: 'VP of Growth',
    industry: 'Gaming',
    featured: true,
  },
  {
    title: 'A Partner with Exceptional Understanding of Our Culture',
    content:
      "Hugo has provided strategies and solutions to significantly reduce ticket response times. The team's ability to cater to customers from diverse linguistic backgrounds makes the workflow seamless. Above all, we appreciate their flexibility, adaptability, and punctuality in meetings.",
    companySize: '51-200',
    designation: 'Customer Support Manager',
    industry: 'Food & Beverage',
  },
  {
    title: 'Unmatched Quality and Professionalism',
    content:
      'The quality of work and the professionalism of the Hugo team are unmatched. They have become an indispensable part of our operations, delivering excellence at every turn. Highly recommended for any company looking to scale effectively.',
    companySize: '1-10',
    designation: 'Founder & CEO',
    industry: 'eCommerce',
  },
  {
    title: 'Seamless Integration and Proactive Support',
    content:
      'Integrating with Hugo was seamless. Their team is not just reactive but proactive, always suggesting improvements and anticipating our needs. This has freed up our core team to focus on innovation.',
    companySize: '201-500',
    designation: 'COO',
    industry: 'SaaS',
  },
  {
    title: 'A True Extension of Our Team',
    content:
      'Hugo feels less like a vendor and more like a true extension of our team. Their dedication to our success is evident in their work, and the results speak for themselves. Our customer satisfaction has never been higher.',
    companySize: '1,001-5,000',
    designation: 'Director of Operations',
    industry: 'Fintech',
  },
];

const duplicatedTestimonials = [...testimonials, ...testimonials];

const TestimonialCard = ({ testimonial, featured = false }: { testimonial: (typeof testimonials)[0], featured?: boolean }) => (
  <div
    className={cn(
      'flex-shrink-0 w-[420px] h-[460px] rounded-2xl p-8 flex flex-col font-poppins transition-colors duration-300 group bg-[#abe9ef] hover:bg-cyan-200'
    )}
  >
    <div className="flex justify-between items-start">
      <div className="flex gap-1 text-black">
        {[...Array(5)].map((_, i) => (
          <Star key={i} fill="black" strokeWidth={0} className="w-5 h-5" />
        ))}
      </div>
      <Image src="/sound.svg" alt="Sound wave icon" width={24} height={24} />
    </div>
    <div className="flex-grow mt-6">
      <h3 className="text-xl font-bold text-black">{testimonial.title}</h3>
      <p className="mt-4 text-sm text-zinc-700 leading-6">
        {testimonial.content}
      </p>
    </div>
    <div>
      <p className="text-sm text-zinc-600 mt-4">
        Company Size: {testimonial.companySize}
      </p>
      <div className="border-t border-zinc-300 my-4"></div>
      <p className="font-bold text-sm text-black">{testimonial.designation}</p>
      <p className="text-sm text-zinc-600">Industry: {testimonial.industry}</p>
    </div>
  </div>
);

const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
        opacity: 1, 
        scale: 1,
        transition: {
            duration: 0.8,
            ease: [0.25, 1, 0.5, 1]
        }
    }
}

const marqueeVariants = {
    animate: {
      x: [0, '-100%'],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 70, 
          ease: 'linear',
        },
      },
    },
};

export default function CustomerStories() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="bg-white py-24 overflow-hidden">
      <motion.div
        className="relative"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div
            className="flex gap-8"
            variants={marqueeVariants}
            animate="animate"
        >
            {duplicatedTestimonials.map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} featured={testimonial.featured} />
            ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
