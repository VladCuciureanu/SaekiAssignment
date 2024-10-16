import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthController } from "./auth.controller";
import asyncHandler from "express-async-handler";
import { validate } from "../common/middlewares/schema-validation.middleware";
import { LoginDtoSchema } from "./dtos/login.dto";

export function generateAuthRouter(props: { db: PrismaClient }) {
  const router = Router();
  const controller = new AuthController({ db: props.db });

  router.get(
    "/token",
    validate(LoginDtoSchema),
    asyncHandler((req, res, next) => controller.getToken(req, res, next)),
  );

  return router;
}
