import { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Terms of Use | Olenna",
  description: "Terms and conditions of use for Olenna's public brand website.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsOfUsePage() {
  return (
    <div className="bg-brand-ivory-50 py-12 sm:py-16 min-h-screen">
      <Container size="narrow">
        <h1 className="text-3xl sm:text-4xl font-serif text-brand-plum-900 mb-6">
          Terms of Use
        </h1>
        <div className="prose prose-brand text-brand-text-secondary text-sm sm:text-base space-y-6 leading-relaxed">
          <p>
            Last Updated: June 2024
          </p>
          <p>
            Welcome to the Olenna brand website. By accessing or browsing this website, you agree to comply with and be bound by the following terms of use.
          </p>

          <h2 className="text-xl font-serif text-brand-plum-900 pt-4">
            1. Informational Purpose
          </h2>
          <p>
            This website provides brand information, physical boutique directories, and category previews. Digital purchases and orders are fulfilled through our dedicated Customer PWA application.
          </p>

          <h2 className="text-xl font-serif text-brand-plum-900 pt-4">
            2. Intellectual Property
          </h2>
          <p>
            All content, including brand logos, editorial photography, typography, and website designs, are the property of Olenna Retail Private Limited or its licensors.
          </p>

          <h2 className="text-xl font-serif text-brand-plum-900 pt-4">
            3. Store Operating Timings
          </h2>
          <p>
            Store hours and availability listed on this directory may vary during regional holidays. We advise calling the local boutique number prior to travel for festive schedules.
          </p>
        </div>
      </Container>
    </div>
  );
}
