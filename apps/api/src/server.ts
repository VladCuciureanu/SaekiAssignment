import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import { generateProjectsRouter } from "./modules/projects/projects.routes";

function generateRouter() {
  const router = express.Router();
  router.use("/projects", generateProjectsRouter());
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
    .use(cors())
    .use("/api", generateRouter())
    .get("*", (_, res) => {
      return res.status(404).send();
    });

  return app;
}
