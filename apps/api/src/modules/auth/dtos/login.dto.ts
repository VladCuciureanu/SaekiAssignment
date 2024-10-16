import z from "zod";

export type LoginDto = z.infer<typeof LoginDtoSchema>;

export const LoginDtoSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  .strict();
