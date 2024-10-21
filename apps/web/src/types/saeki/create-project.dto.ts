import z from "zod";

import { CreateComponentDtoSchema } from "./create-component.dto";

export type CreateProjectDto = z.infer<typeof CreateProjectDtoSchema>;

export const CreateProjectDtoSchema = z
  .object({
    components: z.array(CreateComponentDtoSchema.omit({ projectId: true })),
  })
  .strict();