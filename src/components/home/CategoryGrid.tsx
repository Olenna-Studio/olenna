import React from "react";
import { Category } from "@/lib/models/category";
import { CategorySectionContent } from "@/lib/models/content";
import { CategoryCard } from "./CategoryCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface CategoryGridProps {
  categories: Category[];
  content: CategorySectionContent;
}

export function CategoryGrid({ categories, content }: CategoryGridProps) {
  if (!content.isVisible || categories.length === 0) {
    return null;
  }

  return (
    <section id="collections" className="py-12 sm:py-16 bg-brand-ivory-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={content.headline}
          subtitle={content.subheadline}
          align="left"
        />

        {/* Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-5">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
