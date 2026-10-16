import {
  IStoreRepository,
  ICategoryRepository,
  ISiteContentRepository,
  ISiteSettingsRepository,
} from "./types";
import { MockStoreRepository } from "./mock/mock-store.repository";
import { MockCategoryRepository } from "./mock/mock-category.repository";
import { MockSiteContentRepository } from "./mock/mock-content.repository";
import { MockSiteSettingsRepository } from "./mock/mock-settings.repository";

// Instances - can be swapped with API repositories once admin portal / backend API is available
let storeRepo: IStoreRepository | null = null;
let categoryRepo: ICategoryRepository | null = null;
let contentRepo: ISiteContentRepository | null = null;
let settingsRepo: ISiteSettingsRepository | null = null;

export function getStoreRepository(): IStoreRepository {
  if (!storeRepo) {
    storeRepo = new MockStoreRepository();
  }
  return storeRepo;
}

export function getCategoryRepository(): ICategoryRepository {
  if (!categoryRepo) {
    categoryRepo = new MockCategoryRepository();
  }
  return categoryRepo;
}

export function getSiteContentRepository(): ISiteContentRepository {
  if (!contentRepo) {
    contentRepo = new MockSiteContentRepository();
  }
  return contentRepo;
}

export function getSiteSettingsRepository(): ISiteSettingsRepository {
  if (!settingsRepo) {
    settingsRepo = new MockSiteSettingsRepository();
  }
  return settingsRepo;
}

// For testing / overrides
export function setStoreRepository(repo: IStoreRepository | null) {
  storeRepo = repo;
}

export function setCategoryRepository(repo: ICategoryRepository | null) {
  categoryRepo = repo;
}

export function setSiteContentRepository(repo: ISiteContentRepository | null) {
  contentRepo = repo;
}

export function setSiteSettingsRepository(repo: ISiteSettingsRepository | null) {
  settingsRepo = repo;
}

export * from "./types";
