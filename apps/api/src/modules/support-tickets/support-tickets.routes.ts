import { Router } from "express";
import { SupportTicketsController } from "./support-tickets.controller";
import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";
import { validate } from "../common/middlewares/schema-validation.middleware";
import { CreateSupportTicketRequestSchema } from "@saeki/schema";
import { MessagesController } from "../messages/messages.controller";

export function generateSupportTicketsRouter(props: { db: PrismaClient }) {
  const router = Router();
  const controller = new SupportTicketsController({ db: props.db });
  const messagesController = new MessagesController({ db: props.db });

  // Create a new support ticket
  router.post(
    "/",
    validate(CreateSupportTicketRequestSchema),
    asyncHandler((req, res, next) => {
      return controller.createSupportTicket(req, res, next);
    }),
  );

  // Get all support tickets
  router.get(
    "/",
    asyncHandler((req, res, next) => {
      return controller.getManySupportTickets(req, res, next);
    }),
  );

  // Get a support ticket by ID
  router.get(
    "/:id",
    asyncHandler((req, res, next) => {
      return controller.getSupportTicket(req, res, next);
    }),
  );

  // Get a support ticket's messages by id
  router.get(
    "/:id/messages",
    asyncHandler((req, res, next) => {
      return messagesController.getMessagesBySupportTicketId(req, res, next);
    }),
  );

  // Delete a support ticket
  router.delete(
    "/:id",
    asyncHandler((req, res, next) => {
      return controller.deleteSupportTicket(req, res, next);
    }),
  );

  return router;
}
