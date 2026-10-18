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

const testSampleStores = [
  {
    id: "test-chennai",
    slug: "chennai-test",
    name: "Olenna Flagship — Chennai",
    addressLines: ["Plot 42"],
    locality: "Anna Nagar",
    city: "Chennai",
    state: "Tamil Nadu",
    postalCode: "600040",
    country: "India",
    isFeatured: true,
    isPublished: true,
    displayOrder: 1,
    openingHours: [],
  },
  {
    id: "test-bengaluru",
    slug: "bengaluru-test",
    name: "Olenna Studio — Bengaluru",
    addressLines: ["540, 12th Main"],
    locality: "Indiranagar",
    city: "Bengaluru",
    state: "Karnataka",
    postalCode: "560038",
    country: "India",
    isFeatured: false,
    isPublished: true,
    displayOrder: 2,
    openingHours: [],
  },
  {
    id: "test-draft",
    slug: "draft-store",
    name: "Olenna Draft",
    addressLines: ["Draft Road"],
    locality: "Draft",
    city: "Hyderabad",
    state: "Telangana",
    postalCode: "500033",
    country: "India",
    isFeatured: false,
    isPublished: false,
    displayOrder: 3,
    openingHours: [],
  },
];

describe("Store Repository", () => {
  it("filters out unpublished / in-progress stores in default mock data", async () => {
    const repo = new MockStoreRepository();
    const stores = await repo.getPublishedStores();

    // Default mock stores are currently in progress / opening soon
    expect(stores.length).toBe(0);
    expect(stores.every((s) => s.isPublished)).toBe(true);
  });

  it("returns only published stores sorted by displayOrder when stores exist", async () => {
    const repo = new MockStoreRepository(testSampleStores);
    const stores = await repo.getPublishedStores();

    expect(stores.length).toBe(2);
    expect(stores.every((s) => s.isPublished)).toBe(true);
    expect(stores[0].displayOrder).toBeLessThanOrEqual(stores[1].displayOrder);

    // Ensure draft store is excluded
    const draft = stores.find((s) => s.slug === "draft-store");
    expect(draft).toBeUndefined();
  });

  it("returns featured stores only", async () => {
    const repo = new MockStoreRepository(testSampleStores);
    const featured = await repo.getFeaturedStores();

    expect(featured.length).toBe(1);
    expect(featured[0].slug).toBe("chennai-test");
    expect(featured.every((s) => s.isFeatured)).toBe(true);
  });

  it("finds store by slug", async () => {
    const repo = new MockStoreRepository(testSampleStores);
    const store = await repo.getStoreBySlug("chennai-test");

    expect(store).not.toBeNull();
    expect(store?.name).toContain("Chennai");
    expect(store?.city).toBe("Chennai");
  });

  it("filters stores by city", async () => {
    const repo = new MockStoreRepository(testSampleStores);
    const chennaiStores = await repo.getStoresByCity("Chennai");

    expect(chennaiStores.length).toBe(1);
    expect(chennaiStores.every((s) => s.city.toLowerCase() === "chennai")).toBe(true);
  });

  it("returns unique sorted list of cities", async () => {
    const repo = new MockStoreRepository(testSampleStores);
    const cities = await repo.getCities();

    expect(cities).toContain("Bengaluru");
    expect(cities).toContain("Chennai");
    expect(cities).not.toContain("Hyderabad"); // Unpublished draft excluded
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
  it("loads site settings with valid customer PWA url and updated contact details", async () => {
    const repo = new MockSiteSettingsRepository();
    const settings = await repo.getSiteSettings();

    expect(settings.brandName).toBe("Olenna");
    expect(settings.customerPwaUrl).toMatch(/^https?:\/\//);
    expect(settings.mainNavigation.length).toBe(4);
    expect(settings.contactDetails.primaryEmail).toBe("olennastudiox@gmail.com");
    expect(settings.contactDetails.phoneDisplay).toContain("9741424695");
  });
});
