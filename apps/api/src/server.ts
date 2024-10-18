import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { exceptionsHandler } from "./modules/common/middlewares/exceptions-handler.middleware";
import { routeNotFound } from "./modules/common/middlewares/route-not-found.middleware";
import { generateAuthRouter } from "./modules/auth/auth.routes";
import { generateProjectsRouter } from "./modules/projects/projects.routes";
import { authenticate } from "./modules/auth/middlewares/authentication.middleware";
import { generateProjectItemsRouter } from "./modules/project-items/project-items.routes";
import { generateOrdersRouter } from "./modules/orders/orders.routes";
import { env } from "./modules/env";

function generateRouter() {
  const router = express.Router();
  const db = new PrismaClient();

  router.use("/auth", generateAuthRouter({ db }));
  router.use("/projects", authenticate, generateProjectsRouter({ db }));
  router.use(
    "/project-items",
    authenticate,
    generateProjectItemsRouter({ db }),
  );
  router.use("/orders", authenticate, generateOrdersRouter({ db }));

  router.get("/health", (_, res) => {
    return res.status(200).send();
  });

  return router;
}

export function createServer(): Express {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors({ origin: env.FRONTEND_URL, credentials: true }))
    .use("/api", generateRouter())
    .use(routeNotFound)
    .use(exceptionsHandler);

  return app;
}
