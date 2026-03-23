"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface TOCItem {
  id: string;
  title: string;
  level: 2 | 3;
}

interface TableOfContentsProps {
  items: TOCItem[];
  className?: string;
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -35% 0%" }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (items.length === 0) return null;

  return (
    <nav className={cn("space-y-1", className)} aria-label="İçindekiler">
      <span className="font-label text-xs uppercase tracking-widest text-primary block mb-4">
        // içindekiler
      </span>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => scrollToSection(e, item.id)}
              className={cn(
                "block w-full text-left py-1 font-label text-xs transition-all duration-200 hover:text-primary",
                item.level === 2 ? "pl-0" : "pl-4",
                activeId === item.id
                  ? "text-primary font-semibold"
                  : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
