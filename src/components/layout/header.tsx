
"use client";

import React, { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  BookOpen,
  MessageSquareQuestion,
  Building,
  Briefcase,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";
import Link from "next/link";


const HugoLogo = ({ className } : {className?: string}) => (
  <Image src="/log.png" alt="Hugo Logo" width={80} height={28} className={className} />
);

const CloseIcon = ({ className }: { className?: string }) => (
    <svg className={className} width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="50" fill="black"/>
        <path d="M35 35L65 65" stroke="white" strokeWidth="5" strokeLinecap="round"/>
        <path d="M65 35L35 65" stroke="white" strokeWidth="5" strokeLinecap="round"/>
    </svg>
);

const solutions = [
    {
      icon: Building,
      title: "All Providers",
      href: "/providers",
    },
];
const company = [
  { title: "About", href: "/about", icon: Building },
  { title: "Careers", href: "/careers", icon: Briefcase },
];
const resources = [
    { title: "Articles", href: "/blogs", icon: '/news.svg', isImage: true },
    { title: "FAQs", href: "/faq", icon: MessageSquareQuestion, isImage: false },
];

const mobileNavItems = [
    { title: "Providers", href: "/providers", icon: Building, isImage: false },
    { title: "About", href: "/about", icon: Building, isImage: false },
    { title: "Careers", href: "/careers", icon: Briefcase, isImage: false },
    { title: "Articles", href: "/blogs", icon: '/news.svg', isImage: true },
    { title: "FAQs", href: "/faq", icon: MessageSquareQuestion, isImage: false },
]

export default function Header() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="w-full bg-[#FCFBF8] text-zinc-900 font-body">
      <div className="bg-[#F5D34A]/80 w-full text-center p-2 text-sm">
        Hugo is hiring! Explore our positions and{" "}
        <a href="/careers" className="underline hover:opacity-80">
          apply today
        </a>
        .
      </div>
      <div className="w-full px-[4%] flex items-center justify-between py-4">
        <Link href="/" aria-label="Hugo logo">
          <HugoLogo />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {isMounted && (
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="relative w-[250px] rounded-lg border-2 border-yellow-300 bg-[#FEF9F2] p-2 border-glow">
                      <ul className="flex flex-col gap-1">
                        {solutions.map((item) => (
                          <li key={item.title}>
                            <NavigationMenuLink asChild>
                              <a
                                href={item.href}
                                className="flex items-center gap-3 p-3 rounded-md hover:bg-yellow-100/50"
                              >
                                <item.icon className="w-5 h-5 text-zinc-600" />
                                <span className="font-medium text-sm">
                                  {item.title}
                                </span>
                              </a>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Company</NavigationMenuTrigger>
                  <NavigationMenuContent>
                     <div className="relative w-[200px] rounded-lg border-2 border-yellow-300 bg-[#FEF9F2] p-2 border-glow">
                      <ul className="space-y-1">
                        {company.map((item) => (
                           <li key={item.title}>
                             <NavigationMenuLink asChild>
                               <a href={item.href} className="flex items-center gap-3 p-3 rounded-md hover:bg-yellow-100/50">
                                 <item.icon className="w-5 h-5 text-zinc-600" />
                                 <span className="font-medium text-sm">{item.title}</span>
                               </a>
                             </NavigationMenuLink>
                           </li>
                        ))}
                      </ul>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                     <div className="relative w-[200px] rounded-lg border-2 border-yellow-300 bg-[#FEF9F2] p-2 border-glow">
                      <ul className="space-y-1">
                        {resources.map((item) => (
                           <li key={item.title}>
                             <NavigationMenuLink asChild>
                               <a href={item.href} className="flex items-center gap-3 p-3 rounded-md hover:bg-yellow-100/50">
                                  {item.isImage ? (
                                    <Image src={item.icon as string} alt={`${item.title} icon`} width={20} height={20} className="text-zinc-600" />
                                  ) : (
                                    React.createElement(item.icon, { className: "w-5 h-5 text-zinc-600" })
                                  )}
                                 <span className="font-medium text-sm">{item.title}</span>
                               </a>
                             </NavigationMenuLink>
                           </li>
                        ))}
                      </ul>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          )}
        </div>
        <div className="hidden md:block">
            <Button asChild className="rounded-full bg-zinc-900 text-white hover:bg-zinc-800 px-6">
                <Link href="/contact">Get Started</Link>
            </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-transparent focus-visible:bg-transparent active:bg-transparent h-auto w-auto">
                <Image src="/ham.gif" alt="menu" width={65} height={65} unoptimized />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="p-0 bg-transparent border-none">
                <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
                <div className="bg-[#F5D34A] h-[90px] px-[4%] flex items-center justify-between">
                    <Link href="/" aria-label="Hugo logo">
                        <HugoLogo />
                    </Link>
                    <SheetClose asChild>
                        <button className="h-10 w-10">
                            <CloseIcon className="w-10 h-10" />
                            <span className="sr-only">Close menu</span>
                        </button>
                    </SheetClose>
                </div>
                <div className="bg-[#FEF9F2] px-6 pt-8 h-[calc(100vh-90px)] flex flex-col">
                     <Accordion type="multiple" className="w-full flex-grow">
                         {mobileNavItems.map(item => (
                            <AccordionItem value={item.title} key={item.title} className="border-b border-yellow-200">
                                <Link href={item.href} className="flex items-center gap-4 w-full py-4 text-3xl font-normal">
                                    {item.isImage ? (
                                      <Image src={item.icon as string} alt={`${item.title} icon`} width={32} height={32} />
                                    ) : (
                                      React.createElement(item.icon, { className: "w-8 h-8" })
                                    )}
                                    {item.title}
                                </Link>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <div className="relative -mx-6 mt-auto">
                        <div className="bg-[#F5D34A] rounded-t-[40px] pt-12 pb-8 px-6 text-center">
                            <h3 className="text-4xl font-normal">Book a Demo</h3>
                             <div className="relative inline-block my-2">
                                <span className="absolute inset-x-0 bottom-0 h-1.5 bg-black"></span>
                            </div>
                            <Button asChild className="rounded-full bg-black text-white hover:bg-zinc-800 px-8 py-6 text-lg mt-4 w-full">
                                <Link href="/contact">Get Started</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
