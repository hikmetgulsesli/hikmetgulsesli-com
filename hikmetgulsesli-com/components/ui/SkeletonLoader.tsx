"use client";

import { forwardRef, type HTMLAttributes } from "react";

type SkeletonVariant = "text" | "circular" | "rectangular" | "card";
type SkeletonAnimation = "pulse" | "wave" | "none";

interface SkeletonLoaderProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  animation?: SkeletonAnimation;
}

const variantClasses: Record<SkeletonVariant, string> = {
  text: "rounded",
  circular: "rounded-full",
  rectangular: "rounded-lg",
  card: "rounded-xl",
};

export const SkeletonLoader = forwardRef<HTMLDivElement, SkeletonLoaderProps>(
  ({ variant = "rectangular", width, height, animation = "wave", className = "", ...props }, ref) => {
    const widthStyle = width ? (typeof width === "number" ? `${width}px` : width) : "100%";
    const heightStyle = height ? (typeof height === "number" ? `${height}px` : height) : "1rem";

    const animationClass = {
      pulse: "animate-pulse",
      wave: "relative overflow-hidden",
      none: "",
    }[animation];

    return (
      <div
        ref={ref}
        data-testid="skeleton-loader"
        className={`
          bg-[var(--color-surface-container-high)] 
          ${variantClasses[variant]}
          ${animationClass}
          ${className}
        `}
        style={{
          width: widthStyle,
          height: heightStyle,
        }}
        {...props}
      >
        {animation === "wave" && (
          <div
            className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite]"
            style={{
              background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)`,
              animation: "shimmer 1.5s infinite",
            }}
          />
        )}
      </div>
    );
  }
);

SkeletonLoader.displayName = "SkeletonLoader";

// Additional presets for common use cases
export const SkeletonText = (props: Omit<SkeletonLoaderProps, "variant">) => (
  <SkeletonLoader variant="text" {...props} />
);

export const SkeletonCircle = (props: Omit<SkeletonLoaderProps, "variant">) => (
  <SkeletonLoader variant="circular" {...props} />
);

export const SkeletonCard = (props: Omit<SkeletonLoaderProps, "variant">) => (
  <SkeletonLoader variant="card" {...props} />
);

export default SkeletonLoader;
