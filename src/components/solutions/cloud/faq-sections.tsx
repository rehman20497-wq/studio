'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const faqData = [
    {
      question: 'How does Telsys ensure communication security?',
      answer: `Security is our top priority. Telsys follows industry best practices and is ISO 27001 certified, SOC 2 certified, and GDPR compliant. Our measures include:
      <ul>
        <li class='mt-2'><strong>Encryption:</strong> All voice, video, and data transmissions are encrypted in transit and at rest.</li>
        <li class='mt-2'><strong>Access Control:</strong> Only authorized personnel have access to systems and sensitive data.</li>
        <li class='mt-2'><strong>Auditing:</strong> Regular audits ensure our security protocols remain effective and up-to-date.</li>
      </ul>`,
    },
    {
      question: 'Are Telsys communication solutions flexible?',
      answer:
        "Yes. Our communication platforms are designed to scale with your business. You can quickly add or adjust users, channels, and features to support seasonal campaigns, product launches, or rapid growth—all while keeping costs predictable.",
    },
    {
      question: 'Why choose Telsys for communication solutions?',
      answer:
        "Telsys combines cutting-edge communication technology with expert support to deliver reliable, secure, and high-performance solutions. From unified communications to cloud voice and customer engagement tools, we ensure your teams stay connected, responsive, and productive at all times.",
    },
    {
      question: 'Are there any additional costs?',
      answer:
        "No. Telsys solutions are fully transparent. You only pay for the services and resources you use—there are no setup fees or hidden charges.",
    },
    {
      question: 'How is quality monitored and assured?',
      answer:
        "Our dedicated support and monitoring teams continuously track system performance, optimize configurations, and provide proactive guidance. With regular reporting, performance benchmarks, and tailored SLAs, we ensure your communication environment operates reliably and efficiently.",
    },
  ];
  
  

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
};

const headingVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
    },
};

const faqCardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] },
    },
};

const FaqCard = ({ question, answer }: { question: string, answer: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    
    return (
        <motion.div
            ref={ref}
            className="bg-yellow-50/50 p-6 rounded-2xl border border-yellow-200/80"
            variants={faqCardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            <h3 className="text-bodySm
  sm:text-bodyMd
  lg:text-bodylg font-bold text-zinc-900 mb-3">{question}</h3>
            <div className="prose prose-zinc max-w-none text-zinc-700" dangerouslySetInnerHTML={{ __html: answer }} />
        </motion.div>
    );
};


export default function CloudFaqSections() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <motion.section
            ref={ref}
            className="bg-white pt-8 pb-24 px-4 sm:px-6 lg:px-8"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
        >
            <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12 lg:gap-16">
                {/* Left Sticky Column */}
                <div className="lg:col-span-1 lg:sticky top-28 self-start">
                    <motion.div variants={headingVariants} className="flex items-start gap-4">
                        <div>
                            <h2 className=" text-herooSm
  sm:text-herooMd
  lg:text-heroo font-headline font-normal text-black leading-tight">
                                FAQs —<br />Communication
                            </h2>
                        </div>
                        <Image src="/arr.png" alt="arrow" width={40} height={40} className="mt-2" />
                    </motion.div>
                </div>

                {/* Right Scrollable Column */}
                <motion.div
                    className="lg:col-span-2 space-y-4"
                    variants={{
                        visible: { transition: { staggerChildren: 0.2 } }
                    }}
                >
                    {faqData.map((faq, index) => (
                        <FaqCard key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
}
