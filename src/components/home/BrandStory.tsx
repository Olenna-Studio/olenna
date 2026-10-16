import React from "react";
import { ArrowRight, Sparkles, Gem, Heart, Leaf, Shield } from "lucide-react";
import { BrandStoryContent, BrandPillar } from "@/lib/models/content";
import { Button } from "@/components/ui/Button";

interface BrandStoryProps {
  content: BrandStoryContent;
}

export function BrandStory({ content }: BrandStoryProps) {
  if (!content.isVisible) {
    return null;
  }

  const renderIcon = (name: string) => {
    switch (name) {
      case "leaf":
        return <Leaf className="w-6 h-6 text-brand-plum-700 stroke-[1.5]" />;
      case "diamond":
        return <Gem className="w-6 h-6 text-brand-plum-700 stroke-[1.5]" />;
      case "heart":
        return <Heart className="w-6 h-6 text-brand-plum-700 stroke-[1.5]" />;
      case "shield":
        return <Shield className="w-6 h-6 text-brand-plum-700 stroke-[1.5]" />;
      default:
        return <Sparkles className="w-6 h-6 text-brand-plum-700 stroke-[1.5]" />;
    }
  };

  return (
    <section className="relative py-14 sm:py-20 bg-[#FAF1F4] overflow-hidden">
      {/* Decorative botanical floral accents in background */}
      <div
        className="absolute right-0 bottom-0 top-0 w-1/3 opacity-25 pointer-events-none bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-brand-mauve-200 via-transparent to-transparent"
        aria-hidden="true"
      />
      <svg
        className="absolute right-2 bottom-0 w-72 h-72 text-brand-mauve-200/50 pointer-events-none hidden lg:block"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        aria-hidden="true"
      >
        <path d="M100 190 C120 140, 180 120, 190 100 C180 80, 120 60, 100 10 C80 60, 20 80, 10 100 C20 120, 80 140, 100 190 Z" />
        <path d="M100 170 C115 130, 160 115, 170 100 C160 85, 115 70, 100 30 C85 70, 40 85, 30 100 C40 115, 85 130, 100 170 Z" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Brand Narrative */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-brand-plum-700 uppercase">
              {content.overline}
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-brand-plum-900 leading-[1.25] tracking-tight">
              {content.headline.split(",").length > 1 ? (
                <>
                  {content.headline.split(",")[0]},<br />
                  <span className="italic font-light">
                    {content.headline.split(",").slice(1).join(",")}
                  </span>
                </>
              ) : (
                content.headline
              )}
            </h2>

            <p className="text-sm sm:text-base text-brand-text-secondary leading-relaxed font-light pt-1">
              {content.description}
            </p>

            <div className="pt-4">
              <Button
                href={content.ctaUrl}
                variant="outline"
                size="md"
                className="group border-brand-plum-900/40 hover:border-brand-plum-900"
              >
                <span>{content.ctaLabel}</span>
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* Right Column: 3 Pillars with Delicate Icons */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 lg:gap-6">
            {content.pillars.map((pillar: BrandPillar) => (
              <div
                key={pillar.id}
                className="flex flex-col items-start p-5 sm:p-4 lg:p-6 bg-white/70 backdrop-blur-xs rounded-2xl border border-brand-plum-900/10 shadow-2xs hover:bg-white transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-brand-blush-100/80 flex items-center justify-center mb-4">
                  {renderIcon(pillar.iconName)}
                </div>
                <h3 className="font-serif text-base sm:text-lg font-medium text-brand-plum-900 mb-1.5">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-brand-text-secondary font-light leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
