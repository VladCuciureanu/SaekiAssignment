import { Router } from "express";
import { OrdersController } from "./orders.controller";
import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";
import { validate } from "../common/middlewares/schema-validation.middleware";
import { CreateOrderRequestSchema } from "@saeki/schema";
import { ComponentsController } from "../components/components.controller";

export function generateOrdersRouter(props: { db: PrismaClient }) {
  const router = Router();
  const controller = new OrdersController({ db: props.db });
  const componentsController = new ComponentsController({ db: props.db });

  // Create a new order
  router.post(
    "/",
    validate(CreateOrderRequestSchema),
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

  // Get an order's components by id
  router.get(
    "/:id/components",
    asyncHandler((req, res, next) => {
      return componentsController.getComponentsByOrderId(req, res, next);
    }),
  );

  // Update an order TODO: Is this relevant?
  // router.put(
  //   "/:id",
  //   validate(UpdateOrderRequestSchema),
  //   asyncHandler((req, res, next) => {
  //     return controller.updateOrder(req, res, next);
  //   }),
  // );

  // Delete an order
  router.delete(
    "/:id",
    asyncHandler((req, res, next) => {
      return controller.deleteOrder(req, res, next);
    }),
  );

  return router;
}
