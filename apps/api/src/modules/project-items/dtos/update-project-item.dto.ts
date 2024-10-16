import z from "zod";

export type UpdateProjectItemDto = z.infer<typeof UpdateProjectItemDtoSchema>;

export const UpdateProjectItemDtoSchema = z
  .object({
    id: z.string(),
    quantity: z.number().min(1),
    materialId: z.string(),
    servicePackageId: z.string(),
  })
  .partial()
  .strict();
