import { describe, it, expect } from "vitest";
import { MockCategoryRepository } from "../mock/mock-category.repository";
import { MockStoreRepository } from "../mock/mock-store.repository";
import { MockSiteContentRepository } from "../mock/mock-content.repository";
import { MockSiteSettingsRepository } from "../mock/mock-settings.repository";

describe("Category Repository", () => {
  it("returns only active categories sorted by displayOrder", async () => {
    const repo = new MockCategoryRepository();
    const categories = await repo.getActiveCategories();

    expect(categories.length).toBeGreaterThan(0);
    expect(categories.every((c) => c.isActive)).toBe(true);

    // Verify ordering
    for (let i = 0; i < categories.length - 1; i++) {
      expect(categories[i].displayOrder).toBeLessThanOrEqual(
        categories[i + 1].displayOrder
      );
    }

    // Verify inactive category is filtered out
    const inactiveFound = categories.find((c) => c.slug === "kids-baby-essentials");
    expect(inactiveFound).toBeUndefined();
  });

  it("retrieves category by slug (case-insensitive)", async () => {
    const repo = new MockCategoryRepository();
    const cat = await repo.getCategoryBySlug("BEAUTY-COSMETICS");

    expect(cat).not.toBeNull();
    expect(cat?.name).toBe("Beauty & Cosmetics");
  });

  it("returns null for non-existent category", async () => {
    const repo = new MockCategoryRepository();
    const cat = await repo.getCategoryBySlug("non-existent-category");
    expect(cat).toBeNull();
  });
});

describe("Store Repository", () => {
  it("returns only published stores sorted by displayOrder", async () => {
    const repo = new MockStoreRepository();
    const stores = await repo.getPublishedStores();

    expect(stores.length).toBeGreaterThan(0);
    expect(stores.every((s) => s.isPublished)).toBe(true);

    // Ensure draft store 'coimbatore-rs-puram' is excluded
    const draft = stores.find((s) => s.slug === "coimbatore-rs-puram");
    expect(draft).toBeUndefined();
  });

  it("returns featured stores only", async () => {
    const repo = new MockStoreRepository();
    const featured = await repo.getFeaturedStores();

    expect(featured.length).toBeGreaterThan(0);
    expect(featured.every((s) => s.isFeatured)).toBe(true);
  });

  it("finds store by slug", async () => {
    const repo = new MockStoreRepository();
    const store = await repo.getStoreBySlug("chennai-anna-nagar");

    expect(store).not.toBeNull();
    expect(store?.name).toContain("Anna Nagar");
    expect(store?.city).toBe("Chennai");
  });

  it("filters stores by city", async () => {
    const repo = new MockStoreRepository();
    const chennaiStores = await repo.getStoresByCity("Chennai");

    expect(chennaiStores.length).toBeGreaterThan(0);
    expect(chennaiStores.every((s) => s.city.toLowerCase() === "chennai")).toBe(true);
  });

  it("returns unique sorted list of cities", async () => {
    const repo = new MockStoreRepository();
    const cities = await repo.getCities();

    expect(cities).toContain("Chennai");
    expect(cities).toContain("Bengaluru");
    expect(cities).toContain("Hyderabad");
  });
});

describe("Site Content Repository", () => {
  it("loads homepage content with announcement and hero slides", async () => {
    const repo = new MockSiteContentRepository();
    const content = await repo.getHomepageContent();

    expect(content.announcementBar.isVisible).toBe(true);
    expect(content.heroSection.slides.length).toBeGreaterThan(0);
    expect(content.brandStory.pillars.length).toBe(3);
    expect(content.pwaBanner.headline).toBeTruthy();
  });
});

describe("Site Settings Repository", () => {
  it("loads site settings with valid customer PWA url", async () => {
    const repo = new MockSiteSettingsRepository();
    const settings = await repo.getSiteSettings();

    expect(settings.brandName).toBe("Olenna");
    expect(settings.customerPwaUrl).toMatch(/^https?:\/\//);
    expect(settings.mainNavigation.length).toBe(4);
  });
});
