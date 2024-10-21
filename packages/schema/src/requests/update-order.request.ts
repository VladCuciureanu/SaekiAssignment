import z from "zod";
import { OrderStatus } from "../enums/order-status.enum";

export type UpdateOrderRequest = z.infer<typeof UpdateOrderRequestSchema>;

export const UpdateOrderRequestSchema = z
  .object({
    status: z.nativeEnum(OrderStatus),
  })
  .partial()
  .strict();
