import { Suspense } from "react";
import { Metadata } from "next";
import { MapPin, Clock, Phone, Sparkles, ArrowRight } from "lucide-react";
import { getStoreRepository, getSiteSettingsRepository } from "@/lib/repositories";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StoreDirectoryClient } from "@/components/stores/StoreDirectoryClient";

export const metadata: Metadata = {
  title: "Our Store — Olenna Studio & Workspace | Opening Soon",
  description:
    "Olenna physical store and workspace is in progress in Rajajinagar, Bangalore. Opening soon! Operating hours: 10:00 AM to 10:00 PM, Monday to Sunday.",
  alternates: {
    canonical: "/stores",
  },
};

export default async function StoresPage() {
  const storeRepo = getStoreRepository();
  const settingsRepo = getSiteSettingsRepository();

  const [stores, cities, settings] = await Promise.all([
    storeRepo.getPublishedStores(),
    storeRepo.getCities(),
    settingsRepo.getSiteSettings(),
  ]);

  const hasPublishedStores = stores.length > 0;

  return (
    <div className="bg-brand-ivory-50 min-h-screen py-10 sm:py-16">
      <Container>
        {hasPublishedStores ? (
          <>
            <SectionHeader
              as="h1"
              overline="Store Directory"
              title="Find an Olenna Boutique Near You"
              subtitle="Experience our curated collections in person. Visit our stores for custom bridal styling, jewellery consultations, and master tailoring advice."
              align="left"
            />
            <Suspense
              fallback={
                <div className="text-center py-16 text-sm text-brand-text-muted">
                  Loading boutique directory...
                </div>
              }
            >
              <StoreDirectoryClient initialStores={stores} cities={cities} />
            </Suspense>
          </>
        ) : (
          <div className="space-y-10">
            <SectionHeader
              as="h1"
              overline="Store & Workspace"
              title="Store In Progress — Opening Soon!"
              subtitle="We are currently preparing our exclusive workspace and retail studio in Rajajinagar, Bangalore. Stay tuned for our grand opening."
              align="left"
            />

            {/* Upcoming Store / Workspace Hero Card */}
            <div className="bg-white rounded-3xl border border-brand-plum-900/10 shadow-sm overflow-hidden">
              <div className="p-8 sm:p-12 lg:p-14 space-y-8">
                <div className="flex flex-wrap items-center gap-2.5">
                  <Badge variant="plum" className="flex items-center gap-1.5 px-3 py-1">
                    <Sparkles className="w-3.5 h-3.5 text-brand-champagne-300" />
                    <span className="font-medium">Opening Soon</span>
                  </Badge>
                  <Badge variant="blush">Bangalore Rajajinagar</Badge>
                  <Badge variant="outline">Ladies / Women Corner</Badge>
                </div>

                <div className="space-y-3 max-w-2xl">
                  <h2 className="font-serif text-2xl sm:text-3xl text-brand-plum-900 leading-snug">
                    Olenna Studio & Creative Workspace
                  </h2>
                  <p className="text-sm sm:text-base text-brand-text-secondary leading-relaxed font-light">
                    Our physical shop is currently in progress. Once onboarded, our Rajajinagar destination will serve as an open workspace and boutique lounge celebrating women&apos;s lifestyle, bespoke tailoring, jewellery, and beauty essentials.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-brand-plum-900/10">
                  {/* Location */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-brand-blush-100 flex items-center justify-center text-brand-plum-900 shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider font-semibold text-brand-plum-900">
                        Location
                      </p>
                      <p className="text-sm text-brand-text-secondary mt-0.5">
                        Rajajinagar, Bangalore
                      </p>
                      <p className="text-xs text-brand-text-muted">Karnataka, India</p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-brand-blush-100 flex items-center justify-center text-brand-plum-900 shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider font-semibold text-brand-plum-900">
                        Workspace & Shop Hours
                      </p>
                      <p className="text-sm text-brand-text-secondary mt-0.5 font-medium text-brand-plum-900">
                        10:00 AM to 10:00 PM
                      </p>
                      <p className="text-xs text-brand-text-muted">Monday to Sunday (Daily)</p>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-brand-blush-100 flex items-center justify-center text-brand-plum-900 shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider font-semibold text-brand-plum-900">
                        Enquiries & Updates
                      </p>
                      <p className="text-xs sm:text-sm text-brand-text-secondary mt-0.5">
                        <a href="tel:9741424695" className="hover:text-brand-plum-900 font-medium">
                          9741424695
                        </a>
                        {" | "}
                        <a href="tel:08754443777" className="hover:text-brand-plum-900 font-medium">
                          08754443777
                        </a>
                      </p>
                      <p className="text-xs text-brand-text-muted">
                        <a
                          href="mailto:olennastudiox@gmail.com"
                          className="hover:text-brand-plum-900 underline"
                        >
                          olennastudiox@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Call to Actions */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <Button href="/contact" variant="primary" size="md">
                    <span>Contact Our Concierge</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                  <Button
                    href={settings.customerPwaUrl}
                    isExternal
                    variant="outline"
                    size="md"
                  >
                    <span>{settings.customerPwaLabel}</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
