import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthController } from "./auth.controller";
import asyncHandler from "express-async-handler";
import { validate } from "../common/middlewares/schema-validation.middleware";
import { LoginDtoSchema } from "./dtos/login.dto";
import { RegisterDtoSchema } from "./dtos/register.dto";

export function generateAuthRouter(props: { db: PrismaClient }) {
  const router = Router();
  const controller = new AuthController({ db: props.db });

  // Get bearer token
  router.post(
    "/login",
    validate(LoginDtoSchema),
    asyncHandler((req, res, next) => controller.login(req, res, next)),
  );

  // Create user and get bearer token
  router.post(
    "/register",
    validate(RegisterDtoSchema),
    asyncHandler((req, res, next) => controller.register(req, res, next)),
  );

  return router;
}
