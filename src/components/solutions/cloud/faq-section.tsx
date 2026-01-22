'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const faqData = [
  {
    question: 'How do you manage security?',
    answer: `We take security very seriously. We are ISO 27001 certified, SOC 2 certified, and GDPR compliant and follow industry best practices to protect our customers' data, including:<ul><li class='mt-2'><strong>Encryption:</strong> We encrypt all of our data at rest and in transit.</li><li class='mt-2'><strong>Access control:</strong> We only grant access to our data to authorized personnel.</li><li class='mt-2'><strong>Auditing:</strong> We regularly audit our security procedures to ensure that they are effective.</li></ul>`,
  },
  {
    question: 'Does Hugo provide flexible outsourcing contracts?',
    answer: "Absolutely. Hugo offers flexible, month-to-month call center outsourcing contracts that allow businesses to scale support teams up or down with just 24 hours' notice. This adaptability is ideal for seasonal campaigns, product launches, or rapid growth phases. Our flexible model keeps costs predictable while maintaining top-tier customer service.",
  },
  {
    question: 'What makes Hugo the best choice for outsourcing?',
    answer: "Hugo combines human expertise with rigorous processes to deliver unparalleled accuracy, efficiency, and scalability. Our industry-leading satisfaction rates, comprehensive security measures, and ability to handle complex, high-volume projects set us apart as the premium choice for outsourcing repetitive tasks. Moreover, Hugo has been recognized as the fastest-growing BPO company in the world for both 2023 and 2024 according to Clutch, demonstrating our commitment to excellence and our rapidly expanding capabilities in meeting diverse client needs.",
  },
  {
    question: 'Are there any additional costs, such as setup fees?',
    answer: 'No! Our outsourcing rates are fully transparent, and you will never be charged any hidden costs such as setup fees.',
  },
  {
    question: 'How is quality assessed and assured?',
    answer: "Hugo's highly-trained QA team actively supports your team by pulling agent tickets weekly and conducting ongoing coaching. We work with you to develop a custom action plan and create an SLA that outlines specific target metrics for each service area. Your Account Manager monitors performance, ensures we meet critical benchmarks, and maintains the agreed service level, all aimed at your complete satisfaction.",
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
            <h3 className="text-xl font-bold text-zinc-900 mb-3">{question}</h3>
            <div className="prose prose-zinc max-w-none text-zinc-700" dangerouslySetInnerHTML={{ __html: answer }} />
        </motion.div>
    );
};


export default function CloudFaqSection() {
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
                            <h2 className="text-5xl font-headline font-normal text-black leading-tight">
                                FAQs —<br />Customer Support
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
