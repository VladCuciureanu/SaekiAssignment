import { Router } from "express";
import { ServicePackagesController } from "./service-packages.controller";
import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";

export function generateServicePackagesRouter(props: { db: PrismaClient }) {
  const router = Router();
  const controller = new ServicePackagesController({ db: props.db });

  // Get all service packages
  router.get(
    "/",
    asyncHandler((req, res, next) => {
      return controller.getManyServicePackages(req, res, next);
    }),
  );

  // Get a service package by id
  router.get(
    "/:id",
    asyncHandler((req, res, next) => {
      return controller.getServicePackage(req, res, next);
    }),
  );

  return router;
}
