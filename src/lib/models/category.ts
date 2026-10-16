import { z } from "zod";

export const CategorySchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string(),
  longDescription: z.string().optional(),
  image: z.string(),
  displayOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
  destinationUrl: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

export type Category = z.infer<typeof CategorySchema>;
