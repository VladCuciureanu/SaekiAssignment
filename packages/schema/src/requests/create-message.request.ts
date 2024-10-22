import z from "zod";

export type CreateMessageRequest = z.infer<typeof CreateMessageRequestSchema>;

export const CreateMessageRequestSchema = z
  .object({
    supportTicketId: z.string(),
    content: z.string(),
  })
  .strict();
