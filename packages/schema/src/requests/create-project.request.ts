import z from "zod";
import { CreateComponentRequestSchema } from "./create-component.request";

export type CreateProjectRequest = z.infer<typeof CreateProjectRequestSchema>;

export const CreateProjectRequestSchema = z
  .object({
    components: z.array(CreateComponentRequestSchema.omit({ projectId: true })),
  })
  .strict();
