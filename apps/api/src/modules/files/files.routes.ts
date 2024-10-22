import { Router } from "express";
import { FilesController } from "./files.controller";
import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";
import multer from "multer";

export function generateFilesRouter(props: { db: PrismaClient }) {
  const router = Router();
  const controller = new FilesController({ db: props.db });
  const upload = multer({ dest: "./public/data/uploads/" });

  // Create a new file
  router.post(
    "/",
    upload.single("content"),
    asyncHandler((req, res, next) => {
      return controller.createFile(req, res, next);
    }),
  );

  // Get a file by id
  router.get(
    "/:id",
    asyncHandler((req, res, next) => {
      return controller.getFile(req, res, next);
    }),
  );

  router.get(
    "/:id/raw",
    asyncHandler((req, res, next) => {
      return controller.getFileRaw(req, res, next);
    }),
  );

  return router;
}
