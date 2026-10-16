# Olenna — Premium Multi-Category Retail Public Website

A production-ready, responsive, accessible, and SEO-friendly brand discovery website for **Olenna**, a premium multi-category retail brand celebrating beauty, ethnic fashion, imitation jewellery, accessories, personal care, and master tailoring supplies.

Designed and engineered with an editorial, feminine, and trustworthy aesthetic inspired by luxury retail principles.

---

## 1. Project Purpose & Scope

The primary objective of this website is to:
- Establish Olenna's digital brand presence and luxury retail identity.
- Help customers discover physical boutique locations with opening hours, amenities, and driving directions.
- Showcase curated product categories with editorial photography and highlights.
- Seamlessly direct high-intent shoppers to the external **Olenna Customer PWA** (`shop.olenna.in`).

> [!IMPORTANT]
> This repository is a **public information and brand-discovery website**. It is **not** an e-commerce checkout application, customer account portal, or administrative portal. It does not implement a shopping cart, payment gateway, customer database, or admin login.

---

## 2. Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org) with App Router & Turbopack.
- **Language**: TypeScript with strict mode enabled.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) with custom luxury retail design tokens.
- **Typography**: `Playfair Display` (editorial serif headings) and `Plus Jakarta Sans` (clean modern body sans) via `next/font/google`.
- **Icons**: [Lucide React](https://lucide.dev) & optimized inline SVGs for social platforms.
- **Validation**: [Zod v4](https://zod.dev) for runtime validation of content and API models.
- **Testing**:
  - [Vitest](https://vitest.dev) & React Testing Library for domain models, repositories, and UI components.
  - [Playwright](https://playwright.dev) for full end-to-end user journeys (desktop and mobile).
- **Architecture**: 3-layer Clean Architecture (Presentation, Domain Models, Repository Providers).

---

## 3. Architecture & Separation of Concerns

```
src/
├── app/                              # Layer 1: Next.js App Router (Pages & Layouts)
│   ├── layout.tsx                    # Root layout with fonts, AnnouncementBar, Header, Footer
│   ├── page.tsx                      # Homepage (Hero, Collections, Story, Stores, PWA banner)
│   ├── about/page.tsx                # About Olenna (Brand philosophy, retail pillars)
│   ├── stores/                       # Store locator & location discovery
│   │   ├── page.tsx                  # Search & city-filterable store directory
│   │   └── [slug]/page.tsx           # Individual store detail page with structured data
│   ├── collections/                  # Category previews
│   │   ├── page.tsx                  # All collections overview
│   │   └── [slug]/page.tsx           # Category showcase & PWA redirect CTA
│   ├── contact/page.tsx              # Concierge info, corporate address & validated enquiry form
│   ├── privacy-policy/page.tsx       # Informational legal notice
│   ├── terms/page.tsx                # Terms of use
│   ├── sitemap.ts                    # Dynamic sitemap (includes published stores & active categories)
│   ├── robots.ts                     # Search engine crawler policies
│   └── globals.css                   # Tailwind v4 design tokens and CSS variables
├── components/                       # Layer 1: Presentation (Reusable UI Components)
│   ├── layout/                       # Header, Footer, AnnouncementBar, MobileNav
│   ├── home/                         # HeroSection, CategoryGrid, BrandStory, StoreDiscovery, CustomerPwaBanner
│   ├── stores/                       # StoreCard, StoreDirectoryClient, StoreOpeningHours
│   ├── contact/                      # ContactForm
│   ├── ui/                           # Button, Badge, Container, Logo, SectionHeader, SocialIcons
│   └── seo/                          # OrganizationJsonLd, StoreJsonLd
└── lib/                              # Layers 2 & 3: Content, Models & Repositories
    ├── models/                       # Layer 2: Domain models and Zod schemas
    │   ├── category.ts               # Category schema & TypeScript interface
    │   ├── store.ts                  # Store schema & TypeScript interface
    │   ├── content.ts                # Homepage section models (Hero, Story, etc.)
    │   └── settings.ts               # SiteSettings, Navigation, ContactDetails
    └── repositories/                 # Layer 3: Provider Interfaces & Implementations
        ├── types.ts                  # Interfaces: IStoreRepository, ICategoryRepository, etc.
        ├── mock/                     # Default mock/static data provider
        │   ├── mock-data.ts          # Provisional store and category content
        │   ├── mock-store.repository.ts
        │   ├── mock-category.repository.ts
        │   ├── mock-content.repository.ts
        │   └── mock-settings.repository.ts
        └── index.ts                  # Factory resolver (supports swapping with API repository)
```

---

## 4. Design System & Tokens

The visual identity is based on the provided luxury design reference:

| Design Token | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Deep Plum** | `#493541` / `#33232D` | Primary brand color, headers, CTAs, focus indicators |
| **Blush Pink** | `#F5E3EA` / `#FAF1F4` | Card backgrounds, hero tint, category badge |
| **Soft Mauve** | `#DCC5D8` / `#EFE4EC` | Secondary accents, slider badges, subtle borders |
| **Warm Ivory** | `#FFFAF7` / `#FAF5F2` | Page background, content containers |
| **Champagne** | `#C4A181` / `#DFC7B0` | Metallic accents, luxury highlights, boutique tags |
| **Text Primary** | `#261C22` | High-contrast readable body and heading text |
| **Text Secondary** | `#5C4C56` | Subheadings, addresses, descriptions |

---

## 5. Local Development Commands

### Install Dependencies
```bash
npm install
```

### Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Run Unit & Integration Tests (Vitest)
```bash
npm test
```

### Run End-to-End Tests (Playwright)
```bash
npm run test:e2e
```

### Run Linter
```bash
npm run lint
```

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm run start
```

---

## 6. Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Destination URL for the Olenna Customer PWA online shop
NEXT_PUBLIC_CUSTOMER_PWA_URL="https://shop.olenna.in"

# Optional backend endpoint for the customer contact form
NEXT_PUBLIC_CONTACT_API_URL=""

# Future Admin Portal / Backend API integration (optional)
CONTENT_SOURCE="mock" # or "api"
API_BASE_URL="https://api.olenna.in"
REVALIDATION_SECRET="olenna-secret-token"
```

---

## 7. How to Add or Edit Stores and Categories

All business content is isolated from presentation components.

### Editing Stores:
Open [`src/lib/repositories/mock/mock-data.ts`](src/lib/repositories/mock/mock-data.ts) and locate `MOCK_STORES`. Each store entry supports:
- `name`: Store title (e.g. `Olenna Flagship — Anna Nagar`).
- `slug`: URL slug (e.g. `chennai-anna-nagar`).
- `city`, `locality`, `addressLines`, `postalCode`.
- `phone`: Public phone link (e.g. `+91 44 2621 0000`).
- `directionsUrl`: Google Maps link.
- `openingHours`: Day-by-day operating timings.
- `isFeatured`: `true` to feature on the homepage.
- `isPublished`: Set to `false` to keep in draft mode (automatically excluded from public listings).

### Editing Categories:
Locate `MOCK_CATEGORIES` in [`src/lib/repositories/mock/mock-data.ts`](src/lib/repositories/mock/mock-data.ts):
- `name`: Category label.
- `slug`: URL slug.
- `description`: Short card teaser.
- `longDescription`: Detailed paragraph for collection landing page.
- `image`: WebP asset path.
- `displayOrder`: Controls card ordering without altering JSX.
- `isActive`: Set to `false` to hide inactive categories.

---

## 8. Future Admin Portal Integration

The website is specifically engineered so that an external Admin Portal can manage content without requiring any frontend code changes.

For full architecture details, proposed REST API schemas, publishing workflows, and revalidation instructions, refer to:
👉 [**`docs/admin-integration.md`**](docs/admin-integration.md)

---

## 9. SEO & Accessibility Standards

- **Metadata**: Unique titles, descriptions, and canonical URLs on all public pages.
- **Structured Data**: Semantic JSON-LD schemas generated for `RetailStore` (Organization) and `ClothingStore` / `LocalBusiness` on individual store pages.
- **Images**: High-density modern WebP images with explicit dimensions and descriptive alternative text to eliminate Cumulative Layout Shift (CLS).
- **Keyboard Navigation**: Accessible focus indicators, skip targets, and mobile drawer controls with proper ARIA attributes.
- **Sitemap & Robots**: Dynamically generated [`/sitemap.xml`](src/app/sitemap.ts) and [`/robots.txt`](src/app/robots.ts).

---

## 10. Outstanding Business Inputs & Safe Defaults

Until verified corporate data is officially signed off by Olenna stakeholders:
1. **Store Locations**: Current records represent flagship boutiques in Chennai, Bengaluru, and Hyderabad marked as provisional sample data.
2. **Customer PWA**: Defaults to `https://shop.olenna.in` or the configured `NEXT_PUBLIC_CUSTOMER_PWA_URL`.
3. **Contact Form**: Form validation runs on the client. In decoupled prototype mode (without `NEXT_PUBLIC_CONTACT_API_URL`), it clearly informs the visitor that form submissions are validated in prototype mode and directs immediate inquiries to `care@olenna.in`. No fake success messages are displayed.
# olenna-studio.github.io
