import { z } from "zod";

export const NavigationItemSchema = z.object({
  id: z.string(),
  label: z.string(),
  href: z.string(),
  isExternal: z.boolean().optional().default(false),
  isAction: z.boolean().optional().default(false),
  target: z.string().optional(),
});

export const SocialLinkSchema = z.object({
  platform: z.enum(["instagram", "facebook", "pinterest", "youtube", "twitter"]),
  label: z.string(),
  url: z.string(),
  iconName: z.string().optional(),
});

export const ContactDetailsSchema = z.object({
  primaryPhone: z.string(),
  phoneDisplay: z.string(),
  primaryEmail: z.string().email(),
  technicalEmail: z.string().email().optional(),
  supportHours: z.string(),
  headquartersAddress: z.string(),
  isVerified: z.boolean().default(false),
});

export const SiteSettingsSchema = z.object({
  brandName: z.string().default("Olenna"),
  logoText: z.string().default("OLENNA"),
  tagline: z.string().default("Everyday elegance, thoughtfully curated."),
  customerPwaUrl: z.string().url(),
  customerPwaLabel: z.string().default("Shop Online"),
  mainNavigation: z.array(NavigationItemSchema),
  footerQuickLinks: z.array(NavigationItemSchema),
  socialLinks: z.array(SocialLinkSchema),
  contactDetails: ContactDetailsSchema,
  copyrightText: z.string().default("© 2024 Olenna. All rights reserved."),
});

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  isExternal?: boolean;
  isAction?: boolean;
  target?: string;
}

export type SocialLink = z.infer<typeof SocialLinkSchema>;
export type ContactDetails = z.infer<typeof ContactDetailsSchema>;

export interface SiteSettings {
  brandName: string;
  logoText: string;
  tagline: string;
  customerPwaUrl: string;
  customerPwaLabel: string;
  mainNavigation: NavigationItem[];
  footerQuickLinks: NavigationItem[];
  socialLinks: SocialLink[];
  contactDetails: ContactDetails;
  copyrightText: string;
}
