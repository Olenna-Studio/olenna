import { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Compass, Sparkles, Heart, Shield, Gem } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { getSiteSettingsRepository } from "@/lib/repositories";
import { assetPath } from "@/lib/utils/assetPath";

export const metadata: Metadata = {
  title: "About Olenna — Our Philosophy & Retail Story",
  description:
    "Learn about Olenna, our heritage of everyday elegance, curated retail sanctuary, and commitment to quality beauty, ethnic wear, jewellery, and craftsmanship.",
  alternates: {
    canonical: "/about",
  },
};

export default async function AboutPage() {
  const settingsRepo = getSiteSettingsRepository();
  const settings = await settingsRepo.getSiteSettings();

  return (
    <div className="bg-brand-ivory-50 pb-20">
      {/* Hero Banner */}
      <section className="bg-[#FAF1F4] py-16 sm:py-20 border-b border-brand-plum-900/10">
        <Container size="narrow" className="text-center">
          <span className="text-xs font-semibold tracking-[0.25em] text-brand-plum-700 uppercase mb-3 inline-block">
            Our Story & Heritage
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-brand-plum-900 leading-tight mb-6">
            Where Everyday Elegance Meets Thoughtful Curation.
          </h1>
          <p className="text-base sm:text-lg text-brand-text-secondary font-light leading-relaxed max-w-2xl mx-auto">
            Olenna was born from a singular conviction: that modern women deserve a refined, welcoming sanctuary where beauty, fashion, personal care, and tailoring craftsmanship come together under one roof.
          </p>
        </Container>
      </section>

      {/* Editorial Narrative Split */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-md bg-brand-blush-100">
              <Image
                src={assetPath("/images/hero/hero-model.webp")}
                alt="Olenna Brand Narrative"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>

            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold tracking-[0.25em] text-brand-plum-700 uppercase">
                The Retail Philosophy
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-brand-plum-900 leading-snug">
                More than a shopping stop. A space designed to make you feel cherished.
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-brand-text-secondary font-light leading-relaxed">
                <p>
                  In a world of overwhelming endless aisles and impersonal shopping, Olenna is an antidote. Every product on our shelves — from delicate Kundan jhumkas to master tailoring threads and dermatologically tested skincare — is chosen with intention.
                </p>
                <p>
                  Whether you are getting ready for your wedding festivities, picking out an everyday work tote, or seeking fine silk threads for custom couture, Olenna bridges the gap between traditional Indian craftsmanship and contemporary lifestyle desires.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <Button href="/stores" variant="primary" size="md">
                  <span>Visit Our Boutiques</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
                <Button
                  href={settings.customerPwaUrl}
                  isExternal
                  variant="outline"
                  size="md"
                >
                  <span>Shop on Customer App</span>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4 Pillars of Olenna */}
      <section className="py-16 bg-[#F6ECEF] border-y border-brand-plum-900/10">
        <Container>
          <SectionHeader
            overline="Guiding Principles"
            title="The Olenna Standard"
            subtitle="The uncompromising standards that guide every boutique experience and collection."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/80 p-6 rounded-2xl border border-brand-plum-900/10 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-full bg-brand-blush-100 flex items-center justify-center text-brand-plum-900">
                <Sparkles className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-lg font-medium text-brand-plum-900">
                Thoughtful Curation
              </h3>
              <p className="text-xs sm:text-sm text-brand-text-secondary font-light leading-relaxed">
                We select only genuine, high-grade essentials across cosmetics, ethnic textiles, and jewellery.
              </p>
            </div>

            <div className="bg-white/80 p-6 rounded-2xl border border-brand-plum-900/10 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-full bg-brand-blush-100 flex items-center justify-center text-brand-plum-900">
                <Gem className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-lg font-medium text-brand-plum-900">
                Accessible Luxury
              </h3>
              <p className="text-xs sm:text-sm text-brand-text-secondary font-light leading-relaxed">
                Experience the prestige of boutique luxury with transparent pricing and exceptional quality.
              </p>
            </div>

            <div className="bg-white/80 p-6 rounded-2xl border border-brand-plum-900/10 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-full bg-brand-blush-100 flex items-center justify-center text-brand-plum-900">
                <Heart className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-lg font-medium text-brand-plum-900">
                Warm In-Store Hospitality
              </h3>
              <p className="text-xs sm:text-sm text-brand-text-secondary font-light leading-relaxed">
                Our staff are trained stylists and beauty advisors ready to help you discover what suits you best.
              </p>
            </div>

            <div className="bg-white/80 p-6 rounded-2xl border border-brand-plum-900/10 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-full bg-brand-blush-100 flex items-center justify-center text-brand-plum-900">
                <Shield className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-lg font-medium text-brand-plum-900">
                Integrity & Authenticity
              </h3>
              <p className="text-xs sm:text-sm text-brand-text-secondary font-light leading-relaxed">
                Clear ingredient transparency, skin-safe formulations, and ethical sourcing practices.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* In-Store Atmosphere Banner */}
      <section className="pt-16 sm:pt-20">
        <Container>
          <div className="relative rounded-3xl overflow-hidden bg-brand-plum-900 text-white p-8 sm:p-12 lg:p-16">
            <div className="max-w-2xl space-y-4">
              <span className="text-xs font-semibold tracking-[0.25em] text-brand-champagne-400 uppercase">
                Physical Experience
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif leading-tight">
                Experience Olenna in Chennai, Bengaluru, and Hyderabad.
              </h2>
              <p className="text-sm sm:text-base text-brand-mauve-100 font-light leading-relaxed">
                Step into our warm boutiques for personalized bridal consultations, jewellery try-ons, and master tailoring assistance.
              </p>
              <div className="pt-4">
                <Button
                  href="/stores"
                  variant="secondary"
                  size="md"
                  className="bg-brand-champagne-400 text-brand-plum-950 hover:bg-brand-champagne-200"
                >
                  <Compass className="w-4 h-4 mr-2" />
                  <span>Explore Store Directory</span>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
