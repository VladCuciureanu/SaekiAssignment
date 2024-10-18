import { OrderStatus } from "@prisma/client";
import z from "zod";

export type UpdateOrderDto = z.infer<typeof UpdateOrderDtoSchema>;

export const UpdateOrderDtoSchema = z
  .object({
    status: z.nativeEnum(OrderStatus),
  })
  .partial()
  .strict();
