import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";

export interface LogoProps {
  className?: string;
  variant?: "horizontal" | "stacked" | "wordmark" | "emblem";
  size?: "sm" | "md" | "lg";
  withTagline?: boolean;
  priority?: boolean;
}

export function Logo({
  className,
  variant = "horizontal",
  size = "md",
  withTagline = false,
  priority = false,
}: LogoProps) {
  // Dimension definitions for each variant & size
  const dimensions = {
    horizontal: {
      sm: { width: 140, height: 30, className: "h-7 w-auto" },
      md: { width: 180, height: 39, className: "h-9 sm:h-10 w-auto" },
      lg: { width: 220, height: 47, className: "h-11 sm:h-12 w-auto" },
    },
    stacked: {
      sm: { width: 110, height: 68, className: "w-24 h-auto" },
      md: { width: 150, height: 92, className: "w-32 sm:w-36 h-auto" },
      lg: { width: 190, height: 117, className: "w-40 sm:w-48 h-auto" },
    },
    wordmark: {
      sm: { width: 120, height: 29, className: "h-7 w-auto" },
      md: { width: 155, height: 37, className: "h-8 sm:h-9 w-auto" },
      lg: { width: 190, height: 46, className: "h-10 sm:h-11 w-auto" },
    },
    emblem: {
      sm: { width: 32, height: 27, className: "h-7 w-auto" },
      md: { width: 44, height: 37, className: "h-9 w-auto" },
      lg: { width: 56, height: 48, className: "h-12 w-auto" },
    },
  };

  const assetSources = {
    horizontal: "/images/logo/olenna-horizontal.webp",
    stacked: "/images/logo/olenna-logo-full.webp",
    wordmark: "/images/logo/olenna-wordmark.webp",
    emblem: "/images/logo/olenna-emblem.webp",
  };

  const currentDim = dimensions[variant][size];
  const src = assetSources[variant];

  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex flex-col items-start focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-plum-900 rounded-sm transition-opacity hover:opacity-95",
        className
      )}
      aria-label="Olenna — Everyday Elegance, Thoughtfully Curated"
    >
      <div className="relative flex items-center">
        <Image
          src={src}
          alt="Olenna Luxury Beauty, Fashion & Lifestyle"
          width={currentDim.width}
          height={currentDim.height}
          priority={priority}
          className={cn(
            "object-contain transition-transform duration-200 group-hover:scale-[1.01]",
            currentDim.className
          )}
        />
      </div>

      {withTagline && (
        <span className="text-[10px] sm:text-xs text-brand-text-muted tracking-wider mt-1.5 font-light">
          Everyday elegance, thoughtfully curated.
        </span>
      )}
    </Link>
  );
}
