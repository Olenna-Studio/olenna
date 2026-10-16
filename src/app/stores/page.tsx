import { Suspense } from "react";
import { Metadata } from "next";
import { getStoreRepository } from "@/lib/repositories";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StoreDirectoryClient } from "@/components/stores/StoreDirectoryClient";

export const metadata: Metadata = {
  title: "Our Stores — Locate Olenna Boutiques",
  description:
    "Find an Olenna store near you. Explore our flagship and boutique destinations across Chennai, Bengaluru, and Hyderabad with addresses, opening hours, and directions.",
  alternates: {
    canonical: "/stores",
  },
};

export default async function StoresPage() {
  const storeRepo = getStoreRepository();

  const [stores, cities] = await Promise.all([
    storeRepo.getPublishedStores(),
    storeRepo.getCities(),
  ]);

  return (
    <div className="bg-brand-ivory-50 min-h-screen py-10 sm:py-16">
      <Container>
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
      </Container>
    </div>
  );
}
