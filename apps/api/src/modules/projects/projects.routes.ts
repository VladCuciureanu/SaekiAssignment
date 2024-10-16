import { Router } from "express";
import { ProjectsController } from "./projects.controller";
import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";

export function generateProjectsRouter(props: { db: PrismaClient }) {
  const router = Router();
  const controller = new ProjectsController({ db: props.db });

  router.post(
    "/",
    asyncHandler((req, res, next) => controller.createProject(req, res, next)),
  );
  router.get(
    "/",
    asyncHandler((req, res, next) =>
      controller.getManyProjects(req, res, next),
    ),
  );
  router.get(
    "/:id",
    asyncHandler((req, res, next) => controller.getProject(req, res, next)),
  );
  router.put(
    "/:id",
    asyncHandler((req, res, next) => controller.updateProject(req, res, next)),
  );
  router.delete(
    "/:id",
    asyncHandler((req, res, next) => controller.deleteProject(req, res, next)),
  );

  return router;
}
