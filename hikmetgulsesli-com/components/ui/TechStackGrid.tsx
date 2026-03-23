"use client";

import { cn } from "@/lib/utils";
import { TechItem } from "@/lib/project-detail";

interface TechStackGridProps {
  items: TechItem[];
  className?: string;
}

const categoryLabels: Record<TechItem["category"], string> = {
  frontend: "Ön Yüz",
  backend: "Arka Uç",
  database: "Veritabanı",
  devops: "DevOps",
  tool: "Araç",
  mobile: "Mobil",
};

export function TechStackGrid({ items, className }: TechStackGridProps) {
  const groupedByCategory = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<TechItem["category"], TechItem[]>);

  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", className)}>
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-3 px-4 py-3 bg-surface-container border border-outline-variant/20 rounded-lg hover:border-primary/50 hover:bg-surface-container-high transition-all duration-200 group"
        >
          {/* Tech Icon Placeholder */}
          <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary font-headline font-bold text-sm group-hover:bg-primary/10 transition-colors">
            {item.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-headline text-sm font-semibold text-on-surface truncate">
              {item.name}
            </span>
            <span className="font-label text-[10px] uppercase tracking-wider text-on-surface-variant">
              {categoryLabels[item.category]}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
