import z from "zod";

export type UpdateProjectDto = z.infer<typeof UpdateProjectDtoSchema>;

export const UpdateProjectDtoSchema = z.object({}).partial().strict();
