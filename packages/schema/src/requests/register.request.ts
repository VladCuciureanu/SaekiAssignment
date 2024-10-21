import z from "zod";

export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;

export const RegisterRequestSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  .strict();
