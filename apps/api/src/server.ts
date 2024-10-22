import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import { exceptionsHandler } from "./modules/common/middlewares/exceptions-handler.middleware";
import { routeNotFound } from "./modules/common/middlewares/route-not-found.middleware";
import { generateAuthRouter } from "./modules/auth/auth.routes";
import { generateProjectsRouter } from "./modules/projects/projects.routes";
import { authenticate } from "./modules/auth/middlewares/authentication.middleware";
import { generateComponentsRouter } from "./modules/components/components.routes";
import { generateOrdersRouter } from "./modules/orders/orders.routes";
import { env } from "./modules/env";
import cookieParser from "cookie-parser";
import { generateMaterialsRouter } from "./modules/materials/materials.routes";
import { generateServicePackagesRouter } from "./modules/service-packages/service-packages.routes";
import { getDatabase } from "./modules/db";

function generateRouter() {
  const router = express.Router();
  const db = getDatabase();

  router.use("/auth", generateAuthRouter({ db }));
  router.use("/components", authenticate, generateComponentsRouter({ db }));
  router.use("/materials", authenticate, generateMaterialsRouter({ db }));
  router.use("/orders", authenticate, generateOrdersRouter({ db }));
  router.use("/projects", authenticate, generateProjectsRouter({ db }));
  router.use(
    "/service-packages",
    authenticate,
    generateServicePackagesRouter({ db }),
  );

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
    .use(cookieParser())
    .use(cors({ origin: env.FRONTEND_URL, credentials: true }))
    .use("/api", generateRouter())
    .use(routeNotFound)
    .use(exceptionsHandler);

  return app;
}
