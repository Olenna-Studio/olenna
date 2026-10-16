import { ISiteSettingsRepository } from "../types";
import { SiteSettings, SiteSettingsSchema } from "@/lib/models/settings";
import { MOCK_SITE_SETTINGS } from "./mock-data";

export class MockSiteSettingsRepository implements ISiteSettingsRepository {
  private settings: SiteSettings;

  constructor(initialData: SiteSettings = MOCK_SITE_SETTINGS) {
    this.settings = SiteSettingsSchema.parse(initialData);
  }

  async getSiteSettings(): Promise<SiteSettings> {
    return this.settings;
  }
}
