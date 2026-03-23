import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status?: "online" | "offline" | "busy" | "away";
  showLabel?: boolean;
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const statusColors = {
  online: "bg-primary",
  offline: "bg-[var(--color-outline)]",
  busy: "bg-error",
  away: "bg-[var(--color-tertiary)]",
};

export function StatusBadge({
  status = "online",
  showLabel = true,
  label = "Available for work",
  size = "md",
  className = "",
}: StatusBadgeProps) {
  const dotSizes = {
    sm: "h-1.5 w-1.5",
    md: "h-2 w-2",
    lg: "h-3 w-3",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 px-3 py-1 bg-surface-container border border-outline-variant/20 rounded-full",
        className
      )}
    >
      <span className={cn("relative flex", dotSizes[size])}>
        {status === "online" && (
          <span
            className={cn(
              "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
              dotSizes[size],
              statusColors[status]
            )}
          />
        )}
        <span
          className={cn(
            "relative inline-flex rounded-full",
            dotSizes[size],
            statusColors[status]
          )}
        />
      </span>
      {showLabel && (
        <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
          {label}
        </span>
      )}
    </div>
  );
}
