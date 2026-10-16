import { describe, it, expect } from "vitest";
import React from "react";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/Button";
import { CategoryCard } from "@/components/home/CategoryCard";
import { StoreCard } from "@/components/stores/StoreCard";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Category } from "@/lib/models/category";
import { Store } from "@/lib/models/store";
import { MOCK_SITE_SETTINGS } from "@/lib/repositories/mock/mock-data";

const sampleCategory: Category = {
  id: "test-cat",
  slug: "test-beauty",
  name: "Beauty & Cosmetics",
  description: "Luxury skincare and cosmetics",
  image: "/images/categories/beauty-cosmetics.webp",
  displayOrder: 1,
  isActive: true,
};

const sampleStore: Store = {
  id: "test-store",
  slug: "chennai-flagship",
  name: "Olenna Anna Nagar",
  tagline: "Flagship retail experience",
  addressLines: ["42, 2nd Avenue", "Roundtana"],
  locality: "Anna Nagar",
  city: "Chennai",
  state: "Tamil Nadu",
  postalCode: "600040",
  country: "India",
  phone: "+91 44 2621 0000",
  directionsUrl: "https://maps.google.com/?q=Anna+Nagar",
  isFeatured: true,
  isPublished: true,
  displayOrder: 1,
  openingHours: [
    { day: "Monday", open: "10:00 AM", close: "09:30 PM" },
  ],
};

describe("Button component", () => {
  it("renders a standard button with text", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("renders an external link when href and isExternal are provided", () => {
    render(
      <Button href="https://example.com" isExternal>
        Visit External
      </Button>
    );
    const link = screen.getByRole("link", { name: /visit external/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});

describe("CategoryCard component", () => {
  it("renders category name and link", () => {
    render(<CategoryCard category={sampleCategory} />);
    expect(screen.getByText("Beauty & Cosmetics")).toBeInTheDocument();
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/collections/test-beauty");
  });
});

describe("StoreCard component", () => {
  it("renders store name, locality, address, and contact actions", () => {
    render(<StoreCard store={sampleStore} />);
    expect(screen.getByText("Olenna Anna Nagar")).toBeInTheDocument();
    expect(screen.getAllByText(/Anna Nagar/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Chennai/).length).toBeGreaterThan(0);
    expect(screen.getByText(/42, 2nd Avenue/)).toBeInTheDocument();

    // Call button
    const callBtn = screen.getByRole("link", { name: /call olenna anna nagar/i });
    expect(callBtn).toHaveAttribute("href", "tel:+91 44 2621 0000");

    // Directions button
    const dirBtn = screen.getByRole("link", { name: /directions to olenna anna nagar/i });
    expect(dirBtn).toHaveAttribute("href", "https://maps.google.com/?q=Anna+Nagar");
  });

  it("does not render phone link if phone is undefined", () => {
    const storeWithoutPhone: Store = {
      ...sampleStore,
      phone: undefined,
    };
    render(<StoreCard store={storeWithoutPhone} />);
    expect(screen.queryByRole("link", { name: /call/i })).toBeNull();
  });
});

describe("AnnouncementBar component", () => {
  it("renders message when visible", () => {
    render(
      <AnnouncementBar
        announcement={{
          isVisible: true,
          message: "Welcome to Olenna",
          storeLocatorLabel: "Stores",
          storeLocatorUrl: "/stores",
        }}
        settings={MOCK_SITE_SETTINGS}
      />
    );
    expect(screen.getByText("Welcome to Olenna")).toBeInTheDocument();
  });

  it("does not render when isVisible is false", () => {
    const { container } = render(
      <AnnouncementBar
        announcement={{
          isVisible: false,
          message: "Hidden announcement",
          storeLocatorLabel: "Stores",
          storeLocatorUrl: "/stores",
        }}
        settings={MOCK_SITE_SETTINGS}
      />
    );
    expect(container.firstChild).toBeNull();
  });
});
