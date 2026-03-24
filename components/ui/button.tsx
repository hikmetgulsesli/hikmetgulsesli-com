"use client";

import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  icon?: string;
  iconPosition?: "left" | "right";
}

export function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className,
  type = "button",
  icon,
  iconPosition = "left",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-headline uppercase tracking-tighter font-bold transition-all duration-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-primary text-on-primary shadow-[0_0_20px_rgba(78,222,163,0.3)] hover:scale-105 active:scale-95",
    secondary:
      "bg-secondary text-on-secondary shadow-[0_0_20px_rgba(192,193,255,0.3)] hover:scale-105 active:scale-95",
    outline:
      "border border-outline-variant/30 text-on-surface hover:bg-primary/5 active:bg-primary/10",
    ghost:
      "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
    >
      {icon && iconPosition === "left" && (
        <span className="material-symbols-outlined text-lg">{icon}</span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className="material-symbols-outlined text-lg">{icon}</span>
      )}
    </button>
  );
}

interface IconButtonProps {
  icon: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  label: string;
}

export function IconButton({
  icon,
  onClick,
  variant = "ghost",
  size = "md",
  disabled = false,
  className,
  label,
}: IconButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center transition-all duration-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-primary text-on-primary",
    secondary: "bg-secondary text-on-secondary",
    outline: "border border-outline-variant/30 text-on-surface hover:bg-surface-container-low",
    ghost: "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low",
  };

  const sizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
    >
      <span className="material-symbols-outlined text-lg">{icon}</span>
    </button>
  );
}
