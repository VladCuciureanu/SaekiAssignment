import z from "zod";

export type UpdateProjectItemDto = z.infer<typeof UpdateProjectItemDtoSchema>;

export const UpdateProjectItemDtoSchema = z
  .object({
    quantity: z.number().min(1),
    materialId: z.string(),
    servicePackageId: z.string(),
  })
  .partial()
  .strict();
