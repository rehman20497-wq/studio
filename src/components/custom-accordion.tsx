"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { PlusIcon } from "./icons/plus-icon";
import { MinusIcon } from "./icons/minus-icon";

const faqs = [
  {
    value: "item-1",
    question: "1. Set Your Vision",
    answer:
      "Define what success looks like for your business. Identify your goals and how our cloud,connectivity, communication, and AI solutions will power growth and reduce risk.",
  },
  {
    value: "item-2",
    question: "2. Prepare the Foundations",
    answer: "We ensure your infrastructure is secure, scalable, and ready—networks, cloud platforms, and communication tools all optimized for performance.",
  },
  {
    value: "item-3",
    question: "3. Build & Test with Confidence",
    answer: "From pilot projects to real-world testing, we fine-tune every solution so your technology works flawlessly when it matters most.",
  },
  {
    value: "item-4",
    question: "4. Spread the Word",
    answer: "Communicate your value with clarity. We help you reach customers, employees, and partners with messaging that highlights reliability, innovation, and growth.",
  },
  {
    value: "item-5",
    question: "5. Launch & Thrive",
    answer: "Go live with confidence. We monitor, support, and optimize, making sure your technology keeps pace with your ambitions—every step of the way.",
  },
];

export default function CustomAccordion() {
  const [value, setValue] = useState("item-1");

  return (
    <Accordion
      type="single"
      collapsible
      value={value}
      onValueChange={setValue}
      className="w-full space-y-4"
    >
      {faqs.map((faq) => {
        const isActive = value === faq.value;

        return (
          <AccordionItem
            key={faq.value}
            value={faq.value}
            className={cn(
              "rounded-xl transition-all duration-500 ease-in-out border-2",
              isActive
                ? "bg-[#ffea97] border-[rgba(255,234,151,0.75)]"
                : "bg-white border-[rgba(255,234,151,0.75)] shadow-md hover:border-[rgba(255,234,151,1)]"
            )}
          >
            <AccordionTrigger className="w-full text-left p-6 font-bold text-testimonialReview hover:no-underline">
              <div className="flex items-center justify-between w-full">
                <span>{faq.question}</span>
                {isActive ? <MinusIcon /> : <PlusIcon />}
              </div>
            </AccordionTrigger>

            <AccordionContent className="px-6 pb-6 text-zinc-700 text-testimonialReview">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
