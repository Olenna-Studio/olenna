# Olenna Public Website — Admin Portal Integration Architecture & API Contract

## 1. Overview & Architectural Boundaries

The Olenna website (`olenna_web`) is a **read-only, SEO-optimized public brand discovery frontend**. It is strictly decoupled from the internal Admin Portal and Customer PWA.

### Separation of Concerns
1. **Public Website (`olenna_web`)**:
   - Consumes only public, pre-published content.
   - Never holds administrative credentials, JWT tokens with write scopes, or private database keys.
   - Does not implement mutations, store record CRUD, customer carts, or back-office dashboards.
   - Provides an abstracted Repository layer (`IStoreRepository`, `ICategoryRepository`, `ISiteContentRepository`, `ISiteSettingsRepository`) allowing seamless transition from the current mock repository to an HTTP/REST API provider without modifying UI components.
2. **Admin Portal**:
   - Authenticated internal portal used by authorized retail staff and merchandising teams.
   - Handles product and store lifecycle: drafts, revisions, store operating hour alterations, holiday schedules, and category ordering.
   - Publishes validated records to the backend content store and triggers webhooks / cache invalidation.
3. **Customer PWA (`shop.olenna.in`)**:
   - Independent shopping and checkout application.
   - The public website directs high-intent shoppers to this destination via configurable environment variables.

---

## 2. Target Publishing Workflow

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│  Admin Portal   │ ────> │  Backend API /  │ ────> │  On-Demand ISR  │ ────> │ Olenna Public   │
│  (Store Manager │       │  Database Store │       │  Revalidation   │       │ Website (Edge)  │
│  edits hours)   │       │  (Validates)    │       │  Webhook        │       │                 │
└─────────────────┘       └─────────────────┘       └─────────────────┘       └─────────────────┘
```

1. **Staff Action**: An authorized store operations manager updates the store hours or special holiday notice for a branch in the Admin Portal.
2. **Persistence**: The backend persists the record, marks `isPublished: true`, and updates the `updatedAt` timestamp.
3. **Cache Invalidation**: The backend invokes Next.js On-Demand Revalidation (`/api/revalidate?tag=stores&secret=...`) or Next.js cache tag invalidation.
4. **Instant Serving**: The public site serves the statically optimized updated store page on the next request.

---

## 3. Proposed Backend REST API Contract

When the Admin Portal's backend is ready, the public website will consume the following unauthenticated (or public read-token) read endpoints:

### 3.1 Stores API

#### `GET /api/v1/public/stores`
Returns all active, published store locations.

**Query Parameters:**
- `city` *(optional, string)*: Filter by city name (e.g., `Chennai`).
- `featured` *(optional, boolean)*: Filter only featured flagship stores.

**Response Schema (`200 OK`):**
```json
{
  "data": [
    {
      "id": "store-chennai-flagship",
      "slug": "chennai-anna-nagar",
      "name": "Olenna Flagship — Anna Nagar",
      "tagline": "Experience our complete beauty, jewellery, and couture lounge.",
      "addressLines": ["Plot 42, 2nd Avenue", "Near Roundtana"],
      "locality": "Anna Nagar",
      "city": "Chennai",
      "state": "Tamil Nadu",
      "postalCode": "600040",
      "country": "India",
      "coordinates": {
        "latitude": 13.0850,
        "longitude": 80.2101
      },
      "phone": "+91 44 2621 0000",
      "email": "annanagar@olenna.in",
      "openingHours": [
        { "day": "Monday", "open": "10:00 AM", "close": "09:30 PM", "isClosed": false },
        { "day": "Tuesday", "open": "10:00 AM", "close": "09:30 PM", "isClosed": false },
        { "day": "Wednesday", "open": "10:00 AM", "close": "09:30 PM", "isClosed": false },
        { "day": "Thursday", "open": "10:00 AM", "close": "09:30 PM", "isClosed": false },
        { "day": "Friday", "open": "10:00 AM", "close": "10:00 PM", "isClosed": false },
        { "day": "Saturday", "open": "10:00 AM", "close": "10:00 PM", "isClosed": false },
        { "day": "Sunday", "open": "10:00 AM", "close": "10:00 PM", "isClosed": false }
      ],
      "specialHoursNotice": "Valet parking and personal styling appointments available.",
      "directionsUrl": "https://maps.google.com/?q=Anna+Nagar+Chennai",
      "image": "https://cdn.olenna.in/stores/anna-nagar.webp",
      "isFeatured": true,
      "isPublished": true,
      "displayOrder": 1,
      "amenities": [
        "Bridal Styling Suite",
        "Cosmetics Try-On Bar",
        "Valet Parking",
        "Tailoring & Alterations Desk",
        "Wheelchair Accessible"
      ],
      "createdAt": "2024-01-15T00:00:00Z",
      "updatedAt": "2024-06-01T00:00:00Z"
    }
  ],
  "meta": {
    "total": 4,
    "timestamp": "2024-06-01T12:00:00Z"
  }
}
```

#### `GET /api/v1/public/stores/:slug`
Returns store details by slug. Returns `404 Not Found` if the store is draft, unpublished, or non-existent.

---

### 3.2 Categories API

#### `GET /api/v1/public/categories`
Returns active retail categories sorted by `displayOrder`.

**Response Schema (`200 OK`):**
```json
{
  "data": [
    {
      "id": "cat-beauty-cosmetics",
      "slug": "beauty-cosmetics",
      "name": "Beauty & Cosmetics",
      "description": "Premium makeup, luxury skincare serums, and radiant essentials.",
      "longDescription": "Explore a handpicked sanctuary of premium beauty essentials...",
      "image": "https://cdn.olenna.in/categories/beauty-cosmetics.webp",
      "displayOrder": 1,
      "isActive": true,
      "destinationUrl": "/collections/beauty-cosmetics",
      "highlights": ["Dermatologically Tested", "Luxury Formulations", "Cruelty-Free Options"],
      "metaTitle": "Beauty & Cosmetics — Curated Luxury Makeup & Skincare | Olenna",
      "metaDescription": "Discover luxury beauty, skincare serums, and premium cosmetics curated for modern women at Olenna."
    }
  ]
}
```

---

### 3.3 Site Content & Settings API

#### `GET /api/v1/public/content/homepage`
Returns the configurable homepage content blocks:
- `announcementBar` (`isVisible`, `message`, `storeLocatorLabel`, `storeLocatorUrl`)
- `heroSection` (`isVisible`, `slides`: array of hero slides)
- `categorySection` (`headline`, `subheadline`)
- `brandStory` (`overline`, `headline`, `description`, `pillars`)
- `storeDiscovery` (`headline`, `subheadline`, `image`)
- `pwaBanner` (`headline`, `subheadline`, `ctaLabel`, `ctaUrl`, `image`)

#### `GET /api/v1/public/settings`
Returns site-wide configuration:
- `brandName`, `tagline`, `customerPwaUrl`, `customerPwaLabel`
- `mainNavigation` and `footerQuickLinks`
- `socialLinks`
- `contactDetails`

---

## 4. How to Swap the Mock Repository for the API Repository

The codebase was architected specifically for this transition. Follow these 3 steps:

### Step 1: Create the API Repository Implementation
Create `src/lib/repositories/api/api-store.repository.ts`:
```typescript
import { IStoreRepository } from "../types";
import { Store, StoreSchema } from "@/lib/models/store";

