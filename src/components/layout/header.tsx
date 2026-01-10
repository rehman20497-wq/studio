
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
  ChevronRight,
  CircuitBoard,
  Cpu,
  LayoutGrid,
  ShieldCheck,
  Wifi,
  ChevronDown,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-stone-100 focus:bg-stone-100",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-stone-500">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const HugoLogo = ({ className } : {className?: string}) => (
  <svg
    width="80"
    height="28"
    viewBox="0 0 80 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M13.674 19.5742V8.56641H8.71074V19.5742H13.674Z"
      fill="currentColor"
    />
    <path
      d="M21.5796 19.5742V8.56641H16.6164V19.5742H21.5796Z"
      fill="currentColor"
    />
    <path
      d="M29.5891 19.5742V8.56641H24.6259V19.5742H29.5891Z"
      fill="currentColor"
    />
    <path
      d="M37.5458 19.5742V8.56641H32.5826V19.5742H37.5458Z"
      fill="currentColor"
    />
    <path
      d="M48.2434 23.3672C43.9113 23.3672 41.5173 20.3164 40.3541 15.5234H56.033C55.9804 15.1445 55.7173 12.8359 55.7173 12.7832C55.0854 9.67969 52.3217 6.68164 48.2434 6.68164C42.4831 6.68164 38.8985 11.2617 38.8985 15.0273C38.8985 18.793 42.4831 23.3672 48.2434 23.3672ZM48.2434 8.51367C50.6901 8.51367 52.4266 10.1992 53.0585 12.4551H43.4284C44.0604 10.1992 45.797 8.51367 48.2434 8.51367Z"
      fill="currentColor"
    />
    <path
      d="M59.1831 19.5742V8.56641H54.2199V19.5742H59.1831Z"
      fill="currentColor"
    />
    <path
      d="M62.3387 14.0703C62.3387 9.87109 64.9754 6.68164 69.3075 6.68164C73.6396 6.68164 76.2763 9.87109 76.2763 14.0703C76.2763 18.2695 73.6396 21.459 69.3075 21.459C64.9754 21.459 62.3387 18.2695 62.3387 14.0703ZM71.3134 14.0703C71.3134 11.2617 70.3026 8.56641 69.3075 8.56641C68.3124 8.56641 67.3016 11.2617 67.3016 14.0703C67.3016 16.8789 68.3124 19.5742 69.3075 19.5742C70.3026 19.5742 71.3134 16.8789 71.3134 14.0703Z"
      fill="currentColor"
    />
  </svg>
);

const HamburgerIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="black"/>
    <rect x="10" y="14" width="20" height="2.5" rx="1.25" fill="white"/>
    <rect x="10" y="19" width="20" height="2.5" rx="1.25" fill="white"/>
    <rect x="10" y="24" width="20" height="2.5" rx="1.25" fill="white"/>
  </svg>
);

const CloseIcon = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="black"/>
        <path d="M13 13L27 27" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M27 13L13 27" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
);


const solutions = [
  {
    icon: Wifi,
    title: "Customer Support",
    href: "#",
    subItems: [
        { name: "General Support", href: "#" },
        { name: "Call Center Outsourcing", href: "#" },
        { name: "Live Chat Support Outsourcing", href: "#" },
        { name: "Email Support Outsourcing", href: "#" },
      ],
  },
  {
    icon: LayoutGrid,
    title: "Digital Operations",
    href: "#",
    subItems: [
        { name: "Back Office Support", href: "#" },
        { name: "Data Entry", href: "#" },
        { name: "E-commerce Support", href: "#" },
      ],
  },
  {
    icon: ShieldCheck,
    title: "Trust & Safety",
    href: "#",
    subItems: [
        { name: "Content Moderation", href: "#" },
        { name: "Fraud Detection", href: "#" },
        { name: "User Verification", href: "#" },
      ],
  },
  {
    icon: CircuitBoard,
    title: "Data & AI",
    href: "#",
    subItems: [
        { name: "Data Annotation", href: "#" },
        { name: "AI Model Training", href: "#" },
        { name: "Data Validation", href: "#" },
      ],
  },
];
const industries = [
  { title: "eCommerce", href: "#" },
  { title: "Fintech", href: "#" },
  { title: "Healthcare", href: "#" },
  { title: "Marketplace", href: "#" },
  { title: "SaaS", href: "#" },
];
const company = [
  { title: "About Us", href: "/about" },
  { title: "Careers", href: "/careers" },
  { title: "Blogs", href: "/blogs" },
];
const resources = [
  { title: "Case Studies", href: "#" },
  { title: "Playbooks", href: "#" },
  { title: "Guides", href: "#" },
];

