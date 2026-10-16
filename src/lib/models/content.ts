import { z } from "zod";

export const AnnouncementBarSchema = z.object({
  isVisible: z.boolean().default(true),
  message: z.string(),
  highlightBadge: z.string().optional(),
  linkUrl: z.string().optional(),
  linkLabel: z.string().optional(),
  storeLocatorLabel: z.string().default("Find your nearest store"),
  storeLocatorUrl: z.string().default("/stores"),
});

export const HeroSlideSchema = z.object({
  id: z.string(),
  overline: z.string(),
  headline: z.string(),
  subheadline: z.string(),
  primaryCtaLabel: z.string(),
  primaryCtaUrl: z.string(),
  secondaryCtaLabel: z.string().optional(),
  secondaryCtaUrl: z.string().optional(),
  image: z.string(),
  imageAlt: z.string(),
});

export const HeroSectionSchema = z.object({
  isVisible: z.boolean().default(true),
  slides: z.array(HeroSlideSchema).min(1),
});

export const CategorySectionContentSchema = z.object({
  isVisible: z.boolean().default(true),
  headline: z.string().default("Explore our collections"),
  subheadline: z
    .string()
    .default("A thoughtfully curated range for your everyday needs"),
});

export const BrandPillarSchema = z.object({
  id: z.string(),
  iconName: z.enum(["leaf", "diamond", "heart", "sparkles", "shield"]),
  title: z.string(),
  description: z.string(),
});

export const BrandStoryContentSchema = z.object({
  isVisible: z.boolean().default(true),
  overline: z.string().default("THE OLENNA EXPERIENCE"),
  headline: z.string(),
  description: z.string(),
  ctaLabel: z.string().default("Learn About Olenna"),
  ctaUrl: z.string().default("/about"),
  pillars: z.array(BrandPillarSchema).default([]),
});

export const StoreDiscoveryContentSchema = z.object({
  isVisible: z.boolean().default(true),
  headline: z.string().default("Find Olenna near you"),
  subheadline: z
    .string()
    .default("Visit our stores and experience our collections in person."),
  ctaLabel: z.string().default("Explore Our Stores"),
  ctaUrl: z.string().default("/stores"),
  image: z.string(),
  imageAlt: z.string().default("Olenna Luxury Retail Store Interior"),
});

export const CustomerPwaBannerContentSchema = z.object({
  isVisible: z.boolean().default(true),
  headline: z.string().default("Your next favourite find awaits"),
  subheadline: z
    .string()
    .default("Explore our full range on the Olenna Customer App."),
  ctaLabel: z.string().default("Shop Online"),
  ctaUrl: z.string(),
  image: z.string(),
  imageAlt: z.string().default("Olenna Luxury Gift Packaging"),
});

export const HomepageContentSchema = z.object({
  announcementBar: AnnouncementBarSchema,
  heroSection: HeroSectionSchema,
  categorySection: CategorySectionContentSchema,
  brandStory: BrandStoryContentSchema,
  storeDiscovery: StoreDiscoveryContentSchema,
  pwaBanner: CustomerPwaBannerContentSchema,
});

export type AnnouncementBarContent = z.infer<typeof AnnouncementBarSchema>;
export type HeroSlide = z.infer<typeof HeroSlideSchema>;
export type HeroSectionContent = z.infer<typeof HeroSectionSchema>;
export type CategorySectionContent = z.infer<typeof CategorySectionContentSchema>;
export type BrandPillar = z.infer<typeof BrandPillarSchema>;
export type BrandStoryContent = z.infer<typeof BrandStoryContentSchema>;
export type StoreDiscoveryContent = z.infer<typeof StoreDiscoveryContentSchema>;
export type CustomerPwaBannerContent = z.infer<typeof CustomerPwaBannerContentSchema>;
export type HomepageContent = z.infer<typeof HomepageContentSchema>;
