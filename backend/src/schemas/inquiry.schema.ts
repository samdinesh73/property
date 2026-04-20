import { z } from "zod";

export const createInquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  message: z.string().min(10),
  propertyId: z.string().uuid(),
  userId: z.string().uuid().optional(),
});

export const updateInquirySchema = z.object({
  status: z.enum(["pending", "contacted", "converted", "rejected"]),
});

export type CreateInquiryInput = z.infer<typeof createInquirySchema>;
export type UpdateInquiryInput = z.infer<typeof updateInquirySchema>;
