import z from "zod";

export type CreateOrderRequest = z.infer<typeof CreateOrderRequestSchema>;

export const CreateOrderRequestSchema = z
  .object({
    projectId: z.string(),
  })
  .strict();
