"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

type CardVariant = "default" | "interactive" | "featured";
type CardPadding = "none" | "sm" | "md" | "lg";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  hover?: boolean;
  children: ReactNode;
}

const paddingClasses: Record<CardPadding, string> = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const variantClasses: Record<CardVariant, string> = {
  default:
    "bg-[var(--color-surface-container)] border border-[var(--color-outline-variant)] rounded-xl",
  interactive:
    "bg-[var(--color-surface-container)] border border-[var(--color-outline-variant)] rounded-xl hover:border-[var(--color-primary)] hover:-translate-y-1 hover:shadow-lg hover:shadow-[0_0_20px_rgb(16_185_129_/_0.2)] transition-all duration-200 ease-out cursor-pointer",
  featured:
    "bg-[var(--color-surface-container)] border-2 border-[var(--color-primary)] rounded-2xl shadow-lg shadow-[0_0_30px_rgb(16_185_129_/_0.15)]",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "default", padding = "md", hover = false, children, className = "", ...props }, ref) => {
    const baseClasses = variantClasses[variant];
    const paddingClass = paddingClasses[padding];

    return (
      <div
        ref={ref}
        className={`${baseClasses} ${paddingClass} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
