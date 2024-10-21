import z from "zod";

export type CreateProjectDto = z.infer<typeof CreateProjectDtoSchema>;

export const CreateProjectDtoSchema = z.object({}).strict();
