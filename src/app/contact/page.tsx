import { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, Compass } from "lucide-react";
import { getSiteSettingsRepository, getStoreRepository } from "@/lib/repositories";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Olenna — Customer Concierge & Inquiries",
  description:
    "Get in touch with Olenna. Enquire about our retail collections, book in-store styling appointments, or connect with our customer concierge team.",
  alternates: {
    canonical: "/contact",
  },
};

export default async function ContactPage() {
  const settingsRepo = getSiteSettingsRepository();
  const storeRepo = getStoreRepository();

  const [settings, stores] = await Promise.all([
    settingsRepo.getSiteSettings(),
    storeRepo.getPublishedStores(),
  ]);

  const storeOptions = stores.map((s) => ({
    id: s.id,
    name: `${s.name} (${s.city})`,
  }));

  return (
    <div className="bg-brand-ivory-50 min-h-screen py-10 sm:py-16">
      <Container>
        <SectionHeader
          as="h1"
          overline="Get In Touch"
          title="We'd Love to Hear From You"
          subtitle="Have questions about our collections, customized tailoring, or bridal styling? Our team is at your service."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Contact Details & Store Link */}
          <div className="lg:col-span-5 space-y-6">
            {/* Concierge Information Card */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-brand-plum-900/10 shadow-xs space-y-6">
              <h3 className="font-serif text-xl text-brand-plum-900">
                Customer Concierge
              </h3>

              <div className="space-y-4 text-sm text-brand-text-secondary">
                {settings.contactDetails.primaryEmail && (
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-brand-plum-700 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-brand-plum-900 text-xs uppercase tracking-wider">
                        Email Us
                      </p>
                      <a
                        href={`mailto:${settings.contactDetails.primaryEmail}`}
                        className="hover:text-brand-plum-900 transition-colors"
                      >
                        {settings.contactDetails.primaryEmail}
                      </a>
                    </div>
                  </div>
                )}

                {settings.contactDetails.primaryPhone && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-brand-plum-700 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-brand-plum-900 text-xs uppercase tracking-wider">
                        Call Concierge
                      </p>
                      <a
                        href={`tel:${settings.contactDetails.primaryPhone}`}
                        className="hover:text-brand-plum-900 transition-colors"
                      >
                        {settings.contactDetails.phoneDisplay}
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-brand-plum-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-brand-plum-900 text-xs uppercase tracking-wider">
                      Assistance Hours
                    </p>
                    <p>{settings.contactDetails.supportHours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-plum-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-brand-plum-900 text-xs uppercase tracking-wider">
                      Registered Corporate Address
                    </p>
                    <address className="not-italic leading-relaxed text-xs">
                      {settings.contactDetails.headquartersAddress}
                    </address>
                  </div>
                </div>
              </div>

              {/* Verified Status Tag */}
              <div className="pt-4 border-t border-brand-plum-900/10 text-xs text-brand-text-muted flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-brand-plum-700" />
                <span>Operating physical boutiques across Chennai, Bengaluru, and Hyderabad.</span>
              </div>
            </div>

            {/* In-Store Styling Notice Card */}
            <div className="bg-[#FAF1F4] p-6 sm:p-8 rounded-2xl border border-brand-plum-900/10 space-y-3">
              <h4 className="font-serif text-lg text-brand-plum-900">
                Visiting Our Boutiques
              </h4>
              <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed font-light">
                Looking to experience our bridal jewellery, festive sarees, or personalized tailoring in person? Walk-ins are always welcomed, or you may reserve an exclusive consultation.
              </p>
              <div className="pt-2">
                <Link
                  href="/stores"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-plum-900 hover:underline"
                >
                  <span>Explore store directory and timings →</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm stores={storeOptions} />
          </div>
        </div>
      </Container>
    </div>
  );
}
