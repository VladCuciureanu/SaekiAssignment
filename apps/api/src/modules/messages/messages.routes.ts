import { Router } from "express";
import { MessagesController } from "./messages.controller";
import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";
import { validate } from "../common/middlewares/schema-validation.middleware";
import { CreateMessageRequestSchema } from "@saeki/schema";

export function generateMessagesRouter(props: { db: PrismaClient }) {
  const router = Router();
  const controller = new MessagesController({ db: props.db });

  // Create a new message
  router.post(
    "/",
    validate(CreateMessageRequestSchema),
    asyncHandler((req, res, next) => {
      return controller.createMessage(req, res, next);
    }),
  );

  return router;
}
