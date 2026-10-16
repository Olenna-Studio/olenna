import { ICategoryRepository } from "../types";
import { Category, CategorySchema } from "@/lib/models/category";
import { MOCK_CATEGORIES } from "./mock-data";

export class MockCategoryRepository implements ICategoryRepository {
  private categories: Category[];

  constructor(initialData: Category[] = MOCK_CATEGORIES) {
    this.categories = initialData.map((c) => CategorySchema.parse(c));
  }

  async getActiveCategories(): Promise<Category[]> {
    return this.categories
      .filter((c) => c.isActive)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    const active = await this.getActiveCategories();
    const found = active.find(
      (c) => c.slug.toLowerCase() === slug.toLowerCase()
    );
    return found ?? null;
  }
}
