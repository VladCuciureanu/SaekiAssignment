import z from "zod";

export type UpdateComponentRequest = z.infer<
  typeof UpdateComponentRequestSchema
>;

export const UpdateComponentRequestSchema = z
  .object({
    quantity: z.number().min(1),
    materialId: z.string(),
    servicePackageId: z.string(),
  })
  .partial()
  .strict();
