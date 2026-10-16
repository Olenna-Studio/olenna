import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Navigation,
  ArrowLeft,
  Sparkles,
  CheckCircle,
  Clock,
} from "lucide-react";
import { getStoreRepository, getSiteSettingsRepository } from "@/lib/repositories";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StoreOpeningHours } from "@/components/stores/StoreOpeningHours";
import { StoreJsonLd } from "@/components/seo/JsonLd";
import { assetPath } from "@/lib/utils/assetPath";

interface StorePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const storeRepo = getStoreRepository();
  const stores = await storeRepo.getPublishedStores();
  return stores.map((store) => ({
    slug: store.slug,
  }));
}

export async function generateMetadata({
  params,
}: StorePageProps): Promise<Metadata> {
  const { slug } = await params;
  const storeRepo = getStoreRepository();
  const store = await storeRepo.getStoreBySlug(slug);

  if (!store) {
    return {
      title: "Store Not Found",
    };
  }

  return {
    title: `${store.name} — Olenna ${store.city}`,
    description: `Visit ${store.name} in ${store.locality}, ${store.city}. View store hours, contact details, directions and in-store amenities.`,
    alternates: {
      canonical: `/stores/${store.slug}`,
    },
  };
}

export default async function StoreDetailPage({ params }: StorePageProps) {
  const { slug } = await params;
  const storeRepo = getStoreRepository();
  const settingsRepo = getSiteSettingsRepository();

  const [store, settings] = await Promise.all([
    storeRepo.getStoreBySlug(slug),
    settingsRepo.getSiteSettings(),
  ]);

  if (!store) {
    notFound();
  }

  return (
    <div className="bg-brand-ivory-50 min-h-screen py-8 sm:py-12">
      <StoreJsonLd store={store} />

      <Container>
        {/* Breadcrumb / Back Link */}
        <div className="mb-6">
          <Link
            href="/stores"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-brand-text-secondary hover:text-brand-plum-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Stores</span>
          </Link>
        </div>

        {/* Store Header Banner */}
        <div className="bg-white rounded-3xl border border-brand-plum-900/10 overflow-hidden shadow-xs mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Store Information */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="blush">{store.city}</Badge>
                  {store.isFeatured && (
                    <Badge variant="plum" className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-brand-champagne-200" />
                      <span>Flagship Boutique</span>
                    </Badge>
                  )}
                  <span className="text-xs text-brand-text-muted">
                    {store.locality}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-brand-plum-900 leading-tight">
                  {store.name}
                </h1>

                {store.tagline && (
                  <p className="text-sm sm:text-base text-brand-text-secondary font-light">
                    {store.tagline}
                  </p>
                )}
              </div>

              {/* Address Block */}
              <div className="bg-brand-blush-50/70 p-4 rounded-2xl border border-brand-plum-900/10 space-y-2">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-brand-plum-700 mt-1 shrink-0" />
                  <div className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
                    <p className="font-medium text-brand-plum-900">Address:</p>
                    {store.addressLines.map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                    <p>
                      {store.locality}, {store.city}, {store.state} – {store.postalCode}
                    </p>
                    <p className="text-[11px] text-brand-text-muted mt-1">
                      {store.country}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {store.directionsUrl && (
                  <Button
                    href={store.directionsUrl}
                    isExternal
                    variant="primary"
                    size="md"
                    className="shadow-xs hover:shadow-md"
                  >
                    <Navigation className="w-4 h-4 mr-1.5" />
                    <span>Get Directions</span>
                  </Button>
                )}

                {store.phone && (
                  <Button
                    href={`tel:${store.phone}`}
                    variant="outline"
                    size="md"
                  >
                    <Phone className="w-4 h-4 mr-1.5" />
                    <span>Call Store</span>
                  </Button>
                )}

                <Button
                  href="/contact"
                  variant="ghost"
                  size="md"
                >
                  <Mail className="w-4 h-4 mr-1.5" />
                  <span>Book Appointment</span>
                </Button>
              </div>
            </div>

            {/* Store Photo */}
            <div className="lg:col-span-5 relative min-h-64 sm:min-h-80 lg:min-h-full w-full bg-brand-blush-100">
              {store.image ? (
                <Image
                  src={assetPath(store.image)}
                  alt={store.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-brand-mauve-100 text-brand-plum-900">
                  <span className="font-serif text-2xl tracking-widest">OLENNA</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Operating Hours and In-Store Amenities */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Operating Hours Card */}
          <div className="md:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-brand-plum-900/10 shadow-xs">
            <h2 className="font-serif text-xl text-brand-plum-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-brand-plum-700" />
              <span>Weekly Operating Hours</span>
            </h2>

            <StoreOpeningHours
              hours={store.openingHours}
              specialNotice={store.specialHoursNotice}
            />
          </div>

          {/* Amenities & Concierge */}
          <div className="md:col-span-6 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-brand-plum-900/10 shadow-xs">
              <h2 className="font-serif text-xl text-brand-plum-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-plum-700" />
                <span>Boutique Amenities & Services</span>
              </h2>

              {store.amenities && store.amenities.length > 0 ? (
                <ul className="space-y-2.5 text-xs sm:text-sm text-brand-text-secondary">
                  {store.amenities.map((amenity, idx) => (
                    <li key={idx} className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{amenity}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-brand-text-muted italic">
                  In-store consultations, tailoring services, and beauty assistance available.
                </p>
              )}
            </div>

            {/* Need Assistance Card */}
            <div className="bg-[#FAF1F4] p-6 rounded-2xl border border-brand-plum-900/10 flex items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-base font-medium text-brand-plum-900">
                  Prefer shopping from home?
                </h3>
                <p className="text-xs text-brand-text-secondary mt-1">
                  Access our complete collections with doorstep delivery on the Customer App.
                </p>
              </div>
              <Button
                href={settings.customerPwaUrl}
                isExternal
                variant="primary"
                size="sm"
                className="shrink-0"
              >
                Shop Online
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
