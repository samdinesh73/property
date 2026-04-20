import { z } from "zod";

export const createPropertySchema = z.object({
  title: z.string().min(5),
  description: z.string().min(10),
  category: z.enum(["apartment", "house", "villa", "land", "townhouse", "hostel"]),
  propertyType: z.enum(["residential", "commercial", "industrial"]),
  price: z.number().positive(),
  location: z.string().min(3),
  city: z.string().min(2),
  state: z.string().min(2),
  zipCode: z.string().optional(),
  bedrooms: z.number().optional(),
  bathrooms: z.number().optional(),
  area: z.number().positive(),
  parking: z.number().optional(),
  amenities: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
  videoUrl: z.string().url().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export const updatePropertySchema = createPropertySchema.partial();

export const queryPropertySchema = z.object({
  city: z.string().optional(),
  category: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  bedrooms: z.coerce.number().optional(),
  featured: z.enum(["true", "false"]).optional(),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
  search: z.string().optional(),
});

export type CreatePropertyInput = z.infer<typeof createPropertySchema>;
export type UpdatePropertyInput = z.infer<typeof updatePropertySchema>;
export type QueryPropertyInput = z.infer<typeof queryPropertySchema>;
