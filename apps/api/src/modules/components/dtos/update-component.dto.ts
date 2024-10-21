import z from "zod";

export type UpdateComponentDto = z.infer<typeof UpdateComponentDtoSchema>;

export const UpdateComponentDtoSchema = z
  .object({
    quantity: z.number().min(1),
    materialId: z.string(),
    servicePackageId: z.string(),
  })
  .partial()
  .strict();
