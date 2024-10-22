import z from "zod";

export type CreateFileRequest = z.infer<typeof CreateFileRequestSchema>;

export const CreateFileRequestSchema = z
  .object({
    name: z.string(),
    content: z.any(),
  })
  .strict();
