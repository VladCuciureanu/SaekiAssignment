import { Router } from "express";
import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";
import { CreateProjectItemDtoSchema } from "./dtos/create-project-item.dto";
import { validate } from "../common/middlewares/schema-validation.middleware";
import { UpdateProjectItemDtoSchema } from "./dtos/update-project-item.dto";
import { ProjectItemsController } from "./project-items.controller";

export function generateProjectItemsRouter(props: { db: PrismaClient }) {
  const router = Router();
  const controller = new ProjectItemsController({ db: props.db });

  // Create a new project item
  router.post(
    "/",
    validate(CreateProjectItemDtoSchema),
    asyncHandler((req, res, next) => {
      return controller.createProjectItem(req, res, next);
    }),
  );

  // Get all project items
  router.get(
    "/",
    asyncHandler((req, res, next) => {
      return controller.getManyProjectItems(req, res, next);
    }),
  );

  // Get a project item by id
  router.get(
    "/:id",
    asyncHandler((req, res, next) => {
      return controller.getProjectItem(req, res, next);
    }),
  );

  // Update a project item
  router.put(
    "/:id",
    validate(UpdateProjectItemDtoSchema),
    asyncHandler((req, res, next) => {
      return controller.updateProjectItem(req, res, next);
    }),
  );

  // Delete a project item
  router.delete(
    "/:id",
    asyncHandler((req, res, next) => {
      return controller.deleteProjectItem(req, res, next);
    }),
  );

  return router;
}
