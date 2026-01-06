
'use client';

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Facebook, Linkedin, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";

const HugoLogo = () => (
    <svg
      width="110"
      height="38"
      viewBox="0 0 80 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.674 19.5742V8.56641H8.71074V19.5742H13.674Z"
        fill="black"
      />
      <path
        d="M21.5796 19.5742V8.56641H16.6164V19.5742H21.5796Z"
        fill="black"
      />
      <path
        d="M29.5891 19.5742V8.56641H24.6259V19.5742H29.5891Z"
        fill="black"
      />
      <path
        d="M37.5458 19.5742V8.56641H32.5826V19.5742H37.5458Z"
        fill="black"
      />
      <path
        d="M48.2434 23.3672C43.9113 23.3672 41.5173 20.3164 40.3541 15.5234H56.033C55.9804 15.1445 55.7173 12.8359 55.7173 12.7832C55.0854 9.67969 52.3217 6.68164 48.2434 6.68164C42.4831 6.68164 38.8985 11.2617 38.8985 15.0273C38.8985 18.793 42.4831 23.3672 48.2434 23.3672ZM48.2434 8.51367C50.6901 8.51367 52.4266 10.1992 53.0585 12.4551H43.4284C44.0604 10.1992 45.797 8.51367 48.2434 8.51367Z"
        fill="black"
      />
      <path
        d="M59.1831 19.5742V8.56641H54.2199V19.5742H59.1831Z"
        fill="black"
      />
      <path
        d="M62.3387 14.0703C62.3387 9.87109 64.9754 6.68164 69.3075 6.68164C73.6396 6.68164 76.2763 9.87109 76.2763 14.0703C76.2763 18.2695 73.6396 21.459 69.3075 21.459C64.9754 21.459 62.3387 18.2695 62.3387 14.0703ZM71.3134 14.0703C71.3134 11.2617 70.3026 8.56641 69.3075 8.56641C68.3124 8.56641 67.3016 11.2617 67.3016 14.0703C67.3016 16.8789 68.3124 19.5742 69.3075 19.5742C70.3026 19.5742 71.3134 16.8789 71.3134 14.0703Z"
        fill="black"
      />
    </svg>
  );

const SocialIcon = ({ href, icon: Icon }: { href: string, icon: React.ElementType }) => (
    <Link href={href} className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-black hover:bg-yellow-500 transition-colors">
        <Icon className="w-5 h-5" />
    </Link>
)

const solutions = [
    { 
        name: 'Customer Support',
        submenu: [
            { name: 'General Support', href: '#' },
            { name: 'Call Center Outsourcing', href: '#' },
            { name: 'Live Chat Support Outsourcing', href: '#' },
            { name: 'Email Support Outsourcing', href: '#' },
        ]
    },
    { 
        name: 'Digital Operations', 
        submenu: [
            { name: 'Back Office Support', href: '#' },
            { name: 'Data Entry', href: '#' },
            { name: 'E-commerce Support', href: '#' },
        ]
    },
    { 
        name: 'Trust & Safety', 
        submenu: [
            { name: 'Content Moderation', href: '#' },
            { name: 'Fraud Detection', href: '#' },
            { name: 'User Verification', href: '#' },
        ]
    },
    { 
        name: 'Data & AI', 
        submenu: [
            { name: 'Data Annotation', href: '#' },
            { name: 'AI Model Training', href: '#' },
            { name: 'Data Validation', href: '#' },
        ]
    },
]

const HoverPopover = ({
    trigger,
    children
}: {
    trigger: React.ReactNode,
    children: React.ReactNode
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <div onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
                    {trigger}
                </div>
            </PopoverTrigger>
            <PopoverContent 
              className="w-64 bg-white p-4 rounded-lg shadow-lg border-4 border-yellow-400"
              onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}
              side="right"
              align="start"
              sideOffset={-40}
            >
                {children}
            </PopoverContent>
        </Popover>
    );
};


export default function FinalFooter() {
  return (
    <footer className="bg-[#fff9e6] py-16 px-[7%]">
      <div className="container mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pb-12 border-b border-zinc-200 mx-[4%]">
          <div className="flex flex-col items-center md:items-start mb-8 md:mb-0">
            <HugoLogo />
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="text-zinc-800 font-medium">Sign up to our newsletter and stay hip.</p>
            <div className="flex w-full md:w-auto bg-white rounded-full p-1 border border-zinc-200">
              <Input type="email" placeholder="Enter Email" className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent" />
              <Button className="rounded-full bg-cyan-300 text-black hover:bg-cyan-400">Sign Up</Button>
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12 mx-[4%]">
            <div className="hidden md:flex items-start gap-3">
                <SocialIcon href="#" icon={XIcon} />
                <SocialIcon href="#" icon={Facebook} />
                <SocialIcon href="#" icon={Linkedin} />
            </div>

            <div>
                <h3 className="font-bold text-zinc-900 mb-4">Solutions</h3>
                <ul className="space-y-3 text-zinc-700">
                    {solutions.map((solution) => (
                        <li key={solution.name}>
                            {solution.submenu ? (
                                <HoverPopover
                                    trigger={
                                        <Link href="#" className="hover:underline flex items-center">
                                            {solution.name} <ChevronRight className="w-4 h-4 ml-1" />
                                        </Link>
                                    }
                                >
                                    <ul className="space-y-3">
                                        {solution.submenu.map(item => (
                                            <li key={item.name}>
                                                <Link href={item.href} className="hover:underline text-sm">{item.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </HoverPopover>
                            ) : (
                                <Link href={'#'} className="hover:underline flex items-center">
                                    {solution.name} <ChevronRight className="w-4 h-4 ml-1" />
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3 className="font-bold text-zinc-900 mb-4">Company</h3>
                <ul className="space-y-3 text-zinc-700">
                    <li><Link href="#" className="hover:underline">About</Link></li>
                    <li><Link href="#" className="hover:underline">Careers</Link></li>
                    <li><Link href="#" className="hover:underline">Contact</Link></li>
                </ul>
            </div>
            <div>
                <h3 className="font-bold text-zinc-900 mb-4">Resources</h3>
                <ul className="space-y-3 text-zinc-700">
                    <li><Link href="#" className="hover:underline">Resources</Link></li>
                    <li><Link href="#" className="hover:underline">FAQs</Link></li>
                </ul>
            </div>
            <div>
                <h3 className="font-bold text-zinc-900 mb-4">Headquarters</h3>
                <p className="text-zinc-700">401 N Michigan Ave<br/>Chicago, IL 60611</p>
            </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 mx-[10%]">
            <div className="text-zinc-600 text-sm mb-8 md:mb-0 text-center md:text-left">
                <p>© 2026 Copyright | All Rights Reserved</p>
                <p className="flex items-center justify-center md:justify-start">Made with 
                    <span className="text-red-500 mx-1">❤️</span> 
                Hugo and Griflan</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
                <Image src="/l.png" alt="ISO Certified" width={80} height={80} data-ai-hint="certification logo" />
                <Image src="/l1.png" alt="MBE Certified" width={80} height={80} data-ai-hint="certification logo" />
                <Image src="/l2.png" alt="HIPAA Compliant" width={80} height={80} data-ai-hint="certification logo" />
                <Image src="/l3.png" alt="AICPA SOC" width={80} height={80} data-ai-hint="certification logo" />
                <Link href="#" className="text-zinc-600 hover:underline text-sm ml-4">Privacy Policy</Link>
            </div>
        </div>
      </div>
    </footer>
  );
}
