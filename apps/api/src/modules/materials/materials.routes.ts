import { Router } from "express";
import { MaterialsController } from "./materials.controller";
import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";

export function generateMaterialsRouter(props: { db: PrismaClient }) {
  const router = Router();
  const controller = new MaterialsController({ db: props.db });

  // Get all materials
  router.get(
    "/",
    asyncHandler((req, res, next) => {
      return controller.getManyMaterials(req, res, next);
    }),
  );

  // Get a material by id
  router.get(
    "/:id",
    asyncHandler((req, res, next) => {
      return controller.getMaterial(req, res, next);
    }),
  );

  return router;
}
