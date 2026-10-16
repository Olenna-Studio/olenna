import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { StoreDiscoveryContent } from "@/lib/models/content";
import { Store } from "@/lib/models/store";
import { Button } from "@/components/ui/Button";
import { assetPath } from "@/lib/utils/assetPath";

interface StoreDiscoveryProps {
  content: StoreDiscoveryContent;
  featuredStores?: Store[];
}

export function StoreDiscovery({
  content,
  featuredStores = [],
}: StoreDiscoveryProps) {
  if (!content.isVisible) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 bg-brand-ivory-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-[#E8DDD5] overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 space-y-4">
              <span className="text-[11px] font-semibold tracking-[0.25em] text-brand-champagne-600 uppercase">
                Visit Us In Person
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-brand-plum-900 leading-tight">
                {content.headline}
              </h2>

              <p className="text-sm sm:text-base text-brand-text-secondary leading-relaxed font-light">
                {content.subheadline}
              </p>

              <div className="pt-2">
                <Button
                  href={content.ctaUrl}
                  variant="primary"
                  size="md"
                  className="group shadow-xs hover:shadow-md"
                >
                  <span>{content.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>

              {/* Featured Stores Quick Pills */}
              {featuredStores.length > 0 && (
                <div className="pt-4 border-t border-brand-plum-900/10">
                  <p className="text-xs font-medium text-brand-plum-900 mb-2">
                    Featured Locations:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {featuredStores.slice(0, 3).map((store) => (
                      <Link
                        key={store.id}
                        href={`/stores/${store.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs bg-white/80 hover:bg-white text-brand-plum-900 px-3 py-1 rounded-full transition-colors border border-brand-plum-900/10"
                      >
                        <MapPin className="w-3 h-3 text-brand-plum-700" />
                        <span>{store.locality}, {store.city}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Store Interior Photo */}
            <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-96 w-full">
              <Image
                src={assetPath(content.image)}
                alt={content.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#E8DDD5] via-transparent to-transparent hidden lg:block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
