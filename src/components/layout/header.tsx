
"use client";

import React, { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Home,
  Building,
  Briefcase,
  BookOpen,
  Newspaper,
  MessageCircleQuestion,
  Cloud,
  Wifi,
  Cpu,
  Zap
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import Image from "next/image";
import Link from "next/link";


const HugoLogo = ({ className } : {className?: string}) => (
  <Image src="/log.png" alt="Hugo Logo" width={160} height={160} className={className} />
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
      title: "Cloud Solutions",
      href: "/providers?solution=cloud-solutions",
      icon: Cloud,
      description: "Scalable and secure cloud infrastructure."
    },
    {
      title: "Communications",
      href: "/providers?solution=communications",
      icon: Wifi,
      description: "Seamless, high-quality communication platforms."
    },
    {
      title: "AI Solutions",
      href: "/providers?solution=ai-solutions",
      icon: Cpu,
      description: "Harnessing the power of Artificial Intelligence."
    },
    {
      title: "Connectivity",
      href: "/providers?solution=connectivity",
      icon: Zap,
      description: "Fast, stable, and secure connectivity."
    },
];
const company = [
  { title: "About", href: "/about", icon: Building },
  { title: "Careers", href: "/careers", icon: Briefcase },
];
const resources = [
    { title: "Articles", href: "/blogs", icon: '/news.svg', isImage: true },
    { title: "FAQs", href: "/faq", icon: '/faq.png', isImage: true },
];

const mobileNavItems = [
    { title: "Home", href: "/", icon: Home, isImage: false },
    { title: "Providers", href: "/providers", icon: Building, isImage: false },
    { title: "About", href: "/about", icon: Building, isImage: false },
    { title: "Careers", href: "/careers", icon: Briefcase, isImage: false },
    { title: "Articles", href: "/blogs", icon: '/news.svg', isImage: true },
    { title: "FAQs", href: "/faq", icon: '/faq.png', isImage: true },
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
        <Link href="/">
          <HugoLogo />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          {isMounted && (
            <NavigationMenu>
              <NavigationMenuList className="group">
                <NavigationMenuItem className="group">
                  <Link href="/" passHref>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "group-hover:blur-sm transition-all duration-300 hover:!blur-none")}>
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="group">
                  <NavigationMenuTrigger className="group-hover:blur-sm transition-all duration-300 hover:!blur-none">Solutions</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="relative w-[550px] rounded-lg border-2 border-yellow-300 bg-[#FEF9F2] p-4 border-glow">
                      <ul className="grid grid-cols-2 gap-4">
                        {solutions.map((item) => (
                          <li key={item.title}>
                            <NavigationMenuLink asChild>
                              <a
                                href={item.href}
                                className="flex flex-col justify-center p-4 rounded-md hover:bg-yellow-100/50 h-full"
                              >
                                <div className="flex items-center gap-3">
                                  {item.icon && React.createElement(item.icon, { className: "w-5 h-5 text-zinc-600" })}
                                  <span className="font-medium text-sm">
                                    {item.title}
                                  </span>
                                </div>
                                <p className="text-sm text-zinc-500 mt-1 ml-8">{item.description}</p>
                              </a>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                 <NavigationMenuItem className="group">
                  <Link href="/providers" passHref>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "group-hover:blur-sm transition-all duration-300 hover:!blur-none")}>
                      Providers
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="group">
                  <NavigationMenuTrigger className="group-hover:blur-sm transition-all duration-300 hover:!blur-none">Company</NavigationMenuTrigger>
                  <NavigationMenuContent>
                     <div className="relative w-[200px] rounded-lg border-2 border-yellow-300 bg-[#FEF9F2] p-2 border-glow">
                      <ul className="space-y-1">
                        {company.map((item) => (
                           <li key={item.title}>
                             <NavigationMenuLink asChild>
                               <a href={item.href} className="flex items-center gap-3 p-3 rounded-md hover:bg-yellow-100/50">
                                 {item.icon && React.createElement(item.icon, { className: "w-5 h-5 text-zinc-600" })}
                                 <span className="font-medium text-sm">{item.title}</span>
                               </a>
                             </NavigationMenuLink>
                           </li>
                        ))}
                      </ul>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem className="group">
                  <NavigationMenuTrigger className="group-hover:blur-sm transition-all duration-300 hover:!blur-none">Resources</NavigationMenuTrigger>
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
                                    item.icon && React.createElement(item.icon as React.ElementType, { className: "w-5 h-5 text-zinc-600" })
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
            <Button asChild className="rounded-full bg-zinc-900 text-white hover:bg-zinc-800 px-6 group-hover:blur-sm transition-all duration-300 hover:!blur-none">
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
                    <Link href="/">
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
                                      item.icon && React.createElement(item.icon as React.ElementType, { className: "w-8 h-8" })
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
