
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FileText, Shield, Users, Globe, Lock, Mail } from 'lucide-react';

const policyData = [
    {
      icon: FileText,
      title: 'Introduction',
      content: 'Welcome to our Privacy Policy. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.',
    },
    {
      icon: Shield,
      title: 'Information We Collect',
      content: 'We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website, or otherwise when you contact us. The personal information that we collect depends on the context of your interactions with us and the website, the choices you make, and the products and features you use.',
    },
    {
      icon: Users,
      title: 'How We Use Your Information',
      content: 'We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.',
    },
    {
      icon: Globe,
      title: 'Will Your Information Be Shared?',
      content: 'We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis: Consent, Legitimate Interests, Performance of a Contract, or Legal Obligations.',
    },
    {
      icon: Lock,
      title: 'How We Keep Your Information Safe',
      content: 'We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.',
    },
    {
      icon: Mail,
      title: 'Contact Us',
      content: 'If you have questions or comments about this policy, you may email us at privacy@telesys.com or by post to: 401 N Michigan Ave, Chicago, IL 60611.',
    },
];

const Section = ({ icon: Icon, title, content }: (typeof policyData)[0]) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.4 });

    return (
        <motion.div 
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="flex items-start gap-8 p-8 bg-white/50 border border-zinc-200/80 rounded-2xl shadow-lg hover:shadow-2xl hover:border-yellow-300 transition-all duration-300 group"
        >
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex-shrink-0 flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                <Icon className="w-8 h-8 text-yellow-600" />
            </div>
            <div>
                <h2 className="text-3xl font-bold font-headline text-zinc-800 mb-2">{title}</h2>
                <p className="text-zinc-600 leading-relaxed">{content}</p>
            </div>
        </motion.div>
    );
};

export default function PolicyContent() {
    return (
        <section className="py-24 px-[6%] bg-[#FCFBF8]">
            <div className="max-w-4xl mx-auto space-y-12">
                {policyData.map((section, index) => (
                    <Section key={index} {...section} />
                ))}
            </div>
        </section>
    )
}
