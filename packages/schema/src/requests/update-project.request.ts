import z from "zod";

export type UpdateProjectRequest = z.infer<typeof UpdateProjectRequestSchema>;

export const UpdateProjectRequestSchema = z.object({}).partial().strict();
