import { Category } from "@/lib/models/category";
import { Store } from "@/lib/models/store";
import {
  HomepageContent,
  AnnouncementBarContent,
  HeroSectionContent,
  BrandStoryContent,
  StoreDiscoveryContent,
  CustomerPwaBannerContent,
} from "@/lib/models/content";
import { SiteSettings } from "@/lib/models/settings";

export interface IStoreRepository {
  getPublishedStores(): Promise<Store[]>;
  getFeaturedStores(): Promise<Store[]>;
  getStoreBySlug(slug: string): Promise<Store | null>;
  getStoresByCity(city: string): Promise<Store[]>;
  getCities(): Promise<string[]>;
}

export interface ICategoryRepository {
  getActiveCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | null>;
}

export interface ISiteContentRepository {
  getHomepageContent(): Promise<HomepageContent>;
  getAnnouncementBar(): Promise<AnnouncementBarContent>;
  getHeroSection(): Promise<HeroSectionContent>;
  getBrandStory(): Promise<BrandStoryContent>;
  getStoreDiscoverySection(): Promise<StoreDiscoveryContent>;
  getCustomerPwaBanner(): Promise<CustomerPwaBannerContent>;
}

export interface ISiteSettingsRepository {
  getSiteSettings(): Promise<SiteSettings>;
}
