import z from "zod";

export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export const LoginRequestSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  .strict();