const mobileNavItems = [
    { title: "Solutions", items: solutions.map(s => ({ title: s.title, href: s.href })) },
    { title: "Industries", items: industries },
    { title: "Our Agents", href: "#" },
    { title: "Pricing", href: "#" },
    { title: "Company", items: company },
    { title: "Resources", items: resources },
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
        <a href="#" className="underline hover:opacity-80">
          apply today
        </a>
        .
      </div>
      <div className="w-full px-[4%] flex items-center justify-between py-4">
        <a href="/" aria-label="Hugo logo" className="text-[#F5D34A]">
          <HugoLogo />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {isMounted && (
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="relative w-[500px] rounded-lg border-2 border-yellow-300 bg-[#FEF9F2] p-4 border-glow">
                      <div className="grid grid-cols-2 gap-4">
                        <ul className="flex flex-col gap-2 border-r pr-4">
                          {solutions.map((item) => (
                            <li key={item.title}>
                              <NavigationMenuLink asChild>
                                <a
                                  href={item.href}
                                  className="flex items-center gap-3 p-2 rounded-md hover:bg-yellow-100/50"
                                >
                                  <item.icon className="w-5 h-5 text-zinc-600" />
                                  <span className="font-medium text-sm">
                                    {item.title}
                                  </span>
                                  <ChevronRight className="w-4 h-4 ml-auto text-zinc-500" />
                                </a>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                        <ul className="flex flex-col gap-3 p-2">
                            {solutions[0].subItems.map(item => (
                                <li key={item.name}>
                                    <a href={item.href} className="text-sm font-medium hover:underline">
                                    {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Industries</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="relative w-[200px] rounded-lg border-2 border-yellow-300 bg-[#FEF9F2] p-2 border-glow">
                      <ul className="space-y-1">
                        {industries.map((item) => (
                          <ListItem
                            key={item.title}
                            title={item.title}
                            href={item.href}
                            className="hover:bg-yellow-100/50"
                          />
                        ))}
                      </ul>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    href="#"
                  >
                    Our Agents
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    href="#"
                  >
                    Pricing
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Company</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="relative w-[200px] rounded-lg border-2 border-yellow-300 bg-[#FEF9F2] p-2 border-glow">
                      <ul className="space-y-1">
                        {company.map((item) => (
                          <ListItem
                            key={item.title}
                            title={item.title}
                            href={item.href}
                             className="hover:bg-yellow-100/50"
                          />
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
                          <ListItem
                            key={item.title}
                            title={item.title}
                            href={item.href}
                             className="hover:bg-yellow-100/50"
                          />
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
            <Button className="rounded-full bg-zinc-900 text-white hover:bg-zinc-800 px-6">
                Get Started
            </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <HamburgerIcon />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="p-0 bg-transparent border-none">
                <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
                <div className="bg-[#F5D34A] h-[90px] px-[4%] flex items-center justify-between">
                    <a href="/" aria-label="Hugo logo" className="text-black">
                        <HugoLogo />
                    </a>
                    <SheetClose asChild>
                        <button>
                            <CloseIcon />
                            <span className="sr-only">Close menu</span>
                        </button>
                    </SheetClose>
                </div>
                <div className="bg-[#FEF9F2] px-6 pt-8 h-[calc(100vh-90px)] flex flex-col">
                    <Accordion type="single" collapsible className="w-full flex-grow">
                        {mobileNavItems.map(item => (
                            <div key={item.title || item.href} className="border-b border-yellow-200 py-3">
                                {item.items ? (
                                    <AccordionItem value={item.title!} className="border-none">
                                        <AccordionTrigger className="text-3xl hover:no-underline font-normal py-2">
                                            {item.title}
                                            <ChevronDown className="h-8 w-8 shrink-0 transition-transform duration-200 text-black/80" />
                                        </AccordionTrigger>
                                        <AccordionContent className="pl-4 pb-2">
                                            <ul className="space-y-3 mt-2">
                                                {item.items.map(subItem => (
                                                    <li key={subItem.title}>
                                                        <a href={subItem.href} className="text-xl text-zinc-700 hover:underline">{subItem.title}</a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                ) : (
                                    <a href={item.href} className="text-3xl block w-full py-2">{item.title}</a>
                                )}
                            </div>
                        ))}
                    </Accordion>

                    <div className="relative -mx-6 mt-auto">
                        <div className="bg-[#F5D34A] rounded-t-[40px] pt-12 pb-8 px-6 text-center">
                            <h3 className="text-4xl font-normal">Book a Demo</h3>
                             <div className="relative inline-block my-2">
                                <span className="absolute inset-x-0 bottom-0 h-1.5 bg-black"></span>
                            </div>
                            <Button className="rounded-full bg-black text-white hover:bg-zinc-800 px-8 py-6 text-lg mt-4 w-full">
                                Get Started
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
