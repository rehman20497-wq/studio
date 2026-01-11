
'use client';

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Facebook, Linkedin, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState, useRef } from "react";
import { motion, useInView } from 'framer-motion';
import { cn } from "@/lib/utils";

const HugoLogo = ({ className } : {className?: string}) => (
  <Image src="/tele.png" alt="Telesys Logo" width={160} height={40} className={cn("h-auto", className)} />
);

const SocialIcon = ({ href, icon: Icon }: { href: string, icon: React.ElementType }) => (
    <Link href={href} className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-black hover:bg-yellow-500 transition-colors">
        <Icon className="w-5 h-5" />
    </Link>
)

const solutions = [
    { name: "Cloud Solutions", href: "/providers?solution=cloud-solutions" },
    { name: "Communications", href: "/providers?solution=communications" },
    { name: "AI Solutions", href: "/providers?solution=ai-solutions" },
    { name: "Connectivity", href: "/providers?solution=connectivity" },
  ];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const slideFromLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const slideFromTop = {
  hidden: { y: -50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const slideFromRight = {
  hidden: { x: 100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const slideFromBottom = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const imageItemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
}


export default function FinalFooter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.footer 
      ref={ref}
      className="bg-[#fff9e6] py-16 px-[7%]"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="container mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pb-12 border-b border-zinc-200 mx-[4%]">
          <motion.div variants={slideFromLeft} className="flex flex-col items-center md:items-start mb-8 md:mb-0">
            <HugoLogo />
          </motion.div>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <motion.p variants={slideFromTop} className="text-[20px] text-zinc-800 font-normal text-base">Sign up to our newsletter and stay hip.</motion.p>
            <motion.div variants={slideFromRight} className="flex w-full md:w-auto bg-white rounded-full p-1 border border-zinc-200">
              <Input type="email" placeholder="Enter Email" className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent" />
              <Button className="rounded-full bg-cyan-300 text-black hover:bg-cyan-400">Sign Up</Button>
            </motion.div>
          </div>
        </div>

        {/* Middle Section */}
        <motion.div 
            className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12 mx-[4%]"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            <motion.div variants={slideFromLeft} className="hidden md:flex items-start gap-3">
                <SocialIcon href="#" icon={XIcon} />
                <SocialIcon href="#" icon={Facebook} />
                <SocialIcon href="#" icon={Linkedin} />
            </motion.div>

            <motion.div variants={slideFromTop}>
                <h3 className="font-bold text-zinc-900 mb-4 text-base">Solutions</h3>
                <ul className="space-y-3 text-zinc-700">
                    {solutions.map((solution) => (
                        <li key={solution.name} className="group">
                           <Link href={solution.href} className="text-base">
                                <span className="underline-draw">{solution.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </motion.div>
            <motion.div variants={slideFromBottom}>
                <h3 className="font-bold text-zinc-900 mb-4 text-base">Company</h3>
                <ul className="space-y-3 text-zinc-700">
                    <li className="group"><Link href="/about" className="text-base"><span className="underline-draw">About</span></Link></li>
                    <li className="group"><Link href="/careers" className="text-base"><span className="underline-draw">Careers</span></Link></li>
                    <li className="group"><Link href="/contact" className="text-base"><span className="underline-draw">Contact</span></Link></li>
                </ul>
            </motion.div>
            <motion.div variants={slideFromTop}>
                <h3 className="font-bold text-zinc-900 mb-4 text-base">Resources</h3>
                <ul className="space-y-3 text-zinc-700">
                    <li className="group"><Link href="/blogs" className="text-base"><span className="underline-draw">Resources</span></Link></li>
                    <li className="group"><Link href="/faq" className="text-base"><span className="underline-draw">FAQs</span></Link></li>
                </ul>
            </motion.div>
            <motion.div variants={slideFromBottom}>
                <h3 className="font-bold text-zinc-900 mb-4 text-base">Headquarters</h3>
                <p className="text-zinc-700 text-base">401 N Michigan Ave<br/>Chicago, IL 60611</p>
            </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div 
            className="flex flex-col md:flex-row justify-between items-center pt-8 mx-[10%]"
            variants={containerVariants}
        >
            <motion.div variants={slideFromLeft} className="text-zinc-600 text-[14px] mb-8 md:mb-0 text-center md:text-left">
                <p>© 2026 Copyright | All Rights Reserved</p>
                <p className="flex items-center justify-center md:justify-start">Made with 
                    <span className="text-red-500 mx-1">❤️</span> 
                Hugo and Griflan</p>
            </motion.div>
            <motion.div 
                className="flex flex-wrap items-center justify-center gap-4"
                variants={containerVariants}
            >
                <motion.div variants={imageItemVariant}>
                    <Image src="/l.svg" alt="ISO Certified" width={90} height={90} data-ai-hint="certification logo" />
                </motion.div>
                 <motion.div variants={imageItemVariant}>
                    <Image src="/l1.svg" alt="MBE Certified" width={90} height={90} data-ai-hint="certification logo" />
                </motion.div>
                 <motion.div variants={imageItemVariant}>
                    <Image src="/l2.png" alt="HIPAA Compliant" width={90} height={90} data-ai-hint="certification logo" />
                </motion.div>
                 <motion.div variants={imageItemVariant}>
                    <Image src="/l3.png" alt="AICPA SOC" width={90} height={90} data-ai-hint="certification logo" />
                </motion.div>
                <motion.div className="flex flex-col sm:flex-row gap-4 group" variants={slideFromBottom}>
                    <Link href="/privacy-policy" className="text-zinc-600 text-sm"><span className="underline-draw">Privacy Policy</span></Link>
                    <Link href="/terms-and-conditions" className="text-zinc-600 text-sm"><span className="underline-draw">Terms & Conditions</span></Link>
                </motion.div>
            </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
