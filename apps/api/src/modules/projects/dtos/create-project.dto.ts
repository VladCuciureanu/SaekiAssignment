import z from "zod";
import { CreateProjectItemDtoSchema } from "./create-project-item.dto";

export type CreateProjectDto = z.infer<typeof CreateProjectDtoSchema>;

export const CreateProjectDtoSchema = z
  .object({
    items: z.array(CreateProjectItemDtoSchema),
  })
  .strict();
