import { z } from 'zod';

// Cargo
export const CargoSchema = z.object({
  id: z.string().cuid().optional(),
  title: z.string().min(1),
  type: z.string().optional(),
  weight: z.number().positive(),
  volume: z.number().positive().optional(),
  vehicleType: z.string().optional(),
  urgency: z.string().optional(),
  fromAddress: z.string().min(1),
  toAddress: z.string().min(1),
  totalPrice: z.number().nonnegative().optional(),
});
export type Cargo = z.infer<typeof CargoSchema>;

// Marketplace list response
export const AllOffersItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  urgency: z.string(),
  price: z.number().nullable(),
});
export const AllOffersResponseSchema = z.object({
  cargo: z.array(AllOffersItemSchema),
  pagination: z.object({ total: z.number(), pages: z.number(), page: z.number().optional(), limit: z.number().optional() }),
});
export type AllOffersResponse = z.infer<typeof AllOffersResponseSchema>;

// Upload response
export const UploadResponseSchema = z.object({
  success: z.literal(true),
  size: z.number(),
  mime: z.string(),
  contentHash: z.string(),
  safe: z.boolean(),
});
export type UploadResponse = z.infer<typeof UploadResponseSchema>;


