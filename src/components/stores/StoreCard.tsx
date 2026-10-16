import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Navigation, ArrowRight, Sparkles } from "lucide-react";
import { Store } from "@/lib/models/store";
import { StoreOpeningHours } from "./StoreOpeningHours";
import { Badge } from "@/components/ui/Badge";
import { assetPath } from "@/lib/utils/assetPath";

interface StoreCardProps {
  store: Store;
}

export function StoreCard({ store }: StoreCardProps) {
  return (
    <article className="group bg-white rounded-2xl border border-brand-plum-900/10 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden">
      {/* Store Image or Pattern Banner */}
      <div className="relative h-44 sm:h-48 w-full bg-brand-blush-100 overflow-hidden">
        {store.image ? (
          <Image
            src={assetPath(store.image)}
            alt={store.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-brand-mauve-100 text-brand-plum-900">
            <span className="font-serif text-xl tracking-wider">OLENNA</span>
          </div>
        )}

        {/* Featured Badge */}
        {store.isFeatured && (
          <div className="absolute top-3 left-3">
            <Badge variant="plum" className="flex items-center gap-1 shadow-xs">
              <Sparkles className="w-3 h-3 text-brand-champagne-200" />
              <span>Flagship</span>
            </Badge>
          </div>
        )}

        {/* City tag */}
        <div className="absolute top-3 right-3">
          <Badge variant="blush" className="bg-white/90 backdrop-blur-xs font-semibold text-brand-plum-900">
            {store.city}
          </Badge>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-medium text-brand-plum-700 tracking-wider uppercase">
                {store.locality}
              </p>
              <h3 className="font-serif text-lg sm:text-xl font-normal text-brand-plum-900 group-hover:text-brand-plum-950 transition-colors">
                <Link href={`/stores/${store.slug}`} className="focus:outline-none">
                  {store.name}
                </Link>
              </h3>
            </div>
          </div>

          {store.tagline && (
            <p className="text-xs text-brand-text-muted italic line-clamp-1">
              {store.tagline}
            </p>
          )}

          {/* Address */}
          <div className="flex items-start gap-2 text-xs sm:text-sm text-brand-text-secondary pt-1">
            <MapPin className="w-4 h-4 text-brand-plum-700 shrink-0 mt-0.5" />
            <address className="not-italic leading-relaxed">
              {store.addressLines.join(", ")}, {store.locality}, {store.city} – {store.postalCode}
            </address>
          </div>

          {/* Operating Hours Summary */}
          <div className="pt-1">
            <StoreOpeningHours hours={store.openingHours} compact />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-brand-plum-900/10 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {store.phone && (
              <a
                href={`tel:${store.phone}`}
                aria-label={`Call ${store.name}`}
                className="inline-flex items-center gap-1.5 text-xs text-brand-plum-900 hover:text-brand-plum-950 bg-brand-blush-50 hover:bg-brand-blush-100 px-3 py-1.5 rounded-full transition-colors border border-brand-plum-900/10"
              >
                <Phone className="w-3.5 h-3.5 text-brand-plum-700" />
                <span>Call</span>
              </a>
            )}

            {store.directionsUrl && (
              <a
                href={store.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Directions to ${store.name}`}
                className="inline-flex items-center gap-1.5 text-xs text-brand-plum-900 hover:text-brand-plum-950 bg-brand-blush-50 hover:bg-brand-blush-100 px-3 py-1.5 rounded-full transition-colors border border-brand-plum-900/10"
              >
                <Navigation className="w-3.5 h-3.5 text-brand-plum-700" />
                <span>Directions</span>
              </a>
            )}
          </div>

          <Link
            href={`/stores/${store.slug}`}
            className="inline-flex items-center gap-1 text-xs font-medium text-brand-plum-900 hover:text-brand-plum-700 group-hover:translate-x-0.5 transition-transform ml-auto"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
