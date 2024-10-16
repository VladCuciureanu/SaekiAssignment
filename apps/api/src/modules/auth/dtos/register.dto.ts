import z from "zod";

export type RegisterDto = z.infer<typeof RegisterDtoSchema>;

export const RegisterDtoSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  .strict();
