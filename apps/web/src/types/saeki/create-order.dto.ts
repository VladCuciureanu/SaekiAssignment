import z from "zod";

export type CreateOrderDto = z.infer<typeof CreateOrderDtoSchema>;

export const CreateOrderDtoSchema = z
  .object({
    projectId: z.string(),
  })
  .strict();
