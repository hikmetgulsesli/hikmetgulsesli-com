"use client";

import { Search, Command } from "lucide-react";
import { cn } from "@/lib/utils";
import { categories, CategoryId } from "@/lib/projects";

interface FilterBarProps {
  activeCategory: CategoryId;
  onCategoryChange: (category: CategoryId) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  className?: string;
}

export function FilterBar({
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  className = "",
}: FilterBarProps) {
  return (
    <div
      className={cn(
        "sticky top-16 z-40 bg-background/80 backdrop-blur-xl border-b border-outline-variant/20",
        className
      )}
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-4">
        {/* Search and Filter Row */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Category Buttons */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={cn(
                  "px-4 py-2 font-label text-xs uppercase tracking-wider rounded-md transition-all duration-200",
                  activeCategory === category.id
                    ? "bg-primary text-on-primary shadow-[0_0_15px_rgba(78,222,163,0.3)]"
                    : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-primary border border-transparent hover:border-outline"
                )}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-auto md:min-w-[280px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Proje Ara..."
              className="w-full pl-10 pr-16 py-2 bg-surface-container border border-outline-variant/30 rounded-md font-label text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <kbd className="hidden md:flex items-center gap-0.5 px-1.5 py-0.5 bg-surface-container-high rounded text-[10px] font-label text-on-surface-variant">
                <Command className="w-3 h-3" />
                <span>K</span>
              </kbd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
