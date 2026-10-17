import { test, expect } from "@playwright/test";

test.describe("Olenna Website Key Journeys", () => {
  test("Homepage loads properly with brand hero, collections and links", async ({ page }) => {
    await page.goto("/");

    // Check title and logo
    await expect(page).toHaveTitle(/Everyday Elegance/i);
    await expect(page.getByRole("link", { name: /olenna/i }).first()).toBeVisible();

    // Check Announcement Bar
    await expect(page.locator("text=Discover Olenna").first()).toBeVisible();

    // Check Hero Section
    await expect(page.locator("h1")).toContainText(/Everyday elegance/i);

    // Check Category Grid
    await expect(
      page.getByRole("heading", { name: "Explore our collections", exact: true })
    ).toBeVisible();
    await expect(page.locator("text=Beauty & Cosmetics").first()).toBeVisible();
    await expect(page.locator("text=Fashion & Ethnic Wear").first()).toBeVisible();
    await expect(page.locator("text=Imitation Jewellery").first()).toBeVisible();

    // Check Brand Story
    await expect(page.locator("text=THE OLENNA EXPERIENCE")).toBeVisible();
    await expect(page.locator("text=Curated Selections")).toBeVisible();

    // Check Store Discovery Section
    await expect(page.locator("text=Find Olenna near you")).toBeVisible();

    // Check Customer PWA Banner
    await expect(page.locator("text=Your next favourite find awaits")).toBeVisible();
  });

  test("Shop Online button uses configured destination URL", async ({ page }) => {
    await page.goto("/");
    // Check any Shop Online link has valid URL
    const pwaLinks = page.locator('a[href*="shop.olenna.in"]');
    const count = await pwaLinks.count();
    expect(count).toBeGreaterThan(0);
    const href = await pwaLinks.first().getAttribute("href");
    expect(href).toMatch(/^https?:\/\//);
  });

  test("Store directory supports city filtering and keyword search", async ({ page }) => {
    await page.goto("/stores");
    await expect(page.locator("h1")).toContainText(/Find an Olenna Boutique/i);

    // Initial stores displayed
    await expect(page.locator("text=Olenna Flagship — Anna Nagar")).toBeVisible();
    await expect(page.locator("text=Olenna Studio — Indiranagar")).toBeVisible();

    // Filter by Bengaluru
    await page.click('button:has-text("Bengaluru")');
    await expect(page.locator("text=Olenna Studio — Indiranagar")).toBeVisible();
    await expect(page.locator("text=Olenna Flagship — Anna Nagar")).not.toBeVisible();

    // Reset or Switch to all cities
    await page.click('button:has-text("All Cities")');

    // Search query
    const searchInput = page.locator('input[placeholder*="Search by store name"]');
    await searchInput.fill("Jubilee");
    await expect(page.locator("text=Jubilee Hills").first()).toBeVisible();
    await expect(page.locator("text=Indiranagar")).not.toBeVisible();
  });

  test("Individual store page displays detailed operating hours and contact options", async ({ page }) => {
    await page.goto("/stores/chennai-anna-nagar");
    await expect(page.locator("h1")).toContainText(/Olenna Flagship — Anna Nagar/i);
    await expect(page.locator("text=Weekly Operating Hours")).toBeVisible();
    await expect(page.locator("text=Monday").first()).toBeVisible();
    await expect(page.locator("text=10:00 AM – 09:30 PM").first()).toBeVisible();
    await expect(page.locator('a:has-text("Get Directions")')).toBeVisible();
    await expect(page.locator('a:has-text("Call Store")')).toBeVisible();

    // Back button returns to directory
    await page.click("text=Back to All Stores");
    await expect(page).toHaveURL(/\/stores\/?$/);
  });

  test("About page conveys brand philosophy and retail standards", async ({ page }) => {
    await page.goto("/about");
    await expect(page.locator("h1")).toContainText(/Where Everyday Elegance Meets Thoughtful Curation/i);
    await expect(
      page.getByRole("heading", { name: "Thoughtful Curation", exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Accessible Luxury", exact: true })
    ).toBeVisible();
  });

  test("Contact form validates required inputs and gives accessible feedback", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator("h1")).toContainText(/We'd Love to Hear From You/i);

    // Submit without input triggers validation errors
    await page.click('button:has-text("Submit Enquiry")');
    await expect(page.locator("text=Please enter your full name")).toBeVisible();
    await expect(page.locator("text=Please provide a valid email address")).toBeVisible();

    // Fill valid inputs
    await page.fill("#fullName", "Priya Sundaram");
    await page.fill("#email", "priya@example.com");
    await page.fill("#phone", "9876543210");
    await page.fill("#subject", "Bridal consultation");
    await page.fill("#message", "I would like to book a bridal jewellery appointment for next Saturday.");

    await page.click('button:has-text("Submit Enquiry")');
    // Check validation confirmation state per prompt guidelines
    await expect(page.locator("text=Submission Validation Complete")).toBeVisible();
  });
});
