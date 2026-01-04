
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
    question: "1. Deep dive into your goals and team structure.",
    answer:
      "We take the time to understand your unique needs and goals. Our talent becomes an extension of your team, supporting your customer experience initiatives within your strategic direction, timelines and budgets.",
  },
  {
    value: "item-2",
    question: "2. We design a customized solution for you.",
    answer: "Details for designing a customized solution.",
  },
  {
    value: "item-3",
    question: "3. Review and assemble your dream team.",
    answer: "Details for reviewing and assembling your dream team.",
  },
  {
    value: "item-4",
    question: "4. We'll implement a dedicated training program.",
    answer: "Details for implementing a dedicated training program.",
  },
  {
    value: "item-5",
    question: "5. Go Live & schedule check-ins!",
    answer: "Details for going live and scheduling check-ins.",
  },
];

export default function CustomAccordion() {
  const [value, setValue] = useState("item-1");

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full space-y-4"
      value={value}
      onValueChange={setValue}
    >
      {faqs.map((faq) => (
        <AccordionItem
          key={faq.value}
          value={faq.value}
          className={cn(
            "border-none rounded-xl transition-all duration-300",
            value === faq.value ? "bg-[#ffea97]" : "bg-white shadow-md"
          )}
        >
          <AccordionTrigger className="w-full text-left p-6 font-medium text-lg hover:no-underline">
            <div className="flex items-center justify-between w-full">
              <span>{faq.question}</span>
              {value === faq.value ? <MinusIcon /> : <PlusIcon />}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6 text-zinc-700">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
