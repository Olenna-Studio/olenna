import { Metadata } from "next";
import { getCategoryRepository, getSiteContentRepository } from "@/lib/repositories";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CategoryCard } from "@/components/home/CategoryCard";
import { CustomerPwaBanner } from "@/components/home/CustomerPwaBanner";

export const metadata: Metadata = {
  title: "Curated Collections — Beauty, Fashion, Jewellery & Essentials | Olenna",
  description:
    "Explore Olenna's thoughtfully curated retail collections across beauty, ethnic fashion, imitation jewellery, accessories, personal care, and tailoring supplies.",
  alternates: {
    canonical: "/collections",
  },
};

export default async function CollectionsPage() {
  const categoryRepo = getCategoryRepository();
  const contentRepo = getSiteContentRepository();

  const [categories, content] = await Promise.all([
    categoryRepo.getActiveCategories(),
    contentRepo.getHomepageContent(),
  ]);

  return (
    <div className="bg-brand-ivory-50 min-h-screen py-10 sm:py-16">
      <Container>
        <SectionHeader
          overline="Our Categories"
          title="Curated Collections for Every Moment"
          subtitle="Discover high-quality essentials handpicked for grace, elegance, and longevity. Available in our physical boutiques and via the Olenna Customer App."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </Container>

      <div className="mt-16">
        <CustomerPwaBanner content={content.pwaBanner} />
      </div>
    </div>
  );
}
