import z from "zod";

export type CreateComponentRequest = z.infer<
  typeof CreateComponentRequestSchema
>;

export const CreateComponentRequestSchema = z
  .object({
    projectId: z.string(),
    fileId: z.string(),
  })
  .strict();
