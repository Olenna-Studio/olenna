import { Category } from "@/lib/models/category";
import { Store } from "@/lib/models/store";
import { HomepageContent } from "@/lib/models/content";
import { SiteSettings } from "@/lib/models/settings";

/**
 * Verified provisional placeholder content for Olenna public website.
 * Follows guidelines: clearly identified provisional data until production API is connected.
 */

export const MOCK_CATEGORIES: Category[] = [
  {
    id: "cat-beauty-cosmetics",
    slug: "beauty-cosmetics",
    name: "Beauty & Cosmetics",
    description: "Premium makeup, luxury skincare serums, and radiant essentials.",
    longDescription:
      "Explore a handpicked sanctuary of premium beauty essentials. From nourishing skincare foundations to vibrant, long-lasting cosmetic palettes, each product is chosen to celebrate your natural glow.",
    image: "/images/categories/beauty-cosmetics.webp",
    displayOrder: 1,
    isActive: true,
    destinationUrl: "/collections/beauty-cosmetics",
    highlights: ["Dermatologically Tested", "Luxury Formulations", "Cruelty-Free Options"],
    metaTitle: "Beauty & Cosmetics — Curated Luxury Makeup & Skincare | Olenna",
    metaDescription: "Discover luxury beauty, skincare serums, and premium cosmetics curated for modern women at Olenna.",
  },
  {
    id: "cat-fashion-ethnic",
    slug: "fashion-ethnic",
    name: "Fashion & Ethnic Wear",
    description: "Handcrafted sarees, celebratory lehengas, and contemporary ethnic styles.",
    longDescription:
      "Timeless silhouettes meet modern grace. Our ethnic wear collection brings you intricately woven sarees, festive kurtas, and artisanal textiles designed for unforgettable moments and daily elegance.",
    image: "/images/categories/fashion-ethnic.webp",
    displayOrder: 2,
    isActive: true,
    destinationUrl: "/collections/fashion-ethnic",
    highlights: ["Pure Weaves", "Artisanal Embroidery", "Custom Fit Available in Stores"],
    metaTitle: "Fashion & Ethnic Wear — Sarees, Kurtas & Timeless Drapes | Olenna",
    metaDescription: "Elevate your wardrobe with Olenna's premium ethnic fashion, celebratory drapes, and artisanal craftsmanship.",
  },
  {
    id: "cat-imitation-jewellery",
    slug: "imitation-jewellery",
    name: "Imitation Jewellery",
    description: "Opulent Kundan, temple jewellery, and delicate zircon accents.",
    longDescription:
      "Adorn every celebration with heirloom-inspired jewellery crafted with meticulous detail. Explore exquisite bridal necklaces, timeless jhumkas, and minimalist daily sparkle.",
    image: "/images/categories/imitation-jewellery.webp",
    displayOrder: 3,
    isActive: true,
    destinationUrl: "/collections/imitation-jewellery",
    highlights: ["Micro Gold-Plated", "Semi-Precious Stones", "Hypoallergenic Finish"],
    metaTitle: "Imitation Jewellery — Kundan, Temple & Fashion Ornaments | Olenna",
    metaDescription: "Statement earrings, Kundan bridal sets, and contemporary daily jewellery curated with regal aesthetics.",
  },
  {
    id: "cat-handbags-accessories",
    slug: "handbags-accessories",
    name: "Handbags & Accessories",
    description: "Sculpted leather totes, festive potlis, and everyday statement pieces.",
    longDescription:
      "The perfect finishing touch. From structured top-handle bags and work totes to embroidered clutches and ornate potlis, complete your ensemble with refined charm.",
    image: "/images/categories/handbags-accessories.webp",
    displayOrder: 4,
    isActive: true,
    destinationUrl: "/collections/handbags-accessories",
    highlights: ["Vegan & Fine Leather", "Ergonomic Storage", "Artisanal Hardware"],
    metaTitle: "Handbags & Accessories — Premium Clutches & Everyday Totes | Olenna",
    metaDescription: "Discover structured bags, festive clutches, and timeless accessories designed for effortless sophistication.",
  },
  {
    id: "cat-personal-care",
    slug: "personal-care",
    name: "Personal Care & Hygiene",
    description: "Botanical body washes, gentle self-care rituals, and wellness essentials.",
    longDescription:
      "Gentle, indulgent care crafted for your daily wellness. Immerse in soothing fragrances, clean body care formulas, and trusted personal hygiene essentials.",
    image: "/images/categories/personal-care.webp",
    displayOrder: 5,
    isActive: true,
    destinationUrl: "/collections/personal-care",
    highlights: ["Botanical Extracts", "pH Balanced", "Gentle Care"],
    metaTitle: "Personal Care & Hygiene — Gentle Botanical Self-Care | Olenna",
    metaDescription: "Indulgent body care rituals, nourishing lotions, and daily wellness essentials at Olenna.",
  },
  {
    id: "cat-tailoring-supplies",
    slug: "tailoring-supplies",
    name: "Tailoring & Fashion Designing",
    description: "Fine silk threads, designer trims, zardozi borders, and tailoring supplies.",
    longDescription:
      "Bring your bespoke fashion dreams to life. We supply master-quality tailoring materials, vibrant threads, antique borders, buttons, and couture accessories.",
    image: "/images/categories/tailoring-supplies.webp",
    displayOrder: 6,
    isActive: true,
    destinationUrl: "/collections/tailoring-supplies",
    highlights: ["Silk & Metallic Threads", "Handcrafted Borders", "Bespoke Findings"],
    metaTitle: "Tailoring & Fashion Designing Supplies — Master Craftsmen Materials | Olenna",
    metaDescription: "Premium tailoring supplies, luxury trims, threads, and bespoke accessories for fashion designers.",
  },
  // Inactive / draft category for testing filter behaviour
  {
    id: "cat-kids-baby",
    slug: "kids-baby-essentials",
    name: "Kids & Baby Essentials",
    description: "Soft organic cotton wear and gentle baby accessories (Coming Soon).",
    image: "/images/categories/beauty-cosmetics.webp",
    displayOrder: 7,
    isActive: false, // Testing that inactive categories are filtered out
    destinationUrl: "/collections/kids-baby-essentials",
  },
];

