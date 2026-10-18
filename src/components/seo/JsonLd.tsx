import React from "react";
import { Store } from "@/lib/models/store";

interface OrganizationJsonLdProps {
  url?: string;
  name?: string;
  logo?: string;
}

export function OrganizationJsonLd({
  url = "https://olenna.in",
  name = "Olenna",
  logo = "https://olenna.in/images/logo/olenna-logo-full.png",
}: OrganizationJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RetailStore",
    name,
    url,
    logo,
    description:
      "A premium multi-category retail brand and workspace celebrating ladies & women's beauty, timeless fashion, ethnic wear, imitation jewellery, accessories, personal care, and tailoring supplies.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface StoreJsonLdProps {
  store: Store;
}

export function StoreJsonLd({ store }: StoreJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: store.name,
    description: store.tagline || `${store.name} — Olenna retail boutique`,
    address: {
      "@type": "PostalAddress",
      streetAddress: store.addressLines.join(", "),
      addressLocality: store.locality,
      addressRegion: store.state,
      postalCode: store.postalCode,
      addressCountry: store.country,
    },
    ...(store.phone ? { telephone: store.phone } : {}),
    ...(store.email ? { email: store.email } : {}),
    ...(store.coordinates
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: store.coordinates.latitude,
            longitude: store.coordinates.longitude,
          },
        }
      : {}),
    ...(store.openingHours.length > 0
      ? {
          openingHoursSpecification: store.openingHours
            .filter((h) => !h.isClosed)
            .map((h) => ({
              "@type": "OpeningHoursSpecification",
              dayOfWeek: h.day,
              opens: h.open,
              closes: h.close,
            })),
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
