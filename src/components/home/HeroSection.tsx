"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { HeroSectionContent } from "@/lib/models/content";
import { Button } from "@/components/ui/Button";
import { assetPath } from "@/lib/utils/assetPath";

interface HeroSectionProps {
  content: HeroSectionContent;
}

export function HeroSection({ content }: HeroSectionProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  if (!content.isVisible || !content.slides.length) {
    return null;
  }

  const slides = content.slides;
  const currentSlide = slides[currentSlideIndex] || slides[0];

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative bg-[#FAF1F4] overflow-hidden">
      {/* Decorative subtle background gradient */}
      <div className="absolute inset-0 bg-radial-[at_top_right] from-brand-blush-100/60 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1 z-10">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-brand-plum-700 uppercase">
                {currentSlide.overline}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-serif font-normal text-brand-plum-900 leading-[1.15] tracking-tight mb-5">
              {currentSlide.headline.split(",").length > 1 ? (
                <>
                  {currentSlide.headline.split(",")[0]},<br />
                  <span className="italic font-light">
                    {currentSlide.headline.split(",").slice(1).join(",")}
                  </span>
                </>
              ) : (
                currentSlide.headline
              )}
            </h1>

            <p className="text-sm sm:text-base text-brand-text-secondary leading-relaxed font-light max-w-lg mb-8">
              {currentSlide.subheadline}
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Button
                href={currentSlide.primaryCtaUrl}
                variant="primary"
                size="lg"
                className="group shadow-sm hover:shadow-md"
              >
                <span>{currentSlide.primaryCtaLabel}</span>
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Button>

              {currentSlide.secondaryCtaLabel && currentSlide.secondaryCtaUrl && (
                <Button
                  href={currentSlide.secondaryCtaUrl}
                  variant="outline"
                  size="lg"
                >
                  {currentSlide.secondaryCtaLabel}
                </Button>
              )}
            </div>

            {/* Slider Indicator & Navigation Controls */}
            <div className="flex items-center gap-6 pt-4 border-t border-brand-plum-900/10">
              <div className="flex items-center gap-3 text-xs tracking-wider text-brand-plum-900 font-medium">
                <span className="font-semibold">
                  {String(currentSlideIndex + 1).padStart(2, "0")}
                </span>
                <span className="w-10 h-0.5 bg-brand-plum-900/40 rounded-full" />
                <span className="text-brand-text-muted">
                  {slides
                    .map((_, i) => String(i + 1).padStart(2, "0"))
                    .filter((_, i) => i !== currentSlideIndex)
                    .join(" ")}
                </span>
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={handlePrev}
                  aria-label="Previous slide"
                  className="w-9 h-9 rounded-full border border-brand-plum-900/20 bg-white/60 hover:bg-white text-brand-plum-900 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-plum-900"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next slide"
                  className="w-9 h-9 rounded-full border border-brand-plum-900/20 bg-white/60 hover:bg-white text-brand-plum-900 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-plum-900"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Model */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg lg:max-w-none aspect-[4/3] sm:aspect-[16/11] lg:aspect-[5/4] rounded-2xl overflow-hidden shadow-xl ring-1 ring-brand-plum-900/10 bg-brand-blush-100">
              <Image
                src={assetPath(currentSlide.image)}
                alt={currentSlide.imageAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="object-cover object-center transition-all duration-500 hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
