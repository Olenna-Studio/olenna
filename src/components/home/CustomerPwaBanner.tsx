"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CustomerPwaBannerContent } from "@/lib/models/content";
import { Button } from "@/components/ui/Button";
import { assetPath } from "@/lib/utils/assetPath";
import { useToast } from "@/components/ui/Toast";

interface CustomerPwaBannerProps {
  content: CustomerPwaBannerContent;
}

export function CustomerPwaBanner({ content }: CustomerPwaBannerProps) {
  const { showComingSoon } = useToast();

  if (!content.isVisible) {
    return null;
  }

  return (
    <section className="py-8 sm:py-12 bg-brand-ivory-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#F6E6ED] border border-brand-plum-900/10 overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center">
            {/* Left Photo: Gift Box */}
            <div className="md:col-span-5 relative h-52 sm:h-64 md:h-72 w-full bg-brand-blush-100">
              <Image
                src={assetPath(content.image)}
                alt={content.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#F6E6ED]/80 hidden md:block" />
            </div>

            {/* Right Content */}
            <div className="md:col-span-7 p-6 sm:p-8 lg:p-12 text-center md:text-left space-y-3">
              <span className="text-[11px] font-semibold tracking-[0.25em] text-brand-plum-700 uppercase">
                Digital Experience
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-brand-plum-900">
                {content.headline}
              </h2>
              <p className="text-sm sm:text-base text-brand-text-secondary font-light max-w-lg mx-auto md:mx-0">
                {content.subheadline}
              </p>
              <div className="pt-2">
                <Button
                  href={content.ctaUrl}
                  isExternal
                  variant="primary"
                  size="md"
                  onClick={(e) => {
                    e.preventDefault();
                    showComingSoon();
                  }}
                  className="shadow-xs hover:shadow-md"
                >
                  <span>{content.ctaLabel}</span>
                  <ArrowUpRight className="w-4 h-4 ml-1 stroke-[2.2]" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
