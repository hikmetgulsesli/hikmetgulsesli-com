"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  value: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultValue?: string;
  className?: string;
}

export function Accordion({ items, defaultValue, className }: AccordionProps) {
  const [openValue, setOpenValue] = useState<string | null>(defaultValue ?? null);

  const toggle = (value: string) => {
    setOpenValue(openValue === value ? null : value);
  };

  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item) => {
        const isOpen = openValue === item.value;
        return (
          <div
            key={item.value}
            className="border border-outline-variant/30 rounded-lg overflow-hidden bg-surface-container"
          >
            <button
              onClick={() => toggle(item.value)}
              className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-surface-container-high transition-colors duration-200"
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.value}`}
            >
              <span className="font-headline text-sm font-semibold uppercase tracking-tight text-on-surface">
                {item.title}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="text-primary"
              >
                <ChevronDown className="w-5 h-5" />
              </motion.span>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  id={`accordion-content-${item.value}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 text-sm text-on-surface-variant leading-relaxed">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
