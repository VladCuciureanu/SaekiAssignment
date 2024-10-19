import z from "zod";
import { OrderStatus } from "./order.dto";

export type UpdateOrderDto = z.infer<typeof UpdateOrderDtoSchema>;

export const UpdateOrderDtoSchema = z
  .object({
    status: z.nativeEnum(OrderStatus),
  })
  .partial()
  .strict();