export const MOCK_STORES: Store[] = [
  {
    id: "store-bangalore-rajajinagar",
    slug: "bangalore-rajajinagar",
    name: "Olenna Studio & Workspace — Rajajinagar",
    tagline: "Ladies / women corner — Workspace & retail studio (Opening Soon)",
    addressLines: ["Rajajinagar"],
    locality: "Rajajinagar",
    city: "Bangalore",
    state: "Karnataka",
    postalCode: "560010",
    country: "India",
    coordinates: {
      latitude: 12.9982,
      longitude: 77.553,
    },
    phone: "9741424695 | 08754443777",
    email: "olennastudiox@gmail.com",
    openingHours: [
      { day: "Monday", open: "10:00 AM", close: "10:00 PM" },
      { day: "Tuesday", open: "10:00 AM", close: "10:00 PM" },
      { day: "Wednesday", open: "10:00 AM", close: "10:00 PM" },
      { day: "Thursday", open: "10:00 AM", close: "10:00 PM" },
      { day: "Friday", open: "10:00 AM", close: "10:00 PM" },
      { day: "Saturday", open: "10:00 AM", close: "10:00 PM" },
      { day: "Sunday", open: "10:00 AM", close: "10:00 PM" },
    ],
    specialHoursNotice: "Store in progress — opening will be soon! Workspace hours: 10:00 AM to 10:00 PM daily.",
    directionsUrl: "https://maps.google.com/?q=Rajajinagar+Bangalore",
    image: "/images/stores/store-flagship.webp",
    isFeatured: false,
    isPublished: false, // In progress / opening soon
    displayOrder: 1,
    amenities: [
      "Ladies / Women's Corner",
      "Creative Workspace",
      "Personal Styling Consultations",
      "Tailoring & Alterations",
    ],
    createdAt: "2024-10-17T00:00:00Z",
    updatedAt: "2024-10-17T00:00:00Z",
  },
];

