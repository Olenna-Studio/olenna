import { ISiteContentRepository } from "../types";
import {
  HomepageContent,
  HomepageContentSchema,
  AnnouncementBarContent,
  HeroSectionContent,
  BrandStoryContent,
  StoreDiscoveryContent,
  CustomerPwaBannerContent,
} from "@/lib/models/content";
import { MOCK_HOMEPAGE_CONTENT } from "./mock-data";

export class MockSiteContentRepository implements ISiteContentRepository {
  private content: HomepageContent;

  constructor(initialData: HomepageContent = MOCK_HOMEPAGE_CONTENT) {
    this.content = HomepageContentSchema.parse(initialData);
  }

  async getHomepageContent(): Promise<HomepageContent> {
    return this.content;
  }

  async getAnnouncementBar(): Promise<AnnouncementBarContent> {
    return this.content.announcementBar;
  }

  async getHeroSection(): Promise<HeroSectionContent> {
    return this.content.heroSection;
  }

  async getBrandStory(): Promise<BrandStoryContent> {
    return this.content.brandStory;
  }

  async getStoreDiscoverySection(): Promise<StoreDiscoveryContent> {
    return this.content.storeDiscovery;
  }

  async getCustomerPwaBanner(): Promise<CustomerPwaBannerContent> {
    return this.content.pwaBanner;
  }
}
