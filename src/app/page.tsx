import { Metadata } from "next";
import {
  getSiteContentRepository,
  getCategoryRepository,
  getStoreRepository,
} from "@/lib/repositories";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { BrandStory } from "@/components/home/BrandStory";
import { StoreDiscovery } from "@/components/home/StoreDiscovery";
import { CustomerPwaBanner } from "@/components/home/CustomerPwaBanner";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Everyday Elegance, Thoughtfully Curated | Olenna",
  description:
    "Explore Olenna — premium beauty, ethnic fashion, imitation jewellery, accessories, personal care, and tailoring supplies. Discover our boutiques and shop online.",
  alternates: {
    canonical: "/",
  },
};

export default async function HomePage() {
  const contentRepo = getSiteContentRepository();
  const categoryRepo = getCategoryRepository();
  const storeRepo = getStoreRepository();

  const [homepageContent, activeCategories, featuredStores] = await Promise.all([
    contentRepo.getHomepageContent(),
    categoryRepo.getActiveCategories(),
    storeRepo.getFeaturedStores(),
  ]);

  return (
    <>
      <OrganizationJsonLd />
      <HeroSection content={homepageContent.heroSection} />
      <CategoryGrid
        categories={activeCategories}
        content={homepageContent.categorySection}
      />
      <BrandStory content={homepageContent.brandStory} />
      <StoreDiscovery
        content={homepageContent.storeDiscovery}
        featuredStores={featuredStores}
      />
      <CustomerPwaBanner content={homepageContent.pwaBanner} />
    </>
  );
}
