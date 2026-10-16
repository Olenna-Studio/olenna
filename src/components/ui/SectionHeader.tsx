import React from "react";
import { cn } from "@/lib/utils/cn";

interface SectionHeaderProps {
  as?: "h1" | "h2" | "h3";
  overline?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SectionHeader({
  as: Component = "h2",
  overline,
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeaderProps) {
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div className={cn("flex flex-col mb-8 sm:mb-10", alignClasses[align], className)}>
      {overline && (
        <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-brand-plum-700/80 uppercase mb-2">
          {overline}
        </span>
      )}
      <Component className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-brand-plum-900 tracking-tight leading-snug">
        {title}
      </Component>
      {subtitle && (
        <p className="mt-2.5 text-sm sm:text-base text-brand-text-secondary max-w-2xl font-light">
          {subtitle}
        </p>
      )}
    </div>
  );
}
