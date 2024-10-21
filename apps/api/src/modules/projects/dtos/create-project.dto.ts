import z from "zod";
import { CreateProjectItemDtoSchema } from "../../project-items/dtos/create-project-item.dto";

export type CreateProjectDto = z.infer<typeof CreateProjectDtoSchema>;

export const CreateProjectDtoSchema = z
  .object({
    items: z.array(CreateProjectItemDtoSchema.omit({ projectId: true })),
  })
  .strict();
