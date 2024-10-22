import z from "zod";

export type CreateOrderRequest = z.infer<typeof CreateOrderRequestSchema>;

export const CreateOrderRequestSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    company: z.string(),
    phone: z.string(),
    email: z.string().email(),
    address1: z.string(),
    address2: z.string().optional(),
    city: z.string(),
    region: z.string(),
    zip: z.string(),
    country: z.string(),
    cardNumber: z.string(),
    nameOnCard: z.string(),
    expiryDate: z.string(),
    cvc: z.string(),
    projectId: z.string(),
  })
  .strict();
