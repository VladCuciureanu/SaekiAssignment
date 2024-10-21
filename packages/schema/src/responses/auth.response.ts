import z from "zod";

export type AuthResponse = z.infer<typeof AuthResponseSchema>;

export const AuthResponseSchema = z
  .object({
    token: z.string(),
  })
  .strict();