export class ApiStoreRepository implements IStoreRepository {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.API_BASE_URL || "https://api.olenna.in";
  }

  async getPublishedStores(): Promise<Store[]> {
    const res = await fetch(`${this.baseUrl}/api/v1/public/stores`, {
      next: { tags: ["stores"], revalidate: 3600 },
    });
    if (!res.ok) throw new Error("Failed to fetch stores");
    const json = await res.json();
    return json.data.map((item: unknown) => StoreSchema.parse(item));
  }

  async getFeaturedStores(): Promise<Store[]> {
    const stores = await this.getPublishedStores();
    return stores.filter((s) => s.isFeatured);
  }

  async getStoreBySlug(slug: string): Promise<Store | null> {
    const res = await fetch(`${this.baseUrl}/api/v1/public/stores/${slug}`, {
      next: { tags: [`store-${slug}`], revalidate: 3600 },
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`Failed to fetch store ${slug}`);
    const json = await res.json();
    return StoreSchema.parse(json.data);
  }

  async getStoresByCity(city: string): Promise<Store[]> {
    const stores = await this.getPublishedStores();
    return stores.filter((s) => s.city.toLowerCase() === city.toLowerCase());
  }

  async getCities(): Promise<string[]> {
    const stores = await this.getPublishedStores();
    return Array.from(new Set(stores.map((s) => s.city))).sort();
  }
}
```

### Step 2: Toggle via Factory in `src/lib/repositories/index.ts`
Update `getStoreRepository()`:
```typescript
import { ApiStoreRepository } from "./api/api-store.repository";

export function getStoreRepository(): IStoreRepository {
  if (!storeRepo) {
    if (process.env.CONTENT_SOURCE === "api") {
      storeRepo = new ApiStoreRepository();
    } else {
      storeRepo = new MockStoreRepository();
    }
  }
  return storeRepo;
}
```

### Step 3: Configure Environment Variables
In `.env.local` or production hosting environment:
```bash
CONTENT_SOURCE="api"
API_BASE_URL="https://api.olenna.in"
NEXT_PUBLIC_CUSTOMER_PWA_URL="https://shop.olenna.in"
REVALIDATION_SECRET="<secure-shared-token>"
```

**Zero presentation components or page routes need to change.** All UI components remain identical and fully typed.

---

## 5. Security & Invalidation Guarantees

1. **No Admin Credentials on Public Frontend**:
   - The website never receives or stores administrative session tokens, private database passwords, or write access credentials.
2. **Read-Only Enpoint Scope**:
   - Public endpoints must reject any `POST`, `PUT`, `DELETE`, or `PATCH` requests.
3. **Edge Caching with On-Demand Revalidation**:
   - Store and category data is cached at the edge using Next.js cache tags (`next: { tags: ['stores'] }`).
   - The Admin Portal backend calls the public website's webhook `POST /api/revalidate?secret=...&tag=stores` whenever changes are committed.
4. **Graceful Fallbacks**:
   - If an API request fails, cached content or fallback states prevent 500 error pages for visiting customers.
