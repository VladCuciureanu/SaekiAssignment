import { Router } from "express";
import { ProjectsController } from "./projects.controller";
import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";
import { CreateProjectDtoSchema } from "./dtos/create-project.dto";
import { validate } from "../common/middlewares/schema-validation.middleware";
import { UpdateProjectDtoSchema } from "./dtos/update-project.dto";

export function generateProjectsRouter(props: { db: PrismaClient }) {
  const router = Router();
  const controller = new ProjectsController({ db: props.db });

  // Create a new project
  router.post(
    "/",
    validate(CreateProjectDtoSchema),
    asyncHandler((req, res, next) => controller.createProject(req, res, next)),
  );

  // Get all projects
  router.get(
    "/",
    asyncHandler((req, res, next) =>
      controller.getManyProjects(req, res, next),
    ),
  );

  // Get a project by id
  router.get(
    "/:id",
    asyncHandler((req, res, next) => controller.getProject(req, res, next)),
  );

  // Update a project
  router.put(
    "/:id",
    validate(UpdateProjectDtoSchema),
    asyncHandler((req, res, next) => controller.updateProject(req, res, next)),
  );

  // Delete a project
  router.delete(
    "/:id",
    asyncHandler((req, res, next) => controller.deleteProject(req, res, next)),
  );

  return router;
}