export const MOCK_HOMEPAGE_CONTENT: HomepageContent = {
  announcementBar: {
    isVisible: true,
    message: "Discover Olenna ✦ Ladies / Women's Corner ✦ Store opening soon in Rajajinagar, Bangalore (10 AM to 10 PM daily)",
    highlightBadge: "Opening Soon",
    storeLocatorLabel: "Store In Progress",
    storeLocatorUrl: "/stores",
  },
  heroSection: {
    isVisible: true,
    slides: [
      {
        id: "hero-slide-1",
        overline: "LADIES & WOMEN'S CORNER",
        headline: "Everyday elegance, thoughtfully curated.",
        subheadline:
          "From beauty essentials to timeless fashion, discover a world of styles made for you.",
        primaryCtaLabel: "Explore Our Collections",
        primaryCtaUrl: "/#collections",
        secondaryCtaLabel: "Store Updates",
        secondaryCtaUrl: "/stores",
        image: "/images/hero/hero-model.webp",
        imageAlt: "Olenna Model in Elegant Pink Ethnic Wear",
      },
      {
        id: "hero-slide-2",
        overline: "FESTIVE & BRIDAL GLOW",
        headline: "Radiance redefined for every occasion.",
        subheadline:
          "Step into effortless luxury with statement Kundan jewellery and curated beauty routines.",
        primaryCtaLabel: "View Jewellery",
        primaryCtaUrl: "/collections/imitation-jewellery",
        secondaryCtaLabel: "Store Updates",
        secondaryCtaUrl: "/stores",
        image: "/images/hero/hero-model.webp",
        imageAlt: "Olenna Festive Glamour and Jewellery",
      },
      {
        id: "hero-slide-3",
        overline: "BESPOKE CRAFTSMANSHIP",
        headline: "Tailored to perfection, made for you.",
        subheadline:
          "From master tailoring supplies to couture finishing, bring your personal style to life.",
        primaryCtaLabel: "Discover Tailoring",
        primaryCtaUrl: "/collections/tailoring-supplies",
        secondaryCtaLabel: "Store Updates",
        secondaryCtaUrl: "/stores",
        image: "/images/hero/hero-model.webp",
        imageAlt: "Olenna Tailoring & Design Studio",
      },
    ],
  },
  categorySection: {
    isVisible: true,
    headline: "Explore our collections",
    subheadline: "A thoughtfully curated range for your everyday needs",
  },
  brandStory: {
    isVisible: true,
    overline: "THE OLENNA EXPERIENCE",
    headline: "More than a store, a part of your story.",
    description:
      "Olenna brings together beauty, fashion and everyday essentials in one elegant destination. We curate products that inspire confidence and celebrate your unique style.",
    ctaLabel: "Learn About Olenna",
    ctaUrl: "/about",
    pillars: [
      {
        id: "pillar-curated",
        iconName: "leaf",
        title: "Curated Selections",
        description: "Quality products for every occasion",
      },
      {
        id: "pillar-luxury",
        iconName: "diamond",
        title: "Everyday Luxury",
        description: "Style and care within reach",
      },
      {
        id: "pillar-you",
        iconName: "heart",
        title: "For Every You",
        description: "Because every story is unique",
      },
    ],
  },
  storeDiscovery: {
    isVisible: true,
    headline: "Our store is opening soon",
    subheadline:
      "We are setting up our exclusive workspace and retail studio in Rajajinagar, Bangalore. Workspace hours: 10:00 AM to 10:00 PM, Monday to Sunday.",
    ctaLabel: "View Store Updates",
    ctaUrl: "/stores",
    image: "/images/stores/store-flagship.webp",
    imageAlt: "Olenna Studio & Workspace Rajajinagar",
  },
  pwaBanner: {
    isVisible: true,
    headline: "Your next favourite find awaits",
    subheadline: "Explore our full range on the Olenna Customer App.",
    ctaLabel: "Shop Online",
    ctaUrl:
      process.env.NEXT_PUBLIC_CUSTOMER_PWA_URL ||
      "https://shop.olenna.in",
    image: "/images/promo/pwa-gift-box.webp",
    imageAlt: "Olenna Signature Gift Box with Silk Ribbon",
  },
};

export const MOCK_SITE_SETTINGS: SiteSettings = {
  brandName: "Olenna",
  logoText: "OLENNA",
  tagline: "Ladies / Women's Corner — Everyday elegance, thoughtfully curated.",
  customerPwaUrl:
    process.env.NEXT_PUBLIC_CUSTOMER_PWA_URL || "https://shop.olenna.in",
  customerPwaLabel: "Shop Online",
  mainNavigation: [
    { id: "nav-home", label: "Home", href: "/" },
    { id: "nav-about", label: "About", href: "/about" },
    { id: "nav-stores", label: "Our Store", href: "/stores" },
    { id: "nav-contact", label: "Contact", href: "/contact" },
  ],
  footerQuickLinks: [
    { id: "foot-home", label: "Home", href: "/" },
    { id: "foot-about", label: "About", href: "/about" },
    { id: "foot-stores", label: "Our Store", href: "/stores" },
    { id: "foot-contact", label: "Contact", href: "/contact" },
  ],
  socialLinks: [], // Hidden for now per request
  contactDetails: {
    primaryPhone: "+919741424695",
    phoneDisplay: "9741424695 | 08754443777",
    primaryEmail: "olennastudiox@gmail.com",
    technicalEmail: "info@devhorizontech.com",
    supportHours: "Monday to Sunday, 10:00 AM – 10:00 PM IST",
    headquartersAddress:
      "Rajajinagar, Bangalore, Karnataka, India",
    isVerified: true,
  },
  copyrightText: "© 2024 Olenna. All rights reserved.",
};
