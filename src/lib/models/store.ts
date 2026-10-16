import { z } from "zod";

export const OpeningHourItemSchema = z.object({
  day: z.enum([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]),
  open: z.string(),
  close: z.string(),
  isClosed: z.boolean().optional(),
});

export const StoreCoordinatesSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export const StoreSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  tagline: z.string().optional(),
  addressLines: z.array(z.string()).min(1),
  locality: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  postalCode: z.string().min(1),
  country: z.string().default("India"),
  coordinates: StoreCoordinatesSchema.optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  openingHours: z.array(OpeningHourItemSchema).default([]),
  specialHoursNotice: z.string().optional(),
  directionsUrl: z.string().url().optional(),
  image: z.string().optional(),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(true),
  displayOrder: z.number().int().default(0),
  amenities: z.array(z.string()).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type OpeningHourItem = z.infer<typeof OpeningHourItemSchema>;
export type StoreCoordinates = z.infer<typeof StoreCoordinatesSchema>;
export type Store = z.infer<typeof StoreSchema>;
