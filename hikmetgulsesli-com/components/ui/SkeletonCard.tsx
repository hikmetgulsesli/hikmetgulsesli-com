"use client";

import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard({ className = "" }: SkeletonCardProps) {
  return (
    <div
      className={cn(
        "bg-surface-container border border-outline-variant/20 rounded-xl overflow-hidden animate-pulse",
        className
      )}
    >
      {/* Thumbnail */}
      <div className="aspect-video bg-surface-container-high" />

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <div className="h-6 bg-surface-container-high rounded w-3/4" />

        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 bg-surface-container-high rounded w-full" />
          <div className="h-4 bg-surface-container-high rounded w-2/3" />
        </div>

        {/* Tech Pills */}
        <div className="flex gap-2 pt-2">
          <div className="h-6 w-16 bg-surface-container-high rounded-full" />
          <div className="h-6 w-20 bg-surface-container-high rounded-full" />
          <div className="h-6 w-14 bg-surface-container-high rounded-full" />
        </div>

        {/* Links */}
        <div className="flex gap-4 pt-2">
          <div className="h-4 w-16 bg-surface-container-high rounded" />
          <div className="h-4 w-14 bg-surface-container-high rounded" />
        </div>
      </div>
    </div>
  );
}

export function ProjectGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
