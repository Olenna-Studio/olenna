import { IStoreRepository } from "../types";
import { Store, StoreSchema } from "@/lib/models/store";
import { MOCK_STORES } from "./mock-data";

export class MockStoreRepository implements IStoreRepository {
  private stores: Store[];

  constructor(initialData: Store[] = MOCK_STORES) {
    // Validate each store with Zod schema at runtime
    this.stores = initialData.map((s) => StoreSchema.parse(s));
  }

  async getPublishedStores(): Promise<Store[]> {
    return this.stores
      .filter((s) => s.isPublished)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }

  async getFeaturedStores(): Promise<Store[]> {
    const published = await this.getPublishedStores();
    return published.filter((s) => s.isFeatured);
  }

  async getStoreBySlug(slug: string): Promise<Store | null> {
    const published = await this.getPublishedStores();
    const found = published.find(
      (s) => s.slug.toLowerCase() === slug.toLowerCase()
    );
    return found ?? null;
  }

  async getStoresByCity(city: string): Promise<Store[]> {
    const published = await this.getPublishedStores();
    return published.filter(
      (s) => s.city.toLowerCase() === city.toLowerCase()
    );
  }

  async getCities(): Promise<string[]> {
    const published = await this.getPublishedStores();
    const citySet = new Set(published.map((s) => s.city));
    return Array.from(citySet).sort();
  }
}
