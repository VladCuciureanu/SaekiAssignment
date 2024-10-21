import z from "zod";

export type CreateComponentRequest = z.infer<
  typeof CreateComponentRequestSchema
>;

export const CreateComponentRequestSchema = z
  .object({
    projectId: z.string(),
    assetUrl: z.string().url(),
  })
  .strict();
