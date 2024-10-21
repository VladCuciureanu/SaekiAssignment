import z from "zod";

export type CreateComponentDto = z.infer<typeof CreateComponentDtoSchema>;

export const CreateComponentDtoSchema = z
  .object({
    projectId: z.string(),
    assetUrl: z.string().url(),
  })
  .strict();
