import { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy Policy | Olenna",
  description: "Privacy policy and personal data protection principles for Olenna.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-brand-ivory-50 py-12 sm:py-16 min-h-screen">
      <Container size="narrow">
        <h1 className="text-3xl sm:text-4xl font-serif text-brand-plum-900 mb-6">
          Privacy Policy
        </h1>
        <div className="prose prose-brand text-brand-text-secondary text-sm sm:text-base space-y-6 leading-relaxed">
          <p>
            Last Updated: June 2024
          </p>
          <p>
            At Olenna, we respect your privacy and are committed to protecting your personal information. This Privacy Policy outlines how Olenna Retail Private Limited (&ldquo;Olenna&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;) collects, uses, and safeguards information when you visit our public website.
          </p>

          <h2 className="text-xl font-serif text-brand-plum-900 pt-4">
            1. Information We Collect
          </h2>
          <p>
            Our public website is primarily designed for informational and store discovery purposes. When you choose to contact us via our enquiry form, we collect your name, email address, optional contact number, and message contents solely to address your query.
          </p>

          <h2 className="text-xl font-serif text-brand-plum-900 pt-4">
            2. Customer App and Online Shopping
          </h2>
          <p>
            When you select &ldquo;Shop Online&rdquo;, you are directed to the Olenna Customer PWA, which maintains its own dedicated authentication, order processing, and payment security standards.
          </p>

          <h2 className="text-xl font-serif text-brand-plum-900 pt-4">
            3. Contact Us
          </h2>
          <p>
            If you have questions regarding this policy, please email us at{" "}
            <a href="mailto:care@olenna.in" className="text-brand-plum-900 underline font-medium">
              care@olenna.in
            </a>
            .
          </p>
        </div>
      </Container>
    </div>
  );
}
