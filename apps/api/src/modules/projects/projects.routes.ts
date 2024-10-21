import { Router } from "express";
import { ProjectsController } from "./projects.controller";
import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";
import { validate } from "../common/middlewares/schema-validation.middleware";
import { CreateProjectRequestSchema } from "@saeki/schema";
import { UpdateProjectRequestSchema } from "@saeki/schema";

export function generateProjectsRouter(props: { db: PrismaClient }) {
  const router = Router();
  const controller = new ProjectsController({ db: props.db });

  // Create a new project
  router.post(
    "/",
    validate(CreateProjectRequestSchema),
    asyncHandler((req, res, next) => {
      return controller.createProject(req, res, next);
    }),
  );

  // Get all projects
  router.get(
    "/",
    asyncHandler((req, res, next) => {
      return controller.getManyProjects(req, res, next);
    }),
  );

  // Get a project by id
  router.get(
    "/:id",
    asyncHandler((req, res, next) => {
      return controller.getProject(req, res, next);
    }),
  );

  // Update a project
  router.put(
    "/:id",
    validate(UpdateProjectRequestSchema),
    asyncHandler((req, res, next) => {
      return controller.updateProject(req, res, next);
    }),
  );

  // Delete a project
  router.delete(
    "/:id",
    asyncHandler((req, res, next) => {
      return controller.deleteProject(req, res, next);
    }),
  );

  return router;
}
