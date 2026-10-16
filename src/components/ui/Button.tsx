import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "circle";
  size?: "sm" | "md" | "lg" | "icon";
  href?: string;
  isExternal?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      isExternal = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-plum-900 focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none";

    const variantClasses = {
      primary:
        "bg-brand-plum-900 text-white hover:bg-brand-plum-950 shadow-sm hover:shadow",
      secondary:
        "bg-brand-mauve-200 text-brand-plum-950 hover:bg-brand-mauve-400/70",
      outline:
        "border border-brand-plum-900/30 text-brand-plum-900 hover:border-brand-plum-900 hover:bg-brand-plum-900/5",
      ghost: "text-brand-plum-900 hover:bg-brand-plum-900/5",
      circle:
        "rounded-full bg-white text-brand-plum-900 border border-brand-plum-900/15 hover:bg-brand-plum-900 hover:text-white shadow-xs",
    };

    const sizeClasses = {
      sm: "text-xs px-3.5 py-1.5 rounded-full gap-1.5",
      md: "text-sm px-5 py-2.5 rounded-full gap-2",
      lg: "text-base px-7 py-3 rounded-full gap-2.5",
      icon: "p-2 rounded-full",
    };

    const appliedClasses = cn(
      baseClasses,
      variantClasses[variant],
      variant !== "circle" ? sizeClasses[size] : "w-10 h-10 p-0 flex items-center justify-center rounded-full",
      className
    );

    if (href) {
      if (isExternal) {
        return (
          <a
            href={href}
            className={appliedClasses}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={appliedClasses}>
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={appliedClasses}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
