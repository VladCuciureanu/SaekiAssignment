import { Router } from "express";
import { OrdersController } from "./orders.controller";
import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";
import { CreateOrderDtoSchema } from "./dtos/create-order.dto";
import { validate } from "../common/middlewares/schema-validation.middleware";
import { UpdateOrderDtoSchema } from "./dtos/update-order.dto";

export function generateOrdersRouter(props: { db: PrismaClient }) {
  const router = Router();
  const controller = new OrdersController({ db: props.db });

  // Create a new order
  router.post(
    "/",
    validate(CreateOrderDtoSchema),
    asyncHandler((req, res, next) => {
      return controller.createOrder(req, res, next);
    }),
  );

  // Get all orders
  router.get(
    "/",
    asyncHandler((req, res, next) => {
      return controller.getManyOrders(req, res, next);
    }),
  );

  // Get an order by id
  router.get(
    "/:id",
    asyncHandler((req, res, next) => {
      return controller.getOrder(req, res, next);
    }),
  );

  // Update an order
  router.put(
    "/:id",
    validate(UpdateOrderDtoSchema),
    asyncHandler((req, res, next) => {
      return controller.updateOrder(req, res, next);
    }),
  );

  // Delete an order
  router.delete(
    "/:id",
    asyncHandler((req, res, next) => {
      return controller.deleteOrder(req, res, next);
    }),
  );

  return router;
}
