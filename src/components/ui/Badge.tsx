import React from "react";
import { cn } from "@/lib/utils/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "blush" | "plum" | "champagne" | "outline";
  className?: string;
}

export function Badge({
  children,
  variant = "blush",
  className,
}: BadgeProps) {
  const variantClasses = {
    blush: "bg-brand-blush-100 text-brand-plum-900",
    plum: "bg-brand-plum-900 text-white",
    champagne: "bg-brand-champagne-100 text-brand-champagne-600",
    outline: "border border-brand-plum-900/20 text-brand-plum-900",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
