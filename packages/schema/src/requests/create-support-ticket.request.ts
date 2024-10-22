import z from "zod";

export type CreateSupportTicketRequest = z.infer<
  typeof CreateSupportTicketRequestSchema
>;

export const CreateSupportTicketRequestSchema = z
  .object({
    orderId: z.string(),
  })
  .strict();
