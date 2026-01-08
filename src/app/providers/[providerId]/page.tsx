'use client';

import Header from "@/components/layout/header";
import Hero from "@/components/single-provider/hero";
import Details from "@/components/single-provider/details";
import Testimonial from "@/components/single-provider/testimonial";

// Mock data for a single provider
const providerData = {
  id: 'provider-a',
  name: 'Stellar Cloud Services',
  solutions: ['cloud', 'ai'],
  description: 'Stellar Cloud Services is a leading provider of scalable and secure cloud infrastructure. Our platform is built for performance, offering a suite of tools for startups and enterprise clients to deploy, manage, and scale their applications with ease. We are committed to innovation and providing a 99.99% uptime guarantee.',
  bannerImage: 'https://picsum.photos/seed/stellar-banner/800/600',
  solutionType: 'cloud', // Primary solution type for hero/testimonial
};

export default function SingleProviderPage() {
  return (
    <div className="bg-[#FCFBF8]">
      <Header />
      <main>
        <Hero 
          solutionType={providerData.solutionType} 
        />
        <Details
          solutions={providerData.solutions}
          description={providerData.description}
          bannerImage={providerData.bannerImage}
        />
        <Testimonial 
          solutionType={providerData.solutionType} 
        />
      </main>
    </div>
  );
}
