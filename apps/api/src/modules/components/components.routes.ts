import { Router } from "express";
import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";
import { CreateComponentDtoSchema } from "./dtos/create-component.dto";
import { validate } from "../common/middlewares/schema-validation.middleware";
import { UpdateComponentDtoSchema } from "./dtos/update-component.dto";
import { ComponentsController } from "./components.controller";

export function generateComponentsRouter(props: { db: PrismaClient }) {
  const router = Router();
  const controller = new ComponentsController({ db: props.db });

  // Create a new component
  router.post(
    "/",
    validate(CreateComponentDtoSchema),
    asyncHandler((req, res, next) => {
      return controller.createComponent(req, res, next);
    }),
  );

  // Get all components
  router.get(
    "/",
    asyncHandler((req, res, next) => {
      return controller.getManyComponents(req, res, next);
    }),
  );

  // Get a component by id
  router.get(
    "/:id",
    asyncHandler((req, res, next) => {
      return controller.getComponent(req, res, next);
    }),
  );

  // Update a component
  router.put(
    "/:id",
    validate(UpdateComponentDtoSchema),
    asyncHandler((req, res, next) => {
      return controller.updateComponent(req, res, next);
    }),
  );

  // Delete a component
  router.delete(
    "/:id",
    asyncHandler((req, res, next) => {
      return controller.deleteComponent(req, res, next);
    }),
  );

  return router;
}
