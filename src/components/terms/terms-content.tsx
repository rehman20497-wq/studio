
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FileText, Shield, Users, Globe, Lock, Mail, Scale } from 'lucide-react';

const termsData = [
    {
      icon: FileText,
      title: '1. Introduction',
      content: 'These Terms and Conditions govern your use of our website and services. By accessing or using our service, you agree to be bound by these terms. If you disagree with any part of the terms, then you may not access the service.',
    },
    {
      icon: Users,
      title: '2. User Responsibilities',
      content: 'You are responsible for your conduct and any data, text, information, or other materials that you submit, post, and display on our services. You must not misuse the services by interfering with their normal operation, or attempting to access them using a method other than through the interfaces and instructions that we provide.',
    },
    {
      icon: Shield,
      title: '3. Intellectual Property',
      content: 'The Service and its original content, features, and functionality are and will remain the exclusive property of our company and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks may not be used in connection with any product or service without our prior written consent.',
    },
    {
      icon: Lock,
      title: '4. Termination',
      content: 'We may terminate or suspend your access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.',
    },
    {
        icon: Scale,
        title: '5. Disclaimer of Warranties',
        content: 'Our Service is provided "AS IS" and "AS AVAILABLE", without any warranties of any kind, express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the service will be uninterrupted, secure, or error-free.',
    },
    {
      icon: Globe,
      title: '6. Governing Law',
      content: 'These Terms shall be governed and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.',
    },
];

const Section = ({ icon: Icon, title, content }: (typeof termsData)[0]) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.4 });

    return (
        <motion.div 
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="flex items-start gap-8 p-8 bg-white/50 border border-zinc-200/80 rounded-2xl shadow-lg hover:shadow-2xl hover:border-cyan-300 transition-all duration-300 group"
        >
            <div className="w-16 h-16 bg-cyan-100 rounded-full flex-shrink-0 flex items-center justify-center group-hover:bg-cyan-200 transition-colors">
                <Icon className="w-8 h-8 text-cyan-600" />
            </div>
            <div>
                <h2 className="text-3xl font-bold font-headline text-zinc-800 mb-2">{title}</h2>
                <p className="text-zinc-600 leading-relaxed">{content}</p>
            </div>
        </motion.div>
    );
};

export default function TermsContent() {
    return (
        <section className="py-24 px-[6%] bg-[#FCFBF8]">
            <div className="max-w-4xl mx-auto space-y-12">
                {termsData.map((section, index) => (
                    <Section key={index} {...section} />
                ))}
            </div>
        </section>
    )
}
