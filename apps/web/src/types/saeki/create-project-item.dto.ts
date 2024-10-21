import z from "zod";

export type CreateProjectItemDto = z.infer<typeof CreateProjectItemDtoSchema>;

export const CreateProjectItemDtoSchema = z
  .object({
    projectId: z.string(),
    assetUrl: z.string().url(),
  })
  .strict();
